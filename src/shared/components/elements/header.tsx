import { Imagotipo } from "../icons/imagotipo";

export const Header = () => {
  return (
    <header className="py-4 border-b border-stone-200">
      <div className="container mx-auto flex justify-center">
        <Imagotipo className="w-48" />
      </div>
    </header>
  );
};
