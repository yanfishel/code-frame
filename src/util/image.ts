import { FORMAT_MIME } from '@/src/constants';


export const formatFileSize = (bytes:number, si:boolean = true) => {
  if(bytes === undefined) {
    return '';
  }
  const thresh = si ? 1000 : 1024;
  if (Math.abs(bytes) < thresh) {
    return `${bytes  } B`;
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
}

export const canvasToGif = (canvas:HTMLCanvasElement, cb:(blob:Blob)=>void) => {
  const ctx = canvas.getContext('2d');
  if(!ctx) {
    throw new Error(
      'canvasToGif: canvas must have a 2d context (e.g. canvas.getContext("2d") !== null)'
    )
  }
  const w = canvas.width,
    h = canvas.height,
    np = w * h;
  const rgba = ctx.getImageData(0, 0, w, h).data;
  // Composite on white → RGB
  const rgb = new Uint8Array(np * 3);
  for (let i = 0, j = 0; i < rgba.length; i += 4, j += 3) {
    const a = rgba[i + 3] / 255;
    rgb[j] = (rgba[i] * a + 255 * (1 - a)) | 0;
    rgb[j + 1] = (rgba[i + 1] * a + 255 * (1 - a)) | 0;
    rgb[j + 2] = (rgba[i + 2] * a + 255 * (1 - a)) | 0;
  }
  // Build 256-color palette via frequency on 6-bit-reduced colors
  const freq = new Map();
  for (let j = 0; j < np * 3; j += 3) {
    const k = ((rgb[j] >> 2) << 12) | ((rgb[j + 1] >> 2) << 6) | (rgb[j + 2] >> 2);
    freq.set(k, (freq.get(k) || 0) + 1);
  }
  const top = [...freq.keys()].sort((a, b) => freq.get(b) - freq.get(a)).slice(0, 256);
  const palette = new Uint8Array(256 * 3);
  const palMap = new Map();
  top.forEach((k, idx) => {
    const r6 = (k >> 12) & 63,
      g6 = (k >> 6) & 63,
      b6 = k & 63;
    palette[idx * 3] = (r6 << 2) | (r6 >> 4);
    palette[idx * 3 + 1] = (g6 << 2) | (g6 >> 4);
    palette[idx * 3 + 2] = (b6 << 2) | (b6 >> 4);
    palMap.set(k, idx);
  });
  // Map pixels to palette indices with nearest-color fallback
  const indices = new Uint8Array(np);
  const cache = new Map();
  for (let i = 0, j = 0; i < np; i++, j += 3) {
    const k = ((rgb[j] >> 2) << 12) | ((rgb[j + 1] >> 2) << 6) | (rgb[j + 2] >> 2);
    let idx = palMap.get(k);
    if (idx === undefined) {
      idx = cache.get(k);
      if (idx === undefined) {
        let best = Infinity;
        const r = rgb[j],
          g = rgb[j + 1],
          b = rgb[j + 2];
        for (let p2 = 0; p2 < top.length * 3; p2 += 3) {
          const dr = r - palette[p2],
            dg = g - palette[p2 + 1],
            db = b - palette[p2 + 2];
          const d = dr * dr + dg * dg + db * db;
          if (d < best) {
            best = d;
            idx = p2 / 3;
          }
        }
        cache.set(k, idx);
      }
    }
    indices[i] = idx;
  }
  // LZW encode
  const lzwMin = 8,
    clearCode = 256,
    eofCode = 257;
  const lzwOut = [];
  let lBuf = 0,
    lBits = 0;
  const wb = (code:number, n:number) => {
    lBuf |= code << lBits;
    lBits += n;
    while (lBits >= 8) {
      lzwOut.push(lBuf & 0xff);
      lBuf >>>= 8;
      lBits -= 8;
    }
  };
  let codeSize = 9,
    nextCode = 258,
    limit = 512;
  const lzwTable = new Map();
  const resetLzw = () => {
    lzwTable.clear();
    nextCode = 258;
    codeSize = 9;
    limit = 512;
  };
  resetLzw();
  wb(clearCode, codeSize);
  let prefix = indices[0];
  for (let i = 1; i < np; i++) {
    const c = indices[i],
      key = (prefix << 8) | c;
    const existing = lzwTable.get(key);
    if (existing !== undefined) {
      prefix = existing;
    } else {
      wb(prefix, codeSize);
      if (nextCode > 4095) {
        wb(clearCode, codeSize);
        resetLzw();
      } else {
        lzwTable.set(key, nextCode++);
        if (nextCode > limit && codeSize < 12) {
          codeSize++;
          limit <<= 1;
        }
      }
      prefix = c;
    }
  }
  wb(prefix, codeSize);
  wb(eofCode, codeSize);
  if (lBits > 0) {
    lzwOut.push(lBuf & 0xff);
  }
  // Build GIF89a
  const out = [
    0x47,
    0x49,
    0x46,
    0x38,
    0x39,
    0x61,
    w & 0xff,
    (w >> 8) & 0xff,
    h & 0xff,
    (h >> 8) & 0xff,
    0xf7,
    0,
    0,
  ];
  for (let i = 0; i < 768; i++) {
    out.push(palette[i]);
  }
  out.push(0x2c, 0, 0, 0, 0, w & 0xff, (w >> 8) & 0xff, h & 0xff, (h >> 8) & 0xff, 0, lzwMin);
  for (let i = 0; i < lzwOut.length; i += 255) {
    const end = Math.min(i + 255, lzwOut.length);
    out.push(end - i);
    for (let j = i; j < end; j++) {
      out.push(lzwOut[j]);
    }
  }
  out.push(0, 0x3b);

  cb( new Blob([new Uint8Array(out)], { type: 'image/gif' }) );
}

export const base64ToBlob = (base64:string, contentType:string = '') => {
  // Remove the data URI prefix and get the raw base64 string
  const base64String = base64.split(',')[1] || base64;

  const sliceSize = 1024;
  const byteCharacters = atob(base64String);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);
    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}

export const canvasToPng = (canvas:HTMLCanvasElement) => {
  const base64 = canvas.toDataURL(FORMAT_MIME.png);
  return { blob: base64ToBlob(base64, FORMAT_MIME.png), base64 };
}