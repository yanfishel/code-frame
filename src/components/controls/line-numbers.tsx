import React, { memo, useCallback, useEffect, useState } from 'react';
import { Box, Flex, NumberInput, Switch } from '@mantine/core';
import { ROUNDED_SWITCH_STYLES } from '@/src/constants';
import { useStore } from '@/src/store';


const LineNumbers = () => {

  const [firstNumber, setFirstNumber] = useState<string | number>(1)

  const code = useStore((state) => state.code)
  const codeSettings = useStore((state) => state.codeSettings);
  const setSettings = useStore((state) => state.setSettings);

  const updateLineNumbers = useCallback(() => {
    const lineNumbers = new Array(code.split('\n').length)
      .fill('')
      .map((_, idx) => idx + +firstNumber)
      .join('\n');
    setSettings('code', 'lineNumbers', lineNumbers);
  }, [code])

  useEffect(() => {
    if (codeSettings.showNumbers) {
      updateLineNumbers();
    } else {
      setSettings('code', 'lineNumbers', '');
    }
  }, [codeSettings.showNumbers, firstNumber]);


  return (
    <Flex gap="md" align="flex-end">
      <Box style={{ flex: 1 }}>
        <Switch
          size="lg"
          label="Line numbers"
          labelPosition="left"
          onLabel="ON"
          offLabel="OFF"
          checked={codeSettings.showNumbers}
          radius="sm"
          onChange={(event) => setSettings('code','showNumbers', event.currentTarget.checked)}
          styles={ROUNDED_SWITCH_STYLES as any}
        />
      </Box>

      <Box style={{ flex: 1 }}>
        <NumberInput
          disabled={!codeSettings.showNumbers}
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

export default memo(LineNumbers);