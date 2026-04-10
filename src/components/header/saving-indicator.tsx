import React, { memo, useMemo } from 'react';
import { CheckIcon, TriangleAlertIcon } from 'lucide-react';
import { Badge, Loader,  useMantineColorScheme } from '@mantine/core';
import { useStore } from '@/src/store';


const SavingIndicator = () => {

  const { colorScheme } = useMantineColorScheme();

  const isSaved = useStore(state => state.isSaved)
  const saving = useStore(state => state.saving)
  const editableSnippet = useStore(state => state.editableSnippet)

  const color = useMemo(() => {
    return saving ? 'blue.7' : isSaved ? 'teal.8' : 'red';
  }, [colorScheme, isSaved, saving]);

  const icon = useMemo(() => {
    return saving ? (
      <Loader color="rgba(255, 255, 255, 1)" size={12} />
    ) : isSaved ? (
      <CheckIcon size={18} />
    ) : (
      <TriangleAlertIcon size={14} />
    );
  }, [colorScheme, isSaved, saving]);


  return (
    <>
      {editableSnippet && (
        <Badge autoContrast size="sm" h={24} color={color} leftSection={icon}>
          {saving ? 'Saving...' : isSaved ? 'Saved' : 'Not saved'}
        </Badge>
      )}
    </>
  );
};

export default memo(SavingIndicator);