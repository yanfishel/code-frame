import { FONTS, THEMES } from '@/src/constants/code';
import { DEFAULT_SHADOW_COLOR, GRADIENTS, SOLID_COLORS } from '@/src/constants/colors';


export const DEFAULT_THEME = THEMES.find((theme) => theme.theme_name === 'One Dark') ?? null;

export const DEFAULT_WATERMARK = `codeframe.pro`;

export const DEFAULT_STORE = {
  isSaved: true,

  userId: '',
  snippetId: '',

  canvas: null,
  html: '',
  lang: 'typescript',
  code: '',
  theme: THEMES.find((theme) => theme.theme_name === 'One Dark') ?? null,
  showNumbers: false,
  lineNumbers: '',
  fontSize: '13',
  lineHeight: '1.4',
  fontFamily: Object.keys(FONTS)[0],
  inputColor: DEFAULT_THEME?.fg ?? '',
  inputBackground: DEFAULT_THEME?.bg ?? '',

  flexBasisCode: 'calc(50% - 3px)',
  flexBasisPreview: 'calc(50% - 3px)',

  settingsOpened: false,

  frameStyle: 'macos',
  innerPadding: 20,
  outerPadding: 40,
  cornerRadius: 8,
  showShadow: true,
  shadowBlur: 10,
  shadowColor: DEFAULT_SHADOW_COLOR,
  shadowOffset: { x: 0, y: 0 },
  shadowOpacity: 65,
  backgroundType: 'solid',
  backgroundSolid: SOLID_COLORS[0][0],
  gradient: GRADIENTS[0],
  windowOpacity: 100,
  watermark: DEFAULT_WATERMARK,
  previewImageData: null,
};


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
  'backgroundSolid',
  'backgroundType',
  'code',
  'cornerRadius',
  'flexBasisCode',
  'flexBasisPreview',
  'fontFamily',
  'fontSize',
  'frameStyle',
  'innerPadding',
  'inputBackground',
  'inputColor',
  'isSaved',
  'lang',
  'lineHeight',
  'lineNumbers',
  'outerPadding',
  'shadowBlur',
  'shadowColor',
  'shadowOpacity',
  'showNumbers',
  'showShadow',
  'watermark',
  'gradient',
  'shadowOffset',
  'theme',
];
