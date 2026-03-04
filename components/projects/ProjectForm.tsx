'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Project } from '@/types';
import { addProject, updateProject } from '@/lib/db/projects';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { ArrowLeft, Upload, X } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/components/auth/AuthProvider';
import { storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Image from 'next/image';

import { revalidatePortfolio } from '@/app/actions';

interface ProjectFormProps {
  initialData?: Project;
  isEditing?: boolean;
}

// Form data type where techStack is a string for the input
type ProjectFormData = Omit<Project, 'techStack' | 'createdAt' | 'updatedAt' | 'userId' | 'id'> & {
  techStack: string;
};

export function ProjectForm({ initialData, isEditing = false }: ProjectFormProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>(
    initialData?.images || (initialData?.imageUrl ? [initialData.imageUrl] : [])
  );

  const { register, handleSubmit, formState: { errors } } = useForm<ProjectFormData>({
    defaultValues: initialData ? {
      title: initialData.title,
      description: initialData.description,
      status: initialData.status,
      githubUrl: initialData.githubUrl,
      liveUrl: initialData.liveUrl,
      imageUrl: initialData.imageUrl,
      techStack: initialData.techStack.join(', '),
      isPublished: initialData.isPublished || false,
    } : {
      status: 'active',
      techStack: '',
      isPublished: false,
    }
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      setImageFiles(prev => [...prev, ...newFiles]);
      
      const newUrls = newFiles.map(file => URL.createObjectURL(file));
      setPreviewUrls(prev => [...prev, ...newUrls]);
    }
  };

  const removeImage = (index: number) => {
    // If it's a newly added file
    if (index >= (previewUrls.length - imageFiles.length)) {
      const fileIndex = index - (previewUrls.length - imageFiles.length);
      setImageFiles(prev => prev.filter((_, i) => i !== fileIndex));
    }
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: ProjectFormData) => {
    if (!user) {
      setError('You must be logged in to create a project.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Start with existing images (excluding local previews of new files)
      const existingImages = previewUrls.filter(url => url.startsWith('http') || url.startsWith('https'));
      const newImageUrls: string[] = [];

      // Upload new files
      if (imageFiles.length > 0) {
        for (const file of imageFiles) {
          const storageRef = ref(storage, `projects/${user.uid}/${Date.now()}_${file.name}`);
          const snapshot = await uploadBytes(storageRef, file);
          const url = await getDownloadURL(snapshot.ref);
          newImageUrls.push(url);
        }
      }

      const allImages = [...existingImages, ...newImageUrls];
      const mainImageUrl = allImages.length > 0 ? allImages[0] : undefined;

      const formattedData = {
        ...data,
        techStack: data.techStack.split(',').map((t) => t.trim()).filter(Boolean),
        updatedAt: Date.now(),
        imageUrl: mainImageUrl, // Keep for backward compatibility
        images: allImages,
      };

      if (isEditing && initialData) {
        await updateProject(initialData.id, formattedData);
      } else {
        await addProject({
          ...formattedData,
          createdAt: Date.now(),
          userId: user.uid,
        });
      }
      
      // Revalidate the public portfolio and admin list
      await revalidatePortfolio();
      
      router.push('/portfolio');
      router.refresh();
    } catch (err: any) {
      console.error(err);
      if (err.code === 'storage/unauthorized') {
        setError('Permission denied. Please check your Firebase Storage rules in the console.');
        alert('Firebase Storage Error: Permission denied.\n\nPlease go to your Firebase Console > Storage > Rules and ensure you have allowed read/write access.\n\nExample Rule:\nallow read, write: if request.auth != null;');
      } else {
        setError('Failed to save project. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/portfolio" className="text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-white">
          {isEditing ? 'Edit Project' : 'New Project'}
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
        <Input
          label="Project Title"
          {...register('title', { required: 'Title is required' })}
          error={errors.title?.message}
          placeholder="e.g. Developer OS"
        />

        <Textarea
          label="Description"
          {...register('description', { required: 'Description is required' })}
          error={errors.description?.message}
          placeholder="Brief overview of the project..."
          rows={4}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Live URL"
            {...register('liveUrl')}
            placeholder="https://..."
          />
          <Input
            label="GitHub URL"
            {...register('githubUrl')}
            placeholder="https://github.com/..."
          />
        </div>

        <Input
          label="Tech Stack (comma separated)"
          {...register('techStack')}
          placeholder="React, Next.js, Firebase, Tailwind"
        />

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Status</label>
              <select
                {...register('status')}
                className="flex h-10 w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div className="flex items-center space-x-3 pt-8">
              <input
                type="checkbox"
                id="isPublished"
                {...register('isPublished')}
                className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="isPublished" className="text-sm font-medium text-zinc-300 select-none cursor-pointer">
                Publish to Public Portfolio
              </label>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Project Images</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {previewUrls.map((url, index) => (
                <div key={index} className="relative aspect-video rounded-lg overflow-hidden border border-zinc-700 group">
                  <Image src={url} alt={`Preview ${index + 1}`} fill className="object-cover" referrerPolicy="no-referrer" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  >
                    <X className="text-white h-6 w-6" />
                  </button>
                </div>
              ))}
              <label className="flex aspect-video cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-zinc-700 bg-zinc-900/50 hover:bg-zinc-900 hover:border-zinc-500 transition-all">
                <Upload className="h-6 w-6 text-zinc-500 mb-1" />
                <span className="text-[10px] text-zinc-500">Upload</span>
                <input type="file" className="hidden" accept="image/*" multiple onChange={handleImageChange} />
              </label>
            </div>
            <p className="text-xs text-zinc-500">First image will be used as the cover.</p>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        <div className="flex justify-end space-x-4 pt-4">
          <Link href="/portfolio">
            <Button type="button" variant="secondary">Cancel</Button>
          </Link>
          <Button type="submit" isLoading={isLoading}>
            {isEditing ? 'Update Project' : 'Create Project'}
          </Button>
        </div>
      </form>
    </div>
  );
}
