import * as React from 'react';
import { BeanBody, CharacterFrame, DeadEyes, ShockMouth, type CharacterProps } from './CharacterBase';

export function KlongBoatCharacter(props: CharacterProps) {
  return (
    <CharacterFrame {...props} title={props.title ?? 'Klong boat incident'}>
      {/* murky canal water */}
      <rect x="0" y="76" width="100" height="24" fill="#3aa6a0" />
      <path
        d="M0 80 Q 10 76 20 80 T 40 80 T 60 80 T 80 80 T 100 80 L 100 76 L 0 76 Z"
        fill="#7ad7c1"
        opacity="0.6"
      />
      <BeanBody fill="#3aa6a0" accent="#2a807c" />
      <DeadEyes />
      <ShockMouth />
      {/* splash droplets */}
      <g fill="#7ad7c1" stroke="#1f2330" strokeWidth="1.4">
        <circle cx="20" cy="70" r="2.5" />
        <circle cx="80" cy="72" r="2" />
        <circle cx="14" cy="62" r="1.8" />
      </g>
    </CharacterFrame>
  );
}
