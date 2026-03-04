'use client';

import { useState, useEffect } from 'react';
import { Project } from '@/types';
import { getProjects } from '@/lib/db/projects';
import { TaskList } from '@/components/tasks/TaskList';
import { cn } from '@/lib/utils';
import { useAuth } from '@/components/auth/AuthProvider';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string | undefined>(undefined);
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
      // Default to "All Tasks" (undefined) to avoid immediate index error
      // if (data.length > 0) {
      //   setSelectedProjectId(data[0].id);
      // }
    } catch (error) {
      console.error('Failed to load projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col md:flex-row gap-6">
      {/* Project Sidebar */}
      <div className="w-full md:w-64 flex-shrink-0 space-y-4">
        <h2 className="text-xl font-bold text-white px-2">Projects</h2>
        <div className="flex md:flex-col overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 gap-1 md:space-y-1 no-scrollbar">
          <button
            onClick={() => setSelectedProjectId(undefined)}
            className={cn(
              "whitespace-nowrap md:whitespace-normal w-auto md:w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              selectedProjectId === undefined
                ? "bg-zinc-800 text-white"
                : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
            )}
          >
            All Tasks
          </button>
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => setSelectedProjectId(project.id)}
              className={cn(
                "whitespace-nowrap md:whitespace-normal w-auto md:w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors truncate",
                selectedProjectId === project.id
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
              )}
            >
              {project.title}
            </button>
          ))}
        </div>
      </div>

      {/* Task List Area */}
      <div className="flex-1 bg-zinc-900/30 border border-zinc-800 rounded-xl p-6 overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">
            {selectedProjectId 
              ? projects.find(p => p.id === selectedProjectId)?.title 
              : 'All Tasks'}
          </h2>
          <p className="text-zinc-400 text-sm mt-1">
            Manage your tasks and priorities
          </p>
        </div>
        
        <TaskList projectId={selectedProjectId} />
      </div>
    </div>
  );
}
