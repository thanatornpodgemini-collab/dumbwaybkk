'use client';

import clsx from 'clsx';
import { CATEGORIES } from '@/lib/categories';
import { useApp } from '@/lib/store';
import { STRINGS, t } from '@/lib/i18n';
import { countByCategory } from '@/lib/incidents';
import { CHARACTERS } from './characters';

export function CategoryFilter() {
  const lang = useApp((s) => s.lang);
  const active = useApp((s) => s.activeCategory);
  const setActive = useApp((s) => s.setActiveCategory);
  const counts = countByCategory();

  const everyday = CATEGORIES.filter((c) => !c.blackSwan);
  const blackSwans = CATEGORIES.filter((c) => c.blackSwan);

  const renderCategory = (cat: (typeof CATEGORIES)[number]) => {
    const C = CHARACTERS[cat.id];
    const n = counts[cat.id] ?? 0;
    const isActive = active === cat.id;
    return (
      <li key={cat.id}>
        <button
          type="button"
          onClick={() => setActive(isActive ? null : cat.id)}
          className={clsx(
            'w-full px-2 py-2 rounded-xl border-2 border-dwtd-dark flex items-center gap-3 text-left transition-transform',
            isActive
              ? 'bg-white shadow-pop -translate-y-0.5'
              : 'bg-white/70 hover:bg-white hover:shadow-popsm',
          )}
        >
          <span
            className="shrink-0 rounded-lg border-2 border-dwtd-dark p-1"
            style={{ backgroundColor: cat.color }}
          >
            <C size={36} />
          </span>
          <span className="flex-1">
            <span className="block font-bold text-sm leading-tight">
              {t(cat.label, lang)}
            </span>
            <span className="block text-xs text-dwtd-mid leading-tight">
              {t(cat.tagline, lang)}
            </span>
          </span>
          <span className="text-sm font-bold text-dwtd-mid">{n}</span>
        </button>
      </li>
    );
  };

  return (
    <aside className="w-full md:w-80 shrink-0 border-r-2 border-dwtd-dark bg-dwtd-cream overflow-y-auto">
      <div className="p-4">
        <h2 className="text-xs uppercase tracking-wider text-dwtd-mid font-bold">
          {t(STRINGS.filtersLabel, lang)}
        </h2>
        <button
          type="button"
          onClick={() => setActive(null)}
          className={clsx(
            'w-full mt-2 px-3 py-2 rounded-xl border-2 border-dwtd-dark text-left font-bold',
            active === null ? 'bg-dwtd-yellow shadow-popsm' : 'bg-white hover:bg-dwtd-yellow/30',
          )}
        >
          {t(STRINGS.filterAll, lang)}
          <span className="float-right text-sm font-normal text-dwtd-mid">
            {Object.values(counts).reduce((a, b) => a + b, 0)}
          </span>
        </button>

        <h3 className="mt-4 text-xs uppercase tracking-wider text-dwtd-mid font-bold">
          {t(STRINGS.everydayHazards, lang)}
        </h3>
        <ul className="mt-2 space-y-1.5">{everyday.map(renderCategory)}</ul>

        {blackSwans.length > 0 ? (
          <>
            <h3 className="mt-5 text-xs uppercase tracking-wider font-bold text-dwtd-dark flex items-center gap-1.5">
              <span aria-hidden>🦢</span>
              {t(STRINGS.blackSwanSection, lang)}
            </h3>
            <ul className="mt-2 space-y-1.5">{blackSwans.map(renderCategory)}</ul>
          </>
        ) : null}
      </div>
    </aside>
  );
}
