import { Project } from '@/types';
import projectsData from '@/data/projects.json';

export function getAllProjects(): Project[] {
  return projectsData as Project[];
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((project) => project.slug === slug);
}

export function getProjectSlugs(): string[] {
  return getAllProjects().map((project) => project.slug);
}

export function getAllTags(): string[] {
  const tags = getAllProjects().flatMap((project) => project.tags);
  return Array.from(new Set(tags)).sort();
}

export function getProjectsByTag(tag: string): Project[] {
  return getAllProjects().filter((project) => project.tags.includes(tag));
}
