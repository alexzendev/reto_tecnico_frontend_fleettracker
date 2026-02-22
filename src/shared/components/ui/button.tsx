import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "solid" | "outline";
}

export const Button = ({
  children,
  variant = "solid",
  ...props
}: ButtonProps) => {
  const variants = {
    solid: "bg-primary hover:bg-secondary text-stone-100",
    outline:
      "border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-primary",
  }[variant];

  return (
    <button
      {...props}
      className={`sm:px-4 px-3 sm:py-2 py-1.5 rounded-full lg:text-xs sm:text-1.5xs text-2xs uppercase font-semibold flex items-center justify-center gap-1 cursor-pointer transition-all duration-200 disabled:opacity-80 disabled:cursor-not-allowed disabled:hover:bg-primary group ${variants}`}
      disabled={props.disabled}
    >
      {children}
    </button>
  );
};
