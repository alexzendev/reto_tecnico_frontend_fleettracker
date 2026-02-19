import { uiStore } from "@/shared/stores/ui-store";

export const Header = () => {
  const { user } = uiStore();
  const date = new Date().toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <header className="sticky top-0 border-b border-stone-200 dark:border-stone-700 w-full sm:p-4 p-2">
      <div className="h-7 mb-1" />
      <h1 className="font-semibold lg:text-2xl sm:text-xl text-lg tracking-tighter mt-1">
        Bienvenido, {user.name}
      </h1>
      <p className="lg:text-1.5xs text-2xs text-stone-500 capitalize">{date}</p>
    </header>
  );
};
