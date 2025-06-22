import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { ClientOnly } from './components/ClientOnly';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bidorai - Smart Catering Bidding Platform',
  description: 'Get the best catering deals through competitive bidding',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <ClientOnly>
          <Toaster position="top-right" />
        </ClientOnly>
      </body>
    </html>
  );
}