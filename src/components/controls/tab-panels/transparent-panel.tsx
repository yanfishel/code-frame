import React from 'react';
import { ColorSwatch } from '@mantine/core';
import { COLOR_SWATCH_TRANSPARENT } from '@/src/constants';


const TransparentPanel = () => {

  return (
      <ColorSwatch component="button" color="transparent" styles={COLOR_SWATCH_TRANSPARENT} />
  )
}

export default TransparentPanel;