import React, { useEffect } from 'react';
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
import { useStore } from '@/src/store';
import classes from '@/src/styles/main.module.css';


const Index = () => {

  const params = useParams();

  const fetching = useStore((state) => state.fetching);
  const selectSnippet = useStore((state) => state.selectSnippet);

  const { openSignIn } = useClerk();
  const { isLoaded, isSignedIn } = useUser();

  const fetchSnippet = async (snippetId: string) => {
    const response = await fetch(`/api/snippets/${snippetId}`);
    if (response.ok) {
      const snippet = await response.json();
      try {
        const content = snippet.content ? JSON.parse(snippet.content) : null;
        selectSnippet(content);
        useStore.setState({ fetching: false });
      } catch (error) {
        toast.error('Failed to parse snippet data');
        useStore.setState({ ...BASE_STORE, fetching: false });
      }
    } else {
      toast.error('Failed to fetch snippets');
      useStore.setState({ ...BASE_STORE, fetching: false });
    }
  }


  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      openSignIn(SIGNIN_LIST_OPTIONS);
    } else if (isLoaded && isSignedIn && params?.snippetId) {
      useStore.setState({ ...BASE_STORE, code: '', fetching: true });
      fetchSnippet(params.snippetId as string)
    }
  }, [isLoaded, isSignedIn, params?.snippetId]);



  console.log(params?.snippetId);


  
  return (
    <Layout>
      {!isLoaded ? (
        <Flex flex={1} align="center" justify="center">
          <Loader size={30} />
        </Flex>
      ) : isSignedIn ? (
        <>
            <LoadingOverlay visible={fetching} loaderProps={{ children: <Loader size={30} /> }} />

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

export default Index;