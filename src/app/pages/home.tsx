import { CardLink } from "@/modules/vehicles/components/card-link";
import { Imagotipo } from "@/shared/components/icons/imagotipo";
import { uiStore } from "@/shared/stores/ui-store";
import { DATA_UI } from "@/shared/utils/data-ui";

export default function Home() {
  const { user } = uiStore();
  const { navigation, cards_home } = DATA_UI;

  return (
    <div className="flex flex-col min-h-svh items-center justify-center px-4">
      <Imagotipo className="w-32 mb-10" />
      <p className="lg:text-base sm:text-base text-sm text-center font-medium tracking-tighter">
        ¡Hola!, {user?.name} 👋🏻
      </p>
      <h1 className="lg:text-2xl sm:text-xl text-lg text-center font-bold tracking-tight">
        Bienvenido a <span className="text-primary">FleetTracker</span>
      </h1>

      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-4 sm:gap-3 gap-2 lg:mt-8 mt-6 max-w-6xl">
        {navigation.slice(1).map((item) => (
          <CardLink
            key={item.path}
            data={{
              ...item,
              description:
                cards_home[item.path as keyof typeof cards_home]?.description ||
                "Descripción no disponible",
            }}
          />
        ))}
      </div>
    </div>
  );
}
