import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import Surface from './Surface';

const meta: Meta<typeof Surface> = {
  title: 'Components/Grids/Surface',
  component: Surface,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Surface>;

export const Default: Story = {
  render: args => React.createElement(Surface, args, 'Default surface content'),
  args: { className: '', variant: 'default', area: undefined },
};

export const ContextMenu: Story = {
  render: args =>
    React.createElement(
      Surface,
      args,
      React.createElement(
        'div',
        { style: { padding: 12 } },
        'Context menu surface',
      ),
    ),
  args: { area: 'contextMenu' },
};

export const WithChildren: Story = {
  render: args =>
    React.createElement(
      Surface,
      args,
      React.createElement(
        'div',
        { className: 'space-y-2' },
        React.createElement(
          'h3',
          { className: 'text-sm font-semibold' },
          'Title',
        ),
        React.createElement(
          'p',
          { className: 'text-xs' },
          'Body content inside Surface',
        ),
      ),
    ),
  args: { className: 'p-4' },
};

export const CustomClass: Story = {
  render: args => React.createElement(Surface, args, 'Custom class applied'),
  args: { className: 'bg-blue-50 border-blue-200 p-4' },
};
