'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/types';

interface ProjectListProps {
  projects: Project[];
}

interface CursorPosition {
  x: number;
  y: number;
}

export default function ProjectList({ projects }: ProjectListProps) {
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [cursorPos, setCursorPos] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative"
    >
      {/* Project List */}
      <ul className="space-y-2 md:space-y-1">
        {projects.map((project, index) => (
          <motion.li
            key={project.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: index * 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Link
              href={`/projects/${project.slug}`}
              className="group block py-3 md:py-2"
              onMouseEnter={() => !isMobile && setHoveredProject(project)}
              onMouseLeave={() => !isMobile && setHoveredProject(null)}
            >
              {/* Desktop: Just text */}
              <div className="hidden md:block">
                <span className="font-serif text-4xl lg:text-5xl text-foreground group-hover:text-muted transition-colors duration-200">
                  {project.title}
                </span>
              </div>

              {/* Mobile: Text with inline thumbnail */}
              <div className="md:hidden flex items-center gap-4">
                <div className="relative w-20 h-14 flex-shrink-0 overflow-hidden rounded bg-gray-100">
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <span className="font-serif text-2xl text-foreground">
                  {project.title}
                </span>
              </div>
            </Link>
          </motion.li>
        ))}

        {/* "to name a few..." - no hover */}
        <motion.li
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: projects.length * 0.05,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="py-3 md:py-2"
        >
          <span className="font-serif text-4xl lg:text-5xl text-muted italic">
            to name a few...
          </span>
        </motion.li>
      </ul>

      {/* Cursor-following thumbnail (desktop only) */}
      <AnimatePresence>
        {hoveredProject && !isMobile && (
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
            <div className="relative w-72 h-48 overflow-hidden rounded-lg shadow-2xl">
              <Image
                src={hoveredProject.thumbnail}
                alt={hoveredProject.title}
                fill
                className="object-cover"
                sizes="288px"
                priority
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
