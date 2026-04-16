import React, { memo, useState } from 'react';
import { FloatingIndicator, Space, Tabs, Text } from '@mantine/core';
import ColorSolidPanel from '@/src/components/controls/tab-panels/color-solid-panel';
import GradientPanel from '@/src/components/controls/tab-panels/gradient-panel';
import TransparentPanel from '@/src/components/controls/tab-panels/transparent-panel';
import { useStore } from '@/src/store';
import classes from './controls.module.css';
import { E_BACKGROUND_TYPE } from '@/src/constants';


const ControlBackground = () => {

  const imageSettings = useStore((state) => state.imageSettings);
  const setSettings = useStore((state) => state.setSettings);

  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({})


  const setControlRef = (val: string) => (node: HTMLButtonElement) => {
    controlsRefs[val] = node;
    setControlsRefs(controlsRefs);
  }


  return (
    <>
      <Text fw={500} mb="10px" style={{ fontSize: '12px', lineHeight: '1.5' }}>
        Background
      </Text>
      <Tabs
        variant="none"
        value={imageSettings.backgroundType}
        onChange={(type) => setSettings('image', 'backgroundType', type ?? E_BACKGROUND_TYPE.NONE)}
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
            target={imageSettings.backgroundType ? controlsRefs[imageSettings.backgroundType] : null}
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
        <Tabs.Panel value="none">
          <TransparentPanel />
        </Tabs.Panel>
      </Tabs>
      <Space h="sm" />
    </>
  );
}

export default memo(ControlBackground);