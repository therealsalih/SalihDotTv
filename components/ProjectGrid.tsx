'use client';

import { useState, useMemo } from 'react';
import { Project } from '@/types';
import ProjectCard from './ProjectCard';
import TagFilter from './TagFilter';

interface ProjectGridProps {
  projects: Project[];
  tags: string[];
}

export default function ProjectGrid({ projects, tags }: ProjectGridProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filteredProjects = useMemo(() => {
    if (!activeTag) return projects;
    return projects.filter((project) => project.tags.includes(activeTag));
  }, [projects, activeTag]);

  return (
    <section id="work" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Selected Work
          </h2>
          <TagFilter
            tags={tags}
            activeTag={activeTag}
            onTagChange={setActiveTag}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <p className="text-center text-muted py-12">
            No projects found with the selected tag.
          </p>
        )}
      </div>
    </section>
  );
}
