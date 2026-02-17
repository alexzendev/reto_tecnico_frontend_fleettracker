interface ButtonProps {
  children: React.ReactNode;
}

export const Button = ({ children }: ButtonProps) => {
  return (
    <button className="bg-primary hover:bg-secondary text-stone-100 px-5 py-2.5 rounded-full sm:text-xs text-1.5xs uppercase font-semibold flex items-center justify-center gap-1 cursor-pointer transition-all duration-200 group">
      {children}
    </button>
  );
};
