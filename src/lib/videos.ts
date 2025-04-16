import fs from 'fs-extra';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data', 'videos.json');

export type VideoEntry = {
  title: string;
  youtubeLink: string;
  tldr: string;
  summary: string;
  watchDecision: 'watch' | 'dont_watch';
  createdBy: string;
  createdAt: string;
};

export async function getAllVideos(): Promise<VideoEntry[]> {
  try {
    const data = await fs.readFile(DATA_PATH, 'utf-8');
    return JSON.parse(data) as VideoEntry[];
  } catch (err) {
    console.error('Error reading videos data:', err);
    return [];
  }
}
