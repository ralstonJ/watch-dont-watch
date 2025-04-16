import { Button } from '@/components/ui/button';
import { addVideoAction } from './action';
import AddSuccessToastWithSuspense from './AddSuccessToast';

export default function AddVideoPage() {
  return (
    <section className="py-10 max-w-xl mx-auto">
      <AddSuccessToastWithSuspense />
      <h1 className="text-3xl font-bold mb-6">Add a Video Summary</h1>
      <form action={addVideoAction} className="space-y-6">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            name="title"
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">YouTube Link</label>
          <input
            name="youtubeLink"
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">TL;DR</label>
          <input
            name="tldr"
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Summary</label>
          <textarea
            name="summary"
            className="w-full px-3 py-2 border rounded min-h-[100px]"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">
            Watch/Don&apos;t Watch
          </label>
          <select
            name="watchDecision"
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="watch">Watch</option>
            <option value="dont_watch">Don&apos;t Watch</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Created By</label>
          <input
            name="createdBy"
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Add Video
        </Button>
      </form>
    </section>
  );
}
