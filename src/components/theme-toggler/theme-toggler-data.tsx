import React from 'react';
import { Monitor, Moon, Sun } from 'lucide-react';
import { Tooltip, VisuallyHidden } from '@mantine/core';


const iconProps = {
  size: 14,
}

export const THEME_MENU_ITEMS = {
  light: { label: 'Light', value: 'light', icon: <Sun {...iconProps} /> },
  auto: { label: 'System', value: 'auto', icon: <Monitor {...iconProps} /> },
  dark: { label: 'Dark', value: 'dark', icon: <Moon {...iconProps} /> },
};

export const data = [
  {
    value: 'light',
    label: (
      <Tooltip
        label="Light Theme"
        withArrow
        position="bottom"
        transitionProps={{ transition: 'skew-down' }}
      >
        <span>
          <Sun {...iconProps} />
          <VisuallyHidden>Light</VisuallyHidden>
        </span>
      </Tooltip>
    ),
  },
  {
    value: 'auto',
    label: (
      <Tooltip
        label="System Theme"
        withArrow
        position="bottom"
        transitionProps={{ transition: 'skew-down' }}
      >
        <span>
          <Monitor {...iconProps} />
          <VisuallyHidden>System</VisuallyHidden>
        </span>
      </Tooltip>
    ),
  },
  {
    value: 'dark',
    label: (
      <Tooltip
        label="Dark Theme"
        withArrow
        position="bottom"
        transitionProps={{ transition: 'skew-down' }}
      >
        <span>
          <Moon {...iconProps} />
          <VisuallyHidden>Dark</VisuallyHidden>
        </span>
      </Tooltip>
    ),
  },
];