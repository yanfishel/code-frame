import React, { useState } from 'react';
import { Box, Slider, Text } from '@mantine/core';
import { SLIDER_STYLES } from '@/src/constants';
import { MARKS, MARKS_CORNER } from '@/src/constants/image';
import { useStore } from '@/src/store';


const ControlPaddings = () => {

  const innerPadding = useStore((state) => state.innerPadding);
  const outerPadding = useStore((state) => state.outerPadding);
  const cornerRadius = useStore((state) => state.cornerRadius);

  const [inner, setInner] = useState(innerPadding)
  const [outer, setOuter] = useState(outerPadding)
  const [corner, setCorner] = useState(cornerRadius)


  return (
    <Box mb="lg" mt="xs">
      <Text size="xs" fw={500} mb="4px">
        Inner Padding
      </Text>
      <Slider
        value={inner}
        onChange={(value) => setInner(value)}
        onChangeEnd={(value) => useStore.setState({ innerPadding: value })}
        min={10}
        max={100}
        step={1}
        size="sm"
        marks={MARKS}
        styles={SLIDER_STYLES}
      />
      <Box h="md" />
      <Text size="xs" fw={500} mb="4px">
        Outer Padding
      </Text>
      <Slider
        value={outer}
        onChange={(value) => setOuter(value)}
        onChangeEnd={(value) => useStore.setState({ outerPadding: value })}
        min={10}
        max={100}
        step={1}
        size="sm"
        marks={MARKS}
        styles={SLIDER_STYLES}
      />
      <Box h="md" />
      <Text size="xs" fw={500} mb="4px">
        Corner Radius
      </Text>
      <Slider
        value={corner}
        onChange={(value) => setCorner(value)}
        onChangeEnd={(value) => useStore.setState({ cornerRadius: value })}
        min={0}
        max={50}
        step={1}
        size="sm"
        marks={MARKS_CORNER}
        styles={SLIDER_STYLES}
      />
    </Box>
  );
};

export default ControlPaddings;