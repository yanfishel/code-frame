export * from './color';
export * from './canvas';
export * from './render';
export * from './image';
export * from './format';
export * from './mapping';
export * from './auth';

export const isPlainObject = (val: any) => {
  return typeof val === 'object' && val !== null && !Array.isArray(val);
}

