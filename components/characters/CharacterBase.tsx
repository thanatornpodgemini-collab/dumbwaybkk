import * as React from 'react';
import clsx from 'clsx';

export interface CharacterProps {
  size?: number;
  className?: string;
  animation?: 'none' | 'wobble' | 'bob' | 'spook';
  title?: string;
}

export function CharacterFrame({
  size = 96,
  className,
  animation = 'none',
  title,
  children,
}: React.PropsWithChildren<CharacterProps>) {
  const animClass =
    animation === 'wobble'
      ? 'animate-wobble origin-bottom'
      : animation === 'bob'
        ? 'animate-bob'
        : animation === 'spook'
          ? 'animate-spook'
          : '';

  return (
    <svg
      role="img"
      aria-label={title}
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={clsx('inline-block select-none', animClass, className)}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

/** A flat, bean-shaped body used as the silhouette for most characters. */
export function BeanBody({ fill, accent }: { fill: string; accent?: string }) {
  return (
    <g>
      {/* drop shadow puddle */}
      <ellipse cx="50" cy="92" rx="22" ry="3.2" fill="#1f2330" opacity="0.18" />
      {/* body */}
      <path
        d="M50 14
           C 70 14, 80 30, 80 50
           C 80 76, 68 90, 50 90
           C 32 90, 20 76, 20 50
           C 20 30, 30 14, 50 14 Z"
        fill={fill}
        stroke="#1f2330"
        strokeWidth="2.4"
      />
      {accent ? (
        <path
          d="M28 60 C 38 70, 62 70, 72 60 L 72 78 C 62 84, 38 84, 28 78 Z"
          fill={accent}
          opacity="0.85"
        />
      ) : null}
    </g>
  );
}

/** Two simple "X" dead eyes - the DWTD signature. */
export function DeadEyes({ cx1 = 38, cx2 = 62, cy = 48, size = 4 }) {
  const s = size;
  return (
    <g stroke="#1f2330" strokeWidth="2.2" strokeLinecap="round">
      <line x1={cx1 - s} y1={cy - s} x2={cx1 + s} y2={cy + s} />
      <line x1={cx1 - s} y1={cy + s} x2={cx1 + s} y2={cy - s} />
      <line x1={cx2 - s} y1={cy - s} x2={cx2 + s} y2={cy + s} />
      <line x1={cx2 - s} y1={cy + s} x2={cx2 + s} y2={cy - s} />
    </g>
  );
}

/** Wide-open shocked O mouth. */
export function ShockMouth({ cx = 50, cy = 64, rx = 5, ry = 6 }) {
  return (
    <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#1f2330" />
  );
}

/** Squiggle mouth for "uh oh" energy. */
export function SquiggleMouth({ y = 64 }) {
  return (
    <path
      d={`M 38 ${y} q 4 -4 8 0 t 8 0 t 8 0`}
      fill="none"
      stroke="#1f2330"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  );
}
