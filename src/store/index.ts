import { createJSONStorage, persist } from 'zustand/middleware';
import { createWithEqualityFn } from 'zustand/traditional';
import { DEFAULT_STORE, DEFAULT_THEME, FONTS } from '@/src/constants';
import { E_BACKGROUND_TYPE } from '@/src/constants/enums';
import { T_Store, T_Theme, T_Token } from '@/src/types';
import { adjust, calculateCorners, canvasToPng, drawBrowser, isDark, rrect } from '@/src/util';


export const useStore = createWithEqualityFn<T_Store>()(
  persist(
    (set, get) => ({
      ...(DEFAULT_STORE as T_Store),

      setUser: (user) => {
        if (user && user.userId === get().user?.userId) {
          return;
        }
        set({ user });
      },

      setSettings: (section, key, val) => {
        const { codeSettings, imageSettings, renderImage } = get();
        if (section === 'code') {
          if (key === 'theme') {
            set({
              codeSettings: {
                ...codeSettings,
                theme: val as T_Theme,
              },
              inputColor: (val as T_Theme)?.fg ?? '',
              inputBackground: (val as T_Theme)?.bg ?? ''
            });
          } else {
            set({
              codeSettings: {
                ...codeSettings,
                [key]: val,
              }
            });
          }
        } else if (section === 'image') {
          set({
            imageSettings: {
              ...imageSettings,
              [key]: val,
            }
          });
        } else if(section === 'root') {
          set({
            [key]: val
          })
        }

        renderImage();
      },

      parseTokens: () => {
        const { html, codeSettings } = get();
        const { theme } = codeSettings;
        const div = document.createElement('div');
        div.innerHTML = html;
        const out: T_Token[] = [];
        function walk(
          node: ChildNode | HTMLElement | HTMLDivElement | HTMLSpanElement,
          color: string
        ) {

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
            if (cl !== 'token' && !cl.startsWith('literal-')) {
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
        const { buildLines, codeSettings, imageSettings } = get();
        const { theme, fontFamily, fontSize, lineHeight, showNumbers, lineNumbers } = codeSettings;
        const { frameStyle, innerPadding, cornerRadius } = imageSettings;

        const fontStr = `${fontSize}px "${FONTS[fontFamily as keyof typeof FONTS]}", monospace`;
        const lh = Math.round(+fontSize * +lineHeight);
        const browserH = frameStyle === 'none' ? 0 : Math.round(+fontSize * 2.3);

        const lines = buildLines();
        if (lines.length < 2 && lines[0].length < 1) {
          return null;
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
        const { imageSettings } = get();
        const { backgroundType, backgroundSolid, gradient } = imageSettings;

        if (backgroundType === E_BACKGROUND_TYPE.NONE) {
          return;
        }
        if (backgroundType === E_BACKGROUND_TYPE.SOLID) {
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

      renderGradientBlur: (direction, gradientBlur, startPercent, steps = 18) => {
        const { canvas } = get();
        if (gradientBlur <= 0 || !canvas) {
          return;
        }
        const dst = document.createElement('canvas');
        dst.width = canvas.width;
        dst.height = canvas.height;
        const W = canvas.width,
          H = canvas.height;
        const start = startPercent / 100;
        const ctx = dst.getContext('2d');
        if (!ctx) {
          throw new Error('Failed to get canvas context');
        }
        for (let i = 0; i < steps; i++) {
          const t = i / (steps - 1); // 0→1 along gradient
          const tAdj = Math.max(0, (t - start) / (1 - start)); // clamp before start
          const blur = tAdj * gradientBlur;

          ctx.save();
          ctx.filter = blur > 0 ? `blur(${blur.toFixed(1)}px)` : 'none';
          ctx.beginPath();
          if (direction === 'right') {
            const x0 = (i / steps) * W,
              x1 = ((i + 1) / steps) * W;
            ctx.rect(x0, 0, x1 - x0 + 1, H);
          } else if (direction === 'left') {
            const x0 = (1 - (i + 1) / steps) * W,
              x1 = (1 - i / steps) * W;
            ctx.rect(x0, 0, x1 - x0 + 1, H);
          } else if (direction === 'bottom') {
            const y0 = (i / steps) * H,
              y1 = ((i + 1) / steps) * H;
            ctx.rect(0, y0, W, y1 - y0 + 1);
          } else {
            const y0 = (1 - (i + 1) / steps) * H,
              y1 = (1 - i / steps) * H;
            ctx.rect(0, y0, W, y1 - y0 + 1);
          }
          ctx.clip();
          ctx.drawImage(canvas, 0, 0);
          ctx.restore();
        }
        return dst;
      },

      renderShadow: (ctx, corners) => {
        const { imageSettings } = get();
        const { shadowBlur, shadowColor, shadowOffset, shadowOpacity } = imageSettings;

        ctx.save();
        ctx.filter = `blur(${shadowBlur}px)`;
        ctx.globalAlpha = shadowOpacity / 100;
        ctx.fillStyle = shadowColor;
        ctx.beginPath();
        ctx.moveTo(shadowOffset.x + corners[0].x, shadowOffset.y + corners[0].y);
        for (let i = 1; i < 4; i++) {
          ctx.lineTo(corners[i].x + shadowOffset.x, corners[i].y + shadowOffset.y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
        ctx.filter = 'none';
      },

      renderWatermark: (ctx: CanvasRenderingContext2D, canvasW: number, canvasH: number) => {
        const { imageSettings } = get();
        const { backgroundType, backgroundSolid, gradient, watermark } = imageSettings;

        let color;
        switch (backgroundType) {
          case 'solid':
            color = isDark(backgroundSolid) ? '#ffffff' : '#000000';
            break;
          case 'gradient':
            color = isDark(`${gradient[0]}`) && isDark(`${gradient[1]}`) ? '#ffffff' : '#000000';
            break;
          default:
            color = '#000000';
            break;
        }
        ctx.save();
        ctx.font = `${10}px "Segoe UI",Arial,sans-serif`;
        ctx.textBaseline = 'bottom';
        ctx.textAlign = 'right';
        ctx.globalAlpha = 0.25;
        ctx.fillStyle = color;
        ctx.fillText(watermark, canvasW - 10, canvasH - 8);
        ctx.restore();
      },

      renderImage: () => {
        const {
          isReady,
          canvas,
          renderWatermark,
          renderCode,
          renderBackground,
          renderShadow,
          imageSettings,
        } = get();
        const { watermark, showWatermark, showShadow, windowOpacity, outerPadding } = imageSettings;

        if (!canvas) {
          return;
        }

        const ctx = canvas.getContext('2d');

        if (!ctx) {
          throw new Error(
            'Could not create canvas context. ' +
              'This is likely due to a browser security restriction. ' +
              'Try using a different browser or enabling canvas in your browser settings.'
          );
        }

        const off = renderCode();

        if (!off) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          set({
            previewImageData: null,
            isSaved: !isReady,
          });
          return;
        }
        const baseW = off.width;
        const baseH = off.height;

        const iw = off.width,
          ih = off.height;
        const cW = baseW + outerPadding * 2; // fixed — background ignores zoom
        const cH = baseH + outerPadding * 2;

        canvas.width = cW;
        canvas.height = cH;

        ctx.clearRect(0, 0, cW, cH);
        renderBackground(ctx, cW, cH);

        const corners = calculateCorners(iw, ih, cW, cH);

        // Shadow
        if (showShadow) {
          renderShadow(ctx, corners);
        }

        // Draw image
        ctx.save();
        ctx.globalAlpha = windowOpacity / 100;
        ctx.drawImage(off, outerPadding + (baseW - iw), outerPadding + (baseH - ih));

        ctx.restore();

        // Watermark
        if (showWatermark && watermark) {
          renderWatermark(ctx, cW, cH);
        }

        const pngDataUrl = canvasToPng(canvas);

        set({
          previewImageData: { ...pngDataUrl, width: cW, height: cH },
          isSaved: !isReady,
        });
      },

      resetCodeSettings: () => {
        set({
          codeSettings: DEFAULT_STORE.codeSettings,
          inputColor: DEFAULT_THEME?.fg ?? '',
          inputBackground: DEFAULT_THEME?.bg ?? '',
          isSaved: false,
        });
        get().renderImage();
      },

      resetImageSettings: () => {
        set({
          imageSettings: DEFAULT_STORE.imageSettings,
          isSaved: false,
        });
        get().renderImage();
      },

      htmlUpdated: (html) => {
        set({ html });
        get().renderImage();
      },

      canvasUpdated: (canvas) => {
        set({ canvas });
        get().renderImage();
      },
    }),
    {
      name: 'store-code-frame',
      storage: createJSONStorage(() => sessionStorage),
      version: 1,
      partialize: (state) => ({
        ...state,
        ...{
          canvas: null,
          html: '',
          user: null,
          isReady: false,
          isSaved: true,
          previewImageData: null,
        },
      }),
    }
  )
);
