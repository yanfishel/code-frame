import React from 'react';
import { CheckIcon, ColorSwatch } from '@mantine/core';
import { COLOR_SWATCH_STYLES, COLOR_SWATCH_TRANSPARENT } from '@/src/constants';
import { useStore } from '@/src/store';
import { isDark } from '@/src/util';


const TransparentPanel = () => {

  return (
    <div>
      <ColorSwatch component="button" color="transparent" styles={COLOR_SWATCH_TRANSPARENT}>
        {/*{backgroundSolid === color && (
          <CheckIcon
            size={10}
            style={{
              color: isDark(color) ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.85)',
            }}
          />
        )}*/}
      </ColorSwatch>
    </div>
  );
};

export default TransparentPanel;