import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { Loader, LoadingOverlay } from '@mantine/core';
import DraggableDivider from '@/src/components/draggable-divider';
import PreviewArea from '@/src/components/preview-area';
import SnippetsArea from '@/src/components/snippets/snippets-area';
import { BASE_STORE } from '@/src/constants';
import { useStore } from '@/src/store';
import { T_Snippet, T_SnippetData } from '@/src/types';
import classes from './snippets.module.css';


const Snippets = () => {

  const router = useRouter();

  const fetching = useStore((state) => state.fetching);
  const selectSnippet = useStore((state) => state.selectSnippet);

  const [snippets, setSnippets] = useState<T_SnippetData[]>([]);

  const fetchSnippets = async () => {
    const response = await fetch('/api/snippets', { method: 'GET' });
    if (response.ok) {
      const snippets = await response.json();
      setSnippets(snippets);
    } else {
      toast.error('Failed to fetch snippets');
    }
    useStore.setState({ ...BASE_STORE, fetching: false });
  }

  const editHandler = (snippet:T_Snippet) => {
    router.push(`/snippets/${snippet.id}`)
  }

  const deleteHandler = (snippet:T_Snippet) => {
    useStore.setState({ fetching: true });
    fetch(`/api/snippets/${snippet.id}`, {
      method: 'DELETE',
    })
      .then(async () => {
        toast.success('Snippet deleted successfully!');
        await fetchSnippets();
      })
      .catch((error) => {
        toast.error('Failed to delete snippet');
        console.error('Error deleting snippet:', error);
      })
      .finally(() => {
        useStore.setState({ fetching: false });
      });
  }


  useEffect(() => {
    useStore.setState({ ...BASE_STORE, code:'', fetching: true });
    fetchSnippets()
  }, []);


  useEffect(() => {
    try {
      const cont = snippets.length > 0 && snippets[0].content ? JSON.parse(snippets[0].content) : null;
      selectSnippet(cont);
    } catch (error) {
      console.error('Error in SnippetRow useEffect:', error);
      selectSnippet(null);
    }
  }, [snippets]);


  return (
    <>
      <LoadingOverlay visible={fetching} loaderProps={{ children: <Loader size={30} /> }} />

      <main role="main" className={classes.snippetsMain}>
        <SnippetsArea snippets={snippets} editHandler={editHandler} deleteHandler={deleteHandler} />

        <DraggableDivider />

        <PreviewArea />
      </main>
    </>
  );
}

export default Snippets;