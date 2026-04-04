import React from 'react';
import CodeArea from '@/src/components/code-area';
import DraggableDivider from '@/src/components/draggable-divider';
import Layout from '@/src/components/layout';
import PreviewArea from "@/src/components/preview-area";
import classes from '@/src/styles/main.module.css';
import Aside from '@/src/components/aside';


export default function HomePage() {

  return (
    <Layout>
      <Aside />
      <main role="main" className={classes.mainArea}>
        <CodeArea />

        <DraggableDivider />

        <PreviewArea />
      </main>
    </Layout>
  );
}
