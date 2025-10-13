"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  IndianRupee,
  FileText,
  Eye,
  CheckCircle2
} from "lucide-react";

interface NewJobDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (job: any) => void;
}

export function NewJobDialog({ open, onOpenChange, onSubmit }: NewJobDialogProps) {
  const [currentTab, setCurrentTab] = useState("basic");
  const [formData, setFormData] = useState({
    // Basic Info
    title: "",
    company: "",
    department: "",
    location: "",
    workMode: "Hybrid",
    jobType: "Full-time",
    openings: "1",
    
    // Requirements
    experience: "",
    education: "",
    skills: "",
    
    // Compensation
    salaryMin: "",
    salaryMax: "",
    salaryVisible: true,
    
    // Details
    description: "",
    responsibilities: "",
    requirements: "",
    benefits: "",
    
    // Settings
    closingDate: "",
    priority: "Normal",
    screeningQuestions: "",
    isDraft: false,
  });

  const handleSubmit = (isDraft: boolean = false) => {
    onSubmit({ ...formData, isDraft });
    // Reset form
    setFormData({
      title: "",
      company: "",
      department: "",
      location: "",
      workMode: "Hybrid",
      jobType: "Full-time",
      openings: "1",
      experience: "",
      education: "",
      skills: "",
      salaryMin: "",
      salaryMax: "",
      salaryVisible: true,
      description: "",
      responsibilities: "",
      requirements: "",
      benefits: "",
      closingDate: "",
      priority: "Normal",
      screeningQuestions: "",
      isDraft: false,
    });
    setCurrentTab("basic");
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Post New Job</DialogTitle>
          <DialogDescription>
            Fill in all the details to create a professional job posting
          </DialogDescription>
        </DialogHeader>

        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">
              <Building2 className="w-4 h-4 mr-2" />
              Basic Info
            </TabsTrigger>
            <TabsTrigger value="requirements">
              <GraduationCap className="w-4 h-4 mr-2" />
              Requirements
            </TabsTrigger>
            <TabsTrigger value="details">
              <FileText className="w-4 h-4 mr-2" />
              Job Details
            </TabsTrigger>
            <TabsTrigger value="preview">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </TabsTrigger>
          </TabsList>

          {/* Tab 1: Basic Info */}
          <TabsContent value="basic" className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title *</Label>
              <Input
                id="title"
                placeholder="e.g. Senior Frontend Developer"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company Name *</Label>
              <Input
                id="company"
                placeholder="e.g. TechCorp Solutions Pvt Ltd"
                value={formData.company}
                onChange={(e) => handleChange("company", e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department">Department *</Label>
                <Select
                  value={formData.department}
                  onValueChange={(value) => handleChange("department", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Product">Product</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Analytics">Analytics</SelectItem>
                    <SelectItem value="HR">HR</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  placeholder="e.g. Bangalore, Karnataka"
                  value={formData.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="workMode">Work Mode *</Label>
                <Select
                  value={formData.workMode}
                  onValueChange={(value) => handleChange("workMode", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Remote">Remote</SelectItem>
                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                    <SelectItem value="On-site">On-site</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobType">Job Type *</Label>
                <Select
                  value={formData.jobType}
                  onValueChange={(value) => handleChange("jobType", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="openings">Number of Openings *</Label>
                <Input
                  id="openings"
                  type="number"
                  min="1"
                  value={formData.openings}
                  onChange={(e) => handleChange("openings", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={() => setCurrentTab("requirements")}>
                Next: Requirements →
              </Button>
            </div>
          </TabsContent>

          {/* Tab 2: Requirements */}
          <TabsContent value="requirements" className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label htmlFor="experience">Experience Required *</Label>
              <Input
                id="experience"
                placeholder="e.g. 3-5 years"
                value={formData.experience}
                onChange={(e) => handleChange("experience", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="education">Education Qualification *</Label>
              <Select
                value={formData.education}
                onValueChange={(value) => handleChange("education", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select minimum education" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="High School">High School</SelectItem>
                  <SelectItem value="Diploma">Diploma</SelectItem>
                  <SelectItem value="Bachelor's">Bachelor's Degree</SelectItem>
                  <SelectItem value="Bachelor's in CS">Bachelor's in CS/IT</SelectItem>
                  <SelectItem value="Master's">Master's Degree</SelectItem>
                  <SelectItem value="MBA">MBA</SelectItem>
                  <SelectItem value="PhD">PhD</SelectItem>
                  <SelectItem value="Any">Any Graduate</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Required Skills *</Label>
              <Input
                id="skills"
                placeholder="e.g. React, TypeScript, Node.js (comma separated)"
                value={formData.skills}
                onChange={(e) => handleChange("skills", e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                Separate multiple skills with commas
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="salaryRange">Salary Range (in LPA) *</Label>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Min (e.g. 12)"
                  value={formData.salaryMin}
                  onChange={(e) => handleChange("salaryMin", e.target.value)}
                  required
                />
                <Input
                  placeholder="Max (e.g. 18)"
                  value={formData.salaryMax}
                  onChange={(e) => handleChange("salaryMax", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <Label htmlFor="salaryVisible" className="font-semibold">
                  Show Salary to Candidates
                </Label>
                <p className="text-sm text-muted-foreground">
                  Display salary range in the job posting
                </p>
              </div>
              <Switch
                id="salaryVisible"
                checked={formData.salaryVisible}
                onCheckedChange={(checked) => handleChange("salaryVisible", checked)}
              />
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentTab("basic")}>
                ← Back
              </Button>
              <Button onClick={() => setCurrentTab("details")}>
                Next: Job Details →
              </Button>
            </div>
          </TabsContent>

          {/* Tab 3: Job Details */}
          <TabsContent value="details" className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label htmlFor="description">Job Description *</Label>
              <Textarea
                id="description"
                placeholder="Provide a detailed description of the role..."
                rows={4}
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="responsibilities">Key Responsibilities</Label>
              <Textarea
                id="responsibilities"
                placeholder="• Lead frontend development&#10;• Collaborate with design team&#10;• Mentor junior developers"
                rows={4}
                value={formData.responsibilities}
                onChange={(e) => handleChange("responsibilities", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="requirements">Must-Have Requirements</Label>
              <Textarea
                id="requirements"
                placeholder="• 5+ years of React experience&#10;• Strong TypeScript skills&#10;• Experience with modern state management"
                rows={4}
                value={formData.requirements}
                onChange={(e) => handleChange("requirements", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="benefits">Benefits & Perks</Label>
              <Textarea
                id="benefits"
                placeholder="• Health insurance&#10;• Flexible working hours&#10;• Learning & development budget"
                rows={3}
                value={formData.benefits}
                onChange={(e) => handleChange("benefits", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="closingDate">Application Deadline *</Label>
                <Input
                  id="closingDate"
                  type="date"
                  value={formData.closingDate}
                  onChange={(e) => handleChange("closingDate", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Hiring Priority</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) => handleChange("priority", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Normal">Normal</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="screeningQuestions">Screening Questions (Optional)</Label>
              <Textarea
                id="screeningQuestions"
                placeholder="Add custom questions for applicants (one per line)"
                rows={3}
                value={formData.screeningQuestions}
                onChange={(e) => handleChange("screeningQuestions", e.target.value)}
              />
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentTab("requirements")}>
                ← Back
              </Button>
              <Button onClick={() => setCurrentTab("preview")}>
                Preview →
              </Button>
            </div>
          </TabsContent>

          {/* Tab 4: Preview */}
          <TabsContent value="preview" className="mt-6">
            <div className="border rounded-lg p-6 bg-card">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    {formData.title || "Job Title"}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-4">
                    {formData.company || "Company Name"}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{formData.department || "Department"}</Badge>
                    <Badge variant="outline">{formData.location || "Location"}</Badge>
                    <Badge variant="outline">{formData.workMode}</Badge>
                    <Badge variant="outline">{formData.jobType}</Badge>
                    <Badge variant="outline">{formData.experience || "Experience"}</Badge>
                    {formData.salaryVisible && (
                      <Badge variant="default" className="bg-green-600">
                        ₹{formData.salaryMin || "XX"}-{formData.salaryMax || "XX"} LPA
                      </Badge>
                    )}
                  </div>
                </div>

                {formData.description && (
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Job Description</h3>
                    <p className="text-muted-foreground whitespace-pre-line">
                      {formData.description}
                    </p>
                  </div>
                )}

                {formData.responsibilities && (
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Key Responsibilities</h3>
                    <p className="text-muted-foreground whitespace-pre-line">
                      {formData.responsibilities}
                    </p>
                  </div>
                )}

                {formData.requirements && (
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Requirements</h3>
                    <p className="text-muted-foreground whitespace-pre-line">
                      {formData.requirements}
                    </p>
                  </div>
                )}

                {formData.skills && (
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {formData.skills.split(',').map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill.trim()}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {formData.benefits && (
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Benefits</h3>
                    <p className="text-muted-foreground whitespace-pre-line">
                      {formData.benefits}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setCurrentTab("details")}>
                ← Back to Edit
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => handleSubmit(true)}>
                  Save as Draft
                </Button>
                <Button onClick={() => handleSubmit(false)}>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Publish Job
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}