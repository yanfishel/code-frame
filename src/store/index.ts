import { v4 as uuid } from 'uuid';
import { createJSONStorage, persist } from 'zustand/middleware';
import { createWithEqualityFn } from 'zustand/traditional';
import { BASE_STORE, DEFAULT_STORE, DEFAULT_THEME } from '@/src/constants';
import { createSnippet, saveSnippet } from '@/src/services';
import { T_Store, T_Theme } from '@/src/types';
import { isPlainObject, mapStore, renderImage } from '@/src/util';


export const useStore = createWithEqualityFn<T_Store>()(
  persist(
    (set, get) => ({
      ...(DEFAULT_STORE as T_Store),

      selectSnippet: (snippet) => {
        if (!snippet) {
          set({ ...BASE_STORE, fetching: false });
        } else {
          set({
            id: '',
            name: snippet.name,
            selectedSnippet: snippet,
            editableSnippet: null,
            html: snippet.html,
            code: snippet.code,
            codeSettings: snippet.codeSettings,
            imageSettings: snippet.imageSettings,
            inputColor: snippet.codeSettings.theme?.fg ?? '',
            inputBackground: snippet.codeSettings.theme?.bg ?? '',
          });
        }
        get().renderImage(true);
      },

      editSnippet: (snippet, silent = false) => {
        if (!snippet) {
          set({ ...BASE_STORE, fetching: false });
        } else {
          set({
            isSaved: true,
            id: snippet.id,
            name: snippet.name,
            selectedSnippet: null,
            editableSnippet: snippet,
            html: snippet.html,
            code: snippet.code,
            codeSettings: snippet.codeSettings,
            imageSettings: snippet.imageSettings,
            inputColor: snippet.codeSettings.theme?.fg ?? '',
            inputBackground: snippet.codeSettings.theme?.bg ?? '',
          });
        }
        if (!silent) {
          get().renderImage(true);
        }
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
          if (key === 'as-store-object' && isPlainObject(val)) {
            set(val as Partial<T_Store>);
          } else {
            set({ [key]: val });
          }
        }

        renderImage();
      },

      renderImage: (isSaved = false) => {
        const { canvas, html, imageSettings, codeSettings } = get();

        if (!canvas) {
          set({ rendering: false });
          return;
        }

        const previewImageData = renderImage({ canvas, html, imageSettings, codeSettings });

        set({
          isSaved,
          fetching: false,
          rendering: false,
          previewImageData,
        });
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

      reset: () => {
        set({
          ...DEFAULT_STORE,
          rendering: true,
        });
        get().renderImage(true);
      },

      saveSnippet: async (errCallback) => {
        const store = get();
        const { user } = store;
        if (!user) {
          set({ isSaved: true, saving: false, savingError: 'User not found!' });
          return;
        }
        set({ saving: true, savingError: '' });
        const data = mapStore(store);

        data.id = uuid();
        const snippet = await createSnippet(user, data, errCallback ? errCallback : undefined);
        if (!snippet) {
          set({ saving: false, isSaved: false, savingError: 'Failed to create snippet' });
          return;
        }
        set({ id: snippet.id, isSaved: true, saving: false, wantToSave: false });
        return snippet;
      },

      updateSnippet: async (errCallback) => {
        const store = get();

        if (!store.id || !store.user || !store.editableSnippet) {
          set({ isSaved: true, saving: false, savingError: 'Snippet not found!' });
          return;
        }
        set({ saving: true, savingError: '' });
        const data = mapStore(store);

        const snippet = await saveSnippet(data, errCallback ? errCallback : undefined);
        if (!snippet) {
          set({ saving: false, isSaved: false, savingError: 'Failed to Update snippet' });
          return;
        }
        set({ id: snippet.id, isSaved: true, saving: false, wantToSave: false });
        return snippet;
      },

      saveOnChange: async () => {
        const store = get();

        if (!store.id || !store.user || !store.editableSnippet) {
          set({ isSaved: true, saving: false, savingError: 'Snippet not found!' });
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
              set({ isSaved: true, saving: false, wantToSave: false, abortController: null, savingDebounce: null });
            }
          } catch (error: any) {
            if (error.name === 'AbortError') {
              return;
            }
            set({
              isSaved: false,
              savingError: `Saving failed! ${error.message ?? 'Unknown error'}`,
              abortController: null,
              savingDebounce: null,
            });
          }
        }, 300);
        set({ savingDebounce, abortController });
      },

      goToPage: (target, route) => {
        if (target==='/') {
          set({ editableSnippet: null, selectedSnippet: null });
        }
        route(target);

        /*if (!document.startViewTransition) {
          fn();
        } else {
          document.startViewTransition(() => fn());
        }*/
      },
    }),
    {
      name: 'store-code-frame',
      storage: createJSONStorage(() => sessionStorage),
      version: 1,
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
          //selectedSnippet: null,
          //editableSnippet: null,
          previewImageData: DEFAULT_STORE.previewImageData,
        },
      }),
    }
  )
);
