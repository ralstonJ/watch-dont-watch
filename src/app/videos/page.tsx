import { getAllVideos, VideoEntry } from '@/lib/videos';
import { redirect } from 'next/navigation';

const PAGE_SIZE = 10;

type SearchParams = Promise<{ q?: string; page?: string }>;

function filterVideos(videos: VideoEntry[], q: string): VideoEntry[] {
  if (!q) return videos;
  const query = q.toLowerCase();
  return videos.filter(
    (v) =>
      v.title.toLowerCase().includes(query) ||
      v.createdBy.toLowerCase().includes(query)
  );
}

export default async function VideosPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const q = params.q || '';
  const page = Math.max(1, parseInt(params.page || '1', 10));
  const allVideos = await getAllVideos();
  const filtered = filterVideos(allVideos, q);
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // If page is out of range, redirect to first page
  if (page > totalPages && totalPages > 0)
    redirect(`/videos?q=${encodeURIComponent(q)}&page=1`);

  return (
    <section className="py-10 space-y-8">
      <h1 className="text-3xl font-bold mb-4">Video Summaries</h1>
      {/* Search bar */}
      <form
        action="/videos"
        method="get"
        className="mb-6 flex gap-2 items-center"
        autoComplete="off"
      >
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Search by title or created by..."
          className="w-full max-w-md px-4 py-2 border rounded shadow-sm"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded bg-primary text-primary-foreground"
        >
          Search
        </button>
      </form>
      {/* Video list */}
      <div className="space-y-6">
        {paginated.length === 0 ? (
          <div className="text-muted-foreground">
            No videos to display{q ? ' for this search.' : '.'}
          </div>
        ) : (
          paginated.map((video: VideoEntry, idx: number) => (
            <div key={idx} className="border rounded-lg p-4 shadow-sm bg-card">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold">{video.title}</h2>
                <span
                  className={
                    video.watchDecision === 'watch'
                      ? 'text-green-600 font-bold'
                      : 'text-red-600 font-bold'
                  }
                >
                  {video.watchDecision === 'watch' ? 'Watch' : "Don't Watch"}
                </span>
              </div>
              <div className="text-sm text-muted-foreground mb-1">
                Added by: {video.createdBy} on{' '}
                {new Date(video.createdAt).toLocaleDateString()}
              </div>
              <div className="mb-2">
                <span className="font-medium">TL;DR:</span> {video.tldr}
              </div>
              <a
                href={video.youtubeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm"
              >
                View on YouTube
              </a>
            </div>
          ))
        )}
      </div>
      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          <PaginationControls q={q} page={page} totalPages={totalPages} />
        </div>
      )}
    </section>
  );
}

type PaginationProps = { q: string; page: number; totalPages: number };

function PaginationControls({ q, page, totalPages }: PaginationProps) {
  const makeHref = (p: number) =>
    `/videos?q=${encodeURIComponent(q)}&page=${p}`;
  return (
    <nav className="flex gap-2 items-center">
      <a
        href={makeHref(page - 1)}
        className="px-3 py-1 rounded border text-sm disabled:opacity-50"
        aria-disabled={page <= 1}
        tabIndex={page <= 1 ? -1 : 0}
        style={{ pointerEvents: page <= 1 ? 'none' : undefined }}
      >
        Previous
      </a>
      {Array.from({ length: totalPages }, (_, i) => (
        <a
          key={i}
          href={makeHref(i + 1)}
          className={`px-3 py-1 rounded border text-sm ${
            i + 1 === page ? 'bg-primary text-primary-foreground' : ''
          }`}
        >
          {i + 1}
        </a>
      ))}
      <a
        href={makeHref(page + 1)}
        className="px-3 py-1 rounded border text-sm disabled:opacity-50"
        aria-disabled={page >= totalPages}
        tabIndex={page >= totalPages ? -1 : 0}
        style={{ pointerEvents: page >= totalPages ? 'none' : undefined }}
      >
        Next
      </a>
    </nav>
  );
}
