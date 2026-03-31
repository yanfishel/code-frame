import React from 'react';
import { Box, Flex, Text } from '@mantine/core';
import classes from '../controls.module.css';


const SelectFrameGnome = () => {

  return (
    <Flex align="center" gap="md" justify="space-between" className={classes.frameStyleItem}>
      <Text size="xs">Gnome</Text>
      <Flex className={classes.frameStyleGnomePreview}>
        <Box className={classes.frameStyle_Dot} />
        <Box className={classes.frameStyle_Dot} />
        <Box style={{ flex: 1 }} />
        <Box className={classes.frameStyle_Dot} style={{ backgroundColor: '#c42b1c',width: '10px', height: '10px' }}>
          ✕
        </Box>
      </Flex>
    </Flex>
  );
};

export default SelectFrameGnome;