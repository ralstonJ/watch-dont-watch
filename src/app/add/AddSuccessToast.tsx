'use client';
import { Toaster, toast } from 'sonner';
import { useEffect, Suspense } from 'react';
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

export default function AddSuccessToastWithSuspense() {
  return (
    <Suspense fallback={null}>
      <AddSuccessToast />
    </Suspense>
  );
}
