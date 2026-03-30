import React from 'react';
import { highlight, languages } from 'prismjs/components/prism-core';
import Editor from 'react-simple-code-editor';



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



import SelectFontFamily from '@/src/components/code-area/select-font-family';
import SelectFontSize from '@/src/components/code-area/select-font-size';
import { EXAMPLE_CODE } from '@/src/constants';
import { useStore } from '@/src/store';
import SelectLanguage from './select-language';
import classes from './codearea.module.css';


const CodeArea = () => {

  const lang = useStore((state) => state.lang)
  const fontSize = useStore((state) => state.fontSize)
  const fontFamily = useStore((state) => state.fontFamily)
  const inputBackground = useStore((state) => state.inputBackground)


  const [code, setCode] = React.useState(EXAMPLE_CODE);


  return (
    <div
      className={classes.codeArea}
      style={
        {
          '--theme-font': `var(--font-${fontFamily})`,
          '--theme-background-color': inputBackground,
          '--theme-font-size': `${fontSize}px`,
        } as React.CSSProperties
      }
    >
      <div className={classes.codeAreaHeader}>
        <SelectLanguage />
        <SelectFontFamily />
        <SelectFontSize />
      </div>
      <div className={classes.scroller}>
        <div id="code-input" className="oneDark">
          {lang && (
            <Editor
              highlight={(code) => highlight(code, languages[lang])}
              onValueChange={(val) => setCode(val)}
              value={code}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CodeArea;