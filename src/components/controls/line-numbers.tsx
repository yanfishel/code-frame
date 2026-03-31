import React, { useEffect, useState } from 'react';
import { Box, Flex, NumberInput, Switch } from '@mantine/core';
import { ROUNDED_SWITCH_STYLES } from '@/src/constants';
import { useStore } from '@/src/store';


const LineNumbers = () => {

  const [firstNumber, setFirstNumber] = useState<string | number>(1)

  const code = useStore((state) => state.code)
  const showNumbers = useStore((state) => state.showNumbers)

  useEffect(() => {
    if (showNumbers) {
      const lineNumbers = new Array(code.split('\n').length)
        .fill('')
        .map((_, idx) => idx + +firstNumber)
        .join('\n');
      useStore.setState({ lineNumbers });
    } else {
      useStore.setState({ lineNumbers: '' });
    }
  }, [code, showNumbers, firstNumber]);


  return (
    <Flex gap="md" align="flex-end">
      <Box style={{ flex: 1 }}>
        <Switch
          size="lg"
          label="Line numbers"
          labelPosition="left"
          onLabel="ON"
          offLabel="OFF"
          checked={showNumbers}
          radius="sm"
          onChange={(event) => useStore.setState({ showNumbers: event.currentTarget.checked })}
          styles={ROUNDED_SWITCH_STYLES as any}
        />
      </Box>

      <Box style={{ flex: 1 }}>
        <NumberInput
          disabled={!showNumbers}
          value={firstNumber}
          onChange={(value) => setFirstNumber(value)}
          label="First line"
          clampBehavior="strict"
          min={1}
          size="xs"
        />
      </Box>
    </Flex>
  );
}

export default LineNumbers;