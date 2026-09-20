import { MeetingForm } from '@/components/MeetingForm';

export default function CreateMeetingPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <div className="mb-6">
        <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#a26945]">Create meeting</p>
        <h1 className="mt-2 font-serif text-4xl font-bold text-[#304a2c]">Add a new meeting program</h1>
      </div>
      <MeetingForm mode="create" />
    </main>
  );
}
