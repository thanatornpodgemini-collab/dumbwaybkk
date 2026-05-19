import * as React from 'react';
import { BeanBody, CharacterFrame, DeadEyes, ShockMouth, type CharacterProps } from './CharacterBase';

export function RailCharacter(props: CharacterProps) {
  return (
    <CharacterFrame {...props} title={props.title ?? 'BTS / MRT incident'}>
      <BeanBody fill="#3a8dde" accent="#2c6fb1" />
      <DeadEyes />
      <ShockMouth />
      {/* train tracks underfoot */}
      <g stroke="#1f2330" strokeWidth="2" strokeLinecap="round">
        <line x1="14" y1="92" x2="86" y2="92" />
        <line x1="20" y1="96" x2="80" y2="96" />
        <line x1="28" y1="92" x2="28" y2="96" />
        <line x1="50" y1="92" x2="50" y2="96" />
        <line x1="72" y1="92" x2="72" y2="96" />
      </g>
      {/* yellow safety line */}
      <line x1="10" y1="86" x2="90" y2="86" stroke="#ffd23f" strokeWidth="3" />
    </CharacterFrame>
  );
}
