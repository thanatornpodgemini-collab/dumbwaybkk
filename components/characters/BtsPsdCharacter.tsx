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

export const btsPsdTimeline: CharacterTimeline = {
  body: {
    animate: { rotate: [0, 14, -5, 0] },
    transition: { duration: 1.6, repeat: Infinity, repeatDelay: 0.8, ease: 'easeInOut' },
  },
};

export function BtsPsdCharacter({ severity = 'fatal', motionState, ...rest }: CharacterProps) {
  const active = motionState === 'active';
  return (
    <CharacterFrame
      {...rest}
      motionState={motionState}
      title={rest.title ?? 'BTS – no platform screen doors'}
    >
      {/* ghost PSD outlines — the door frames that should be there but aren't */}
      <g opacity="0.5" stroke="#6b9ed4" strokeWidth={STROKE.detail} fill="none">
        <rect x="2" y="30" width="13" height="54" rx="2" strokeDasharray="3 3" />
        <line x1="8.5" y1="30" x2="8.5" y2="84" strokeDasharray="2 4" opacity="0.5" />
        <rect x="85" y="30" width="13" height="54" rx="2" strokeDasharray="3 3" />
        <line x1="91.5" y1="30" x2="91.5" y2="84" strokeDasharray="2 4" opacity="0.5" />
      </g>

      <CharacterLayer id="body" timeline={btsPsdTimeline} active={active}>
        <BeanBody fill="#1e88e5" accent="#1565c0" />
        <CharacterFace severity={severity} />
        {severity === 'injury' ? <InjuryMarks /> : null}
      </CharacterLayer>

      {/* yellow safety line */}
      <line x1="8" y1="80" x2="92" y2="80" stroke="#ffd23f" strokeWidth={STROKE.feature} strokeLinecap="round" />
      {/* platform edge */}
      <line x1="0" y1="84" x2="100" y2="84" stroke={INK} strokeWidth={STROKE.body} />
      {/* void — the 15-metre drop to traffic below */}
      <rect x="0" y="84" width="100" height="16" fill="#0c1220" />
      {/* tracks in the void */}
      <line x1="16" y1="91" x2="84" y2="91" stroke="#4a5568" strokeWidth={STROKE.detail} />
      <line x1="16" y1="97" x2="84" y2="97" stroke="#4a5568" strokeWidth={STROKE.detail} />
      <line x1="28" y1="91" x2="28" y2="97" stroke="#3a4455" strokeWidth={STROKE.detail} />
      <line x1="50" y1="91" x2="50" y2="97" stroke="#3a4455" strokeWidth={STROKE.detail} />
      <line x1="72" y1="91" x2="72" y2="97" stroke="#3a4455" strokeWidth={STROKE.detail} />
    </CharacterFrame>
  );
}
