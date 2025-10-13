import { useState, useEffect } from "react";
import { PageHeader } from "@/components/Placement/PageHeader";
import { DataTable } from "@/components/Placement/Datatable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Flag } from "lucide-react";
import { toast } from "sonner";
import { AddRecruiterDialog } from "@/components/Placement/AddRecruiterDialog";
import { db } from "@/firebaseConfig";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  Timestamp,
} from "firebase/firestore";

interface Recruiter {
  id: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone?: string | number;
  domain?: string;
  active_postings: number;
  status: "active" | "inactive" | "flagged";
  average_salary?: string;
  job_roles: string | string[]; // Can be string or array based on your data
  created_at?: Timestamp;
  updated_at?: Timestamp;
}

export default function Recruiters() {
  const [recruiters, setRecruiters] = useState<Recruiter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Real-time listener for recruiters collection
    const recruitersQuery = query(
      collection(db, "recruiter"),
      orderBy("created_at", "desc")
    );

    const unsubscribe = onSnapshot(
      recruitersQuery,
      (snapshot) => {
        const recruitersData = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            // Normalize job_roles to always be an array
            job_roles: Array.isArray(data.job_roles)
              ? data.job_roles
              : data.job_roles
              ? [data.job_roles]
              : [],
          };
        }) as Recruiter[];
        setRecruiters(recruitersData);
        setLoading(false);
      },
      (error) => {
        console.error("Recruiters fetch error:", error);
        toast.error(`Failed to fetch recruiters: ${error.message}`);
        setLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleRecruiterAdded = async (newRecruiter: any) => {
    try {
      // Validate required fields
      if (!newRecruiter.companyName || !newRecruiter.contactName || !newRecruiter.email) {
        toast.error("Please provide company name, contact name, and email.");
        return;
      }

      const recruiterData = {
        company_name: newRecruiter.companyName,
        contact_name: newRecruiter.contactName,
        email: newRecruiter.email,
        phone: newRecruiter.phone || "",
        domain: newRecruiter.domain || "",
        status: "active",
        active_postings: 0,
        job_roles: [],
        average_salary: "",
        created_at: Timestamp.now(),
        updated_at: Timestamp.now(),
      };

      await addDoc(collection(db, "recruiter"), recruiterData);
      toast.success("Recruiter added successfully!");
    } catch (error) {
      console.error("Add recruiter error:", error);
      toast.error(
        `Failed to add recruiter: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  };

  const handleApprove = async (recruiter: Recruiter) => {
    try {
      await updateDoc(doc(db, "recruiter", recruiter.id), {
        status: "active",
        updated_at: Timestamp.now(),
      });
      toast.success(`${recruiter.company_name} has been approved!`);
    } catch (error) {
      console.error("Approve error:", error);
      toast.error(
        `Failed to approve: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  };

  const handleFlag = async (recruiter: Recruiter) => {
    try {
      await updateDoc(doc(db, "recruiter", recruiter.id), {
        status: "flagged",
        updated_at: Timestamp.now(),
      });
      toast.error(`${recruiter.company_name} has been flagged for review.`);
    } catch (error) {
      console.error("Flag error:", error);
      toast.error(
        `Failed to flag: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  };

  const columns = [
    { key: "company_name", header: "Company Name" },
    { key: "contact_name", header: "Contact Name" },
    { key: "email", header: "Email" },
    { key: "active_postings", header: "Active Postings" },
    {
      key: "status",
      header: "Status",
      render: (recruiter: Recruiter) => (
        <Badge
          variant={
            recruiter.status === "active"
              ? "default"
              : recruiter.status === "flagged"
              ? "destructive"
              : "outline"
          }
          className={
            recruiter.status === "active"
              ? "bg-success text-success-foreground"
              : ""
          }
        >
          {recruiter.status.charAt(0).toUpperCase() + recruiter.status.slice(1)}
        </Badge>
      ),
    },
    { key: "average_salary", header: "Average Salary" },
    {
      key: "job_roles",
      header: "Job Roles Offered",
      render: (recruiter: Recruiter) => {
        const roles = Array.isArray(recruiter.job_roles)
          ? recruiter.job_roles
          : recruiter.job_roles
          ? [recruiter.job_roles]
          : [];
        
        return (
          <div className="flex flex-wrap gap-1">
            {roles.length > 0 ? (
              roles.map((role, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {role}
                </Badge>
              ))
            ) : (
              <span className="text-muted-foreground text-sm">No roles</span>
            )}
          </div>
        );
      },
    },
    {
      key: "actions",
      header: "Actions",
      render: (recruiter: Recruiter) => (
        <div className="flex gap-2">
          {recruiter.status !== "active" && (
            <Button
              size="sm"
              variant="default"
              className="bg-success hover:bg-success/90"
              onClick={() => handleApprove(recruiter)}
            >
              <CheckCircle className="w-4 h-4 mr-1" />
              Approve
            </Button>
          )}
          {recruiter.status === "active" && (
            <Button
              size="sm"
              variant="destructive"
              onClick={() => handleFlag(recruiter)}
            >
              <Flag className="w-4 h-4 mr-1" />
              Flag
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="p-8">
      <PageHeader
        title="Recruiters"
        description="Manage recruiting companies and their job postings"
        actions={
          <AddRecruiterDialog onRecruiterAdded={handleRecruiterAdded} />
        }
      />

      <div className="mt-6">
        {loading ? (
          <div className="text-center py-8">Loading recruiters...</div>
        ) : recruiters.length > 0 ? (
          <DataTable data={recruiters} columns={columns} />
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No recruiters added yet. Click "Add Recruiter" to add one.
          </div>
        )}
      </div>
    </div>
  );
}