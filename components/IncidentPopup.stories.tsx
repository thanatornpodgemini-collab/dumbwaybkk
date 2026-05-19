import type { Meta, StoryObj } from '@storybook/react';
import { IncidentPopup } from './IncidentPopup';
import { incidents } from '@/lib/incidents';

const meta: Meta<typeof IncidentPopup> = {
  title: 'Components/IncidentPopup',
  component: IncidentPopup,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof IncidentPopup>;

export const Fatal: Story = {
  args: { incident: incidents.find((i) => i.severity === 'fatal')! },
};

export const Injury: Story = {
  args: { incident: incidents.find((i) => i.severity === 'injury')! },
};

export const NearMiss: Story = {
  args: { incident: incidents.find((i) => i.severity === 'near_miss')! },
};

export const Gallery: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-dwtd-cream">
      {incidents.slice(0, 8).map((i) => (
        <IncidentPopup key={i.id} incident={i} />
      ))}
    </div>
  ),
};
