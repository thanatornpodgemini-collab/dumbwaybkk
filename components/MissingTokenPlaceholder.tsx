'use client';

import { useApp } from '@/lib/store';
import { CATEGORIES_BY_ID } from '@/lib/categories';
import type { Incident } from '@/lib/types';
import { CHARACTERS } from './characters';

/** Stand-in shown when NEXT_PUBLIC_MAPBOX_TOKEN is missing.
 *  Still renders every incident in a scatter-grid so the dev can see all characters,
 *  positions, and popups without a real map. */
export function MissingTokenPlaceholder({ incidents }: { incidents: Incident[] }) {
  const lang = useApp((s) => s.lang);

  return (
    <div className="relative w-full h-full bg-[repeating-linear-gradient(45deg,#fff6e8_0_18px,#ffe9c2_18px_36px)] overflow-auto">
      <div className="sticky top-0 z-10 bg-dwtd-yellow border-b-2 border-dwtd-dark px-4 py-2 text-sm font-bold text-dwtd-dark">
        Mapbox token missing — drop one into <code>.env.local</code> to enable the real map.
        Showing all incidents in fallback grid.
      </div>
      <ul className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 p-4">
        {incidents.map((inc) => {
          const cat = CATEGORIES_BY_ID[inc.category];
          const C = CHARACTERS[inc.category];
          return (
            <li
              key={inc.id}
              className="rounded-2xl border-2 border-dwtd-dark bg-white p-3 shadow-popsm flex gap-3"
            >
              <div
                className="shrink-0 rounded-xl border-2 border-dwtd-dark p-1"
                style={{ backgroundColor: cat.color }}
              >
                <C size={56} severity={inc.severity} motionState="idle" />
              </div>
              <div className="min-w-0">
                {inc.blackSwan ? (
                  <span className="inline-block mb-0.5 px-1.5 py-0.5 rounded bg-dwtd-dark text-[10px] font-bold uppercase tracking-wider text-dwtd-cream">
                    🦢
                  </span>
                ) : null}
                <p className="font-display font-bold text-sm leading-tight line-clamp-2">
                  {inc.title[lang]}
                </p>
                <p className="text-xs text-dwtd-mid mt-0.5">
                  {cat.label[lang]} · {inc.date}
                </p>
                <p className="text-xs text-dwtd-mid mt-1 line-clamp-2">
                  {inc.location[lang]}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
