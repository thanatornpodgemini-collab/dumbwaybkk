import * as React from 'react';
import { BeanBody, CharacterFrame, DeadEyes, SquiggleMouth, type CharacterProps } from './CharacterBase';

export function SoiDogCharacter(props: CharacterProps) {
  return (
    <CharacterFrame {...props} title={props.title ?? 'Soi dog incident'}>
      <BeanBody fill="#ff9a3c" accent="#cf7a25" />
      <DeadEyes />
      <SquiggleMouth />
      {/* dog silhouette in foreground */}
      <g fill="#3a3f55" stroke="#1f2330" strokeWidth="1.8" strokeLinejoin="round">
        <path d="M62 78 L72 78 L78 70 L84 70 L82 82 L70 86 L62 86 Z" />
        <circle cx="80" cy="68" r="1.2" fill="#ff5a8a" stroke="none" />
      </g>
      {/* bite marks/paw prints */}
      <g fill="#1f2330">
        <circle cx="14" cy="80" r="1.6" />
        <circle cx="18" cy="84" r="1.6" />
        <circle cx="22" cy="80" r="1.6" />
      </g>
    </CharacterFrame>
  );
}
