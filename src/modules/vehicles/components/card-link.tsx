import { ArrowRight, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface CardLinkProps {
  data: {
    path: string;
    label: string;
    icon: LucideIcon;
    description: string;
  };
}

export const CardLink = ({ data }: CardLinkProps) => {
  return (
    <div className="flex flex-col bg-stone-100 dark:bg-stone-800 rounded-md lg:p-4 p-3">
      <data.icon className="size-4 shrink-0 text-primary mb-2" />
      <h2 className="font-semibold lg:text-xs text-1.5xs mb-1">{data.label}</h2>
      <p className="lg:text-1.5xs text-2xs text-stone-500 dark:text-stone-400 lg:mb-5 mb-2.5 flex-1">
        {data.description}
      </p>
      <Link
        to={data.path}
        className="flex items-center font-medium underline hover:text-primary transition-colors duration-200 group/card w-fit"
      >
        <span className="lg:text-1.5xs text-2xs">Ir a {data.label}</span>
        <ArrowRight className="size-3 ml-1 group-hover/card:-rotate-45 transition-transform" />
      </Link>
    </div>
  );
};
