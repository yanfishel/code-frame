import React, { memo, useEffect, useState } from 'react';
import { EyeIcon } from 'lucide-react';
import { ActionIcon, Badge, Code, Flex, Popover, Table, Text } from '@mantine/core';
import { LANGUAGES, LANGUAGES_COLOR } from '@/src/constants';
import { useStore } from '@/src/store';
import { T_Snippet, T_SnippetData } from '@/src/types';
import classes from "./snippets.module.css";
import SnippetRowActions from '@/src/components/snippets/snippet-row-actions';


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
            <Text size="sm" fw={isSelected ? 'bold' : 'normal'} lineClamp={2}>
              {row.name}
            </Text>
          </Table.Td>
          <Table.Td onMouseLeave={() => setOpened(false)}>
            <Popover width="target" withArrow offset={0} opened={opened}>
              <Popover.Target>
                <Flex style={{ position: 'relative' }}>
                  <Code
                    miw={100}
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
          <Table.Td align="center">
            <Badge p="sm" color={LANGUAGES_COLOR[row.codeSettings.lang as keyof typeof LANGUAGES_COLOR]} >
              {LANGUAGES[row.codeSettings.lang as keyof typeof LANGUAGES]}
            </Badge>
          </Table.Td>
          <Table.Td align="right">{new Date(snippet.createdAt).toLocaleDateString()}</Table.Td>
          <Table.Td align="right">
            <SnippetRowActions snippet={row} editHandler={editHandler} deleteHandler={deleteHandler} />
          </Table.Td>
        </>
      ) : (
        <Table.Td colSpan={10}>Error</Table.Td>
      )}
    </Table.Tr>
  );
};

export default memo(SnippetRow)