import { notFound } from 'next/navigation';
import { MeetingForm } from '@/components/MeetingForm';
import { getMeetingById } from '@/lib/meetings-db';

export default async function EditMeetingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const meeting = await getMeetingById(Number(id));

  if (!meeting) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <div className="mb-6">
        <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#a26945]">Edit meeting</p>
        <h1 className="mt-2 font-serif text-4xl font-bold text-[#304a2c]">Update the meeting program</h1>
      </div>
      <MeetingForm mode="edit" meeting={meeting} meetingId={meeting.id} />
    </main>
  );
}
