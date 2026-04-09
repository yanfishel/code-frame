import { createJSONStorage, persist } from 'zustand/middleware';
import { createWithEqualityFn } from 'zustand/traditional';
import { BASE_STORE, DEFAULT_STORE, DEFAULT_THEME } from '@/src/constants';
import { T_Store, T_Theme } from '@/src/types';
import { renderImage } from '@/src/util';


export const useStore = createWithEqualityFn<T_Store>()(
  persist(
    (set, get) => ({
      ...(DEFAULT_STORE as T_Store),

      selectSnippet: (snippet) => {
        const {renderImage} = get();
        if(!snippet){
          set({ ...BASE_STORE, code: '' })
        } else {
          set({
            isReady: false,
            isSaved: true,
            id: snippet.id,
            name: snippet.name,
            selectedSnippet: snippet,
            html: snippet.html,
            code: snippet.code,
            codeSettings: snippet.codeSettings,
            imageSettings: snippet.imageSettings,
          });
        }
        renderImage();
      },

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
              inputBackground: (val as T_Theme)?.bg ?? '',
            });
          } else {
            set({
              codeSettings: {
                ...codeSettings,
                [key]: val,
              },
            });
          }
        } else if (section === 'image') {
          set({
            imageSettings: {
              ...imageSettings,
              [key]: val,
            },
          });
        } else if (section === 'root') {
          set({ [key]: val });
        }

        renderImage();
      },

      setCanvas: (canvas) => {
        set({ canvas, rendering: true });
        get().renderImage();
      },

      setHtml: (html) => {
        set({ html, rendering: true });
        get().renderImage();
      },

      renderImage: () => {
        const { isReady, isSaved, canvas, html, imageSettings, codeSettings, fetching } = get();

        if (!canvas || !html || html === '<br>' || fetching) {
          set({
            isReady: true,
            rendering: false,
            isSaved: true,
          });
          return;
        }
        console.log(isReady, isSaved);
        const previewImageData = renderImage({ canvas, html, imageSettings, codeSettings });

        set({
          isReady: true,
          rendering: false,
          previewImageData,
          isSaved: !isReady ? isSaved : false,
        })
      },

      resetCodeSettings: () => {
        set({
          codeSettings: DEFAULT_STORE.codeSettings,
          inputColor: DEFAULT_THEME?.fg ?? '',
          inputBackground: DEFAULT_THEME?.bg ?? '',
          isSaved: false,
          rendering: true,
        });
        get().renderImage();
      },

      resetImageSettings: () => {
        set({
          imageSettings: DEFAULT_STORE.imageSettings,
          isSaved: false,
          rendering: true,
        });
        get().renderImage();
      },

      resetToStart: () => {
        set({
          ...DEFAULT_STORE,
          rendering: true,
        });
        get().renderImage();
      }

    }),
    {
      name: 'store-code-frame',
      storage: createJSONStorage(() => sessionStorage),
      version: 2,
      partialize: (state) => ({
        ...state,
        ...{
          settingsOpened: false,
          fetching: false,
          canvas: null,
          user: null,
          isReady: false,
          previewImageData: DEFAULT_STORE.previewImageData,
          flexBasisCode: DEFAULT_STORE.flexBasisCode,
          flexBasisPreview: DEFAULT_STORE.flexBasisPreview,
        },
      }),
    }
  )
);
