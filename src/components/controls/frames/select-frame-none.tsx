import React from 'react';
import { Flex, Text } from '@mantine/core';
import classes from '../controls.module.css';


const SelectFrameNone = () => {

  return (
    <Flex align="center" gap="md" justify="space-between" className={classes.frameStyleItem}>
      <Text size="xs">None</Text>
    </Flex>
  );
};

export default SelectFrameNone;