import React, { memo, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useClerk, useUser } from '@clerk/nextjs';
import { HardDriveDownload, SquareChartGanttIcon } from 'lucide-react';
import { Box, Button, Flex, Modal, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useStore } from '@/src/store';



const SaveButton = () => {

  const router = useRouter();
  const { openSignUp } = useClerk();
  const { isSignedIn } = useUser();

  const isSaved = useStore((state) => state.isSaved)
  const wantToSave = useStore((state) => state.wantToSave)
  const user = useStore((state) => state.user)

  const [opened, { open, close }] = useDisclosure(false);


  const onSave = () => {
    close();
    useStore.setState({ isSaved: true, wantToSave: false });
  }

  const onCloseHandler = () => {
    useStore.setState({ wantToSave: false });
    close()
  }


  const onSnippetsClickHandler = useCallback(() => {
    if (isSignedIn) {
      useStore.setState({ isReady: false });
      router.push('/cf');
    } else {
      openSignUp({
        signInFallbackRedirectUrl: '/cf',
        signInForceRedirectUrl: '/cf',
        forceRedirectUrl: '/cf',
        fallbackRedirectUrl: '/cf',
      });
    }
  }, [isSignedIn]);

  const onSaveHandler = useCallback(() => {
    if (isSignedIn) {
      open();
    } else {
      useStore.setState({ wantToSave: true });
      openSignUp({
        signInFallbackRedirectUrl: '/',
        signInForceRedirectUrl: '/',
        forceRedirectUrl: '/',
        fallbackRedirectUrl: '/',
      });
    }
  }, [isSignedIn]);


  useEffect(() => {
    if (user && wantToSave) {
      open();
    }
  }, [user, wantToSave]);


  return (
    <>
      <Button
        size="xs"
        variant="primary"
        radius="sm"
        disabled={isSaved}
        leftSection={<HardDriveDownload size={14} />}
        onClick={onSaveHandler}
        style={{ boxShadow: 'var(--mantine-shadow-xs)' }}
      >
        Save{' '}
        <Box visibleFrom="xs" style={{ marginLeft: '6px' }}>
          snippet
        </Box>
      </Button>

      <Button
        size="xs"
        variant="default"
        radius="sm"
        onClick={onSnippetsClickHandler}
        leftSection={<SquareChartGanttIcon size={14} />}
        style={{ boxShadow: 'var(--mantine-shadow-xs)' }}
      >
        Your snippets
      </Button>

      <Modal
        opened={opened}
        onClose={onCloseHandler}
        size="md"
        title="Save snippet"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <Box
          p="xs"
          px="xl"
          pb="xl"
          style={{
            background: 'light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-6))',
            marginLeft: '-15px',
            marginRight: '-15px',
            marginTop: '-15px',
          }}
        >
          <TextInput data-autofocus label="Snippet name" placeholder="Snippet name" mt="md" />
        </Box>
        <Flex justify="flex-end" gap="md" mt="md">
          <Button size="xs" variant="default" onClick={onCloseHandler}>
            Cancel
          </Button>
          <Button size="xs" onClick={onSave}>
            Save
          </Button>
        </Flex>
      </Modal>
    </>
  );

}

export default memo(SaveButton)