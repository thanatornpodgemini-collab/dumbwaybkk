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

export const songkranTimeline: CharacterTimeline = {
  gun: {
    animate: { x: [0, 4, 0], rotate: [0, -10, 0] },
    transition: { duration: 0.7, repeat: Infinity, repeatDelay: 0.25, ease: 'easeOut' },
  },
  splash: {
    animate: { scale: [0.3, 1.2, 0.3], opacity: [0, 1, 0] },
    transition: { duration: 0.7, repeat: Infinity, repeatDelay: 0.25, ease: 'easeOut' },
  },
};

export function SongkranCharacter({ severity = 'fatal', motionState, ...rest }: CharacterProps) {
  const active = motionState === 'active';
  return (
    <CharacterFrame {...rest} motionState={motionState} title={rest.title ?? 'Songkran incident'}>
      <CharacterLayer id="body" timeline={songkranTimeline} active={active}>
        <BeanBody fill="#7ad7c1" accent="#3aa6a0" />
        <CharacterFace severity={severity} />
        {severity === 'injury' ? <InjuryMarks /> : null}
      </CharacterLayer>
      {/* water gun */}
      <CharacterLayer id="gun" timeline={songkranTimeline} active={active}>
        <g stroke={INK} strokeWidth={STROKE.feature} strokeLinejoin="round">
          <rect x="64" y="48" width="22" height="10" fill="#ff5a8a" />
          <rect x="68" y="38" width="8" height="10" fill="#ff5a8a" />
          <rect x="62" y="56" width="6" height="10" fill="#ff5a8a" />
        </g>
      </CharacterLayer>
      {/* water splash arcs */}
      <CharacterLayer id="splash" timeline={songkranTimeline} active={active}>
        <g fill="none" stroke="#3a8dde" strokeWidth={STROKE.feature} strokeLinecap="round">
          <path d="M86 50 Q 94 46 96 38" />
          <path d="M86 54 Q 96 56 98 64" />
        </g>
      </CharacterLayer>
    </CharacterFrame>
  );
}
