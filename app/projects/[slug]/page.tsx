import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import VimeoEmbed from '@/components/VimeoEmbed';
import AnimatedText from '@/components/AnimatedText';
import { getProjectBySlug, getProjectSlugs, getAllProjects } from '@/lib/projects';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const allProjects = getAllProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];
  const prevProject = allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length];

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Main content area */}
      <div className="flex-1 flex flex-col lg:flex-row pt-20 px-6 pb-6 gap-6 min-h-0">
        {/* Video - left side on desktop */}
        <div className="flex-1 min-h-0 flex flex-col">
          <div className="flex-1 min-h-0">
            <VimeoEmbed vimeoId={project.vimeoId} title={project.title} />
          </div>
        </div>

        {/* Info panel - right side on desktop */}
        <div className="lg:w-80 flex flex-col justify-between shrink-0">
          <div>
            {/* Navigation */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
              <Link
                href={`/projects/${prevProject.slug}`}
                className="px-5 py-2 rounded-full bg-black text-white text-sm hover:bg-black/80 transition-all"
              >
                Prev
              </Link>

              <Link
                href={`/projects/${nextProject.slug}`}
                className="px-5 py-2 rounded-full bg-black text-white text-sm hover:bg-black/80 transition-all"
              >
                Next
              </Link>
            </div>

            {/* Title */}
            <h1 className="font-display text-3xl font-bold mb-4">
              <AnimatedText text={project.title} />
            </h1>

            {/* Description */}
            {project.description && (
              <p className="text-sm text-muted leading-relaxed mb-6">
                {project.description}
              </p>
            )}

            {/* Metadata */}
            <div className="space-y-4 text-sm">
              {project.client && (
                <div>
                  <span className="text-muted">Client: </span>
                  <span className="text-foreground">{project.client}</span>
                </div>
              )}
              {project.role && (
                <div>
                  <span className="text-muted">Role: </span>
                  <span className="text-foreground">{project.role}</span>
                </div>
              )}
              <div>
                <span className="text-muted">Date: </span>
                <span className="text-foreground">
                  {new Date(project.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                  })}
                </span>
              </div>
              {project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-white/5 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
