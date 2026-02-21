interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => {
  const date = new Date().toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <header className="sticky top-0 z-10 bg-stone-50 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-700 w-full sm:px-4 px-2 flex flex-col justify-center h-20">
      <h1 className="font-semibold lg:text-2xl sm:text-xl text-lg tracking-tighter mt-1">
        {title}
      </h1>
      <p className="lg:text-1.5xs text-2xs text-stone-500 capitalize">{date}</p>
    </header>
  );
};
