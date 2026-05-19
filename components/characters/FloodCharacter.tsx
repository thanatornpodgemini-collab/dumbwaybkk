import * as React from 'react';
import { BeanBody, CharacterFrame, DeadEyes, ShockMouth, type CharacterProps } from './CharacterBase';

export function FloodCharacter(props: CharacterProps) {
  return (
    <CharacterFrame {...props} title={props.title ?? 'Flood incident'}>
      {/* deep water rising */}
      <rect x="0" y="64" width="100" height="36" fill="#3a8dde" />
      <path
        d="M0 68 Q 12 64 24 68 T 48 68 T 72 68 T 100 68 L 100 64 L 0 64 Z"
        fill="#7ad7c1"
        opacity="0.6"
      />
      <BeanBody fill="#3a8dde" accent="#2c6fb1" />
      <DeadEyes />
      <ShockMouth />
      {/* tiny boat in distance */}
      <g stroke="#1f2330" strokeWidth="1.6" strokeLinejoin="round">
        <path d="M82 86 L96 86 L93 92 L85 92 Z" fill="#ff5a8a" />
        <line x1="89" y1="78" x2="89" y2="86" />
      </g>
    </CharacterFrame>
  );
}
