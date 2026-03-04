'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getProjects } from '@/lib/db/projects';
import { getTasks } from '@/lib/db/tasks';
import { getSnippets } from '@/lib/db/snippets';
import { getTransactions } from '@/lib/db/finances';
import { Project, Task, Snippet, Transaction } from '@/types';
import { 
  Briefcase, 
  CheckSquare, 
  DollarSign, 
  Code2, 
  Plus, 
  ArrowRight,
  Activity
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '@/components/auth/AuthProvider';

export default function Home() {
  const [stats, setStats] = useState({
    projects: 0,
    tasks: 0,
    revenue: 0,
    snippets: 0
  });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && user) {
      loadDashboardData();
    }
  }, [user, authLoading]);

  const loadDashboardData = async () => {
    try {
      const [projectsData, tasksData, snippetsData, transactionsData] = await Promise.all([
        getProjects(),
        getTasks(),
        getSnippets(),
        getTransactions()
      ]);

      // Calculate Stats
      const activeProjects = projectsData.filter(p => p.status === 'active').length;
      const activeTasks = tasksData.filter(t => !t.completed).length;
      const currentMonth = new Date().getMonth();
      const monthlyRevenue = transactionsData
        .filter(t => t.type === 'income' && new Date(t.date).getMonth() === currentMonth)
        .reduce((sum, t) => sum + t.amount, 0);
      
      setStats({
        projects: activeProjects,
        tasks: activeTasks,
        revenue: monthlyRevenue,
        snippets: snippetsData.length
      });

      // Combine recent activity
      const activity = [
        ...projectsData.map(p => ({ type: 'project', data: p, date: p.createdAt })),
        ...tasksData.map(t => ({ type: 'task', data: t, date: t.createdAt })),
        ...snippetsData.map(s => ({ type: 'snippet', data: s, date: s.createdAt }))
      ].sort((a, b) => b.date - a.date).slice(0, 5);

      setRecentActivity(activity);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, href }: any) => (
    <Link href={href} className="block group">
      <div className="p-6 bg-[var(--card)]/50 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-all hover:bg-[var(--card)]/80">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-[var(--muted-foreground)]">{title}</h3>
          <div className={`p-2 rounded-lg ${color} bg-opacity-10`}>
            <Icon size={18} className={color.replace('bg-', 'text-')} />
          </div>
        </div>
        <p className="text-2xl font-bold text-white group-hover:text-violet-400 transition-colors">
          {value}
        </p>
      </div>
    </Link>
  );

  return (
    <div className="space-y-8 pb-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">Dashboard</h2>
        <p className="text-[var(--muted-foreground)] mt-2">Welcome back to Vekt OS.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Active Projects" 
          value={isLoading ? '-' : stats.projects} 
          icon={Briefcase} 
          color="text-emerald-400 bg-emerald-400"
          href="/portfolio"
        />
        <StatCard 
          title="Pending Tasks" 
          value={isLoading ? '-' : stats.tasks} 
          icon={CheckSquare} 
          color="text-amber-400 bg-amber-400"
          href="/projects"
        />
        <StatCard 
          title="Monthly Revenue" 
          value={isLoading ? '-' : `$${stats.revenue.toFixed(0)}`} 
          icon={DollarSign} 
          color="text-violet-400 bg-violet-400"
          href="/finances"
        />
        <StatCard 
          title="Code Snippets" 
          value={isLoading ? '-' : stats.snippets} 
          icon={Code2} 
          color="text-blue-400 bg-blue-400"
          href="/knowledge"
        />
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="lg:col-span-2 p-6 bg-[var(--card)]/50 border border-zinc-800 rounded-xl min-h-[300px]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-white">Recent Activity</h3>
            <Activity size={18} className="text-[var(--muted-foreground)]" />
          </div>
          
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-12 bg-zinc-900 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : recentActivity.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-[var(--muted-foreground)]">
              <p>No recent activity</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-[var(--card)]/30 border border-zinc-800/50">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      item.type === 'project' ? 'bg-emerald-500/10 text-emerald-500' :
                      item.type === 'task' ? 'bg-amber-500/10 text-amber-500' :
                      'bg-blue-500/10 text-blue-500'
                    }`}>
                      {item.type === 'project' ? <Briefcase size={14} /> :
                       item.type === 'task' ? <CheckSquare size={14} /> :
                       <Code2 size={14} />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        {item.type === 'project' ? `Created project "${item.data.title}"` :
                         item.type === 'task' ? `Added task "${item.data.title}"` :
                         `Saved snippet "${item.data.title}"`}
                      </p>
                      <p className="text-xs text-[var(--muted-foreground)]">
                        {formatDistanceToNow(item.date, { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="p-6 bg-[var(--card)]/50 border border-zinc-800 rounded-xl h-fit">
          <h3 className="text-lg font-medium text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link href="/portfolio/new">
              <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-sm text-zinc-200 transition-colors group">
                <span className="flex items-center gap-2">
                  <Plus size={16} className="text-emerald-400" />
                  New Project
                </span>
                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </Link>
            <Link href="/projects">
              <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-sm text-zinc-200 transition-colors group">
                <span className="flex items-center gap-2">
                  <Plus size={16} className="text-amber-400" />
                  Add Task
                </span>
                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </Link>
            <Link href="/finances">
              <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-sm text-zinc-200 transition-colors group">
                <span className="flex items-center gap-2">
                  <Plus size={16} className="text-violet-400" />
                  Add Transaction
                </span>
                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </Link>
            <Link href="/knowledge/new">
              <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-sm text-zinc-200 transition-colors group">
                <span className="flex items-center gap-2">
                  <Plus size={16} className="text-blue-400" />
                  Save Snippet
                </span>
                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
