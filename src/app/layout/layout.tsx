import { Sidebar } from "@/shared/components/elements/sidebar";
import { uiStore } from "@/shared/stores/ui-store";
import { PanelLeftClose } from "lucide-react";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  const { isSidebarOpen, toggleSidebar } = uiStore();
  return (
    <div className="bg-stone-50 dark:bg-stone-900 text-stone-800 dark:text-stone-200">
      <main>
        <section className="flex flex-row w-full">
          <Sidebar />
          <div
            className={`w-full relative ${isSidebarOpen ? "" : "sm:ml-0 ml-12"} transition-all duration-200`}
          >
            <button
              onClick={toggleSidebar}
              className="fixed top-4 sm:left-4 left-2 z-50 cursor-pointer hover:bg-stone-200 dark:hover:bg-stone-800 rounded-md p-1"
              aria-label="Colapse sidebar"
            >
              <PanelLeftClose
                className={`sm:size-5 size-4 ${isSidebarOpen ? "" : "rotate-180"}`}
              />
            </button>
            <Outlet />
          </div>
        </section>
      </main>
    </div>
  );
};
