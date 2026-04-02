"use client"

import React from 'react';
import { MantineColorScheme, SegmentedControl, useMantineColorScheme } from '@mantine/core';

import { data } from './theme-toggler-data';


function ThemeToggler() {

  const { setColorScheme, colorScheme } = useMantineColorScheme();


  return (
    <>
      <SegmentedControl
        name="my-control"
        size="lg"
        data={data}
        withItemsBorders={false}
        value={colorScheme}
        onChange={(value) => setColorScheme(value as MantineColorScheme)}
        styles={{ label: { padding: '5px' } }}
      />
    </>
  );
}

export default ThemeToggler;