'use client';

import { motion } from 'framer-motion';

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string;
}

const experiences: ExperienceItem[] = [
  {
    company: 'CōLab',
    role: 'Executive Creative Director',
    period: '2021 - Present',
    description:
      "CōLab is Westcap's in-house brand marketing and creative studio built to help startups grow and scale. I lead a small, hands-on creative squad of designers and writers. I jump between leading and making — shipping brand launches, explainer videos, interactive prototypes, Lottie animations, and product-level motion prototypes.",
  },
  {
    company: 'Airbnb',
    role: 'Experience Design Lead',
    period: '2015 - 2021',
    description:
      "I was Airbnb's first motion designer — the only one in a 60-designer org. On the Design Language System team (Material Design Award, 2016), I worked with guest, host, payments and trust teams to bring motion into core flows. I co-built Lottie during Hack Week (with Brandon Withrow and Gabriel Peal) and helped open-source it, now used worldwide. I also wrote animation patterns and tutorials that made motion practical and scalable across the company.",
  },
  {
    company: 'Square',
    role: 'Motion Graphics Artist',
    period: '2012 - 2015',
    description:
      'I joined the video team creating animations and compositing for live-action commercials. I worked on everything from high-polish promotional videos showing the Square Reader and Stand in action, to animated explainers that broke down complex payment systems, plus merchant testimonials and marketing materials for the website and social channels.',
  },
  {
    company: 'Freelance',
    role: 'Motion Designer / Creative Director',
    period: '2002 - 2012',
    description:
      "Worked with studios like Gretel, Hush, 1st Avenue Machine, Shilo, Perception, Adolescent and more. For clients like HBO, Nickelodeon, Discovery Channel, Nike, TV One, Sony Ericsson, Nintendo, Microsoft, HTC, Johnson & Johnson, Comedy Central, Cox and more. Other projects ranged from Rihanna's \"Rude Boy\" music video, Mos Def promos, a small piece in The Avengers—and lastly won a Silver BDA for BET Awards (2009).",
  },
];

export default function Experience() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 md:gap-y-16">
          {experiences.map((exp, index) => (
            <motion.article
              key={exp.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <h3 className="text-xl font-semibold text-foreground mb-1">
                {exp.company}
              </h3>
              <p className="text-xs uppercase tracking-wider text-muted mb-4">
                {exp.role} &nbsp;&nbsp; {exp.period}
              </p>
              <p className="text-sm leading-relaxed text-muted">
                {exp.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
