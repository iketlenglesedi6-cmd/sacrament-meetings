import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-14 sm:py-16">
      <section className="border-y border-[#b7b398] py-12">
        <div className="mb-8 flex items-center gap-3">
          <span className="font-serif text-4xl font-bold text-[#304a2c]">✦</span>
          <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#a26945]">
            Cedar Ridge Ward
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-[1.6fr_.8fr] md:items-end">
          <div>
            <p className="mb-3 text-[11px] font-black uppercase tracking-[0.28em] text-[#a26945]">
              Sunday Worship
            </p>
            <h1 className="font-serif text-5xl font-bold leading-none text-[#304a2c] sm:text-6xl">
              Sacrament Meeting
            </h1>
            <p className="mt-6 max-w-2xl text-[15px] leading-7 text-[#5a6349]">
              Current order of worship, announcements, hymns, and speakers for the ward.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link className="border border-[#304a2c] px-6 py-3 text-[11px] font-black uppercase tracking-[0.24em] text-[#304a2c]" href="/meetings/current">
                View Current Program
              </Link>
              <Link className="border border-[#b7b398] px-6 py-3 text-[11px] font-black uppercase tracking-[0.24em] text-[#5a6349]" href="/meetings">
                All Meetings
              </Link>
            </div>
          </div>

          <aside className="border-l-2 border-[#a26945] pl-6">
            <p className="font-serif text-3xl font-bold leading-9 text-[#304a2c]">
              “All things are done unto the edifying of the church.”
            </p>
            <p className="mt-3 text-[11px] font-black uppercase tracking-[0.22em] text-[#5a6349]">
              1 Corinthians 14:26
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}
