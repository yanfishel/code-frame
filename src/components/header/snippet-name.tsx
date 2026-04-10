import React from 'react';
import { useRouter } from 'next/router';
import { PencilLineIcon } from 'lucide-react';
import { ActionIcon, Flex, Text, Tooltip } from '@mantine/core';
import { useStore } from '@/src/store';
import classes from './header.module.css';


const SnippetName = () => {

  const router = useRouter();

  const selectedSnippet = useStore((state) => state.selectedSnippet);
  const name = useStore((state) => state.name);


  return (
    <>
      {selectedSnippet && router.pathname.startsWith('/snippets/') && ('snippetId' in router.query) && (
        <Flex align="center" gap="xs" className={classes.headerSnippetName}>
          {/*<Text size="md" c="blue.7" fw="bold">
            Snippet:
          </Text>*/}
          <Text size="lg">{name}</Text>
          <Tooltip label="Edit snippet name" withArrow position="bottom">
            <ActionIcon
              size="sm"
              variant="transparent"
              aria-label="Edit snippet name"
              onClick={() => {}}
              className={classes.editNameButton}
            >
              <PencilLineIcon size={15} />
            </ActionIcon>
          </Tooltip>
        </Flex>
      )}
    </>
  );
};

export default SnippetName;