import { uiStore } from "@/shared/stores/ui-store";
import { ThemeToggle } from "./theme-toggle";
import { ChevronLeft } from "lucide-react";

export const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = uiStore();
  return (
    <aside className="sticky top-16 h-full border-r border-stone-200 dark:border-stone-700">
      <div className="flex justify-end">
        <button
          onClick={toggleSidebar}
          className="border border-stone-200 dark:border-stone-700 rounded-md hover:scale-105 active:scale-95 transition-transform duration-200 lg:p-2 p-1 cursor-pointer group"
        >
          <ChevronLeft
            className={`size-4 group-hover:text-primary ${isSidebarOpen ? "rotate-180" : ""} transition-all duration-200`}
          />
        </button>
      </div>
      <div className="w-64 border-t border-stone-200 dark:border-stone-700 divide divide-stone-200 dark:divide-stone-700 p-4">
        <div className="flex flex-row items-center md:gap-2 gap-1">
          <div className="bg-stone-200 rounded-full lg:size-10 size-8 flex items-center justify-center">
            <span className="font-bold lg:text-base sm:text-sm text-xs">A</span>
          </div>
          <div>
            <h2 className="lg:text-sm text-xs font-semibold">Alexis Jimenez</h2>
            <p className="lg:text-xs text-1.5xs text-stone-500 dark:text-stone-400">
              Administrador
            </p>
          </div>
        </div>

        <div></div>
        <ThemeToggle />
      </div>
    </aside>
  );
};
