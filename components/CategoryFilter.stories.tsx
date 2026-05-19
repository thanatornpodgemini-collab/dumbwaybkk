import type { Meta, StoryObj } from '@storybook/react';
import { CategoryFilter } from './CategoryFilter';

const meta: Meta<typeof CategoryFilter> = {
  title: 'Components/CategoryFilter',
  component: CategoryFilter,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof CategoryFilter>;

export const Default: Story = {
  render: () => (
    <div className="h-screen flex">
      <CategoryFilter />
      <div className="flex-1 bg-dwtd-cream" />
    </div>
  ),
};
