import React, { memo, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SquareCodeIcon } from 'lucide-react';
import { Flex, Group, Pagination, Table, Text } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import AreaHeader from '@/src/components/area-header';
import SnippetRow from '@/src/components/snippets/snippet-row';
import { SNIPPETS_PAGE_LIMIT } from '@/src/constants';
import { useStore } from '@/src/store';
import { T_Snippet, T_SnippetData } from '@/src/types';
import classes from './snippets.module.css';


interface SnippetsAreaProps {
  snippets: T_SnippetData[];
  editHandler: (snippet: T_Snippet) => void;
  deleteHandler: (snippet: T_Snippet) => void;

  page?: number;
  total?: number;
  limit?: number;
}
const SnippetsArea = ({
  snippets,
  editHandler,
  deleteHandler,
  page,
  total,
  limit,
}: SnippetsAreaProps) => {
  const { ref, height } = useElementSize();
  const dividerPosition = useStore((state) => state.dividerPosition);

  const areaWidth = useMemo(() => `calc(50% + ${dividerPosition}px - 3px)`, [dividerPosition]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handlePageChange = (p: number) => {
    const params = new URLSearchParams(searchParams!);
    params.set('page', p.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const limitNumber = limit || SNIPPETS_PAGE_LIMIT;
  const pageNumber = page || 1;
  const totalNumber = total || 0;
  const totalPages = Math.ceil(totalNumber / limitNumber);
  const message = `Showing ${limitNumber * (pageNumber - 1) + 1} – ${Math.min(totalNumber, limitNumber * pageNumber)} of ${totalNumber}`;

  return (
    <Flex
      ref={ref}
      flex={1}
      direction="column"
      style={{ width: areaWidth, minWidth: areaWidth, maxWidth: areaWidth }}
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
              <Table.Tfoot>
                <Table.Tr
                  style={{ borderTop: '1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))', borderBottom: 0 }}
                >
                  <Table.Td colSpan={10} align="center" py="sm" bd={0}>
                    <Group justify="flex-end">
                      <Text size="sm">{message}</Text>
                      <Pagination
                        size="md"
                        radius="sm"
                        total={totalPages}
                        value={page}
                        onChange={handlePageChange}
                        withPages={false}
                      />
                    </Group>
                  </Table.Td>
                </Table.Tr>
              </Table.Tfoot>
            </Table>
          </Table.ScrollContainer>
        )}
      </div>
    </Flex>
  );
};

export default memo(SnippetsArea)