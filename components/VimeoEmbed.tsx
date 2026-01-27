'use client';

import { motion } from 'framer-motion';

interface VimeoEmbedProps {
  vimeoId: string;
  title: string;
}

export default function VimeoEmbed({ vimeoId, title }: VimeoEmbedProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full h-full overflow-hidden rounded-lg bg-white/5"
    >
      <iframe
        src={`https://player.vimeo.com/video/${vimeoId}?h=0&title=0&byline=0&portrait=0&dnt=1`}
        title={title}
        className="absolute inset-0 w-full h-full"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        sandbox="allow-scripts allow-same-origin allow-presentation"
      />
    </motion.div>
  );
}
