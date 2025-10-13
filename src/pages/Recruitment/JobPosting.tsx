"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeaderRec";
import { DataTable } from "@/components/Recruitment/Table";
import { FilterBar } from "@/components/Recruitment/Bar";
import { StatCard } from "@/components/Recruitment/Card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Download, 
  Eye, 
  Trash2, 
  Search,
  FileText,
  TrendingUp,
  Clock,
  XCircle,
  MoreVertical
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { NewJobDialog } from "@/pages/Recruitment/Components/NewJobDialog";

const stats = [
  { title: "Total Job Views", value: "24.5K", icon: Eye, trend: { value: 18, isPositive: true } },
  { title: "Active Postings", value: 24, icon: FileText, trend: { value: 12, isPositive: true } },
  { title: "Application Rate", value: "3.2%", icon: TrendingUp, trend: { value: 8, isPositive: true }, description: "Views to Applications" },
  { title: "Avg. Time to Fill", value: "18 Days", icon: Clock, trend: { value: 5, isPositive: false } },
];

const initialJobData = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Solutions Pvt Ltd",
    department: "Engineering",
    location: "Bangalore, Karnataka",
    workMode: "Hybrid",
    skills: "React, TypeScript, Node.js",
    salary: "₹12-18 LPA",
    experience: "3-5 years",
    education: "Bachelor's in CS",
    jobType: "Full-time",
    openings: 2,
    applicants: 87,
    shortlisted: 6,      // adjusted
    interviewed: 4,      // adjusted
    offered: 2,          // adjusted (<= openings)
    views: 1243,
    applicationRate: "7.0%",
    postedDate: "2024-01-10",
    closingDate: "2024-02-10",
    daysActive: 15,
    status: "Active",
    priority: "High",
    performance: "High",
    salaryVisible: true,
    description: "We are looking for an experienced Frontend Developer to join our team...",
    responsibilities: "• Lead frontend development\n• Code reviews\n• Mentor junior developers",
    requirements: "• 3+ years React experience\n• Strong TypeScript skills\n• Team player",
  },
  {
    id: 2,
    title: "Data Scientist",
    company: "DataMinds Analytics",
    department: "Analytics",
    location: "Pune, Maharashtra",
    workMode: "Remote",
    skills: "Python, ML, TensorFlow",
    salary: "₹15-22 LPA",
    experience: "4-7 years",
    education: "Master's in Data Science",
    jobType: "Full-time",
    openings: 3,
    applicants: 134,
    shortlisted: 15,     // adjusted
    interviewed: 9,      // adjusted
    offered: 3,          // adjusted (<= openings)
    views: 2156,
    applicationRate: "6.2%",
    postedDate: "2024-01-08",
    closingDate: "2024-02-08",
    daysActive: 17,
    status: "Active",
    priority: "Urgent",
    performance: "High",
    salaryVisible: true,
    description: "Join our data science team to build cutting-edge ML models...",
    responsibilities: "• Develop ML models\n• Data analysis\n• Present insights",
    requirements: "• 4+ years Python\n• ML/AI expertise\n• Statistical knowledge",
  },
  {
    id: 3,
    title: "Product Manager",
    company: "InnovatePro Technologies",
    department: "Product",
    location: "Mumbai, Maharashtra",
    workMode: "On-site",
    skills: "Agile, Strategy, Analytics",
    salary: "₹18-25 LPA",
    experience: "5-8 years",
    education: "MBA or equivalent",
    jobType: "Full-time",
    openings: 1,
    applicants: 56,
    shortlisted: 5,      // adjusted
    interviewed: 3,      // adjusted
    offered: 1,          // adjusted (<= openings)
    views: 892,
    applicationRate: "6.3%",
    postedDate: "2023-12-20",
    closingDate: "2024-01-20",
    daysActive: 35,
    status: "Closed",
    priority: "Normal",
    performance: "Medium",
    salaryVisible: false,
    description: "Lead product strategy and roadmap for our flagship products...",
    responsibilities: "• Product roadmap\n• Stakeholder management\n• Market research",
    requirements: "• 5+ years PM experience\n• Agile methodology\n• Strategic thinking",
  },
  {
    id: 4,
    title: "UI/UX Designer",
    company: "DesignHub Studios",
    department: "Design",
    location: "Hyderabad, Telangana",
    workMode: "Hybrid",
    skills: "Figma, Sketch, Prototyping",
    salary: "₹10-15 LPA",
    experience: "2-4 years",
    education: "Bachelor's in Design",
    jobType: "Full-time",
    openings: 2,
    applicants: 92,
    shortlisted: 12,     // adjusted
    interviewed: 6,      // adjusted
    offered: 2,          // adjusted (<= openings)
    views: 1567,
    applicationRate: "5.9%",
    postedDate: "2024-01-12",
    closingDate: "2024-02-12",
    daysActive: 13,
    status: "Active",
    priority: "Normal",
    performance: "Medium",
    salaryVisible: true,
    description: "Create beautiful, user-friendly designs for web and mobile...",
    responsibilities: "• UI/UX design\n• User research\n• Design systems",
    requirements: "• 2+ years design experience\n• Figma proficiency\n• Portfolio required",
  },
  {
    id: 5,
    title: "Backend Engineer",
    company: "CloudScale Systems",
    department: "Engineering",
    location: "Delhi NCR",
    workMode: "On-site",
    skills: "Java, Spring Boot, AWS",
    salary: "₹12-20 LPA",
    experience: "3-6 years",
    education: "Bachelor's in CS",
    jobType: "Full-time",
    openings: 4,
    applicants: 78,
    shortlisted: 19,
    interviewed: 9,
    offered: 2,          // already <= openings; kept as-is
    views: 1876,
    applicationRate: "4.2%",
    postedDate: "2024-01-15",
    closingDate: "2024-02-15",
    daysActive: 10,
    status: "Active",
    priority: "High",
    performance: "Low",
    salaryVisible: true,
    description: "Build scalable backend systems for our cloud platform...",
    responsibilities: "• Backend development\n• API design\n• System architecture",
    requirements: "• 3+ years Java\n• Spring Boot expertise\n• AWS knowledge",
  },
];

export default function JobPosting() {
  const [jobData, setJobData] = useState(initialJobData);
  const [filteredData, setFilteredData] = useState(initialJobData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [previewJob, setPreviewJob] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Filters
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [workModeFilter, setWorkModeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Export to CSV function
  const handleExportData = () => {
    const headers = [
      "ID",
      "Job Title",
      "Company",
      "Department",
      "Location",
      "Work Mode",
      "Job Type",
      "Experience",
      "Education",
      "Skills",
      "Salary",
      "Openings",
      "Applicants",
      "Shortlisted",
      "Interviewed",
      "Offered",
      "Views",
      "Application Rate",
      "Posted Date",
      "Closing Date",
      "Days Active",
      "Status",
      "Priority",
      "Performance"
    ];

    const csvRows = [
      headers.join(","),
      ...filteredData.map(job => [
        job.id,
        `"${job.title}"`,
        `"${job.company}"`,
        job.department,
        `"${job.location}"`,
        job.workMode,
        job.jobType,
        `"${job.experience}"`,
        `"${job.education}"`,
        `"${job.skills}"`,
        `"${job.salary}"`,
        job.openings,
        job.applicants,
        job.shortlisted,
        job.interviewed,
        job.offered,
        job.views,
        job.applicationRate,
        job.postedDate,
        job.closingDate,
        job.daysActive,
        job.status,
        job.priority,
        job.performance
      ].join(","))
    ];

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    link.setAttribute("href", url);
    link.setAttribute("download", `job_postings_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle Search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyFilters(query, departmentFilter, workModeFilter, statusFilter);
  };

  // Apply all filters (accepts a base list to avoid stale state)
  const applyFilters = (
    search: string,
    dept: string,
    mode: string,
    status: string,
    baseList: typeof jobData = jobData
  ) => {
    let filtered = baseList;

    if (search) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase()) ||
        job.skills.toLowerCase().includes(search.toLowerCase()) ||
        job.location.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (dept !== "all") {
      filtered = filtered.filter(job => job.department.toLowerCase() === dept);
    }

    if (mode !== "all") {
      filtered = filtered.filter(job => job.workMode.toLowerCase() === mode);
    }

    if (status !== "all") {
      filtered = filtered.filter(job => job.status.toLowerCase() === status);
    }

    setFilteredData(filtered);
  };

  // Add new job
  const handleAddJob = (newJob: any) => {
    const jobWithId = {
      ...newJob,
      id: jobData.length + 1,
      applicants: 0,
      shortlisted: 0,
      interviewed: 0,
      offered: 0,
      views: 0,
      applicationRate: "0%",
      postedDate: new Date().toISOString().split('T')[0],
      daysActive: 0,
      status: newJob.isDraft ? "Draft" : "Active",
      performance: "Low",
    };
    const updatedJobs = [jobWithId, ...jobData];
    setJobData(updatedJobs);
    applyFilters(searchQuery, departmentFilter, workModeFilter, statusFilter, updatedJobs);
    setIsDialogOpen(false);
  };

  // Delete job
  const handleDeleteJob = (id: number) => {
    if (confirm("Are you sure you want to delete this job posting?")) {
      const updatedJobs = jobData.filter(job => job.id !== id);
      setJobData(updatedJobs);
      applyFilters(searchQuery, departmentFilter, workModeFilter, statusFilter, updatedJobs);
    }
  };

  // Close job
  const handleCloseJob = (id: number) => {
    if (confirm("Are you sure you want to close this job posting?")) {
      const updatedJobs = jobData.map(job => 
        job.id === id ? { ...job, status: "Closed" } : job
      );
      setJobData(updatedJobs);
      applyFilters(searchQuery, departmentFilter, workModeFilter, statusFilter, updatedJobs);
    }
  };

  // Preview job
  const handlePreviewJob = (job: any) => {
    setPreviewJob(job);
  };

  const columns = [
    { 
      header: "Job Title", 
      accessor: "title",
      cell: (value: string, row: any) => (
        <div className="min-w-[220px]">
          <div className="font-semibold text-foreground mb-1">{value}</div>
          <div className="text-xs text-muted-foreground mb-2">{row.company}</div>
          <div className="flex gap-1 flex-wrap">
            <Badge variant="outline" className="text-xs">{row.department}</Badge>
            <Badge variant="outline" className="text-xs">{row.workMode}</Badge>
          </div>
        </div>
      ),
    },
    { 
      header: "Location & Experience", 
      accessor: "location",
      cell: (value: string, row: any) => (
        <div className="min-w-[140px]">
          <div className="text-sm text-muted-foreground">{value}</div>
          <div className="text-xs text-muted-foreground mt-1">{row.experience}</div>
        </div>
      ),
    },
    { 
      header: "Openings", 
      accessor: "openings",
      cell: (value: number) => (
        <div className="text-center">
          <span className="font-semibold text-lg">{value}</span>
        </div>
      ),
    },
    {
      header: "Applications",
      accessor: "applicants",
      cell: (value: number, row: any) => (
        <div className="min-w-[140px]">
          <div className="font-semibold text-primary text-sm mb-1">{value} Applied</div>
          <div className="text-xs text-muted-foreground">
            {row.shortlisted} Shortlisted
          </div>
        </div>
      ),
    },
    {
      header: "Performance",
      accessor: "views",
      cell: (value: number, row: any) => (
        <div className="min-w-[120px]">
          <div className="text-sm font-semibold mb-1">{value.toLocaleString()} Views</div>
          <div className="text-xs text-muted-foreground mb-1">{row.applicationRate} rate</div>
          <Badge 
            variant={
              row.performance === "High" ? "default" : 
              row.performance === "Medium" ? "secondary" : 
              "outline"
            }
            className="text-xs"
          >
            {row.performance}
          </Badge>
        </div>
      ),
    },
    { 
      header: "Salary", 
      accessor: "salary",
      cell: (value: string) => (
        <span className="font-semibold text-green-600 text-sm">{value}</span>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      cell: (value: string) => (
        <Badge variant={value === "Active" ? "default" : value === "Draft" ? "outline" : "secondary"}>
          {value}
        </Badge>
      ),
    },
    {
      header: "Actions",
      accessor: "id",
      cell: (value: number, row: any) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="ghost">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => handlePreviewJob(row)}>
              <Eye className="w-4 h-4 mr-2" />
              Preview Details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {row.status === "Active" && (
              <DropdownMenuItem onSelect={() => handleCloseJob(value)}>
                <XCircle className="w-4 h-4 mr-2" />
                Close Job
              </DropdownMenuItem>
            )}
            <DropdownMenuItem 
              className="text-destructive"
              onSelect={() => handleDeleteJob(value)}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Job
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="Job Postings"
        description="Create and manage job postings across all departments"
        actions={
          <>
            <Button variant="outline" onClick={handleExportData}>
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Post New Job
            </Button>
          </>
        }
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Search and Filters */}
      <FilterBar>
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search jobs, company, skills, location..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>

        <Select value={departmentFilter} onValueChange={(val) => {
          setDepartmentFilter(val);
          applyFilters(searchQuery, val, workModeFilter, statusFilter);
        }}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            <SelectItem value="engineering">Engineering</SelectItem>
            <SelectItem value="design">Design</SelectItem>
            <SelectItem value="product">Product</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
            <SelectItem value="sales">Sales</SelectItem>
            <SelectItem value="analytics">Analytics</SelectItem>
          </SelectContent>
        </Select>

        <Select value={workModeFilter} onValueChange={(val) => {
          setWorkModeFilter(val);
          applyFilters(searchQuery, departmentFilter, val, statusFilter);
        }}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Work Mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Modes</SelectItem>
            <SelectItem value="remote">Remote</SelectItem>
            <SelectItem value="hybrid">Hybrid</SelectItem>
            <SelectItem value="on-site">On-site</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={(val) => {
          setStatusFilter(val);
          applyFilters(searchQuery, departmentFilter, workModeFilter, val);
        }}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </FilterBar>

      {/* Data Table */}
      <DataTable columns={columns} data={filteredData} />

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-semibold">{filteredData.length}</span> of <span className="font-semibold">{jobData.length}</span> jobs
        </p>
      </div>

      {/* New Job Dialog */}
      <NewJobDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen}
        onSubmit={handleAddJob}
      />

      {/* Preview Dialog */}
      <Dialog open={!!previewJob} onOpenChange={() => setPreviewJob(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{previewJob?.title}</DialogTitle>
            <DialogDescription>{previewJob?.company}</DialogDescription>
          </DialogHeader>
          
          {previewJob && (
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{previewJob.department}</Badge>
                <Badge variant="outline">{previewJob.location}</Badge>
                <Badge variant="outline">{previewJob.workMode}</Badge>
                <Badge variant="outline">{previewJob.jobType}</Badge>
                <Badge variant="outline">{previewJob.experience}</Badge>
                <Badge variant="default" className="bg-green-600">{previewJob.salary}</Badge>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Job Description</h3>
                <p className="text-muted-foreground whitespace-pre-line">{previewJob.description}</p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Responsibilities</h3>
                <p className="text-muted-foreground whitespace-pre-line">{previewJob.responsibilities}</p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Requirements</h3>
                <p className="text-muted-foreground whitespace-pre-line">{previewJob.requirements}</p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {previewJob.skills.split(',').map((skill: string, index: number) => (
                    <Badge key={index} variant="secondary">{skill.trim()}</Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-sm text-muted-foreground">Openings</p>
                  <p className="font-semibold">{previewJob.openings}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Education</p>
                  <p className="font-semibold">{previewJob.education}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Posted Date</p>
                  <p className="font-semibold">{new Date(previewJob.postedDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Application Deadline</p>
                  <p className="font-semibold">{new Date(previewJob.closingDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}