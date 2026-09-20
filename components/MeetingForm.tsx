'use client';

import { useActionState } from 'react';
import { createMeeting, updateMeeting, type State } from '@/lib/actions';
import type { SacramentMeeting } from '@/lib/types';

const initialState: State = {
  message: '',
  errors: {},
};

function FieldError({ id, errors }: { id: string; errors?: string[] }) {
  return (
    <p id={`${id}-error`} aria-live="polite" className="mt-1 min-h-5 text-sm text-red-700">
      {errors?.[0] ?? ''}
    </p>
  );
}

export function MeetingForm({
  mode,
  meeting,
  meetingId,
}: {
  mode: 'create' | 'edit';
  meeting?: SacramentMeeting;
  meetingId?: number;
}) {
  const action = mode === 'create' ? createMeeting : updateMeeting.bind(null, meetingId ?? 0);
  const [state, formAction, isPending] = useActionState(action, initialState);

  const getFieldErrors = (field: string) => state.errors?.[field] ?? [];

  return (
    <form action={formAction} className="space-y-8 rounded border border-[#b7b398] bg-[#fffefb] p-6 shadow-sm">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="date" className="mb-2 block text-sm font-semibold text-[#304a2c]">
            Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            defaultValue={meeting?.date ?? ''}
            aria-describedby="date-error"
            aria-invalid={Boolean(getFieldErrors('date').length)}
            className="w-full rounded border border-[#b7b398] bg-white px-3 py-2 text-[#304a2c] focus:border-[#304a2c] focus:outline-none"
          />
          <FieldError id="date" errors={getFieldErrors('date')} />
        </div>

        <div>
          <label htmlFor="meetingType" className="mb-2 block text-sm font-semibold text-[#304a2c]">
            Meeting type
          </label>
          <select
            id="meetingType"
            name="meetingType"
            defaultValue={meeting?.meetingType ?? 'regular'}
            aria-describedby="meetingType-error"
            aria-invalid={Boolean(getFieldErrors('meetingType').length)}
            className="w-full rounded border border-[#b7b398] bg-white px-3 py-2 text-[#304a2c] focus:border-[#304a2c] focus:outline-none"
          >
            <option value="testimony">Testimony</option>
            <option value="regular">Regular</option>
            <option value="stake">Stake</option>
            <option value="general">General</option>
            <option value="special">Special</option>
          </select>
          <FieldError id="meetingType" errors={getFieldErrors('meetingType')} />
        </div>

        <div>
          <label htmlFor="presiding" className="mb-2 block text-sm font-semibold text-[#304a2c]">
            Presiding
          </label>
          <input
            id="presiding"
            name="presiding"
            type="text"
            defaultValue={meeting?.presiding ?? ''}
            aria-describedby="presiding-error"
            aria-invalid={Boolean(getFieldErrors('presiding').length)}
            className="w-full rounded border border-[#b7b398] bg-white px-3 py-2 text-[#304a2c] focus:border-[#304a2c] focus:outline-none"
          />
          <FieldError id="presiding" errors={getFieldErrors('presiding')} />
        </div>

        <div>
          <label htmlFor="conducting" className="mb-2 block text-sm font-semibold text-[#304a2c]">
            Conducting
          </label>
          <input
            id="conducting"
            name="conducting"
            type="text"
            defaultValue={meeting?.conducting ?? ''}
            aria-describedby="conducting-error"
            aria-invalid={Boolean(getFieldErrors('conducting').length)}
            className="w-full rounded border border-[#b7b398] bg-white px-3 py-2 text-[#304a2c] focus:border-[#304a2c] focus:outline-none"
          />
          <FieldError id="conducting" errors={getFieldErrors('conducting')} />
        </div>
      </div>

      <div>
        <label htmlFor="announcements" className="mb-2 block text-sm font-semibold text-[#304a2c]">
          Announcements (one per line)
        </label>
        <textarea
          id="announcements"
          name="announcements"
          rows={4}
          defaultValue={meeting?.announcements?.join('\n') ?? ''}
          aria-describedby="announcements-error"
          aria-invalid={Boolean(getFieldErrors('announcements').length)}
          className="w-full rounded border border-[#b7b398] bg-white px-3 py-2 text-[#304a2c] focus:border-[#304a2c] focus:outline-none"
        />
        <FieldError id="announcements" errors={getFieldErrors('announcements')} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="openingHymnNumber" className="mb-2 block text-sm font-semibold text-[#304a2c]">
            Opening hymn number
          </label>
          <input
            id="openingHymnNumber"
            name="openingHymnNumber"
            type="number"
            min={0}
            defaultValue={meeting?.openingHymn.number ?? ''}
            aria-describedby="openingHymnNumber-error"
            aria-invalid={Boolean(getFieldErrors('openingHymnNumber').length)}
            className="w-full rounded border border-[#b7b398] bg-white px-3 py-2 text-[#304a2c] focus:border-[#304a2c] focus:outline-none"
          />
          <FieldError id="openingHymnNumber" errors={getFieldErrors('openingHymnNumber')} />
        </div>

        <div>
          <label htmlFor="openingHymnTitle" className="mb-2 block text-sm font-semibold text-[#304a2c]">
            Opening hymn title
          </label>
          <input
            id="openingHymnTitle"
            name="openingHymnTitle"
            type="text"
            defaultValue={meeting?.openingHymn.title ?? ''}
            aria-describedby="openingHymnTitle-error"
            aria-invalid={Boolean(getFieldErrors('openingHymnTitle').length)}
            className="w-full rounded border border-[#b7b398] bg-white px-3 py-2 text-[#304a2c] focus:border-[#304a2c] focus:outline-none"
          />
          <FieldError id="openingHymnTitle" errors={getFieldErrors('openingHymnTitle')} />
        </div>
      </div>

      <div>
        <label htmlFor="openingPrayer" className="mb-2 block text-sm font-semibold text-[#304a2c]">
          Opening prayer
        </label>
        <input
          id="openingPrayer"
          name="openingPrayer"
          type="text"
          defaultValue={meeting?.openingPrayer ?? ''}
          aria-describedby="openingPrayer-error"
          aria-invalid={Boolean(getFieldErrors('openingPrayer').length)}
          className="w-full rounded border border-[#b7b398] bg-white px-3 py-2 text-[#304a2c] focus:border-[#304a2c] focus:outline-none"
        />
        <FieldError id="openingPrayer" errors={getFieldErrors('openingPrayer')} />
      </div>

      <div>
        <label htmlFor="wardBusiness" className="mb-2 block text-sm font-semibold text-[#304a2c]">
          Ward business (one per line)
        </label>
        <textarea
          id="wardBusiness"
          name="wardBusiness"
          rows={4}
          defaultValue={meeting?.wardBusiness.map((item) => item.description).join('\n') ?? ''}
          aria-describedby="wardBusiness-error"
          aria-invalid={Boolean(getFieldErrors('wardBusiness').length)}
          className="w-full rounded border border-[#b7b398] bg-white px-3 py-2 text-[#304a2c] focus:border-[#304a2c] focus:outline-none"
        />
        <FieldError id="wardBusiness" errors={getFieldErrors('wardBusiness')} />
      </div>

      <div className="flex items-center gap-3">
        <input
          id="stakeBusiness"
          name="stakeBusiness"
          type="checkbox"
          defaultChecked={meeting?.stakeBusiness ?? false}
          aria-describedby="stakeBusiness-error"
          aria-invalid={Boolean(getFieldErrors('stakeBusiness').length)}
          className="h-4 w-4 rounded border-[#b7b398] text-[#304a2c]"
        />
        <label htmlFor="stakeBusiness" className="text-sm font-semibold text-[#304a2c]">
          Includes stake business
        </label>
      </div>
      <FieldError id="stakeBusiness" errors={getFieldErrors('stakeBusiness')} />

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="sacramentHymnNumber" className="mb-2 block text-sm font-semibold text-[#304a2c]">
            Sacrament hymn number
          </label>
          <input
            id="sacramentHymnNumber"
            name="sacramentHymnNumber"
            type="number"
            min={0}
            defaultValue={meeting?.sacramentHymn.number ?? ''}
            aria-describedby="sacramentHymnNumber-error"
            aria-invalid={Boolean(getFieldErrors('sacramentHymnNumber').length)}
            className="w-full rounded border border-[#b7b398] bg-white px-3 py-2 text-[#304a2c] focus:border-[#304a2c] focus:outline-none"
          />
          <FieldError id="sacramentHymnNumber" errors={getFieldErrors('sacramentHymnNumber')} />
        </div>

        <div>
          <label htmlFor="sacramentHymnTitle" className="mb-2 block text-sm font-semibold text-[#304a2c]">
            Sacrament hymn title
          </label>
          <input
            id="sacramentHymnTitle"
            name="sacramentHymnTitle"
            type="text"
            defaultValue={meeting?.sacramentHymn.title ?? ''}
            aria-describedby="sacramentHymnTitle-error"
            aria-invalid={Boolean(getFieldErrors('sacramentHymnTitle').length)}
            className="w-full rounded border border-[#b7b398] bg-white px-3 py-2 text-[#304a2c] focus:border-[#304a2c] focus:outline-none"
          />
          <FieldError id="sacramentHymnTitle" errors={getFieldErrors('sacramentHymnTitle')} />
        </div>
      </div>

      <div>
        <label htmlFor="speakers" className="mb-2 block text-sm font-semibold text-[#304a2c]">
          Speakers (one per line, format: Name - Topic)
        </label>
        <textarea
          id="speakers"
          name="speakers"
          rows={4}
          defaultValue={meeting?.speakers.map((speaker) => `${speaker.name} - ${speaker.topic}`).join('\n') ?? ''}
          aria-describedby="speakers-error"
          aria-invalid={Boolean(getFieldErrors('speakers').length)}
          className="w-full rounded border border-[#b7b398] bg-white px-3 py-2 text-[#304a2c] focus:border-[#304a2c] focus:outline-none"
        />
        <FieldError id="speakers" errors={getFieldErrors('speakers')} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="closingHymnNumber" className="mb-2 block text-sm font-semibold text-[#304a2c]">
            Closing hymn number
          </label>
          <input
            id="closingHymnNumber"
            name="closingHymnNumber"
            type="number"
            min={0}
            defaultValue={meeting?.closingHymn.number ?? ''}
            aria-describedby="closingHymnNumber-error"
            aria-invalid={Boolean(getFieldErrors('closingHymnNumber').length)}
            className="w-full rounded border border-[#b7b398] bg-white px-3 py-2 text-[#304a2c] focus:border-[#304a2c] focus:outline-none"
          />
          <FieldError id="closingHymnNumber" errors={getFieldErrors('closingHymnNumber')} />
        </div>

        <div>
          <label htmlFor="closingHymnTitle" className="mb-2 block text-sm font-semibold text-[#304a2c]">
            Closing hymn title
          </label>
          <input
            id="closingHymnTitle"
            name="closingHymnTitle"
            type="text"
            defaultValue={meeting?.closingHymn.title ?? ''}
            aria-describedby="closingHymnTitle-error"
            aria-invalid={Boolean(getFieldErrors('closingHymnTitle').length)}
            className="w-full rounded border border-[#b7b398] bg-white px-3 py-2 text-[#304a2c] focus:border-[#304a2c] focus:outline-none"
          />
          <FieldError id="closingHymnTitle" errors={getFieldErrors('closingHymnTitle')} />
        </div>
      </div>

      <div>
        <label htmlFor="closingPrayer" className="mb-2 block text-sm font-semibold text-[#304a2c]">
          Closing prayer
        </label>
        <input
          id="closingPrayer"
          name="closingPrayer"
          type="text"
          defaultValue={meeting?.closingPrayer ?? ''}
          aria-describedby="closingPrayer-error"
          aria-invalid={Boolean(getFieldErrors('closingPrayer').length)}
          className="w-full rounded border border-[#b7b398] bg-white px-3 py-2 text-[#304a2c] focus:border-[#304a2c] focus:outline-none"
        />
        <FieldError id="closingPrayer" errors={getFieldErrors('closingPrayer')} />
      </div>

      {state.message ? (
        <p aria-live="polite" className="rounded border border-[#b7b398] bg-[#f8f5ed] px-4 py-3 text-sm text-[#304a2c]">
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="rounded bg-[#304a2c] px-6 py-3 text-[11px] font-black uppercase tracking-[0.24em] text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? 'Saving...' : mode === 'create' ? 'Create meeting' : 'Update meeting'}
      </button>
    </form>
  );
}
