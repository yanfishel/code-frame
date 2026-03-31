import React, { useMemo } from 'react';
import { NativeSelect } from '@mantine/core';
import { useStore } from '@/src/store';


const SelectLineHeight = () => {

  const lineHeight = useStore((state) => state.lineHeight);

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    useStore.setState({ lineHeight: e.target.value });
  }

  const heights = useMemo(()=>{
    const heights = new Array(10).fill(0).map((_,idx)=>((idx+1)/10+1).toString())
    return ['1', ...heights]
  }, [])

  return (
    <div>
      <NativeSelect
        label="Line height"
        data={heights}
        value={lineHeight}
        onChange={onChange}
        size="xs"
      />
    </div>
  );
}

export default SelectLineHeight;