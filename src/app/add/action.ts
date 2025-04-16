'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import fs from 'fs-extra';
import path from 'path';
import { VideoEntry } from '@/lib/videos';

const DATA_PATH = path.join(process.cwd(), 'data', 'videos.json');

export async function addVideoAction(formData: FormData) {
  const newEntry: VideoEntry = {
    title: formData.get('title') as string,
    youtubeLink: formData.get('youtubeLink') as string,
    tldr: formData.get('tldr') as string,
    summary: formData.get('summary') as string,
    watchDecision: formData.get('watchDecision') as 'watch' | 'dont_watch',
    createdBy: formData.get('createdBy') as string,
    createdAt: new Date().toISOString(),
  };

  let videos: VideoEntry[] = [];
  try {
    const data = await fs.readFile(DATA_PATH, 'utf-8');
    videos = JSON.parse(data);
  } catch {}
  videos.unshift(newEntry);
  await fs.writeFile(DATA_PATH, JSON.stringify(videos, null, 2));
  revalidatePath('/videos');
  redirect('/add?added=1');
}
