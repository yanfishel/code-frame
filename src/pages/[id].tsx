import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { Loader, LoadingOverlay } from '@mantine/core';
import Layout from '@/src/components/layout';
import PreviewArea from '@/src/components/preview-area';
import { BASE_STORE } from '@/src/constants';
import { getSnippetById } from '@/src/services';
import { useStore } from '@/src/store';
import classes from '@/src/styles/main.module.css';


const SnippetPage = () => {

  const params = useParams();

  const fetching = useStore((state) => state.fetching)
  const selectSnippet = useStore((state) => state.selectSnippet)


  const fetchSnippet = async (snippetId: string) => {
    useStore.setState({ fetching: true });
    const snippet = await getSnippetById(snippetId, (err) => {
      toast.error(err);
      useStore.setState({ ...BASE_STORE, fetching: false });
    });
    if (snippet) {
      try {
        const content = snippet.content ? JSON.parse(snippet.content) : null;
        selectSnippet(content);
      } catch (error) {
        toast.error('Failed to parse snippet data');
        useStore.setState({ ...BASE_STORE, fetching: false });
      }
    } else {
      toast.error('Snippet not found.');
      useStore.setState({ ...BASE_STORE, fetching: false });
    }
  }


  useEffect(() => {
    if (params?.id) {
      useStore.setState({ selectedSnippet: null, fetching: true });
      fetchSnippet(params.id as string);
    }
  }, [params?.id]);


  return (
    <Layout>
      <LoadingOverlay visible={fetching} loaderProps={{ children: <Loader size={30} /> }} />
      <main role="main" className={classes.mainViewArea}>
        <PreviewArea />
      </main>
    </Layout>
  );
}

  export default SnippetPage;