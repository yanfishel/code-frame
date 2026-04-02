import React from 'react';
import clsx from 'clsx';
import { Box, Flex, Paper, Text } from '@mantine/core';
import { useStore } from '@/src/store';
import { T_Theme } from '@/src/types';
import classes from '../controls.module.css';


interface SelectThemeItemProps extends Omit<T_Theme, 'transparent'> {
  transparent?: boolean;
}
const SelectThemeItem = (itemTheme: SelectThemeItemProps) => {

  const theme = useStore((state) => state.theme);


  return (
    <Paper
      aria-label="Theme switcher item"
      withBorder={!itemTheme.transparent}
      px="8px"
      py={itemTheme.transparent ? 0 : '6px'}
      bg={!itemTheme.transparent ? itemTheme.bg : undefined}
      radius="sm"
      className={clsx(
        classes.themeSwitcher,
        itemTheme.transparent && classes.themeSwitcherValue,
        theme?.theme_name === itemTheme.theme_name &&
          !itemTheme.transparent &&
          classes.themeSwitcherActive
      )}
    >
      <Flex align="center" justify="space-between" gap="md">
        <Text
          fw={itemTheme.transparent ? 400 : 500}
          c={!itemTheme.transparent ? itemTheme.fg : undefined}
          className={classes.themeSwitcherTitle}
          style={{ fontSize: itemTheme.transparent ? '13px' : '11px' }}
        >
          {itemTheme.theme_name}
        </Text>

        <Flex justify="flex-start" gap="3px" align="center">
          {itemTheme.transparent && (
            <Box
              className={classes.themeSwitcherDot_First}
              style={{ backgroundColor: itemTheme.bg }}
            />
          )}
          <Box className={classes.themeSwitcherDot} style={{ backgroundColor: itemTheme.fg }} />
          <Box
            className={classes.themeSwitcherDot}
            style={{ backgroundColor: itemTheme.keyword }}
          />
          <Box className={classes.themeSwitcherDot} style={{ backgroundColor: itemTheme.string }} />
          <Box
            className={classes.themeSwitcherDot}
            style={{ backgroundColor: itemTheme.function }}
          />
        </Flex>
      </Flex>
    </Paper>
  );
};

export default SelectThemeItem;