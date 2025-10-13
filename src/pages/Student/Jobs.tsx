import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  MapPin, Briefcase, Clock, DollarSign, CheckCircle, 
  BarChart3, ExternalLink, BookOpen, GraduationCap, Activity, ArrowRight
} from "lucide-react";
import { useJobs, Job } from "@/contexts/JobContext";
import { toast } from "sonner";
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';

// Register the components required for the radar chart
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

// Extended Job interface for skill gap analysis
interface LearningResource {
  title: string;
  url: string;
  platform: string;
  duration: string;
}

interface SkillGap {
  skill: string;
  importance: number;
  learningResources: LearningResource[];
}

interface ExtendedJob extends Job {
  potentialMatch: number; // Required because Job already requires match
  learningPaths?: SkillGap[];
  requiredSkillLevels?: number[]; // Required skill levels on a scale of 0-10
}

const Jobs = () => {
  const navigate = useNavigate();
  const { applyToJob, isJobApplied } = useJobs();
  const [selectedJob, setSelectedJob] = useState<ExtendedJob | null>(null);
  const [skillGapDialogOpen, setSkillGapDialogOpen] = useState(false);
  
  const handleApply = (job: ExtendedJob) => {
    applyToJob(job);
    toast.success(`Applied to ${job.title} at ${job.company}!`);
    setSelectedJob(null);
    setTimeout(() => {
      navigate("/applied");
    }, 1500);
  };
  
  // User's skills with proficiency levels (1-10)
  const userSkillsWithProficiency = {
    "React.js": 7,
    "JavaScript": 8,
    "Node.js": 6,
    "Git": 7,
    "HTML/CSS": 9,
    "Python": 5,
    "TypeScript": 6,
    "Next.js": 4,
    "MongoDB": 5,
    "Responsive Design": 8,
    "Redux": 5,
    "REST APIs": 7,
    "TailwindCSS": 8,
    "SQL": 4
  };
  
  // Function to check if user has a skill
  const hasSkill = (skill: string): boolean => {
    return skill in userSkillsWithProficiency;
  };
  
  // Function to get user's proficiency level for a skill (0-10)
  const getSkillProficiency = (skill: string): number => {
    return userSkillsWithProficiency[skill] || 0;
  };
  
  // Function to prepare radar chart data for skill comparison
  const prepareRadarChartData = (job: ExtendedJob) => {
    const requirements = job.requirements || [];
    
    // Calculate user's skill levels on scale of 0-10
    const userSkillLevels = requirements.map(skill => getSkillProficiency(skill));
    
    // Required skills on scale of 0-10
    const requiredSkillLevels = job.requiredSkillLevels || requirements.map(() => 8);
    
    return {
      labels: requirements,
      datasets: [
        {
          label: 'Your Skills',
          data: userSkillLevels,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(75, 192, 192, 1)',
          pointRadius: 4,
        },
        {
          label: 'Required Skills',
          data: requiredSkillLevels,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(255, 99, 132, 1)',
          pointRadius: 4,
        },
      ],
    };
  };

  // Calculate actual match percentage based on skills
  const calculateMatchPercentage = (jobRequirements: string[], requiredLevels: number[] = []) => {
    if (!jobRequirements || jobRequirements.length === 0) return 0;
    
    let totalPossiblePoints = 0;
    let actualPoints = 0;
    
    jobRequirements.forEach((skill, index) => {
      const requiredLevel = requiredLevels[index] || 8; // Default required level is 8
      totalPossiblePoints += requiredLevel;
      
      const userLevel = getSkillProficiency(skill);
      actualPoints += Math.min(userLevel, requiredLevel); // Can't exceed the required level
    });
    
    return Math.round((actualPoints / totalPossiblePoints) * 100);
  };

  const jobs: ExtendedJob[] = [
    {
      id: 1,
      title: "Full Stack Developer",
      company: "Tech Innovations",
      location: "Bengaluru",
      type: "Fulltime",
      experience: "2 Years",
      salary: "8-12 Lacs",
      match: 0, // Will be calculated
      potentialMatch: 0, // Will be calculated
      description: "Join our team to build scalable full-stack applications. Work with Node.js, React, and cloud technologies in an agile environment.",
      requirements: ["React.js", "Node.js", "MongoDB", "AWS", "Docker", "Microservices"],
      requiredSkillLevels: [8, 7, 7, 6, 6, 5],
      skillsToDevelop: ["AWS", "Docker", "Microservices"],
      benefits: ["Stock Options", "Gym Membership", "Health Insurance", "WFH Allowance"],
      postedDate: "2 days ago",
      learningPaths: [
        {
          skill: "AWS",
          importance: 9,
          learningResources: [
            {
              title: "AWS Cloud Practitioner Essentials",
              url: "https://www.coursera.org/learn/aws-cloud-practitioner-essentials",
              platform: "Coursera",
              duration: "6 hours"
            },
            {
              title: "AWS Fundamentals: Building Serverless Applications",
              url: "https://www.youtube.com/watch?v=8Zd3ocr28H8",
              platform: "YouTube",
              duration: "2 hours"
            }
          ]
        },
        {
          skill: "Docker",
          importance: 8,
          learningResources: [
            {
              title: "Docker for Beginners",
              url: "https://www.youtube.com/watch?v=fqMOX6JJhGo",
              platform: "YouTube",
              duration: "2 hours"
            },
            {
              title: "Docker & Kubernetes: The Practical Guide",
              url: "https://www.udemy.com/course/docker-kubernetes-the-practical-guide/",
              platform: "Udemy",
              duration: "23 hours"
            }
          ]
        }
      ]
    },
    {
      id: 2,
      title: "Frontend Developer",
      company: "Digital Solutions",
      location: "Remote",
      type: "Contract",
      experience: "1 Years",
      salary: "6-10 Lacs",
      match: 0, // Will be calculated
      potentialMatch: 0, // Will be calculated
      description: "Create stunning user interfaces using modern React and TypeScript. Work with a global team on cutting-edge web applications.",
      requirements: ["React.js", "TypeScript", "TailwindCSS", "Git", "Responsive Design"],
      requiredSkillLevels: [8, 7, 7, 6, 8],
      skillsToDevelop: ["TypeScript"],
      benefits: ["Flexible Hours", "Remote Work", "Learning Budget"],
      postedDate: "1 week ago",
      learningPaths: [
        {
          skill: "TypeScript",
          importance: 9,
          learningResources: [
            {
              title: "TypeScript Crash Course",
              url: "https://www.youtube.com/watch?v=BCg4U1FzODs",
              platform: "YouTube",
              duration: "1.5 hours"
            },
            {
              title: "Understanding TypeScript",
              url: "https://www.udemy.com/course/understanding-typescript/",
              platform: "Udemy",
              duration: "15 hours"
            }
          ]
        }
      ]
    },
    {
      id: 3,
      title: "Backend Engineer",
      company: "Cloud Systems",
      location: "Bengaluru",
      type: "Onsite",
      experience: "3 Years",
      salary: "10-15 Lacs",
      match: 0, // Will be calculated
      potentialMatch: 0, // Will be calculated
      description: "Build robust backend systems and APIs. Work with Python, Django, and PostgreSQL to create scalable microservices.",
      requirements: ["Python", "Node.js", "SQL", "Redis", "Kubernetes"],
      requiredSkillLevels: [7, 8, 6, 7, 8],
      skillsToDevelop: ["Redis", "Kubernetes"],
      benefits: ["Stock Options", "Health Insurance", "Free Meals"],
      postedDate: "3 days ago",
      learningPaths: [
        {
          skill: "Redis",
          importance: 8,
          learningResources: [
            {
              title: "Redis Crash Course",
              url: "https://www.youtube.com/watch?v=Hbt56gFj998",
              platform: "YouTube",
              duration: "1 hour"
            },
            {
              title: "Redis: The Complete Developer's Guide",
              url: "https://www.udemy.com/course/redis-the-complete-developers-guide-p/",
              platform: "Udemy",
              duration: "10 hours"
            }
          ]
        },
        {
          skill: "Kubernetes",
          importance: 9,
          learningResources: [
            {
              title: "Kubernetes for Beginners",
              url: "https://www.youtube.com/watch?v=X48VuDVv0do",
              platform: "YouTube",
              duration: "3.5 hours"
            },
            {
              title: "Certified Kubernetes Administrator (CKA)",
              url: "https://www.udemy.com/course/certified-kubernetes-administrator-with-practice-tests/",
              platform: "Udemy",
              duration: "17 hours"
            }
          ]
        }
      ]
    },
    {
      id: 4,
      title: "UI/UX Developer",
      company: "CreativeWorks Design",
      location: "Remote",
      type: "Fulltime",
      experience: "1-2 Years",
      salary: "7-11 Lacs",
      match: 0, // Will be calculated
      potentialMatch: 0, // Will be calculated
      description: "Join our creative team to build beautiful, responsive user interfaces. Focus on UI/UX design implementation with modern frontend technologies.",
      requirements: ["React.js", "HTML/CSS", "Responsive Design", "TailwindCSS", "JavaScript", "Next.js"],
      requiredSkillLevels: [8, 9, 8, 7, 8, 7],
      skillsToDevelop: ["Next.js"],
      benefits: ["Flexible Hours", "Remote Work", "Design Tools Subscription", "Learning Budget"],
      postedDate: "5 days ago",
      learningPaths: [
        {
          skill: "Next.js",
          importance: 8,
          learningResources: [
            {
              title: "Next.js Foundations Course",
              url: "https://nextjs.org/learn/foundations/about-nextjs",
              platform: "Next.js Documentation",
              duration: "3 hours"
            },
            {
              title: "Next.js & React - The Complete Guide",
              url: "https://www.udemy.com/course/nextjs-react-the-complete-guide/",
              platform: "Udemy",
              duration: "25 hours"
            }
          ]
        }
      ]
    },
  ];

  // Calculate and apply the match percentages for each job
  for (let i = 0; i < jobs.length; i++) {
    const job = jobs[i];
    const userCurrentSkills = job.requirements.filter(skill => hasSkill(skill));
    
    // Calculate match percentage
    const matchPercent = calculateMatchPercentage(job.requirements, job.requiredSkillLevels);
    
    // Calculate potential match if the user learns all skills to develop
    const potentialMatch = matchPercent + Math.min(25, Math.round((job.skillsToDevelop.length / job.requirements.length) * 30));
    
    // Create a new job object with the calculated values
    jobs[i] = {
      ...job,
      match: matchPercent,
      potentialMatch: Math.min(100, potentialMatch) // Cap at 100%
    };
  }

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Jobs for You</h1>
        <p className="text-muted-foreground">Personalized job recommendations based on your skills and experience</p>
        <div className="mt-2 p-3 rounded-md bg-primary/10 border border-primary/30">
          <p className="text-sm">
            <span className="font-medium">New:</span> We've improved our skill matching algorithm! Your skills are now rated on a scale of 1-10 for more accurate job matches. Check out your skill gap analysis for a detailed breakdown.
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        {jobs.map((job) => {
          const applied = isJobApplied(job.id);
          return (
            <Card
              key={job.id}
              className={`border-2 transition-all ${
                applied
                  ? "border-success/50 bg-success/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <CardContent className="p-6">
                {applied && (
                  <div className="mb-4 flex items-center gap-2 text-success">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-semibold">Applied</span>
                  </div>
                )}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{job.location}</span>
                    <Badge variant="outline" className="ml-2">{job.type}</Badge>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">{job.title}</h3>
                  <p className="text-muted-foreground">{job.company}</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="relative h-20 w-20">
                    <svg className="transform -rotate-90" width="80" height="80">
                      <circle cx="40" cy="40" r="35" fill="none" stroke="hsl(var(--border))" strokeWidth="6" />
                      <circle
                        cx="40"
                        cy="40"
                        r="35"
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="6"
                        strokeDasharray={`${2 * Math.PI * 35}`}
                        strokeDashoffset={`${2 * Math.PI * 35 * (1 - job.match / 100)}`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">{job.match}%</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-xs text-muted-foreground">Match</span>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-xs border-primary/40 text-primary hover:bg-primary/10"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedJob(job);
                            setSkillGapDialogOpen(true);
                          }}
                        >
                          Skill Gap <BarChart3 className="ml-1 h-3 w-3" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px] max-h-[85vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <Activity className="h-5 w-5 text-primary" />
                            Skill Gap Analysis
                          </DialogTitle>
                        </DialogHeader>
                        
                        {/* Skill Gap Analysis Content */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-lg font-medium">{job.title}</h3>
                              <p className="text-sm text-muted-foreground">{job.company}</p>
                            </div>
                            <Badge className="bg-primary/20 text-primary border-primary/30">
                              {job.match}% Match
                            </Badge>
                          </div>
                          
                          {/* Skill Radar Chart */}
                          <div className="mb-2 flex flex-wrap gap-2 text-xs">
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-[rgba(75,192,192,1)] mr-1 rounded-full"></div>
                              <span>Your Skills (0-10)</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-[rgba(255,99,132,1)] mr-1 rounded-full"></div>
                              <span>Required Skills (0-10)</span>
                            </div>
                          </div>
                          
                          <div className="bg-card/20 p-3 rounded-lg border">
                            <div className="h-[250px]">
                              <Radar 
                                data={prepareRadarChartData(job)}
                                options={{
                                  scales: {
                                    r: {
                                      beginAtZero: true,
                                      min: 0,
                                      max: 10,
                                      ticks: {
                                        stepSize: 2,
                                        showLabelBackdrop: false,
                                      },
                                      angleLines: {
                                        color: 'rgba(0, 0, 0, 0.1)',
                                      },
                                      grid: {
                                        color: 'rgba(0, 0, 0, 0.1)',
                                      },
                                      pointLabels: {
                                        font: {
                                          size: 10 // Smaller font for labels
                                        }
                                      }
                                    }
                                  },
                                  maintainAspectRatio: false,
                                  plugins: {
                                    tooltip: {
                                      callbacks: {
                                        label: function(context) {
                                          const label = context.dataset.label || '';
                                          const value = context.raw || 0;
                                          return `${label}: ${value}/10`;
                                        }
                                      }
                                    },
                                    legend: {
                                      position: 'bottom',
                                      labels: {
                                        boxWidth: 10,
                                        font: {
                                          size: 11
                                        }
                                      }
                                    }
                                  }
                                }}
                              />
                            </div>
                          </div>
                          
                          {/* Potential Match */}
                          <div className="bg-success/10 p-3 rounded-lg border border-success/20">
                            <p className="font-medium mb-2 text-sm">
                              You match {job.match}%, but learning {job.skillsToDevelop.join(' and ')} can increase your match to {job.potentialMatch}%
                            </p>
                            <Progress value={job.match} max={100} className="h-2 mb-1" />
                            <p className="text-xs text-muted-foreground">Current match: {job.match}%</p>
                            <Progress value={job.potentialMatch} max={100} className="h-2 mb-1 bg-success/20" />
                            <p className="text-xs text-success">Potential match: {job.potentialMatch}%</p>
                          </div>
                          
                          {/* Learning Resources */}
                          {job.learningPaths && job.learningPaths.length > 0 && (
                            <div className="space-y-3">
                              <h4 className="font-medium flex items-center gap-2 text-sm">
                                <BookOpen className="h-4 w-4 text-primary" />
                                Recommended Learning Resources
                              </h4>
                              
                              {job.learningPaths.map((path, idx) => (
                                <div key={idx} className="bg-primary/10 p-3 rounded-lg border border-primary/20">
                                  <div className="flex justify-between items-center mb-2">
                                    <p className="text-sm font-medium">{path.skill}</p>
                                    <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">
                                      High Impact
                                    </Badge>
                                  </div>
                                  
                                  <div className="space-y-2">
                                    {path.learningResources.map((resource, resourceIdx) => (
                                      <div key={resourceIdx} className="flex items-center justify-between bg-background/20 p-2 rounded">
                                        <div>
                                          <p className="text-xs">{resource.title}</p>
                                          <div className="flex items-center gap-2">
                                            <Badge variant="outline" className="text-[10px] h-4 px-1">
                                              {resource.platform}
                                            </Badge>
                                            <span className="text-[10px] text-muted-foreground">{resource.duration}</span>
                                          </div>
                                        </div>
                                        <Button size="sm" variant="ghost" className="h-7 text-xs text-primary">
                                          <ExternalLink className="h-3 w-3 mr-1" /> Learn Now
                                        </Button>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          <div className="flex justify-end gap-2 pt-2">
                            <Button 
                              className="bg-primary text-primary-foreground hover:bg-primary/90"
                            >
                              <GraduationCap className="mr-2 h-4 w-4" />
                              Start Learning
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  <span>{job.experience}</span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{job.postedDate}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {job.requirements.slice(0, 4).map((skill: string) => (
                  <Badge key={skill} variant="secondary" className="bg-primary/10 text-primary">
                    {skill}
                  </Badge>
                ))}
                {job.requirements.length > 4 && (
                  <Badge variant="secondary">+{job.requirements.length - 4} more</Badge>
                )}
                </div>
                
                <div className="mt-4 flex justify-end">
                  <Button 
                    variant="default" 
                    className="bg-primary text-white"
                    onClick={() => setSelectedJob(job)}
                  >
                    View Details <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

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
                  <div className="flex items-center mt-2">
                    <p className="text-sm text-muted-foreground flex-1">
                      Learning {selectedJob.skillsToDevelop.join(' and ')} can increase your match to {selectedJob.potentialMatch}%
                    </p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-primary/40 text-primary hover:bg-primary/10"
                        >
                          Analyze Skill Gap <BarChart3 className="ml-2 h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px] max-h-[85vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <Activity className="h-5 w-5 text-primary" />
                            Skill Gap Analysis
                          </DialogTitle>
                        </DialogHeader>
                        
                        {/* Skill Gap Analysis Content */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-lg font-medium">{selectedJob.title}</h3>
                              <p className="text-sm text-muted-foreground">{selectedJob.company}</p>
                            </div>
                            <Badge className="bg-primary/20 text-primary border-primary/30">
                              {selectedJob.match}% Match
                            </Badge>
                          </div>
                          
                          {/* Skill Radar Chart */}
                          <div className="mb-2 flex flex-wrap gap-2 text-xs">
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-[rgba(75,192,192,1)] mr-1 rounded-full"></div>
                              <span>Your Skills (0-10)</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-[rgba(255,99,132,1)] mr-1 rounded-full"></div>
                              <span>Required Skills (0-10)</span>
                            </div>
                          </div>
                          
                          <div className="bg-card/20 p-3 rounded-lg border">
                            <div className="h-[250px]">
                              <Radar 
                                data={prepareRadarChartData(selectedJob)}
                                options={{
                                  scales: {
                                    r: {
                                      beginAtZero: true,
                                      min: 0,
                                      max: 10,
                                      ticks: {
                                        stepSize: 2,
                                        showLabelBackdrop: false,
                                      },
                                      angleLines: {
                                        color: 'rgba(0, 0, 0, 0.1)',
                                      },
                                      grid: {
                                        color: 'rgba(0, 0, 0, 0.1)',
                                      },
                                      pointLabels: {
                                        font: {
                                          size: 10 // Smaller font for labels
                                        }
                                      }
                                    }
                                  },
                                  maintainAspectRatio: false,
                                  plugins: {
                                    tooltip: {
                                      callbacks: {
                                        label: function(context) {
                                          const label = context.dataset.label || '';
                                          const value = context.raw || 0;
                                          return `${label}: ${value}/10`;
                                        }
                                      }
                                    },
                                    legend: {
                                      position: 'bottom',
                                      labels: {
                                        boxWidth: 10,
                                        font: {
                                          size: 11
                                        }
                                      }
                                    }
                                  }
                                }}
                              />
                            </div>
                          </div>
                          
                          {/* Potential Match */}
                          <div className="bg-success/10 p-3 rounded-lg border border-success/20">
                            <p className="font-medium mb-2 text-sm">
                              You match {selectedJob.match}%, but learning {selectedJob.skillsToDevelop.join(' and ')} can increase your match to {selectedJob.potentialMatch}%
                            </p>
                            <Progress value={selectedJob.match} max={100} className="h-2 mb-1" />
                            <p className="text-xs text-muted-foreground">Current match: {selectedJob.match}%</p>
                            <Progress value={selectedJob.potentialMatch} max={100} className="h-2 mb-1 bg-success/20" />
                            <p className="text-xs text-success">Potential match: {selectedJob.potentialMatch}%</p>
                          </div>
                          
                          {/* Learning Resources */}
                          {selectedJob.learningPaths && selectedJob.learningPaths.length > 0 && (
                            <div className="space-y-3">
                              <h4 className="font-medium flex items-center gap-2 text-sm">
                                <BookOpen className="h-4 w-4 text-primary" />
                                Recommended Learning Resources
                              </h4>
                              
                              {selectedJob.learningPaths.map((path, idx) => (
                                <div key={idx} className="bg-primary/10 p-3 rounded-lg border border-primary/20">
                                  <div className="flex justify-between items-center mb-2">
                                    <p className="text-sm font-medium">{path.skill}</p>
                                    <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">
                                      High Impact
                                    </Badge>
                                  </div>
                                  
                                  <div className="space-y-2">
                                    {path.learningResources.map((resource, resourceIdx) => (
                                      <div key={resourceIdx} className="flex items-center justify-between bg-background/20 p-2 rounded">
                                        <div>
                                          <p className="text-xs">{resource.title}</p>
                                          <div className="flex items-center gap-2">
                                            <Badge variant="outline" className="text-[10px] h-4 px-1">
                                              {resource.platform}
                                            </Badge>
                                            <span className="text-[10px] text-muted-foreground">{resource.duration}</span>
                                          </div>
                                        </div>
                                        <Button size="sm" variant="ghost" className="h-7 text-xs text-primary">
                                          <ExternalLink className="h-3 w-3 mr-1" /> Learn Now
                                        </Button>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          <div className="flex justify-end gap-2 pt-2">
                            <Button 
                              className="bg-primary text-primary-foreground hover:bg-primary/90"
                            >
                              <GraduationCap className="mr-2 h-4 w-4" />
                              Start Learning
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-primary">Job Description</h3>
                  <p className="text-muted-foreground">{selectedJob.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-primary">Requirements</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.requirements.map((skill: string) => (
                      <Badge key={skill} variant="secondary" className="bg-secondary text-secondary-foreground">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-primary">Skills to Develop</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.skillsToDevelop?.map((skill: string) => (
                      <Badge key={skill} variant="outline" className="border-primary/50 text-primary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-primary">Benefits</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedJob.benefits.map((benefit: string) => (
                      <div key={benefit} className="flex items-center gap-2 text-muted-foreground">
                        <div className="h-2 w-2 rounded-full bg-success" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  {isJobApplied(selectedJob.id) ? (
                    <Button className="flex-1 bg-success" disabled>
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Applied
                    </Button>
                  ) : (
                    <Button
                      className="flex-1 bg-primary hover:bg-primary/90"
                      onClick={() => handleApply(selectedJob)}
                    >
                      Apply Now
                    </Button>
                  )}
                  <Button variant="outline" onClick={() => setSelectedJob(null)}>
                    Close
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

export default Jobs;
