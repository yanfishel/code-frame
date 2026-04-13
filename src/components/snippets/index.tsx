import React, { memo, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { Loader, LoadingOverlay } from '@mantine/core';
import DraggableDivider from '@/src/components/draggable-divider';
import PreviewArea from '@/src/components/preview-area';
import { SNIPPETS_PAGE_LIMIT } from '@/src/constants';
import { deleteSnippet, getSnippets } from '@/src/services';
import { useStore } from '@/src/store';
import { T_PageRespProps, T_Snippet, T_SnippetData } from '@/src/types';
import SnippetsArea from './snippets-area';
import classes from './snippets.module.css';


const Snippets = () => {

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const page = Number(searchParams?.get('page')) || 1;

  const fetching = useStore((state) => state.fetching);
  const selectSnippet = useStore((state) => state.selectSnippet);
  const editSnippet = useStore((state) => state.editSnippet);
  const goToPage = useStore((state) => state.goToPage);

  const [snippets, setSnippets] = useState<T_SnippetData[]>([]);
  const [pagination, setPagination] = useState<T_PageRespProps>({
    page: 1,
    total: 0,
    limit: SNIPPETS_PAGE_LIMIT,
  });


  const fetchSnippets = async (page:number) => {
    const backward = page < pagination.page;
    const cursor = backward ? (snippets && snippets.length ? snippets[0].id : undefined) : pagination.cursor;
    const paging = { ...pagination, page, backward, cursor };
    const snippetsResponse = await getSnippets(paging, () => toast.error('Failed to fetch snippets'));
    setSnippets(snippetsResponse?.data ?? []);
    if(snippetsResponse?.pagination){
      setPagination(snippetsResponse.pagination);
    }
    useStore.setState({ fetching: false });
  };

  const editHandler = (snippet:T_Snippet) => {
    editSnippet(snippet);
    goToPage(`/snippets/${snippet.id}`, router.push)
  }

  const deleteHandler = async (snippet:T_Snippet) => {
    useStore.setState({ fetching: true });
    const deleted = await deleteSnippet(snippet, () => toast.error('Failed to delete snippet'));
    if (deleted) {
      const isLast = snippets.length === 1 && pagination.page > 1;
      toast.success('Snippet deleted successfully!');
      if (isLast) {
        goToPage(`${pathname}?page=${pagination.page - 1}`, router.push);
        return;
      }
      await fetchSnippets(pagination.page);
    }
    useStore.setState({ fetching: false });
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
    useStore.setState({ fetching: true });
    fetchSnippets(page);
  }, [page]);


  return (
    <>
      <LoadingOverlay visible={fetching} loaderProps={{ children: <Loader size={30} /> }} />

      <main role="main" className={classes.snippetsMain}>
        <SnippetsArea snippets={snippets} editHandler={editHandler} deleteHandler={deleteHandler} page={pagination.page} total={pagination.total} limit={pagination.limit} />

        <DraggableDivider />

        <PreviewArea />
      </main>
    </>
  );
}

export default memo(Snippets)