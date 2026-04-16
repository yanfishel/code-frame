import React, { memo } from 'react';
import { RotateCcwIcon, SettingsIcon } from 'lucide-react';
import { Button, Divider, Flex, Text, useMantineTheme } from '@mantine/core';
import CollapsePanel from '@/src/components/aside/collapse-panel';
import ControlBackground from '@/src/components/controls/control-background';
import ControlBoxShadow from '@/src/components/controls/control-box-shadow';
import ControlPaddings from '@/src/components/controls/control-paddings';
import ControlWatermark from '@/src/components/controls/control-watermark';
import SelectFrameStyle from '@/src/components/controls/select-frame-style';
import { useStore } from '@/src/store';


const ImageSettings = () => {

  const theme = useMantineTheme();
  const resetImageSettings = useStore((state) => state.resetImageSettings);


  return (
    <CollapsePanel isOpen title="Image settings" icon={<SettingsIcon size={14} />}>
      <Flex
        direction="column"
        gap="5px"
        style={{ padding: '12px var(--mantine-spacing-lg) var(--mantine-spacing-md)' }}
      >
        <ControlBackground />
        <SelectFrameStyle />

        <ControlPaddings />
        <ControlBoxShadow />
        <ControlWatermark />

        <Divider my="sm" labelPosition="left" />

        <Flex justify="center" mb={10}>
          <Button
            variant="default"
            size="xs"
            leftSection={<RotateCcwIcon size={12} style={{ color: theme.colors.red[6] }} />}
            onClick={resetImageSettings}
          >
            <Text size="0.7rem">Reset Image Settings</Text>
          </Button>
        </Flex>
      </Flex>
    </CollapsePanel>
  );
};

export default memo(ImageSettings);