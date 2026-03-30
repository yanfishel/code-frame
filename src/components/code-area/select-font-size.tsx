import React from 'react';
import {  NativeSelect } from '@mantine/core';
import { useStore } from '@/src/store';
import classes from './codearea.module.css';


const SelectFontSize = () => {

  const fontSize = useStore((state) => state.fontSize);

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    useStore.setState({ fontSize: e.target.value });
  };

  return (
    <div className={classes.fontSizeSelect}>
      <NativeSelect
        description="Font size"
        data={['10', '11', '12', '13', '14', '16', '18', '20', '22', '24', '28', '32']}
        value={fontSize}
        onChange={onChange}
        size="xs"
      />
    </div>
  )
}

export default SelectFontSize;