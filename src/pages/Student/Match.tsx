import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MapPin, Briefcase, DollarSign, Clock, X, Heart, Info, Upload, FileText } from "lucide-react";
import { useJobs, Job } from "@/contexts/JobContext";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { extractTextFromPDF } from "@/utils/pdfParser2";

const Match = () => {
  const { applyToJob, isJobApplied } = useJobs();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [userSkills, setUserSkills] = useState<string[]>(["React", "JavaScript", "TypeScript", "HTML", "CSS"]);
  const [resumeUploaded, setResumeUploaded] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);

  // Extract skills from resume text with strict word/phrase matching
  const extractSkills = (text: string): string[] => {
    const commonSkills = [
      "React", "JavaScript", "TypeScript", "Node.js", "Python", "Java", "C++", "Ruby",
      "Angular", "Vue", "Next.js", "Express", "Django", "Flask", "Spring Boot",
      "MongoDB", "PostgreSQL", "MySQL", "Redis", "AWS", "Azure", "GCP",
      "Docker", "Kubernetes", "Git", "CI/CD", "REST API", "GraphQL",
      "HTML", "CSS", "TailwindCSS", "SASS", "Bootstrap", "Material UI",
      "Redux", "MobX", "RxJS", "Webpack", "Babel", "Jest", "Mocha",
      "SQL", "NoSQL", "Microservices", "Agile", "Scrum", "Jira",
      "Firebase", "Supabase", "Figma", "Accessibility", "SEO", "Testing"
    ];

    // Escape regex special chars
    const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const found: string[] = [];
    // Try longer phrases first to avoid partial matches
    const sortedSkills = [...commonSkills].sort((a, b) => b.length - a.length);
    for (const skill of sortedSkills) {
      const pattern = new RegExp(`\\b${escape(skill).replace(/\\s+/g, "\\s+")}\\b`, "i");
      if (pattern.test(text)) {
        found.push(skill);
      }
    }

    // De-duplicate preserving order
    return Array.from(new Set(found));
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      toast.info("Parsing your resume...");
      let text = "";

      if (file.type === "application/pdf") {
        text = await extractTextFromPDF(file);
      } else {
        // Handle text files
        text = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (event) => resolve((event.target?.result as string) ?? "");
          reader.onerror = reject;
          reader.readAsText(file);
        });
      }

      const skills = extractSkills(text);
      if (skills.length === 0) {
        toast.error("No skills detected in your resume", {
          description: "Make sure your resume lists technical skills clearly.",
        });
        return;
      }

      setUserSkills(skills);
      setResumeUploaded(true);
      setCurrentIndex(0); // Reset to first job
      
      toast.success(`Resume parsed! Found ${skills.length} skills`, {
        description: skills.slice(0, 8).join(", ") + (skills.length > 8 ? "..." : ""),
      });
    } catch (error) {
      console.error("Error parsing resume:", error);
      toast.error("Failed to parse resume", {
        description: "Please try uploading a PDF or TXT file.",
      });
    }
  };

  // Generate 100+ diverse jobs
  const generateJobs = (): Job[] => {
    const jobTitles = [
      "Full Stack Developer", "Frontend Developer", "Backend Developer", "React Developer",
      "Node.js Developer", "Python Developer", "Java Developer", "DevOps Engineer",
      "Software Engineer", "Senior Software Engineer", "Lead Developer", "Tech Lead",
      "UI/UX Engineer", "Mobile Developer", "iOS Developer", "Android Developer",
      "Data Engineer", "Machine Learning Engineer", "AI Engineer", "Cloud Architect",
      "Solutions Architect", "Product Engineer", "Platform Engineer", "Site Reliability Engineer"
    ];

    const companies = [
      "Tech Innovations", "Digital Solutions", "StartupHub", "Design Co", "CloudTech",
      "DataCorp", "AI Systems", "WebWorks", "CodeFactory", "DevHub",
      "TechNova", "InnovateLabs", "FutureTech", "SmartSolutions", "AgileWorks",
      "CloudNine", "ByteForce", "CodeCraft", "TechVision", "DevMasters"
    ];

    const locations = [
      "Bengaluru", "Mumbai", "Delhi", "Hyderabad", "Pune", "Chennai", "Gurgaon",
      "Noida", "Remote", "Kolkata", "Ahmedabad", "Jaipur"
    ];

    const types = ["Fulltime", "Contract", "Part-time"];
    const experiences = ["0-1 Years", "1-2 Years", "2-3 Years", "3-5 Years", "5+ Years"];

    const allSkills = [
      "React", "JavaScript", "TypeScript", "Node.js", "Python", "Java", "C++",
      "Angular", "Vue", "Next.js", "Express", "Django", "MongoDB", "PostgreSQL",
      "AWS", "Docker", "Kubernetes", "Git", "REST API", "GraphQL", "TailwindCSS",
      "Redux", "Firebase", "Supabase", "Figma", "CSS3", "HTML5", "Testing",
      "Microservices", "CI/CD", "Agile", "Scrum", "Machine Learning", "AI"
    ];

    const jobs: Job[] = [];
    for (let i = 0; i < 120; i++) {
      const title = jobTitles[i % jobTitles.length];
      const company = companies[Math.floor(Math.random() * companies.length)];
      const location = locations[Math.floor(Math.random() * locations.length)];
      const type = types[Math.floor(Math.random() * types.length)];
      const experience = experiences[Math.floor(Math.random() * experiences.length)];
      
      // Ensure jobs include most user skills for high match
      const numUserSkills = Math.floor(userSkills.length * 0.6) + Math.floor(Math.random() * userSkills.length * 0.4);
      const numAdditionalSkills = 2 + Math.floor(Math.random() * 4);
      
      const jobSkills = [];
      
      // Add random user skills (for high match)
      const shuffledUserSkills = [...userSkills].sort(() => 0.5 - Math.random());
      for (let j = 0; j < Math.min(numUserSkills, userSkills.length); j++) {
        jobSkills.push(shuffledUserSkills[j]);
      }
      
      // Add some additional random skills
      const otherSkills = allSkills.filter(s => !userSkills.includes(s));
      const shuffledOther = [...otherSkills].sort(() => 0.5 - Math.random());
      for (let j = 0; j < numAdditionalSkills; j++) {
        jobSkills.push(shuffledOther[j]);
      }

      // Calculate match based on skills overlap
      const matchingSkills = userSkills.filter(skill => jobSkills.includes(skill));
      
      // Use a weighted formula: 70% on matching skills vs user skills, 30% on matching skills vs job requirements
      const userSkillMatchPercent = matchingSkills.length / userSkills.length;
      const jobRequirementsMatchPercent = matchingSkills.length / jobSkills.length;
      
      // Real match calculation without artificial minimum
      const matchScore = Math.round((userSkillMatchPercent * 0.7 + jobRequirementsMatchPercent * 0.3) * 100);

      const skillsToDevelop = jobSkills.filter(skill => !userSkills.includes(skill)).slice(0, 3);

      jobs.push({
        id: i + 100,
        title,
        company,
        location,
        type,
        experience,
        salary: `${6 + Math.floor(Math.random() * 15)}-${12 + Math.floor(Math.random() * 20)} Lacs`,
        match: matchScore,
        description: `Join our team to work on exciting ${title.toLowerCase()} projects. Build scalable applications using modern technologies.`,
        requirements: jobSkills,
        skillsToDevelop,
        benefits: ["Health Insurance", "Remote Work", "Learning Budget", "Flexible Hours"].slice(0, 2 + Math.floor(Math.random() * 3)),
        postedDate: `${Math.floor(Math.random() * 7) + 1} days ago`,
      });
    }

    return jobs.sort((a, b) => b.match - a.match);
  };

  const allJobs = generateJobs();
  // Filter jobs to show only those with 85%+ match that haven't been applied to
  const jobs = allJobs.filter(job => job.match >= 85 && !isJobApplied(job.id));
  
  // Add a message if no jobs meet the threshold
  if (jobs.length === 0 && userSkills.length > 0) {
    toast.info("No jobs match 85%+ with your skills", {
      description: "Try uploading an updated resume with more skills, or check back later for new opportunities.",
    });
  }
  const currentJob = jobs[currentIndex];

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setDragStart({ x: clientX, y: clientY });
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setDragOffset({
      x: clientX - dragStart.x,
      y: clientY - dragStart.y,
    });
  };

  const handleDragEnd = () => {
    if (!isDragging || !currentJob) return;
    setIsDragging(false);

    const swipeThreshold = 100;
    if (Math.abs(dragOffset.x) > swipeThreshold) {
      if (dragOffset.x > 0) {
        handleAccept();
      } else {
        handleReject();
      }
    }
    setDragOffset({ x: 0, y: 0 });
  };

  const handleAccept = () => {
    if (!currentJob) return;
    applyToJob(currentJob);
    toast.success(`Applied to ${currentJob.title}!`, {
      description: `You've applied to ${currentJob.company}. Check Applied Jobs to track your application.`,
    });
    setCurrentIndex(prev => prev + 1);
    setDragOffset({ x: 0, y: 0 });
  };

  const handleReject = () => {
    if (!currentJob) return;
    toast.info(`Passed on ${currentJob.title}`, {
      description: "Keep swiping to find your perfect match!",
    });
    setCurrentIndex(prev => prev + 1);
    setDragOffset({ x: 0, y: 0 });
  };

  const rotation = isDragging ? dragOffset.x / 20 : 0;
  const opacity = isDragging ? Math.max(0.5, 1 - Math.abs(dragOffset.x) / 300) : 1;

  // Resume upload screen
  if (!resumeUploaded) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <Card className="max-w-2xl w-full">
          <CardContent className="p-12 text-center space-y-6">
            <div className="flex justify-center mb-6">
              <div className="p-6 bg-primary/10 rounded-full">
                <FileText className="h-16 w-16 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-foreground">Upload Your Resume</h1>
            <p className="text-muted-foreground text-lg">
              Upload your resume to get personalized job matches based on your skills. We'll show you 100+ jobs with 85%+ match!
            </p>
            
            <div className="mt-8">
              <input
                type="file"
                id="resume-upload-match"
                accept=".pdf,.txt,.doc,.docx"
                onChange={handleResumeUpload}
                className="hidden"
              />
              <div className="flex gap-3 justify-center">
                <label htmlFor="resume-upload-match">
                  <Button size="lg" className="cursor-pointer" asChild>
                    <span>
                      <Upload className="h-5 w-5 mr-2" />
                      Upload Resume
                    </span>
                  </Button>
                </label>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => {
                    setResumeUploaded(true);
                    toast.info("Using default skills: React, JavaScript, TypeScript, HTML, CSS");
                  }}
                >
                  Skip & Use Defaults
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Supported formats: TXT, PDF, DOC, DOCX
              </p>
            </div>

            <div className="mt-8 p-4 bg-muted/50 rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">What happens next?</h3>
              <ul className="text-sm text-muted-foreground space-y-2 text-left max-w-md mx-auto">
                <li>✓ We extract skills from your resume</li>
                <li>✓ Match you with 100+ relevant jobs</li>
                <li>✓ Show only jobs with 85%+ compatibility</li>
                <li>✓ Swipe right to apply, left to pass</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!currentJob) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <Card className="max-w-md w-full">
          <CardContent className="p-12 text-center space-y-4">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-foreground">All Caught Up!</h2>
            <p className="text-muted-foreground">
              You've reviewed all jobs with 85%+ match based on your resume. Upload a new resume or check back later!
            </p>
            <div className="flex gap-3 justify-center mt-6">
              <Button onClick={() => setCurrentIndex(0)}>
                Review Again
              </Button>
              <Button variant="outline" onClick={() => {
                setResumeUploaded(false);
                setUserSkills([]);
                setCurrentIndex(0);
              }}>
                Upload New Resume
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Quick Match</h1>
          <p className="text-muted-foreground">Swipe right to apply, left to pass</p>
          <div className="flex items-center justify-center gap-3 mt-4 flex-wrap">
            <Badge variant="outline" className="text-lg px-4 py-2">
              {jobs.length - currentIndex} jobs remaining
            </Badge>
            <Badge variant="secondary" className="text-sm px-3 py-1">
              {userSkills.length} skills detected
            </Badge>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => {
                setResumeUploaded(false);
                setUserSkills([]);
                setCurrentIndex(0);
              }}
            >
              Change Resume
            </Button>
          </div>
        </div>

        <div className="relative h-[600px] flex items-center justify-center">
          {/* Next card preview */}
          {jobs[currentIndex + 1] && (
            <Card className="absolute w-full max-w-md border-2 border-border scale-95 opacity-50">
              <CardContent className="p-6 h-[550px]" />
            </Card>
          )}

          {/* Current card */}
          <Card
            ref={cardRef}
            className="absolute w-full max-w-md border-2 border-primary/50 cursor-grab active:cursor-grabbing shadow-2xl"
            style={{
              transform: `translateX(${dragOffset.x}px) translateY(${dragOffset.y}px) rotate(${rotation}deg)`,
              opacity,
              transition: isDragging ? 'none' : 'all 0.3s ease',
            }}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
          >
            <CardContent className="p-6 h-[550px] flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{currentJob.location}</span>
                    <Badge variant="outline">{currentJob.type}</Badge>
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-1">{currentJob.title}</h2>
                  <p className="text-lg text-muted-foreground">{currentJob.company}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedJob(currentJob);
                  }}
                  className="shrink-0"
                >
                  <Info className="h-5 w-5" />
                </Button>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-primary">Match Score</span>
                  <span className="text-2xl font-bold text-primary">{currentJob.match}%</span>
                </div>
                <Progress value={currentJob.match} className="h-3" />
                <p className="text-xs text-muted-foreground mt-1">
                  {userSkills.filter(skill => currentJob.requirements.includes(skill)).length} skills match
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Briefcase className="h-5 w-5" />
                  <span>{currentJob.experience} experience required</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <DollarSign className="h-5 w-5" />
                  <span>{currentJob.salary} per year</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Clock className="h-5 w-5" />
                  <span>Posted {currentJob.postedDate}</span>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-sm font-semibold text-foreground mb-3">Key Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {currentJob.requirements.slice(0, 6).map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-primary/10 text-primary">
                      {skill}
                    </Badge>
                  ))}
                  {currentJob.requirements.length > 6 && (
                    <Badge variant="secondary">+{currentJob.requirements.length - 6} more</Badge>
                  )}
                </div>
              </div>

              <div className="mt-auto">
                <p className="text-sm text-muted-foreground line-clamp-3 mb-6">
                  {currentJob.description}
                </p>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1 border-2 border-destructive/50 hover:bg-destructive/10 text-destructive"
                    onClick={handleReject}
                  >
                    <X className="h-6 w-6 mr-2" />
                    Pass
                  </Button>
                  <Button
                    size="lg"
                    className="flex-1 bg-success hover:bg-success/90 text-white"
                    onClick={handleAccept}
                  >
                    <Heart className="h-6 w-6 mr-2" />
                    Apply
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Swipe indicators */}
          {isDragging && (
            <>
              {dragOffset.x > 50 && (
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  <div className="bg-success/20 border-4 border-success rounded-2xl p-8 rotate-[-20deg]">
                    <Heart className="h-20 w-20 text-success" />
                  </div>
                </div>
              )}
              {dragOffset.x < -50 && (
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  <div className="bg-destructive/20 border-4 border-destructive rounded-2xl p-8 rotate-[20deg]">
                    <X className="h-20 w-20 text-destructive" />
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>💡 Click the info icon to view full job details</p>
        </div>
      </div>

      {/* Job Details Dialog */}
      <Dialog open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          {selectedJob && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedJob.title}</DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-semibold text-foreground">{selectedJob.company}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {selectedJob.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        {selectedJob.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {selectedJob.experience}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-primary">Your Match Score</h3>
                  <div className="flex items-center gap-4">
                    <Progress value={selectedJob.match} className="flex-1" />
                    <span className="text-2xl font-bold text-primary">{selectedJob.match}%</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Based on {userSkills.filter(skill => selectedJob.requirements.includes(skill)).length} matching skills from your resume
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-primary">Job Description</h3>
                  <p className="text-muted-foreground">{selectedJob.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-primary">Requirements</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.requirements.map((skill) => (
                      <Badge key={skill} variant="secondary" className="bg-secondary text-secondary-foreground">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-primary">Skills to Develop</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.skillsToDevelop?.map((skill) => (
                      <Badge key={skill} variant="outline" className="border-primary/50 text-primary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-primary">Benefits</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedJob.benefits.map((benefit) => (
                      <div key={benefit} className="flex items-center gap-2 text-muted-foreground">
                        <div className="h-2 w-2 rounded-full bg-success" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    className="flex-1 bg-success hover:bg-success/90 text-white"
                    onClick={() => {
                      handleAccept();
                      setSelectedJob(null);
                    }}
                  >
                    <Heart className="h-5 w-5 mr-2" />
                    Apply Now
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedJob(null)}>
                    Back
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Match;
