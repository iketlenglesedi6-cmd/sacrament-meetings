import { NextResponse } from "next/server";
import { getMeetingById } from "@/lib/meetings-db";
export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) { const { id } = await params; const numericId = Number(id); if (!Number.isInteger(numericId) || numericId < 1) return NextResponse.json({ error: "Meeting id must be a positive number." }, { status: 400 }); const meeting = getMeetingById(numericId); return meeting ? NextResponse.json(meeting) : NextResponse.json({ error: "Meeting not found." }, { status: 404 }); }
