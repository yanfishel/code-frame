import React from 'react';
import { Box, Flex, Text } from '@mantine/core';
import classes from '../controls.module.css';


const SelectFrameMacos = () => {

  return (
    <Flex align="center" gap="md" justify="space-between" className={classes.frameStyleItem}>
      <Text size="xs">
        MacOS
      </Text>
      <Flex className={classes.frameStyleMacosPreview}>
        <Box className={classes.frameStyle_Dot} style={{ backgroundColor: '#ff5f57' }} />
        <Box className={classes.frameStyle_Dot} style={{ backgroundColor: '#febc2e' }} />
        <Box className={classes.frameStyle_Dot} style={{ backgroundColor: '#28c840' }} />
      </Flex>
    </Flex>
  );
};

export default SelectFrameMacos;