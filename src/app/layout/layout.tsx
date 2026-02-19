import { Header } from "@/shared/components/elements/header";
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
          <div className="w-full relative">
            <button
              onClick={toggleSidebar}
              className="fixed top-4 sm:left-4 left-2 z-50 cursor-pointer hover:bg-stone-200 dark:hover:bg-stone-800 rounded-md p-1"
              aria-label="Colapse sidebar"
            >
              <PanelLeftClose
                className={`size-5 ${isSidebarOpen ? "" : "rotate-180"}`}
              />
            </button>
            <Header />
            <Outlet />
          </div>
        </section>
      </main>
    </div>
  );
};
