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

export const railTimeline: CharacterTimeline = {
  body: {
    animate: { rotate: [0, 8, -6, 0] },
    transition: { duration: 1.5, repeat: Infinity, repeatDelay: 0.5, ease: 'easeInOut' },
  },
};

export function RailCharacter({ severity = 'fatal', motionState, ...rest }: CharacterProps) {
  const active = motionState === 'active';
  return (
    <CharacterFrame {...rest} motionState={motionState} title={rest.title ?? 'BTS / MRT incident'}>
      <CharacterLayer id="body" timeline={railTimeline} active={active}>
        <BeanBody fill="#3a8dde" accent="#2c6fb1" />
        <CharacterFace severity={severity} />
        {severity === 'injury' ? <InjuryMarks /> : null}
      </CharacterLayer>
      {/* train tracks underfoot */}
      <g stroke={INK} strokeWidth={STROKE.feature} strokeLinecap="round">
        <line x1="14" y1="92" x2="86" y2="92" />
        <line x1="20" y1="96" x2="80" y2="96" />
        <line x1="28" y1="92" x2="28" y2="96" />
        <line x1="50" y1="92" x2="50" y2="96" />
        <line x1="72" y1="92" x2="72" y2="96" />
      </g>
      {/* yellow safety line */}
      <line x1="10" y1="86" x2="90" y2="86" stroke="#ffd23f" strokeWidth={STROKE.feature} />
    </CharacterFrame>
  );
}
