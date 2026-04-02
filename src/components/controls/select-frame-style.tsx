import React from 'react';
import { ChevronsUpDown } from 'lucide-react';
import { Box, Divider, Flex, Menu, Space, Text } from '@mantine/core';
import ControlWindowOpacity from '@/src/components/controls/control-window-opacity';
import SelectFrameGnome from '@/src/components/controls/frames/select-frame-gnome';
import SelectFrameNone from '@/src/components/controls/frames/select-frame-none';
import SelectFrameWindows from '@/src/components/controls/frames/select-frame-windows';
import { useStore } from '@/src/store';
import SelectFrameMacos from './frames/select-frame-macos';
import classes from './controls.module.css';


const SelectFrameStyle = () => {

  const frameStyle = useStore((state) => state.frameStyle);

  return (
    <>
      <Divider mb="xs" labelPosition="left" />
      <Text size="xs" fw={500} mb={3}>
        Window Style
      </Text>
      <Box className={classes.themeSwitcherWrapper}>
        <Menu shadow="md" position="bottom-end">
          <Menu.Target>
            <Flex
              align="center"
              gap="sm"
              className={classes.themeSwitcherInput}
              style={{ paddingInlineStart: 'var(--mantine-spacing-sm)' }}
            >
              {frameStyle === 'none' && <SelectFrameNone />}
              {frameStyle === 'macos' && <SelectFrameMacos />}
              {frameStyle === 'windows' && <SelectFrameWindows />}
              {frameStyle === 'gnome' && <SelectFrameGnome />}

              <ChevronsUpDown size={12} style={{ opacity: 0.35 }} />
            </Flex>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={() => useStore.setState({ frameStyle: 'none' })}>
              <SelectFrameNone />
            </Menu.Item>
            <Menu.Item onClick={() => useStore.setState({ frameStyle: 'macos' })}>
              <SelectFrameMacos />
            </Menu.Item>
            <Menu.Item onClick={() => useStore.setState({ frameStyle: 'windows' })}>
              <SelectFrameWindows />
            </Menu.Item>
            <Menu.Item onClick={() => useStore.setState({ frameStyle: 'gnome' })}>
              <SelectFrameGnome />
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Box>

      <Space h="xs" />

      <ControlWindowOpacity />
    </>
  );
};

export default SelectFrameStyle;