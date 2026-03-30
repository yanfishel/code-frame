import React, { useMemo } from 'react';
import { NativeSelect } from '@mantine/core';
import { LANGUAGES } from '@/src/constants';
import { useStore } from '@/src/store';


const SelectLanguage = () => {

  const lang = useStore((state) => state.lang)

  const data = useMemo(() => {
    return Object.entries(LANGUAGES).map(([value, label]) => ({ value, label }))
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    useStore.setState({ lang: e.currentTarget.value });
  }

  return (
    <NativeSelect
      description="Language"
      data={data}
      value={lang}
      onChange={onChange}
      size="xs"
    />
  );
};

export default SelectLanguage;