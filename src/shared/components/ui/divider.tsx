interface DividerProps {
  text?: string;
}

export const Divider = ({ text }: DividerProps) => {
  if (!text) {
    return <hr className="border-stone-200 dark:border-stone-700" />;
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 border-t border-stone-200 dark:border-stone-700" />
      <span className="lg:text-1.5xs text-2xs text-stone-400 dark:text-stone-500 shrink-0">
        {text}
      </span>
      <div className="flex-1 border-t border-stone-200 dark:border-stone-700" />
    </div>
  );
};
