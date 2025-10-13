import { useState, useEffect } from "react";
import { PageHeader } from "@/components/Placement/PageHeader";
import { FilterBar } from "@/components/Placement/FilterBar";
import { DataTable } from "@/components/Placement/Datatable";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Eye } from "lucide-react";
import { toast } from "sonner";
import { BulkUploadDialog } from "@/components/Placement/BulkUploadDialog";
import { SendNotificationDialog } from "@/components/Placement/SendNotificationDialog";
import { StudentDetailsDialog } from "@/components/Placement/StudentDetailsDialog";
import { supabase } from "@/integrations/supabase/client";

interface Student {
  id: string;
  name: string;
  branch: string;
  skills: string[];
  verification_status: "verified" | "unverified" | "pending";
  email: string;
  reg_no: string;
}

export default function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBranch, setSelectedBranch] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    fetchStudents();
    
    // Subscribe to realtime changes
    const channel = supabase
      .channel('students-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'students' }, () => {
        fetchStudents();
      })
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchStudents = async () => {
    try {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setStudents((data || []) as Student[]);
    } catch (error: any) {
      toast.error(`Failed to fetch students: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter((student) => {
    const matchesBranch = selectedBranch === "all" || student.branch === selectedBranch;
    const matchesStatus = selectedStatus === "all" || student.verification_status === selectedStatus;
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          student.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesBranch && matchesStatus && matchesSearch;
  });

  const handleStudentsUploaded = async (newStudents: any[]) => {
    try {
      const { error } = await supabase.from('students').insert(
        newStudents.map(s => ({
          name: s.name,
          email: s.email,
          reg_no: s.rollNo || s.reg_no,
          branch: s.branch,
          skills: s.skills,
          verification_status: 'unverified'
        }))
      );
      
      if (error) throw error;
      toast.success(`${newStudents.length} students uploaded successfully!`);
      fetchStudents();
    } catch (error: any) {
      toast.error(`Failed to upload students: ${error.message}`);
    }
  };

  const handleToggleVerification = async (student: Student) => {
    try {
      const newStatus = student.verification_status === 'verified' ? 'unverified' : 'verified';
      
      const { error } = await supabase
        .from('students')
        .update({ verification_status: newStatus })
        .eq('id', student.id);
      
      if (error) throw error;
      
      toast.success(`${student.name} is now ${newStatus}!`);
      fetchStudents();
    } catch (error: any) {
      toast.error(`Failed to update verification: ${error.message}`);
    }
  };

  const handleView = (student: Student) => {
    setSelectedStudent(student);
    setDetailsOpen(true);
  };

  const columns = [
    { key: "name", header: "Name" },
    { key: "branch", header: "Branch" },
    {
      key: "skills",
      header: "Skills",
      render: (student: Student) => (
        <div className="flex flex-wrap gap-1">
          {student.skills.map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      key: "email",
      header: "Email",
    },
    {
      key: "reg_no",
      header: "Reg No",
    },
    {
      key: "verification_status",
      header: "Status",
      render: (student: Student) => (
        <Badge
          variant={
            student.verification_status === "verified"
              ? "default"
              : student.verification_status === "pending"
              ? "outline"
              : "destructive"
          }
          className={
            student.verification_status === "verified"
              ? "bg-success text-success-foreground"
              : ""
          }
        >
          {student.verification_status}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (student: Student) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleView(student)}
          >
            <Eye className="w-4 h-4 mr-1" />
            View
          </Button>
          <Button
            size="sm"
            variant={student.verification_status === "verified" ? "destructive" : "default"}
            className={student.verification_status !== "verified" ? "bg-success hover:bg-success/90" : ""}
            onClick={() => handleToggleVerification(student)}
          >
            <CheckCircle className="w-4 h-4 mr-1" />
            {student.verification_status === "verified" ? "Unverify" : "Verify"}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-8">
      <PageHeader
        title="Students"
        description="Manage student registrations and verifications"
        actions={
          <>
            <BulkUploadDialog onStudentsUploaded={handleStudentsUploaded} />
            <SendNotificationDialog students={filteredStudents} />
          </>
        }
      />

      <FilterBar>
        <Input
          placeholder="Search by name or skills..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-xs"
        />
        <Select value={selectedBranch} onValueChange={setSelectedBranch}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select Branch" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Branches</SelectItem>
            <SelectItem value="Computer Science">Computer Science</SelectItem>
            <SelectItem value="Electronics">Electronics</SelectItem>
            <SelectItem value="Mechanical">Mechanical</SelectItem>
            <SelectItem value="Civil">Civil</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Verification Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="verified">Verified</SelectItem>
            <SelectItem value="unverified">Unverified</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </FilterBar>

      <div className="mt-6">
        {loading ? (
          <div className="text-center py-8">Loading students...</div>
        ) : (
          <DataTable data={filteredStudents} columns={columns} />
        )}
      </div>

      <StudentDetailsDialog 
        student={selectedStudent}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
    </div>
  );
}
