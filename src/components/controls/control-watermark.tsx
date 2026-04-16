import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Box, Divider, Flex, Input, Space, Switch, Text } from '@mantine/core';
import { useStore } from '@/src/store';


const ControlWatermark = () => {

  const imageSettings = useStore((state) => state.imageSettings);
  const setSettings = useStore((state) => state.setSettings);
  const [text, setText] = useState(imageSettings.watermark);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);


  const handleTextChange = useCallback((value: string) => {
    setText(value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      setSettings('image', 'watermark', value);
    }, 500);
  }, [setSettings]);


  useEffect(() => {
    setText(imageSettings.watermark);
  }, [imageSettings.watermark]);

  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);


  return (
    <>
      <Divider mb="xs" labelPosition="left" />
      <Flex gap="lg" justify="space-between" align="flex-start">
        <Box style={{ flex: 1 }}>
          <Text size="xs" fw="500">
            Watermark
          </Text>
        </Box>
        <Box>
          <Switch
            size="md"
            labelPosition="left"
            onLabel="ON"
            offLabel="OFF"
            checked={imageSettings.showWatermark}
            radius="sm"
            onChange={(event) => setSettings('image', 'showWatermark', event.currentTarget.checked)}
          />
        </Box>
      </Flex>
      <Space h="1px" />
      <Box>
        <Input
          size="xs"
          placeholder="Watermark text"
          value={text}
          onChange={(e) => handleTextChange(e.target.value)}
          disabled={!imageSettings.showWatermark}
          style={{ width: '100%' }}
        />
      </Box>
    </>
  );
};

export default memo(ControlWatermark);