'use client';

import { useState, useEffect } from 'react';
import { Task, Priority } from '@/types';
import { addTask, updateTask, deleteTask, getTasks } from '@/lib/db/tasks';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Check, Trash2, Plus, Calendar, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface TaskListProps {
  projectId?: string;
}

export function TaskList({ projectId }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await getTasks(projectId);
        setTasks(data);
      } catch (error) {
        console.error('Failed to load tasks:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadTasks();
  }, [projectId]);

  const loadTasks = async () => {
    try {
      const data = await getTasks(projectId);
      setTasks(data);
    } catch (error) {
      console.error('Failed to load tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      const newTask: Omit<Task, 'id'> = {
        title: newTaskTitle,
        completed: false,
        priority: 'medium',
        projectId,
        createdAt: Date.now(),
        userId: 'admin', // Hardcoded for now
      };

      await addTask(newTask);
      setNewTaskTitle('');
      loadTasks();
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  };

  const handleToggleComplete = async (task: Task) => {
    try {
      // Optimistic update
      setTasks(tasks.map(t => 
        t.id === task.id ? { ...t, completed: !t.completed } : t
      ));
      
      await updateTask(task.id, { completed: !task.completed });
    } catch (error) {
      console.error('Failed to update task:', error);
      loadTasks(); // Revert on error
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this task?')) return;
    try {
      setTasks(tasks.filter(t => t.id !== id));
      await deleteTask(id);
    } catch (error) {
      console.error('Failed to delete task:', error);
      loadTasks();
    }
  };

  const handlePriorityChange = async (task: Task, priority: Priority) => {
    try {
      setTasks(tasks.map(t => 
        t.id === task.id ? { ...t, priority } : t
      ));
      await updateTask(task.id, { priority });
    } catch (error) {
      console.error('Failed to update priority:', error);
      loadTasks();
    }
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-400/10';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10';
      case 'low': return 'text-blue-400 bg-blue-400/10';
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleAddTask} className="flex gap-2">
        <Input
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1"
        />
        <Button type="submit" disabled={!newTaskTitle.trim()}>
          <Plus size={18} />
        </Button>
      </form>

      <div className="space-y-2">
        {isLoading ? (
          <div className="text-center py-4 text-zinc-500">Loading tasks...</div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-8 border border-dashed border-zinc-800 rounded-lg text-zinc-500">
            No tasks found. Add one above!
          </div>
        ) : (
          tasks.map((task) => (
            <div 
              key={task.id}
              className={cn(
                "group flex items-center justify-between p-3 rounded-lg border border-zinc-800 bg-zinc-900/30 transition-all hover:border-zinc-700",
                task.completed && "opacity-60 bg-zinc-900/10"
              )}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <button
                  onClick={() => handleToggleComplete(task)}
                  className={cn(
                    "flex-shrink-0 w-5 h-5 rounded border flex items-center justify-center transition-colors",
                    task.completed 
                      ? "bg-indigo-600 border-indigo-600 text-white" 
                      : "border-zinc-600 hover:border-indigo-500"
                  )}
                >
                  {task.completed && <Check size={12} />}
                </button>
                <span className={cn(
                  "text-sm truncate transition-all",
                  task.completed ? "text-zinc-500 line-through" : "text-zinc-200"
                )}>
                  {task.title}
                </span>
              </div>

              <div className="flex items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                <select
                  value={task.priority}
                  onChange={(e) => handlePriorityChange(task, e.target.value as Priority)}
                  className={cn(
                    "text-xs px-2 py-1 rounded bg-transparent border-none focus:ring-0 cursor-pointer font-medium",
                    getPriorityColor(task.priority)
                  )}
                >
                  <option value="low" className="bg-zinc-900 text-blue-400">Low</option>
                  <option value="medium" className="bg-zinc-900 text-yellow-400">Medium</option>
                  <option value="high" className="bg-zinc-900 text-red-400">High</option>
                </select>

                <button 
                  onClick={() => handleDelete(task.id)}
                  className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
