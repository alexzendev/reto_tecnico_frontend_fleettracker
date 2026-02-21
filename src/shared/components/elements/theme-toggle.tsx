import { useTheme } from "@/shared/hooks/useTheme";
import { Divider } from "../ui/divider";
import { DATA_UI } from "@/shared/utils/data-ui";
import { useUIStore } from "@/shared/stores/ui-store";
import { Tooltip } from "../ui/tooltip";

export const ThemeToggle = () => {
  const { isSidebarOpen } = useUIStore();
  const { theme, setTheme } = useTheme();
  const { theme: buttons } = DATA_UI;
  return (
    <>
      <Divider text="Aspecto" />
      <div className="flex flex-col">
        {buttons.map((btn) => (
          <Tooltip
            key={btn.label}
            content={btn.label}
            position="right"
            disabled={isSidebarOpen}
            arrow={false}
          >
            <button
              onClick={() => setTheme(btn.value as "light" | "dark" | "system")}
              className={`flex items-center lg:gap-2 gap-1 hover:bg-stone-200 dark:hover:bg-stone-800 rounded-md transition-colors duration-200 cursor-pointer w-full lg:p-2 p-1.5 disabled:cursor-default disabled:hover:bg-transparent ${theme === btn.value ? "text-primary font-medium" : ""}`}
              aria-label={`Cambiar a tema ${btn.label}`}
              disabled={theme === btn.value}
            >
              <btn.icons className="size-4 shrink-0" />
              {isSidebarOpen && (
                <span className="lg:text-xs text-1.5xs ">{btn.label}</span>
              )}
            </button>
          </Tooltip>
        ))}
      </div>
    </>
  );
};
