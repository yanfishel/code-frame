import React, { memo, useEffect, useState } from 'react';
import { ActionIcon, MantineColorScheme, Menu, Tooltip, useMantineColorScheme } from '@mantine/core';
import { THEME_MENU_ITEMS } from './theme-toggler-data';


const ThemeToggler = () => {

  const { setColorScheme, colorScheme } = useMantineColorScheme();

  const [scheme, setScheme] = useState<MantineColorScheme>('auto');


  const toggleScheme = (scheme: MantineColorScheme) => {
    if (!document.startViewTransition) {
      setColorScheme(scheme);
      return;
    }
    document.startViewTransition(() => setColorScheme(scheme));
  }

  useEffect(() => setScheme(colorScheme), [colorScheme]);


  return (
      <Menu shadow="md" position="bottom-end" transitionProps={{ transition: 'pop-top-right' }}>
        <Menu.Target>
          <Tooltip label={`${THEME_MENU_ITEMS[scheme].label} theme`} withArrow position="bottom">
            <ActionIcon
              size={30}
              radius="sm"
              variant="default"
              aria-label="Color scheme"
              style={{ boxShadow: 'var(--mantine-shadow-xs)' }}
            >
              {THEME_MENU_ITEMS[scheme].icon}
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
                onClick={() => toggleScheme(item.value as MantineColorScheme)}
                leftSection={item.icon}
              >
                {item.label}
              </Menu.Item>
            );
          })}
        </Menu.Dropdown>
      </Menu>
  )
}

export default memo(ThemeToggler)