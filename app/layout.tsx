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
      <head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' https://i.vimeocdn.com https://vumbnail.com data:; frame-src https://player.vimeo.com; font-src 'self' data:; connect-src 'self'; media-src 'self';"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💪</text></svg>"
        />
      </head>
      <body className="min-h-screen">
        <Header />
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
      </body>
    </html>
  );
}
