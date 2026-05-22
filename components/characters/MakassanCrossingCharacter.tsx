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

export const makassanCrossingTimeline: CharacterTimeline = {
  body: {
    animate: { y: [0, -2, 0] },
    transition: { duration: 0.35, repeat: Infinity, ease: 'easeInOut' },
  },
  train: {
    animate: { x: [0, -10, -20, -28] },
    transition: { duration: 2.4, repeat: Infinity, repeatDelay: 0.6, ease: 'easeIn' },
  },
};

export function MakassanCrossingCharacter({ severity = 'fatal', motionState, ...rest }: CharacterProps) {
  const active = motionState === 'active';
  return (
    <CharacterFrame
      {...rest}
      motionState={motionState}
      title={rest.title ?? 'Makkasan level crossing – bus trapped, May 2026'}
    >
      {/* track bed */}
      <rect x="0" y="82" width="100" height="18" fill="#6b5e4a" />
      <rect x="0" y="82" width="100" height="3" fill="#857064" />
      {/* rail lines */}
      <line x1="0" y1="87" x2="100" y2="87" stroke={INK} strokeWidth={STROKE.feature} />
      <line x1="0" y1="94" x2="100" y2="94" stroke={INK} strokeWidth={STROKE.feature} />
      {/* cross-ties */}
      <line x1="15" y1="87" x2="15" y2="94" stroke={INK} strokeWidth={STROKE.detail} />
      <line x1="33" y1="87" x2="33" y2="94" stroke={INK} strokeWidth={STROKE.detail} />
      <line x1="51" y1="87" x2="51" y2="94" stroke={INK} strokeWidth={STROKE.detail} />
      <line x1="69" y1="87" x2="69" y2="94" stroke={INK} strokeWidth={STROKE.detail} />
      <line x1="87" y1="87" x2="87" y2="94" stroke={INK} strokeWidth={STROKE.detail} />

      {/* barrier post — left */}
      <rect x="2" y="28" width="5" height="54" fill={INK} rx="1" />

      {/* barrier arm — DOWN, blocking the crossing */}
      <line x1="7" y1="66" x2="82" y2="66" stroke="#e94545" strokeWidth="7" strokeLinecap="square" />
      {/* white stripe marks */}
      <line x1="17" y1="62.5" x2="21" y2="69.5" stroke="#ffffff" strokeWidth="3" />
      <line x1="29" y1="62.5" x2="33" y2="69.5" stroke="#ffffff" strokeWidth="3" />
      <line x1="41" y1="62.5" x2="45" y2="69.5" stroke="#ffffff" strokeWidth="3" />
      <line x1="53" y1="62.5" x2="57" y2="69.5" stroke="#ffffff" strokeWidth="3" />
      <line x1="65" y1="62.5" x2="69" y2="69.5" stroke="#ffffff" strokeWidth="3" />
      {/* arm outline */}
      <line x1="7" y1="66" x2="82" y2="66" stroke={INK} strokeWidth="1" />

      <CharacterLayer id="body" timeline={makassanCrossingTimeline} active={active}>
        <BeanBody fill="#f59e0b" accent="#d97706" />
        <CharacterFace severity={severity} />
        {severity === 'injury' ? <InjuryMarks /> : null}
      </CharacterLayer>

      {/* train nose approaching from the right */}
      <CharacterLayer id="train" timeline={makassanCrossingTimeline} active={active}>
        <rect x="76" y="56" width="30" height="26" rx="3" fill="#3a8dde" stroke={INK} strokeWidth={STROKE.feature} />
        <rect x="80" y="61" width="9" height="7" rx="1" fill="#ffe082" opacity="0.9" />
        <line x1="76" y1="69" x2="106" y2="69" stroke={INK} strokeWidth={STROKE.detail} />
      </CharacterLayer>
    </CharacterFrame>
  );
}
