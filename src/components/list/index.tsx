import React from 'react';
import Link from 'next/link';
import { Box, Breadcrumbs, Container, Table  } from '@mantine/core';


const SnippetsList = () => {

  return (
    <Box w="100%">
      <Container size="lg" p="md">
        <Breadcrumbs separator="→" separatorMargin="sm" mt="sm" mb="lg">
          <Link href="/">Home</Link>
          <span>Snippets</span>
        </Breadcrumbs>


        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Date</Table.Th>
            </Table.Tr>
          </Table.Thead>
        </Table>
      </Container>
    </Box>
  );
};

export default SnippetsList;