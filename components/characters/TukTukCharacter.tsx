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

export const tuktukTimeline: CharacterTimeline = {
  body: {
    animate: { rotate: [0, 16, 0], x: [0, 7, 0] },
    transition: { duration: 1.2, repeat: Infinity, ease: 'easeInOut' },
  },
  tuktuk: {
    animate: { y: [0, -3, 0, -2, 0] },
    transition: { duration: 0.9, repeat: Infinity, ease: 'easeInOut' },
  },
};

export function TukTukCharacter({ severity = 'fatal', motionState, ...rest }: CharacterProps) {
  const active = motionState === 'active';
  return (
    <CharacterFrame {...rest} motionState={motionState} title={rest.title ?? 'Tuk-tuk incident'}>
      <CharacterLayer id="body" timeline={tuktukTimeline} active={active}>
        <BeanBody fill="#7a5af8" accent="#553fad" />
        <CharacterFace severity={severity} />
        {severity === 'injury' ? <InjuryMarks /> : null}
      </CharacterLayer>
      {/* tuk-tuk roof + chassis + wheels */}
      <CharacterLayer id="tuktuk" timeline={tuktukTimeline} active={active}>
        <g stroke={INK} strokeWidth={STROKE.feature} strokeLinejoin="round">
          <path d="M14 60 L86 60 L78 50 L22 50 Z" fill="#ffd23f" />
          <rect x="18" y="60" width="64" height="6" fill="#3a3f55" />
          <circle cx="28" cy="80" r="6" fill={INK} />
          <circle cx="72" cy="80" r="6" fill={INK} />
          <circle cx="28" cy="80" r="2" fill="#fff6e8" />
          <circle cx="72" cy="80" r="2" fill="#fff6e8" />
        </g>
      </CharacterLayer>
    </CharacterFrame>
  );
}
