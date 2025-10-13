import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  FileText, Upload, TrendingUp, Briefcase, Target, Award, 
  Brain, AlertCircle, Star, ArrowRight, BarChart3, Calendar, 
  Download, Settings, Sparkles, MapPin, X, Plus, Lightbulb,
  Home, ClipboardList, CheckCircle2, PieChart, FileEdit,
  ChevronRight, Building2, DollarSign, Clock, Users, TrendingDown,
  Code, Database, Globe, Server, Zap, BookOpen, MessageSquare
} from "lucide-react";

interface Job {
  id: number;
  company: string;
  role: string;
  status?: "Applied" | "Not Applied";
  date: string;
  match: number;
  location: string;
  type: string;
  level: string;
  salary: string;
  experience: string;
  description: string;
  requirements: string[];
  lackingSkills?: string[];
  benefits?: string[];
}

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState<"home" | "jobs" | "applied" | "stats" | "resume" | "ats" | "settings">("home");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [resumeScore] = useState(78);
  const [profileCompletion] = useState(65);
  
  const [appliedJobs, setAppliedJobs] = useState<Job[]>([]);
  
  const [selectedJobTitles, setSelectedJobTitles] = useState<string[]>([
    "Software Development Intern", "Full Stack Developer", "Machine Learning Engineer"
  ]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    "Python", "JavaScript", "React.js", "Machine Learning", "TensorFlow", "SQL", "Git", "Next.js"
  ]);

  const allJobs: Job[] = [
    { 
      id: 1, 
      company: "Tech Corp", 
      role: "Frontend Developer", 
      status: "Not Applied", 
      date: "2 days ago", 
      match: 92, 
      location: "Bengaluru", 
      type: "Fulltime", 
      level: "Entry Level", 
      salary: "4-8 Lacs", 
      experience: "1 Years",
      description: "We're looking for a passionate Frontend Developer to join our dynamic team. You'll work on cutting-edge web applications using React, TypeScript, and modern CSS frameworks.",
      requirements: ["React.js", "TypeScript", "CSS/Tailwind", "Git", "REST APIs", "Responsive Design"],
      lackingSkills: ["TypeScript", "Testing (Jest)"],
      benefits: ["Health Insurance", "Flexible Hours", "Learning Budget", "Remote Options"]
    },
    { 
      id: 2, 
      company: "Innovate Labs", 
      role: "Full Stack Developer", 
      status: "Not Applied", 
      date: "5 days ago", 
      match: 85, 
      location: "Bengaluru", 
      type: "Fulltime", 
      level: "Mid Level", 
      salary: "8-12 Lacs", 
      experience: "2 Years",
      description: "Join our team to build scalable full-stack applications. Work with Node.js, React, and cloud technologies in an agile environment.",
      requirements: ["React.js", "Node.js", "MongoDB", "AWS", "Docker", "Microservices"],
      lackingSkills: ["AWS", "Docker", "Microservices"],
      benefits: ["Stock Options", "Health Insurance", "Gym Membership", "WFH Allowance"]
    },
    { 
      id: 3, 
      company: "Digital Solutions", 
      role: "React Developer", 
      status: "Not Applied", 
      date: "1 week ago", 
      match: 78, 
      location: "Remote", 
      type: "Contract", 
      level: "Entry Level", 
      salary: "5-10 Lacs", 
      experience: "1 Years",
      description: "Remote opportunity for a React Developer to build modern web applications for global clients. Focus on performance and user experience.",
      requirements: ["React.js", "JavaScript", "Redux", "HTML5/CSS3", "Git", "Figma"],
      lackingSkills: ["Redux", "Performance Optimization"],
      benefits: ["Fully Remote", "Flexible Hours", "Project Bonuses"]
    },
    { 
      id: 4, 
      company: "Cloud Systems", 
      role: "Software Engineer", 
      status: "Not Applied", 
      date: "3 days ago", 
      match: 88, 
      location: "Bengaluru", 
      type: "Onsite", 
      level: "Entry Level", 
      salary: "6-10 Lacs", 
      experience: "1 Years",
      description: "Build cloud-native applications using modern technologies. Work alongside experienced engineers in a collaborative environment.",
      requirements: ["Python", "JavaScript", "SQL", "Cloud Platforms", "Git", "Agile"],
      lackingSkills: ["System Design", "Cloud Architecture"],
      benefits: ["Learning Path", "Mentorship", "Health Benefits", "Team Events"]
    },
    { 
      id: 5, 
      company: "AI Innovations", 
      role: "Machine Learning Engineer", 
      status: "Not Applied", 
      date: "4 days ago", 
      match: 95, 
      location: "Hyderabad", 
      type: "Fulltime", 
      level: "Mid Level", 
      salary: "10-15 Lacs", 
      experience: "2 Years",
      description: "Work on cutting-edge ML models and deploy them at scale. Experience with TensorFlow, PyTorch, and cloud ML services required.",
      requirements: ["Python", "TensorFlow", "PyTorch", "NLP", "Computer Vision", "MLOps"],
      lackingSkills: ["MLOps", "Production Deployment"],
      benefits: ["Conference Budget", "Research Time", "Top Hardware", "Stock Options"]
    },
    { 
      id: 6, 
      company: "StartupXYZ", 
      role: "Backend Developer", 
      status: "Not Applied", 
      date: "6 days ago", 
      match: 82, 
      location: "Remote", 
      type: "Fulltime", 
      level: "Entry Level", 
      salary: "5-9 Lacs", 
      experience: "1 Years",
      description: "Build robust APIs and microservices for our growing platform. Work with Node.js, PostgreSQL, and modern backend technologies.",
      requirements: ["Node.js", "PostgreSQL", "REST APIs", "Git", "Docker", "Testing"],
      lackingSkills: ["PostgreSQL", "API Design Patterns"],
      benefits: ["Startup Equity", "Learning Budget", "Flexible Schedule"]
    },
  ];

  const aiInsights = {
    strengths: [
      { title: "Technical Foundation", description: "Strong programming skills in Python, JavaScript, and React", score: 85 },
      { title: "Project Portfolio", description: "3 well-documented GitHub projects with real-world applications", score: 78 },
      { title: "Learning Agility", description: "Consistently adding new skills and completing certifications", score: 82 },
    ],
    weaknesses: [
      { title: "Interview Readiness", description: "Practice more behavioral and technical interview questions", impact: "High", action: "Start mock interviews" },
      { title: "ATS Optimization", description: "Resume lacks key industry keywords for better ATS scoring", impact: "High", action: "Optimize resume" },
      { title: "Soft Skills Documentation", description: "Limited evidence of leadership and teamwork in profile", impact: "Medium", action: "Add team projects" },
    ],
    improvements: [
      { title: "Master System Design", priority: "High", reason: "90% of target companies require system design skills", impact: "+40% job matches" },
      { title: "Get Cloud Certified", priority: "High", reason: "AWS/Azure certification highly valued", impact: "+35% interview callbacks" },
      { title: "Contribute to Open Source", priority: "Medium", reason: "Demonstrates collaboration", impact: "+25% profile visibility" },
    ]
  };

  const handleApply = (job: Job) => {
    const updatedJob = { ...job, status: "Applied" as const };
    setAppliedJobs([...appliedJobs, updatedJob]);
    setSelectedJob(updatedJob);
  };

  const isJobApplied = (jobId: number) => {
    return appliedJobs.some(j => j.id === jobId);
  };

  const sidebarVariants = {
    open: { width: "280px", transition: { type: "spring" as const, stiffness: 300, damping: 30 } },
    closed: { width: "80px", transition: { type: "spring" as const, stiffness: 300, damping: 30 } }
  };

  const menuItems = [
    { icon: Home, label: "Dashboard", page: "home" as const },
    { icon: Briefcase, label: "Jobs for You", page: "jobs" as const },
    { icon: ClipboardList, label: "Applied Jobs", page: "applied" as const },
    { icon: PieChart, label: "Stats", page: "stats" as const },
    { icon: FileEdit, label: "Resume Generator", page: "resume" as const },
    { icon: FileText, label: "ATS Checker", page: "ats" as const },
    { icon: Settings, label: "Settings", page: "settings" as const },
  ];

  return (
    <div className="flex min-h-screen bg-[#011627ff]">
      {/* Sidebar with Liquid Glass Effect */}
      <motion.aside
        variants={sidebarVariants}
        animate={sidebarOpen ? "open" : "closed"}
        className="fixed left-0 top-0 h-screen z-50 bg-[#011627ff]/40 backdrop-blur-xl border-r border-[#e25c28ff]/20 shadow-[0_8px_32px_rgba(226,92,40,0.1)]"
      >
        <div className="p-6">
          <motion.div 
            className="flex items-center gap-3 mb-8"
            animate={{ justifyContent: sidebarOpen ? "flex-start" : "center" }}
          >
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#e25c28ff] to-[#f1f7edff]/20 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-[#f1f7edff]" />
            </div>
            <AnimatePresence>
              {sidebarOpen && (
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="text-xl font-bold text-[#e25c28ff]"
                >
                  9toThrive
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <motion.button
                key={item.page}
                onClick={() => setCurrentPage(item.page)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  currentPage === item.page
                    ? "bg-[#e25c28ff]/20 text-[#e25c28ff] border border-[#e25c28ff]/30"
                    : "text-[#f1f7edff] hover:bg-[#e25c28ff]/10"
                }`}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <AnimatePresence>
                  {sidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-sm font-medium"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            ))}
          </nav>
        </div>

        <motion.button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-20 h-6 w-6 rounded-full bg-[#e25c28ff] flex items-center justify-center text-[#f1f7edff] shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className={`h-4 w-4 transition-transform ${!sidebarOpen ? "rotate-180" : ""}`} />
        </motion.button>
      </motion.aside>

      {/* Main Content */}
      <motion.main
        animate={{ marginLeft: sidebarOpen ? "280px" : "80px" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="flex-1 p-8"
      >
        <AnimatePresence mode="wait">
          {currentPage === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#e25c28ff] mb-2">Dashboard</h1>
                <p className="text-[#f1f7edff]">Track your progress and discover new opportunities</p>
              </div>

              {/* Stats Grid */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                  { icon: Target, label: "Profile Score", value: `${profileCompletion}%`, color: "from-[#e25c28ff] to-[#f1f7edff]/20" },
                  { icon: FileText, label: "ATS Score", value: `${resumeScore}%`, color: "from-[#e25c28ff] to-[#f1f7edff]/20" },
                  { icon: Briefcase, label: "Applications", value: appliedJobs.length, color: "from-[#e25c28ff] to-[#f1f7edff]/20" },
                  { icon: Sparkles, label: "Job Matches", value: allJobs.length, color: "from-[#e25c28ff] to-[#f1f7edff]/20" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <Card className="bg-[#011627ff]/60 backdrop-blur-sm border-[#e25c28ff]/20">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-[#f1f7edff] mb-1">{stat.label}</p>
                            <p className="text-3xl font-bold text-[#e25c28ff]">{stat.value}</p>
                          </div>
                          <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                            <stat.icon className="h-6 w-6 text-[#f1f7edff]" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* AI Insights */}
              <Card className="bg-[#011627ff]/60 backdrop-blur-sm border-[#e25c28ff]/20">
                <CardHeader>
                  <CardTitle className="text-[#e25c28ff] flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    AI Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-[#e25c28ff] mb-3 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" /> Strengths
                    </h4>
                    <div className="space-y-2">
                      {aiInsights.strengths.map((s, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="p-3 rounded-lg bg-[#022632]/50 border border-[#e25c28ff]/10"
                        >
                          <div className="flex justify-between mb-1">
                            <span className="text-[#f1f7edff] text-sm font-medium">{s.title}</span>
                            <span className="text-[#e25c28ff] text-sm font-bold">{s.score}%</span>
                          </div>
                          <p className="text-xs text-[#f1f7edff]/70">{s.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-[#e25c28ff] mb-3 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" /> Areas to Improve
                    </h4>
                    <div className="space-y-2">
                      {aiInsights.weaknesses.map((w, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="p-3 rounded-lg bg-[#022632]/50 border border-[#e25c28ff]/10"
                        >
                          <div className="flex justify-between mb-1">
                            <span className="text-[#f1f7edff] text-sm font-medium">{w.title}</span>
                            <Badge className="bg-[#e25c28ff]/20 text-[#e25c28ff] border-none">{w.impact}</Badge>
                          </div>
                          <p className="text-xs text-[#f1f7edff]/70 mb-2">{w.description}</p>
                          <Button variant="ghost" size="sm" className="h-7 text-xs text-[#e25c28ff] p-0">
                            {w.action} <ArrowRight className="h-3 w-3 ml-1" />
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {currentPage === "jobs" && (
            <motion.div
              key="jobs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-[#e25c28ff] mb-2">Jobs for You</h1>
                <p className="text-[#f1f7edff]">Personalized job matches based on your profile</p>
              </div>

              <div className="grid gap-6">
                {allJobs.map((job, i) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.01 }}
                  >
                    <Card 
                      className="bg-[#011627ff]/60 backdrop-blur-sm border-[#e25c28ff]/20 cursor-pointer"
                      onClick={() => setSelectedJob(job)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="h-12 w-12 rounded-lg bg-[#e25c28ff]/10 flex items-center justify-center">
                                <Building2 className="h-6 w-6 text-[#e25c28ff]" />
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold text-[#e25c28ff]">{job.role}</h3>
                                <p className="text-sm text-[#f1f7edff]">{job.company}</p>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                              <div className="flex items-center gap-2 text-sm text-[#f1f7edff]">
                                <MapPin className="h-4 w-4" />
                                {job.location}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-[#f1f7edff]">
                                <DollarSign className="h-4 w-4" />
                                {job.salary}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-[#f1f7edff]">
                                <Calendar className="h-4 w-4" />
                                {job.type}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-[#f1f7edff]">
                                <Clock className="h-4 w-4" />
                                {job.date}
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col items-center gap-2 ml-4">
                            <div className="relative h-20 w-20">
                              <svg className="transform -rotate-90" width="80" height="80">
                                <circle cx="40" cy="40" r="36" stroke="#022632" strokeWidth="6" fill="none" />
                                <circle 
                                  cx="40" cy="40" r="36" 
                                  stroke="#e25c28ff" 
                                  strokeWidth="6" 
                                  fill="none" 
                                  strokeDasharray={`${job.match * 2.26} 226`}
                                />
                              </svg>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xl font-bold text-[#e25c28ff]">{job.match}%</span>
                              </div>
                            </div>
                            <span className="text-xs text-[#e25c28ff]">Match</span>
                          </div>
                        </div>

                        <div className="mt-4 flex gap-2">
                          {isJobApplied(job.id) ? (
                            <Badge className="bg-[#e25c28ff]/20 text-[#e25c28ff] border border-[#e25c28ff]/30">
                              <CheckCircle2 className="h-3 w-3 mr-1" /> Applied
                            </Badge>
                          ) : (
                            <Button 
                              className="bg-[#e25c28ff] text-[#f1f7edff] hover:bg-[#e25c28ff]/90"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedJob(job);
                              }}
                            >
                              View Details
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {currentPage === "applied" && (
            <motion.div
              key="applied"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-[#e25c28ff] mb-2">Applied Jobs</h1>
                <p className="text-[#f1f7edff]">Track your job applications</p>
              </div>

              {appliedJobs.length === 0 ? (
                <Card className="bg-[#011627ff]/60 backdrop-blur-sm border-[#e25c28ff]/20">
                  <CardContent className="p-12 text-center">
                    <ClipboardList className="h-16 w-16 text-[#e25c28ff]/50 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-[#e25c28ff] mb-2">No Applications Yet</h3>
                    <p className="text-[#f1f7edff] mb-4">Start applying to jobs to track them here</p>
                    <Button 
                      className="bg-[#e25c28ff] text-[#f1f7edff]"
                      onClick={() => setCurrentPage("jobs")}
                    >
                      Browse Jobs
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6">
                  {appliedJobs.map((job, i) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Card className="bg-[#011627ff]/60 backdrop-blur-sm border-[#e25c28ff]/20">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <div className="h-12 w-12 rounded-lg bg-[#e25c28ff]/10 flex items-center justify-center">
                                  <Building2 className="h-6 w-6 text-[#e25c28ff]" />
                                </div>
                                <div>
                                  <h3 className="text-lg font-semibold text-[#e25c28ff]">{job.role}</h3>
                                  <p className="text-sm text-[#f1f7edff]">{job.company}</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-4 mt-4">
                                <Badge className="bg-[#e25c28ff]/20 text-[#e25c28ff] border border-[#e25c28ff]/30">
                                  <CheckCircle2 className="h-3 w-3 mr-1" /> Applied
                                </Badge>
                                <span className="text-sm text-[#f1f7edff]">{job.match}% Match</span>
                                <span className="text-sm text-[#f1f7edff]">{job.date}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {currentPage === "stats" && (
            <motion.div
              key="stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-[#e25c28ff] mb-2">Your Statistics</h1>
                <p className="text-[#f1f7edff]">Detailed insights into your job search</p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Card className="bg-[#011627ff]/60 backdrop-blur-sm border-[#e25c28ff]/20">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-[#f1f7edff]">Total Applications</h3>
                        <ClipboardList className="h-5 w-5 text-[#e25c28ff]" />
                      </div>
                      <p className="text-4xl font-bold text-[#e25c28ff]">{appliedJobs.length}</p>
                      <p className="text-xs text-[#f1f7edff] mt-2">This month</p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }}>
                  <Card className="bg-[#011627ff]/60 backdrop-blur-sm border-[#e25c28ff]/20">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-[#f1f7edff]">Average Match</h3>
                        <Target className="h-5 w-5 text-[#e25c28ff]" />
                      </div>
                      <p className="text-4xl font-bold text-[#e25c28ff]">87%</p>
                      <p className="text-xs text-[#f1f7edff] mt-2">Across all jobs</p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }}>
                  <Card className="bg-[#011627ff]/60 backdrop-blur-sm border-[#e25c28ff]/20">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-[#f1f7edff]">Profile Views</h3>
                        <Users className="h-5 w-5 text-[#e25c28ff]" />
                      </div>
                      <p className="text-4xl font-bold text-[#e25c28ff]">142</p>
                      <p className="text-xs text-[#f1f7edff] mt-2">+12% from last week</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              <Card className="bg-[#011627ff]/60 backdrop-blur-sm border-[#e25c28ff]/20">
                <CardHeader>
                  <CardTitle className="text-[#e25c28ff]">Skills Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { skill: "React.js", level: 85, color: "#e25c28ff" },
                      { skill: "Python", level: 78, color: "#e25c28ff" },
                      { skill: "JavaScript", level: 90, color: "#e25c28ff" },
                      { skill: "Machine Learning", level: 72, color: "#e25c28ff" },
                    ].map((item, i) => (
                      <div key={i}>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-[#f1f7edff]">{item.skill}</span>
                          <span className="text-sm font-bold text-[#e25c28ff]">{item.level}%</span>
                        </div>
                        <Progress value={item.level} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-[#011627ff]/60 backdrop-blur-sm border-[#e25c28ff]/20">
                  <CardHeader>
                    <CardTitle className="text-[#e25c28ff]">Top Companies Interested</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {["Tech Corp", "Innovate Labs", "Cloud Systems", "AI Innovations"].map((company, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-[#022632]/50">
                          <Building2 className="h-5 w-5 text-[#e25c28ff]" />
                          <span className="text-[#f1f7edff]">{company}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#011627ff]/60 backdrop-blur-sm border-[#e25c28ff]/20">
                  <CardHeader>
                    <CardTitle className="text-[#e25c28ff]">Application Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-[#022632]/50">
                        <Calendar className="h-5 w-5 text-[#e25c28ff]" />
                        <div>
                          <p className="text-sm text-[#f1f7edff]">This Week</p>
                          <p className="text-xs text-[#f1f7edff]/70">{appliedJobs.length} applications</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-[#022632]/50">
                        <TrendingUp className="h-5 w-5 text-[#e25c28ff]" />
                        <div>
                          <p className="text-sm text-[#f1f7edff]">Growth Rate</p>
                          <p className="text-xs text-[#f1f7edff]/70">+15% response rate</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {currentPage === "resume" && (
            <motion.div
              key="resume"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-[#e25c28ff] mb-2">ATS Resume Generator</h1>
                <p className="text-[#f1f7edff]">Create an ATS-optimized resume in minutes</p>
              </div>

              <Card className="bg-[#011627ff]/60 backdrop-blur-sm border-[#e25c28ff]/20">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-[#e25c28ff]">Full Name</label>
                      <Input placeholder="Enter your full name" className="bg-[#022632] border-[#e25c28ff]/20 text-[#f1f7edff]" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <label className="text-sm font-medium text-[#e25c28ff]">Email</label>
                        <Input placeholder="your@email.com" className="bg-[#022632] border-[#e25c28ff]/20 text-[#f1f7edff]" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-medium text-[#e25c28ff]">Phone</label>
                        <Input placeholder="+91 XXXXX XXXXX" className="bg-[#022632] border-[#e25c28ff]/20 text-[#f1f7edff]" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-medium text-[#e25c28ff]">Professional Summary</label>
                      <Textarea 
                        placeholder="Write a brief summary of your professional background..." 
                        className="bg-[#022632] border-[#e25c28ff]/20 text-[#f1f7edff] min-h-[120px]" 
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-medium text-[#e25c28ff]">Skills (comma separated)</label>
                      <Textarea 
                        placeholder="React, Python, JavaScript, SQL..." 
                        className="bg-[#022632] border-[#e25c28ff]/20 text-[#f1f7edff]" 
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-medium text-[#e25c28ff]">Work Experience</label>
                      <Textarea 
                        placeholder="Company Name | Role | Duration&#10;• Achievement 1&#10;• Achievement 2" 
                        className="bg-[#022632] border-[#e25c28ff]/20 text-[#f1f7edff] min-h-[150px]" 
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-medium text-[#e25c28ff]">Education</label>
                      <Textarea 
                        placeholder="University Name | Degree | Year" 
                        className="bg-[#022632] border-[#e25c28ff]/20 text-[#f1f7edff]" 
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button className="bg-[#e25c28ff] text-[#f1f7edff] hover:bg-[#e25c28ff]/90">
                        <Sparkles className="h-4 w-4 mr-2" />
                        Generate ATS Resume
                      </Button>
                      <Button variant="outline" className="border-[#e25c28ff]/30 text-[#e25c28ff]">
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                    </div>

                    <div className="p-4 rounded-lg bg-[#022632]/50 border border-[#e25c28ff]/20">
                      <div className="flex items-start gap-3">
                        <Lightbulb className="h-5 w-5 text-[#e25c28ff] flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="text-sm font-semibold text-[#e25c28ff] mb-1">ATS Optimization Tips</h4>
                          <ul className="text-xs text-[#f1f7edff] space-y-1">
                            <li>• Use standard fonts (Arial, Calibri, Times New Roman)</li>
                            <li>• Include relevant keywords from job descriptions</li>
                            <li>• Keep formatting simple - no tables, text boxes, or graphics</li>
                            <li>• Use standard section headings (Experience, Education, Skills)</li>
                            <li>• Save as .docx or PDF format</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {currentPage === "ats" && (
            <motion.div
              key="ats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-[#e25c28ff] mb-2">ATS Checker</h1>
                <p className="text-[#f1f7edff]">Check your resume's ATS compatibility</p>
              </div>

              <Card className="bg-[#011627ff]/60 backdrop-blur-sm border-[#e25c28ff]/20">
                <CardContent className="p-8">
                  <div className="flex flex-col items-center text-center space-y-6">
                    <div className="h-24 w-24 rounded-full bg-[#e25c28ff]/10 flex items-center justify-center">
                      <Upload className="h-12 w-12 text-[#e25c28ff]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#e25c28ff] mb-2">Upload Your Resume</h3>
                      <p className="text-sm text-[#f1f7edff]">PDF or DOCX format (Max 5MB)</p>
                    </div>
                    <Button className="bg-[#e25c28ff] text-[#f1f7edff] hover:bg-[#e25c28ff]/90">
                      Choose File
                    </Button>
                  </div>

                  <div className="mt-8 p-6 rounded-lg bg-[#022632]/50 border border-[#e25c28ff]/20">
                    <h4 className="font-semibold text-[#e25c28ff] mb-4">Current Score: {resumeScore}/100</h4>
                    <Progress value={resumeScore} className="h-3 mb-4" />
                    <div className="space-y-2 text-sm text-[#f1f7edff]">
                      <div className="flex justify-between">
                        <span>Keyword Optimization</span>
                        <span className="text-[#e25c28ff]">Good</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Format Compatibility</span>
                        <span className="text-[#e25c28ff]">Excellent</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Section Structure</span>
                        <span className="text-[#e25c28ff]">Good</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {currentPage === "settings" && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-[#e25c28ff] mb-2">Settings</h1>
                <p className="text-[#f1f7edff]">Manage your profile and preferences</p>
              </div>

              <Card className="bg-[#011627ff]/60 backdrop-blur-sm border-[#e25c28ff]/20">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-[#e25c28ff] mb-4">Profile Settings</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-[#f1f7edff]">Name</label>
                          <Input defaultValue="YOGITA" className="bg-[#022632] border-[#e25c28ff]/20 text-[#f1f7edff] mt-2" />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-[#f1f7edff]">Email</label>
                          <Input defaultValue="yogita@example.com" className="bg-[#022632] border-[#e25c28ff]/20 text-[#f1f7edff] mt-2" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-[#e25c28ff] mb-4">Notification Preferences</h3>
                      <div className="space-y-3">
                        {["Job Matches", "Application Updates", "Weekly Summary"].map((item, i) => (
                          <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-[#022632]/50">
                            <span className="text-[#f1f7edff]">{item}</span>
                            <input type="checkbox" defaultChecked className="h-4 w-4" />
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button className="bg-[#e25c28ff] text-[#f1f7edff] hover:bg-[#e25c28ff]/90">
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.main>

      {/* Job Detail Modal */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedJob(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#011627ff] border-2 border-[#e25c28ff]/30 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-[#e25c28ff] mb-2">{selectedJob.role}</h2>
                    <p className="text-lg text-[#f1f7edff]">{selectedJob.company}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedJob(null)}
                    className="text-[#f1f7edff] hover:text-[#e25c28ff]"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-[#f1f7edff]">
                    <MapPin className="h-4 w-4" />
                    {selectedJob.location}
                  </div>
                  <div className="flex items-center gap-2 text-[#f1f7edff]">
                    <DollarSign className="h-4 w-4" />
                    {selectedJob.salary}
                  </div>
                  <div className="flex items-center gap-2 text-[#f1f7edff]">
                    <Calendar className="h-4 w-4" />
                    {selectedJob.type}
                  </div>
                  <div className="flex items-center gap-2 text-[#f1f7edff]">
                    <Clock className="h-4 w-4" />
                    {selectedJob.experience}
                  </div>
                </div>

                <div className="mb-6 p-4 rounded-lg bg-[#022632]/50 border border-[#e25c28ff]/20">
                  <div className="flex items-center justify-between">
                    <span className="text-[#f1f7edff]">Your Match Score</span>
                    <span className="text-3xl font-bold text-[#e25c28ff]">{selectedJob.match}%</span>
                  </div>
                  <Progress value={selectedJob.match} className="h-2 mt-3" />
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-[#e25c28ff] mb-3">Job Description</h3>
                    <p className="text-[#f1f7edff]">{selectedJob.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-[#e25c28ff] mb-3">Requirements</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedJob.requirements?.map((req, i) => (
                        <Badge key={i} className="bg-[#022632] text-[#f1f7edff] border border-[#e25c28ff]/20">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {selectedJob.lackingSkills && selectedJob.lackingSkills.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-[#e25c28ff] mb-3">Skills to Develop</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedJob.lackingSkills.map((skill, i) => (
                          <Badge key={i} className="bg-[#e25c28ff]/10 text-[#e25c28ff] border border-[#e25c28ff]/30">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedJob.benefits && (
                    <div>
                      <h3 className="text-lg font-semibold text-[#e25c28ff] mb-3">Benefits</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedJob.benefits.map((benefit, i) => (
                          <div key={i} className="flex items-center gap-2 text-[#f1f7edff]">
                            <CheckCircle2 className="h-4 w-4 text-[#e25c28ff]" />
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-8 flex gap-3">
                  {isJobApplied(selectedJob.id) || selectedJob.status === "Applied" ? (
                    <Button className="flex-1 bg-[#e25c28ff]/20 text-[#e25c28ff] border border-[#e25c28ff]/30" disabled>
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Applied
                    </Button>
                  ) : (
                    <Button 
                      className="flex-1 bg-[#e25c28ff] text-[#f1f7edff] hover:bg-[#e25c28ff]/90"
                      onClick={() => handleApply(selectedJob)}
                    >
                      Apply Now
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    className="border-[#e25c28ff]/30 text-[#e25c28ff]"
                    onClick={() => setSelectedJob(null)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
