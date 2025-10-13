import { PageHeader } from "@/components/layout/PageHeaderRec";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Calculator,
  Plus,
  X,
  Sparkles,
  Loader2,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { JobCriteria } from "@/pages/Recruitment/types/matching.types";
import { useMatching } from "@/pages/Recruitment/hooks/useMatching";
import { mockCandidates } from '@/pages/Recruitment/data/mockCandidates';
import { useToast } from "@/hooks/use-toast";
import { MatchProgress } from "@/pages/Recruitment/Components/MatchProgress";

export default function MatchCalculator() {
  const { toast } = useToast();
  const { status, error, calculateMatches, reset } = useMatching();

  // Form state
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    experience: 0,
    location: "",
    description: "",
  });

  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");

  const [weights, setWeights] = useState({
    skillMatch: 50,
    experience: 30,
    projectQuality: 20,
  });

  // Auto-save to localStorage
  useEffect(() => {
    const saved = localStorage.getItem("matchCalculatorDraft");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setFormData(data.formData);
        setSkills(data.skills);
        setWeights(data.weights);
      } catch {
        console.error("Failed to load draft");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "matchCalculatorDraft",
      JSON.stringify({
        formData,
        skills,
        weights,
      })
    );
  }, [formData, skills, weights]);

  // Handlers
  const addSkill = () => {
    const trimmedSkill = newSkill.trim();
    if (
      trimmedSkill &&
      !skills.some((s) => s.toLowerCase() === trimmedSkill.toLowerCase())
    ) {
      setSkills([...skills, trimmedSkill]);
      setNewSkill("");
    } else if (
      skills.some((s) => s.toLowerCase() === trimmedSkill.toLowerCase())
    ) {
      toast({
        title: "Duplicate Skill",
        description: "This skill is already added",
        variant: "destructive",
      });
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleWeightChange = (field: keyof typeof weights, value: number) => {
    const newValue = Math.max(0, Math.min(100, value));
    setWeights((prev) => ({ ...prev, [field]: newValue }));
  };

  const validateForm = (): boolean => {
    if (!formData.company.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter the company name",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.role.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter the job role",
        variant: "destructive",
      });
      return false;
    }

    if (skills.length === 0) {
      toast({
        title: "No Skills Added",
        description: "Please add at least one required skill",
        variant: "destructive",
      });
      return false;
    }

    const totalWeight =
      weights.skillMatch + weights.experience + weights.projectQuality;
    if (totalWeight !== 100) {
      toast({
        title: "Invalid Weights",
        description: `Weights must sum to 100% (currently ${totalWeight}%)`,
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleCalculateMatches = async () => {
    if (!validateForm()) return;

    const jobCriteria: JobCriteria = {
      ...formData,
      skills,
      weights,
    };

    try {
      const response = await calculateMatches(jobCriteria);

      toast({
        title: "Matches Calculated! 🎉",
        description: `Found ${response.results.length} matching candidates`,
      });

      // No navigation here as requested
    } catch (err: any) {
      console.error("Calculation error:", err);
    }
  };

  const handleReset = () => {
    setFormData({
      company: "",
      role: "",
      experience: 0,
      location: "",
      description: "",
    });
    setSkills([]);
    setWeights({
      skillMatch: 50,
      experience: 30,
      projectQuality: 20,
    });
    reset();
    localStorage.removeItem("matchCalculatorDraft");
    toast({
      title: "Form Reset",
      description: "All fields have been cleared",
    });
  };

  const totalWeight =
    weights.skillMatch + weights.experience + weights.projectQuality;
  const isWeightValid = totalWeight === 100;
  const isCalculating = status.status === "calculating";

  return (
    <div className="p-6 md:p-8 space-y-6">
      <PageHeader
        title="AI Match Fit Calculator"
        description="Configure job requirements and let AI find the best candidates"
        actions={
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleReset}
              disabled={isCalculating}
            >
              Reset Form
            </Button>
            <Button onClick={handleCalculateMatches} disabled={isCalculating}>
              {isCalculating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Calculate Matches
                </>
              )}
            </Button>
          </div>
        }
      />

      {/* Progress Indicator */}
      {isCalculating && <MatchProgress status={status} />}

      {/* Success Alert */}
      {status.status === "success" && (
        <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800 dark:text-green-200">
            {status.message}
          </AlertDescription>
        </Alert>
      )}

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Form Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Company & Role Details */}
        <Card className="p-6 bg-gradient-card shadow-card border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-primary" />
            Company & Role Details
          </h3>

          <div className="space-y-4">
            <div>
              <Label htmlFor="company">
                Company Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="company"
                placeholder="e.g., TechCorp Solutions"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                className="mt-2 bg-input border-border"
                disabled={isCalculating}
              />
            </div>

            <div>
              <Label htmlFor="role">
                Job Role <span className="text-destructive">*</span>
              </Label>
              <Input
                id="role"
                placeholder="e.g., Full Stack Developer"
                value={formData.role}
                onChange={(e) => handleInputChange("role", e.target.value)}
                className="mt-2 bg-input border-border"
                disabled={isCalculating}
              />
            </div>

            <div>
              <Label htmlFor="experience">Required Experience (Years)</Label>
              <Input
                id="experience"
                type="number"
                min="0"
                placeholder="0"
                value={formData.experience}
                onChange={(e) =>
                  handleInputChange("experience", Number(e.target.value))
                }
                className="mt-2 bg-input border-border"
                disabled={isCalculating}
              />
              <p className="text-xs text-muted-foreground mt-1">
                0 for freshers, 1+ for experienced roles
              </p>
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="e.g., Bangalore, Remote"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="mt-2 bg-input border-border"
                disabled={isCalculating}
              />
            </div>

            <div>
              <Label htmlFor="description">Job Description (Recommended)</Label>
              <Textarea
                id="description"
                placeholder="Describe the role, responsibilities, tech stack, and what makes an ideal candidate..."
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                className="mt-2 bg-input border-border min-h-[120px]"
                disabled={isCalculating}
              />
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                AI uses this for semantic matching & better insights
              </p>
            </div>
          </div>
        </Card>

        {/* Skills Section */}
        <Card className="p-6 bg-gradient-card shadow-card border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Required Skills <span className="text-destructive">*</span>
          </h3>

          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkill();
                  }
                }}
                placeholder="Add a skill (e.g., React, Python, AWS)"
                className="bg-input border-border"
                disabled={isCalculating}
              />
              <Button
                onClick={addSkill}
                size="icon"
                type="button"
                disabled={isCalculating}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 min-h-[140px] p-4 bg-muted rounded-lg border-2 border-dashed border-border">
              {skills.length === 0 ? (
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">
                    No skills added yet. Add at least one skill.
                  </p>
                </div>
              ) : (
                skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="px-3 py-1.5 flex items-center gap-2 text-sm"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(skill)}
                      className="hover:text-destructive transition-colors"
                      type="button"
                      disabled={isCalculating}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))
              )}
            </div>

            <div className="text-xs text-muted-foreground">
              {skills.length} skill{skills.length !== 1 ? "s" : ""} added
            </div>
          </div>

          <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
            <div className="flex items-start gap-2">
              <TrendingUp className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="text-sm text-foreground">
                <strong>AI-Powered Matching:</strong> Our system uses semantic
                analysis to match candidates even if they use different
                terminology (e.g., "React.js" vs "ReactJS" vs "React
                developer").
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Weighting Section */}
      <Card className="p-6 bg-gradient-card shadow-card border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Scoring Weights
          {!isWeightValid && (
            <span className="text-sm font-normal text-amber-600 dark:text-amber-400 ml-2">
              (Must total 100%)
            </span>
          )}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Label htmlFor="skillWeight" className="flex justify-between">
              <span>Skill Match</span>
              <span className="font-mono text-primary font-semibold">
                {weights.skillMatch}%
              </span>
            </Label>
            <Input
              id="skillWeight"
              type="number"
              min="0"
              max="100"
              value={weights.skillMatch}
              onChange={(e) =>
                handleWeightChange("skillMatch", Number(e.target.value))
              }
              className="mt-2 bg-input border-border"
              disabled={isCalculating}
            />
            <Progress value={weights.skillMatch} className="mt-2 h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              How important are exact skill matches
            </p>
          </div>

          <div>
            <Label htmlFor="expWeight" className="flex justify-between">
              <span>Experience</span>
              <span className="font-mono text-primary font-semibold">
                {weights.experience}%
              </span>
            </Label>
            <Input
              id="expWeight"
              type="number"
              min="0"
              max="100"
              value={weights.experience}
              onChange={(e) =>
                handleWeightChange("experience", Number(e.target.value))
              }
              className="mt-2 bg-input border-border"
              disabled={isCalculating}
            />
            <Progress value={weights.experience} className="mt-2 h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              Weight for years of experience
            </p>
          </div>

          <div>
            <Label htmlFor="projectWeight" className="flex justify-between">
              <span>Project Quality</span>
              <span className="font-mono text-primary font-semibold">
                {weights.projectQuality}%
              </span>
            </Label>
            <Input
              id="projectWeight"
              type="number"
              min="0"
              max="100"
              value={weights.projectQuality}
              onChange={(e) =>
                handleWeightChange("projectQuality", Number(e.target.value))
              }
              className="mt-2 bg-input border-border"
              disabled={isCalculating}
            />
            <Progress value={weights.projectQuality} className="mt-2 h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              Relevance of past projects
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between p-3 bg-muted rounded-lg">
          <div className="flex items-center gap-2">
            {isWeightValid ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                  Weights are perfectly balanced
                </span>
              </>
            ) : (
              <>
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span className="text-sm text-amber-600 dark:text-amber-400">
                  Total: {totalWeight}% (adjust to 100%)
                </span>
              </>
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setWeights({ skillMatch: 50, experience: 30, projectQuality: 20 })
            }
            disabled={isCalculating}
          >
            Reset to Default
          </Button>
        </div>
      </Card>
    </div>
  );
}