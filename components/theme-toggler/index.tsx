import React from 'react';
import { IconDeviceImac, IconMoon, IconSun } from '@tabler/icons-react';
import { MantineColorScheme, SegmentedControl, useMantineColorScheme, VisuallyHidden } from '@mantine/core';



function ThemeToggler() {

  const { setColorScheme, colorScheme } = useMantineColorScheme();

  const iconProps = {
    style: { display: 'block', padding: 2 },
    size: 22,
    stroke: 1.5,
  };

  const data = [
    {
      value: 'light',
      label: (
        <>
          <IconSun {...iconProps} />
          <VisuallyHidden>Light</VisuallyHidden>
        </>
      ),
    },
    {
      value: 'auto',
      label: (
        <>
          <IconDeviceImac {...iconProps} />
          <VisuallyHidden>System</VisuallyHidden>
        </>
      ),
    },
    {
      value: 'dark',
      label: (
        <>
          <IconMoon {...iconProps} />
          <VisuallyHidden>Dark</VisuallyHidden>
        </>
      ),
    },
  ];


  return (
    <>
      <SegmentedControl
        name="my-control"
        data={data}
        withItemsBorders={false}
        value={colorScheme}
        onChange={(value) => setColorScheme(value as MantineColorScheme)}
        styles={{ label: { padding: '4px' } }}
      />
    </>
  );
}

export default ThemeToggler;