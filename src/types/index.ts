import { E_BACKGROUND_TYPE, E_FRAME_STYLE } from '@/src/constants';


export type T_Store = {
  wantToSave: boolean;
  isSaved: boolean;
  isReady: boolean;
  userId: string;
  snippetId: string;
  settingsOpened: boolean;

  flexBasisCode: string;
  flexBasisPreview: string;

  canvas: HTMLCanvasElement | null;
  code: string;
  html: string;
  user: T_User | null;

  /*lang: string;
  theme: T_Theme | null;
  showNumbers: boolean;
  lineNumbers: string;
  fontSize: string;
  fontFamily: string;
  lineHeight: string;*/

  inputColor: string;
  inputBackground: string;

  /*frameStyle: string;
  innerPadding: number;
  outerPadding: number;
  cornerRadius: number;
  showShadow: boolean;
  shadowBlur: number;
  shadowColor: string;
  shadowOffset: T_Cords;
  shadowOpacity: number;
  backgroundType: T_Background;
  backgroundSolid: string;
  gradient: T_Gradient;
  windowOpacity: number;
  watermark: string;*/

  codeSettings: T_CodeSettings;
  imageSettings: T_ImageSettings;
  previewImageData: T_ImageData | null;

  setUser: (user: T_User|null) => void;

  setSettings: (
    section: string,
    key: string,
    val: boolean | string | number | T_Theme | T_Cords | T_Background | T_Gradient | T_FrameStyle
  ) => void;

  selectTheme: (theme: T_Theme) => void;
  canvasUpdated: (canvas: HTMLCanvasElement) => void;
  parseTokens: () => T_Token[];
  buildLines: () => [T_Token[]];
  renderBackground: (ctx: CanvasRenderingContext2D, w: number, h: number) => void;
  renderGradientBlur: (
    direction: string,
    gradientBlur: number,
    startPercent: number,
    steps: number
  ) => void;
  renderShadow: (ctx: CanvasRenderingContext2D, corners: T_Cords[]) => void;
  renderCode: () => HTMLCanvasElement | null;
  renderImage: () => void;
  renderWatermark: (ctx: CanvasRenderingContext2D, canvasW: number, canvasH: number) => void;
  htmlUpdated: (html: string) => void;
  resetCodeSettings: () => void;
  resetImageSettings: () => void;
};


export type T_CodeSettings = {
  lang: string;
  theme: T_Theme | null;
  showNumbers: boolean;
  lineNumbers: string;
  fontSize: string;
  fontFamily: string;
  lineHeight: string;
};

export type T_ImageSettings = {
  frameStyle: T_FrameStyle;
  innerPadding: number;
  outerPadding: number;
  cornerRadius: number;
  showShadow: boolean;
  shadowBlur: number;
  shadowColor: string;
  shadowOffset: T_Cords;
  shadowOpacity: number;
  backgroundType: T_Background;
  backgroundSolid: string;
  gradient: T_Gradient;
  windowOpacity: number;
  showWatermark: boolean;
  watermark: string;
};


export type T_Background = `${E_BACKGROUND_TYPE}`;

export type T_FrameStyle = `${E_FRAME_STYLE}`;

export type T_Gradient = (string | number)[];

export type T_Token = { text: string; color: string };

export type T_Cords = { x: number; y: number }

export type T_ImageData = { blob: Blob; base64: string; width: number; height: number }

export type T_Theme = {
  theme_name: string;
  class_name: string;
  bg: string;
  fg: string;
  keyword: string;
  string: string;
  number: string;
  comment: string;
  function: string;
  title: string;
  built_in: string;
  type: string;
  class: string;
  attr: string;
  tag: string;
  name: string;
  operator: string;
  literal: string;
  variable: string;
  property: string;
  punctuation: string;
  params: string;
  meta: string;
  regexp: string;
  selector: string;
  subst: string;
  symbol: string;
  link: string;
};

export type T_Snippet = {
  id:string;
  name: string
  userId: string
  createdAt: string
  updatedAt: string
}

export type T_User = {
  id: string;
  userId: string;
  name: string;
  email: string;
  imageUrl: string;
}