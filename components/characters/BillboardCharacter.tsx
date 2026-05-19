import * as React from 'react';
import { BeanBody, CharacterFrame, DeadEyes, ShockMouth, type CharacterProps } from './CharacterBase';

export function BillboardCharacter(props: CharacterProps) {
  return (
    <CharacterFrame {...props} title={props.title ?? 'Falling billboard'}>
      <BeanBody fill="#e94545" accent="#b9303a" />
      <DeadEyes />
      <ShockMouth />
      {/* falling billboard from above */}
      <g stroke="#1f2330" strokeWidth="2" strokeLinejoin="round">
        <rect x="6" y="6" width="40" height="20" fill="#fff6e8" transform="rotate(-15 26 16)" />
        <rect x="10" y="10" width="12" height="4" fill="#ff5a8a" transform="rotate(-15 26 16)" />
        <rect x="26" y="10" width="16" height="4" fill="#3a8dde" transform="rotate(-15 26 16)" />
      </g>
      {/* impact stars */}
      <g fill="#ffd23f" stroke="#1f2330" strokeWidth="1.6">
        <path d="M82 22 L86 14 L90 22 L98 22 L92 28 L94 36 L86 32 L78 36 L80 28 L74 22 Z" />
      </g>
    </CharacterFrame>
  );
}
