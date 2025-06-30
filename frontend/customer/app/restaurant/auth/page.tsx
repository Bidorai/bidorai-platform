"use client";
import Link from 'next/link';

export default function RestaurantAuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <img src="/logo.png" alt="Bidorai" className="w-12 h-12" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Restaurant Portal
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            The restaurant portal is a separate application.<br/>
            To sign in or create an account, please use the button below to open the Restaurant Portal.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <a
            href="http://localhost:3001"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow"
          >
            Open Restaurant Portal
          </a>
        </div>

        <div className="text-center mt-8">
          <Link
            href="/restaurant"
            className="text-blue-600 hover:text-blue-500 text-sm"
          >
            ← Back to Restaurant Information
          </Link>
        </div>
      </div>
    </div>
  );
} 