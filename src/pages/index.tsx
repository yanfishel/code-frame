import React from 'react';
import { Loader, LoadingOverlay } from '@mantine/core';
import Aside from '@/src/components/aside';
import CodeArea from '@/src/components/code-area';
import DraggableDivider from '@/src/components/draggable-divider';
import Layout from '@/src/components/layout';
import PreviewArea from "@/src/components/preview-area";
import { useStore } from '@/src/store';
import classes from '@/src/styles/main.module.css';


export default function HomePage() {

  const isReady = useStore((state) => state.isReady);


  return (
    <Layout>
      <LoadingOverlay visible={!isReady} loaderProps={{ children: <Loader size={30} /> }} />
      <Aside />
      <main role="main" className={classes.mainArea}>
        <CodeArea />

        <DraggableDivider />

        <PreviewArea />
      </main>
    </Layout>
  );
}
