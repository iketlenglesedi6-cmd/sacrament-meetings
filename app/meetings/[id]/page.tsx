import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { MeetingDetail } from "@/components/MeetingDetail";
import type { SacramentMeeting } from "@/lib/types";
async function fetchMeeting(id: string): Promise<SacramentMeeting | null> { const headerList = await headers(); const host = headerList.get("host"); const protocol = headerList.get("x-forwarded-proto") ?? "http"; if (!host) throw new Error("Unable to determine the application host."); const response = await fetch(`${protocol}://${host}/api/meetings/${id}`, { cache: "no-store" }); if (response.status === 404) return null; if (!response.ok) throw new Error("Unable to load meeting."); return response.json() as Promise<SacramentMeeting>; }
export default async function MeetingPage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; const meeting = await fetchMeeting(id); if (!meeting) notFound(); return <main className="px-6 py-12"><div className="no-print mx-auto mb-5 max-w-3xl text-right"><p className="text-sm text-slate-500">Use your browser&apos;s Print command to print this program.</p></div><MeetingDetail meeting={meeting} /></main>; }
