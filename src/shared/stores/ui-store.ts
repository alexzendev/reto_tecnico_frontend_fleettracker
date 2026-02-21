import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DATA_UI } from "../utils/data-ui";

type Theme = "system" | "light" | "dark";
type Role = "admin" | "editor" | "usuario";

interface User {
  name: string;
  email: string;
  role: Role;
}

interface UIStore {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;

  theme: Theme;
  setTheme: (theme: Theme) => void;

  user: User;
}

const user = DATA_UI.user as User;

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      isSidebarOpen: true,
      toggleSidebar: () =>
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

      theme: "system",
      setTheme: (theme) => set(() => ({ theme })),

      user: user,
    }),
    {
      name: "ui-store",
    },
  ),
);
