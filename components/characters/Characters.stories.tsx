import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import type { CategoryId, Severity } from '@/lib/types';
import { CATEGORIES } from '@/lib/categories';
import type { CharacterProps } from './CharacterBase';
import { CHARACTERS } from './index';

type PlaygroundArgs = CharacterProps & { category: CategoryId };

const meta: Meta<PlaygroundArgs> = {
  title: 'Characters/Gallery',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<PlaygroundArgs>;

const SEVERITIES: Severity[] = ['near_miss', 'injury', 'fatal'];
const SEVERITY_LABEL: Record<Severity, string> = {
  near_miss: 'near_miss · shaken',
  injury: 'injury · hurt',
  fatal: 'fatal · classic',
};

/** Every incident character at a glance with its tagline. */
export const All: Story = {
  render: () => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-6 bg-dwtd-cream max-w-3xl">
      {CATEGORIES.map((cat) => {
        const C = CHARACTERS[cat.id];
        return (
          <div
            key={cat.id}
            className="rounded-2xl border-2 border-dwtd-dark bg-white p-4 shadow-popsm flex flex-col items-center text-center gap-2"
          >
            <div className="rounded-xl border-2 border-dwtd-dark p-2" style={{ backgroundColor: cat.color }}>
              <C size={96} />
            </div>
            <p className="font-display font-bold">{cat.label.en}</p>
            <p className="text-xs text-dwtd-mid">{cat.tagline.en}</p>
            <p className="text-xs text-dwtd-mid italic" lang="th">{cat.tagline.th}</p>
          </div>
        );
      })}
    </div>
  ),
};

/** Each character with the shared idle loop for QA. */
export const IdleRow: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 p-6 bg-dwtd-cream items-end">
      {CATEGORIES.map((cat) => {
        const C = CHARACTERS[cat.id];
        return (
          <div key={cat.id} className="flex flex-col items-center gap-1 w-24">
            <C size={72} motionState="idle" />
            <span className="text-xs text-center text-dwtd-mid">{cat.label.en}</span>
          </div>
        );
      })}
    </div>
  ),
};

/** One character with every prop wired to a control. */
export const Playground: Story = {
  args: {
    category: 'construction',
    severity: 'fatal',
    daypart: 'day',
    flipX: false,
    motionState: 'active',
    size: 160,
  },
  argTypes: {
    category: { control: 'select', options: CATEGORIES.map((c) => c.id) },
    severity: { control: 'inline-radio', options: SEVERITIES },
    daypart: { control: 'inline-radio', options: ['day', 'night'] },
    motionState: { control: 'inline-radio', options: ['none', 'idle', 'active'] },
    flipX: { control: 'boolean' },
    size: { control: { type: 'range', min: 32, max: 220, step: 4 } },
    title: { control: false },
    className: { control: false },
    accessory: { control: false },
  },
  render: ({ category, ...props }) => {
    const C = CHARACTERS[category];
    return (
      <div className="p-10 bg-dwtd-cream rounded-2xl border-2 border-dwtd-dark">
        <C {...props} />
      </div>
    );
  },
};

/** Every character across the three incident severities. */
export const SeverityMatrix: Story = {
  render: () => (
    <div className="p-6 bg-dwtd-cream">
      <div className="grid gap-2 items-center" style={{ gridTemplateColumns: 'auto repeat(3, 1fr)' }}>
        <div />
        {SEVERITIES.map((s) => (
          <p key={s} className="text-xs font-bold text-center text-dwtd-mid">
            {SEVERITY_LABEL[s]}
          </p>
        ))}
        {CATEGORIES.map((cat) => {
          const C = CHARACTERS[cat.id];
          return (
            <React.Fragment key={cat.id}>
              <p className="text-xs font-bold text-dwtd-mid pr-3 text-right">{cat.label.en}</p>
              {SEVERITIES.map((s) => (
                <div
                  key={s}
                  className="rounded-xl border-2 border-dwtd-dark flex items-center justify-center p-1"
                  style={{ backgroundColor: cat.color }}
                >
                  <C size={64} severity={s} motionState="idle" />
                </div>
              ))}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  ),
};

/** Every character in day vs night lighting. */
export const Daypart: Story = {
  render: () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-6 bg-dwtd-cream">
      {CATEGORIES.map((cat) => {
        const C = CHARACTERS[cat.id];
        return (
          <div key={cat.id} className="flex flex-col items-center gap-1">
            <div className="flex gap-1">
              <div className="rounded-xl border-2 border-dwtd-dark p-1" style={{ backgroundColor: cat.color, isolation: 'isolate' }}>
                <C size={72} daypart="day" motionState="idle" />
              </div>
              <div className="rounded-xl border-2 border-dwtd-dark p-1" style={{ backgroundColor: cat.color, isolation: 'isolate' }}>
                <C size={72} daypart="night" motionState="idle" />
              </div>
            </div>
            <span className="text-xs text-dwtd-mid">{cat.label.en}</span>
          </div>
        );
      })}
    </div>
  ),
};

/** Every character normal vs mirrored — the overlay and title must not flip. */
export const FlipX: Story = {
  render: () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-6 bg-dwtd-cream">
      {CATEGORIES.map((cat) => {
        const C = CHARACTERS[cat.id];
        return (
          <div key={cat.id} className="flex flex-col items-center gap-1">
            <div className="flex gap-1">
              <div className="rounded-xl border-2 border-dwtd-dark p-1" style={{ backgroundColor: cat.color }}>
                <C size={72} motionState="idle" />
              </div>
              <div className="rounded-xl border-2 border-dwtd-dark p-1" style={{ backgroundColor: cat.color }}>
                <C size={72} flipX motionState="idle" />
              </div>
            </div>
            <span className="text-xs text-dwtd-mid">{cat.label.en}</span>
          </div>
        );
      })}
    </div>
  ),
};

/**
 * Every character playing its bespoke "how it goes wrong" timeline.
 * Toggle the OS / devtools reduced-motion setting to confirm they all freeze.
 */
export const BespokeTimelines: Story = {
  render: () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 p-10 bg-dwtd-cream">
      {CATEGORIES.map((cat) => {
        const C = CHARACTERS[cat.id];
        return (
          <div key={cat.id} className="flex flex-col items-center gap-2">
            <C size={120} motionState="active" />
            <span className="text-xs text-dwtd-mid">{cat.label.en}</span>
          </div>
        );
      })}
    </div>
  ),
};
