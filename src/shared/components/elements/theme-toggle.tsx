import { useTheme } from "@/shared/hooks/useTheme";
import { Monitor, Moon, Sun } from "lucide-react";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const buttons = [
    { label: "Sistema", value: "system", icons: Monitor },
    { label: "Claro", value: "light", icons: Sun },
    { label: "Oscuro", value: "dark", icons: Moon },
  ] as const;

  return (
    <div>
        <p></p>
        <div className="flex flex-col">
      {buttons.map((btn) => (
        <button
          key={btn.label}
          onClick={() => setTheme(btn.value)}
          className="flex items-center hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors cursor-pointer w-full p-2 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          title={`Cambiar a modo ${btn.label}`}
          disabled={theme === btn.value}
        >
          <btn.icons
            className={`size-3.5 shrink-0 ${theme === btn.value ? "text-primary" : "text-stone-500 dark:text-stone-400"}`}
          />
          <span className="text-1.5xs">{btn.label}</span>
        </button>
      ))}
    </div>
    </div>
  );
};
