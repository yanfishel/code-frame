import { createWithEqualityFn } from 'zustand/traditional';
import { EXAMPLE_CODE } from '@/src/constants';
import { T_Store } from '@/src/types';


export const useStore = createWithEqualityFn<T_Store>()((set) => ({
  lang: 'javascript',
  code: EXAMPLE_CODE,
  theme: 'oneDark',
  fontSize: '13',
  fontFamily: 'jetbrains_mono',
  inputBackground: '#282c34',
}));
