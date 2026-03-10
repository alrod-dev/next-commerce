'use client';

import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import type { Review } from '@/types';

interface ReviewListProps {
  productId: string;
  initialReviews: Review[];
}

export default function ReviewList({ productId, initialReviews }: ReviewListProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/reviews?productId=${productId}`);
        const data = await res.json();
        setReviews(data.data || []);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  if (loading) {
    return <div className="text-center text-gray-600">Loading reviews...</div>;
  }

  if (reviews.length === 0) {
    return <div className="text-center text-gray-600">No reviews yet</div>;
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="border-b border-slate-200 pb-4 last:border-0">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-gray-900">{review.user.name}</h4>
                {review.verified && (
                  <span className="rounded bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                    Verified
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600">{formatDate(review.createdAt)}</p>
            </div>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i < review.rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }
                />
              ))}
            </div>
          </div>

          <h5 className="mt-2 font-semibold text-gray-900">{review.title}</h5>
          <p className="mt-1 text-sm text-gray-700">{review.content}</p>

          <div className="mt-3 flex items-center gap-4">
            <button className="text-sm text-gray-600 hover:text-gray-900">
              👍 Helpful ({review.helpful})
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
