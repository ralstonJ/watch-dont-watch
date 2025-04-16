import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <section className="flex flex-col items-center justify-center py-20 gap-8">
      <h1 className="text-4xl font-bold text-center">
        Welcome to Watch or Don&apos;t Watch
      </h1>
      <p className="max-w-xl text-center text-lg text-muted-foreground">
        Discover, share, and decide which YouTube videos are worth your time.
        Browse community-contributed summaries, quick TL;DRs, and
        recommendations—so you can choose to watch or skip with confidence.
      </p>
      <Button asChild size="lg">
        <Link href="/videos">Browse Video Summaries</Link>
      </Button>
    </section>
  );
}
