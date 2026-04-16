import React, { memo, useEffect, useState } from 'react';
import { Settings2Icon } from 'lucide-react';
import { Flex, TextInput } from '@mantine/core';
import { useStore } from '@/src/store';
import CollapsePanel from './collapse-panel';


const SnippetSettings = () => {

  const name = useStore((state) => state.name);
  const [error, setError] = useState('');


  useEffect(() => {
    setError(!name ? 'Name is required!' : '');
  }, [name]);


  return (
    <CollapsePanel isOpen title="Snippet settings" icon={<Settings2Icon size={14} />}>
      <Flex
        direction="column"
        gap="5px"
        style={{ padding: '8px var(--mantine-spacing-lg) var(--mantine-spacing-lg)' }}
      >
        <TextInput
          size="xs"
          label="Name"
          value={name}
          error={error}
          placeholder="Name"
          onChange={(e) => {
            useStore.setState({ name: e.target.value, isSaved: false });
          }}
        />
      </Flex>
    </CollapsePanel>
  );
}

export default memo(SnippetSettings)