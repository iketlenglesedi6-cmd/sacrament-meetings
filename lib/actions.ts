'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import type { MeetingType } from '@/lib/types';
import { addMeeting, deleteMeeting as removeMeeting, getMeetingById, updateMeeting as persistMeeting } from '@/lib/meetings-db';

export type State = {
  message: string;
  errors?: Record<string, string[]>;
};

const MeetingFormSchema = z.object({
  date: z.string().trim().min(1, 'Date is required.'),
  meetingType: z
    .string()
    .trim()
    .refine((value) => ['testimony', 'regular', 'stake', 'general', 'special'].includes(value), {
      message: 'Meeting type is required.',
    }),
  presiding: z.string().trim().min(1, 'Presiding leader is required.'),
  conducting: z.string().trim().min(1, 'Conducting leader is required.'),
  announcements: z.string().optional().default(''),
  openingHymnNumber: z.coerce.number().min(0, 'Opening hymn number must be 0 or greater.'),
  openingHymnTitle: z.string().trim().min(1, 'Opening hymn title is required.'),
  openingPrayer: z.string().trim().min(1, 'Opening prayer is required.'),
  wardBusiness: z.string().optional().default(''),
  stakeBusiness: z.boolean().default(false),
  sacramentHymnNumber: z.coerce.number().min(0, 'Sacrament hymn number must be 0 or greater.'),
  sacramentHymnTitle: z.string().trim().min(1, 'Sacrament hymn title is required.'),
  speakers: z.string().optional().default(''),
  closingHymnNumber: z.coerce.number().min(0, 'Closing hymn number must be 0 or greater.'),
  closingHymnTitle: z.string().trim().min(1, 'Closing hymn title is required.'),
  closingPrayer: z.string().trim().min(1, 'Closing prayer is required.'),
});

function toStringArray(value: FormDataEntryValue | null) {
  return typeof value === 'string' ? value : '';
}

function parseFormData(formData: FormData) {
  const data = {
    date: toStringArray(formData.get('date')),
    meetingType: toStringArray(formData.get('meetingType')),
    presiding: toStringArray(formData.get('presiding')),
    conducting: toStringArray(formData.get('conducting')),
    announcements: toStringArray(formData.get('announcements')),
    openingHymnNumber: formData.get('openingHymnNumber'),
    openingHymnTitle: toStringArray(formData.get('openingHymnTitle')),
    openingPrayer: toStringArray(formData.get('openingPrayer')),
    wardBusiness: toStringArray(formData.get('wardBusiness')),
    stakeBusiness: formData.get('stakeBusiness') === 'on' || formData.get('stakeBusiness') === 'true',
    sacramentHymnNumber: formData.get('sacramentHymnNumber'),
    sacramentHymnTitle: toStringArray(formData.get('sacramentHymnTitle')),
    speakers: toStringArray(formData.get('speakers')),
    closingHymnNumber: formData.get('closingHymnNumber'),
    closingHymnTitle: toStringArray(formData.get('closingHymnTitle')),
    closingPrayer: toStringArray(formData.get('closingPrayer')),
  };

  return MeetingFormSchema.safeParse(data);
}

function toLineList(value: string): string[] {
  return value
    .split(/\n|;/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function toSpeakerList(value: string) {
  return value
    .split(/\n/)
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => {
      const separatorIndex = item.indexOf('-');
      if (separatorIndex === -1) {
        throw new Error('Each speaker must follow the format: Name - Topic');
      }

      const name = item.slice(0, separatorIndex).trim();
      const topic = item.slice(separatorIndex + 1).trim();

      if (!name || !topic) {
        throw new Error('Each speaker must follow the format: Name - Topic');
      }

      return { name, topic, type: 'speaker' as const };
    });
}

export async function createMeeting(_prevState: State | undefined, formData: FormData): Promise<State> {
  const parsed = parseFormData(formData);
  if (!parsed.success) {
    return {
      message: 'Please correct the highlighted fields and try again.',
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const meeting = {
      date: parsed.data.date,
      meetingType: parsed.data.meetingType as MeetingType,
      presiding: parsed.data.presiding,
      conducting: parsed.data.conducting,
      announcements: toLineList(parsed.data.announcements),
      openingHymn: {
        number: Number(parsed.data.openingHymnNumber),
        title: parsed.data.openingHymnTitle,
      },
      openingPrayer: parsed.data.openingPrayer,
      wardBusiness: toLineList(parsed.data.wardBusiness).map((description) => ({ description })),
      stakeBusiness: Boolean(parsed.data.stakeBusiness),
      sacramentHymn: {
        number: Number(parsed.data.sacramentHymnNumber),
        title: parsed.data.sacramentHymnTitle,
      },
      speakers: toSpeakerList(parsed.data.speakers),
      closingHymn: {
        number: Number(parsed.data.closingHymnNumber),
        title: parsed.data.closingHymnTitle,
      },
      closingPrayer: parsed.data.closingPrayer,
    };

    const savedMeeting = await addMeeting(meeting);
    revalidatePath('/meetings');
    redirect(`/meetings/${savedMeeting.id}`);
  } catch (error) {
    console.error('Error creating meeting:', error);
    throw new Error('Unable to create the meeting. Please try again.');
  }
}

export async function updateMeeting(
  id: number,
  _prevState: State | undefined,
  formData: FormData,
): Promise<State> {
  const parsed = parseFormData(formData);
  if (!parsed.success) {
    return {
      message: 'Please correct the highlighted fields and try again.',
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const meeting = {
      date: parsed.data.date,
      meetingType: parsed.data.meetingType as MeetingType,
      presiding: parsed.data.presiding,
      conducting: parsed.data.conducting,
      announcements: toLineList(parsed.data.announcements),
      openingHymn: {
        number: Number(parsed.data.openingHymnNumber),
        title: parsed.data.openingHymnTitle,
      },
      openingPrayer: parsed.data.openingPrayer,
      wardBusiness: toLineList(parsed.data.wardBusiness).map((description) => ({ description })),
      stakeBusiness: Boolean(parsed.data.stakeBusiness),
      sacramentHymn: {
        number: Number(parsed.data.sacramentHymnNumber),
        title: parsed.data.sacramentHymnTitle,
      },
      speakers: toSpeakerList(parsed.data.speakers),
      closingHymn: {
        number: Number(parsed.data.closingHymnNumber),
        title: parsed.data.closingHymnTitle,
      },
      closingPrayer: parsed.data.closingPrayer,
    };

    const existingMeeting = await getMeetingById(id);
    if (!existingMeeting) {
      throw new Error('Meeting not found.');
    }

    await persistMeeting(id, meeting);
    revalidatePath('/meetings');
    revalidatePath(`/meetings/${id}`);
    redirect(`/meetings/${id}`);
  } catch (error) {
    console.error('Error updating meeting:', error);
    throw new Error('Unable to update the meeting. Please try again.');
  }
}

export async function deleteMeeting(formData: FormData): Promise<void> {
  const rawId = formData.get('id');
  const id = Number(rawId ?? '');

  if (!Number.isFinite(id) || id <= 0) {
    throw new Error('Invalid meeting id.');
  }

  try {
    const removed = await removeMeeting(id);
    if (!removed) {
      throw new Error('Meeting not found.');
    }

    revalidatePath('/meetings');
    redirect('/meetings');
  } catch (error) {
    console.error('Error deleting meeting:', error);
    throw new Error('Unable to delete the meeting. Please try again.');
  }
}
