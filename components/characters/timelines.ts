import type { TargetAndTransition, Transition } from 'framer-motion';

/** Motion props for a single animatable layer of a character. */
export interface LayerMotion {
  animate: TargetAndTransition;
  transition?: Transition;
}

/**
 * A character's bespoke "how it goes wrong" timeline: a map of layer id to the
 * motion applied to that layer. Each character co-locates its own timeline and
 * passes it to <CharacterLayer> for the layers it wants animated.
 */
export type CharacterTimeline = Record<string, LayerMotion>;

/**
 * Lightweight shared idle loop. Cheap, transform-only — safe to run on every
 * map marker at once. The bespoke per-character timelines are reserved for
 * the hovered / selected marker and the popup.
 */
export const IDLE_LOOP: LayerMotion = {
  animate: { y: [0, -3, 0], rotate: [-1.6, 1.6, -1.6] },
  transition: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' },
};
