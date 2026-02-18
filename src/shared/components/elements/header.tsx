import { Imagotipo } from "../icons/imagotipo";

export const Header = () => {
  return (
    <header className="h-16 border-b border-stone-200 dark:border-stone-700">
      <div className="container mx-auto flex justify-center items-center h-full">
        <Imagotipo className="w-40" />
      </div>
    </header>
  );
};
