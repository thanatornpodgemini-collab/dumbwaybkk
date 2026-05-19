'use client';

import clsx from 'clsx';
import { useApp } from '@/lib/store';

export function LanguageToggle() {
  const lang = useApp((s) => s.lang);
  const setLang = useApp((s) => s.setLang);

  return (
    <div
      role="group"
      aria-label="Language"
      className="inline-flex rounded-full border-2 border-dwtd-dark bg-white p-1 shadow-popsm"
    >
      {(['en', 'th'] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={clsx(
            'px-3 py-1 rounded-full text-sm font-bold transition-colors',
            lang === code
              ? 'bg-dwtd-yellow text-dwtd-dark'
              : 'text-dwtd-mid hover:text-dwtd-dark',
          )}
        >
          {code === 'en' ? 'EN' : 'ไทย'}
        </button>
      ))}
    </div>
  );
}
