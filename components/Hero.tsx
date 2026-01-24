'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';

interface HoverImage {
  src: string;
  alt: string;
}

const hoverImages: Record<string, HoverImage> = {
  muscle: {
    src: '/images/muscle-hover.gif',
    alt: 'Motion work showcase',
  },
  desktop: {
    src: '/images/desktop-hover.gif',
    alt: 'Desktop work showcase',
  },
  mobile: {
    src: '/images/mobile-hover.gif',
    alt: 'Mobile work showcase',
  },
};

export default function Hero() {
  const [hoveredEmoji, setHoveredEmoji] = useState<string | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [lottieData, setLottieData] = useState<object | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    fetch('/animations/hero-animation.json')
      .then(res => res.json())
      .then(data => setLottieData(data))
      .catch(err => console.error('Failed to load Lottie animation:', err));
  }, []);

  // Preload hover images
  useEffect(() => {
    Object.values(hoverImages).forEach((image) => {
      const img = new window.Image();
      img.src = image.src;
    });
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section
      className="pt-16 pb-8 md:pt-24 md:pb-12 lg:pt-32 lg:pb-16"
      onMouseMove={handleMouseMove}
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.3] md:leading-[1.35] tracking-tight text-foreground"
        >
          I'm <strong className="font-semibold">Salih</strong>, an Experience Designer &amp;{' '}
          Motion Specialist with 20+ years of work{' '}
          <span
            className="inline-block align-middle cursor-pointer"
            onMouseEnter={() => !isMobile && setHoveredEmoji('muscle')}
            onMouseLeave={() => setHoveredEmoji(null)}
            aria-label="flexed bicep"
          >
            💪
          </span>{' '}
          at the intersection of entertainment, UX, and tech. I'm best known as co-creator of{' '}
          <span
            className="inline-block cursor-pointer"
            onMouseEnter={() => !isMobile && setHoveredEmoji('lottie')}
            onMouseLeave={() => setHoveredEmoji(null)}
          >
            <img
              src="/images/lottie-logo.png"
              alt="Lottie"
              className="inline-block h-[1em] w-auto align-middle"
            />
          </span>
          , the open-source animation tool used by hundreds of thousands of companies worldwide.
          <br className="hidden md:block" />
          I bring ideas to life across ALL platforms—from{' '}
          <span
            className="inline-block align-middle"
            aria-label="desktop computer"
          >
            🖥️
          </span>{' '}
          to{' '}
          <span
            className="inline-block align-middle"
            aria-label="mobile phone"
          >
            📱
          </span>
          —and I'm passionate about using motion to simplify, engage, and delight.
        </motion.h1>
      </div>

      {/* Cursor-following hover image */}
      <AnimatePresence>
        {hoveredEmoji && !isMobile && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="fixed pointer-events-none z-50"
            style={{
              left: cursorPos.x + 20,
              top: cursorPos.y + 10,
            }}
          >
            <div className={`relative w-72 h-48 overflow-hidden rounded-lg shadow-2xl ${hoveredEmoji === 'lottie' ? 'bg-black' : 'bg-white'}`}>
              {hoveredEmoji === 'lottie' && lottieData ? (
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                  <Lottie
                    animationData={lottieData}
                    loop={true}
                    className="w-full min-h-full object-cover"
                    style={{ minWidth: '100%', minHeight: '100%', marginTop: '-10px' }}
                  />
                </div>
              ) : hoverImages[hoveredEmoji] ? (
                <img
                  src={hoverImages[hoveredEmoji].src}
                  alt={hoverImages[hoveredEmoji].alt}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
