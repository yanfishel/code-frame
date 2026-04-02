import React, { useCallback } from 'react';
import { CheckIcon, ChevronDownIcon, DownloadIcon, FilesIcon, FileTextIcon, ImageIcon } from 'lucide-react';
import { Button, CopyButton, Flex, Menu, Tooltip, useMantineTheme } from '@mantine/core';

import { useStore } from '@/src/store';
import { canvasToGif, canvasToJPG, downloadFile } from '@/src/util';


const PreviewToolbar = () => {

  const theme = useMantineTheme();

  const canvas = useStore((state) => state.canvas)
  const previewImageData = useStore((state) => state.previewImageData)


  const onDownloadClickHandler = useCallback((format: string) => {
      if (!previewImageData || !canvas) {
        return;
      }
      if (format === 'png') {
        downloadFile(previewImageData.blob);
      } else if (format === 'jpg') {
        const imageData = canvasToJPG(canvas);
        downloadFile(imageData.blob, 'jpg');
      } else if(format === 'gif') {
        const blob = canvasToGif(canvas)
        downloadFile(blob, 'gif');
      } else if(format === 'txt') {
        const data = `data:text/plain;charset=utf-8,${  encodeURIComponent(previewImageData.base64)}`;
        downloadFile(data, 'txt', true);
      }
    },
    [previewImageData, canvas]);


  return (
    <>
      <Flex gap="5px" align="center">
        <CopyButton value={previewImageData?.base64 ?? ''}>
          {({ copied, copy }) => (
            <Tooltip
              label={copied ? 'Copied!' : 'Copy Base64 (PNG) to Clipboard'}
              withArrow
              position="top"
              transitionProps={{ transition: 'skew-down' }}
            >
              <Button area-label="Copy Base64 (PNG) to Clipboard"
                disabled={previewImageData === null || !previewImageData.base64}
                onClick={copy}
                variant="default"
                size="xs"
                leftSection={
                  copied ? (
                    <CheckIcon size={14} color={theme.colors.green[6]} />
                  ) : (
                    <FilesIcon size={14} />
                  )
                }
              >
                Base64
              </Button>
            </Tooltip>
          )}
        </CopyButton>

        <Button.Group variant="default">
          <Button area-label="Download PNG"
            disabled={previewImageData === null || !previewImageData.blob}
            size="xs"
            leftSection={<DownloadIcon size={14} />}
            onClick={() => onDownloadClickHandler('png') }
          >
            Download PNG
          </Button>

          {/* -- MENU DOWNLOAD - */}
          <Menu id="preview-download-menu"
            position="bottom-end"
            trigger="hover"
            shadow="md"
            transitionProps={{ transition: 'pop-top-right' }}
          >
            <Menu.Target>
              <Button area-label="Download Menu" title="Download menu"
                disabled={previewImageData === null || !previewImageData.blob}
                size="xs"
                styles={{ root: { paddingInline: '5px', borderLeft: 0 } }}
              >
                <ChevronDownIcon size={14} />
              </Button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                leftSection={<ImageIcon size={14} />}
                style={{ fontSize: '0.8rem' }}
                onClick={() => onDownloadClickHandler('png')}
              >
                Download PNG
              </Menu.Item>
              <Menu.Item
                leftSection={<ImageIcon size={14} />}
                style={{ fontSize: '0.8rem' }}
                onClick={() => onDownloadClickHandler('jpg')}
              >
                Download JPG
              </Menu.Item>
              <Menu.Item
                leftSection={<ImageIcon size={14} />}
                style={{ fontSize: '0.8rem' }}
                onClick={() => onDownloadClickHandler('gif')}
              >
                Download GIF
              </Menu.Item>
              <Menu.Item
                leftSection={<FileTextIcon size={14} />}
                style={{ fontSize: '0.8rem' }}
                onClick={() => onDownloadClickHandler('txt')}
              >
                Download Base64 (PNG)
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Button.Group>
      </Flex>
    </>
  );
};

export default PreviewToolbar;