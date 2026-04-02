import React, { useEffect, useState } from 'react';
import { Box, Divider, Flex, Input, Space, Switch, Text } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { DEFAULT_WATERMARK } from '@/src/constants';
import { useStore } from '@/src/store';


const ControlWatermark = () => {

  const watermark = useStore((state) => state.watermark);

  const [text, setText] = useState(watermark);
  const [showWatermark, setShowWatermark] = useState(true);

  const [debounced] = useDebouncedValue(text, 250);


  useEffect(() => {
    setText(showWatermark ? DEFAULT_WATERMARK : '')
  }, [showWatermark]);

  useEffect(() => {
    useStore.setState({ watermark: debounced });
  }, [debounced]);


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
            checked={showWatermark}
            radius="sm"
            onChange={(event) => setShowWatermark(event.currentTarget.checked)}
          />
        </Box>
      </Flex>
      <Box py="xs">
        <Input size="xs" placeholder="Watermark text" value={text} onChange={(e) => setText(e.target.value)} disabled={!showWatermark} style={{ width: '100%' }} />
      </Box>
      <Space h="md" />
    </>
  );
};

export default ControlWatermark;