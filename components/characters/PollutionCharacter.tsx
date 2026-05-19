import * as React from 'react';
import { BeanBody, CharacterFrame, DeadEyes, type CharacterProps } from './CharacterBase';

export function PollutionCharacter(props: CharacterProps) {
  return (
    <CharacterFrame {...props} title={props.title ?? 'PM2.5 incident'}>
      <BeanBody fill="#3a3f55" accent="#23283a" />
      <DeadEyes cy={42} />
      {/* surgical mask */}
      <g stroke="#1f2330" strokeWidth="2" strokeLinejoin="round">
        <path d="M28 56 Q 50 72 72 56 L 72 70 Q 50 84 28 70 Z" fill="#7ad7c1" />
        <line x1="28" y1="60" x2="72" y2="60" stroke="#1f2330" strokeWidth="0.8" />
        <line x1="28" y1="68" x2="72" y2="68" stroke="#1f2330" strokeWidth="0.8" />
        <line x1="28" y1="58" x2="14" y2="50" />
        <line x1="72" y1="58" x2="86" y2="50" />
      </g>
      {/* haze cloud */}
      <g fill="#a3a8b8" opacity="0.7">
        <circle cx="14" cy="20" r="6" />
        <circle cx="24" cy="16" r="7" />
        <circle cx="34" cy="20" r="6" />
        <circle cx="70" cy="14" r="6" />
        <circle cx="80" cy="18" r="7" />
        <circle cx="90" cy="14" r="5" />
      </g>
    </CharacterFrame>
  );
}
