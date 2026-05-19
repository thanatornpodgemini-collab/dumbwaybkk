'use client';

import { useApp } from '@/lib/store';
import { STRINGS, t } from '@/lib/i18n';
import { LanguageToggle } from './LanguageToggle';

export function Header() {
  const lang = useApp((s) => s.lang);
  return (
    <header className="px-6 py-4 flex items-center justify-between gap-4 border-b-2 border-dwtd-dark bg-dwtd-cream">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-dwtd-dark leading-none">
          {t(STRINGS.appTitle, lang)}
        </h1>
        <p className="text-sm md:text-base text-dwtd-mid mt-1">
          {t(STRINGS.appSubtitle, lang)}
        </p>
      </div>
      <LanguageToggle />
    </header>
  );
}
