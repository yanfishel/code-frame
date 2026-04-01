import React, { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import clsx from 'clsx';
import { ImageIcon } from 'lucide-react';
import { Box, Flex, Text } from '@mantine/core';
import AreaHeader from '@/src/components/area-header';
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
          <Text size="md" lh={1.2}>
            Image
          </Text>
        </Flex>
      </AreaHeader>
      <Box
        className={clsx(
          classes.canvasWrapper,
          backgroundType === 'none' && classes.backgroundTransparent
        )}
      >
        {!code && (
          <Flex className={classes.previewPlaceholder}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ width: '240px', height: '240px' }}>
              <path
                fill="currentColor"
                d="M12 6a6 6 0 0 0-6 6v24a6 6 0 0 0 6 6h24a6 6 0 0 0 6-6V12a6 6 0 0 0-6-6zm8.884 9.366a1.25 1.25 0 0 1 0 1.768L14.018 24l6.866 6.866a1.25 1.25 0 0 1-1.768 1.768l-7.75-7.75a1.25 1.25 0 0 1 0-1.768l7.75-7.75a1.25 1.25 0 0 1 1.768 0m8 0l7.75 7.75a1.25 1.25 0 0 1 0 1.768l-7.75 7.75a1.25 1.25 0 0 1-1.768-1.768L33.982 24l-6.866-6.866a1.25 1.25 0 0 1 1.768-1.768"
              />
            </svg>
            <Text
              size="70px"
              lh="1"
              component="span"
              style={{ fontWeight: 900, textAlign: 'center' }}
            >
              CODE FRAME
            </Text>
          </Flex>
        )}

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