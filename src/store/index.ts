import { createWithEqualityFn } from 'zustand/traditional';
import { DEFAULT_STORE, FONTS } from '@/src/constants';
import { T_Store, T_Theme, T_Token } from '@/src/types';
import { adjust, canvasToPng, computeCorners, drawBrowser, drawIntoQuad, rrect } from '@/src/util';


export const useStore = createWithEqualityFn<T_Store>()((set, get) => ({

  ...DEFAULT_STORE as T_Store,

  selectTheme: (theme: T_Theme) => {
    set({
      theme,
      inputColor: theme?.fg ?? '',
      inputBackground: theme?.bg ?? '',
      selectThemeOpened: false,
    });
  },

  parseTokens: () => {
    const { html, theme } = get();
    const div = document.createElement('div');
    div.innerHTML = html;
    const out: T_Token[] = [];
    function walk(node: ChildNode | HTMLElement | HTMLDivElement | HTMLSpanElement, color: string) {
      if (node.nodeType === 3) {
        if (node.textContent) {
          out.push({ text: node.textContent, color });
        }
        return;
      }
      if (node.nodeType !== 1) {
        return;
      }
      let c = color;

      for (const cl of 'classList' in node ? node.classList : []) {
        if (cl !== 'token') {
          const key = cl as keyof typeof theme;
          c = theme && theme[key] ? theme[key] : color;
          break;
        }
      }

      for (const ch of node.childNodes) {
        walk(ch, c);
      }
    }
    walk(div, theme?.fg ?? '#abb2bf');
    return out;
  },

  buildLines: () => {
    const { parseTokens } = get();
    const tokens = parseTokens();

    const lines: [T_Token[]] = [[]];
    for (const t of tokens) {
      const parts = t.text.split('\n');
      for (let i = 0; i < parts.length; i++) {
        if (i > 0) {
          lines.push([]);
        }
        const s = parts[i].replace(/\t/g, '    ');
        if (s) {
          lines[lines.length - 1].push({ text: s, color: t.color });
        }
      }
    }
    return lines;
  },

  renderCode: () => {
    const {
      theme,
      fontFamily,
      fontSize,
      lineHeight,
      showNumbers,
      lineNumbers,
      frameStyle,
      buildLines,
      innerPadding,
      cornerRadius,
    } = get();

    const fontStr = `${fontSize}px "${FONTS[fontFamily as keyof typeof FONTS]}", monospace`;
    const lh = Math.round(+fontSize * +lineHeight);
    const browserH = frameStyle === 'none' ? 0 : Math.round(+fontSize * 2.3);

    const lines = buildLines();
    if(lines.length < 2 && lines[0].length < 1){
      return null
    }

    const canvas = document.createElement('canvas').getContext('2d');
    if (!canvas) {
      throw new Error(
        'Could not create canvas context. ' +
          'This is likely due to a browser security restriction. ' +
          'Try using a different browser or enabling canvas in your browser settings.'
      );
    }
    canvas.font = fontStr;
    const lineNoW = showNumbers ? canvas.measureText(`${String(lines.length)} `).width : 0;

    let maxLineW = 0;
    for (const line of lines) {
      let w = lineNoW;
      for (const t of line) {
        w += canvas.measureText(t.text).width;
      }
      maxLineW = Math.max(maxLineW, w);
    }

    const contentW = Math.max(maxLineW, 200);
    const contentH = lines.length * lh;
    const totalW = Math.ceil(contentW + innerPadding * 2);
    const totalH = Math.ceil(contentH + innerPadding * 2 + browserH);

    const off = document.createElement('canvas');
    off.width = totalW;
    off.height = totalH;
    const ctx = off.getContext('2d');
    if (!ctx) {
      throw new Error(
        'Could not create canvas context. ' +
          'This is likely due to a browser security restriction. ' +
          'Try using a different browser or enabling canvas in your browser settings.'
      );
    }
    if (cornerRadius > 0) {
      // Clip rounded rect
      rrect(ctx, 0, 0, totalW, totalH, cornerRadius);
      ctx.clip();
    }

    // Background
    ctx.fillStyle = theme?.bg ?? '#282c34';
    ctx.fillRect(0, 0, totalW, totalH);

    // Browser Window
    drawBrowser(ctx, totalW, browserH, theme, fontSize, innerPadding, frameStyle);

    // Selection highlight
    /*if (selectionRange && selectionRange.start !== selectionRange.end) {
      const rawLines = (state.code || '').split('\n');
      function offsetToLC(offset) {
        let rem = offset;
        for (let i = 0; i < rawLines.length; i++) {
          if (rem <= rawLines[i].length) return { l: i, c: rem };
          rem -= rawLines[i].length + 1;
        }
        return { l: rawLines.length - 1, c: rawLines[rawLines.length - 1].length };
      }
      const s = offsetToLC(selectionRange.start);
      const e = offsetToLC(selectionRange.end);
      ctx.font = fontStr;
      const [sr, sg, sb] = hexRgb(state.selectionColor);
      ctx.fillStyle = `rgba(${sr},${sg},${sb},${state.selectionOpacity / 100})`;
      for (let li = s.l; li <= e.l && li < lines.length; li++) {
        const raw = rawLines[li] || '';
        const cS = li === s.l ? s.c : 0;
        const cE = li === e.l ? e.c : raw.length;
        const pre = raw.slice(0, cS).replace(/\t/g, '    ');
        const sel = raw.slice(cS, cE).replace(/\t/g, '    ');
        const xOff = ctx.measureText(pre).width;
        const xW = sel.length ? ctx.measureText(sel).width : ctx.measureText(' ').width;
        ctx.fillRect(
          innerPadding + lineNoW + xOff,
          innerPadding + chromeH + li * lh - Math.round((fontSize + 1) / 5.5),
          xW,
          lh
        );
      }
    }*/

    ctx.font = fontStr;
    ctx.textBaseline = 'top';
    let y = innerPadding + browserH;
    for (let li = 0; li < lines.length; li++) {
      let x = innerPadding;
      if (showNumbers) {
        const numbers = lineNumbers.split('\n');
        ctx.fillStyle = theme ? adjust(theme.fg, -60) : '#abb2bf';
        const number = `${String(numbers[li]).padStart(String(numbers[numbers.length - 1]).length, ' ')}`;
        ctx.fillText(number, x, y);
        x += lineNoW;
      }

      const lineTokens = lines[li];

      for (const t of lineTokens) {
        ctx.fillStyle = t.color;
        ctx.fillText(`${showNumbers ? ' ' : ''}${t.text}`, x, y);
        x += ctx.measureText(t.text).width;
      }
      y += lh;
    }

    return off;
  },

  renderBackground: (ctx, w, h) => {
    const { backgroundType, backgroundSolid, gradient } = get();
    if (backgroundType === 'none') {
      return;
    }
    if (backgroundType === 'solid') {
      ctx.fillStyle = backgroundSolid;
      ctx.fillRect(0, 0, w, h);
    } else {
      const rad = (Number(gradient[2]) * Math.PI) / 180;
      const dx = -Math.cos(-rad),
        dy = Math.sin(rad);
      const g = ctx.createLinearGradient(
        w / 2 - (dx * w) / 2,
        h / 2 - (dy * h) / 2,
        w / 2 + (dx * w) / 2,
        h / 2 + (dy * h) / 2
      );
      g.addColorStop(0, String(gradient[0]));
      g.addColorStop(1, String(gradient[1]));
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    }
  },

  renderImage: (canvas) => {
    const {
      renderCode,
      renderBackground,
      outerPadding,
      showShadow,
      shadowBlur,
      shadowColor,
      shadowOffset,
      shadowOpacity,
      windowOpacity,
    } = get();

    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error(
        'Could not create canvas context. ' +
          'This is likely due to a browser security restriction. ' +
          'Try using a different browser or enabling canvas in your browser settings.'
      );
    }

    const off = renderCode();
    if(!off) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      set({
        canvas: null,
        previewImageData: null
      })
      return
    }

    // Lock canvas size to unzoomed dimensions so background is unaffected
    const baseW = off.width;
    const baseH = off.height;

    // Scale code block only
    /*if (state.zoom !== 100) {
      const scale = state.zoom / 100;
      const zoomed = document.createElement('canvas');
      zoomed.width  = Math.round(off.width  * scale);
      zoomed.height = Math.round(off.height * scale);
      zoomed.getContext('2d').drawImage(off, 0, 0, zoomed.width, zoomed.height);
      off = zoomed;
    }*/

    // Apply gradient blur before perspective
    /*if (state.gradBlur) {
      off = applyGradientBlur(off, state.gradBlurDir, state.gradBlurAmount, state.gradBlurStart);
    }*/

    const iw = off.width,
      ih = off.height;
    const op = outerPadding;
    const cW = baseW + op * 2; // fixed — background ignores zoom
    const cH = baseH + op * 2;

    canvas.width = cW;
    canvas.height = cH;

    ctx.clearRect(0, 0, cW, cH);
    renderBackground(ctx, cW, cH);

    const tZ = 0;
    const rX = 0;
    const rY = 0;
    const tL = 100;
    const tR = 100;
    const tT = 100;
    const tBot = 100;

    const corners = computeCorners(iw, ih, cW, cH, tZ, rX, rY, tL, tR, tT, tBot);

    // Shadow
    if (showShadow) {
      ctx.save();
      ctx.filter = `blur(${shadowBlur}px)`;
      ctx.globalAlpha = shadowOpacity / 100;
      ctx.fillStyle = shadowColor;
      ctx.beginPath();
      ctx.moveTo(corners[0].x + shadowOffset.x, corners[0].y + shadowOffset.y);
      for (let i = 1; i < 4; i++) {
        ctx.lineTo(corners[i].x + shadowOffset.x, corners[i].y + shadowOffset.y);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
      ctx.filter = 'none';
    }

    // Draw image
    const isFlat =
      tZ === 0 && rX === 0 && rY === 0 && tL === 100 && tR === 100 && tT === 100 && tBot === 100;
    ctx.save();
    ctx.globalAlpha = windowOpacity / 100;
    if (isFlat) {
      ctx.drawImage(off, op + (baseW - iw) / 2, op + (baseH - ih) / 2);
    } else {
      drawIntoQuad(ctx, off, corners);
    }
    ctx.restore();

    // Apply image filter over the full canvas
    /*const filterStr = buildFilterString(state.filter, state.filterIntensity);
    if (filterStr !== 'none') {
      const tmp = document.createElement('canvas');
      tmp.width = cW; tmp.height = cH;
      const tctx = tmp.getContext('2d');
      tctx.drawImage(canvas, 0, 0);
      ctx.clearRect(0, 0, cW, cH);
      ctx.filter = filterStr;
      ctx.drawImage(tmp, 0, 0);
      ctx.filter = 'none';
    }*/

    // Apply texture overlay
    //applyTexture(ctx, cW, cH, state.texture, state.textureIntensity);

    // Watermark
    /*if (showWatermark) {
      const wmText = 'github.com/Mansiper/CodeShot';
      const wmFontSize = Math.max(10, Math.round(cW * 0.015));
      ctx.save();
      ctx.font = `${wmFontSize}px "Segoe UI",Arial,sans-serif`;
      ctx.textBaseline = 'bottom';
      ctx.textAlign = 'right';
      ctx.globalAlpha = 0.35;
      ctx.fillStyle = '#ffffff';
      ctx.fillText(wmText, cW - 10, cH - 8);
      ctx.restore();
    }*/

    // Update preview display size
    //scaleCanvasDisplay();
    //document.getElementById('canvas-info').textContent = `${cW}×${cH}`;

    const pngDataUrl = canvasToPng(canvas);

    set({
      canvas,
      previewImageData: { ...pngDataUrl, width: cW, height: cH },
    });
  }

}));
