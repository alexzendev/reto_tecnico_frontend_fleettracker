import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "system" | "light" | "dark";

interface UIStore {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;

  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const uiStore = create<UIStore>()(
  persist(
    (set) => ({
      isSidebarOpen: true,
      toggleSidebar: () =>
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      theme: "system",
      setTheme: (theme) => set(() => ({ theme })),
    }),
    {
      name: "ui-store",
    },
  ),
);
