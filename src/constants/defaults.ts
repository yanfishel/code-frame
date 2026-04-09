import { FONTS, THEMES } from './code';
import { DEFAULT_SHADOW_COLOR, GRADIENTS, SOLID_COLORS } from './colors';
import { E_BACKGROUND_TYPE, E_FRAME_STYLE } from './enums';


export const DEFAULT_THEME = THEMES[0]

export const DEFAULT_WATERMARK = `codeframe.pro`

export const DEFAULT_LANG = 'typescript'

export const DEFAULT_CODE = `// Get a value of an interface property

interface MyInterface {
  id: number;
  name: string;
  properties: string[];
}

const myObject: MyInterface = {
  id: 1,
  name: 'foo',
  properties: ['a', 'b', 'c']
};

function getValue(value: keyof MyInterface) {
  return myObject[value];
}

getValue('id'); // => 1
getValue('count'); // => undefined`

export const DEFAULT_AREA_WIDTH = 'calc(50% - 3px)'

export const BASE_STORE = {
  wantToSave: false,
  isSaved: false,
  isReady: false,
  settingsOpened: false,
  fetching: false,
  rendering: false,
  selectedSnippet: null,
  flexBasisCode: DEFAULT_AREA_WIDTH,
  flexBasisPreview: DEFAULT_AREA_WIDTH,
  id: '',
  name: '',
  previewImageData: null,
  inputColor: DEFAULT_THEME.fg,
  inputBackground: DEFAULT_THEME.bg,
  html: ''
}


export const DEFAULT_STORE = {
  ...BASE_STORE,

  canvas: null,
  code: '', //DEFAULT_CODE
  user: null,

  codeSettings: {
    lang: DEFAULT_LANG,
    theme: THEMES[0],
    showNumbers: false,
    lineNumbers: '',
    fontSize: '13',
    lineHeight: '1.4',
    fontFamily: Object.keys(FONTS)[0],
  },
  imageSettings: {
    frameStyle: E_FRAME_STYLE.MACOS,
    innerPadding: 20,
    outerPadding: 40,
    cornerRadius: 8,
    showShadow: true,
    shadowBlur: 10,
    shadowColor: DEFAULT_SHADOW_COLOR,
    shadowOffset: { x: 0, y: 0 },
    shadowOpacity: 65,
    backgroundType: E_BACKGROUND_TYPE.SOLID,
    backgroundSolid: SOLID_COLORS[0][0],
    gradient: GRADIENTS[0],
    windowOpacity: 100,
    showWatermark: true,
    watermark: DEFAULT_WATERMARK,
  },
};