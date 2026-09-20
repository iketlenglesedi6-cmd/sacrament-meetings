import Link from 'next/link';

export default function MeetingNotFound() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <div className="rounded border border-[#b7b398] bg-[#f8f5ed] p-8 text-[#304a2c]">
        <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#a26945]">Not found</p>
        <h1 className="mt-4 font-serif text-4xl font-bold">Meeting not found.</h1>
        <p className="mt-4 text-[15px] leading-7 text-[#5a6349]">
          The meeting you tried to edit may have been removed or never existed.
        </p>
        <Link
          href="/meetings"
          className="mt-6 inline-block rounded bg-[#304a2c] px-5 py-3 text-[11px] font-black uppercase tracking-[0.24em] text-white"
        >
          Back to meetings
        </Link>
      </div>
    </main>
  );
}
