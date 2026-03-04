import { getPublicProject } from '@/lib/db/projects';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Github, Globe, Calendar, Layers } from 'lucide-react';
import { format } from 'date-fns';

export default async function ProjectCaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  let project;
  try {
    project = await getPublicProject(resolvedParams.slug);
  } catch (error) {
    console.error('Failed to fetch project:', error);
    notFound();
  }

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30 pt-24 pb-16 sm:pt-32 sm:pb-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/#work" className="inline-flex items-center text-sm font-medium text-zinc-400 hover:text-white transition-colors mb-8 sm:mb-12">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Portfolio
        </Link>

        <header className="mb-10 sm:mb-16">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-medium border border-indigo-500/20">
              Case Study
            </span>
            <span className="text-zinc-500 text-xs sm:text-sm flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              {format(project.createdAt, 'MMMM yyyy')}
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-4 sm:mb-6">{project.title}</h1>
          
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black text-sm font-medium hover:bg-zinc-200 transition-colors">
                <Globe size={16} /> Live Project
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white text-sm font-medium hover:bg-zinc-800 transition-colors">
                <Github size={16} /> View Source
              </a>
            )}
          </div>

          <div className="flex items-start gap-4 p-6 rounded-xl bg-zinc-900/50 border border-zinc-800">
            <Layers className="h-6 w-6 text-indigo-400 shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-white mb-2">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map(tech => (
                  <span key={tech} className="px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-300 text-xs font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </header>

        {project.imageUrl && (
          <div className="aspect-video rounded-2xl overflow-hidden border border-zinc-800 mb-10 sm:mb-16 bg-zinc-900 relative">
            <Image 
              src={project.imageUrl} 
              alt={project.title}
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        <article className="prose prose-invert prose-zinc max-w-none prose-headings:font-bold prose-h2:text-3xl prose-h3:text-2xl prose-a:text-indigo-400 hover:prose-a:text-indigo-300 prose-img:rounded-xl">
          <ReactMarkdown>{project.description}</ReactMarkdown>
        </article>
      </div>
    </div>
  );
}
