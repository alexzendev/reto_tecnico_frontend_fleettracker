import type { LucideIcon } from "lucide-react";

interface DetailField {
  label: string;
  value: string | number;
}

interface DetailsCardProps {
  title: string;
  icon: LucideIcon;
  fields: DetailField[];
}

export const DetailsCard = ({
  icon: Icon,
  title,
  fields,
}: DetailsCardProps) => {
  return (
    <div className="rounded-md bg-stone-100 dark:bg-stone-800 lg:p-4 p-2">
      <div className="flex sm:gap-2 gap-1 items-center">
        <Icon className="size-4" />
        <h2 className="font-semibold lg:text-sm sm:text-xs text-1.5xs tracking-tighter">
          {title}
        </h2>
      </div>
      <div className="grid grid-cols-2 sm:gap-3 gap-2 mt-3">
        {fields.map((field) => (
          <div key={field.label}>
            <h3 className="lg:text-xs text-1.5xs font-semibold uppercase">
              {field.label}
            </h3>
            <p className="lg:text-xs text-1.5xs">{field.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
