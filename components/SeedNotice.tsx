'use client';

import { useApp } from '@/lib/store';
import { STRINGS, t } from '@/lib/i18n';

/** Banner above the map. Shows a placeholder warning while the dataset is all
 *  seed data, or a data-provenance line once real scraped incidents are loaded. */
export function SeedNotice({ isSeed, count }: { isSeed: boolean; count: number }) {
  const lang = useApp((s) => s.lang);

  if (isSeed) {
    return (
      <div className="bg-dwtd-yellow text-dwtd-dark text-xs md:text-sm px-4 py-1.5 border-b-2 border-dwtd-dark font-bold">
        {t(STRINGS.seedNotice, lang)}
      </div>
    );
  }

  return (
    <div className="bg-dwtd-dark text-dwtd-cream text-xs md:text-sm px-4 py-1.5 border-b-2 border-dwtd-dark">
      <span className="font-bold">{count}</span> {t(STRINGS.dataNotice, lang)}
    </div>
  );
}
