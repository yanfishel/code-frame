import React from 'react';
import { Box } from '@mantine/core';
import CodeSettings from './code-settings';
import ImageSettings from './image-settings';
import classes from './aside.module.css';


const Aside = () => {

  return (
    <Box className={classes.asideControl}>
      <CodeSettings />
      <ImageSettings />
    </Box>
  );
}

export default Aside;