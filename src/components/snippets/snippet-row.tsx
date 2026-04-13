import React, { memo, MouseEvent, useCallback, useEffect, useState } from 'react';
import { EditIcon, EyeIcon, Trash2Icon } from 'lucide-react';
import { ActionIcon, Badge, Button, Code, Flex, Popover, Table, Text } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
import { LANGUAGES, LANGUAGES_COLOR } from '@/src/constants';
import { useStore } from '@/src/store';
import { T_Snippet, T_SnippetData } from '@/src/types';
import classes from "./snippets.module.css";


interface SnippetRowProps {
  rowNum: number;
  snippet: T_SnippetData;
  editHandler: (snippet: T_Snippet) => void;
  deleteHandler: (snippet: T_Snippet) => void;
}
const SnippetRow = ({ rowNum, snippet, editHandler, deleteHandler }: SnippetRowProps) => {

  const selectedSnippet = useStore((state) => state.selectedSnippet);
  const selectSnippet = useStore((state) => state.selectSnippet);

  const [row, setRow] = useState<T_Snippet>();
  const [opened, setOpened] = useState(false);
  const [confirmOpened, setConfirmOpened] = useState(false);

  const ref = useClickOutside(() => setConfirmOpened(false));


  const onEditClickHandler = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    if (!row) {
      return;
    }
    e.stopPropagation();
    e.preventDefault();
    editHandler(row);
  }, [row])

  const onDeleteClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setConfirmOpened(true);
  }

  const onDeleteCancelClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setConfirmOpened(false);
  }

  const onDeleteApplyClickHandler = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setConfirmOpened(false);
    if (!row) {
      return;
    }
    deleteHandler(row);
  }, [row])


  useEffect(() => {
    try {
      const cont = snippet.content ? JSON.parse(snippet.content) : undefined;
      setRow(cont);
    } catch (error) {
      console.error('Error in SnippetRow useEffect:', error);
    }
  }, [snippet])

  const isSelected = selectedSnippet && row && selectedSnippet.id === row.id;


  return (
    <Table.Tr
      bg={isSelected ? 'var(--mantine-color-blue-light)' : undefined}
      onClick={() => (row ? selectSnippet(row) : null)}
      style={{ cursor: 'pointer' }}
    >
      {row ? (
        <>
          <Table.Td align="right">{rowNum}</Table.Td>
          <Table.Td>
            <Text size="sm" fw={isSelected?'bold':'normal'} lineClamp={2}>
              {row.name}
            </Text>
          </Table.Td>
          <Table.Td onMouseLeave={() => setOpened(false)}>
            <Popover width="target" withArrow offset={0} opened={opened}>
              <Popover.Target>
                <Flex style={{ position: 'relative' }}>
                  <Code
                    p="xs"
                    className={classes.rowCodePreview}
                    color="var(--mantine-color-blue-light)"
                  >
                    <Text size="xs" lineClamp={1}>
                      {row.code}
                    </Text>
                  </Code>
                  <ActionIcon
                    variant="default"
                    size="md"
                    title="Preview code"
                    onMouseEnter={() => setOpened(true)}
                    className={classes.previewCodeButton}
                  >
                    <EyeIcon size={14} />
                  </ActionIcon>
                </Flex>
              </Popover.Target>
              <Popover.Dropdown className={classes.previewCodePopover}>
                <Code block c="blue.0" color="dark">
                  <Text size="xs">{row.code}</Text>
                </Code>
              </Popover.Dropdown>
            </Popover>
          </Table.Td>
          <Table.Td align="center" style={{ textAlign: 'center' }}>
            <Badge p="sm" color={LANGUAGES_COLOR[row.codeSettings.lang as keyof typeof LANGUAGES_COLOR]}>
              {LANGUAGES[row.codeSettings.lang as keyof typeof LANGUAGES]}
            </Badge>
          </Table.Td>
          <Table.Td align="right">{new Date(snippet.createdAt).toLocaleDateString()}</Table.Td>
          <Table.Td align="right">
            <Flex gap="xs" align="center">
              <Button
                size="xs"
                variant="outline"
                title="Edit snippet"
                leftSection={<EditIcon size={14} />}
                onClick={onEditClickHandler}
              >
                Edit
              </Button>
              <Popover withArrow offset={0} shadow="lg" opened={confirmOpened}>
                <Popover.Target>
                  <ActionIcon
                    size={30}
                    color="red"
                    title="Delete snippet"
                    onClick={onDeleteClickHandler}
                  >
                    <Trash2Icon size={14} />
                  </ActionIcon>
                </Popover.Target>
                <Popover.Dropdown
                  ref={ref}
                  w={250}
                  style={{ boxShadow: 'var(--mantine-shadow-lg)' }}
                >
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
            </Flex>
          </Table.Td>
        </>
      ) : (
        <Table.Td colSpan={10}>Error</Table.Td>
      )}
    </Table.Tr>
  );
};

export default memo(SnippetRow)