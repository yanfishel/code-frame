import React, { ChangeEvent, memo, useEffect, useState } from 'react';
import { Settings2Icon } from 'lucide-react';
import { Flex, TextInput } from '@mantine/core';
import CollapsePanel from '@/src/components/aside/collapse-panel';
import { useStore } from '@/src/store';


const SnippetSettings = () => {

  const name = useStore((state) => state.name);
  const setSettings = useStore((state) => state.setSettings);
  const [inputName, setInputName] = useState('');
  const [error, setError] = useState('');


  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if(!inputName) {
      setError('Name is required!')
      return;
    }
    setSettings('root', 'name', inputName);
  }

  useEffect(() => {
    setInputName(name);
  }, [name])


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
          value={inputName}
          error={error}
          placeholder="Name"
          onBlur={onChangeHandler}
          onChange={(e) => {
            setError('');
            setInputName(e.target.value);
          }}
        />
      </Flex>
    </CollapsePanel>
  )
}

export default memo(SnippetSettings)