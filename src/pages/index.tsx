import { useEffect, useState } from 'react';
import { Container } from '@mantine/core';
import Header from '@/src/components/header';
import { Welcome } from '@/src/components/Welcome/Welcome';
import classes from '@/src/styles/Main.module.css';








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
      <Container fluid className={classes['main-container']}>
        <Welcome />
        <p className={classes.myTextCenter}>{text}</p>
      </Container>
    </>
  )
}
