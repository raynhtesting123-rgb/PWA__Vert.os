'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Snippet } from '@/types';
import { addSnippet, updateSnippet } from '@/lib/db/snippets';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

interface SnippetFormProps {
  initialData?: Snippet;
  isEditing?: boolean;
}

// Form data type where tags is a string for the input
type SnippetFormData = Omit<Snippet, 'tags' | 'createdAt' | 'userId' | 'id'> & {
  tags: string;
};

export function SnippetForm({ initialData, isEditing = false }: SnippetFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm<SnippetFormData>({
    defaultValues: initialData ? {
      title: initialData.title,
      code: initialData.code,
      language: initialData.language,
      tags: initialData.tags.join(', '),
    } : {
      language: 'typescript',
      tags: '',
    }
  });

  const onSubmit = async (data: SnippetFormData) => {
    setIsLoading(true);
    setError('');

    try {
      const formattedData = {
        ...data,
        tags: data.tags.split(',').map((t) => t.trim()).filter(Boolean),
      };

      if (isEditing && initialData) {
        await updateSnippet(initialData.id, formattedData);
      } else {
        await addSnippet({
          ...formattedData,
          createdAt: Date.now(),
          userId: 'admin', // Hardcoded for now
        });
      }
      
      router.push('/knowledge');
      router.refresh();
    } catch (err) {
      console.error(err);
      setError('Failed to save snippet. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/knowledge" className="text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-white">
          {isEditing ? 'Edit Snippet' : 'New Snippet'}
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Title"
            {...register('title', { required: 'Title is required' })}
            error={errors.title?.message}
            placeholder="e.g. React UseEffect Hook"
          />
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Language</label>
            <select
              {...register('language')}
              className="flex h-10 w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="typescript">TypeScript</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="css">CSS</option>
              <option value="html">HTML</option>
              <option value="sql">SQL</option>
              <option value="bash">Bash</option>
              <option value="json">JSON</option>
              <option value="markdown">Markdown</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">Code</label>
          <textarea
            {...register('code', { required: 'Code is required' })}
            className="flex min-h-[300px] w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm font-mono text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="// Paste your code here..."
            spellCheck={false}
          />
          {errors.code?.message && (
            <p className="text-xs text-red-500">{errors.code.message}</p>
          )}
        </div>

        <Input
          label="Tags (comma separated)"
          {...register('tags')}
          placeholder="react, hooks, frontend"
        />

        {error && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        <div className="flex justify-end space-x-4 pt-4">
          <Link href="/knowledge">
            <Button type="button" variant="secondary">Cancel</Button>
          </Link>
          <Button type="submit" isLoading={isLoading}>
            <Save className="mr-2 h-4 w-4" />
            {isEditing ? 'Update Snippet' : 'Save Snippet'}
          </Button>
        </div>
      </form>
    </div>
  );
}
