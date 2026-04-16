import React, { memo } from 'react';
import { Flex } from '@mantine/core';
import classes from './area-header.module.css';


interface AreaHeaderProps {
  children: React.ReactNode;
}
const AreaHeader = ({ children }: AreaHeaderProps) => {
  return <Flex className={classes.areaHeader}>{children}</Flex>;
};

export default memo(AreaHeader)