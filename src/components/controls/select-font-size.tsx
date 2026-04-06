import React, { memo } from 'react';
import { NativeSelect } from '@mantine/core';
import { FONT_SIZES } from '@/src/constants';
import { useStore } from '@/src/store';


const SelectFontSize = () => {

  const codeSettings = useStore((state) => state.codeSettings);
  const setSettings = useStore((state) => state.setSettings);

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSettings('code', 'fontSize', e.target.value );
  };

  return (
    <div>
      <NativeSelect
        label="Font size"
        data={FONT_SIZES}
        value={codeSettings.fontSize}
        onChange={onChange}
        size="xs"
      />
    </div>
  );
}

export default memo(SelectFontSize);