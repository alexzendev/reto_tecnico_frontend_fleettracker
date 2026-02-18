import { Header } from "@/shared/components/elements/header";
import { Sidebar } from "@/shared/components/elements/sidebar";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-stone-50 dark:bg-stone-900 text-stone-800 dark:text-stone-200">
      <Header />
      <main className="mx-2 flex">
        <div className="container mx-auto border-x border-stone-200 dark:border-stone-700 flex min-h-[calc(100vh-4rem)]">
          <Sidebar />
          <section>{children}</section>
        </div>
      </main>
    </div>
  );
};
