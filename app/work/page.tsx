import { Metadata } from 'next';
import ProjectList from '@/components/ProjectList';
import { getAllProjects } from '@/lib/projects';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Motion design and experience design work by Salih Abdul-Karim.',
};

export default function WorkPage() {
  const projects = getAllProjects();

  return (
    <section className="py-16 md:py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <ProjectList projects={projects} />
      </div>
    </section>
  );
}
