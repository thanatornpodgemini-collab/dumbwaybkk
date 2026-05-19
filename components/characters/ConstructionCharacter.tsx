import * as React from 'react';
import { BeanBody, CharacterFrame, DeadEyes, ShockMouth, type CharacterProps } from './CharacterBase';

export function ConstructionCharacter(props: CharacterProps) {
  return (
    <CharacterFrame {...props} title={props.title ?? 'Construction incident'}>
      <BeanBody fill="#ff7a5a" accent="#c95a3e" />
      {/* hard hat (too late) */}
      <g stroke="#1f2330" strokeWidth="2" strokeLinejoin="round">
        <path d="M30 28 Q50 12 70 28 L72 32 L28 32 Z" fill="#ffd23f" />
        <rect x="46" y="14" width="8" height="6" fill="#e94545" />
      </g>
      <DeadEyes />
      <ShockMouth />
      {/* falling brick */}
      <g stroke="#1f2330" strokeWidth="1.8" strokeLinejoin="round">
        <rect x="76" y="6" width="18" height="10" fill="#a67c52" />
        <line x1="80" y1="6" x2="80" y2="16" stroke="#1f2330" strokeWidth="1" />
        <line x1="86" y1="6" x2="86" y2="16" stroke="#1f2330" strokeWidth="1" />
      </g>
    </CharacterFrame>
  );
}
