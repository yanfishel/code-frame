"use client";

import React from 'react';
import { CheckIcon, FilesIcon, Trash2Icon } from 'lucide-react';
import { ActionIcon, CopyButton, Flex, Tooltip, useMantineTheme } from '@mantine/core';
import { useStore } from '@/src/store';


const CodeToolbar = () => {

  const theme = useMantineTheme();

  const code = useStore(state => state.code)


  return (
    <Flex gap="5px" align="center">
      <Tooltip label="Clear" withArrow position="top" transitionProps={{ transition: 'skew-down' }}>
        <ActionIcon
          disabled={!code}
          size="input-xs"
          onClick={() => useStore.setState({ code: '' })}
          variant="default"
        >
          <Trash2Icon size={14} />
        </ActionIcon>
      </Tooltip>

      <CopyButton value={code}>
        {({ copied, copy }) => (
          <Tooltip
            label={copied ? 'Copied!' : 'Copy to Clipboard'}
            withArrow
            position="top"
            transitionProps={{ transition: 'skew-down' }}
          >
            <ActionIcon
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
    </Flex>
  );
};

export default CodeToolbar;