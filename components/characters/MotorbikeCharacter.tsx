import * as React from 'react';
import { BeanBody, CharacterFrame, DeadEyes, ShockMouth, type CharacterProps } from './CharacterBase';

export function MotorbikeCharacter(props: CharacterProps) {
  return (
    <CharacterFrame {...props} title={props.title ?? 'Motorbike taxi incident'}>
      <BeanBody fill="#ff5a8a" accent="#d44b75" />
      {/* orange motorbike-taxi vest */}
      <path d="M30 50 L50 44 L70 50 L66 70 L34 70 Z" fill="#ff9a3c" stroke="#1f2330" strokeWidth="2" />
      <DeadEyes />
      <ShockMouth />
      {/* speed lines */}
      <g stroke="#1f2330" strokeWidth="1.6" strokeLinecap="round" opacity="0.7">
        <line x1="6" y1="28" x2="16" y2="28" />
        <line x1="6" y1="40" x2="14" y2="40" />
        <line x1="6" y1="52" x2="18" y2="52" />
      </g>
    </CharacterFrame>
  );
}
