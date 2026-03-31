import { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { GripVerticalIcon } from 'lucide-react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { Box, Container } from '@mantine/core';
import { useMove } from '@mantine/hooks';
import Aside from "@/src/components/aside";
import Footer from "@/src/components/footer";
import Header from '@/src/components/header';
import Layout from '@/src/components/layout';
import PreviewArea from "@/src/components/preview-area";
import { useStore } from '@/src/store';
import classes from '@/src/styles/main.module.css';
import DraggableDivider from '@/src/components/draggable-divider';


const CodeArea = dynamic(() => import('@/src/components/code-area'), { ssr: false });

export default function HomePage() {


  useEffect(() => {
    const init = async () => {
      try {
        const clipText = await navigator.clipboard.readText();
        console.log('Clipboard content:', clipText);
        //setText(clipText);
        // You can display the text in an element, for example:
        // document.getElementById("outbox").innerText = clipText;
      } catch (err) {
        console.error('Failed to read clipboard contents: ', err);
      }
    }

    //init();

  }, []);




  
  return (
    <Layout>



        <div className={classes.mainArea}>
          <CodeArea />

          <DraggableDivider />

          <PreviewArea />
        </div>
    </Layout>
  );
}
