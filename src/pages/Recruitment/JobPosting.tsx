"use client";

import { useState, useEffect } from "react";
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
  MoreVertical,
  UserCheck,
  Users,
  IndianRupee,
  EyeOff
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
import { 
  getAllJobPostings, 
  deleteJobPosting, 
  updateJobPosting
} from "@/pages/Recruitment/Services/jobPostingService";
import type { JobPosting } from "@/pages/Recruitment/Services/jobPostingService";

const stats = [
  { title: "Total Job Views", value: "24.5K", icon: Eye, trend: { value: 18, isPositive: true } },
  { title: "Active Postings", value: 24, icon: FileText, trend: { value: 12, isPositive: true } },
  { title: "Application Rate", value: "3.2%", icon: TrendingUp, trend: { value: 8, isPositive: true }, description: "Views to Applications" },
  { title: "Avg. Time to Fill", value: "18 Days", icon: Clock, trend: { value: 5, isPositive: false } },
];

export default function JobPosting() {
  const [jobData, setJobData] = useState<JobPosting[]>([]);
  const [filteredData, setFilteredData] = useState<JobPosting[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [previewJob, setPreviewJob] = useState<JobPosting | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Filters
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [workModeFilter, setWorkModeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Load job postings from Firestore
  useEffect(() => {
    loadJobPostings();
  }, []);

  const loadJobPostings = async () => {
    try {
      setIsLoading(true);
      const jobPostings = await getAllJobPostings();
      setJobData(jobPostings);
      setFilteredData(jobPostings);
    } catch (error) {
      console.error("Error loading job postings:", error);
      alert("Error loading job postings");
    } finally {
      setIsLoading(false);
    }
  };

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
      "Salary Min",
      "Salary Max",
      "Salary Visible",
      "Openings",
      "Openings Visible",
      "Recruiter Name",
      "Recruiter Email",
      "Recruiter Phone",
      "Recruiter Visible",
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
        job.salaryMin,
        job.salaryMax,
        job.salaryVisible,
        job.openings,
        job.openingsVisible,
        `"${job.recruiterName || ''}"`,
        `"${job.recruiterEmail || ''}"`,
        `"${job.recruiterPhone || ''}"`,
        job.recruiterVisible,
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

  // Apply all filters
  const applyFilters = (
    search: string,
    dept: string,
    mode: string,
    status: string,
    baseList: JobPosting[] = jobData
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
  const handleAddJob = async (newJob: JobPosting) => {
    try {
      // Reload job postings to get the latest data including the new job
      await loadJobPostings();
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  // Delete job
  const handleDeleteJob = async (id: string) => {
    if (confirm("Are you sure you want to delete this job posting?")) {
      try {
        await deleteJobPosting(id);
        // Remove from local state
        const updatedJobs = jobData.filter(job => job.id !== id);
        setJobData(updatedJobs);
        applyFilters(searchQuery, departmentFilter, workModeFilter, statusFilter, updatedJobs);
      } catch (error) {
        console.error("Error deleting job:", error);
        alert("Error deleting job posting");
      }
    }
  };

  // Close job
  const handleCloseJob = async (id: string) => {
    if (confirm("Are you sure you want to close this job posting?")) {
      try {
        await updateJobPosting(id, { status: "Closed" });
        // Update local state
        const updatedJobs = jobData.map(job => 
          job.id === id ? { ...job, status: "Closed" } : job
        );
        setJobData(updatedJobs);
        applyFilters(searchQuery, departmentFilter, workModeFilter, statusFilter, updatedJobs);
      } catch (error) {
        console.error("Error closing job:", error);
        alert("Error closing job posting");
      }
    }
  };

  // Preview job
  const handlePreviewJob = (job: JobPosting) => {
    setPreviewJob(job);
  };

  const columns = [
    { 
      header: "Job Title", 
      accessor: "title",
      cell: (value: string, row: JobPosting) => (
        <div className="min-w-[220px]">
          <div className="font-semibold text-foreground mb-1">{value}</div>
          <div className="text-xs text-muted-foreground mb-2">{row.company}</div>
          <div className="flex gap-1 flex-wrap">
            <Badge variant="outline" className="text-xs">{row.department}</Badge>
            <Badge variant="outline" className="text-xs">{row.workMode}</Badge>
            {/* Show visibility indicators */}
            {!row.salaryVisible && (
              <Badge variant="secondary" className="text-xs">
                <EyeOff className="w-3 h-3 mr-1" />
                Salary Hidden
              </Badge>
            )}
            {!row.openingsVisible && (
              <Badge variant="secondary" className="text-xs">
                <EyeOff className="w-3 h-3 mr-1" />
                Openings Hidden
              </Badge>
            )}
          </div>
        </div>
      ),
    },
    { 
      header: "Location & Experience", 
      accessor: "location",
      cell: (value: string, row: JobPosting) => (
        <div className="min-w-[140px]">
          <div className="text-sm text-muted-foreground">{value}</div>
          <div className="text-xs text-muted-foreground mt-1">{row.experience}</div>
        </div>
      ),
    },
    { 
      header: "Openings", 
      accessor: "openings",
      cell: (value: number, row: JobPosting) => (
        <div className="text-center">
          <span className="font-semibold text-lg">{value}</span>
          {row.openingsVisible ? (
            <div className="text-xs text-green-600">Visible</div>
          ) : (
            <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
              <EyeOff className="w-3 h-3" />
              Hidden
            </div>
          )}
        </div>
      ),
    },
    {
      header: "Applications",
      accessor: "applicants",
      cell: (value: number, row: JobPosting) => (
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
      cell: (value: number, row: JobPosting) => (
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
      cell: (value: string, row: JobPosting) => (
        <div>
          {row.salaryVisible ? (
            <span className="font-semibold text-green-600 text-sm">₹{row.salaryMin}-{row.salaryMax} LPA</span>
          ) : (
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <EyeOff className="w-3 h-3" />
              Hidden
            </div>
          )}
        </div>
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
      cell: (value: string, row: JobPosting) => (
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
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="text-muted-foreground">Loading job postings...</div>
        </div>
      ) : (
        <>
          <DataTable columns={columns} data={filteredData} />

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-semibold">{filteredData.length}</span> of <span className="font-semibold">{jobData.length}</span> jobs
            </p>
          </div>
        </>
      )}

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
              {/* Badges Section */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{previewJob.department}</Badge>
                <Badge variant="outline">{previewJob.location}</Badge>
                <Badge variant="outline">{previewJob.workMode}</Badge>
                <Badge variant="outline">{previewJob.jobType}</Badge>
                <Badge variant="outline">{previewJob.experience}</Badge>
                {previewJob.salaryVisible && (
                  <Badge variant="default" className="bg-green-600">
                    <IndianRupee className="w-3 h-3 mr-1" />
                    ₹{previewJob.salaryMin}-{previewJob.salaryMax} LPA
                  </Badge>
                )}
                {previewJob.openingsVisible && (
                  <Badge variant="secondary">
                    <Users className="w-3 h-3 mr-1" />
                    {previewJob.openings} opening{previewJob.openings !== 1 ? 's' : ''}
                  </Badge>
                )}
              </div>

              {/* Hidden Information Notice */}
              {(!previewJob.salaryVisible || !previewJob.recruiterVisible || !previewJob.openingsVisible) && (
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
                    <EyeOff className="w-4 h-4" />
                    <span className="text-sm font-medium">Information hidden from candidates:</span>
                  </div>
                  <ul className="text-sm text-amber-700 dark:text-amber-300 mt-1 ml-6">
                    {!previewJob.salaryVisible && <li>• Salary range: ₹{previewJob.salaryMin}-{previewJob.salaryMax} LPA</li>}
                    {!previewJob.recruiterVisible && <li>• Recruiter contact details</li>}
                    {!previewJob.openingsVisible && <li>• Number of openings: {previewJob.openings}</li>}
                  </ul>
                </div>
              )}

              <div>
                <h3 className="font-semibold text-lg mb-2">Job Description</h3>
                <p className="text-muted-foreground whitespace-pre-line">{previewJob.description}</p>
              </div>

              {previewJob.responsibilities && (
                <div>
                  <h3 className="font-semibold text-lg mb-2">Responsibilities</h3>
                  <p className="text-muted-foreground whitespace-pre-line">{previewJob.responsibilities}</p>
                </div>
              )}

              {previewJob.requirements && (
                <div>
                  <h3 className="font-semibold text-lg mb-2">Requirements</h3>
                  <p className="text-muted-foreground whitespace-pre-line">{previewJob.requirements}</p>
                </div>
              )}

              {previewJob.benefits && (
                <div>
                  <h3 className="font-semibold text-lg mb-2">Benefits & Perks</h3>
                  <p className="text-muted-foreground whitespace-pre-line">{previewJob.benefits}</p>
                </div>
              )}

              <div>
                <h3 className="font-semibold text-lg mb-2">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {previewJob.skills.split(',').map((skill: string, index: number) => (
                    <Badge key={index} variant="secondary">{skill.trim()}</Badge>
                  ))}
                </div>
              </div>

              {previewJob.screeningQuestions && (
                <div>
                  <h3 className="font-semibold text-lg mb-2">Screening Questions</h3>
                  <p className="text-muted-foreground whitespace-pre-line">{previewJob.screeningQuestions}</p>
                </div>
              )}

              {/* Recruiter Contact Section */}
              {previewJob.recruiterVisible && previewJob.recruiterName && (
                <div className="border-t pt-4">
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <UserCheck className="w-5 h-5" />
                    Recruiter Contact
                  </h3>
                  <div className="space-y-1 text-muted-foreground">
                    {previewJob.recruiterName && <p><span className="font-medium">Name:</span> {previewJob.recruiterName}</p>}
                    {previewJob.recruiterEmail && <p><span className="font-medium">Email:</span> {previewJob.recruiterEmail}</p>}
                    {previewJob.recruiterPhone && <p><span className="font-medium">Phone:</span> {previewJob.recruiterPhone}</p>}
                  </div>
                </div>
              )}

              {/* Job Metadata */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-sm text-muted-foreground">Number of Openings</p>
                  <p className="font-semibold flex items-center gap-2">
                    {previewJob.openings}
                    {!previewJob.openingsVisible && (
                      <Badge variant="outline" className="text-xs">
                        <EyeOff className="w-3 h-3 mr-1" />
                        Hidden
                      </Badge>
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Salary Range</p>
                  <p className="font-semibold flex items-center gap-2">
                    ₹{previewJob.salaryMin}-{previewJob.salaryMax} LPA
                    {!previewJob.salaryVisible && (
                      <Badge variant="outline" className="text-xs">
                        <EyeOff className="w-3 h-3 mr-1" />
                        Hidden
                      </Badge>
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Education</p>
                  <p className="font-semibold">{previewJob.education}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Priority</p>
                  <Badge variant={previewJob.priority === "Urgent" ? "destructive" : previewJob.priority === "High" ? "default" : "outline"}>
                    {previewJob.priority}
                  </Badge>
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

              {/* Application Statistics */}
              <div className="border-t pt-4">
                <h3 className="font-semibold text-lg mb-3">Application Statistics</h3>
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{previewJob.applicants}</p>
                    <p className="text-sm text-muted-foreground">Applied</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{previewJob.shortlisted}</p>
                    <p className="text-sm text-muted-foreground">Shortlisted</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-600">{previewJob.interviewed}</p>
                    <p className="text-sm text-muted-foreground">Interviewed</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{previewJob.offered}</p>
                    <p className="text-sm text-muted-foreground">Offered</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}