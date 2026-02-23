import { Metadata } from 'next';
import Hero from '@/components/Hero';
import Experience from '@/components/Experience';

export const metadata: Metadata = {
  title: {
    absolute: 'Salih Abdul-Karim | Experience Designer & Motion Specialist',
  },
  description:
    'Experience Designer & Motion Specialist with 20+ years of work at the intersection of entertainment, UX, and tech. Co-creator of Lottie.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Experience />
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <a
            href="mailto:salih@colabgroup.com"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            salih@colabgroup.com
          </a>
        </div>
      </section>
    </>
  );
}
