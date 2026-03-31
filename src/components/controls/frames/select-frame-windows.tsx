import React from 'react';
import { Box, Flex, Text } from '@mantine/core';
import classes from '../controls.module.css';


const SelectFrameWindows = () => {

  return (
    <Flex align="center" gap="md" justify="space-between" className={classes.frameStyleItem}>
      <Text size="xs">Windows</Text>
      <Flex className={classes.frameStyleWindowsPreview}>
        <Box className={classes.frameStyle_Button}>
          —
        </Box>
        <Box className={classes.frameStyle_Button}>
          □
        </Box>
        <Box className={classes.frameStyle_Button} style={{ backgroundColor: '#c42b1c' }}>
          ✕
        </Box>
      </Flex>
    </Flex>
  );
};

export default SelectFrameWindows;