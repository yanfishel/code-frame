import { FONTS, THEMES } from '@/src/constants/code';
import { DEFAULT_SHADOW_COLOR, GRADIENTS, SOLID_COLORS } from '@/src/constants/colors';
import { E_BACKGROUND_TYPE, E_FRAME_STYLE } from '@/src/constants/enums';


export const DEFAULT_THEME = THEMES.find((theme) => theme.theme_name === 'One Dark') ?? null;

export const DEFAULT_WATERMARK = `codeframe.pro`;

export const DEFAULT_LANG = 'typescript';

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
getValue('count'); // => undefined`;



export const FIELDS_TO_SAVE = [
  'code',
  'codeSettings',
  'imageSettings',
  'flexBasisCode',
  'flexBasisPreview',
  'inputBackground',
  'inputColor',
  'isSaved'
];



export const DEFAULT_STORE = {
  wantToSave: false,
  isSaved: true,
  isReady: false,
  settingsOpened: false,
  userId: '',
  snippetId: '',

  flexBasisCode: 'calc(50% - 3px)',
  flexBasisPreview: 'calc(50% - 3px)',

  canvas: null,
  html: '',
  code: DEFAULT_CODE,
  user: null,

  codeSettings: {
    lang: DEFAULT_LANG,
    theme: THEMES.find((theme) => theme.theme_name === 'One Dark') ?? null,
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

  inputColor: DEFAULT_THEME?.fg ?? '',
  inputBackground: DEFAULT_THEME?.bg ?? '',

  previewImageData: null,
};