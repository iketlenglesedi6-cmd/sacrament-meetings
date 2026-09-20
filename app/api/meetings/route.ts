import { NextRequest, NextResponse } from "next/server";
import { getMeetings } from "@/lib/meetings-db";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const date = searchParams.get("date") ?? undefined;
  const query = searchParams.get("query") ?? "";
  const currentPage = Number(searchParams.get("page") ?? "1") || 1;

  return NextResponse.json(await getMeetings(query, currentPage, date));
}
