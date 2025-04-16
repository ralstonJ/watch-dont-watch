'use client';
import { Toaster, toast } from 'sonner';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export function AddSuccessToast() {
  const searchParams = useSearchParams();
  useEffect(() => {
    if (searchParams.get('added') === '1') {
      toast.success('Video entry added successfully!');
    }
  }, [searchParams]);
  return <Toaster />;
}
