import React, { useState } from 'react';
import { Slider, Space, Text } from '@mantine/core';
import { SLIDER_STYLES } from '@/src/constants';
import { MARKS_OPACITY } from '@/src/constants/image';
import { useStore } from '@/src/store';


const ControlWindowOpacity = () => {

  const imageSettings = useStore((state) => state.imageSettings);
  const setSettings = useStore((state) => state.setSettings);

  const [opacity, setOpacity] = useState(imageSettings.windowOpacity);


  return (
    <>
      <Text size="xs" fw={500} mb="4px">
        Window Opacity
      </Text>
      <Slider
        value={opacity}
        onChange={(value) => setOpacity(value)}
        onChangeEnd={(value) => setSettings('image', 'windowOpacity', value )}
        min={0}
        max={100}
        step={1}
        size="sm"
        marks={MARKS_OPACITY}
        styles={SLIDER_STYLES}
      />
      <Space h="md" />
    </>
  );
};

export default ControlWindowOpacity;