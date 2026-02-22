import type { LucideIcon } from "lucide-react";

interface DetailField {
  label: string;
  value: string | number;
  color?: string;
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
        <Icon className="size-4 text-primary" />
        <h2 className="font-semibold lg:text-sm sm:text-xs text-1.5xs uppercase tracking-tighter">
          {title}
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 grid-cols-1 sm:gap-3.5 gap-3 mt-5">
        {fields.map((field) => (
          <div key={field.label}>
            <h3 className="lg:text-xs sm:text-1.5xs text-2xs font-semibold">
              {field.label}
            </h3>
            <div className="flex items-center sm:gap-1 gap-0.5">
              {field.color && <div className={`size-1.5 rounded-full ${field.color}`} />}
              <p className="lg:text-xs text-1.5xs">{field.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
