import React, { useEffect, useState } from 'react';
import { AngleSlider, CheckIcon, ColorInput, ColorSwatch, Flex, Text } from '@mantine/core';
import { ANGLE_MARKS, ANGLE_STYLES, COLOR_INPUT_STYLES, COLOR_SWATCH_STYLES, GRADIENTS } from '@/src/constants';
import { useStore } from '@/src/store';


const GradientPanel = () => {

  const gradient = useStore((state) => state.gradient)

  const [color1, setColor1] = useState<string>(`${gradient[0]}`);
  const [color2, setColor2] = useState<string>(`${gradient[1]}`);
  const [angle, setAngle] = useState<number>(Number(gradient[2]));


  useEffect(() => {
    setAngle(Number(gradient[2]));
  }, [gradient[0], gradient[1]]);

  useEffect(() => {
    setColor1(`${gradient[0]}`);
  }, [gradient[1], gradient[2]]);

  useEffect(() => {
    setColor2(`${gradient[1]}`);
  }, [gradient[0], gradient[2]]);


  return (
    <>
      <Flex direction="column" gap="sm">
        <Flex flex={1} justify="flex-start" gap="2px">
          {GRADIENTS.map((grad, idx) => (
            <ColorSwatch
              key={idx}
              component="button"
              size="22px"
              color={grad[0].toString()}
              onClick={() => useStore.setState({ gradient: grad })}
              styles={{
                ...COLOR_SWATCH_STYLES,
                colorOverlay: {
                  ...COLOR_SWATCH_STYLES.colorOverlay,
                  background: `linear-gradient(${grad[2]}deg, ${grad[0]}, ${grad[1]})`,
                },
              }}
            >
              {gradient[0] === grad[0] && gradient[1] === grad[1] && gradient[2] === grad[2] && (
                <CheckIcon
                  size={10}
                  style={{
                    color: 'rgba(255, 255, 255, 0.85)',
                  }}
                />
              )}
            </ColorSwatch>
          ))}
        </Flex>

        <Flex display="flex" gap="md">
          <Flex flex={1} direction="column" gap="xs">
            <ColorInput
              size="xs"
              label="First Color"
              placeholder="First color"
              value={color1}
              onChange={(value) => setColor1(value)}
              onChangeEnd={(value) =>
                useStore.setState(({ gradient }) => ({
                  gradient: [value, gradient[1], gradient[2]],
                }))
              }
              styles={COLOR_INPUT_STYLES as any}
            />
            <ColorInput
              size="xs"
              label="Second Color"
              placeholder="Second color"
              value={color2}
              onChange={(value) => setColor2(value)}
              onChangeEnd={(value) =>
                useStore.setState(({ gradient }) => ({
                  gradient: [gradient[0], value, gradient[2]],
                }))
              }
              styles={COLOR_INPUT_STYLES as any}
            />
          </Flex>
          <Flex flex={1} direction="column" align="center" justify="flex-start" gap="16px">
            <Text fw={500} style={{ fontSize: '12px', lineHeight: '1.3' }}>
              Gradient Angle
            </Text>
            <AngleSlider
              aria-label="Angle slider"
              formatLabel={(value) => `${value}°`}
              size={66}
              marks={ANGLE_MARKS}
              value={angle}
              onChange={(value) => setAngle(value)}
              onChangeEnd={(value) =>
                useStore.setState(({ gradient }) => ({
                  gradient: [gradient[0], gradient[1], value],
                }))
              }
              styles={ANGLE_STYLES}
            />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default GradientPanel;