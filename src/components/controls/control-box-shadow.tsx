import React, { useEffect, useState } from 'react';
import { Box, Collapse, ColorInput, Divider, Flex, Slider, Space, Switch, Text } from '@mantine/core';
import { DEFAULT_SHADOW_COLOR, MARKS_CORNER, MARKS_OFFSET, MARKS_OPACITY, ROUNDED_SWITCH_STYLES, SLIDER_STYLES } from '@/src/constants';
import { useStore } from '@/src/store';


const ControlBoxShadow = () => {
  const showShadow = useStore((state) => state.showShadow);
  const shadowBlur = useStore((state) => state.shadowBlur);
  const shadowColor = useStore((state) => state.shadowColor);
  const shadowOffset = useStore((state) => state.shadowOffset);
  const shadowOpacity = useStore((state) => state.shadowOpacity);

  const [blur, setBlur] = useState(shadowBlur);
  const [color, setColor] = useState(shadowColor);
  const [offsetX, setOffsetX] = useState(shadowOffset.x);
  const [offsetY, setOffsetY] = useState(shadowOffset.y);
  const [opacity, setOpacity] = useState(shadowOpacity);

  useEffect(() => {
    setColor(showShadow ? DEFAULT_SHADOW_COLOR : '');
    useStore.setState({ shadowColor: showShadow ? DEFAULT_SHADOW_COLOR : '' });
  }, [showShadow]);

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
            checked={showShadow}
            radius="sm"
            onChange={(event) => useStore.setState({ showShadow: event.currentTarget.checked })}
            styles={ROUNDED_SWITCH_STYLES as any}
          />
        </Box>

        <Box style={{ flex: 1 }}>
          <ColorInput
            size="xs"
            disabled={!showShadow}
            label="Box Shadow color"
            placeholder="Shadow color"
            value={color}
            onChange={(value) => setColor(value)}
            onChangeEnd={(value) => useStore.setState({ shadowColor: value })}
          />
        </Box>
      </Flex>
      <Space h="xs" />
      <Collapse in={showShadow}>
        <Text size="xs" fw={500} mb="6px">
          Box Shadow Blur
        </Text>
        <Slider
          disabled={!showShadow}
          value={blur}
          onChange={(value) => setBlur(value)}
          onChangeEnd={(value) => useStore.setState({ shadowBlur: value })}
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
          disabled={!showShadow}
          value={offsetX}
          onChange={(value) => setOffsetX(value)}
          onChangeEnd={(value) =>
            useStore.setState((state) => ({
              shadowOffset: { x: value, y: state.shadowOffset.y },
            }))
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
          disabled={!showShadow}
          value={offsetY}
          onChange={(value) => setOffsetY(value)}
          onChangeEnd={(value) =>
            useStore.setState((state) => ({
              shadowOffset: { y: value, x: state.shadowOffset.x },
            }))
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
          disabled={!showShadow}
          value={opacity}
          onChange={(value) => setOpacity(value)}
          onChangeEnd={(value) => useStore.setState({ shadowOpacity: value })}
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

export default ControlBoxShadow;