'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* About */}
          <div>
            <h3 className="text-sm font-semibold text-white">About</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/" className="text-sm text-slate-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-slate-400 hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-slate-400 hover:text-white">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-white">Support</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/" className="text-sm text-slate-400 hover:text-white">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-slate-400 hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-slate-400 hover:text-white">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white">Legal</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/" className="text-sm text-slate-400 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-slate-400 hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-slate-400 hover:text-white">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white">Contact</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center gap-2 text-sm text-slate-400">
                <Mail size={16} />
                <a href="mailto:info@next-commerce.dev">info@next-commerce.dev</a>
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-400">
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-400">
                <MapPin size={16} />
                <span>San Francisco, CA</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-slate-400">
              © 2024 next-commerce. All rights reserved. Built by{' '}
              <a
                href="https://alrod.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                Alfredo Wiesner
              </a>
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-slate-400 hover:text-white">
                Twitter
              </a>
              <a href="#" className="text-slate-400 hover:text-white">
                GitHub
              </a>
              <a href="#" className="text-slate-400 hover:text-white">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
