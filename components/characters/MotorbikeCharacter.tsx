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

export const motorbikeTimeline: CharacterTimeline = {
  body: {
    animate: { rotate: [0, -8, -3, -8] },
    transition: { duration: 0.9, repeat: Infinity, ease: 'easeInOut' },
  },
  speedlines: {
    animate: { x: [0, -11, 0], opacity: [0.55, 1, 0.55] },
    transition: { duration: 0.5, repeat: Infinity, ease: 'linear' },
  },
};

export function MotorbikeCharacter({ severity = 'fatal', motionState, ...rest }: CharacterProps) {
  const active = motionState === 'active';
  return (
    <CharacterFrame {...rest} motionState={motionState} title={rest.title ?? 'Motorbike taxi incident'}>
      <CharacterLayer id="speedlines" timeline={motorbikeTimeline} active={active}>
        <g stroke={INK} strokeWidth={STROKE.hair} strokeLinecap="round">
          <line x1="6" y1="28" x2="16" y2="28" />
          <line x1="6" y1="40" x2="14" y2="40" />
          <line x1="6" y1="52" x2="18" y2="52" />
        </g>
      </CharacterLayer>
      <CharacterLayer id="body" timeline={motorbikeTimeline} active={active}>
        <BeanBody fill="#ff5a8a" accent="#d44b75" />
        {/* orange motorbike-taxi vest */}
        <path
          d="M30 50 L50 44 L70 50 L66 70 L34 70 Z"
          fill="#ff9a3c"
          stroke={INK}
          strokeWidth={STROKE.feature}
          strokeLinejoin="round"
        />
        <CharacterFace severity={severity} />
        {severity === 'injury' ? <InjuryMarks /> : null}
      </CharacterLayer>
    </CharacterFrame>
  );
}
