import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className="bg-primary hover:bg-secondary text-stone-100 px-5 py-2.5 rounded-full sm:text-xs text-1.5xs uppercase font-semibold flex items-center justify-center gap-1 cursor-pointer transition-all duration-200 disabled:opacity-80 disabled:cursor-not-allowed disabled:hover:bg-primary w-full group"
      disabled={props.disabled}
    >
      {children}
    </button>
  );
};
