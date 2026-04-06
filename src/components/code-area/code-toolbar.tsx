import React, { useEffect } from 'react';
import { CheckIcon, ClipboardPasteIcon, FilesIcon, ReplaceIcon, Trash2Icon } from 'lucide-react';
import { ActionIcon, CopyButton, Flex, Tooltip, useMantineTheme } from '@mantine/core';
import { DEFAULT_CODE, DEFAULT_LANG } from '@/src/constants';
import { useStore } from '@/src/store';


const CodeToolbar = () => {

  const theme = useMantineTheme();

  const code = useStore(state => state.code)

  const [clipboardText, setClipboardText] = React.useState<string | null>(null);


  const onExampleClickHandler = () => {
    useStore.setState({
      code: DEFAULT_CODE,
      codeSettings: {
        ...useStore.getState().codeSettings,
        lang: DEFAULT_LANG,
      },
    });
  };

  const onPasteClickHandler = () => {
    if (clipboardText) {
      useStore.setState({ code: clipboardText });
    }
  }


  const readClipboard = () => {
    navigator.clipboard.readText().then(
      (text) => {
        setClipboardText(text ?? null);
      },
      () => {
        setClipboardText(null);
      }
    )};

  useEffect(() => {
    readClipboard();
    window.addEventListener('focus', readClipboard);
    window.addEventListener('copy', readClipboard);

    return () => {
      window.removeEventListener('focus', readClipboard);
      window.removeEventListener('copy', readClipboard);
    };
  }, [])


  return (
    <Flex gap="5px" align="center">
      <Tooltip
        label="Insert example"
        withArrow
        position="top"
        transitionProps={{ transition: 'skew-down' }}
      >
        <ActionIcon
          aria-label="Insert example"
          disabled={code === DEFAULT_CODE}
          size="input-xs"
          onClick={onExampleClickHandler}
          variant="default"
        >
          <ReplaceIcon size={14} />
        </ActionIcon>
      </Tooltip>

      <Tooltip
        label="Paste from clipboard"
        withArrow
        position="top"
        transitionProps={{ transition: 'skew-down' }}
      >
        <ActionIcon
          aria-label="Paste from clipboard"
          disabled={!clipboardText || code === clipboardText}
          size="input-xs"
          onClick={onPasteClickHandler}
          variant="default"
        >
          <ClipboardPasteIcon size={14} />
        </ActionIcon>
      </Tooltip>

      <CopyButton value={code}>
        {({ copied, copy }) => (
          <Tooltip
            label={copied ? 'Copied!' : 'Copy code to Clipboard'}
            withArrow
            position="top"
            transitionProps={{ transition: 'skew-down' }}
          >
            <ActionIcon
              aria-label="Copy code to clipboard"
              disabled={!code}
              size="input-xs"
              onClick={copy}
              variant={copied ? 'primary' : 'default'}
            >
              {copied ? (
                <CheckIcon size={14} color={theme.colors.green[6]} />
              ) : (
                <FilesIcon size={14} />
              )}
            </ActionIcon>
          </Tooltip>
        )}
      </CopyButton>

      <Tooltip
        label="Clear code input"
        withArrow
        position="top"
        transitionProps={{ transition: 'skew-down' }}
      >
        <ActionIcon
          aria-label="Clear code"
          disabled={!code}
          size="input-xs"
          onClick={() => useStore.setState({ code: '' })}
          variant="default"
        >
          <Trash2Icon size={14} color={!code ? undefined : theme.colors.red[6]} />
        </ActionIcon>
      </Tooltip>
    </Flex>
  );
};

export default CodeToolbar;