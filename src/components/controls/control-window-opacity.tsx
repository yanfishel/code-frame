import React, { useEffect, useState } from 'react';
import { Box, Divider, Slider, Space, Text } from '@mantine/core';
import { SLIDER_STYLES } from '@/src/constants';
import { MARKS_OPACITY } from '@/src/constants/image';
import { useStore } from '@/src/store';


const ControlWindowOpacity = () => {

  const windowOpacity = useStore((state) => state.windowOpacity);

  const [opacity, setOpacity] = useState(windowOpacity);

  useEffect(() => {
    setOpacity(windowOpacity);
  }, [windowOpacity]);


  return (
    <>
      <Text size="xs" fw={500} mb="4px">
        Window Opacity
      </Text>
      <Slider
        value={opacity}
        onChange={(value) => setOpacity(value)}
        onChangeEnd={(value) => useStore.setState({ windowOpacity: value })}
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