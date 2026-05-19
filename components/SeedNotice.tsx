'use client';

import { useApp } from '@/lib/store';
import { STRINGS, t } from '@/lib/i18n';

export function SeedNotice() {
  const lang = useApp((s) => s.lang);
  return (
    <div className="bg-dwtd-yellow text-dwtd-dark text-xs md:text-sm px-4 py-1.5 border-b-2 border-dwtd-dark font-bold">
      {t(STRINGS.seedNotice, lang)}
    </div>
  );
}
