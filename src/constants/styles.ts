
export const ROUNDED_SWITCH_STYLES = {
  body: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start' },
  label: { fontSize: '12px', lineHeight: '1.3', fontWeight: 500, marginBottom: '3px' },
};

export const SLIDER_STYLES = { markLabel: { fontSize: '9px', marginTop: '-4px', opacity: 0.5 } };

export const COLOR_SWATCH_STYLES = {
  root: { cursor: 'pointer' },
  alphaOverlay: { borderRadius: 'var(--mantine-radius-sm)' },
  shadowOverlay: { borderRadius: 'var(--mantine-radius-sm)' },
  colorOverlay: { borderRadius: 'var(--mantine-radius-sm)' },
}

export const COLOR_SWATCH_TRANSPARENT = {
  root: { height:'36px', width:'160px',minWidth:'160px', margin: 'auto' },
  alphaOverlay: { borderRadius: 'var(--mantine-radius-sm)' },
  shadowOverlay: { borderRadius: 'var(--mantine-radius-sm)' },
  colorOverlay: { borderRadius: 'var(--mantine-radius-sm)', background: 'url(/images/transparent-bg.jpg)' },
}

export const COLOR_INPUT_STYLES = {
  root: { cursor: 'pointer', display: 'flex', flexDirection: 'column' },
  label: { marginBottom: '4px', lineHeight: '1.2' },
}

export const ANGLE_STYLES = {
  mark: {
    top: '8px',
    bottom: '8px',
    color: 'var(--mantine-color-gray-5)',
    ['&::after']: "{margin-top:5px !important}",
    '--mantine-font-size-xs': '9px',
  },
};