import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert, AlertTitle, AlertDescription } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/UI/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['info', 'success', 'warning', 'error'],
    },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: { variant: 'info', className: '' },
  render: args =>
    React.createElement(Alert, args, 'This is an informational alert.'),
};

export const WithTitleAndDescription: Story = {
  args: { variant: 'info', className: '' },
  render: args =>
    React.createElement(
      Alert,
      args,
      React.createElement(AlertTitle, null, 'Notice'),
      React.createElement(
        AlertDescription,
        null,
        React.createElement(
          'p',
          null,
          'This alert includes a title and description for more context.',
        ),
      ),
    ),
};

export const Error: Story = {
  args: { variant: 'error' },
  render: args =>
    React.createElement(
      Alert,
      args,
      'There was an error processing your request.',
    ),
};

export const Success: Story = {
  args: { variant: 'success' },
  render: args =>
    React.createElement(Alert, args, 'Operation completed successfully.'),
};

export const CustomClass: Story = {
  args: { variant: 'info', className: 'bg-yellow-50 border-yellow-200 p-4' },
  render: args => React.createElement(Alert, args, 'Custom styled alert'),
};
