import React from 'react';
import { SettingsIcon } from 'lucide-react';
import { Flex } from '@mantine/core';
import CollapsePanel from '@/src/components/aside/collapse-panel';
import ControlBackground from '@/src/components/controls/control-background';
import ControlBoxShadow from '@/src/components/controls/control-box-shadow';
import ControlPaddings from '@/src/components/controls/control-paddings';
import ControlWindowOpacity from '@/src/components/controls/control-window-opacity';
import SelectFrameStyle from '@/src/components/controls/select-frame-style';


const ImageSettings = () => {


  return (
    <CollapsePanel isOpen title="Image settings" icon={<SettingsIcon size={14} />}>
      <Flex
        direction="column"
        gap="5px"
        style={{ padding: '8px 15px 50px 25px' }}
      >
        <ControlPaddings />
        <SelectFrameStyle />
        <ControlWindowOpacity />
        <ControlBackground />
        <ControlBoxShadow />
      </Flex>
    </CollapsePanel>
  );
};

export default ImageSettings;