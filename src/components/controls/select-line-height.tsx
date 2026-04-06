import React, { memo, useMemo } from 'react';
import { NativeSelect } from '@mantine/core';
import { useStore } from '@/src/store';


const SelectLineHeight = () => {

  const codeSettings = useStore((state) => state.codeSettings);
  const setSettings = useStore((state) => state.setSettings);

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSettings('code', 'lineHeight', e.target.value );
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
        value={codeSettings.lineHeight}
        onChange={onChange}
        size="xs"
      />
    </div>
  );
}

export default memo(SelectLineHeight);