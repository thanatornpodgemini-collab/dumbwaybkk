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

export const billboardTimeline: CharacterTimeline = {
  billboard: {
    animate: { y: [-80, 4, 0] },
    transition: {
      duration: 0.7,
      repeat: Infinity,
      repeatDelay: 1.4,
      ease: 'easeIn',
      times: [0, 0.84, 1],
    },
  },
  stars: {
    animate: { scale: [0, 0, 1.25, 1], opacity: [0, 0, 1, 0] },
    transition: {
      duration: 0.8,
      repeat: Infinity,
      repeatDelay: 1.3,
      ease: 'easeOut',
      times: [0, 0.6, 0.74, 1],
    },
  },
};

export function BillboardCharacter({ severity = 'fatal', motionState, ...rest }: CharacterProps) {
  const active = motionState === 'active';
  return (
    <CharacterFrame {...rest} motionState={motionState} title={rest.title ?? 'Falling billboard'}>
      <CharacterLayer id="body" timeline={billboardTimeline} active={active}>
        <BeanBody fill="#e94545" accent="#b9303a" />
        <CharacterFace severity={severity} />
        {severity === 'injury' ? <InjuryMarks /> : null}
      </CharacterLayer>
      {/* falling billboard from above — the -15deg tilt is baked on the rects,
          the layer only translates so Framer Motion never fights it */}
      <CharacterLayer id="billboard" timeline={billboardTimeline} active={active}>
        <g stroke={INK} strokeWidth={STROKE.feature} strokeLinejoin="round">
          <rect x="6" y="6" width="40" height="20" fill="#fff6e8" transform="rotate(-15 26 16)" />
          <rect x="10" y="10" width="12" height="4" fill="#ff5a8a" transform="rotate(-15 26 16)" />
          <rect x="26" y="10" width="16" height="4" fill="#3a8dde" transform="rotate(-15 26 16)" />
        </g>
      </CharacterLayer>
      {/* impact stars */}
      <CharacterLayer id="stars" timeline={billboardTimeline} active={active}>
        <path
          d="M82 22 L86 14 L90 22 L98 22 L92 28 L94 36 L86 32 L78 36 L80 28 L74 22 Z"
          fill="#ffd23f"
          stroke={INK}
          strokeWidth={STROKE.feature}
        />
      </CharacterLayer>
    </CharacterFrame>
  );
}
