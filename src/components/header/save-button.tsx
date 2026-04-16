'use client';

import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useClerk, useUser } from '@clerk/nextjs';
import { CheckCheckIcon, ChevronDownIcon, PlusIcon, SaveAllIcon, SaveIcon } from 'lucide-react';
import { toast } from 'react-toastify';
import { Box, Button, Divider, Flex, Menu, Modal, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { BASE_STORE } from '@/src/constants';
import { useStore } from '@/src/store';
import { signUpOptions } from '@/src/util';
import classes from './header.module.css';


const SaveButton = () => {

  const { openSignUp } = useClerk();
  const { isSignedIn } = useUser();

  const router = useRouter();

  const id = useStore((state) => state.id);
  const name = useStore((state) => state.name);
  const code = useStore((state) => state.code);
  const user = useStore((state) => state.user);
  const html = useStore((state) => state.html);
  const isSaved = useStore((state) => state.isSaved);
  const wantToSave = useStore((state) => state.wantToSave);
  const editSnippet = useStore((state) => state.editSnippet);
  const editableSnippet = useStore((state) => state.editableSnippet);
  const saveSnippet = useStore((state) => state.saveSnippet);
  const updateSnippet = useStore((state) => state.updateSnippet);
  const goToPage = useStore((state) => state.goToPage);

  const [opened, { open, close }] = useDisclosure(false);

  const [processing, setProcessing] = useState(false);
  const [inputName, setInputName] = useState(name);

  const SignUpOptions = useMemo(()=>signUpOptions('/', '/'), [])


  const updateHandler = async () => {
    if (!user || !code || !html) {
      return;
    }
    setProcessing(true);
    const snippet = await updateSnippet((err) =>
      toast.error(`Snippet saving failed! ${err ? err : 'Unknown error'}`)
    );
    if (snippet) {
      try {
        const content = snippet.content ? JSON.parse(snippet.content) : null;
        editSnippet(content);
        toast.success('Snippet saved successfully!', { autoClose: 2000 });
      } catch (error) {
        toast.error('Failed to parse snippet data');
        useStore.setState({ ...BASE_STORE, fetching: false });
      }
    }
    setProcessing(false);
  }

  const onSave = useCallback(async () => {
    if (!user || !code || !html || !inputName) {
      return;
    }
    close();
    setProcessing(true);
    useStore.setState({ name: inputName });
    const snippet = await saveSnippet((err) =>
      toast.error(`Snippet saving failed! ${err ? err : 'Unknown error'}`)
    );
    if (snippet) {
      goToPage(`/snippets/${snippet.id}`, router.push);
    }
    setProcessing(false);
  }, [user, code, html, inputName]);

  const onSaveHandler = () => {
    if (isSaved) {
      return;
    }
    useStore.setState({ wantToSave: true, name: inputName });
    if (isSignedIn) {
      if (editableSnippet && id) {
        updateHandler();
      } else {
        open();
      }
    } else {
      openSignUp(SignUpOptions);
    }
  };

  const onSaveAsHandler = () => {
    useStore.setState({ wantToSave: true });
    if (isSignedIn) {
      useStore.setState({ name: inputName });
      open();
    } else {
      openSignUp(SignUpOptions);
    }
  }


  const onCloseHandler = () => {
    useStore.setState({ wantToSave: false });
    setInputName(name);
    close();
  };

  const buttonIcon = useMemo(() =>
      isSaved ? <CheckCheckIcon size={18} /> : <SaveIcon size={14} />,
    [isSaved]);

  const buttonLabel = useMemo(
    () =>
      isSaved ? (
        'Saved'
      ) : router.asPath.includes('/snippets') ? (
        'Save'
      ) : (
        <>
          Save
          <Box visibleFrom="xs" ml="0.5em">
            Snippet
          </Box>
        </>
      ),
    [isSaved, router.asPath]
  );


  useEffect(() => {
    if (user && wantToSave) {
      open();
    }
  }, [user]);

  useEffect(() => {
    setInputName(name)
  }, [name])


  return (
    <>
      <Button.Group >
        <Button
          size="xs"
          flex={1}
          variant={isSaved ? 'outline' : 'filled'}
          area-label={buttonLabel}
          loading={processing}
          leftSection={buttonIcon}
          onClick={onSaveHandler}
          className={classes.toolbarButton}
        >
          {buttonLabel}
        </Button>

        {/* -- SAVE AS DROPDOWN  */}
        {router.asPath !== '/' && (
          <Menu
            id="preview-download-menu"
            position="bottom-end"
            trigger="hover"
            shadow="md"
            transitionProps={{ transition: 'pop-top-right' }}
          >
            <Menu.Target>
              <Button
                area-label="Save As Menu"
                title="Save As menu"
                size="xs"
                variant={isSaved ? 'outline' : 'filled'}
                className={classes.toolbarButton}
                styles={{ root: { paddingInline: '5px', borderLeft: 0 } }}
              >
                <ChevronDownIcon size={14} />
              </Button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item leftSection={<PlusIcon size={16} />} onClick={()=>goToPage('/', router.push)}>
                New snippet
              </Menu.Item>
              <Divider />
              <Menu.Item leftSection={<SaveAllIcon size={16} />} onClick={onSaveAsHandler}>
                Save snippet as ...
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        )}
      </Button.Group>

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
            value={inputName}
            placeholder="Snippet name"
            mt="md"
            onChange={(e) => setInputName(e.target.value)}
          />
        </Box>
        <Flex justify="flex-end" gap="md" mt="md">
          <Button size="xs" variant="default" onClick={onCloseHandler}>
            Cancel
          </Button>
          <Button disabled={inputName.trim() === ''} size="xs" onClick={onSave}>
            Save
          </Button>
        </Flex>
      </Modal>
    </>
  );
};

export default memo(SaveButton)