import React, { memo, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useClerk, useUser } from '@clerk/nextjs';
import { toast } from 'react-toastify';
import { Flex, Loader, LoadingOverlay } from '@mantine/core';
import Aside from '@/src/components/aside';
import CodeArea from '@/src/components/code-area';
import DraggableDivider from '@/src/components/draggable-divider';
import Layout from '@/src/components/layout';
import PreviewArea from '@/src/components/preview-area';
import SnippetsSignin from '@/src/components/snippets/snippets-signin';
import { BASE_STORE, SIGNIN_LIST_OPTIONS } from '@/src/constants';
import { getSnippet } from '@/src/services';
import { useStore } from '@/src/store';
import classes from '@/src/styles/main.module.css';


const SnippetPage = () => {

  const params = useParams();

  const fetching = useStore((state) => state.fetching);
  const editableSnippet = useStore((state) => state.editableSnippet);
  const editSnippet = useStore((state) => state.editSnippet);
  const renderImage = useStore((state) => state.renderImage);


  const { openSignIn } = useClerk();
  const { isLoaded, isSignedIn } = useUser();


  const fetchSnippet = async (snippetId: string) => {
    useStore.setState({ fetching: true });
    const snippet = await getSnippet(snippetId, (err) => {
      toast.error(err);
      useStore.setState({ ...BASE_STORE, fetching: false });
    });
    if (snippet){
      try {
        const content = snippet.content ? JSON.parse(snippet.content) : null;
        editSnippet(content);
      } catch (error) {
        toast.error('Failed to parse snippet data');
        useStore.setState({ ...BASE_STORE, fetching: false });
      }
    }
  }

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      openSignIn(SIGNIN_LIST_OPTIONS);
    } else if (isLoaded && isSignedIn && params?.snippetId) {
      if (editableSnippet) {
        renderImage(true);
      } else {
        fetchSnippet(params.snippetId as string);
      }
    }
  }, [isLoaded, isSignedIn, params?.snippetId]);

  
  return (
    <Layout>
      {!isLoaded ? (
        <Flex flex={1} align="center" justify="center">
          <Loader size={30} />
        </Flex>
      ) : isSignedIn ? (
        <>
          <LoadingOverlay visible={!isLoaded || fetching} loaderProps={{ children: <Loader size={30} /> }} />

          <Aside />
          <main role="main" className={classes.mainArea}>
            <CodeArea />

            <DraggableDivider />

            <PreviewArea />
          </main>
        </>
      ) : (
        <SnippetsSignin />
      )}
    </Layout>
  );
};

export default memo(SnippetPage);