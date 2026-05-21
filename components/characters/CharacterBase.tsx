'use client';

import * as React from 'react';
import clsx from 'clsx';
import { motion, useReducedMotion } from 'framer-motion';
import type { Severity } from '@/lib/types';
import { IDLE_LOOP, type CharacterTimeline } from './timelines';

export type Daypart = 'day' | 'night';
export type MotionState = 'none' | 'idle' | 'active';

export interface CharacterProps {
  size?: number;
  className?: string;
  title?: string;
  /** Incident severity — drives the face. Defaults to 'fatal' (classic X-eyes). */
  severity?: Severity;
  /** 'night' lays a non-destructive indigo tint over the art. */
  daypart?: Daypart;
  /** Mirror horizontally. Decorative only — never use where left/right carries meaning. */
  flipX?: boolean;
  /** Extra SVG node slotted into the 0 0 100 100 space, after the body. */
  accessory?: React.ReactNode;
  /** 'idle' = light shared loop, 'active' = bespoke timeline, 'none' = static. */
  motionState?: MotionState;
}

/** Single ink color for every outline. */
export const INK = '#1f2330';

/** The only stroke widths characters may use, by role. */
export const STROKE = {
  body: 2.6,
  feature: 2,
  detail: 1.4,
  hair: 2,
} as const;

const BEAN_PATH =
  'M50 14 C 70 14, 80 30, 80 50 C 80 76, 68 90, 50 90 C 32 90, 20 76, 20 50 C 20 30, 30 14, 50 14 Z';

/** Instance-scoped ids so gradients/clips never collide when many SVGs share a page. */
const FrameIdContext = React.createContext('dwtd');

function useFrameIds() {
  const prefix = React.useContext(FrameIdContext);
  return {
    shade: `${prefix}-shade`,
    bodyClip: `${prefix}-bodyclip`,
  };
}

function FrameDefs() {
  const ids = useFrameIds();
  return (
    <defs>
      <radialGradient id={ids.shade} cx="36%" cy="30%" r="80%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
        <stop offset="46%" stopColor="#ffffff" stopOpacity="0" />
        <stop offset="100%" stopColor={INK} stopOpacity="0.26" />
      </radialGradient>
    </defs>
  );
}

function DaypartOverlay() {
  return (
    <rect
      x="0"
      y="0"
      width="100"
      height="100"
      fill="#3a3f55"
      opacity="0.24"
      style={{ mixBlendMode: 'multiply' }}
      pointerEvents="none"
    />
  );
}

export function CharacterFrame({
  size = 96,
  className,
  title,
  daypart = 'day',
  flipX = false,
  accessory,
  motionState = 'idle',
  children,
}: React.PropsWithChildren<CharacterProps>) {
  const reduce = useReducedMotion();
  const rawId = React.useId();
  const prefix = React.useMemo(
    () => `c${rawId.replace(/[^a-zA-Z0-9]/g, '')}`,
    [rawId],
  );

  const idle = motionState === 'idle' && !reduce ? IDLE_LOOP : {};

  return (
    <FrameIdContext.Provider value={prefix}>
      <motion.svg
        role="img"
        aria-label={title}
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className={clsx('inline-block select-none overflow-visible', className)}
        style={{ transformOrigin: '50% 100%' }}
        {...idle}
      >
        {title ? <title>{title}</title> : null}
        <FrameDefs />
        <g transform={flipX ? 'translate(100,0) scale(-1,1)' : undefined}>
          {children}
          {accessory}
        </g>
        {daypart === 'night' ? <DaypartOverlay /> : null}
      </motion.svg>
    </FrameIdContext.Provider>
  );
}

/**
 * Wraps one animatable region. Plays `timeline[id]` only when `active` and the
 * user has not requested reduced motion. Rotates/scales around its own center.
 */
export function CharacterLayer({
  id,
  timeline,
  active,
  children,
}: React.PropsWithChildren<{
  id: string;
  timeline: CharacterTimeline;
  active: boolean;
}>) {
  const reduce = useReducedMotion();
  const motionProps = active && !reduce ? timeline[id] : undefined;
  return (
    <motion.g
      style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
      {...(motionProps ?? {})}
    >
      {children}
    </motion.g>
  );
}

/** A flat, bean-shaped body with a soft cast shadow and subtle shading. */
export function BeanBody({
  fill,
  accent,
  shaded = true,
}: {
  fill: string;
  accent?: string;
  shaded?: boolean;
}) {
  const ids = useFrameIds();
  return (
    <g>
      {/* soft cast shadow on the ground */}
      <ellipse cx="50" cy="93" rx="23" ry="3.6" fill={INK} opacity="0.16" />
      <clipPath id={ids.bodyClip}>
        <path d={BEAN_PATH} />
      </clipPath>
      <path
        d={BEAN_PATH}
        fill={fill}
        stroke={INK}
        strokeWidth={STROKE.body}
        strokeLinejoin="round"
      />
      {accent ? (
        <path
          d="M28 60 C 38 70, 62 70, 72 60 L 72 80 C 62 86, 38 86, 28 80 Z"
          fill={accent}
          opacity="0.9"
          clipPath={`url(#${ids.bodyClip})`}
        />
      ) : null}
      {shaded ? (
        <path
          d={BEAN_PATH}
          fill={`url(#${ids.shade})`}
          clipPath={`url(#${ids.bodyClip})`}
        />
      ) : null}
    </g>
  );
}

/** Two simple "X" dead eyes - the DWTD signature. */
export function DeadEyes({ cx1 = 38, cx2 = 62, cy = 48, size = 4 }) {
  const s = size;
  return (
    <g stroke={INK} strokeWidth={STROKE.feature} strokeLinecap="round">
      <line x1={cx1 - s} y1={cy - s} x2={cx1 + s} y2={cy + s} />
      <line x1={cx1 - s} y1={cy + s} x2={cx1 + s} y2={cy - s} />
      <line x1={cx2 - s} y1={cy - s} x2={cx2 + s} y2={cy + s} />
      <line x1={cx2 - s} y1={cy + s} x2={cx2 + s} y2={cy - s} />
    </g>
  );
}

/** Wide round eyes with a highlight - intact but shocked. */
export function AliveEyes({ cx1 = 38, cx2 = 62, cy = 48, r = 4.4 }) {
  return (
    <g>
      <circle cx={cx1} cy={cy} r={r} fill={INK} />
      <circle cx={cx2} cy={cy} r={r} fill={INK} />
      <circle cx={cx1 - r * 0.34} cy={cy - r * 0.4} r={r * 0.3} fill="#ffffff" />
      <circle cx={cx2 - r * 0.34} cy={cy - r * 0.4} r={r * 0.3} fill="#ffffff" />
    </g>
  );
}

/** Spiral "dazed" eyes - hurt and seeing stars. */
export function DizzyEyes({ cx1 = 38, cx2 = 62, cy = 48 }) {
  const swirl = (cx: number) =>
    `M ${cx - 3} ${cy} a 3 3 0 1 1 6 0 a 1.6 1.6 0 1 0 -3.2 0`;
  return (
    <g stroke={INK} strokeWidth={STROKE.detail} fill="none" strokeLinecap="round">
      <path d={swirl(cx1)} />
      <path d={swirl(cx2)} />
    </g>
  );
}

/** Wide-open shocked O mouth. */
export function ShockMouth({ cx = 50, cy = 64, rx = 5, ry = 6 }) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={INK} />;
}

/** Squiggle mouth for "uh oh" energy. */
export function SquiggleMouth({ y = 64 }) {
  return (
    <path
      d={`M 38 ${y} q 4 -4 8 0 t 8 0 t 8 0`}
      fill="none"
      stroke={INK}
      strokeWidth={STROKE.feature}
      strokeLinecap="round"
    />
  );
}

/** Picks eyes + mouth from incident severity. The only place severity maps to a face. */
export function CharacterFace({
  severity = 'fatal',
  cy = 48,
  mouthY = 64,
  showMouth = true,
}: {
  severity?: Severity;
  cy?: number;
  mouthY?: number;
  /** Set false when an accessory (mask, tongue) takes the mouth's place. */
  showMouth?: boolean;
}) {
  const eyes =
    severity === 'near_miss' ? (
      <AliveEyes cy={cy} />
    ) : severity === 'injury' ? (
      <DizzyEyes cy={cy} />
    ) : (
      <DeadEyes cy={cy} />
    );
  const mouth = !showMouth ? null : severity === 'near_miss' ? (
    <ShockMouth cy={mouthY} rx={3.4} ry={4.2} />
  ) : severity === 'injury' ? (
    <SquiggleMouth y={mouthY} />
  ) : (
    <ShockMouth cy={mouthY} />
  );
  return (
    <>
      {eyes}
      {mouth}
    </>
  );
}

/** Bandage / plaster overlay drawn when severity is 'injury'. */
export function InjuryMarks({ variant = 'bandage' }: { variant?: 'bandage' | 'plaster' }) {
  if (variant === 'plaster') {
    return (
      <g
        stroke={INK}
        strokeWidth={STROKE.detail}
        strokeLinejoin="round"
        transform="rotate(-22 28 44)"
      >
        <rect x="20" y="40" width="16" height="8" rx="1.6" fill="#ffe0b8" />
        <line x1="25" y1="40.6" x2="25" y2="47.4" />
        <line x1="31" y1="40.6" x2="31" y2="47.4" />
      </g>
    );
  }
  return (
    <g stroke={INK} strokeWidth={STROKE.feature} strokeLinejoin="round">
      {/* head wrap across the crown */}
      <path d="M22 31 Q 50 14 78 31 L 78 39 Q 50 25 22 39 Z" fill="#fff6e8" />
      {/* knot + tail */}
      <path d="M74 31 l 9 -5 l -2 7 l 7 2 l -8 4 Z" fill="#fff6e8" />
      <line x1="31" y1="34" x2="37" y2="29" />
      <line x1="47" y1="29" x2="53" y2="25" />
      <line x1="63" y1="29" x2="69" y2="26" />
    </g>
  );
}
