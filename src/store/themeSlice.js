import {persist} from "zustand/middleware";

export const themeSlice = persist(
  (set) => ({
    theme: localStorage.getItem('theme') || 'sunset',
    setTheme: (theme) => {
      set({ theme });
      localStorage.setItem('theme', theme);
    },
  }),
  {
    name: "themeStorage",
  }
);
