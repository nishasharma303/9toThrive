import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, User, Briefcase, MapPin, DollarSign, Clock, 
  Bell, Lock, Globe, Upload, Plus, X, Save, Mail,
  Linkedin, Github, Twitter, Link as LinkIcon, GraduationCap,
  Building, Calendar, Award
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Profile State
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+91 9876543210",
    location: "Bengaluru, India",
    bio: "Passionate software developer with experience in full-stack development",
    linkedIn: "linkedin.com/in/johndoe",
    github: "github.com/johndoe",
    portfolio: "johndoe.dev",
    twitter: "@johndoe"
  });

  // Job Preferences State
  const [jobPreferences, setJobPreferences] = useState({
    preferredRoles: ["Software Engineer", "Full Stack Developer", "Backend Developer"],
    preferredLocations: ["Bengaluru", "Hyderabad", "Remote"],
    workType: "hybrid",
    employmentType: "fulltime",
    minSalary: "6",
    maxSalary: "12",
    experienceLevel: "entry",
    noticePeriod: "30",
    willingToRelocate: true,
    openToRemote: true
  });

  // Skills State
  const [skills, setSkills] = useState({
    technical: ["JavaScript", "Python", "React", "Node.js", "SQL", "MongoDB"],
    soft: ["Communication", "Teamwork", "Problem Solving", "Time Management"],
    languages: ["English", "Hindi", "Tamil"]
  });

  // Education State
  const [education, setEducation] = useState([
    {
      degree: "B.Tech in Computer Science",
      institution: "ABC University",
      year: "2020-2024",
      grade: "8.5 CGPA"
    }
  ]);

  // Experience State
  const [experience, setExperience] = useState([
    {
      title: "Software Development Intern",
      company: "Tech Corp",
      duration: "Jun 2023 - Dec 2023",
      description: "Worked on building scalable web applications using React and Node.js"
    }
  ]);

  // Notification Preferences
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    jobAlerts: true,
    applicationUpdates: true,
    weeklyDigest: false,
    marketingEmails: false
  });

  const [newSkill, setNewSkill] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newLocation, setNewLocation] = useState("");

  const handleSave = (section: string) => {
    toast({
      title: "Settings Saved",
      description: `Your ${section} has been updated successfully`,
    });
  };

  const addSkill = (category: 'technical' | 'soft' | 'languages') => {
    if (newSkill && !skills[category].includes(newSkill)) {
      setSkills({
        ...skills,
        [category]: [...skills[category], newSkill]
      });
      setNewSkill("");
    }
  };

  const removeSkill = (category: 'technical' | 'soft' | 'languages', skill: string) => {
    setSkills({
      ...skills,
      [category]: skills[category].filter(s => s !== skill)
    });
  };

  const addPreferredRole = () => {
    if (newRole && !jobPreferences.preferredRoles.includes(newRole)) {
      setJobPreferences({
        ...jobPreferences,
        preferredRoles: [...jobPreferences.preferredRoles, newRole]
      });
      setNewRole("");
    }
  };

  const removePreferredRole = (role: string) => {
    setJobPreferences({
      ...jobPreferences,
      preferredRoles: jobPreferences.preferredRoles.filter(r => r !== role)
    });
  };

  const addPreferredLocation = () => {
    if (newLocation && !jobPreferences.preferredLocations.includes(newLocation)) {
      setJobPreferences({
        ...jobPreferences,
        preferredLocations: [...jobPreferences.preferredLocations, newLocation]
      });
      setNewLocation("");
    }
  };

  const removePreferredLocation = (location: string) => {
    setJobPreferences({
      ...jobPreferences,
      preferredLocations: jobPreferences.preferredLocations.filter(l => l !== location)
    });
  };

  return (
    <div className="min-h-screen bg-[#011627ff]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#011627ff]/80 backdrop-blur-md border-b border-[#073138]/40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/dashboard')}
              className="text-[#f1f7edff] hover:text-[#e25c28ff]"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold text-[#e25c28ff]">Settings</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-[#011627ff] border border-[#e25c28ff]/20">
            <TabsTrigger value="profile" className="data-[state=active]:bg-[#e25c28ff] data-[state=active]:text-white text-[#f1f7edff]">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="preferences" className="data-[state=active]:bg-[#e25c28ff] data-[state=active]:text-white text-[#f1f7edff]">
              <Briefcase className="h-4 w-4 mr-2" />
              Job Preferences
            </TabsTrigger>
            <TabsTrigger value="skills" className="data-[state=active]:bg-[#e25c28ff] data-[state=active]:text-white text-[#f1f7edff]">
              <Award className="h-4 w-4 mr-2" />
              Skills
            </TabsTrigger>
            <TabsTrigger value="education" className="data-[state=active]:bg-[#e25c28ff] data-[state=active]:text-white text-[#f1f7edff]">
              <GraduationCap className="h-4 w-4 mr-2" />
              Education
            </TabsTrigger>
            <TabsTrigger value="experience" className="data-[state=active]:bg-[#e25c28ff] data-[state=active]:text-white text-[#f1f7edff]">
              <Building className="h-4 w-4 mr-2" />
              Experience
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-[#e25c28ff] data-[state=active]:text-white text-[#f1f7edff]">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="border-2 border-border bg-[#011627ff]">
              <CardHeader>
                <CardTitle className="text-[#e25c28ff]">Personal Information</CardTitle>
                <CardDescription className="text-[#f1f7edff]">Update your personal details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-[#f1f7edff]">First Name</Label>
                    <Input 
                      id="firstName" 
                      value={profile.firstName}
                      onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                      className="bg-[#011627ff] border-[#e25c28ff]/20 text-[#f1f7edff]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-[#f1f7edff]">Last Name</Label>
                    <Input 
                      id="lastName" 
                      value={profile.lastName}
                      onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                      className="bg-[#011627ff] border-[#e25c28ff]/20 text-[#f1f7edff]"
                    />
                  </div>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#f1f7edff]">Email</Label>
                    <Input 
                      id="email" 
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                      className="bg-[#011627ff] border-[#e25c28ff]/20 text-[#f1f7edff]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-[#f1f7edff]">Phone</Label>
                    <Input 
                      id="phone" 
                      value={profile.phone}
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                      className="bg-[#011627ff] border-[#e25c28ff]/20 text-[#f1f7edff]"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-[#f1f7edff]">Location</Label>
                  <Input 
                    id="location" 
                    value={profile.location}
                    onChange={(e) => setProfile({...profile, location: e.target.value})}
                    className="bg-[#011627ff] border-[#e25c28ff]/20 text-[#f1f7edff]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-[#f1f7edff]">Bio</Label>
                  <Textarea 
                    id="bio" 
                    value={profile.bio}
                    onChange={(e) => setProfile({...profile, bio: e.target.value})}
                    rows={4}
                    className="bg-[#011627ff] border-[#e25c28ff]/20 text-[#f1f7edff]"
                  />
                </div>
                <Button onClick={() => handleSave("profile")} className="bg-[#e25c28ff] text-white hover:bg-[#e25c28ff]/90">
                  <Save className="h-4 w-4 mr-2" />
                  Save Profile
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-border bg-[#011627ff]">
              <CardHeader>
                <CardTitle className="text-[#e25c28ff]">Social Links</CardTitle>
                <CardDescription className="text-[#f1f7edff]">Connect your professional profiles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="linkedin" className="text-[#f1f7edff] flex items-center gap-2">
                    <Linkedin className="h-4 w-4" /> LinkedIn
                  </Label>
                  <Input 
                    id="linkedin" 
                    value={profile.linkedIn}
                    onChange={(e) => setProfile({...profile, linkedIn: e.target.value})}
                    className="bg-[#011627ff] border-[#e25c28ff]/20 text-[#f1f7edff]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="github" className="text-[#f1f7edff] flex items-center gap-2">
                    <Github className="h-4 w-4" /> GitHub
                  </Label>
                  <Input 
                    id="github" 
                    value={profile.github}
                    onChange={(e) => setProfile({...profile, github: e.target.value})}
                    className="bg-[#011627ff] border-[#e25c28ff]/20 text-[#f1f7edff]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="portfolio" className="text-[#f1f7edff] flex items-center gap-2">
                    <LinkIcon className="h-4 w-4" /> Portfolio
                  </Label>
                  <Input 
                    id="portfolio" 
                    value={profile.portfolio}
                    onChange={(e) => setProfile({...profile, portfolio: e.target.value})}
                    className="bg-[#011627ff] border-[#e25c28ff]/20 text-[#f1f7edff]"
                  />
                </div>
                <Button onClick={() => handleSave("social links")} className="bg-[#e25c28ff] text-white hover:bg-[#e25c28ff]/90">
                  <Save className="h-4 w-4 mr-2" />
                  Save Links
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Job Preferences Tab */}
          <TabsContent value="preferences" className="space-y-6">
            <Card className="border-2 border-border bg-[#011627ff]">
              <CardHeader>
                <CardTitle className="text-[#e25c28ff]">Job Preferences</CardTitle>
                <CardDescription className="text-[#f1f7edff]">Set your preferred job criteria and we'll match you with relevant opportunities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Preferred Roles */}
                <div className="space-y-3">
                  <Label className="text-[#f1f7edff]">Preferred Job Roles</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {jobPreferences.preferredRoles.map((role) => (
                      <Badge key={role} className="px-3 py-1 bg-[#011627ff] text-[#f1f7edff] border border-[#e25c28ff]/20">
                        {role}
                        <X className="ml-2 h-3 w-3 cursor-pointer" onClick={() => removePreferredRole(role)} />
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Add job role"
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addPreferredRole()}
                      className="bg-[#011627ff] border-[#e25c28ff]/20 text-[#f1f7edff]"
                    />
                    <Button onClick={addPreferredRole} className="bg-[#e25c28ff] text-white">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Preferred Locations */}
                <div className="space-y-3">
                  <Label className="text-[#f1f7edff]">Preferred Locations</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {jobPreferences.preferredLocations.map((location) => (
                      <Badge key={location} className="px-3 py-1 bg-[#011627ff] text-[#f1f7edff] border border-[#e25c28ff]/20">
                        {location}
                        <X className="ml-2 h-3 w-3 cursor-pointer" onClick={() => removePreferredLocation(location)} />
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Add location"
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addPreferredLocation()}
                      className="bg-[#011627ff] border-[#e25c28ff]/20 text-[#f1f7edff]"
                    />
                    <Button onClick={addPreferredLocation} className="bg-[#e25c28ff] text-white">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Work Type & Employment Type */}
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-[#f1f7edff]">Work Type</Label>
                    <Select value={jobPreferences.workType} onValueChange={(value) => setJobPreferences({...jobPreferences, workType: value})}>
                      <SelectTrigger className="bg-[#011627ff] border-[#e25c28ff]/20 text-[#f1f7edff]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="onsite">On-site</SelectItem>
                        <SelectItem value="remote">Remote</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#f1f7edff]">Employment Type</Label>
                    <Select value={jobPreferences.employmentType} onValueChange={(value) => setJobPreferences({...jobPreferences, employmentType: value})}>
                      <SelectTrigger className="bg-[#011627ff] border-[#e25c28ff]/20 text-[#f1f7edff]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fulltime">Full-time</SelectItem>
                        <SelectItem value="parttime">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Salary Range */}
                <div className="space-y-3">
                  <Label className="text-[#f1f7edff]">Expected Salary Range (LPA)</Label>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="text-[#f1f7edff] text-sm">Minimum</Label>
                      <Input 
                        type="number"
                        value={jobPreferences.minSalary}
                        onChange={(e) => setJobPreferences({...jobPreferences, minSalary: e.target.value})}
                        className="bg-[#011627ff] border-[#e25c28ff]/20 text-[#f1f7edff]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[#f1f7edff] text-sm">Maximum</Label>
                      <Input 
                        type="number"
                        value={jobPreferences.maxSalary}
                        onChange={(e) => setJobPreferences({...jobPreferences, maxSalary: e.target.value})}
                        className="bg-[#011627ff] border-[#e25c28ff]/20 text-[#f1f7edff]"
                      />
                    </div>
                  </div>
                </div>

                {/* Experience Level & Notice Period */}
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-[#f1f7edff]">Experience Level</Label>
                    <Select value={jobPreferences.experienceLevel} onValueChange={(value) => setJobPreferences({...jobPreferences, experienceLevel: value})}>
                      <SelectTrigger className="bg-[#011627ff] border-[#e25c28ff]/20 text-[#f1f7edff]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                        <SelectItem value="mid">Mid Level (2-5 years)</SelectItem>
                        <SelectItem value="senior">Senior Level (5+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#f1f7edff]">Notice Period (days)</Label>
                    <Input 
                      type="number"
                      value={jobPreferences.noticePeriod}
                      onChange={(e) => setJobPreferences({...jobPreferences, noticePeriod: e.target.value})}
                      className="bg-[#011627ff] border-[#e25c28ff]/20 text-[#f1f7edff]"
                    />
                  </div>
                </div>

                {/* Switches */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-[#f1f7edff]">Willing to Relocate</Label>
                      <p className="text-sm text-[#f1f7edff]/70">Open to relocating for the right opportunity</p>
                    </div>
                    <Switch 
                      checked={jobPreferences.willingToRelocate}
                      onCheckedChange={(checked) => setJobPreferences({...jobPreferences, willingToRelocate: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-[#f1f7edff]">Open to Remote Work</Label>
                      <p className="text-sm text-[#f1f7edff]/70">Interested in fully remote positions</p>
                    </div>
                    <Switch 
                      checked={jobPreferences.openToRemote}
                      onCheckedChange={(checked) => setJobPreferences({...jobPreferences, openToRemote: checked})}
                    />
                  </div>
                </div>

                <Button onClick={() => handleSave("job preferences")} className="bg-[#e25c28ff] text-white hover:bg-[#e25c28ff]/90">
                  <Save className="h-4 w-4 mr-2" />
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills" className="space-y-6">
            {['technical', 'soft', 'languages'].map((category) => (
              <Card key={category} className="border-2 border-border bg-[#011627ff]">
                <CardHeader>
                  <CardTitle className="text-[#e25c28ff] capitalize">{category} Skills</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {skills[category as keyof typeof skills].map((skill) => (
                      <Badge key={skill} className="px-3 py-1 bg-[#011627ff] text-[#f1f7edff] border border-[#e25c28ff]/20">
                        {skill}
                        <X className="ml-2 h-3 w-3 cursor-pointer" onClick={() => removeSkill(category as 'technical' | 'soft' | 'languages', skill)} />
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input 
                      placeholder={`Add ${category} skill`}
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addSkill(category as 'technical' | 'soft' | 'languages')}
                      className="bg-[#011627ff] border-[#e25c28ff]/20 text-[#f1f7edff]"
                    />
                    <Button onClick={() => addSkill(category as 'technical' | 'soft' | 'languages')} className="bg-[#e25c28ff] text-white">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button onClick={() => handleSave("skills")} className="bg-[#e25c28ff] text-white hover:bg-[#e25c28ff]/90">
              <Save className="h-4 w-4 mr-2" />
              Save Skills
            </Button>
          </TabsContent>

          {/* Education Tab */}
          <TabsContent value="education" className="space-y-6">
            {education.map((edu, idx) => (
              <Card key={idx} className="border-2 border-border bg-[#011627ff]">
                <CardContent className="p-6 space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="text-[#f1f7edff]">Degree</Label>
                      <Input 
                        value={edu.degree}
                        className="bg-[#011627ff] border-[#e25c28ff]/20 text-[#f1f7edff]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[#f1f7edff]">Institution</Label>
                      <Input 
                        value={edu.institution}
                        className="bg-[#011627ff] border-[#e25c28ff]/20 text-[#f1f7edff]"
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="text-[#f1f7edff]">Year</Label>
                      <Input 
                        value={edu.year}
                        className="bg-[#011627ff] border-[#e25c28ff]/20 text-[#f1f7edff]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[#f1f7edff]">Grade/CGPA</Label>
                      <Input 
                        value={edu.grade}
                        className="bg-[#011627ff] border-[#e25c28ff]/20 text-[#f1f7edff]"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button className="bg-[#011627ff] border border-[#e25c28ff]/20 text-[#e25c28ff]">
              <Plus className="h-4 w-4 mr-2" />
              Add Education
            </Button>
            <Button onClick={() => handleSave("education")} className="ml-2 bg-[#e25c28ff] text-white hover:bg-[#e25c28ff]/90">
              <Save className="h-4 w-4 mr-2" />
              Save Education
            </Button>
          </TabsContent>

          {/* Experience Tab */}
          <TabsContent value="experience" className="space-y-6">
            {experience.map((exp, idx) => (
              <Card key={idx} className="border-2 border-border bg-[#011627ff]">
                <CardContent className="p-6 space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="text-[#f1f7edff]">Job Title</Label>
                      <Input 
                        value={exp.title}
                        className="bg-[#011627ff] border-[#e25c28ff]/20 text-[#f1f7edff]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[#f1f7edff]">Company</Label>
                      <Input 
                        value={exp.company}
                        className="bg-[#011627ff] border-[#e25c28ff]/20 text-[#f1f7edff]"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#f1f7edff]">Duration</Label>
                    <Input 
                      value={exp.duration}
                      className="bg-[#011627ff] border-[#e25c28ff]/20 text-[#f1f7edff]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#f1f7edff]">Description</Label>
                    <Textarea 
                      value={exp.description}
                      rows={3}
                      className="bg-[#011627ff] border-[#e25c28ff]/20 text-[#f1f7edff]"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button className="bg-[#011627ff] border border-[#e25c28ff]/20 text-[#e25c28ff]">
              <Plus className="h-4 w-4 mr-2" />
              Add Experience
            </Button>
            <Button onClick={() => handleSave("experience")} className="ml-2 bg-[#e25c28ff] text-white hover:bg-[#e25c28ff]/90">
              <Save className="h-4 w-4 mr-2" />
              Save Experience
            </Button>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="border-2 border-border bg-[#011627ff]">
              <CardHeader>
                <CardTitle className="text-[#e25c28ff]">Notification Preferences</CardTitle>
                <CardDescription className="text-[#f1f7edff]">Manage how you receive updates and alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-[#f1f7edff]">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </Label>
                      <p className="text-sm text-[#f1f7edff]/70">
                        {key === 'emailNotifications' && 'Receive notifications via email'}
                        {key === 'jobAlerts' && 'Get notified about new job matches'}
                        {key === 'applicationUpdates' && 'Updates on your job applications'}
                        {key === 'weeklyDigest' && 'Weekly summary of opportunities'}
                        {key === 'marketingEmails' && 'Promotional content and tips'}
                      </p>
                    </div>
                    <Switch 
                      checked={value}
                      onCheckedChange={(checked) => setNotifications({...notifications, [key]: checked})}
                    />
                  </div>
                ))}
                <Button onClick={() => handleSave("notification preferences")} className="bg-[#e25c28ff] text-white hover:bg-[#e25c28ff]/90">
                  <Save className="h-4 w-4 mr-2" />
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;