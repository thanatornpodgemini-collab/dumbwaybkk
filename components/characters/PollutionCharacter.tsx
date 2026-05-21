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

export const pollutionTimeline: CharacterTimeline = {
  haze: {
    animate: { x: [0, 5, 0] },
    transition: { duration: 2.6, repeat: Infinity, ease: 'easeInOut' },
  },
};

export function PollutionCharacter({ severity = 'fatal', motionState, ...rest }: CharacterProps) {
  const active = motionState === 'active';
  return (
    <CharacterFrame {...rest} motionState={motionState} title={rest.title ?? 'PM2.5 incident'}>
      <CharacterLayer id="body" timeline={pollutionTimeline} active={active}>
        <BeanBody fill="#3a3f55" accent="#23283a" />
        {/* eyes sit higher — the mask takes the lower face */}
        <CharacterFace severity={severity} cy={42} showMouth={false} />
        {/* surgical mask */}
        <g stroke={INK} strokeWidth={STROKE.feature} strokeLinejoin="round">
          <path d="M28 56 Q 50 72 72 56 L 72 70 Q 50 84 28 70 Z" fill="#7ad7c1" />
          <line x1="28" y1="60" x2="72" y2="60" strokeWidth={STROKE.detail} />
          <line x1="28" y1="68" x2="72" y2="68" strokeWidth={STROKE.detail} />
          <line x1="28" y1="58" x2="14" y2="50" />
          <line x1="72" y1="58" x2="86" y2="50" />
        </g>
        {severity === 'injury' ? <InjuryMarks /> : null}
      </CharacterLayer>
      {/* haze cloud */}
      <CharacterLayer id="haze" timeline={pollutionTimeline} active={active}>
        <g fill="#a3a8b8" opacity="0.7">
          <circle cx="14" cy="20" r="6" />
          <circle cx="24" cy="16" r="7" />
          <circle cx="34" cy="20" r="6" />
          <circle cx="70" cy="14" r="6" />
          <circle cx="80" cy="18" r="7" />
          <circle cx="90" cy="14" r="5" />
        </g>
      </CharacterLayer>
    </CharacterFrame>
  );
}
