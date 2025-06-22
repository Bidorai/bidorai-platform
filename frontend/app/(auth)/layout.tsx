import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full">
        <Link href="/" className="flex justify-center mb-8">
          <span className="text-3xl font-bold text-primary-600">Bidorai</span>
        </Link>
        {children}
      </div>
    </div>
  );
}