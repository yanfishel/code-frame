import React from 'react';
import CodeArea from '@/src/components/code-area';
import DraggableDivider from '@/src/components/draggable-divider';
import Layout from '@/src/components/layout';
import PreviewArea from "@/src/components/preview-area";
import classes from '@/src/styles/main.module.css';


export default function HomePage() {

  
  return (
    <Layout>
      <main role="main" className={classes.mainArea}>
        <CodeArea />

        <DraggableDivider />

        <PreviewArea />
      </main>
    </Layout>
  );
}
