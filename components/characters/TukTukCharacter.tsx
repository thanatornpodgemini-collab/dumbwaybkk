import * as React from 'react';
import { BeanBody, CharacterFrame, DeadEyes, ShockMouth, type CharacterProps } from './CharacterBase';

export function TukTukCharacter(props: CharacterProps) {
  return (
    <CharacterFrame {...props} title={props.title ?? 'Tuk-tuk incident'}>
      <BeanBody fill="#7a5af8" accent="#553fad" />
      <DeadEyes />
      <ShockMouth />
      {/* tuk-tuk roof + wheel hint */}
      <g stroke="#1f2330" strokeWidth="2" strokeLinejoin="round">
        <path d="M14 60 L86 60 L78 50 L22 50 Z" fill="#ffd23f" />
        <rect x="18" y="60" width="64" height="6" fill="#3a3f55" />
        <circle cx="28" cy="80" r="6" fill="#1f2330" />
        <circle cx="72" cy="80" r="6" fill="#1f2330" />
        <circle cx="28" cy="80" r="2" fill="#fff6e8" />
        <circle cx="72" cy="80" r="2" fill="#fff6e8" />
      </g>
    </CharacterFrame>
  );
}
