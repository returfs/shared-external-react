import { CheckCircle, Info } from '@phosphor-icons/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { GenericAlert } from './GenericAlert';

const meta: Meta<typeof GenericAlert> = {
  title: 'Components/UI/GenericAlert',
  component: GenericAlert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['info', 'success', 'warning', 'error'],
    },
    alertType: {
      control: { type: 'select' },
      options: ['default', 'slide'],
    },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof GenericAlert>;

export const Default: Story = {
  args: {
    variant: 'info',
    title: 'Heads up',
    description: 'This is a generic informational alert.',
    className: '',
  },
  render: args => React.createElement(GenericAlert, args),
};

export const WithTitleAndDescription: Story = {
  args: {
    variant: 'info',
    title: 'Notice',
    description: 'This alert includes a title and description for context.',
  },
  render: args => React.createElement(GenericAlert, args),
};

export const ErrorVariant: Story = {
  args: {
    variant: 'error',
    title: 'Error',
    description: 'There was a problem processing your request.',
  },
  render: args => React.createElement(GenericAlert, args),
};

export const SuccessVariant: Story = {
  args: {
    variant: 'success',
    title: 'Success',
    description: 'Your operation completed successfully.',
  },
  render: args => React.createElement(GenericAlert, args),
};

export const CustomIcon: Story = {
  args: {
    variant: 'info',
    title: 'Custom icon',
    description: 'You can pass a custom icon component.',
    icon: Info,
  },
  render: args => React.createElement(GenericAlert, args),
};

export const WithCloseButton: Story = {
  args: {
    variant: 'warning',
    title: 'Closable',
    description: 'This alert shows a close button.',
    handleClose: () => console.log('GenericAlert closed'),
  },
  render: args => React.createElement(GenericAlert, args),
};

export const SlideAlert: Story = {
  args: {
    variant: 'success',
    title: 'Slide alert',
    description: 'An alert styled for slide-in display.',
    alertType: 'slide',
    className: 'p-4',
    icon: CheckCircle,
  },
  render: args => React.createElement(GenericAlert, args),
};
