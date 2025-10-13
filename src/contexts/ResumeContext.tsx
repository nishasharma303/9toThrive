import React, { createContext, useContext, useState } from "react";

type ResumeContextType = {
  topSkills: string[];
  setTopSkills: (skills: string[]) => void;
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [topSkills, setTopSkills] = useState<string[]>([]);

  return (
    <ResumeContext.Provider value={{ topSkills, setTopSkills }}>{children}</ResumeContext.Provider>
  );
};

export function useResume() {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error("useResume must be used within a ResumeProvider");
  return ctx;
}

export default ResumeContext;