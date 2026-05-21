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

export const streetFoodTimeline: CharacterTimeline = {
  flame: {
    animate: {
      scaleY: [1, 1.3, 0.9, 1.18, 1],
      scaleX: [1, 0.88, 1.12, 0.94, 1],
    },
    transition: { duration: 0.5, repeat: Infinity, ease: 'easeInOut' },
  },
  cylinder: {
    animate: { x: [0, -1.4, 1.4, 0] },
    transition: { duration: 0.16, repeat: Infinity, ease: 'linear' },
  },
};

export function StreetFoodCharacter({ severity = 'fatal', motionState, ...rest }: CharacterProps) {
  const active = motionState === 'active';
  return (
    <CharacterFrame {...rest} motionState={motionState} title={rest.title ?? 'Street food incident'}>
      <CharacterLayer id="body" timeline={streetFoodTimeline} active={active}>
        <BeanBody fill="#5bc46b" accent="#3f9b4e" />
        <CharacterFace severity={severity} />
        {severity === 'injury' ? <InjuryMarks /> : null}
      </CharacterLayer>
      {/* flame */}
      <CharacterLayer id="flame" timeline={streetFoodTimeline} active={active}>
        <g stroke={INK} strokeWidth={STROKE.feature} strokeLinejoin="round">
          <path
            d="M50 84 Q 38 76 44 64 Q 48 72 52 62 Q 56 74 58 64 Q 64 78 50 84 Z"
            fill="#ff9a3c"
          />
          <path
            d="M50 82 Q 46 76 48 70 Q 50 74 52 68 Q 54 76 50 82 Z"
            fill="#ffd23f"
          />
        </g>
      </CharacterLayer>
      {/* gas cylinder */}
      <CharacterLayer id="cylinder" timeline={streetFoodTimeline} active={active}>
        <g stroke={INK} strokeWidth={STROKE.feature} strokeLinejoin="round">
          <rect x="76" y="64" width="12" height="22" rx="2" fill="#e94545" />
          <rect x="79" y="60" width="6" height="4" fill="#3a3f55" />
        </g>
      </CharacterLayer>
    </CharacterFrame>
  );
}
