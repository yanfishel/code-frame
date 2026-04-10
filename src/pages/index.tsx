import React, { useEffect } from 'react';
import { Loader, LoadingOverlay } from '@mantine/core';
import Aside from '@/src/components/aside';
import CodeArea from '@/src/components/code-area';
import DraggableDivider from '@/src/components/draggable-divider';
import Layout from '@/src/components/layout';
import PreviewArea from "@/src/components/preview-area";
import { DEFAULT_SNIPPET } from '@/src/constants';
import { useStore } from '@/src/store';
import classes from '@/src/styles/main.module.css';


export default function HomePage() {

  const fetching = useStore((state) => state.fetching);
  const selectSnippet = useStore((state) => state.selectSnippet);


  useEffect(() => {
    selectSnippet(DEFAULT_SNIPPET, true);
  }, []);


  return (
    <Layout>
      <LoadingOverlay visible={fetching} loaderProps={{ children: <Loader size={30} /> }} />
      <Aside />
      <main role="main" className={classes.mainArea}>
        <CodeArea />

        <DraggableDivider />

        <PreviewArea />
      </main>
    </Layout>
  );
}
