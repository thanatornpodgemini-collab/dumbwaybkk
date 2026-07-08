'use client';

import clsx from 'clsx';
import { CATEGORIES } from '@/lib/categories';
import { useApp } from '@/lib/store';
import { STRINGS, t } from '@/lib/i18n';
import { countByCategory, categoriesWithBlackSwan, blackSwanCount } from '@/lib/incidents';
import { CHARACTERS } from './characters';

export function CategoryFilter() {
  const lang = useApp((s) => s.lang);
  const active = useApp((s) => s.activeCategory);
  const setActive = useApp((s) => s.setActiveCategory);
  const blackSwanOnly = useApp((s) => s.blackSwanOnly);
  const setBlackSwanOnly = useApp((s) => s.setBlackSwanOnly);

  const counts = countByCategory({ blackSwanOnly });
  const swanCategories = categoriesWithBlackSwan();

  const renderCategory = (cat: (typeof CATEGORIES)[number]) => {
    const C = CHARACTERS[cat.id];
    const n = counts[cat.id] ?? 0;
    const isActive = active === cat.id;
    const isEmpty = n === 0;
    const hasBlackSwan = swanCategories.has(cat.id);
    return (
      <li key={cat.id}>
        <button
          type="button"
          onClick={() => setActive(isActive ? null : cat.id)}
          disabled={isEmpty}
          className={clsx(
            'w-full px-2 py-2 rounded-xl border-2 border-dwtd-dark flex items-center gap-3 text-left transition-transform',
            isActive
              ? 'bg-white shadow-pop -translate-y-0.5'
              : 'bg-white/70 hover:bg-white hover:shadow-popsm',
            isEmpty && 'opacity-45 cursor-not-allowed hover:bg-white/70 hover:shadow-none',
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
              {hasBlackSwan ? (
                <span aria-label={t(STRINGS.blackSwan, lang)} className="ml-1">
                  🦢
                </span>
              ) : null}
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
            {Object.values(countByCategory()).reduce((a, b) => a + b, 0)}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setBlackSwanOnly(!blackSwanOnly)}
          className={clsx(
            'w-full mt-2 px-3 py-2 rounded-xl border-2 border-dwtd-dark text-left font-bold flex items-center gap-2',
            blackSwanOnly ? 'bg-dwtd-dark text-dwtd-cream shadow-popsm' : 'bg-white hover:bg-dwtd-dark/5',
          )}
        >
          <span aria-hidden>🦢</span>
          {t(STRINGS.blackSwanSection, lang)}
          <span className="ml-auto text-sm font-normal opacity-80">{blackSwanCount}</span>
        </button>

        <ul className="mt-3 space-y-1.5">{CATEGORIES.map(renderCategory)}</ul>
      </div>
    </aside>
  );
}
