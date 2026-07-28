'use client';

import * as React from 'react';
import {
  BeanBody,
  CharacterFace,
  CharacterFrame,
  CharacterLayer,
  InjuryMarks,
  INK,
  STROKE,
  type CharacterProps,
} from './CharacterBase';
import type { CharacterTimeline } from './timelines';

export const rongbeerFireTimeline: CharacterTimeline = {
  body: {
    animate: { x: [0, -2, 2, -2, 0], rotate: [-2, 3, -3, 2, 0] },
    transition: { duration: 0.4, repeat: Infinity, ease: 'easeInOut' },
  },
  flames: {
    animate: { scaleY: [1, 1.18, 0.92, 1.12, 1], opacity: [0.85, 1, 0.85, 1, 0.85] },
    transition: { duration: 0.55, repeat: Infinity, ease: 'easeInOut' },
  },
  smoke: {
    animate: { y: [0, -8, 0], opacity: [0.45, 0.75, 0.45] },
    transition: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' },
  },
};

export function RongbeerFireCharacter({ severity = 'fatal', motionState, ...rest }: CharacterProps) {
  const active = motionState === 'active';
  return (
    <CharacterFrame
      {...rest}
      motionState={motionState}
      title={rest.title ?? 'Rong Beer Na Lat Phrao pub fire — bolted exit, July 2026'}
    >
      {/* smoke-filled room */}
      <rect x="0" y="0" width="100" height="100" fill="#2b1810" opacity="0.12" />

      {/* drifting smoke, upper-left */}
      <CharacterLayer id="smoke" timeline={rongbeerFireTimeline} active={active}>
        <g fill="#4a4a52" opacity="0.55">
          <ellipse cx="16" cy="14" rx="10" ry="6" />
          <ellipse cx="30" cy="7" rx="7" ry="4.5" />
        </g>
      </CharacterLayer>

      <CharacterLayer id="body" timeline={rongbeerFireTimeline} active={active}>
        <BeanBody fill="#c2410c" accent="#9a3412" />
        <CharacterFace severity={severity} />
        {severity === 'injury' ? <InjuryMarks /> : null}
      </CharacterLayer>

      {/* the bolted door — signature element, drawn in front so the body can't hide it */}
      <g>
        <rect x="70" y="14" width="28" height="80" rx="2" fill="#5b4636" stroke={INK} strokeWidth={STROKE.body} />
        {/* lit exit sign above — the irony: the sign still works, the door doesn't open */}
        <rect x="74" y="2" width="20" height="9" rx="1.5" fill="#5bc46b" stroke={INK} strokeWidth={STROKE.detail} />
        <rect x="80" y="4.4" width="8" height="4.6" rx="0.8" fill="#fff6e8" />
        {/* bolt latch bar across the seam, bold enough to read small */}
        <rect x="66" y="46" width="36" height="8" rx="2" fill="#9aa1ac" stroke={INK} strokeWidth={STROKE.feature} />
        {/* padlock over the latch */}
        <g transform="translate(74 50)">
          <path d="M -3 -3 a 3 3 0 0 1 6 0 v 3 h -6 Z" fill="none" stroke={INK} strokeWidth={STROKE.feature} />
          <rect x="-4" y="0" width="8" height="6.5" rx="1.2" fill="#2b2f3d" stroke={INK} strokeWidth={STROKE.feature} />
        </g>
      </g>

      {/* flames closing in from the left */}
      <CharacterLayer id="flames" timeline={rongbeerFireTimeline} active={active}>
        <g stroke={INK} strokeWidth={STROKE.detail} strokeLinejoin="round">
          <path
            d="M2 94 Q -2 78 6 66 Q 4 78 12 74 Q 8 62 20 54 Q 12 70 22 68 Q 18 84 30 94 Z"
            fill="#f59e0b"
          />
          <path d="M8 94 Q 6 82 14 74 Q 12 84 18 82 Q 16 94 24 94 Z" fill="#fde047" opacity="0.9" />
        </g>
      </CharacterLayer>
    </CharacterFrame>
  );
}
