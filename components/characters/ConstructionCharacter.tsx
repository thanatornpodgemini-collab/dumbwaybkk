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

export const constructionTimeline: CharacterTimeline = {
  brick: {
    animate: { y: [-46, 54, 54], rotate: [0, 26, 26] },
    transition: {
      duration: 1.1,
      repeat: Infinity,
      repeatDelay: 0.4,
      ease: 'easeIn',
      times: [0, 0.6, 1],
    },
  },
  body: {
    animate: { y: [0, 0, 5, 0] },
    transition: {
      duration: 1.1,
      repeat: Infinity,
      repeatDelay: 0.4,
      ease: 'easeOut',
      times: [0, 0.58, 0.66, 1],
    },
  },
};

export function ConstructionCharacter({ severity = 'fatal', motionState, ...rest }: CharacterProps) {
  const active = motionState === 'active';
  return (
    <CharacterFrame {...rest} motionState={motionState} title={rest.title ?? 'Construction incident'}>
      <CharacterLayer id="body" timeline={constructionTimeline} active={active}>
        <BeanBody fill="#ff7a5a" accent="#c95a3e" />
        {/* hard hat (too late) */}
        <g stroke={INK} strokeWidth={STROKE.feature} strokeLinejoin="round">
          <path d="M30 28 Q50 12 70 28 L72 32 L28 32 Z" fill="#ffd23f" />
          <rect x="46" y="14" width="8" height="6" fill="#e94545" />
        </g>
        <CharacterFace severity={severity} />
        {severity === 'injury' ? <InjuryMarks variant="plaster" /> : null}
      </CharacterLayer>
      {/* falling brick */}
      <CharacterLayer id="brick" timeline={constructionTimeline} active={active}>
        <g stroke={INK} strokeWidth={STROKE.detail} strokeLinejoin="round">
          <rect x="76" y="6" width="18" height="10" fill="#a67c52" />
          <line x1="80" y1="6" x2="80" y2="16" />
          <line x1="86" y1="6" x2="86" y2="16" />
        </g>
      </CharacterLayer>
    </CharacterFrame>
  );
}
