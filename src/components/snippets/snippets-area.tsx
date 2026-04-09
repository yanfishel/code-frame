import React, { memo } from 'react';
import { SquareCodeIcon } from 'lucide-react';
import { Flex, Table, Text } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import AreaHeader from '@/src/components/area-header';
import SnippetRow from '@/src/components/snippets/snippet-row';
import { useStore } from '@/src/store';
import { T_Snippet, T_SnippetData } from '@/src/types';
import classes from './snippets.module.css';


interface SnippetsAreaProps {
  snippets: T_SnippetData[];
  editHandler: (snippet: T_Snippet) => void;
  deleteHandler: (snippet: T_Snippet) => void;
}
const SnippetsArea = ({ snippets, editHandler, deleteHandler }: SnippetsAreaProps) => {
  const { ref, height } = useElementSize();
  const flexBasisCode = useStore((state) => state.flexBasisCode);

  return (
    <Flex
      ref={ref}
      flex={1}
      direction="column"
      style={{ width: flexBasisCode, minWidth: flexBasisCode, maxWidth: flexBasisCode }}
    >
      <AreaHeader>
        <Flex gap="xs" align="center">
          <SquareCodeIcon size={14} />
          <Text size="md" lh={1.2}>
            Snippets
          </Text>
        </Flex>
      </AreaHeader>

      <div className={classes.snippetsArea}>
        {snippets.length > 0 && (
          <Table.ScrollContainer minWidth={300} maxHeight={height - 64}>
            <Table striped highlightOnHover stickyHeader>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th miw={50} h={40} />
                  <Table.Th w="17%">
                    <Text size="xs" fw={500}>
                      Name
                    </Text>
                  </Table.Th>
                  <Table.Th>
                    <Text size="xs" fw={500}>
                      Code
                    </Text>
                  </Table.Th>
                  <Table.Th w={130} style={{ textAlign: 'center' }}>
                    <Text size="xs" fw={500}>
                      Language
                    </Text>
                  </Table.Th>
                  <Table.Th w={110} align="right" style={{ textAlign: 'right' }}>
                    <Text size="xs" fw={500}>
                      Date
                    </Text>
                  </Table.Th>
                  <Table.Th w={130} align="right" style={{ textAlign: 'right' }} />
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {snippets.map((snippet, idx) => (
                  <SnippetRow
                    key={idx}
                    rowNum={idx + 1}
                    snippet={snippet}
                    editHandler={editHandler}
                    deleteHandler={deleteHandler}
                  />
                ))}
              </Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        )}
      </div>
    </Flex>
  );
};

export default memo(SnippetsArea)