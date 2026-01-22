import { Metadata } from 'next';
import Hero from '@/components/Hero';
import Experience from '@/components/Experience';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Experience Designer & Motion Specialist with 20+ years of work at the intersection of entertainment, UX, and tech. Co-creator of Lottie.',
};

export default function AboutPage() {
  return (
    <>
      <Hero />
      <Experience />
    </>
  );
}
