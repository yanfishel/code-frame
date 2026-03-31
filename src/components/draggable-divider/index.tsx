import React, { useRef } from 'react';
import clsx from 'clsx';
import { GripVerticalIcon } from 'lucide-react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { Box } from '@mantine/core';
import { useStore } from '@/src/store';
import classes from './draggable.module.css';


const DraggableDivider = () => {

  const nodeRef = useRef(null);

  const onDragHandler = (e: DraggableEvent, data: DraggableData) => {
    useStore.setState({
      flexBasisCode: `calc(50% + ${data.x}px - 3px)`,
      flexBasisPreview: `calc(50% - ${data.x}px - 3px)`,
    });
  }

  return (
    <>
      <Draggable
        nodeRef={nodeRef}
        axis="x"
        handle=".handle"
        defaultPosition={{ x: 0, y: 0 }}
        position={undefined}
        scale={1}
        onStart={onDragHandler}
        onDrag={onDragHandler}
        onStop={onDragHandler}
      >
        <Box ref={nodeRef} className={clsx('handle', classes.draggableDivider)}>

          <div />
        </Box>
      </Draggable>

      <Box w="6px" />
    </>
  );
};

export default DraggableDivider;