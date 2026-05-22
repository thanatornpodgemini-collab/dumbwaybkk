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

export const sikhioCrashTimeline: CharacterTimeline = {
  body: {
    animate: { x: [0, -3, 4, -2, 0], rotate: [-2, 5, -4, 2, 0] },
    transition: { duration: 0.55, repeat: Infinity, ease: 'easeInOut' },
  },
  crane: {
    animate: { y: [0, 5, 10, 14] },
    transition: { duration: 2.2, repeat: Infinity, repeatDelay: 1, ease: 'easeIn' },
  },
};

export function SikhioCrashCharacter({ severity = 'fatal', motionState, ...rest }: CharacterProps) {
  const active = motionState === 'active';
  return (
    <CharacterFrame
      {...rest}
      motionState={motionState}
      title={rest.title ?? 'Sikhio train crash – crane on truck, January 2026'}
    >
      {/* train carriage interior — background */}
      <rect x="6" y="22" width="88" height="66" rx="5" fill="#dde6f0" stroke={INK} strokeWidth={STROKE.feature} />
      {/* decorative far windows */}
      <rect x="12" y="30" width="14" height="10" rx="2" fill="#a8d0e8" stroke={INK} strokeWidth={STROKE.detail} />
      <rect x="74" y="30" width="14" height="10" rx="2" fill="#a8d0e8" stroke={INK} strokeWidth={STROKE.detail} />
      {/* seat row suggestion */}
      <line x1="10" y1="76" x2="90" y2="76" stroke={INK} strokeWidth={STROKE.detail} opacity="0.35" />

      <CharacterLayer id="body" timeline={sikhioCrashTimeline} active={active}>
        <BeanBody fill="#5b7c8f" accent="#3a5669" />
        <CharacterFace severity={severity} />
        {severity === 'injury' ? <InjuryMarks /> : null}
      </CharacterLayer>

      {/* crane boom arm crashing in from upper-right */}
      <CharacterLayer id="crane" timeline={sikhioCrashTimeline} active={active}>
        {/* boom shaft */}
        <line x1="100" y1="2" x2="42" y2="54" stroke="#f59e0b" strokeWidth="10" strokeLinecap="round" />
        <line x1="100" y1="2" x2="42" y2="54" stroke={INK} strokeWidth="1.2" />
        {/* impact burst */}
        <circle cx="42" cy="54" r="12" fill="#fef9c3" opacity="0.78" />
        {/* spark lines */}
        <g stroke="#f59e0b" strokeWidth="2.4" strokeLinecap="round">
          <line x1="42" y1="54" x2="29" y2="40" />
          <line x1="42" y1="54" x2="57" y2="38" />
          <line x1="42" y1="54" x2="28" y2="62" />
          <line x1="42" y1="54" x2="58" y2="65" />
          <line x1="42" y1="54" x2="36" y2="68" />
        </g>
      </CharacterLayer>
    </CharacterFrame>
  );
}
