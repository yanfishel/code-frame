import React from 'react';
import { Box, CloseButton, Flex } from '@mantine/core';
import classes from './aside.module.css';
import { SettingsIcon } from 'lucide-react';
import { useStore } from '@/src/store';


const AsideHeader = () => {

  return (
    <Box className={classes.asideHeader}>
      <Flex align="center" gap="xs">
       <SettingsIcon size={14} />
       Settings
      </Flex>
      <CloseButton aria-label="Close modal" className={classes.asideCloseButton} onClick={() => useStore.setState({ settingsOpened:false })} />
    </Box>
  );
};

export default AsideHeader;