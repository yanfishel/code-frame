import { T_Cords, T_Theme } from '@/src/types';
import { adjust, isDark } from '@/src/util/color';


export const rrect = (ctx:CanvasRenderingContext2D, x:number, y:number, w:number, h:number, r:number) => {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

export const calculateCorners = (iw:number, ih:number, cw:number, ch:number) => {
  const halfW = (cw - iw) / 2;
  const halfH  = (ch - ih) / 2;

  const pts = [
    [halfW, halfH], // TL
    [halfW + iw, halfH], // TR
    [halfW + iw, halfH + ih], // BR
    [halfW, halfH + ih] // BL
  ];
  return pts.map( ([x,y]) => ({x,y}))
}

export const drawIntoQuad = (ctx: CanvasRenderingContext2D, img: HTMLCanvasElement, corners:T_Cords[]) => {
  const [TL,TR,BR,BL] = corners;
  const srcH = img.height, srcW = img.width;
  for (let i = 0; i <= srcH; i++) {
    const t = i / srcH;
    const Lx=TL.x+(BL.x-TL.x)*t, Ly=TL.y+(BL.y-TL.y)*t;
    const Rx=TR.x+(BR.x-TR.x)*t, Ry=TR.y+(BR.y-TR.y)*t;
    const dw = Math.sqrt((Rx-Lx)**2+(Ry-Ly)**2);
    if (dw < 0.5) {
      continue;
    }
    const ang = Math.atan2(Ry-Ly, Rx-Lx);
    ctx.setTransform(Math.cos(ang),Math.sin(ang),-Math.sin(ang),Math.cos(ang),Lx,Ly);
    ctx.drawImage(img, 0,i,srcW,1, 0,-0.5,dw,1.5);
  }
  ctx.setTransform(1,0,0,1,0,0);
}

export const drawBrowser = (ctx: CanvasRenderingContext2D, totalW: number, browserH: number, theme: T_Theme | null, fontSize:string, pad: number, style: string) => {
  if (style === 'none' || browserH === 0 || !theme) {
    return;
  }
  const dark = isDark(theme.bg);
  ctx.fillStyle = dark ? adjust(theme.bg, 18) : adjust(theme.bg, -12);
  ctx.fillRect(0, 0, totalW, browserH);
  // separator
  ctx.strokeStyle = dark ? adjust(theme.bg, -20) : adjust(theme.bg, 20);
  ctx.lineWidth = 0.5;
  ctx.beginPath(); ctx.moveTo(0, browserH); ctx.lineTo(totalW, browserH); ctx.stroke();

  if (style === 'macos') {

    drawMacOSWindow(ctx, fontSize, browserH, pad);

  } else if (style === 'windows') {

    drawWindowsWindow(ctx, dark, totalW, browserH, fontSize);

  } else if (style === 'gnome') {

    drawGnomeWindow(ctx, totalW, browserH, fontSize, pad);

  }
}

export const drawMacOSWindow = (
  ctx: CanvasRenderingContext2D,
  fontSize: string,
  browserH: number,
  pad: number
) => {
  const cy = browserH / 2;
  const r = Math.max(5, Math.round(+fontSize * 0.38));
  const gap = r * 2 + 6;
  ['#ff5f57', '#febc2e', '#28c840'].forEach((c, i) => {
    ctx.beginPath();
    ctx.arc(pad + r + i * gap, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = c;
    ctx.fill();
  });
};

export const drawWindowsWindow = (ctx: CanvasRenderingContext2D, dark:boolean, totalW: number, browserH: number, fontSize:string) => {
  const cy = browserH / 2;

  // 3 buttons: –  □  ✕
  const bW = Math.round(browserH * 1.55);
  [
    { icon: '—', close: false },
    { icon: '□', close: false },
    { icon: '✕', close: true },
  ].forEach((b, i) => {
    const bx = totalW - bW * (3 - i);
    if (b.close) {
      ctx.fillStyle = 'rgba(196,43,28,0.9)';
      ctx.fillRect(bx, 0, bW, browserH);
    }
    ctx.fillStyle = b.close ? '#fff' : dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)';
    ctx.font = `${Math.round(+fontSize * (b.icon === '□' ? 1.2 : 0.8))}px "Segoe UI",Arial,sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(b.icon, bx + bW / 2, cy + (b.icon === '—' ? 2 : 0));
  });
  ctx.textAlign = 'left';
}

export const drawGnomeWindow = (
  ctx: CanvasRenderingContext2D,
  totalW: number,
  browserH: number,
  fontSize: string,
  pad: number
) => {
  const cy = browserH / 2;

  // Left: 2 neutral dots (minimize/maximize)
  const r = Math.max(5, Math.round(+fontSize * 0.38));
  [0, 1].forEach((i) => {
    ctx.beginPath();
    ctx.arc(pad + r + i * (r * 2 + 5), cy, r, 0, Math.PI * 2);
    ctx.fillStyle = '#787878';
    ctx.fill();
  });
  // Right: close (red circle with X)
  const cr = Math.max(5, Math.round(+fontSize * 0.5));
  const cx2 = totalW - pad - cr;
  ctx.beginPath();
  ctx.arc(cx2, cy, cr, 0, Math.PI * 2);
  ctx.fillStyle = '#cc3333';
  ctx.fill();
  const xs = cr * 0.45;
  ctx.strokeStyle = 'rgba(255,255,255,0.9)';
  ctx.lineWidth = Math.max(1, cr * 0.2);
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(cx2 - xs, cy - xs);
  ctx.lineTo(cx2 + xs, cy + xs);
  ctx.moveTo(cx2 + xs, cy - xs);
  ctx.lineTo(cx2 - xs, cy + xs);
  ctx.stroke();
  ctx.lineCap = 'butt';
}

export const windowTitle = (ctx: CanvasRenderingContext2D, text: string, fontSize:number, width:number, height:number, dark:boolean = false) => {
  // Title center
  ctx.fillStyle = dark ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,0.65)';
  ctx.font = `${Math.round(+fontSize * 0.72)}px "Segoe UI",Arial,sans-serif`;
  //ctx.font = `${Math.round(+fontSize * 0.72)}px "Ubuntu","Cantarell",Arial,sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, width / 2, height / 2);
  ctx.textAlign = 'left';
};