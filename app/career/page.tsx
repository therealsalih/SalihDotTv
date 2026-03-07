'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Color utility ─────────────────────────────────────────────────────────────

function lerp(a: string, b: string, t: number): string {
  const h = (s: string, o: number) => parseInt(s.slice(o, o + 2), 16);
  const r = Math.round(h(a, 1) + (h(b, 1) - h(a, 1)) * t);
  const g = Math.round(h(a, 3) + (h(b, 3) - h(a, 3)) * t);
  const bl = Math.round(h(a, 5) + (h(b, 5) - h(a, 5)) * t);
  return `rgb(${r},${g},${bl})`;
}

// ─── Types ─────────────────────────────────────────────────────────────────────

type DarkSlide = {
  id: string;
  type: 'dark';
  text: string;
  confidential?: boolean;
};

type ChapterSlide = {
  id: string;
  type: 'chapter';
  prefix: string;
  highlight: string;
  highlightColor: string;
  body: string;
  listStart: string;
  listEnd: string;
  items: string[];
};

type HowIWorkSlide = {
  id: string;
  type: 'how-i-work';
  headline: string;
  body1: string;
  body2: string;
  categories: { title: string; body: string }[];
};

type TestimonialsSlide = {
  id: string;
  type: 'testimonials';
  headline: string;
  testimonials: { role: string; quote: string; attribution: string }[];
};

type Slide = DarkSlide | ChapterSlide | HowIWorkSlide | TestimonialsSlide;

// ─── Slide data ────────────────────────────────────────────────────────────────

const slides: Slide[] = [
  {
    id: 'hello',
    type: 'dark',
    text: 'Hello!',
    confidential: true,
  },
  {
    id: 'ny',
    type: 'chapter',
    prefix: '10 years in ',
    highlight: 'NY',
    highlightColor: '#BF5B2B',
    body: 'From 2002 to 2012 I lived in New York working for various television networks, ad agencies and design shops creating commercials for every kind of brand under the sun, dabbling in moving and music videos and honing my craft as a motion designer.',
    listStart: '#1B3D8A',
    listEnd: '#C45A1A',
    items: ['Comcast', 'Acura', 'HBO', 'Nike', 'Comedy Central', 'MTV', 'Calvin Klein', 'Nick Jr', 'Avengers', 'Rhianna', 'Coca Cola', 'HTC', 'Dove', 'Now This'],
  },
  {
    id: 'square',
    type: 'chapter',
    prefix: '3 years at ',
    highlight: 'Square',
    highlightColor: '#3B9CD9',
    body: 'From 2012 to 2015 I was at Square on the video team. I was responsible for standalone animations as well as compositing for live action commercials. During that time I formed relationships with the product design teams and began to explore using motion to solve product challenges.',
    listStart: '#1A72C8',
    listEnd: '#A8D8F5',
    items: ['Online Store', 'SQUA(RED)', 'Order App', 'Help Center', 'Square Stand', 'Payroll', 'Cash App', 'Capital', 'Square Register', '$Cashtags', 'CRM', 'EMV Tutorial'],
  },
  {
    id: 'airbnb',
    type: 'chapter',
    prefix: '7 years at ',
    highlight: 'Airbnb',
    highlightColor: '#FF5A5F',
    body: "From 2015 to 2021 I joined Airbnb as the first motion designer on the product design team. I was part of the design systems group and my role was to help any and all teams with motion design related problems. I helped create the animation framework Lottie, an internal tool called Conductor and was a part of every major launch during the time I was there.",
    listStart: '#FF5A5F',
    listEnd: '#FFB400',
    items: ['Select', 'Airbnb Plus', 'Apple Watch App', 'Lottie', 'Conductor', 'Experiences', 'DLS', 'Trust', 'Superhost', 'Apple TV App', 'Search', 'Trips'],
  },
  {
    id: 'colab',
    type: 'chapter',
    prefix: '4 years at ',
    highlight: 'CōLab',
    highlightColor: '#AA00FF',
    body: "From 2021 to today I'm Executive Creative Director at CōLab. I am part of a team of brand designers, product designers, content strategists and presentation designers supporting them with resourcing, career development and creative directions. I also serve as a principal motion designer working on everything from explainer videos to social assets, leading projects from storyboards to final animations.",
    listStart: '#FF66FF',
    listEnd: '#7700CC',
    items: ['Ledger', 'Found', 'OKX', 'Addepar', 'Flip', 'HuntClub', 'Anthropic', 'Wealthfront', 'Lettuce', 'Inflection', 'Linear', 'Hopper'],
  },
  {
    id: 'spare',
    type: 'chapter',
    prefix: 'In my ',
    highlight: 'Spare time',
    highlightColor: '#888888',
    body: "During the last 20 years I've spent 7 of them as a freelance creative director and motion designer. I've worked on a lot of freelance projects. Here are a few notable ones.",
    listStart: '#BBBBBB',
    listEnd: '#111111',
    items: ['Dove', 'Now This', 'Stripe', 'Guideline', 'Siegel+Gale', 'Netflix', 'AES', 'Gusto', 'Facebook', 'Athletic Greens', 'Wealthfront', 'Eero'],
  },
  {
    id: 'wrapup',
    type: 'dark',
    text: 'The wrap up...',
  },
  {
    id: 'how-i-work',
    type: 'how-i-work',
    headline: 'How I work',
    body1: "My favorite part of the creative process is ideation. I love exploring dozens of variations—what if it goes this way, what if it bounces, what if it spins? When the possibilities are endless and there's time to really squeeze the juice out of an idea or animation, I'm in my zone. As a creative director, I try to give the artists I lead that same freedom to explore. I believe the only way to get to one great idea is to make a thousand throwaways.",
    body2: "Making things move is still what I love most—but in recent years, I've grown into mentorship and leadership, and that's been just as creatively fulfilling.",
    categories: [
      {
        title: 'As an individual contributor',
        body: "Simply put, I make things. I take a designer's mocks, wireframes or finished designs and I build animations from them. My biggest asset is my ability to iterate on multiple ideas quickly.",
      },
      {
        title: 'As a mentor',
        body: "I've developed skills through multiple mentorship programs at Airbnb and the four reports I manage at CōLab. I have mentored a dozen folks across multiple disciplines. I love it because I learn so much from each relationship.",
      },
      {
        title: 'As a partner',
        body: "I thrive on collaboration, and I see the relationships I build as the most important part of any project. No deadline or deliverable is ever worth sacrificing trust or connection.",
      },
      {
        title: 'As a resource',
        body: "I held motion design workshops at Airbnb, I have spoken at small events and large conferences like SXSW. I've also created a series of Lottie tutorial videos. I love sharing with whoever can benefit.",
      },
    ],
  },
  {
    id: 'working-with-others',
    type: 'testimonials',
    headline: 'Working\nwith others',
    testimonials: [
      {
        role: 'As an individual contributor',
        quote: '"In the early days of the project, his prototypes helped us push entire directional concepts through in time frames that, quite honestly, were pretty unreasonable for everyone."',
        attribution: '– 2017 peer reviewer',
      },
      {
        role: 'As a manager',
        quote: '"Salih was an excellent coach and helped me through a professional/personal rough patch. I will always be grateful to him for his thoughtful approach to guidance."',
        attribution: '– 2019 review',
      },
      {
        role: 'As a partner',
        quote: '"Salih is consistently a great collaborator. He finds the right balance between asking questions and moving projects along so they meet their intended goals."',
        attribution: '– 2019 peer reviewer',
      },
      {
        role: 'As a mentor',
        quote: '"He was an active listener in every session – that\'s a huge part of what makes him such a great coach. He pushed me to answer some questions that made me re-evaluate my perspective."',
        attribution: '– 2019 mentee reviewer',
      },
      {
        role: 'As a resource',
        quote: '"I really enjoyed your talk and learned a lot from you both in terms of content and just how to speak better. There was so much valuable content based on your life and work experience."',
        attribution: '– 2020 speaking engagement reviewer',
      },
    ],
  },
  {
    id: 'thankyou',
    type: 'dark',
    text: 'Thank you!',
    confidential: true,
  },
];

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function CareerPage() {
  const [current, setCurrent] = useState(0);

  const goNext = useCallback(() => setCurrent(c => Math.min(c + 1, slides.length - 1)), []);
  const goPrev = useCallback(() => setCurrent(c => Math.max(c - 1, 0)), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') goNext();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev]);

  const slide = slides[current];
  const isDark = slide.type === 'dark';

  return (
    <div className="fixed inset-0 z-50 select-none" style={{ fontFamily: "'Modern Era', sans-serif" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          {slide.type === 'dark' && <DarkSlideComp slide={slide} />}
          {slide.type === 'chapter' && <ChapterSlideComp slide={slide} />}
          {slide.type === 'how-i-work' && <HowIWorkSlideComp slide={slide} />}
          {slide.type === 'testimonials' && <TestimonialsSlideComp slide={slide} />}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <nav className="absolute bottom-6 left-0 right-0 px-8 flex items-center justify-between z-10 pointer-events-none">
        <button
          onClick={goPrev}
          disabled={current === 0}
          className={`pointer-events-auto px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-150 disabled:opacity-0 disabled:pointer-events-none ${
            isDark
              ? 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
              : 'bg-black/10 text-black/50 hover:bg-black/20 hover:text-black'
          }`}
        >
          ← Prev
        </button>

        <span className={`text-[10px] font-mono tabular-nums ${isDark ? 'text-white/25' : 'text-black/20'}`}>
          {current + 1} / {slides.length}
        </span>

        <button
          onClick={goNext}
          disabled={current === slides.length - 1}
          className={`pointer-events-auto px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-150 disabled:opacity-0 disabled:pointer-events-none ${
            isDark
              ? 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
              : 'bg-black/10 text-black/50 hover:bg-black/20 hover:text-black'
          }`}
        >
          Next →
        </button>
      </nav>
    </div>
  );
}

// ─── Slide components ──────────────────────────────────────────────────────────

function DarkSlideComp({ slide }: { slide: DarkSlide }) {
  return (
    <div className="w-full h-full bg-black flex items-center px-16 lg:px-20">
      <h1
        className="text-white font-black leading-none tracking-tight"
        style={{ fontSize: 'clamp(52px, 10vw, 144px)' }}
      >
        {slide.text}
      </h1>
      {slide.confidential && (
        <p className="absolute bottom-6 left-8 text-white/25 text-xs">
          Please do not share. Contains private & confidential information.
        </p>
      )}
    </div>
  );
}

function ChapterSlideComp({ slide }: { slide: ChapterSlide }) {
  return (
    <div className="w-full h-full bg-white flex overflow-hidden">
      {/* Left: context panel */}
      <div className="w-[46%] shrink-0 flex items-center px-16 lg:px-20">
        <div>
          <h2
            className="font-bold leading-tight tracking-tight mb-4 whitespace-nowrap"
            style={{ fontSize: 'clamp(32px, 6.8vw, 100px)' }}
          >
            <span className="text-black">{slide.prefix}</span>
            <span style={{ color: slide.highlightColor }}>{slide.highlight}</span>
          </h2>
          <p className="text-sm text-black/50 leading-relaxed">
            {slide.body}
          </p>
        </div>
      </div>

      {/* Right: overflowing brand/project list */}
      <div className="flex-1 overflow-hidden relative">
        <div
          className="absolute flex flex-col"
          style={{ top: '-10vh', left: '20%' }}
        >
          {slide.items.map((item, i) => (
            <span
              key={item}
              className="font-bold whitespace-nowrap"
              style={{
                fontSize: 'clamp(42px, 11vh, 140px)',
                lineHeight: '0.9',
                letterSpacing: '-0.02em',
                color: lerp(slide.listStart, slide.listEnd, i / Math.max(slide.items.length - 1, 1)),
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function HowIWorkSlideComp({ slide }: { slide: HowIWorkSlide }) {
  return (
    <div className="w-full h-full bg-white flex overflow-hidden">
      {/* Left */}
      <div className="w-[46%] shrink-0 flex items-center px-16 lg:px-20">
        <div>
          <h2
            className="font-black text-black leading-tight tracking-tight mb-5"
            style={{ fontSize: 'clamp(40px, 5.5vw, 80px)' }}
          >
            {slide.headline}
          </h2>
          <p className="text-sm text-black/60 leading-relaxed mb-4 max-w-[400px]">{slide.body1}</p>
          <p className="text-sm text-black/60 leading-relaxed max-w-[400px]">{slide.body2}</p>
        </div>
      </div>

      {/* Right: 2-col categories */}
      <div className="flex-1 flex items-center pr-16 pl-8">
        <div className="grid grid-cols-2 gap-x-10 gap-y-7 w-full">
          {slide.categories.map(cat => (
            <div key={cat.title}>
              <p className="text-sm font-bold text-black mb-1.5">{cat.title}</p>
              <p className="text-sm text-black/55 leading-relaxed">{cat.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TestimonialsSlideComp({ slide }: { slide: TestimonialsSlide }) {
  return (
    <div className="w-full h-full bg-white flex overflow-hidden">
      {/* Left */}
      <div className="w-[46%] shrink-0 flex items-center px-16 lg:px-20">
        <h2
          className="font-black text-black leading-tight tracking-tight whitespace-pre-line"
          style={{ fontSize: 'clamp(40px, 5.5vw, 80px)' }}
        >
          {slide.headline}
        </h2>
      </div>

      {/* Right: 2-col testimonials */}
      <div className="flex-1 flex items-center pr-16 pl-8 overflow-auto">
        <div className="grid grid-cols-2 gap-x-10 gap-y-7 w-full">
          {slide.testimonials.map(t => (
            <div key={t.role}>
              <p className="text-sm font-bold text-black mb-1.5">{t.role}</p>
              <p className="text-sm text-black/55 leading-relaxed mb-1">{t.quote}</p>
              <p className="text-xs text-black/35">{t.attribution}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
