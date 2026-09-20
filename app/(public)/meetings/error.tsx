'use client';

import Link from 'next/link';

export default function MeetingsError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <div className="rounded border border-[#b7b398] bg-[#f8f5ed] p-8 text-[#304a2c]">
        <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#a26945]">Something went wrong</p>
        <h1 className="mt-4 font-serif text-4xl font-bold">We couldn’t load the meeting list.</h1>
        <p className="mt-4 text-[15px] leading-7 text-[#5a6349]">
          {error.message || 'An unexpected error occurred while loading meeting data.'}
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <button
            type="button"
            onClick={() => reset()}
            className="rounded bg-[#304a2c] px-5 py-3 text-[11px] font-black uppercase tracking-[0.24em] text-white"
          >
            Try Again
          </button>
          <Link
            href="/meetings"
            className="rounded border border-[#304a2c] px-5 py-3 text-[11px] font-black uppercase tracking-[0.24em] text-[#304a2c]"
          >
            Back to meetings
          </Link>
        </div>
      </div>
    </main>
  );
}
