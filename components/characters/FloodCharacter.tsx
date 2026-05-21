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

export const floodTimeline: CharacterTimeline = {
  water: {
    animate: { y: [12, 0, 12] },
    transition: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
  },
  body: {
    animate: { y: [0, -4, 0] },
    transition: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
  },
  boat: {
    animate: { rotate: [-9, 9, -9] },
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  },
};

export function FloodCharacter({ severity = 'fatal', motionState, ...rest }: CharacterProps) {
  const active = motionState === 'active';
  return (
    <CharacterFrame {...rest} motionState={motionState} title={rest.title ?? 'Flood incident'}>
      {/* deep water rising */}
      <CharacterLayer id="water" timeline={floodTimeline} active={active}>
        <rect x="0" y="64" width="100" height="40" fill="#3a8dde" />
        <path
          d="M0 68 Q 12 64 24 68 T 48 68 T 72 68 T 100 68 L 100 64 L 0 64 Z"
          fill="#7ad7c1"
          opacity="0.6"
        />
      </CharacterLayer>
      <CharacterLayer id="body" timeline={floodTimeline} active={active}>
        <BeanBody fill="#3a8dde" accent="#2c6fb1" />
        <CharacterFace severity={severity} />
        {severity === 'injury' ? <InjuryMarks /> : null}
      </CharacterLayer>
      {/* tiny boat in distance */}
      <CharacterLayer id="boat" timeline={floodTimeline} active={active}>
        <g stroke={INK} strokeWidth={STROKE.detail} strokeLinejoin="round">
          <path d="M82 86 L96 86 L93 92 L85 92 Z" fill="#ff5a8a" />
          <line x1="89" y1="78" x2="89" y2="86" />
        </g>
      </CharacterLayer>
    </CharacterFrame>
  );
}
