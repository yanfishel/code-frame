import React from 'react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { Collapse, Flex, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './aside.module.css';
import clsx from 'clsx';


interface CollapsePanelProps {
  isOpen: boolean;
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}
const CollapsePanel = ({ isOpen, title, icon, children }: CollapsePanelProps) => {

  const [opened, { toggle }] = useDisclosure(isOpen);

  return (
    <>
      <Flex
        justify="space-between"
        bg="light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-5))"
        align="center"
        p="xs"
        style={{ cursor: 'pointer' }}
        onClick={toggle}
        className={ clsx( classes.collapsePanel, opened && classes.collapsePanelOpened)}
      >
        <Flex gap="xs">
          {icon && <span>{icon}</span>}
          <Text size="md" lh={1.3}>
            {title}
          </Text>
        </Flex>
        {opened ? <ChevronUpIcon size={16} /> : <ChevronDownIcon size={16} />}
      </Flex>
      <Collapse in={opened} transitionDuration={300} transitionTimingFunction="ease-in-out">
        {children}
      </Collapse>
    </>
  );
};

export default CollapsePanel;