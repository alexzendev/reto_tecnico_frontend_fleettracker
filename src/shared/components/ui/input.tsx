import { forwardRef } from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, FormInputProps>(
  ({ error, label, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <label className="sm:text-xs text-1.5xs uppercase font-semibold">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className="px-3 py-2 sm:text-xs text-1.5xs border rounded-full outline-none autofill-input dark:autofill-input-dark border-stone-200 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 appearance-none w-full"
          {...props}
        />
        {error && (
          <span className="sm:text-1.5xs text-2xs text-red-400 dark:text-red-600">
            *{error}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
