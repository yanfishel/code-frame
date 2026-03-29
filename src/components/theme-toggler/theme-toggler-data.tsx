import React from 'react';
import { Monitor, Moon, Sun } from 'lucide-react';
import { Tooltip, VisuallyHidden } from '@mantine/core';


const iconProps = {
  style: { display: 'block', padding: 2 },
  size: 22,
}


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