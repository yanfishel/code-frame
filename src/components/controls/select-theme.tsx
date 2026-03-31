import React from 'react';
import { ChevronsUpDown } from 'lucide-react';
import { Box, Flex, Menu, Text } from '@mantine/core';
import { THEMES } from '@/src/constants';
import { useStore } from '@/src/store';
import { T_Theme } from '@/src/types';
import SelectThemeItem from './items/select-theme-item';
import classes from './controls.module.css';


const SelectTheme = () => {

  const selectedTheme = useStore((state) => state.theme)
  const selectTheme = useStore((state) => state.selectTheme);


  return (
    <Box>
      <Text size="xs" fw={500} mt="xs" mb={3}>
        Theme
      </Text>
      <Box className={classes.themeSwitcherWrapper}>
        <Menu shadow="md" position="bottom-end">
          <Menu.Target>
            <Flex align="center" gap="sm" className={classes.themeSwitcherInput}>
              <SelectThemeItem transparent {...(selectedTheme as T_Theme)} />
              <Box style={{ opacity: 0.35 }}>
                <ChevronsUpDown size={12} />
              </Box>
            </Flex>
          </Menu.Target>
          <Menu.Dropdown styles={{ dropdown: {maxHeight: '260px', overflowY: 'auto'} }}>
            {THEMES.map((theme) => {
              const isSelected = selectedTheme?.theme_name === theme.theme_name;
              return (
                <Menu.Item
                  key={theme.theme_name}
                  disabled={isSelected}
                  onClick={() => selectTheme(theme)}
                >
                  <SelectThemeItem {...theme} />
                </Menu.Item>
              );
            })}
          </Menu.Dropdown>
        </Menu>
      </Box>
    </Box>
  );
}

export default SelectTheme;
