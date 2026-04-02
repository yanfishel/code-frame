import React from 'react';
import { SlidersHorizontalIcon } from 'lucide-react';
import { Box, Flex } from '@mantine/core';
import LineNumbers from '@/src/components/controls/line-numbers';
import SelectFontFamily from '@/src/components/controls/select-font-family';
import SelectFontSize from '@/src/components/controls/select-font-size';
import SelectLanguage from '@/src/components/controls/select-language';
import SelectLineHeight from '@/src/components/controls/select-line-height';
import SelectTheme from '@/src/components/controls/select-theme';
import CollapsePanel from './collapse-panel';


const CodeSettings = () => {


  return (
    <CollapsePanel isOpen title="Code settings"
                   icon={<SlidersHorizontalIcon
                   size={14} />}>
      <Flex direction="column" gap="5px" style={{ padding: '8px 15px 20px 25px' }}>
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
      </Flex>
    </CollapsePanel>
  );
};

export default CodeSettings;