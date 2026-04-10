import { createJSONStorage, persist } from 'zustand/middleware';
import { createWithEqualityFn } from 'zustand/traditional';
import { BASE_STORE, DEFAULT_STORE, DEFAULT_THEME } from '@/src/constants';
import { T_Store, T_Theme } from '@/src/types';
import { mapStore, renderImage } from '@/src/util';


export const useStore = createWithEqualityFn<T_Store>()(
  persist(
    (set, get) => ({
      ...(DEFAULT_STORE as T_Store),

      selectSnippet: (snippet, render = false) => {
        if (!snippet) {
          set({ ...BASE_STORE, code: '' });
        } else {
          set({
            id: snippet.id,
            name: snippet.name,
            selectedSnippet: snippet,
            html: snippet.html,
            code: snippet.code, // Trigger RenderImage
            codeSettings: snippet.codeSettings,
            imageSettings: snippet.imageSettings,
          });
        }
        if (render) {
          get().renderImage();
        }
      },

      setUser: (user) => {
        if (user && user.userId === get().user?.userId) {
          return;
        }
        set({ user });
      },

      setSettings: (section, key, val) => {
        const { codeSettings, imageSettings, renderImage } =
          get();

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
        set({ canvas });
      },

      setHtml: (html) => {
        const { renderImage } = get();
        set({ html, rendering: true });
        renderImage();
      },

      renderImage: () => {
        const { canvas, html, imageSettings, codeSettings, selectedSnippet, isSaved, saveSnippet } = get();

        if (!canvas || !html) {
          set({ rendering: false });
          return;
        }

        const previewImageData = renderImage({ canvas, html, imageSettings, codeSettings });

        set({
          isSaved: false,
          fetching: false,
          rendering: false,
          previewImageData,
        });
        if (selectedSnippet && !isSaved) {
          console.log(isSaved);
          saveSnippet();
        }
      },

      resetCodeSettings: () => {
        set({
          codeSettings: DEFAULT_STORE.codeSettings,
          inputColor: DEFAULT_THEME?.fg ?? '',
          inputBackground: DEFAULT_THEME?.bg ?? '',
          rendering: true,
        });
        get().renderImage();
      },

      resetImageSettings: () => {
        set({
          imageSettings: DEFAULT_STORE.imageSettings,
          rendering: true,
        });
        get().renderImage();
      },

      resetToStart: () => {
        set({
          ...DEFAULT_STORE,
          rendering: true,
          savingError: '',
        });
      },

      saveSnippet: async () => {
        const store = get();
        if (!store.id || !store.user) {
          return;
        }
        if (store.savingDebounce) {
          clearTimeout(store.savingDebounce);
        }
        set({ saving: true, savingError: '' });
        if (store.abortController) {
          store.abortController.abort();
        }
        const abortController = new AbortController();
        const signal = abortController.signal;
        const savingDebounce = setTimeout(async () => {
          const data = mapStore(store);
          try {
            const res = await fetch(`/api/snippets/${data.id}`, {
              method: 'POST',
              body: JSON.stringify(data),
              signal,
            });
            if (res.ok) {
              set({ isSaved: true });
            }
          } catch (error:any) {
            if (error.name === 'AbortError') {
              return;
            }
            set({  isSaved: false, savingError: 'Saving failed!' });
          } finally {
            set({ saving: false, abortController: null, savingDebounce: null });
          }

        }, 300);
        set({ savingDebounce, abortController });
      }

    }),
    {
      name: 'store-code-frame',
      storage: createJSONStorage(() => sessionStorage),
      version: 2,
      partialize: (state) => ({
        ...state,
        ...{
          savingDebounce: null,
          abortController: null,
          isSaved: true,
          saving: false,
          settingsOpened: false,
          fetching: false,
          canvas: null,
          user: null,
          savingError: '',
          previewImageData: DEFAULT_STORE.previewImageData,
          flexBasisCode: DEFAULT_STORE.flexBasisCode,
          flexBasisPreview: DEFAULT_STORE.flexBasisPreview,
        },
      }),
    }
  )
);
