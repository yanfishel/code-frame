"use client";

import React from 'react';
import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react';
import { ActionIcon, MantineColorScheme, Menu, SegmentedControl, Tooltip, useMantineColorScheme } from '@mantine/core';
import { E_COLOR_SCHEME } from '@/src/constants';
import { data, THEME_MENU_ITEMS } from './theme-toggler-data';


function ThemeToggler() {

  const { setColorScheme, colorScheme } = useMantineColorScheme();


  return (
    <>
      <Menu shadow="md" position="bottom-end" transitionProps={{ transition: 'pop-top-right' }}>
        <Menu.Target>
          <Tooltip label={`${THEME_MENU_ITEMS[colorScheme].label} theme`} withArrow position="bottom">
            <ActionIcon
              size={30}
              radius="sm"
              variant="default"
              aria-label="Color scheme"
              style={{ boxShadow: 'var(--mantine-shadow-xs)' }}
            >
              {THEME_MENU_ITEMS[colorScheme].icon}
            </ActionIcon>
          </Tooltip>
        </Menu.Target>

        <Menu.Dropdown>
          {Object.keys(THEME_MENU_ITEMS).map((key) => {
            const item = THEME_MENU_ITEMS[key as MantineColorScheme];
            return (
              <Menu.Item
                key={item.value}
                disabled={colorScheme === item.value}
                onClick={() => setColorScheme(item.value as MantineColorScheme)}
                leftSection={item.icon}
              >
                {item.label}
              </Menu.Item>
            );
          })}
        </Menu.Dropdown>
      </Menu>

      {/*<SegmentedControl
        visibleFrom="xs"
        name="my-control"
        size="lg"
        data={data}
        withItemsBorders={false}
        value={colorScheme}
        onChange={(value) => setColorScheme(value as MantineColorScheme)}
        styles={{ label: { padding: '5px' } }}
      />*/}
    </>
  );
}

export default ThemeToggler;