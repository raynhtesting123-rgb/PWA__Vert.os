import { ProjectForm } from '@/components/projects/ProjectForm';
import { getProject } from '@/lib/db/projects';
import { notFound } from 'next/navigation';

export default async function EditProjectPage({
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
    <div className="max-w-4xl mx-auto">
      <ProjectForm initialData={project} isEditing />
    </div>
  );
}
