// ** Returns short month of passed date
export const formatDateToMonthShort = (value: Date | string) => {
  const formatting: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  };

  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value));
};

export const formatFileSize = (bytes: number, si: boolean = true) => {
  if (bytes === undefined) {
    return '';
  }
  const thresh = si ? 1000 : 1024;
  if (Math.abs(bytes) < thresh) {
    return `${bytes} B`;
  }
  const units = si
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let i = -1;
  do {
    // eslint-disable-next-line no-param-reassign
    bytes /= thresh;
    ++i;
  } while (Math.abs(bytes) >= thresh);
  return `${bytes.toFixed(1)} ${units[i]}`;
};