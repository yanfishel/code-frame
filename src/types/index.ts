import type { User } from '@clerk/nextjs/server';
import { E_BACKGROUND_TYPE, E_FRAME_STYLE } from '@/src/constants';


export type T_Store = {
  savingDebounce: ReturnType<typeof setTimeout> | null;
  abortController: AbortController | null;
  wantToSave: boolean;
  isSaved: boolean;
  savingError: string
  saving: boolean;
  rendering: boolean;
  fetching: boolean;
  settingsOpened: boolean;
  id: string;
  name: string;
  user: T_User | null;
  canvas: HTMLCanvasElement | null;
  code: string;
  html: string;
  flexBasisCode: string;
  flexBasisPreview: string;
  inputColor: string;
  inputBackground: string;
  codeSettings: T_CodeSettings;
  imageSettings: T_ImageSettings;
  previewImageData: T_ImageData | null;
  selectedSnippet: T_Snippet | null;
  selectSnippet: (snippet: T_Snippet | null, render?: boolean) => void;
  setUser: (user: T_User | null) => void;
  setSettings: (
    section: string,
    key: string,
    val: boolean | string | number | T_Theme | T_Cords | T_Background | T_Gradient | T_FrameStyle
  ) => void;
  setTheme: (theme: T_Theme) => void;
  setCanvas: (canvas: HTMLCanvasElement) => void;
  setHtml: (html: string) => void;
  renderImage: () => void;
  resetCodeSettings: () => void;
  resetImageSettings: () => void;
  resetToStart: () => void;
  saveSnippet:() => Promise<void>;
};


export type T_StoreData = {
  id: string;
  name: string;
  code: string;
  html: string;
  user: T_User | null;
  codeSettings: T_CodeSettings;
  imageSettings: T_ImageSettings;
  inputBackground: string;
  inputColor: string;
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

export type T_SnippetData = {
  id:string;
  name: string
  userId: string
  content?: string
  createdAt: string
  updatedAt: string
}

export type T_Snippet = {
  id:string;
  name: string
  code: string
  html: string
  inputColor: string
  inputBackground: string
  codeSettings: T_CodeSettings
  imageSettings: T_ImageSettings
}

export type T_User = {
  userId: string;
  name: string;
  email: string;
  imageUrl: string;
}

export type T_RequestBodyWithAuth<T> = {
    user: User & T_User
    params?: Promise<T>
}