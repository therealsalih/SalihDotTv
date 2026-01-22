'use client';

import { motion } from 'framer-motion';

interface TagFilterProps {
  tags: string[];
  activeTag: string | null;
  onTagChange: (tag: string | null) => void;
}

export default function TagFilter({
  tags,
  activeTag,
  onTagChange,
}: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onTagChange(null)}
        className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${
          activeTag === null
            ? 'text-background'
            : 'text-muted hover:text-foreground'
        }`}
      >
        {activeTag === null && (
          <motion.span
            layoutId="activeTag"
            className="absolute inset-0 bg-foreground rounded-full"
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          />
        )}
        <span className="relative z-10">All</span>
      </button>

      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagChange(tag)}
          className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${
            activeTag === tag
              ? 'text-background'
              : 'text-muted hover:text-foreground'
          }`}
        >
          {activeTag === tag && (
            <motion.span
              layoutId="activeTag"
              className="absolute inset-0 bg-foreground rounded-full"
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            />
          )}
          <span className="relative z-10">{tag}</span>
        </button>
      ))}
    </div>
  );
}
