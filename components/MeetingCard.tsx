import Link from "next/link";
import { deleteMeeting } from "@/lib/actions";
import type { SacramentMeeting } from "@/lib/types";

export function MeetingCard({ meeting }: { meeting: SacramentMeeting }) {
  const date = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${meeting.date}T12:00:00`));

  return (
    <article className="border-b border-[#b7b398] py-6">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#a26945]">
            {meeting.meetingType} meeting
          </p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-[#304a2c]">{date}</h2>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/meetings/${meeting.id}`}
            className="text-[11px] font-black uppercase tracking-[0.24em] text-[#304a2c] underline decoration-[#a26945] hover:text-[#a26945]"
          >
            View agenda
          </Link>
          <Link
            href={`/meetings/${meeting.id}/edit`}
            className="text-[11px] font-black uppercase tracking-[0.24em] text-[#304a2c] underline decoration-[#a26945] hover:text-[#a26945]"
          >
            Edit
          </Link>
          <form action={deleteMeeting}>
            <input type="hidden" name="id" value={String(meeting.id)} />
            <button
              type="submit"
              className="text-[11px] font-black uppercase tracking-[0.24em] text-[#7b3f2d] underline decoration-[#a26945] hover:text-[#a26945]"
            >
              Delete
            </button>
          </form>
        </div>
      </div>
      <p className="mt-4 text-[14px] text-[#5a6349]">
        Conducted by <span className="font-bold text-[#304a2c]">{meeting.conducting}</span>
      </p>
    </article>
  );
}
