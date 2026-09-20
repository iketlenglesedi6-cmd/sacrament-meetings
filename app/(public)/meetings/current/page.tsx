import { redirect } from "next/navigation";
import { getMeetings } from "@/lib/meetings-db";

export default async function CurrentMeetingPage() {
  const now = new Date();
  const sunday = new Date(now);
  sunday.setDate(now.getDate() - now.getDay());
  const date = sunday.toISOString().slice(0, 10);

  const meetings = await getMeetings();
  const meeting =
    meetings.find((item) => item.date === date) ??
    meetings.find((item) => item.date >= date) ??
    meetings.at(-1);

  if (!meeting) {
    redirect("/meetings");
  }

  redirect(`/meetings/${meeting.id}`);
}
