
export const hexRgb = (h:string) => {
  return [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
}

export const rgbHex = (r:number, g:number, b:number) => {
  return (
    `#${ 
    [r, g, b]
      .map((v) =>
        Math.max(0, Math.min(255, Math.round(v)))
          .toString(16)
          .padStart(2, '0')
      )
      .join('')}`
  );
}

export const adjust = (hex:string, d:number) => {
  const [r, g, b] = hexRgb(hex);
  return rgbHex(r + d, g + d, b + d);
}

export const blend = (h1:string, h2:string, t:number) => {
  const [r1, g1, b1] = hexRgb(h1),
    [r2, g2, b2] = hexRgb(h2);
  return rgbHex(r1 + (r2 - r1) * t, g1 + (g2 - g1) * t, b1 + (b2 - b1) * t);
}

export const isDark = (hex:string) => {
  const [r, g, b] = hexRgb(hex);
  return 0.299 * r + 0.587 * g + 0.114 * b < 140;
}