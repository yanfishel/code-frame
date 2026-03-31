import React, { useEffect, useState } from 'react';
import { Box, Collapse, ColorInput, Flex, Slider, Switch, Text } from '@mantine/core';
import { DEFAULT_SHADOW_COLOR, MARKS_CORNER, MARKS_OFFSET, ROUNDED_SWITCH_STYLES, SLIDER_STYLES } from '@/src/constants';
import { useStore } from '@/src/store';


const ControlBoxShadow = () => {

  const showShadow = useStore((state) => state.showShadow)
  const shadowBlur = useStore((state) => state.shadowBlur)
  const shadowColor = useStore((state) => state.shadowColor)
  const shadowOffset = useStore((state) => state.shadowOffset)

  const [blur, setBlur] = useState(shadowBlur)
  const [offsetX, setOffsetX] = useState(shadowOffset.x);
  const [offsetY, setOffsetY] = useState(shadowOffset.y);


  useEffect(() => {
      useStore.setState({ shadowColor: showShadow ? DEFAULT_SHADOW_COLOR : '' });
  }, [showShadow]);


  return (
    <>
      <Flex gap="lg" justify="space-between" align="flex-end" mb="sm">
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
            value={shadowColor}
            onChange={(value) => useStore.setState({ shadowColor: value })}
          />
        </Box>
      </Flex>
      <Collapse in={showShadow}>
        <Box mb="lg">
          <Text size="xs" fw={500} mb="6px" style={{ opacity: showShadow ? 1 : 0.5 }}>
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
        </Box>
        <Box mb="lg">
          <Text size="xs" fw={500} mb="4px" style={{ opacity: showShadow ? 1 : 0.5 }}>
            Shadow Blur Offset X
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
        </Box>
        <Box mb="md">
          <Text size="xs" fw={500} mb="4px" style={{ opacity: showShadow ? 1 : 0.5 }}>
            Shadow Blur Offset Y
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
        </Box>
      </Collapse>
    </>
  );
}

export default ControlBoxShadow;