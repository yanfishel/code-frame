import React, { memo, useMemo } from 'react';
import { NativeSelect } from '@mantine/core';
import { FONTS } from '@/src/constants';
import { useStore } from '@/src/store';


const SelectFontFamily = () => {

  const codeSettings = useStore((state) => state.codeSettings);
  const setSettings = useStore((state) => state.setSettings);

  const data = useMemo(() => {
    return Object.entries(FONTS).map(([value, label]) => ({ value, label }));
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSettings('code', 'fontFamily', e.currentTarget.value );
  }


  return (
    <NativeSelect
      label="Font family"
      data={data}
      value={codeSettings.fontFamily}
      onChange={onChange}
      size="xs"
    />
  );
};

export default memo(SelectFontFamily);