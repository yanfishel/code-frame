import React, { useEffect, useRef, memo } from 'react';
import clsx from 'clsx';
import { ImageIcon } from 'lucide-react';
import { Box, Flex, Text } from '@mantine/core';
import AreaHeader from '@/src/components/area-header';
import PreviewToolbar from '@/src/components/preview-area/preview-toolbar';
import PreviewPlaceholder from '@/src/components/preview-placeholder';
import { E_BACKGROUND_TYPE } from '@/src/constants';
import { useStore } from '@/src/store';
import { formatFileSize } from '@/src/util';
import classes from './preview.module.css';


const PreviewArea = () => {
  const canvasRef = useRef(null);

  const flexBasisPreview = useStore((state) => state.flexBasisPreview);

  const code = useStore((state) => state.code);
  const imageSettings = useStore((state) => state.imageSettings);
  const previewImageData = useStore((state) => state.previewImageData);
  const setCanvas = useStore((state) => state.setCanvas);


  useEffect(() => {
    if (canvasRef.current) {
      setCanvas( canvasRef.current );
    }
  }, [canvasRef]);


  return (
    <div
      className={classes.previewArea}
      style={{
        width: flexBasisPreview,
        minWidth: flexBasisPreview,
        maxWidth: flexBasisPreview,
        flexBasis: flexBasisPreview,
      }}
    >
      <AreaHeader>
        <Flex align="center" gap="xs">
          <ImageIcon size={14} />
          <Text size="md" lh={1.2}>
            Image
          </Text>
        </Flex>

        <PreviewToolbar />
      </AreaHeader>
      <Box
        className={clsx(
          classes.canvasWrapper,
          imageSettings.backgroundType === E_BACKGROUND_TYPE.NONE && classes.backgroundTransparent
        )}
      >
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