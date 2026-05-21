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

export const electrocutionTimeline: CharacterTimeline = {
  body: {
    animate: { x: [0, -2, 2, -1.4, 1.4, 0] },
    transition: { duration: 0.24, repeat: Infinity, ease: 'linear' },
  },
  bolts: {
    animate: { opacity: [1, 0.15, 1, 0.4, 1] },
    transition: { duration: 0.42, repeat: Infinity, ease: 'linear' },
  },
};

export function ElectrocutionCharacter({ severity = 'fatal', motionState, ...rest }: CharacterProps) {
  const active = motionState === 'active';
  return (
    <CharacterFrame {...rest} motionState={motionState} title={rest.title ?? 'Electrocution incident'}>
      {/* lightning bolts around the body */}
      <CharacterLayer id="bolts" timeline={electrocutionTimeline} active={active}>
        <g fill="#ffd23f" stroke={INK} strokeWidth={STROKE.feature} strokeLinejoin="round">
          <path d="M12 30 L20 30 L16 38 L24 38 L14 52 L18 42 L10 42 Z" />
          <path d="M82 26 L90 26 L86 34 L92 34 L80 50 L86 38 L78 38 Z" />
        </g>
      </CharacterLayer>
      <CharacterLayer id="body" timeline={electrocutionTimeline} active={active}>
        <BeanBody fill="#ffd23f" accent="#d6a921" />
        <CharacterFace severity={severity} showMouth={false} />
        {/* zigzag tongue */}
        <path
          d="M44 64 L48 72 L52 64 L56 72 L60 64"
          fill="none"
          stroke={INK}
          strokeWidth={STROKE.feature}
          strokeLinejoin="round"
        />
        {/* hair stood on end */}
        <g stroke={INK} strokeWidth={STROKE.hair} strokeLinecap="round">
          <line x1="40" y1="12" x2="38" y2="4" />
          <line x1="50" y1="10" x2="50" y2="2" />
          <line x1="60" y1="12" x2="62" y2="4" />
        </g>
        {severity === 'injury' ? <InjuryMarks variant="plaster" /> : null}
      </CharacterLayer>
    </CharacterFrame>
  );
}
