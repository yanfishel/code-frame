import React, { memo } from 'react';
import { ChevronsUpDown } from 'lucide-react';
import { Box, Divider, Flex, Menu, Space, Text } from '@mantine/core';
import ControlWindowOpacity from '@/src/components/controls/control-window-opacity';
import SelectFrameGnome from '@/src/components/controls/frames/select-frame-gnome';
import SelectFrameNone from '@/src/components/controls/frames/select-frame-none';
import SelectFrameWindows from '@/src/components/controls/frames/select-frame-windows';
import { E_FRAME_STYLE } from '@/src/constants';
import { useStore } from '@/src/store';
import SelectFrameMacos from './frames/select-frame-macos';
import classes from './controls.module.css';


const SelectFrameStyle = () => {

  const imageSettings = useStore((state) => state.imageSettings);
  const setSettings = useStore((state) => state.setSettings);


  return (
    <>
      <Divider mb="xs" labelPosition="left" />
      <Text size="xs" fw={500} mb={3}>
        Window Style
      </Text>
      <Box className={classes.themeSwitcherWrapper}>
        <Menu id="frame-style-menu" shadow="md" position="bottom-end">
          <Menu.Target>
            <Flex
              aria-haspopup="menu"
              align="center"
              gap="sm"
              className={classes.themeSwitcherInput}
              style={{ paddingInlineStart: 'var(--mantine-spacing-sm)' }}
            >
              {imageSettings.frameStyle === E_FRAME_STYLE.NONE && <SelectFrameNone />}
              {imageSettings.frameStyle === E_FRAME_STYLE.MACOS && <SelectFrameMacos />}
              {imageSettings.frameStyle === E_FRAME_STYLE.WINDOWS && <SelectFrameWindows />}
              {imageSettings.frameStyle === E_FRAME_STYLE.GNOME && <SelectFrameGnome />}
              <ChevronsUpDown size={12} style={{ opacity: 0.35 }} />
            </Flex>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={() => setSettings('image', 'frameStyle', E_FRAME_STYLE.NONE)}>
              <SelectFrameNone />
            </Menu.Item>
            <Menu.Item onClick={() => setSettings('image', 'frameStyle', E_FRAME_STYLE.MACOS)}>
              <SelectFrameMacos />
            </Menu.Item>
            <Menu.Item onClick={() => setSettings('image', 'frameStyle', E_FRAME_STYLE.WINDOWS)}>
              <SelectFrameWindows />
            </Menu.Item>
            <Menu.Item onClick={() => setSettings('image', 'frameStyle', E_FRAME_STYLE.GNOME)}>
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

export default memo(SelectFrameStyle);