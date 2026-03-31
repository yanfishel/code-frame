import React, { useMemo } from 'react';
import { NativeSelect } from '@mantine/core';
import { FONTS } from '@/src/constants';
import { useStore } from '@/src/store';


const SelectFontFamily = () => {

  const fontFamily = useStore((state) => state.fontFamily);

  const data = useMemo(() => {
    return Object.entries(FONTS).map(([value, label]) => ({ value, label }));
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    useStore.setState({ fontFamily: e.currentTarget.value });
  }


  return (
    <NativeSelect
      label="Font family"
      data={data}
      value={fontFamily}
      onChange={onChange}
      size="xs"
    />
  );
};

export default SelectFontFamily;