import { uiStore } from "@/shared/stores/ui-store";
import { ThemeToggle } from "./theme-toggle";
import { ChevronLeft, LogOut } from "lucide-react";
import { Divider } from "../ui/divider";

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
      <div className="w-64 border-t border-stone-200 dark:border-stone-700 divide divide-stone-200 dark:divide-stone-700 lg:px-4 px-2">
        <div className="flex flex-row items-center md:gap-2 gap-1 lg:py-4 py-2">
          <div className="bg-primary text-stone-200 rounded-full lg:size-9 size-8 flex items-center justify-center">
            <span className="font-bold lg:text-base sm:text-sm text-xs">A</span>
          </div>
          <div>
            <h2 className="lg:text-xs text-1.5xs font-semibold">
              Alexis Jimenez
            </h2>
            <p className="lg:text-1.5xs text-2xs text-stone-500 dark:text-stone-400">
              Usuario
            </p>
          </div>
        </div>

        <ThemeToggle />
        <div>
          <Divider />
          <div className="lg:py-4 py-2">
            <button
              className="flex items-center lg:gap-2 gap-1 hover:bg-stone-200 dark:hover:bg-stone-800 rounded-md transition-colors duration-200 cursor-pointer w-full p-2 disabled:cursor-not-allowed disabled:hover:bg-transparent"
              disabled={true}
            >
              <LogOut className="size-3.5 shrink-0" />
              <span className="lg:text-xs text-1.5xs">Cerrar sesión</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
