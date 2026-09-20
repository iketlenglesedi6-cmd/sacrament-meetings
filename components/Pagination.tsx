'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  function createPageURL(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    const queryString = params.toString();
    return queryString ? `${pathname}?${queryString}` : pathname;
  }

  return (
    <nav aria-label="Pagination" className="flex items-center justify-between gap-4 text-sm text-[#304a2c]">
      <div>
        {currentPage > 1 ? (
          <Link href={createPageURL(currentPage - 1)} className="rounded border border-[#304a2c] px-3 py-2 font-semibold transition hover:bg-[#eef0e7]">
            Previous
          </Link>
        ) : (
          <span className="inline-block px-3 py-2 text-[#5a6349] opacity-60">Previous</span>
        )}
      </div>

      <span className="font-medium">
        Page {currentPage} of {totalPages}
      </span>

      <div>
        {currentPage < totalPages ? (
          <Link href={createPageURL(currentPage + 1)} className="rounded border border-[#304a2c] px-3 py-2 font-semibold transition hover:bg-[#eef0e7]">
            Next
          </Link>
        ) : (
          <span className="inline-block px-3 py-2 text-[#5a6349] opacity-60">Next</span>
        )}
      </div>
    </nav>
  );
}
