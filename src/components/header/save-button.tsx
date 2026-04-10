import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useClerk, useUser } from '@clerk/nextjs';
import { HardDriveDownload } from 'lucide-react';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import { Box, Button, Flex, Modal, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from '@/src/components/header/header.module.css';
import { SIGNUP_OPTIONS } from '@/src/constants';
import { useStore } from '@/src/store';
import { mapStore } from '@/src/util';


const SaveButton = () => {

  const { openSignUp } = useClerk();
  const { isSignedIn } = useUser();

  const router = useRouter();

  const store = useStore((state) => state);
  const code = useStore((state) => state.code);
  const user = useStore((state) => state.user);
  const html = useStore((state) => state.html);
  const isSaved = useStore((state) => state.isSaved);
  const wantToSave = useStore((state) => state.wantToSave);

  const [opened, { open, close }] = useDisclosure(false);

  const name = useStore((state) => state.name);
  const [processing, setProcessing] = useState(false);


  const onSave = useCallback(async () => {
    if (!user || !code || !html) {
      return;
    }

    close();

    setProcessing(true);
    const data = mapStore(store);

    if (!data.id) {
      data.id = uuid();
    }

    const [userRes, snippetRes] = await Promise.all([
      fetch(`/api/users/${user.userId}`, {
        method: 'POST',
        body: JSON.stringify(user),
      }),
      fetch(`/api/snippets/${data.id}`, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    ]);

    if (userRes.ok && snippetRes.ok) {
      const snippetResponse = await snippetRes.json();
      useStore.setState({ isSaved: true, wantToSave: false });
      router.push(`/snippets/${snippetResponse.id}`, undefined, { shallow: true });
    } else {
      const error = snippetRes.ok ? userRes : snippetRes;
      toast.error('Snippet saving failed!');
      console.error(error);
    }

    setProcessing(false);
  }, [user, code, html]);

  const onSaveHandler = useCallback(() => {
    if (isSignedIn) {
      useStore.setState({ name: '' });
      open();
    } else {
      useStore.setState({ wantToSave: true });
      openSignUp(SIGNUP_OPTIONS);
    }
  }, [isSignedIn]);


  const onCloseHandler = () => {
    useStore.setState({ wantToSave: false });
    close();
  };


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
        disabled={isSaved || !code}
        loading={processing}
        leftSection={<HardDriveDownload size={14} />}
        onClick={onSaveHandler}
        className={classes.toolbarButton}
      >
        Save{' '}
        <Box visibleFrom="xs" style={{ marginLeft: '6px' }}>
          snippet
        </Box>
      </Button>

      <Modal
        opened={opened}
        onClose={onCloseHandler}
        size="md"
        title="Save snippet"
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
      >
        <Box className={classes.saveModalContent}>
          <TextInput
            data-autofocus
            label="Snippet name"
            value={name}
            placeholder="Snippet name"
            mt="md"
            onChange={(e) => useStore.setState({ name: e.target.value })}
          />
        </Box>
        <Flex justify="flex-end" gap="md" mt="md">
          <Button size="xs" variant="default" onClick={onCloseHandler}>
            Cancel
          </Button>
          <Button disabled={name.trim() === ''} size="xs" onClick={onSave}>
            Save
          </Button>
        </Flex>
      </Modal>
    </>
  );
};

export default SaveButton;