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

export const klongBoatTimeline: CharacterTimeline = {
  water: {
    animate: { y: [0, 2.5, 0] },
    transition: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
  },
  body: {
    animate: { rotate: [-7, 7, -7] },
    transition: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
  },
  droplets: {
    animate: { y: [0, -7, 0], opacity: [0.4, 1, 0.4] },
    transition: { duration: 1, repeat: Infinity, ease: 'easeInOut' },
  },
};

export function KlongBoatCharacter({ severity = 'fatal', motionState, ...rest }: CharacterProps) {
  const active = motionState === 'active';
  return (
    <CharacterFrame {...rest} motionState={motionState} title={rest.title ?? 'Klong boat incident'}>
      {/* murky canal water */}
      <CharacterLayer id="water" timeline={klongBoatTimeline} active={active}>
        <rect x="0" y="76" width="100" height="28" fill="#3aa6a0" />
        <path
          d="M0 80 Q 10 76 20 80 T 40 80 T 60 80 T 80 80 T 100 80 L 100 76 L 0 76 Z"
          fill="#7ad7c1"
          opacity="0.6"
        />
      </CharacterLayer>
      <CharacterLayer id="body" timeline={klongBoatTimeline} active={active}>
        <BeanBody fill="#3aa6a0" accent="#2a807c" />
        <CharacterFace severity={severity} />
        {severity === 'injury' ? <InjuryMarks /> : null}
      </CharacterLayer>
      {/* splash droplets */}
      <CharacterLayer id="droplets" timeline={klongBoatTimeline} active={active}>
        <g fill="#7ad7c1" stroke={INK} strokeWidth={STROKE.detail}>
          <circle cx="20" cy="70" r="2.5" />
          <circle cx="80" cy="72" r="2" />
          <circle cx="14" cy="62" r="1.8" />
        </g>
      </CharacterLayer>
    </CharacterFrame>
  );
}
