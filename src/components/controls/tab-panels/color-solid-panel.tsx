import React from 'react';
import { Box, CheckIcon, ColorInput, ColorSwatch, Flex } from '@mantine/core';
import { COLOR_INPUT_STYLES, COLOR_SWATCH_STYLES, SOLID_COLORS } from '@/src/constants';
import { useStore } from '@/src/store';
import { isDark } from '@/src/util';


const ColorSolidPanel = () => {

  const backgroundSolid = useStore((state) => state.backgroundSolid)


  return (
    <>
      <Flex align="flex-start" justify="space-between" gap="md" >
        <Flex flex={1} direction="column" gap="3px">
          {SOLID_COLORS.map((row, idx) => {
            return (
              <Flex key={idx} flex={1} gap="3px">
                {row.map((color, idx) => (
                  <ColorSwatch
                    key={`${color}_${idx}`}
                    area-label={`Color swatch ${color}`}
                    size="22px"
                    color={color}
                    onClick={() => useStore.setState({ backgroundSolid: color })}
                    styles={COLOR_SWATCH_STYLES}
                  >
                    {backgroundSolid === color && (
                      <CheckIcon
                        size={10}
                        style={{
                          color: isDark(color)
                            ? 'rgba(255, 255, 255, 0.85)'
                            : 'rgba(0, 0, 0, 0.85)',
                        }}
                      />
                    )}
                  </ColorSwatch>
                ))}
              </Flex>
            );
          })}
        </Flex>

        <Box>
          <ColorInput
            size="xs"
            label="Color"
            placeholder="Background color"
            value={backgroundSolid}
            onChange={(value) => useStore.setState({ backgroundSolid: value })}
            styles={COLOR_INPUT_STYLES as any}
          />
        </Box>
      </Flex>
    </>
  );
};

export default ColorSolidPanel;