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

export const soiDogTimeline: CharacterTimeline = {
  body: {
    animate: { rotate: [0, 6, 0] },
    transition: { duration: 0.7, repeat: Infinity, repeatDelay: 0.5, ease: 'easeInOut' },
  },
  dog: {
    animate: { x: [0, -9, 0], rotate: [0, -8, 0] },
    transition: { duration: 0.7, repeat: Infinity, repeatDelay: 0.5, ease: 'easeInOut' },
  },
};

export function SoiDogCharacter({ severity = 'fatal', motionState, ...rest }: CharacterProps) {
  const active = motionState === 'active';
  return (
    <CharacterFrame {...rest} motionState={motionState} title={rest.title ?? 'Soi dog incident'}>
      <CharacterLayer id="body" timeline={soiDogTimeline} active={active}>
        <BeanBody fill="#ff9a3c" accent="#cf7a25" />
        <CharacterFace severity={severity} />
        {severity === 'injury' ? <InjuryMarks /> : null}
      </CharacterLayer>
      {/* paw prints */}
      <g fill={INK}>
        <circle cx="14" cy="80" r="1.6" />
        <circle cx="18" cy="84" r="1.6" />
        <circle cx="22" cy="80" r="1.6" />
      </g>
      {/* soi dog lunging in */}
      <CharacterLayer id="dog" timeline={soiDogTimeline} active={active}>
        <g fill="#3a3f55" stroke={INK} strokeWidth={STROKE.feature} strokeLinejoin="round">
          <path d="M62 78 L72 78 L78 70 L84 70 L82 82 L70 86 L62 86 Z" />
          <circle cx="80" cy="68" r="1.2" fill="#ff5a8a" stroke="none" />
        </g>
      </CharacterLayer>
    </CharacterFrame>
  );
}
