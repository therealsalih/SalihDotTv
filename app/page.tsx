import ProjectList from '@/components/ProjectList';
import { getAllProjects } from '@/lib/projects';

export default function HomePage() {
  const projects = getAllProjects();

  return (
    <section className="py-16 md:py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <ProjectList projects={projects} />
      </div>
    </section>
  );
}
