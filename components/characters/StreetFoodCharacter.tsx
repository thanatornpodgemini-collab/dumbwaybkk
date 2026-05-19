import * as React from 'react';
import { BeanBody, CharacterFrame, DeadEyes, ShockMouth, type CharacterProps } from './CharacterBase';

export function StreetFoodCharacter(props: CharacterProps) {
  return (
    <CharacterFrame {...props} title={props.title ?? 'Street food incident'}>
      <BeanBody fill="#ff7a5a" accent="#c95a3e" />
      <DeadEyes />
      <ShockMouth />
      {/* flame */}
      <g stroke="#1f2330" strokeWidth="1.8" strokeLinejoin="round">
        <path
          d="M50 84 Q 38 76 44 64 Q 48 72 52 62 Q 56 74 58 64 Q 64 78 50 84 Z"
          fill="#ff9a3c"
        />
        <path
          d="M50 82 Q 46 76 48 70 Q 50 74 52 68 Q 54 76 50 82 Z"
          fill="#ffd23f"
        />
      </g>
      {/* gas cylinder */}
      <g stroke="#1f2330" strokeWidth="1.8" strokeLinejoin="round">
        <rect x="76" y="64" width="12" height="22" rx="2" fill="#e94545" />
        <rect x="79" y="60" width="6" height="4" fill="#3a3f55" />
      </g>
    </CharacterFrame>
  );
}
