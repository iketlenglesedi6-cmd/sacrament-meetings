'use client';

import { useDebouncedCallback } from 'use-debounce';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function MeetingSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');

    if (term.trim()) {
      params.set('query', term.trim());
    } else {
      params.delete('query');
    }

    const queryString = params.toString();
    replace(queryString ? `${pathname}?${queryString}` : pathname);
  }, 300);

  return (
    <label className="flex w-full max-w-md flex-col gap-2 text-sm font-medium text-[#304a2c]">
      <span className="sr-only">Search meetings</span>
      <input
        type="search"
        defaultValue={searchParams.get('query')?.toString() ?? ''}
        onChange={(event) => handleSearch(event.target.value)}
        placeholder="Search by speaker, leader, or meeting type..."
        aria-label="Search meetings"
        className="rounded border border-[#b7b398] bg-white px-3 py-2 text-sm text-[#304a2c] shadow-sm outline-none ring-0 transition focus:border-[#304a2c]"
      />
    </label>
  );
}
