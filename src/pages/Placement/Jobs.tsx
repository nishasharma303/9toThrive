import { useState, useEffect } from "react";
import { PageHeader } from "@/components/Placement/PageHeader";
import { DataTable } from "@/components/Placement/Datatable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { exportToExcel } from "@/utils/excelExport";
import { PostJobDialog } from "@/components/Placement/PostJobDialog";
import { db } from "@/firebaseConfig";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  getDocs,
  where,
  Timestamp,
} from "firebase/firestore";

interface Job {
  id: string;
  title: string;
  company: string;
  role: string;
  description?: string;
  location?: string;
  salary?: string;
  deadline?: string;
  scheduled_at?: Timestamp;
  applicants: number;
  status: "active" | "closed" | "draft";
  flagged?: boolean;
  created_at?: Timestamp;
  updated_at?: Timestamp;
}

export default function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  // Real-time listener for jobs
  useEffect(() => {
    const jobsQuery = query(collection(db, "jobs"), orderBy("created_at", "desc"));

    const unsubscribe = onSnapshot(
      jobsQuery,
      (snapshot) => {
        const jobsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Job[];
        setJobs(jobsData);
        setLoading(false);
      },
      (error) => {
        console.error("Jobs fetch error:", error);
        toast.error(`Failed to fetch jobs: ${error.message}`);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Update recruiter stats: active_postings, job_roles, average_salary
  const updateRecruiterStats = async (companyName: string, role: string) => {
    const recruitersRef = collection(db, "recruiter");
    const q = query(recruitersRef, where("company_name", "==", companyName));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      // Add new recruiter
      await addDoc(recruitersRef, {
        company_name: companyName,
        contact_name: "",
        email: "",
        phone: "",
        domain: "",
        status: "active",
        active_postings: 1,
        job_roles: [role],
        average_salary: "",
        created_at: Timestamp.now(),
        updated_at: Timestamp.now(),
      });
    } else {
      const docRef = snapshot.docs[0].ref;

      // Get all jobs for this company to compute active_postings & average_salary
      const jobsQuery = query(collection(db, "jobs"), where("company", "==", companyName));
      const jobsSnap = await getDocs(jobsQuery);
      const activeJobs = jobsSnap.docs.map((d) => d.data() as Job);

      const activePostings = activeJobs.length;
      const rolesSet = new Set<string>(activeJobs.map((j) => j.role));
      if (role) rolesSet.add(role);

      // Compute average_salary
      const salaries = activeJobs
        .map((j) => parseFloat(j.salary || "0"))
        .filter((s) => !isNaN(s) && s > 0);
      const avgSalary = salaries.length > 0
        ? (salaries.reduce((a, b) => a + b, 0) / salaries.length).toFixed(2)
        : "";

      await updateDoc(docRef, {
        active_postings: activePostings,
        job_roles: Array.from(rolesSet),
        average_salary: avgSalary,
        updated_at: Timestamp.now(),
      });
    }
  };

  const handleJobPosted = async (newJob: any) => {
    try {
      if (!newJob.title || !newJob.company || !newJob.role) {
        toast.error("Please provide title, company, and role.");
        return;
      }

      const jobData: any = {
        title: newJob.title,
        company: newJob.company,
        role: newJob.role,
        description: newJob.description || "",
        location: newJob.location || "",
        salary: newJob.salary || "",
        deadline: newJob.deadline || "",
        applicants: 0,
        status: "active",
        flagged: false,
        created_at: Timestamp.now(),
        updated_at: Timestamp.now(),
      };

      if (newJob.scheduled_date) {
        jobData.scheduled_at =
          newJob.scheduled_date instanceof Timestamp
            ? newJob.scheduled_date
            : newJob.scheduled_date instanceof Date
            ? Timestamp.fromDate(newJob.scheduled_date)
            : Timestamp.fromDate(new Date(newJob.scheduled_date));
      }

      await addDoc(collection(db, "jobs"), jobData);
      toast.success("Job posted successfully!");

      await updateRecruiterStats(newJob.company, newJob.role);
    } catch (error) {
      console.error("Add job error:", error);
      toast.error(
        `Failed to post job: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  };

  const handleDeleteJob = async (jobId: string, company?: string, role?: string) => {
    try {
      await deleteDoc(doc(db, "jobs", jobId));
      toast.success("Job deleted successfully!");
      if (company) await updateRecruiterStats(company, role || "");
    } catch (error) {
      console.error("Delete job error:", error);
      toast.error(
        `Failed to delete job: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  };

  const handleExport = () => {
    try {
      const exportData = jobs.map((job) => ({
        "Job ID": job.id,
        "Job Title": job.title,
        Company: job.company,
        Role: job.role,
        Description: job.description || "",
        Applicants: job.applicants,
        Status: job.status,
        Salary: job.salary || "",
        Location: job.location || "",
        Deadline: job.deadline || "",
        "Scheduled Date": job.scheduled_at ? job.scheduled_at.toDate().toLocaleString() : "",
      }));

      exportToExcel(exportData, "jobs_list", "Jobs");
      toast.success("Job listings exported to Excel successfully!");
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export jobs");
    }
  };

  const columns = [
    { key: "title", header: "Job Title" },
    { key: "company", header: "Company" },
    { key: "role", header: "Role" },
    { key: "description", header: "Description" },
    {
      key: "applicants",
      header: "Applicants",
      render: (job: Job) => (
        <Badge variant="secondary" className="font-semibold">{job.applicants}</Badge>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (job: Job) => (
        <Badge variant={
          job.status === "active" ? "default" : job.status === "closed" ? "secondary" : "outline"
        }>
          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
        </Badge>
      ),
    },
    { key: "salary", header: "Salary" },
    { key: "location", header: "Location" },
    {
      key: "scheduled_at",
      header: "Interview Date",
      render: (job: Job) => job.scheduled_at ? job.scheduled_at.toDate().toLocaleString() : "N/A",
    },
    {
      key: "actions",
      header: "Actions",
      render: (job: Job) => (
        <Button size="sm" variant="destructive" onClick={() => handleDeleteJob(job.id, job.company, job.role)}>
          <Trash2 className="w-4 h-4 mr-1" />
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div className="p-8">
      <PageHeader
        title="Jobs"
        description="Manage job postings and placement drives"
        actions={
          <>
            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export to Excel
            </Button>
            <PostJobDialog onJobPosted={handleJobPosted} />
          </>
        }
      />

      <div className="mt-6">
        {loading ? (
          <div className="text-center py-8">Loading jobs...</div>
        ) : jobs.length > 0 ? (
          <DataTable data={jobs} columns={columns} />
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No jobs posted yet. Click "Post Job" to add one.
          </div>
        )}
      </div>
    </div>
  );
}
