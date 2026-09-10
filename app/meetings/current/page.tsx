import { redirect } from "next/navigation";
import { getMeetings } from "@/lib/meetings-db";
export default function CurrentMeetingPage() { const now = new Date(); const sunday = new Date(now); sunday.setDate(now.getDate() - now.getDay()); const date = sunday.toISOString().slice(0, 10); const meeting = getMeetings(date)[0] ?? getMeetings().find((item) => item.date >= date) ?? getMeetings().at(-1); if (!meeting) redirect("/meetings"); redirect(`/meetings/${meeting.id}`); }
