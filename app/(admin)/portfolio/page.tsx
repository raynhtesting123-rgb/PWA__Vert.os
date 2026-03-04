'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Project } from '@/types';
import { getProjects, deleteProject } from '@/lib/db/projects';
import { Button } from '@/components/ui/Button';
import { Plus, ExternalLink, Github, MoreVertical, Pencil, Trash2, Eye } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '@/components/auth/AuthProvider';
import Image from 'next/image';

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && user) {
      loadProjects();
    }
  }, [user, authLoading]);

  const loadProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error('Failed to load projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      await deleteProject(id);
      loadProjects();
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">Portfolio CMS</h2>
          <p className="text-zinc-400 mt-1 md:mt-2 text-sm md:text-base">Manage your projects and showcase your work.</p>
        </div>
        <Link href="/portfolio/new" className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-[300px] rounded-xl bg-zinc-900/50 animate-pulse" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20 bg-zinc-900/30 rounded-xl border border-zinc-800 border-dashed">
          <h3 className="text-lg font-medium text-zinc-300">No projects yet</h3>
          <p className="text-zinc-500 mt-2 mb-6">Start building your portfolio by adding a project.</p>
          <Link href="/portfolio/new">
            <Button variant="secondary">Create Project</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="group relative flex flex-col bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-colors"
            >
              {/* Image Placeholder or Actual Image */}
              <div className="aspect-video w-full bg-zinc-800 relative overflow-hidden">
                {project.imageUrl ? (
                  <Image 
                    src={project.imageUrl} 
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-zinc-600">
                    No Image
                  </div>
                )}
                <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <Link href={`/portfolio/${project.id}`}>
                    <button className="p-2 bg-zinc-950/80 text-white rounded-md hover:bg-indigo-600 transition-colors" title="View Details">
                      <Eye size={14} />
                    </button>
                  </Link>
                  <Link href={`/portfolio/${project.id}/edit`}>
                    <button className="p-2 bg-zinc-950/80 text-white rounded-md hover:bg-blue-600 transition-colors" title="Edit">
                      <Pencil size={14} />
                    </button>
                  </Link>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(project.id);
                    }}
                    className="p-2 bg-zinc-950/80 text-white rounded-md hover:bg-red-600 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <div className="flex-1 p-5 flex flex-col">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white line-clamp-1">{project.title}</h3>
                  <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-medium ${
                    project.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' :
                    project.status === 'completed' ? 'bg-blue-500/10 text-blue-400' :
                    'bg-zinc-500/10 text-zinc-400'
                  }`}>
                    {project.status}
                  </span>
                </div>
                
                <p className="text-sm text-zinc-400 line-clamp-2 mb-4 flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack?.slice(0, 3).map((tech) => (
                    <span key={tech} className="text-xs px-2 py-1 bg-zinc-800 text-zinc-300 rounded-md">
                      {tech}
                    </span>
                  ))}
                  {project.techStack?.length > 3 && (
                    <span className="text-xs px-2 py-1 bg-zinc-800 text-zinc-500 rounded-md">
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-zinc-800/50">
                  <div className="flex space-x-3">
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-zinc-500 hover:text-white transition-colors"
                      >
                        <Github size={18} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-zinc-500 hover:text-white transition-colors"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                  <span className="text-xs text-zinc-600">
                    {formatDistanceToNow(project.createdAt, { addSuffix: true })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
