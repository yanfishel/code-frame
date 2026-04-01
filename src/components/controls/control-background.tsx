import React, { useState } from 'react';
import { Box, CheckIcon, ColorInput, ColorSwatch, Flex, FloatingIndicator, Tabs, Text } from '@mantine/core';
import { useStore } from '@/src/store';
import classes from './controls.module.css';
import ColorSolidPanel from '@/src/components/controls/tab-panels/color-solid-panel';
import GradientPanel from '@/src/components/controls/tab-panels/gradient-panel';


const ControlBackground = () => {

  const backgroundType = useStore((state) => state.backgroundType)
  const backgroundSolid = useStore((state) => state.backgroundSolid)

  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({})


  const setControlRef = (val: string) => (node: HTMLButtonElement) => {
    controlsRefs[val] = node;
    setControlsRefs(controlsRefs);
  }


  return (
    <>
      <Box >
        <Text fw={500} mb="10px" style={{ fontSize: '12px', lineHeight: '1.5' }}>
          Background
        </Text>
        <Tabs
          variant="none"
          value={backgroundType}
          onChange={(type) => useStore.setState({ backgroundType: type ?? ('none' as any) })}
        >
          <Tabs.List ref={setRootRef} className={classes.list}>
            <Tabs.Tab value="solid" ref={setControlRef('solid')} className={classes.tab}>
              Solid Color
            </Tabs.Tab>
            <Tabs.Tab value="gradient" ref={setControlRef('gradient')} className={classes.tab}>
              Gradient
            </Tabs.Tab>
            <Tabs.Tab value="none" ref={setControlRef('none')} className={classes.tab}>
              Transparent
            </Tabs.Tab>

            <FloatingIndicator
              target={backgroundType ? controlsRefs[backgroundType] : null}
              parent={rootRef}
              className={classes.indicator}
            />
          </Tabs.List>

          <Tabs.Panel value="solid">
            <ColorSolidPanel />
          </Tabs.Panel>
          <Tabs.Panel value="gradient">
            <GradientPanel />
          </Tabs.Panel>
        </Tabs>
      </Box>
    </>
  );
};

export default ControlBackground;