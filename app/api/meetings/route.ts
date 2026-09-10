import { NextRequest, NextResponse } from "next/server";
import { getMeetings } from "@/lib/meetings-db";
export function GET(request: NextRequest) { const date = request.nextUrl.searchParams.get("date") ?? undefined; return NextResponse.json(getMeetings(date)); }
