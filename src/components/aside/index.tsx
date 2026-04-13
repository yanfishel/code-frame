import React from 'react';
import clsx from 'clsx';
import { Overlay, Paper } from '@mantine/core';
import { useStore } from '@/src/store';
import AsideHeader from './aside-header';
import CodeSettings from './code-settings';
import ImageSettings from './image-settings';
import SnippetSettings from './snippet-settings';
import classes from './aside.module.css';


const Aside = () => {

  const settingsOpened = useStore((state) => state.settingsOpened);
  const editableSnippet = useStore((state) => state.editableSnippet);

  return (
    <>
      <Paper className={clsx(classes.asideControl, settingsOpened && classes.asideControl_opened)}>
        <AsideHeader />
        {editableSnippet && <SnippetSettings /> }
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