import React, { memo } from 'react';
import { RotateCcwIcon, SlidersHorizontalIcon } from 'lucide-react';
import { Box, Button, Divider, Flex, Text, useMantineTheme } from '@mantine/core';
import LineNumbers from '@/src/components/controls/line-numbers';
import SelectFontFamily from '@/src/components/controls/select-font-family';
import SelectFontSize from '@/src/components/controls/select-font-size';
import SelectLanguage from '@/src/components/controls/select-language';
import SelectLineHeight from '@/src/components/controls/select-line-height';
import SelectTheme from '@/src/components/controls/select-theme';
import { useStore } from '@/src/store';
import CollapsePanel from './collapse-panel';


const CodeSettings = () => {

  const theme = useMantineTheme()
  const resetCodeSettings = useStore((state) => state.resetCodeSettings)


  return (
    <CollapsePanel isOpen title="Code settings" icon={<SlidersHorizontalIcon size={14} />}>
      <Flex
        direction="column"
        gap="5px"
        style={{ padding: '8px var(--mantine-spacing-lg) var(--mantine-spacing-md)' }}
      >
        <SelectLanguage />
        <SelectTheme />
        <SelectFontFamily />
        <Flex gap="xs">
          <Box style={{ flex: 1 }}>
            <SelectFontSize />
          </Box>
          <Box style={{ flex: 1 }}>
            <SelectLineHeight />
          </Box>
        </Flex>
        <LineNumbers />

        <Divider my="sm" labelPosition="left" />

        <Flex justify="center">
          <Button
            variant="default"
            size="xs"
            leftSection={<RotateCcwIcon size={12} style={{ color: theme.colors.red[6] }} />}
            onClick={resetCodeSettings}
          >
            <Text size="0.7rem">Reset Code Settings</Text>
          </Button>
        </Flex>
      </Flex>
    </CollapsePanel>
  );
};

export default memo(CodeSettings);