import './globals.css';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Providers } from './providers';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Crypto Trading Platform',
  description: 'A modern crypto trading platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}