import React, { memo, useEffect, useState } from 'react';
import { Box, Collapse, ColorInput, Divider, Flex, Slider, Space, Switch, Text } from '@mantine/core';
import { MARKS_CORNER, MARKS_OFFSET, MARKS_OPACITY, ROUNDED_SWITCH_STYLES, SLIDER_STYLES } from '@/src/constants';
import { useStore } from '@/src/store';


const ControlBoxShadow = () => {

  const imageSettings = useStore((state) => state.imageSettings);
  const setSettings = useStore((state) => state.setSettings);

  const [blur, setBlur] = useState(imageSettings.shadowBlur);
  const [color, setColor] = useState(imageSettings.shadowColor);
  const [offsetX, setOffsetX] = useState(imageSettings.shadowOffset.x);
  const [offsetY, setOffsetY] = useState(imageSettings.shadowOffset.y);
  const [opacity, setOpacity] = useState(imageSettings.shadowOpacity);

  useEffect(() => setBlur(imageSettings.shadowBlur), [imageSettings.shadowBlur]);
  useEffect(() => setColor(imageSettings.shadowColor), [imageSettings.shadowColor]);
  useEffect(() => setOpacity(imageSettings.shadowOpacity), [imageSettings.shadowOpacity]);
  useEffect(() => setOffsetX(imageSettings.shadowOffset.x), [imageSettings.shadowOffset.x]);
  useEffect(() => setOffsetY(imageSettings.shadowOffset.y), [imageSettings.shadowOffset.y]);


  return (
    <>
      <Divider mb="xs" labelPosition="left" />
      <Flex gap="lg" justify="space-between" align="flex-end">
        <Box>
          <Switch
            size="lg"
            label="Box Shadow"
            labelPosition="left"
            onLabel="ON"
            offLabel="OFF"
            checked={imageSettings.showShadow}
            radius="sm"
            onChange={(event) => setSettings('image', 'showShadow', event.currentTarget.checked)}
            styles={ROUNDED_SWITCH_STYLES as any}
          />
        </Box>

        <Box style={{ flex: 1 }}>
          <ColorInput
            size="xs"
            disabled={!imageSettings.showShadow}
            label="Box Shadow color"
            placeholder="Shadow color"
            value={color}
            onChange={(value) => setColor(value)}
            onChangeEnd={(value) => setSettings('image', 'shadowColor', value)}
          />
        </Box>
      </Flex>
      <Space h="xs" />
      <Collapse in={imageSettings.showShadow}>
        <Text size="xs" fw={500} mb="6px">
          Box Shadow Blur
        </Text>
        <Slider
          disabled={!imageSettings.showShadow}
          value={blur}
          onChange={(value) => setBlur(value)}
          onChangeEnd={(value) => setSettings('image', 'shadowBlur', value)}
          min={0}
          max={50}
          step={1}
          size="sm"
          marks={MARKS_CORNER}
          styles={SLIDER_STYLES}
        />
        <Space h="md" />

        <Text size="xs" fw={500} mb="6px">
          Box Shadow Offset X
        </Text>
        <Slider
          disabled={!imageSettings.showShadow}
          value={offsetX}
          onChange={(value) => setOffsetX(value)}
          onChangeEnd={(value) =>
            setSettings('image', 'shadowOffset', { x: value, y: imageSettings.shadowOffset.y })
          }
          min={-25}
          max={25}
          step={1}
          size="sm"
          marks={MARKS_OFFSET}
          styles={SLIDER_STYLES}
        />
        <Space h="md" />

        <Text size="xs" fw={500} mb="6px">
          Box Shadow Offset Y
        </Text>
        <Slider
          disabled={!imageSettings.showShadow}
          value={offsetY}
          onChange={(value) => setOffsetY(value)}
          onChangeEnd={(value) =>
            setSettings('image', 'shadowOffset', { y: value, x: imageSettings.shadowOffset.x })
          }
          min={-25}
          max={25}
          step={1}
          size="sm"
          marks={MARKS_OFFSET}
          styles={SLIDER_STYLES}
        />
        <Space h="md" />
        <Text size="xs" fw={500} mb="6px">
          Box Shadow Opacity
        </Text>
        <Slider
          disabled={!imageSettings.showShadow}
          value={opacity}
          onChange={(value) => setOpacity(value)}
          onChangeEnd={(value) => setSettings('image', 'shadowOpacity', value )}
          min={0}
          max={100}
          step={1}
          size="sm"
          marks={MARKS_OPACITY}
          styles={SLIDER_STYLES}
        />
      </Collapse>
      <Space h="md" />
    </>
  );
};

export default memo(ControlBoxShadow);