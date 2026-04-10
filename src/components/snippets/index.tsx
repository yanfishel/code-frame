import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { Loader, LoadingOverlay } from '@mantine/core';
import DraggableDivider from '@/src/components/draggable-divider';
import PreviewArea from '@/src/components/preview-area';
import { getSnippets } from '@/src/services';
import { useStore } from '@/src/store';
import { T_Snippet, T_SnippetData } from '@/src/types';
import SnippetsArea from './snippets-area';
import classes from './snippets.module.css';


const Snippets = () => {

  const router = useRouter();

  const fetching = useStore((state) => state.fetching);
  const selectSnippet = useStore((state) => state.selectSnippet);
  const editSnippet = useStore((state) => state.editSnippet);
  const goToPage = useStore((state) => state.goToPage);

  const [snippets, setSnippets] = useState<T_SnippetData[]>([]);


  const fetchSnippets = async () => {
    const snippets = await getSnippets(()=> toast.error('Failed to fetch snippets') )
    setSnippets(snippets)
  }

  const editHandler = (snippet:T_Snippet) => {
    editSnippet(snippet);
    goToPage(`/snippets/${snippet.id}`, router.push)
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
    let content = null;
    try {
      content = snippets.length > 0 && snippets[0].content ? JSON.parse(snippets[0].content) : null;
    } catch (error) {
      console.error('Error in SnippetRow useEffect:', error);
    }
    selectSnippet(content);
  }, [snippets]);

  useEffect(() => {
    fetchSnippets()
  }, []);


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