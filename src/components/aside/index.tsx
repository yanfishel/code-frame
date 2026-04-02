import React from 'react';
import clsx from 'clsx';
import { Overlay, Paper } from '@mantine/core';
import AsideHeader from '@/src/components/aside/aside-header';
import { useStore } from '@/src/store';
import CodeSettings from './code-settings';
import ImageSettings from './image-settings';
import classes from './aside.module.css';


const Aside = () => {

  const settingsOpened = useStore((state) => state.settingsOpened);

  return (
    <>
      <Paper className={clsx(classes.asideControl, settingsOpened && classes.asideControl_opened)}>
        <AsideHeader />
        <CodeSettings />
        <ImageSettings />
      </Paper>
      {settingsOpened && (
        <Overlay
          onClick={() => useStore.setState({ settingsOpened: false })}
          color="#000"
          backgroundOpacity={0.85}
        />
      )}
    </>
  );
}

export default Aside;