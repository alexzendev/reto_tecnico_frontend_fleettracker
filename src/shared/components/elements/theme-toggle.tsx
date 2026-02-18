import { useTheme } from "@/shared/hooks/useTheme";
import { Divider } from "../ui/divider";
import { DATA_UI } from "@/shared/utils/data-ui";
import { uiStore } from "@/shared/stores/ui-store";

export const ThemeToggle = () => {
  const { isSidebarOpen } = uiStore();
  const { theme, setTheme } = useTheme();
  const { theme: buttons } = DATA_UI;
  return (
    <>
      <Divider text={isSidebarOpen ? "Aspecto" : ""} />
      <div className="flex flex-col py-4">
        {buttons.map((btn) => (
          <button
            key={btn.label}
            onClick={() => setTheme(btn.value as "light" | "dark" | "system")}
            className="flex items-center lg:gap-2 gap-1 hover:bg-stone-200 dark:hover:bg-stone-800 rounded-md transition-colors duration-200 cursor-pointer w-full lg:p-2 p-1.5 disabled:cursor-not-allowed disabled:hover:bg-transparent"
            aria-label={`Cambiar a tema ${btn.label}`}
            disabled={theme === btn.value}
          >
            <btn.icons
              className={`size-4 shrink-0 ${theme === btn.value ? "text-primary" : ""}`}
            />
            {isSidebarOpen && (
              <span
                className={`lg:text-xs text-1.5xs ${theme === btn.value ? "text-primary font-medium" : ""}`}
              >
                {btn.label}
              </span>
            )}
          </button>
        ))}
      </div>
    </>
  );
};
