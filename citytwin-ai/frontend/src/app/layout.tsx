import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CityTwin AI — Delhi Digital Twin',
  description: 'AI-powered Digital Twin platform for Delhi urban management.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0a0e1a] text-[#f0f4ff]`}>
        {children}
      </body>
    </html>
  );
}
