import React, { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import clsx from 'clsx';
import { ImageIcon } from 'lucide-react';
import { Box, Flex, Text } from '@mantine/core';
import AreaHeader from '@/src/components/area-header';
import PreviewToolbar from '@/src/components/preview-area/preview-toolbar';
import PreviewPlaceholder from '@/src/components/preview-placeholder';
import { useStore } from '@/src/store';
import { formatFileSize } from '@/src/util';
import classes from './preview.module.css';


const PreviewArea = () => {

  const canvasRef = useRef(null)

  const flexBasisPreview = useStore((state) => state.flexBasisPreview)
  const theme = useStore((state) => state.theme)
  const lang = useStore((state) => state.lang)
  const code = useStore((state) => state.code);
  const showNumbers = useStore((state) => state.showNumbers)
  const lineNumbers = useStore((state) => state.lineNumbers)
  const fontSize = useStore((state) => state.fontSize)
  const fontFamily = useStore((state) => state.fontFamily)
  const lineHeight = useStore((state) => state.lineHeight)
  const frameStyle = useStore((state) => state.frameStyle)
  const innerPadding = useStore((state) => state.innerPadding)
  const outerPadding = useStore((state) => state.outerPadding)
  const cornerRadius = useStore((state) => state.cornerRadius)
  const showShadow = useStore((state) => state.showShadow)
  const shadowBlur = useStore((state) => state.shadowBlur)
  const shadowColor = useStore((state) => state.shadowColor)
  const shadowOffset = useStore((state) => state.shadowOffset)
  const shadowOpacity = useStore((state) => state.shadowOpacity)
  const backgroundType = useStore((state) => state.backgroundType)
  const backgroundSolid = useStore((state) => state.backgroundSolid)
  const gradient = useStore((state) => state.gradient)
  const windowOpacity = useStore((state) => state.windowOpacity)
  const watermark = useStore((state) => state.watermark);
  const previewImageData = useStore((state) => state.previewImageData)

  const renderImage = useStore((state) => state.renderImage)


  const renderHandler = useCallback(()=>{
    if(canvasRef.current) {
      renderImage(canvasRef.current);
    }
  }, [canvasRef])

  useEffect(() => {
    renderHandler();
  }, [
    code,
    theme,
    lang,
    showNumbers,
    lineHeight,
    lineNumbers,
    fontSize,
    fontFamily,
    frameStyle,
    innerPadding,
    outerPadding,
    cornerRadius,
    showShadow,
    shadowBlur,
    shadowColor,
    shadowOffset,
    shadowOpacity,
    backgroundType,
    backgroundSolid,
    gradient,
    windowOpacity,
    watermark,
  ]);

  useLayoutEffect(() => {
    renderHandler();
  }, [])


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
          <Text size="md" lh={1.2}>Image</Text>
        </Flex>

        <PreviewToolbar />

      </AreaHeader>
      <Box
        className={clsx(
          classes.canvasWrapper,
          backgroundType === 'none' && classes.backgroundTransparent
        )}
      >
        {!code && <PreviewPlaceholder />}

        <canvas
          ref={canvasRef}
          className={clsx(
            classes.previewCanvas,
            backgroundType === 'none' && classes.canvasTransparent
          )}
          style={!code ? { opacity: 0 } : {}}
        />

        {previewImageData && (
          <Box className={classes.imageInfo}>
            <span>{`${previewImageData.width}px ✕ ${previewImageData.height}px`}</span>
            {previewImageData.blob && (
              <span>{formatFileSize(previewImageData.blob.size)}</span>
            )}
          </Box>
        )}
      </Box>
    </div>
  );
};

export default PreviewArea;