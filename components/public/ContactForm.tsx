'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { addLead } from '@/lib/db/leads';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { CheckCircle2, Send } from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  bottleneck: string;
  message: string;
}

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true);
    try {
      await addLead(data);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Failed to submit lead:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
        <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
        <p className="text-zinc-400">I&apos;ll get back to you as soon as possible.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Name"
          placeholder="> JOHN DOE"
          {...register('name', { required: 'Name is required' })}
          error={errors.name?.message}
          className="bg-zinc-900/50 border-slate-600 focus:border-violet-500 focus:ring-violet-500 font-mono text-sm placeholder:text-zinc-600"
        />
        <Input
          label="Email"
          type="email"
          placeholder="> JOHN@EXAMPLE.COM"
          {...register('email', { 
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address"
            }
          })}
          error={errors.email?.message}
          className="bg-zinc-900/50 border-slate-600 focus:border-violet-500 focus:ring-violet-500 font-mono text-sm placeholder:text-zinc-600"
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-zinc-300">Primary Scaling Bottleneck</label>
        <select
          {...register('bottleneck', { required: 'Please select a bottleneck' })}
          className="w-full h-10 px-3 py-2 rounded-md bg-zinc-900/50 border border-slate-600 focus:border-violet-500 focus:ring-violet-500 font-mono text-sm text-white placeholder:text-zinc-600 outline-none transition-colors"
        >
          <option value="" disabled hidden>&gt; SELECT BOTTLENECK...</option>
          <option value="High Platform Fees (Shopify, etc.)">High Platform Fees (Shopify, etc.)</option>
          <option value="Manual Data Entry & Human Error">Manual Data Entry &amp; Human Error</option>
          <option value="Slow Fulfillment & Operations">Slow Fulfillment &amp; Operations</option>
          <option value="Fragmented Software Stack">Fragmented Software Stack</option>
          <option value="Other">Other</option>
        </select>
        {errors.bottleneck && (
          <p className="text-sm text-red-500">{errors.bottleneck.message}</p>
        )}
      </div>
      <Textarea
        label="Message"
        placeholder="> ENTER SYSTEM REQUIREMENTS..."
        rows={4}
        {...register('message', { required: 'Message is required' })}
        error={errors.message?.message}
        className="bg-zinc-900/50 border-slate-600 focus:border-violet-500 focus:ring-violet-500 font-mono text-sm placeholder:text-zinc-600"
      />
      <Button 
        type="submit" 
        isLoading={isLoading}
        className="w-full md:w-auto relative overflow-hidden h-12 px-8 text-xs rounded-none border-2 border-pink-500 bg-pink-600/20 hover:bg-pink-600/40 text-pink-100 gap-2 font-mono scanline-btn transition-all duration-300 uppercase tracking-widest hover:shadow-[0_0_20px_rgba(236,72,153,0.6)]"
      >
        <span className="absolute inset-0 shadow-[0_0_20px_rgba(236,72,153,0.4)] animate-pulse pointer-events-none" />
        <Send className="w-4 h-4 mr-2" />
        RUN DIAGNOSTIC &amp; INITIALIZE
      </Button>
    </form>
  );
}
