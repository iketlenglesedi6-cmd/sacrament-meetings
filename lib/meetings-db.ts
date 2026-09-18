import { neon } from "@neondatabase/serverless";
import type { SacramentMeeting } from "./types";

const ITEMS_PER_PAGE = 5;

const fallbackMeetings: SacramentMeeting[] = [
  {
    id: 1,
    date: "2026-05-03",
    meetingType: "testimony",
    presiding: "Bishop David Chen",
    conducting: "Brother Elias Grant",
    announcements: ["Ward service project this Saturday", "Youth conference registration closes Friday"],
    openingHymn: { number: 19, title: "We Thank Thee, O God, for a Prophet" },
    openingPrayer: "Sister Nora Williams",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: "As Now We Take the Sacrament" },
    speakers: [{ name: "Members of the ward", topic: "Testimonies of Jesus Christ", type: "speaker" }],
    closingHymn: { number: 85, title: "How Firm a Foundation" },
    closingPrayer: "Brother Owen Price",
  },
  {
    id: 2,
    date: "2026-08-30",
    meetingType: "regular",
    presiding: "Bishop David Chen",
    conducting: "Sister Maya Hart",
    announcements: ["Sunday School teachers meeting at 1:15 p.m."],
    openingHymn: { number: 2, title: "The Spirit of God" },
    openingPrayer: "Brother Samuel Lee",
    wardBusiness: [{ description: "Sustain Aaron Blake as ward clerk." }],
    stakeBusiness: false,
    sacramentHymn: { number: 173, title: "While of These Emblems We Partake" },
    speakers: [
      { name: "Sister Ava Morgan", topic: "Finding peace through the Savior", type: "speaker" },
      { name: "Brother Daniel Brooks", topic: "Choose the right", type: "speaker" },
    ],
    closingHymn: { number: 270, title: "I'll Go Where You Want Me to Go" },
    closingPrayer: "Sister Ella King",
  },
  {
    id: 3,
    date: "2026-09-06",
    meetingType: "testimony",
    presiding: "Bishop David Chen",
    conducting: "Brother Elias Grant",
    announcements: ["Fast offering donations are welcome."],
    openingHymn: { number: 98, title: "I Need Thee Every Hour" },
    openingPrayer: "Sister Lila Reed",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 171, title: "With Humble Heart" },
    speakers: [{ name: "Members of the ward", topic: "Testimonies of the restored gospel", type: "speaker" }],
    closingHymn: { number: 100, title: "Nearer, My God, to Thee" },
    closingPrayer: "Brother Isaac Ward",
  },
  {
    id: 4,
    date: "2026-09-13",
    meetingType: "regular",
    presiding: "Bishop David Chen",
    conducting: "Sister Maya Hart",
    announcements: ["Primary program rehearsal next Sunday."],
    openingHymn: { number: 6, title: "Redeemer of Israel" },
    openingPrayer: "Brother Noah Kim",
    wardBusiness: [{ description: "Release Sister June Park as Relief Society secretary." }],
    stakeBusiness: false,
    sacramentHymn: { number: 187, title: "God Loved Us, So He Sent His Son" },
    speakers: [
      { name: "Ward Choir", topic: "Abide with Me, 'Tis Eventide", type: "musical-number" },
      { name: "Sister Clara James", topic: "Ministering with love", type: "speaker" },
    ],
    closingHymn: { number: 220, title: "Lord, I Would Follow Thee" },
    closingPrayer: "Sister Ruby Cole",
  },
  {
    id: 5,
    date: "2026-09-20",
    meetingType: "stake",
    presiding: "President Marcus Hill",
    conducting: "Brother Elias Grant",
    announcements: ["Stake conference begins at 10:00 a.m."],
    openingHymn: { number: 27, title: "Praise to the Man" },
    openingPrayer: "Sister Hannah Young",
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 0, title: "No sacrament hymn" },
    speakers: [{ name: "President Marcus Hill", topic: "Building Zion together", type: "speaker" }],
    closingHymn: { number: 30, title: "Come, Come, Ye Saints" },
    closingPrayer: "Brother Liam Ross",
  },
];

const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null;

function filterFallbackMeetings(
  list: SacramentMeeting[],
  query: string = "",
  exactDate?: string
): SacramentMeeting[] {
  const normalizedQuery = query.trim().toLowerCase();

  return list.filter((meeting) => {
    if (exactDate && meeting.date !== exactDate) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    const searchableText = [
      meeting.presiding,
      meeting.conducting,
      meeting.meetingType,
      ...meeting.speakers.map((speaker) => speaker.name),
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });
}

export async function getMeetings(
  query: string = "",
  currentPage: number = 1,
  exactDate?: string
): Promise<SacramentMeeting[]> {
  if (!sql) {
    const page = Number.isFinite(currentPage) && currentPage > 0 ? currentPage : 1;
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filterFallbackMeetings(fallbackMeetings, query, exactDate).slice(start, start + ITEMS_PER_PAGE);
  }

  const searchTerm = `%${query}%`;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const dateFilter = exactDate?.trim();

  const rows = dateFilter
    ? await sql`
        SELECT
          id,
          to_char(date, 'YYYY-MM-DD') AS "date",
          meeting_type AS "meetingType",
          presiding,
          conducting,
          announcements,
          opening_hymn AS "openingHymn",
          opening_prayer AS "openingPrayer",
          ward_business AS "wardBusiness",
          stake_business AS "stakeBusiness",
          sacrament_hymn AS "sacramentHymn",
          speakers,
          closing_hymn AS "closingHymn",
          closing_prayer AS "closingPrayer"
        FROM meetings
        WHERE to_char(date, 'YYYY-MM-DD') = ${dateFilter}
          AND (
            presiding ILIKE ${searchTerm}
            OR conducting ILIKE ${searchTerm}
            OR meeting_type ILIKE ${searchTerm}
            OR speakers::text ILIKE ${searchTerm}
          )
        ORDER BY date DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `
    : await sql`
        SELECT
          id,
          to_char(date, 'YYYY-MM-DD') AS "date",
          meeting_type AS "meetingType",
          presiding,
          conducting,
          announcements,
          opening_hymn AS "openingHymn",
          opening_prayer AS "openingPrayer",
          ward_business AS "wardBusiness",
          stake_business AS "stakeBusiness",
          sacrament_hymn AS "sacramentHymn",
          speakers,
          closing_hymn AS "closingHymn",
          closing_prayer AS "closingPrayer"
        FROM meetings
        WHERE
          presiding ILIKE ${searchTerm}
          OR conducting ILIKE ${searchTerm}
          OR meeting_type ILIKE ${searchTerm}
          OR speakers::text ILIKE ${searchTerm}
        ORDER BY date DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;

  return rows as unknown as SacramentMeeting[];
}

export async function getMeetingsTotalPages(query: string = "", exactDate?: string): Promise<number> {
  if (!sql) {
    const total = filterFallbackMeetings(fallbackMeetings, query, exactDate).length;
    return Math.max(1, Math.ceil(total / ITEMS_PER_PAGE));
  }

  const searchTerm = `%${query}%`;
  const dateFilter = exactDate?.trim();

  const rows = dateFilter
    ? await sql`
        SELECT COUNT(*) AS count
        FROM meetings
        WHERE to_char(date, 'YYYY-MM-DD') = ${dateFilter}
          AND (
            presiding ILIKE ${searchTerm}
            OR conducting ILIKE ${searchTerm}
            OR meeting_type ILIKE ${searchTerm}
            OR speakers::text ILIKE ${searchTerm}
          )
      `
    : await sql`
        SELECT COUNT(*) AS count
        FROM meetings
        WHERE
          presiding ILIKE ${searchTerm}
          OR conducting ILIKE ${searchTerm}
          OR meeting_type ILIKE ${searchTerm}
          OR speakers::text ILIKE ${searchTerm}
      `;

  return Math.max(1, Math.ceil(Number(rows[0].count) / ITEMS_PER_PAGE));
}

export async function getMeetingById(id: number): Promise<SacramentMeeting | null> {
  if (!sql) {
    return fallbackMeetings.find((meeting) => meeting.id === id) ?? null;
  }

  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type AS "meetingType",
      presiding,
      conducting,
      announcements,
      opening_hymn AS "openingHymn",
      opening_prayer AS "openingPrayer",
      ward_business AS "wardBusiness",
      stake_business AS "stakeBusiness",
      sacrament_hymn AS "sacramentHymn",
      speakers,
      closing_hymn AS "closingHymn",
      closing_prayer AS "closingPrayer"
    FROM meetings
    WHERE id = ${id}
  `;

  return (rows[0] as unknown as SacramentMeeting) ?? null;
}

// Mutation stubs — will be wired to the database in Week 04
export async function addMeeting(data: Omit<SacramentMeeting, "id">): Promise<SacramentMeeting> {
  void data;
  throw new Error("addMeeting: database implementation coming in Week 04");
}

export async function updateMeeting(
  id: number,
  updates: Partial<SacramentMeeting>
): Promise<SacramentMeeting | null> {
  void id;
  void updates;
  throw new Error("updateMeeting: database implementation coming in Week 04");
}

export async function deleteMeeting(id: number): Promise<boolean> {
  void id;
  throw new Error("deleteMeeting: database implementation coming in Week 04");
}
