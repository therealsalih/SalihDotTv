import type { Metadata } from 'next';
import { Inter, Source_Serif_4 } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import PageTransition from '@/components/PageTransition';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Salih Abdul-Karim | Experience Designer & Motion Specialist',
    template: '%s | Salih Abdul-Karim',
  },
  description:
    'Experience Designer & Motion Specialist with 20+ years of work at the intersection of entertainment, UX, and tech. Co-creator of Lottie.',
  keywords: [
    'motion design',
    'experience design',
    'Lottie',
    'animation',
    'UX',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${sourceSerif.variable}`}>
      <body className="min-h-screen">
        <Header />
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
      </body>
    </html>
  );
}
