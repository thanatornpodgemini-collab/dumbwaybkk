import * as React from 'react';
import { BeanBody, CharacterFrame, DeadEyes, type CharacterProps } from './CharacterBase';

export function ElectrocutionCharacter(props: CharacterProps) {
  return (
    <CharacterFrame {...props} title={props.title ?? 'Electrocution incident'}>
      <BeanBody fill="#ffd23f" accent="#d6a921" />
      <DeadEyes />
      {/* zigzag tongue */}
      <path
        d="M44 64 L48 72 L52 64 L56 72 L60 64"
        fill="none"
        stroke="#1f2330"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      {/* lightning bolts around the body */}
      <g fill="#ffd23f" stroke="#1f2330" strokeWidth="1.8" strokeLinejoin="round">
        <path d="M12 30 L20 30 L16 38 L24 38 L14 52 L18 42 L10 42 Z" />
        <path d="M82 26 L90 26 L86 34 L92 34 L80 50 L86 38 L78 38 Z" />
      </g>
      {/* hair stood on end */}
      <g stroke="#1f2330" strokeWidth="2" strokeLinecap="round">
        <line x1="40" y1="12" x2="38" y2="4" />
        <line x1="50" y1="10" x2="50" y2="2" />
        <line x1="60" y1="12" x2="62" y2="4" />
      </g>
    </CharacterFrame>
  );
}
