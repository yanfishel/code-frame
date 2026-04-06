import React, { memo, useEffect, useState } from 'react';
import { Divider, Slider, Space, Text } from '@mantine/core';
import { SLIDER_STYLES } from '@/src/constants';
import { MARKS, MARKS_CORNER } from '@/src/constants/image';
import { useStore } from '@/src/store';


const ControlPaddings = () => {

  const imageSettings = useStore((state) => state.imageSettings);
  const setSettings = useStore((state) => state.setSettings);

  const [inner, setInner] = useState(imageSettings.innerPadding)
  const [outer, setOuter] = useState(imageSettings.outerPadding)
  const [corner, setCorner] = useState(imageSettings.cornerRadius)

  useEffect(() => {
    setInner(imageSettings.innerPadding);
  }, [imageSettings.innerPadding]);

  useEffect(() => {
    setOuter(imageSettings.outerPadding);
  }, [imageSettings.outerPadding]);

  useEffect(()=>{
    setCorner(imageSettings.cornerRadius);
  }, [imageSettings.cornerRadius])


  return (
    <>
      <Divider mb="xs" labelPosition="left" />
      <Text size="xs" fw={500} mb="4px">
        Inner Padding
      </Text>
      <Slider
        value={inner}
        onChange={(value) => setInner(value)}
        onChangeEnd={(value) => setSettings('image', 'innerPadding', value)}
        min={10}
        max={100}
        step={1}
        size="sm"
        marks={MARKS}
        styles={SLIDER_STYLES}
      />
      <Space h="md" />
      <Text size="xs" fw={500} mb="4px">
        Outer Padding
      </Text>
      <Slider
        value={outer}
        onChange={(value) => setOuter(value)}
        onChangeEnd={(value) => setSettings('image', 'outerPadding', value)}
        min={10}
        max={100}
        step={1}
        size="sm"
        marks={MARKS}
        styles={SLIDER_STYLES}
      />
      <Space h="md" />
      <Text size="xs" fw={500} mb="4px">
        Corner Radius
      </Text>
      <Slider
        value={corner}
        onChange={(value) => setCorner(value)}
        onChangeEnd={(value) => setSettings('image', 'cornerRadius', value)}
        min={0}
        max={50}
        step={1}
        size="sm"
        marks={MARKS_CORNER}
        styles={SLIDER_STYLES}
      />
      <Space h="md" />
    </>
  );
};

export default memo(ControlPaddings);