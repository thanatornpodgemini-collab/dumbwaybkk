import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dumb Ways to Die in Bangkok',
  description:
    'An interactive field guide to incidents reported in Thai news from the last 10 years.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
