"use client";

import { PageHeader } from "@/components/layout/PageHeaderRec";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Save, Plus, X, CheckCircle, Edit, Trash2, Copy, Send } from "lucide-react";
import { useState } from "react";
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

interface EligibilityCriteria {
  id: number;
  role: string;
  minCGPA: string;
  maxBacklogs: string;
  gradYear: string;
  branches: string[];
  skills: string[];
  minExperience: string;
  portfolioRequired: boolean;
  workAuthRequired: boolean;
  min10thPercentage: string;
  min12thPercentage: string;
  createdAt: string;
}

const initialCriteria: EligibilityCriteria[] = [
  {
    id: 1,
    role: "Senior Frontend Developer",
    minCGPA: "7.5",
    maxBacklogs: "0",
    gradYear: "2025",
    branches: ["Computer Science", "IT"],
    skills: ["React", "TypeScript", "Node.js"],
    minExperience: "24",
    portfolioRequired: true,
    workAuthRequired: false,
    min10thPercentage: "60",
    min12thPercentage: "70",
    createdAt: "2024-01-10",
  },
  {
    id: 2,
    role: "Data Scientist",
    minCGPA: "8.0",
    maxBacklogs: "0",
    gradYear: "2025",
    branches: ["Computer Science", "Data Science"],
    skills: ["Python", "ML", "TensorFlow"],
    minExperience: "12",
    portfolioRequired: true,
    workAuthRequired: false,
    min10thPercentage: "70",
    min12thPercentage: "75",
    createdAt: "2024-01-08",
  },
  {
    id: 3,
    role: "UI/UX Designer",
    minCGPA: "7.0",
    maxBacklogs: "1",
    gradYear: "2026",
    branches: ["Design", "Computer Science"],
    skills: ["Figma", "Sketch", "Prototyping"],
    minExperience: "6",
    portfolioRequired: true,
    workAuthRequired: false,
    min10thPercentage: "50",
    min12thPercentage: "60",
    createdAt: "2024-01-05",
  },
];

export default function EligibilityCriteria() {
  const [savedCriteria, setSavedCriteria] = useState<EligibilityCriteria[]>(initialCriteria);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form state
  const [jobRole, setJobRole] = useState("");
  const [minCGPA, setMinCGPA] = useState("");
  const [maxBacklogs, setMaxBacklogs] = useState("");
  const [gradYear, setGradYear] = useState("");
  const [selectedBranches, setSelectedBranches] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [minExperience, setMinExperience] = useState("");
  const [portfolioRequired, setPortfolioRequired] = useState(false);
  const [workAuthRequired, setWorkAuthRequired] = useState(false);
  const [min10thPercentage, setMin10thPercentage] = useState("");
  const [min12thPercentage, setMin12thPercentage] = useState("");

  const branches = [
    "Computer Science",
    "Information Technology",
    "Electronics",
    "Mechanical",
    "Civil",
    "Data Science",
    "Design"
  ];

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const toggleBranch = (branch: string) => {
    setSelectedBranches(prev =>
      prev.includes(branch)
        ? prev.filter(b => b !== branch)
        : [...prev, branch]
    );
  };

  const resetForm = () => {
    setJobRole("");
    setMinCGPA("");
    setMaxBacklogs("");
    setGradYear("");
    setSelectedBranches([]);
    setSkills([]);
    setMinExperience("");
    setPortfolioRequired(false);
    setWorkAuthRequired(false);
    setMin10thPercentage("");
    setMin12thPercentage("");
    setEditingId(null);
  };

  const validateForm = () => {
    if (!jobRole.trim()) {
      alert("Please enter a job role");
      return false;
    }
    if (!minCGPA || parseFloat(minCGPA) < 0 || parseFloat(minCGPA) > 10) {
      alert("Please enter a valid CGPA (0-10)");
      return false;
    }
    if (!gradYear) {
      alert("Please select a graduation year");
      return false;
    }
    if (selectedBranches.length === 0) {
      alert("Please select at least one eligible branch");
      return false;
    }
    if (skills.length === 0) {
      alert("Please add at least one required skill");
      return false;
    }
    if (!min10thPercentage || parseFloat(min10thPercentage) < 0 || parseFloat(min10thPercentage) > 100) {
      alert("Please enter a valid 10th percentage (0-100)");
      return false;
    }
    if (!min12thPercentage || parseFloat(min12thPercentage) < 0 || parseFloat(min12thPercentage) > 100) {
      alert("Please enter a valid 12th percentage (0-100)");
      return false;
    }
    return true;
  };

  const saveCriteria = () => {
    if (!validateForm()) return;

    const criteriaData: EligibilityCriteria = {
      id: editingId || Date.now(),
      role: jobRole,
      minCGPA,
      maxBacklogs: maxBacklogs || "0",
      gradYear,
      branches: selectedBranches,
      skills,
      minExperience: minExperience || "0",
      portfolioRequired,
      workAuthRequired,
      min10thPercentage,
      min12thPercentage,
      createdAt: new Date().toISOString().split('T')[0],
    };

    if (editingId) {
      setSavedCriteria(savedCriteria.map(c => c.id === editingId ? criteriaData : c));
    } else {
      setSavedCriteria([criteriaData, ...savedCriteria]);
    }

    resetForm();
  };

  const editCriteriaHandler = (criteria: EligibilityCriteria) => {
    setEditingId(criteria.id);
    setJobRole(criteria.role);
    setMinCGPA(criteria.minCGPA);
    setMaxBacklogs(criteria.maxBacklogs);
    setGradYear(criteria.gradYear);
    setSelectedBranches(criteria.branches);
    setSkills(criteria.skills);
    setMinExperience(criteria.minExperience);
    setPortfolioRequired(criteria.portfolioRequired);
    setWorkAuthRequired(criteria.workAuthRequired);
    setMin10thPercentage(criteria.min10thPercentage);
    setMin12thPercentage(criteria.min12thPercentage);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const duplicateCriteria = (criteria: EligibilityCriteria) => {
    setEditingId(null);
    setJobRole(criteria.role + " (Copy)");
    setMinCGPA(criteria.minCGPA);
    setMaxBacklogs(criteria.maxBacklogs);
    setGradYear(criteria.gradYear);
    setSelectedBranches(criteria.branches);
    setSkills(criteria.skills);
    setMinExperience(criteria.minExperience);
    setPortfolioRequired(criteria.portfolioRequired);
    setWorkAuthRequired(criteria.workAuthRequired);
    setMin10thPercentage(criteria.min10thPercentage);
    setMin12thPercentage(criteria.min12thPercentage);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteCriteria = (id: number) => {
    if (confirm("Are you sure you want to delete this criteria?")) {
      setSavedCriteria(savedCriteria.filter(c => c.id !== id));
    }
  };

  const sendToPlacementCell = () => {
    if (savedCriteria.length === 0) {
      alert("No criteria to send. Please create at least one eligibility criteria.");
      return;
    }

    // Generate criteria-only document (no email draft content)
    const generateDocument = () => {
      const header = `Eligibility Criteria Summary
Date: ${new Date().toLocaleDateString('en-IN')}
Total Positions: ${savedCriteria.length}

`;

      const body = savedCriteria
        .map((criteria, index) => {
          const additionalReqs = [
            criteria.portfolioRequired ? "Portfolio/GitHub Required" : null,
            criteria.workAuthRequired ? "Work Authorization Required" : null,
          ]
            .filter(Boolean)
            .join(" | ") || "None";

          return `#${index + 1} ${criteria.role}
- Graduation Year: ${criteria.gradYear}
- Minimum CGPA: ${criteria.minCGPA}
- Maximum Active Backlogs: ${criteria.maxBacklogs}
- Minimum Experience: ${criteria.minExperience} months
- 10th Percentage: ${criteria.min10thPercentage}%
- 12th Percentage: ${criteria.min12thPercentage}%
- Eligible Branches: ${criteria.branches.join(", ")}
- Required Skills: ${criteria.skills.join(", ")}
- Additional Requirements: ${additionalReqs}
- Created At: ${new Date(criteria.createdAt).toLocaleDateString('en-IN')}

----------------------------------------
`;
        })
        .join("");

      return header + body;
    };

    // Create and download the criteria-only file
    const documentContent = generateDocument();
    const blob = new Blob([documentContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const fileName = `Eligibility_Criteria_${new Date().toISOString().split('T')[0]}.txt`;

    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Prepare email content (draft body only, file is separate)
    const emailSubject = `Campus Recruitment - Eligibility Criteria for ${savedCriteria.length} Position${savedCriteria.length > 1 ? 's' : ''} (${new Date().toLocaleDateString('en-IN')})`;

    const emailBody = `Dear Placement Cell Team,

Greetings!

Please find attached the detailed eligibility criteria document for our upcoming campus recruitment drive covering ${savedCriteria.length} job position${savedCriteria.length > 1 ? 's' : ''}.

Key Highlights:
${savedCriteria.slice(0, 5).map((c, i) => `${i + 1}. ${c.role} - ${c.gradYear} Graduates`).join('\n')}${savedCriteria.length > 5 ? '\n... and more positions' : ''}

📎 Please attach the downloaded file: "${fileName}"

We request you to:
✓ Verify the criteria with respective departments
✓ Circulate to eligible students through official channels
✓ Update the placement portal accordingly
✓ Confirm receipt of this communication

For any clarifications, please feel free to reach out.

Best Regards,
Recruitment Team
Campus Hiring Division

---
Document Generated: ${new Date().toLocaleString('en-IN')}
Total Positions: ${savedCriteria.length}`;

    // Open Gmail with pre-filled email
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=placement@college.edu&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    // Open in new tab
    window.open(gmailUrl, '_blank');

    // Show success message with instructions
    setTimeout(() => {
      alert(`✅ Success!
      
1. File "${fileName}" has been downloaded
2. Gmail compose window has opened
3. Please attach the downloaded file to the email
4. Review and send the email

The file is saved in your Downloads folder.`);
    }, 1000);
  };

  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="Eligibility Criteria"
        description="Set specific eligibility requirements and skills for candidate filtering"
        actions={
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={sendToPlacementCell}
              disabled={savedCriteria.length === 0}
            >
              <Send className="w-4 h-4 mr-2" />
              Send to Placement Cell
            </Button>
            <Button onClick={saveCriteria}>
              <Save className="w-4 h-4 mr-2" />
              {editingId ? "Update Criteria" : "Save Criteria"}
            </Button>
          </div>
        }
      />

      <Card className="p-6 bg-gradient-card shadow-card border-border mb-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">
            {editingId ? "Edit Eligibility Requirements" : "Define New Eligibility Requirements"}
          </h3>
          {editingId && (
            <Button variant="outline" size="sm" onClick={resetForm}>
              <X className="w-4 h-4 mr-2" />
              Cancel Edit
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="jobRole">Job Role *</Label>
              <Input
                id="jobRole"
                placeholder="e.g., Software Developer"
                className="mt-2 bg-input border-border"
                value={jobRole}
                onChange={(e) => setJobRole(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="minCGPA">Minimum CGPA *</Label>
              <Input
                id="minCGPA"
                type="number"
                step="0.1"
                min="0"
                max="10"
                placeholder="e.g., 7.5"
                className="mt-2 bg-input border-border"
                value={minCGPA}
                onChange={(e) => setMinCGPA(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="min10thPercentage">Minimum 10th Percentage *</Label>
              <Input
                id="min10thPercentage"
                type="number"
                min="0"
                max="100"
                placeholder="e.g., 60"
                className="mt-2 bg-input border-border"
                value={min10thPercentage}
                onChange={(e) => setMin10thPercentage(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="min12thPercentage">Minimum 12th Percentage *</Label>
              <Input
                id="min12thPercentage"
                type="number"
                min="0"
                max="100"
                placeholder="e.g., 70"
                className="mt-2 bg-input border-border"
                value={min12thPercentage}
                onChange={(e) => setMin12thPercentage(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="maxBacklogs">Maximum Active Backlogs</Label>
              <Input
                id="maxBacklogs"
                type="number"
                min="0"
                placeholder="e.g., 0"
                className="mt-2 bg-input border-border"
                value={maxBacklogs}
                onChange={(e) => setMaxBacklogs(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="gradYear">Graduation Year *</Label>
              <Select value={gradYear} onValueChange={setGradYear}>
                <SelectTrigger id="gradYear" className="mt-2">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2026">2026</SelectItem>
                  <SelectItem value="2027">2027</SelectItem>
                  <SelectItem value="2028">2028</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-3 block">Eligible Branches *</Label>
              <div className="space-y-2">
                {branches.map((branch) => (
                  <div key={branch} className="flex items-center gap-2">
                    <Checkbox
                      id={branch}
                      checked={selectedBranches.includes(branch)}
                      onCheckedChange={() => toggleBranch(branch)}
                    />
                    <label htmlFor={branch} className="text-sm text-foreground cursor-pointer">
                      {branch}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Required Skills *</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  placeholder="Add a skill"
                  className="bg-input border-border"
                />
                <Button onClick={addSkill} size="icon" type="button">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 min-h-[120px] p-4 bg-muted rounded-lg">
              {skills.length === 0 ? (
                <p className="text-sm text-muted-foreground">No skills added yet</p>
              ) : (
                skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="px-3 py-1 flex items-center gap-2"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(skill)}
                      className="hover:text-destructive"
                      type="button"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))
              )}
            </div>

            <div>
              <Label htmlFor="minExp">Minimum Experience (Months)</Label>
              <Input
                id="minExp"
                type="number"
                min="0"
                placeholder="e.g., 6 (for internships)"
                className="mt-2 bg-input border-border"
                value={minExperience}
                onChange={(e) => setMinExperience(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 mt-4">
              <Checkbox
                id="portfolio"
                checked={portfolioRequired}
                onCheckedChange={(checked) => setPortfolioRequired(checked as boolean)}
              />
              <label htmlFor="portfolio" className="text-sm text-foreground cursor-pointer">
                Portfolio/GitHub Required
              </label>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="workAuth"
                checked={workAuthRequired}
                onCheckedChange={(checked) => setWorkAuthRequired(checked as boolean)}
              />
              <label htmlFor="workAuth" className="text-sm text-foreground cursor-pointer">
                Work Authorization Required
              </label>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-card shadow-card border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Saved Eligibility Criteria ({savedCriteria.length})
        </h3>

        {savedCriteria.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>No eligibility criteria saved yet.</p>
            <p className="text-sm mt-2">Create your first criteria using the form above.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {savedCriteria.map((criteria) => (
              <div
                key={criteria.id}
                className={`p-4 bg-muted rounded-lg border transition-colors ${
                  editingId === criteria.id
                    ? 'border-primary'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      {criteria.role}
                      <CheckCircle className="w-4 h-4 text-success" />
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Graduation Year: {criteria.gradYear} • Created: {new Date(criteria.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm" variant="ghost">
                        •••
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onSelect={() => editCriteriaHandler(criteria)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => duplicateCriteria(criteria)}>
                        <Copy className="w-4 h-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive"
                        onSelect={() => deleteCriteria(criteria.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                  <div>
                    <p className="text-muted-foreground">Min CGPA</p>
                    <p className="font-medium text-foreground">{criteria.minCGPA}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">10th %</p>
                    <p className="font-medium text-foreground">{criteria.min10thPercentage}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">12th %</p>
                    <p className="font-medium text-foreground">{criteria.min12thPercentage}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Max Backlogs</p>
                    <p className="font-medium text-foreground">{criteria.maxBacklogs}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Min Experience</p>
                    <p className="font-medium text-foreground">{criteria.minExperience} months</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Requirements</p>
                    <div className="flex gap-1 mt-1 flex-wrap">
                      {criteria.portfolioRequired && (
                        <Badge variant="outline" className="text-xs">Portfolio</Badge>
                      )}
                      {criteria.workAuthRequired && (
                        <Badge variant="outline" className="text-xs">Work Auth</Badge>
                      )}
                      {!criteria.portfolioRequired && !criteria.workAuthRequired && (
                        <span className="text-xs text-muted-foreground">None</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-muted-foreground text-sm mb-2">Eligible Branches</p>
                  <div className="flex flex-wrap gap-1">
                    {criteria.branches.map((branch) => (
                      <Badge key={branch} variant="outline" className="text-xs">
                        {branch}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-muted-foreground text-sm mb-2">Required Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {criteria.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}