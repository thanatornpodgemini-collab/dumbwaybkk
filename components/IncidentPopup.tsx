'use client';

import { CATEGORIES_BY_ID } from '@/lib/categories';
import { useApp } from '@/lib/store';
import { STRINGS, t } from '@/lib/i18n';
import type { Incident } from '@/lib/types';
import { CHARACTERS } from './characters';

export function IncidentPopup({ incident }: { incident: Incident }) {
  const lang = useApp((s) => s.lang);
  const cat = CATEGORIES_BY_ID[incident.category];
  const C = CHARACTERS[incident.category];

  return (
    <article className="w-72 bg-dwtd-cream">
      <div
        className="p-3 flex items-center gap-3 border-b-2 border-dwtd-dark"
        style={{ backgroundColor: cat.color }}
      >
        <C size={56} animation="wobble" />
        <div className="min-w-0">
          <h3 className="font-display font-bold text-lg leading-tight text-dwtd-dark line-clamp-2">
            {t(incident.title, lang)}
          </h3>
          <p className="text-xs text-dwtd-dark/80 mt-0.5">
            {t(cat.label, lang)} · {incident.date}
          </p>
        </div>
      </div>
      <div className="p-3 space-y-2">
        <p className="text-sm text-dwtd-dark/90 leading-snug">
          {t(incident.summary, lang)}
        </p>
        <div className="flex items-center gap-2 text-xs text-dwtd-mid">
          <span
            className="px-2 py-0.5 rounded-full border border-dwtd-dark/40 font-bold"
            style={{ backgroundColor: severityColor(incident.severity) }}
          >
            {t(STRINGS.severity[incident.severity], lang)}
          </span>
          {incident.victims ? (
            <span>
              {incident.victims} {t(STRINGS.victims, lang)}
            </span>
          ) : null}
        </div>
        <p className="text-xs text-dwtd-mid">{t(incident.location, lang)}</p>
        {incident.sources.length > 0 ? (
          <div className="text-xs">
            <span className="font-bold">{t(STRINGS.sources, lang)}: </span>
            {incident.sources.map((s, i) => (
              <span key={s.url}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-dwtd-blue"
                >
                  {s.name}
                </a>
                {i < incident.sources.length - 1 ? ', ' : ''}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}

function severityColor(s: Incident['severity']) {
  return s === 'fatal' ? '#e94545' : s === 'injury' ? '#ff9a3c' : '#ffd23f';
}
