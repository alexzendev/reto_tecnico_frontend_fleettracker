import { Header } from "@/shared/components/elements/header";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-stone-50 text-stone-800">
      <Header />
      <main className="mx-2">
        <div className="container mx-auto border-x border-stone-200">
          {children}
        </div>
      </main>
    </div>
  );
};
