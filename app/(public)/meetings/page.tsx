import type { Metadata } from "next";
import { MeetingCard } from "@/components/MeetingCard";
import { MeetingSearch } from "@/components/MeetingSearch";
import { Pagination } from "@/components/Pagination";
import { getMeetings, getMeetingsTotalPages } from "@/lib/meetings-db";

export const metadata: Metadata = {
  title: "All Meetings",
  description: "Browse recent and upcoming sacrament meeting programs and ward planning details.",
};

export default async function MeetingsPage(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query ?? "";
  const currentPage = Number(searchParams?.page) || 1;

  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-serif text-4xl font-bold text-[#304a2c]">All meeting programs</h1>
          <p className="mt-2 text-slate-600">View agendas from recent and upcoming Sundays.</p>
        </div>
        <MeetingSearch />
      </div>

      {meetings.length === 0 ? (
        <p className="rounded border border-[#b7b398] bg-[#f8f5ed] p-6 text-[#5a6349]">
          No meetings match your search.
        </p>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">{meetings.map((meeting) => <MeetingCard key={meeting.id} meeting={meeting} />)}</div>
      )}

      <div className="mt-8">
        <Pagination totalPages={totalPages} />
      </div>
    </main>
  );
}
