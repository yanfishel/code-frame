import React, { memo, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { Box } from '@mantine/core';
import { useStore } from '@/src/store';
import classes from './draggable.module.css';


const DraggableDivider = () => {

  const nodeRef = useRef(null);
  const router = useRouter();
  const dividerPosition = useStore((state) => state.dividerPosition)


  const [bounds, setBounds] = useState<{
    left: number;
    right: number;
    top: number;
    bottom: number;
  }>({ left:0, right:0, top:0, bottom:0 });

  const onDragHandler = (_: DraggableEvent, data: DraggableData) => {
    useStore.setState({ dividerPosition: data.x });
  }

  const updateBounds = () => {
    const range = (window.innerWidth - 300) / 2;
    setBounds({ left:-(range-240), right:range-360, top:0, bottom:0 });
  }


  useEffect(() => {
    useStore.setState({ dividerPosition: 0 });
  }, [router.pathname]);

  useEffect(() => {
    updateBounds()
    window.addEventListener('resize', updateBounds);

    return () => {
      window.removeEventListener('resize', updateBounds);
    }
  }, []);


  return (
    <>
      <Draggable
        nodeRef={nodeRef}
        axis="x"
        handle=".handle"
        defaultPosition={{ x: dividerPosition, y: 0 }}
        position={{ x: dividerPosition, y: 0 }}
        scale={1}
        onStart={onDragHandler}
        onDrag={onDragHandler}
        onStop={onDragHandler}
        bounds={bounds}
      >
        <Box ref={nodeRef} className={clsx('handle', classes.draggableDivider)}>
          <div />
        </Box>
      </Draggable>

      <Box className={classes.spacer} />
    </>
  );
};

export default memo(DraggableDivider)