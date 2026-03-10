import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import { generateOrderNumber } from '@/lib/utils';
import Stripe from 'stripe';

export const dynamic = 'force-dynamic';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing signature' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error: any) {
    console.error('Webhook signature verification failed:', error.message);
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;

        if (
          session.payment_status === 'paid' &&
          session.metadata?.userId &&
          session.metadata?.shippingAddressId
        ) {
          const orderNumber = generateOrderNumber();

          // Create order
          await prisma.order.create({
            data: {
              orderNumber,
              userId: session.metadata.userId,
              status: 'PROCESSING',
              paymentStatus: 'PAID',
              subtotal: (session.amount_subtotal || 0) / 100,
              tax: 0,
              shipping: 0,
              total: (session.amount_total || 0) / 100,
              stripePaymentIntentId: session.payment_intent as string,
              shippingAddressId: session.metadata.shippingAddressId,
              billingAddressId: session.metadata.billingAddressId,
            },
          });

          // Clear user's cart
          await prisma.cartItem.deleteMany({
            where: { userId: session.metadata.userId },
          });
        }
        break;
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge;

        if (charge.payment_intent) {
          await prisma.order.updateMany({
            where: { stripePaymentIntentId: charge.payment_intent as string },
            data: { paymentStatus: 'REFUNDED', status: 'RETURNED' },
          });
        }
        break;
      }

      case 'payment_intent.payment_failed': {
        const intent = event.data.object as Stripe.PaymentIntent;

        await prisma.order.updateMany({
          where: { stripePaymentIntentId: intent.id },
          data: { paymentStatus: 'FAILED' },
        });
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
