import React, { MouseEvent, useState } from 'react';
import { EditIcon, ExternalLinkIcon, Trash2Icon } from 'lucide-react';
import { Button, Flex, Popover, Text } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
import { T_Snippet } from '@/src/types';
import classes from './snippets.module.css';


interface ISnippetRowActionsProps {
  snippet:T_Snippet;
  editHandler: (snippet: T_Snippet) => void;
  deleteHandler: (snippet: T_Snippet) => void;
}
const SnippetRowActions = ({snippet, editHandler, deleteHandler}:ISnippetRowActionsProps) => {


  const [confirmOpened, setConfirmOpened] = useState(false);
  const ref = useClickOutside(() => setConfirmOpened(false));


  const onEditClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    if (!snippet) {
      return;
    }
    e.stopPropagation();
    e.preventDefault();
    editHandler(snippet);
  }

  const onDeleteClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setConfirmOpened(true);
  };

  const onDeleteCancelClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setConfirmOpened(false);
  };

  const onDeleteApplyClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setConfirmOpened(false);
    if (!snippet) {
      return;
    }
    deleteHandler(snippet);
  }


  return (
    <Button.Group className={classes.rowActionsButtonGroup}>
      <Button
        size="xs"
        variant="default"
        title="Open snippet"
        component="a"
        target="_blank"
        href={`/${snippet.id}`}
        className={classes.rowActionsButton}
      >
        <ExternalLinkIcon size={14} />
      </Button>
      <Button
        size="xs"
        variant="default"
        title="Edit snippet"
        onClick={onEditClickHandler}
        className={classes.rowActionsButton}
      >
        <EditIcon size={14} />
      </Button>
      <Popover withArrow offset={0} shadow="lg" opened={confirmOpened}>
        <Popover.Target>
          <Button
            size="xs"
            variant="default"
            title="Delete snippet"
            onClick={onDeleteClickHandler}
            className={classes.rowActionsButton}
          >
            <Trash2Icon size={14} color="red" />
          </Button>
        </Popover.Target>
        <Popover.Dropdown ref={ref} w={250}>
          <Flex direction="column" gap="xs" align="center">
            <Text size="sm" fw="bold" c="red" ta="center">
              Are you sure you want to delete this snippet?
            </Text>
            <Flex align="center" gap="sm">
              <Button
                size="xs"
                variant="outline"
                color="default"
                onClick={onDeleteCancelClickHandler}
              >
                Cancel
              </Button>
              <Button size="xs" color="red" onClick={onDeleteApplyClickHandler}>
                Delete
              </Button>
            </Flex>
          </Flex>
        </Popover.Dropdown>
      </Popover>
    </Button.Group>
  );
};

export default SnippetRowActions;