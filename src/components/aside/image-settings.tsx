import React from 'react';
import { SettingsIcon } from 'lucide-react';
import { Flex } from '@mantine/core';
import CollapsePanel from '@/src/components/aside/collapse-panel';
import SelectFrameStyle from '@/src/components/controls/select-frame-style';
import ControlPaddings from '@/src/components/controls/control-paddings';
import ControlWindowOpacity from '@/src/components/controls/control-window-opacity';
import ControlBoxShadow from '@/src/components/controls/control-box-shadow';


const ImageSettings = () => {


  return (
    <CollapsePanel isOpen title="Image settings" icon={<SettingsIcon size={14} />}>
      <Flex direction="column" gap="5px" p="md" pt="xs" pb="md">
        <ControlPaddings />
        <SelectFrameStyle />
        <ControlWindowOpacity />
        <ControlBoxShadow />
      </Flex>
    </CollapsePanel>
  );
};

export default ImageSettings;