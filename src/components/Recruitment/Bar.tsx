import { ReactNode } from "react";

interface FilterBarProps {
  children: ReactNode;
}

export const FilterBar = ({ children }: FilterBarProps) => {
  return (
    <div className="flex flex-wrap items-center gap-3 p-4 bg-card border border-border rounded-lg shadow-card mb-6">
      {children}
    </div>
  );
};
