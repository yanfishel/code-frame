import React, { memo, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { ImageIcon } from 'lucide-react';
import { Box, Flex, Loader, LoadingOverlay, Text } from '@mantine/core';
import AreaHeader from '@/src/components/area-header';
import PreviewToolbar from '@/src/components/preview-area/preview-toolbar';
import PreviewPlaceholder from '@/src/components/preview-placeholder';
import { E_BACKGROUND_TYPE } from '@/src/constants';
import { useStore } from '@/src/store';
import { formatFileSize } from '@/src/util';
import classes from './preview.module.css';


const PreviewArea = () => {

  const canvasRef = useRef(null);
  const router = useRouter();

  const code = useStore((state) => state.code);
  const name = useStore((state) => state.name);
  const rendering = useStore((state) => state.rendering);
  const dividerPosition = useStore((state) => state.dividerPosition);
  const imageSettings = useStore((state) => state.imageSettings);
  const previewImageData = useStore((state) => state.previewImageData);
  const selectedSnippet = useStore((state) => state.selectedSnippet);
  const editableSnippet = useStore((state) => state.editableSnippet);


  const areaWidth = useMemo(() => `calc(50% - ${dividerPosition}px - 3px)`, [dividerPosition]);


  useEffect(() => {
    if (canvasRef.current) {
      useStore.setState({ canvas: canvasRef.current });
    }

    return () => {
      useStore.setState({ canvas: null });
    }
  }, [canvasRef]);


  return (
    <div
      className={clsx([
        classes.previewArea,
        router.pathname === '/[id]' && classes.previewAreaSnippet,
      ])}
      style={{
        width: areaWidth,
        minWidth: areaWidth,
        maxWidth: areaWidth,
        flexBasis: areaWidth,
      }}
    >
      <AreaHeader>
        <Flex
          flex={1}
          align="center"
          gap="xs"
          style={{ width: 'calc(100% - 270px)', maxWidth: 'calc(100% - 270px)' }}
        >
          <ImageIcon size={14} style={{ minWidth: 14 }} />
          <Box
            style={{
              width: `calc(100% - 20px)`,
              maxWidth: `calc(100% - 20px)`,
              flex: 1,
            }}
          >
            <Text size="md" lh={1.2} truncate="end">
              {(selectedSnippet || editableSnippet) && name ? name : 'Image'}
            </Text>
          </Box>
        </Flex>

        <PreviewToolbar />
      </AreaHeader>
      <Box
        className={clsx(
          classes.canvasWrapper,
          router.pathname === '/[id]' && classes.previewCanvasWrapper,
          imageSettings.backgroundType === E_BACKGROUND_TYPE.NONE && classes.backgroundTransparent
        )}
      >
        <LoadingOverlay visible={rendering} loaderProps={{ children: <Loader size={30} /> }} />

        {!code && <PreviewPlaceholder />}

        <canvas
          ref={canvasRef}
          className={clsx(
            classes.previewCanvas,
            imageSettings.backgroundType === E_BACKGROUND_TYPE.NONE && classes.canvasTransparent
          )}
          style={!code ? { opacity: 0 } : {}}
        />

        {previewImageData && (
          <Box className={classes.imageInfo}>
            <span>{`${previewImageData.width}px ✕ ${previewImageData.height}px`}</span>
            {previewImageData.blob && <span>{formatFileSize(previewImageData.blob.size)}</span>}
          </Box>
        )}
      </Box>
    </div>
  );
};

export default memo(PreviewArea)