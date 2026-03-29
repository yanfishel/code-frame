import { useEffect, useState } from 'react';
import { Container } from '@mantine/core';

import { Welcome } from '../components/Welcome/Welcome';
import classes from '../styles/Main.module.css';
import Header from '@/components/header';


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
      <Container fluid>
        <Welcome />
        <p className={classes.myTextCenter}>{text}</p>
      </Container>
    </>
  )
}
