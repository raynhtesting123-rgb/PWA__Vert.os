'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Transaction, TransactionType } from '@/types';
import { addTransaction } from '@/lib/db/finances';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Loader2 } from 'lucide-react';

interface TransactionFormProps {
  onSuccess: () => void;
}

export function TransactionForm({ onSuccess }: TransactionFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Omit<Transaction, 'id' | 'createdAt' | 'userId'>>();

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      await addTransaction({
        ...data,
        amount: parseFloat(data.amount),
        date: new Date(data.date).getTime(),
        createdAt: Date.now(),
        userId: 'admin', // Hardcoded for now
      });
      reset();
      onSuccess();
    } catch (error) {
      console.error('Failed to add transaction:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl">
      <h3 className="text-lg font-medium text-white mb-4">Add Transaction</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">Type</label>
          <select
            {...register('type', { required: true })}
            className="flex h-10 w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <Input
          type="number"
          step="0.01"
          label="Amount"
          {...register('amount', { required: 'Amount is required', min: 0 })}
          error={errors.amount?.message}
          placeholder="0.00"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          type="date"
          label="Date"
          {...register('date', { required: 'Date is required' })}
          error={errors.date?.message}
        />
        
        <Input
          label="Category"
          {...register('category', { required: 'Category is required' })}
          error={errors.category?.message}
          placeholder="e.g. Client Work, Software"
        />
      </div>

      <Input
        label="Description"
        {...register('description', { required: 'Description is required' })}
        error={errors.description?.message}
        placeholder="Brief description..."
      />

      <Button type="submit" className="w-full" isLoading={isLoading}>
        Add Transaction
      </Button>
    </form>
  );
}
