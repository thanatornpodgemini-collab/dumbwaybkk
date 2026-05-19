import * as React from 'react';
import { BeanBody, CharacterFrame, DeadEyes, SquiggleMouth, type CharacterProps } from './CharacterBase';

export function SongkranCharacter(props: CharacterProps) {
  return (
    <CharacterFrame {...props} title={props.title ?? 'Songkran incident'}>
      <BeanBody fill="#7ad7c1" accent="#3aa6a0" />
      <DeadEyes />
      <SquiggleMouth />
      {/* water gun */}
      <g stroke="#1f2330" strokeWidth="2" strokeLinejoin="round">
        <rect x="64" y="48" width="22" height="10" fill="#ff5a8a" />
        <rect x="68" y="38" width="8" height="10" fill="#ff5a8a" />
        <rect x="62" y="56" width="6" height="10" fill="#ff5a8a" />
      </g>
      {/* water splash arcs */}
      <g fill="none" stroke="#3a8dde" strokeWidth="2.4" strokeLinecap="round">
        <path d="M86 50 Q 94 46 96 38" />
        <path d="M86 54 Q 96 56 98 64" />
      </g>
    </CharacterFrame>
  );
}
