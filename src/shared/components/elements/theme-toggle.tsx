import { useTheme } from "@/shared/hooks/useTheme";
import { Monitor, Moon, Sun } from "lucide-react";
import { Divider } from "../ui/divider";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const buttons = [
    { label: "Sistema", value: "system", icons: Monitor },
    { label: "Claro", value: "light", icons: Sun },
    { label: "Oscuro", value: "dark", icons: Moon },
  ] as const;

  return (
    <>
      <Divider text="Aspecto" />
      <div className="flex flex-col py-4">
        {buttons.map((btn) => (
          <button
            key={btn.label}
            onClick={() => setTheme(btn.value)}
            className="flex items-center lg:gap-2 gap-1 hover:bg-stone-200 dark:hover:bg-stone-800 rounded-md transition-colors duration-200 cursor-pointer w-full p-2 disabled:cursor-not-allowed disabled:hover:bg-transparent"
            aria-label={`Cambiar a tema ${btn.label}`}
            disabled={theme === btn.value}
          >
            <btn.icons
              className={`size-3.5 shrink-0 ${theme === btn.value ? "text-primary" : ""}`}
            />
            <span
              className={`lg:text-xs text-1.5xs ${theme === btn.value ? "text-primary font-medium" : ""}`}
            >
              {btn.label}
            </span>
          </button>
        ))}
      </div>
    </>
  );
};
