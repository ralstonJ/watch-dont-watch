'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="w-full border-b mb-6 py-4 px-6 flex items-center justify-between bg-background">
      <Link href="/" className="text-xl font-bold tracking-tight">
        Watch or Don&apos;t Watch
      </Link>
      <nav className="flex gap-4">
        <Button asChild variant="ghost">
          <Link href="/">Home</Link>
        </Button>
        <Button asChild variant="ghost">
          <Link href="/videos">Videos</Link>
        </Button>
      </nav>
    </header>
  );
}
