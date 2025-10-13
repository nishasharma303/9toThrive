import { createContext, useContext, useState, ReactNode } from "react";

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  match: number;
  description: string;
  requirements: string[];
  skillsToDevelop: string[];
  benefits: string[];
  postedDate: string;
  status?: "Applied" | "Interview" | "Rejected" | "Shortlisted";
  appliedDate?: string;
}

interface JobContextType {
  appliedJobs: Job[];
  applyToJob: (job: Job) => void;
  isJobApplied: (jobId: number) => boolean;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider = ({ children }: { children: ReactNode }) => {
  const [appliedJobs, setAppliedJobs] = useState<Job[]>([
    {
      id: 999,
      company: "Tech Corp",
      title: "Frontend Developer",
      status: "Interview",
      appliedDate: "2 days ago",
      match: 92,
      location: "Bengaluru",
      type: "Fulltime",
      experience: "2 Years",
      salary: "8-12 Lacs",
      description: "Build amazing UIs",
      requirements: ["React", "TypeScript"],
      skillsToDevelop: ["Next.js"],
      benefits: ["Health Insurance"],
      postedDate: "1 week ago",
    },
  ]);

  const applyToJob = (job: Job) => {
    const appliedJob = {
      ...job,
      status: "Applied" as const,
      appliedDate: "Just now",
    };
    setAppliedJobs((prev) => [appliedJob, ...prev]);
  };

  const isJobApplied = (jobId: number) => {
    return appliedJobs.some((job) => job.id === jobId);
  };

  return (
    <JobContext.Provider value={{ appliedJobs, applyToJob, isJobApplied }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error("useJobs must be used within JobProvider");
  }
  return context;
};
