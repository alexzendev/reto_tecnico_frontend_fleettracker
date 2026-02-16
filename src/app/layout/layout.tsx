import { Header } from "@/shared/components/elements/header";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-stone-50">
      <Header />
      <main className="container mx-auto">{children}</main>
    </div>
  );
};
