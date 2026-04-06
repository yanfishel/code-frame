import React, { memo, useEffect, useRef, useState } from 'react';
import { Box, Divider, Flex, Input, Space, Switch, Text } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { useStore } from '@/src/store';


const ControlWatermark = () => {

  const debounceRef = useRef(false);

  const imageSettings = useStore((state) => state.imageSettings);
  const setSettings = useStore((state) => state.setSettings);
  const [text, setText] = useState('');

  const [debounced] = useDebouncedValue(text, 250);


  useEffect(() => {
    if (debounceRef.current) {
      setSettings('image', 'watermark', debounced);
      useStore.setState({ isReady: true });
    } else {
      debounceRef.current = true
    }
  }, [debounced]);

  useEffect(() => {
    setText(imageSettings.watermark);
  }, [imageSettings.watermark]);


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
          onChange={(e) => setText(e.target.value)}
          disabled={!imageSettings.showWatermark}
          style={{ width: '100%' }}
        />
      </Box>
    </>
  );
};

export default memo(ControlWatermark);