import { useEffect } from "react";
import { uiStore } from "../stores/ui-store";

export const useTheme = () => {
  const { theme, setTheme } = uiStore();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemPreference = globalThis.matchMedia(
        "(prefers-color-scheme: dark)",
      );

      const applySystemTheme = (e?: MediaQueryListEvent | MediaQueryList) => {
        root.classList.remove("light", "dark");
        root.classList.add((e ?? systemPreference).matches ? "dark" : "light");
      };

      applySystemTheme(systemPreference);
      systemPreference.addEventListener("change", applySystemTheme);
      return () =>
        systemPreference.removeEventListener("change", applySystemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  return { theme, setTheme };
};
