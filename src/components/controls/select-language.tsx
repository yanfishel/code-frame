import React, { memo, useMemo } from 'react';
import { NativeSelect } from '@mantine/core';
import { LANGUAGES } from '@/src/constants';
import { useStore } from '@/src/store';


const SelectLanguage = () => {

  const codeSettings = useStore((state) => state.codeSettings)
  const setSettings = useStore((state) => state.setSettings)

  const data = useMemo(() => {
    return Object.entries(LANGUAGES).map(([value, label]) => ({ value, label }))
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSettings('code', 'lang', e.currentTarget.value );
  }

  return (
    <NativeSelect
      label="Language"
      data={data}
      value={codeSettings.lang}
      onChange={onChange}
      size="xs"
    />
  );
};

export default memo(SelectLanguage);