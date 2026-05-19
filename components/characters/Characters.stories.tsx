import type { Meta, StoryObj } from '@storybook/react';
import { CATEGORIES } from '@/lib/categories';
import { CHARACTERS } from './index';

const meta: Meta = {
  title: 'Characters/Gallery',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj;

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
              <C size={96} animation="bob" />
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

/** Each character in isolation with the wobble animation for QA. */
export const WobbleRow: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 p-6 bg-dwtd-cream items-end">
      {CATEGORIES.map((cat) => {
        const C = CHARACTERS[cat.id];
        return (
          <div key={cat.id} className="flex flex-col items-center gap-1 w-24">
            <C size={72} animation="wobble" />
            <span className="text-xs text-center text-dwtd-mid">{cat.label.en}</span>
          </div>
        );
      })}
    </div>
  ),
};
