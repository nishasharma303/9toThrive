import { useState, useEffect } from "react";
import { PageHeader } from "@/components/Placement/PageHeader";
import { DataTable } from "@/components/Placement/Datatable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { exportToExcel } from "@/utils/excelExport";
import { PostJobDialog } from "@/components/Placement/PostJobDialog";
import { supabase } from "@/integrations/supabase/client";

interface Job {
  id: string;
  title: string;
  company: string;
  role: string;
  description?: string;
  location?: string;
  salary?: string;
  deadline?: string;
  applicants: number;
  status: "active" | "closed" | "draft";
  flagged: boolean;
}

export default function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
    
    // Subscribe to realtime changes
    const channel = supabase
      .channel('jobs-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'jobs' }, () => {
        fetchJobs();
      })
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setJobs((data || []) as Job[]);
    } catch (error: any) {
      toast.error(`Failed to fetch jobs: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleJobPosted = async (newJob: any) => {
    try {
      const { error } = await supabase.from('jobs').insert({
        title: newJob.title,
        company: newJob.company,
        role: newJob.role,
        description: newJob.description,
        location: newJob.location,
        salary: newJob.salary,
        deadline: newJob.deadline,
        scheduled_date: newJob.scheduled_date,
        applicants: 0,
        status: 'active',
        flagged: false
      });
      
      if (error) throw error;
      toast.success("Job posted successfully!");
      fetchJobs();
    } catch (error: any) {
      toast.error(`Failed to post job: ${error.message}`);
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    try {
      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', jobId);
      
      if (error) throw error;
      toast.success("Job deleted successfully!");
      fetchJobs();
    } catch (error: any) {
      toast.error(`Failed to delete job: ${error.message}`);
    }
  };

  const handleExport = () => {
    try {
      const exportData = jobs.map(job => ({
        'Job ID': job.id,
        'Job Title': job.title,
        'Company': job.company,
        'Role': job.role,
        'Applicants': job.applicants,
        'Status': job.status,
        'Salary': job.salary || '',
        'Location': job.location || '',
      }));
      
      exportToExcel(exportData, 'jobs_list', 'Jobs');
      toast.success("Job listings exported to Excel successfully!");
    } catch (error) {
      toast.error("Failed to export jobs");
    }
  };

  const columns = [
    { key: "title", header: "Job Title" },
    { key: "company", header: "Company" },
    { key: "role", header: "Role" },
    {
      key: "applicants",
      header: "Applicants",
      render: (job: Job) => (
        <Badge variant="secondary" className="font-semibold">
          {job.applicants}
        </Badge>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (job: Job) => (
        <Badge variant={job.status === "active" ? "default" : job.status === "closed" ? "secondary" : "outline"}>
          {job.status}
        </Badge>
      ),
    },
    { key: "salary", header: "Salary" },
    { key: "location", header: "Location" },
    {
      key: "actions",
      header: "Actions",
      render: (job: Job) => (
        <Button
          size="sm"
          variant="destructive"
          onClick={() => handleDeleteJob(job.id)}
        >
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
        ) : (
          <DataTable data={jobs} columns={columns} />
        )}
      </div>
    </div>
  );
}
