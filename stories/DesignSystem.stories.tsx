import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Design System/Tokens',
  parameters: { layout: 'fullscreen' },
};
export default meta;

const COLORS: Array<{ name: string; hex: string }> = [
  { name: 'pink', hex: '#ff5a8a' },
  { name: 'coral', hex: '#ff7a5a' },
  { name: 'yellow', hex: '#ffd23f' },
  { name: 'mint', hex: '#7ad7c1' },
  { name: 'teal', hex: '#3aa6a0' },
  { name: 'blue', hex: '#3a8dde' },
  { name: 'purple', hex: '#7a5af8' },
  { name: 'red', hex: '#e94545' },
  { name: 'orange', hex: '#ff9a3c' },
  { name: 'green', hex: '#5bc46b' },
  { name: 'dark', hex: '#1f2330' },
  { name: 'mid', hex: '#3a3f55' },
  { name: 'cream', hex: '#fff6e8' },
];

export const Palette: StoryObj = {
  render: () => (
    <div className="p-6 bg-dwtd-cream">
      <h2 className="font-display text-2xl font-bold mb-4">Palette</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {COLORS.map((c) => (
          <div
            key={c.name}
            className="rounded-2xl border-2 border-dwtd-dark overflow-hidden shadow-popsm"
          >
            <div className="h-16" style={{ backgroundColor: c.hex }} />
            <div className="px-2 py-1.5 bg-white">
              <p className="text-sm font-bold">dwtd-{c.name}</p>
              <p className="text-xs text-dwtd-mid">{c.hex}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Typography: StoryObj = {
  render: () => (
    <div className="p-6 bg-dwtd-cream space-y-4">
      <div>
        <p className="text-xs text-dwtd-mid uppercase tracking-wider font-bold">
          font-display (Fredoka)
        </p>
        <p className="font-display text-4xl font-bold">Dumb Ways to Die in Bangkok</p>
      </div>
      <div>
        <p className="text-xs text-dwtd-mid uppercase tracking-wider font-bold">
          font-sans (Nunito)
        </p>
        <p className="text-base">
          A field guide to incidents from the last ten years of Thai news.
        </p>
      </div>
      <div lang="th">
        <p className="text-xs text-dwtd-mid uppercase tracking-wider font-bold">
          font-thai (Noto Sans Thai)
        </p>
        <p className="font-thai text-2xl">วิธีตายงี่เง่าในกรุงเทพ</p>
      </div>
    </div>
  ),
};
