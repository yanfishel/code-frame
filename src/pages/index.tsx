import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Container } from '@mantine/core';
import Aside from "@/src/components/aside";
import Footer from "@/src/components/footer";
import Header from '@/src/components/header';
import PreviewArea from "@/src/components/preview-area";
import classes from '@/src/styles/main.module.css';


const CodeArea = dynamic(() => import('@/src/components/code-area'), { ssr: false });

export default function HomePage() {

  const [text, setText] = useState('');
  
  useEffect(() => {
    const init = async () => {
      try {
        const clipText = await navigator.clipboard.readText();
        console.log('Clipboard content:', clipText);
        setText(clipText);
        // You can display the text in an element, for example:
        // document.getElementById("outbox").innerText = clipText;
      } catch (err) {
        console.error('Failed to read clipboard contents: ', err);
      }
    }

    //init();

  }, []);
  
  return (
    <>
      <Header />
      <Container fluid className={classes.mainContainer}>

        <Aside />

        <div className={classes.mainArea}>
          <CodeArea />

          <PreviewArea />
        </div>

      </Container>
      <Footer />
    </>
  );
}
