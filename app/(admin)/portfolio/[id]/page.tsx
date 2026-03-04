import { getProject } from '@/lib/db/projects';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';

export default async function ViewProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const project = await getProject(resolvedParams.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <Link href="/portfolio" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2">
          <ArrowLeft size={20} />
          <span>Back to Portfolio</span>
        </Link>
        <Link href={`/portfolio/${project.id}/edit`}>
          <Button variant="secondary" className="gap-2">
            <Pencil size={16} />
            Edit Project
          </Button>
        </Link>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 md:p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{project.title}</h1>
            <div className="flex items-center gap-3">
              <span className={`text-xs uppercase tracking-wider px-2 py-1 rounded-full font-medium ${
                project.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' :
                project.status === 'completed' ? 'bg-blue-500/10 text-blue-400' :
                'bg-zinc-500/10 text-zinc-400'
              }`}>
                {project.status}
              </span>
              {project.isPublished && (
                <span className="text-xs uppercase tracking-wider px-2 py-1 rounded-full font-medium bg-indigo-500/10 text-indigo-400">
                  Published
                </span>
              )}
            </div>
          </div>
        </div>

        {project.imageUrl && (
          <div className="aspect-video w-full bg-zinc-800 relative rounded-lg overflow-hidden mb-8">
            <Image 
              src={project.imageUrl} 
              alt={project.title}
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-2">Description</h3>
            <p className="text-zinc-400 whitespace-pre-wrap">{project.description}</p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-white mb-2">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack?.map((tech) => (
                <span key={tech} className="text-sm px-3 py-1 bg-zinc-800 text-zinc-300 rounded-md">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-zinc-800/50">
            {project.liveUrl && (
              <div>
                <h3 className="text-sm font-medium text-zinc-500 mb-1">Live URL</h3>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 break-all">
                  {project.liveUrl}
                </a>
              </div>
            )}
            {project.githubUrl && (
              <div>
                <h3 className="text-sm font-medium text-zinc-500 mb-1">GitHub URL</h3>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 break-all">
                  {project.githubUrl}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
