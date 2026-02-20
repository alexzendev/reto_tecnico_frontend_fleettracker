import { ChevronsUpDown } from "lucide-react";
import type { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  placeholder?: string;
  error?: string;
  label?: string;
  options: { value: string; label: string }[];
}

export const Select = ({
  error,
  label,
  options,
  placeholder,
  id,
  name,
  ...props
}: SelectProps) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label
          htmlFor={id || name}
          className="sm:text-xs text-1.5xs uppercase font-semibold"
        >
          {label}
        </label>
      )}
      <div className="relative w-full">
        <select
          id={id || name}
          name={name}
          {...props}
          className="px-3 py-2 sm:text-xs text-1.5xs border rounded-md outline-none autofill-input dark:autofill-input-dark border-stone-200 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 appearance-none w-full pr-8"
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronsUpDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 pointer-events-none text-stone-500" />
      </div>
      {error && (
        <span className="sm:text-1.5xs text-2xs text-red-400 dark:text-red-600">
          *{error}
        </span>
      )}
    </div>
  );
};
