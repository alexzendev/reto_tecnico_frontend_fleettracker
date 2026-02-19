import { uiStore } from "@/shared/stores/ui-store";
import { ThemeToggle } from "./theme-toggle";
import { Divider } from "../ui/divider";
import { Imagotipo } from "../icons/imagotipo";
import { DATA_UI } from "@/shared/utils/data-ui";
import { LogOut } from "lucide-react";
import { Isotipo } from "../icons/isotipo";
import { Tooltip } from "../ui/tooltip";
import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  const { isSidebarOpen, user } = uiStore();
  const { navigation } = DATA_UI;

  return (
    <div className="z-50">
      {isSidebarOpen && (
        <div className="fixed sm:hidden inset-0 bg-black/50 backdrop-blur-md" />
      )}

      <aside
        className={`top-0 h-svh flex flex-col bg-stone-50 dark:bg-stone-900 border-r border-stone-200 dark:border-stone-700 transition-[width] duration-200 ease-in-out ${isSidebarOpen ? "lg:w-64 sm:w-60 w-56 sm:sticky fixed" : "sm:w-16 w-12 sticky"}
        `}
      >
        <div className="flex flex-col flex-1">
          <div className="relative flex justify-center h-44">
            {isSidebarOpen ? (
              <Imagotipo className="w-32" />
            ) : (
              <Isotipo className="sm:w-8 w-7" />
            )}
          </div>

          <Divider text="Menú" />

          <div className="flex flex-col gap-0.5 sm:p-4 p-2">
            {navigation.map((item) => (
              <Tooltip
                key={item.label}
                content={item.label}
                position="right"
                disabled={isSidebarOpen}
                arrow={false}
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center lg:gap-2 gap-1 rounded-md transition-colors duration-200 w-full lg:p-2 p-1.5 ${
                      isActive
                        ? "text-primary font-medium cursor-default"
                        : "hover:bg-stone-200 dark:hover:bg-stone-800 cursor-pointer"
                    }`
                  }
                  end
                >
                  <item.icon className="size-4 shrink-0" />
                  <span
                    className={`lg:text-xs text-1.5xs whitespace-nowrap overflow-hidden transition-all duration-200 ease-in-out ${isSidebarOpen ? "opacity-100 max-w-xs" : "opacity-0 max-w-0"}`}
                  >
                    {item.label}
                  </span>
                </NavLink>
              </Tooltip>
            ))}
          </div>
        </div>

        <div className="border-t border-stone-200 dark:border-stone-700 sm:p-4 p-2 space-y-4">
          <div className="flex flex-row items-center md:gap-2 gap-1">
            <div className="bg-primary text-stone-200 rounded-full lg:size-9 size-8 flex items-center justify-center shrink-0">
              <span className="font-bold lg:text-base sm:text-sm text-xs">
                {user.name.charAt(0)}
              </span>
            </div>
            <div
              className={`min-w-0 flex-1 overflow-hidden transition-all duration-200 ease-in-out ${isSidebarOpen ? "opacity-100 max-w-xs" : "opacity-0 max-w-0"}`}
            >
              <h2 className="lg:text-xs text-1.5xs font-semibold truncate">
                {user.email}
              </h2>
              <p className="lg:text-1.5xs text-2xs text-stone-500 dark:text-stone-400 capitalize">
                {user.role}
              </p>
            </div>
          </div>

          <ThemeToggle />
          <Divider />

          <div>
            <button
              className="flex items-center lg:gap-2 gap-1 hover:bg-stone-200 dark:hover:bg-stone-800 rounded-md transition-colors duration-200 cursor-pointer w-full lg:p-2 p-1.5 disabled:cursor-not-allowed disabled:hover:bg-transparent"
              disabled={true}
            >
              <LogOut className="size-4 shrink-0" />
              <span
                className={`lg:text-xs text-1.5xs whitespace-nowrap overflow-hidden transition-all duration-200 ease-in-out ${isSidebarOpen ? "opacity-100 max-w-xs" : "opacity-0 max-w-0"}`}
              >
                Cerrar sesión
              </span>
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};
