import type { Hymn, SacramentMeeting } from "@/lib/types";

function HymnLine({ label, hymn }: { label: string; hymn: Hymn }) {
  return <p><span className="font-bold text-[#304a2c]">{label}:</span> {hymn.number ? `${hymn.number} — ${hymn.title}` : hymn.title}</p>;
}

export function MeetingDetail({ meeting }: { meeting: SacramentMeeting }) {
  const date = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }).format(new Date(`${meeting.date}T12:00:00`));

  return (
    <article className="mx-auto max-w-3xl border border-[#b7b398] bg-[#fffefb] p-8 sm:p-10">
      <header className="border-b border-[#b7b398] pb-6 text-center">
        <p className="text-[11px] font-black uppercase tracking-[0.34em] text-[#a26945]">{meeting.meetingType} meeting</p>
        <h1 className="mt-4 font-serif text-4xl font-bold text-[#304a2c]">Sacrament Meeting</h1>
        <p className="mt-3 text-[11px] font-black uppercase tracking-[0.24em] text-[#5a6349]">{date}</p>
        <p className="mt-4 text-[14px] leading-7 text-[#5a6349]">
          Presiding: <span className="font-bold text-[#304a2c]">{meeting.presiding}</span> · Conducting: <span className="font-bold text-[#304a2c]">{meeting.conducting}</span>
        </p>
      </header>

      <div className="space-y-7 py-7">
        <section className="border-l-2 border-[#a26945] pl-4">
          <h2 className="font-serif text-2xl font-bold text-[#304a2c]">Opening</h2>
          <div className="mt-3 space-y-2 text-[15px] leading-7 text-[#5a6349]">
            <HymnLine label="Opening hymn" hymn={meeting.openingHymn} />
            <p><span className="font-bold text-[#304a2c]">Opening prayer:</span> {meeting.openingPrayer}</p>
          </div>
        </section>

        {meeting.announcements?.length ? (
          <section className="border-l-2 border-[#b7b398] pl-4">
            <h2 className="font-serif text-2xl font-bold text-[#304a2c]">Announcements</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-7 text-[#5a6349]">
              {meeting.announcements.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>
        ) : null}

        {meeting.wardBusiness.length || meeting.stakeBusiness ? (
          <section className="border-l-2 border-[#b7b398] pl-4">
            <h2 className="font-serif text-2xl font-bold text-[#304a2c]">Business</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-7 text-[#5a6349]">
              {meeting.wardBusiness.map((item) => <li key={item.description}>{item.description}</li>)}
              {meeting.stakeBusiness ? <li>Stake business</li> : null}
            </ul>
          </section>
        ) : null}

        <section className="border-l-2 border-[#a26945] pl-4">
          <h2 className="font-serif text-2xl font-bold text-[#304a2c]">Sacrament</h2>
          <div className="mt-3 text-[15px] leading-7 text-[#5a6349]">
            <HymnLine label="Sacrament hymn" hymn={meeting.sacramentHymn} />
          </div>
        </section>

        <section className="border-l-2 border-[#b7b398] pl-4">
          <h2 className="font-serif text-2xl font-bold text-[#304a2c]">Program</h2>
          <div className="mt-3 space-y-3 text-[15px] leading-7 text-[#5a6349]">
            {meeting.speakers.map((item) => (
              <div key={`${item.name}-${item.topic}`} className="border-t border-[#b7b398] py-3">
                <p className="font-bold text-[#304a2c]">{item.type === "musical-number" ? "Musical number" : item.name}</p>
                <p>{item.type === "musical-number" ? `${item.name}: ${item.topic}` : item.topic}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-l-2 border-[#b7b398] pl-4">
          <h2 className="font-serif text-2xl font-bold text-[#304a2c]">Closing</h2>
          <div className="mt-3 space-y-2 text-[15px] leading-7 text-[#5a6349]">
            <HymnLine label="Closing hymn" hymn={meeting.closingHymn} />
            <p><span className="font-bold text-[#304a2c]">Closing prayer:</span> {meeting.closingPrayer}</p>
          </div>
        </section>
      </div>
    </article>
  );
}
