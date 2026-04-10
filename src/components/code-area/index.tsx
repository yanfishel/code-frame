import React, { CSSProperties, memo, useEffect, useMemo, useRef, useState } from 'react';
import { SquareCodeIcon } from 'lucide-react';
import { highlight, languages } from 'prismjs/components/prism-core';
import Editor from 'react-simple-code-editor';
import { Flex, Text } from '@mantine/core';



import 'prismjs/components/prism-basic';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-dart';
import 'prismjs/components/prism-pascal';
import 'prismjs/components/prism-elixir';
import 'prismjs/components/prism-erlang';
import 'prismjs/components/prism-fsharp';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-graphql';
import 'prismjs/components/prism-groovy';
import 'prismjs/components/prism-haskell';
import 'prismjs/components/prism-ini';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-kotlin';
import 'prismjs/components/prism-lisp';
import 'prismjs/components/prism-lua';
import 'prismjs/components/prism-makefile';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-matlab';
import 'prismjs/components/prism-nginx';
import 'prismjs/components/prism-objectivec';
import 'prismjs/components/prism-perl';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-powershell';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-r';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-scala';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-swift';
import 'prismjs/components/prism-toml';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-vbnet';
import 'prismjs/components/prism-vim';
import 'prismjs/components/prism-xml-doc';
import 'prismjs/components/prism-yaml';



import AreaHeader from '@/src/components/area-header';
import { CODE_PLACEHOLDER } from '@/src/constants';
import { useStore } from '@/src/store';
import CodeToolbar from './code-toolbar';
import classes from './codearea.module.css';


const CodeArea = () => {

  const numbersRef = useRef<HTMLDivElement>(null)
  const htmlRef = useRef<HTMLDivElement>(null)

  const fetching = useStore((state) => state.fetching)
  const code = useStore((state) => state.code)
  const html = useStore((state) => state.html)
  const canvas = useStore((state) => state.canvas)
  const codeSettings = useStore((state) => state.codeSettings)
  const inputColor = useStore((state) => state.inputColor)
  const inputBackground = useStore((state) => state.inputBackground)
  const dividerPosition = useStore((state) => state.dividerPosition)
  const setSettings = useStore((state) => state.setSettings)

  const [inputCode, setInputCode] = useState<string>(code)
  const [inputHtml, setInputHtml] = useState<string>(html);
  const [offset, setOffset] = useState(0)


  const areaWidth = useMemo(() => {
    return `calc(50% + ${dividerPosition}px - 3px)`;
  }, [dividerPosition]);


  const highlightHandler = (code: string) => {
    if (!languages[codeSettings.lang]){
      console.error('Language not present:', codeSettings.lang);
      return highlight(code, languages.text);
    }
    try {
      return highlight(code, languages[codeSettings.lang]);
    } catch (error) {
      console.error('Error highlighting code:', error);
      return highlight(code, 'plaintext');
    }
  }

  const onChangeHandler = (code:string) => {
    useStore.setState({ code });
  };


  useEffect(() => {
    if( html !== inputHtml){
      setSettings('root', 'html', inputHtml);
    }
  }, [inputHtml, html]);

  useEffect(() => {
    if (canvas && htmlRef.current) {
      const html = htmlRef.current.querySelector('pre')?.innerHTML ?? '';
      setInputHtml(html === '<br>' ? '' : html);
    }
  }, [canvas, htmlRef, inputCode, codeSettings.lang]);

  useEffect(() => {
    if (numbersRef.current) {
      setOffset(numbersRef.current.offsetWidth);
    }
  }, [codeSettings.lineNumbers, codeSettings.showNumbers]);


  useEffect(() => {
    setInputCode(code);
  }, [code]);


  return (
    <div
      className={classes.codeArea}
      style={
        {
          width: areaWidth,
          minWidth: areaWidth,
          maxWidth: areaWidth,
          flexBasis: areaWidth,
          '--theme-font': `var(--font-${codeSettings.fontFamily})`,
          '--theme-color': inputColor,
          '--theme-background-color': inputBackground,
          '--theme-font-size': `${codeSettings.fontSize}px`,
          '--theme-line-height': `${codeSettings.lineHeight}`,
        } as React.CSSProperties
      }
    >
      <AreaHeader>
        <Flex gap="xs" align="center">
          <SquareCodeIcon size={14} />
          <Text size="md" lh={1.2}>
            Code
          </Text>
        </Flex>
        <CodeToolbar />
      </AreaHeader>

      <div className={classes.scroller}>
        {!code && <div className={classes.codePlaceholder}>{CODE_PLACEHOLDER}</div>}
        <div
          ref={htmlRef}
          id="code-input"
          style={{ '--line-numbers-offset': offset } as CSSProperties}
          className={codeSettings.theme?.class_name}
        >
          {codeSettings.showNumbers && !!code && (
            <div ref={numbersRef} className="line-numbers">
              {codeSettings.lineNumbers}
            </div>
          )}
          <Editor
            disabled={fetching}
            value={inputCode}
            highlight={highlightHandler}
            onValueChange={onChangeHandler}
          />
        </div>
      </div>
    </div>
  );
}

export default memo(CodeArea)