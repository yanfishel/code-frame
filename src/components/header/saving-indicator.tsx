import React from 'react';
import { CheckIcon } from 'lucide-react';
import { Flex, Text } from '@mantine/core';
import { useStore } from '@/src/store';


const SavingIndicator = () => {

  const isSaved = useStore(state => state.isSaved)
  const selectedSnippet = useStore(state => state.selectedSnippet)

  return (
    <>
      { selectedSnippet &&
        <Flex align="center" gap="xs">
          <CheckIcon size={16} />
          <Text size="sm">{isSaved ? 'Saved' : 'Saving...'}</Text>
        </Flex>
      }
    </>
  );
};

export default SavingIndicator;