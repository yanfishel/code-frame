import React from 'react';
import { NativeSelect } from '@mantine/core';
import { FONT_SIZES } from '@/src/constants';
import { useStore } from '@/src/store';


const SelectFontSize = () => {

  const fontSize = useStore((state) => state.fontSize);

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    useStore.setState({ fontSize: e.target.value });
  };

  return (
    <div>
      <NativeSelect
        label="Font size"
        data={FONT_SIZES}
        value={fontSize}
        onChange={onChange}
        size="xs"
      />
    </div>
  );
}

export default SelectFontSize;