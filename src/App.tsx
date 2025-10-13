import React from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AppSidebar } from "./components/AppSidebar";
import { JobProvider } from "./contexts/JobContext";
import { ResumeProvider } from "./contexts/ResumeContext";
import Index from "./pages/Index";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebaseConfig";

// Student dashboard imports
import Student from "./pages/Student/Student"; 
import JobsStudent from "./pages/Student/Jobs";
import AppliedJobs from "./pages/Student/AppliedJobs";
import Stats from "./pages/Student/Stats";
import ResumeGenerator from "./pages/Student/ResumeGenerator";
import ATSChecker from "./pages/Student/ATSChecker";
import SettingsStudent from "./pages/Student/Settings";
import NotFound from "./pages/NotFound";
import Match from "./pages/Student/Match";
import ResumeUpload from "./pages/Student/ResumeUpload";

// Placement dashboard imports
import { PlacementLayout } from "./components/layout/PlacementLayout";
import DashboardPlacement from "./pages/Placement/Dashboard";
import Students from "./pages/Placement/Students";
import Recruiters from "./pages/Placement/Recruiters";
import Jobs from "./pages/Placement/Jobs";
import Analytics from "./pages/Placement/Analytics";
import Communication from "./pages/Placement/Communication";
import Settings from "./pages/Placement/Settings";

// Recruitment dashboard imports
import { RecruitmentLayout } from "./components/layout/RecruitmentLayout";
import DashboardRec from "./pages/Recruitment/DashboardRec";
import JobPosting from "./pages/Recruitment/JobPosting";
import MatchCalculator from "./pages/Recruitment/MatchCalculator";
import CandidateMatching from "./pages/Recruitment/CandidateMatching";
import QuickHire from "./pages/Recruitment/QuickHire";
import EligibilityCriteria from "./pages/Recruitment/EligibilityCriteria";
import CommunicationRec from "./pages/Recruitment/Communication";
import Reports from "./pages/Recruitment/Reports";
import SettingsRec from "./pages/Recruitment/settingsRec";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const path = location.pathname;
  
  return (
    // Keep sidebar open by default when on the resume upload route
    <SidebarProvider defaultOpen={path === "/student/resume-upload"}>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
            <div className="flex h-14 items-center px-4">
              <SidebarTrigger />
            </div>
          </header>
          <main className="flex-1 overflow-auto">
            {path === "/student" && <Student />}
            {path === "/student/resume-upload" && <ResumeUpload />}
            {path === "/jobs" && <JobsStudent />}
            {path === "/match" && <Match />}
            {path === "/applied" && <AppliedJobs />}
            {path === "/stats" && <Stats />}
            {path === "/resume-generator" && <ResumeGenerator />}
            {path === "/ats-checker" && <ATSChecker />}
            {path === "/settings" && <SettingsStudent />}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <JobProvider>
        <ResumeProvider>
  <Sonner />
        <BrowserRouter>
          <Routes>
            {/* 🏠 Landing Page */}
            <Route path="/" element={<Index />} />

            {/* 👨‍🎓 Student Dashboard Routes */}
            <Route path="/student/*" element={<AppContent />} />
            <Route path="/jobs" element={<AppContent />} />
            <Route path="/match" element={<AppContent />} />
            <Route path="/applied" element={<AppContent />} />
            <Route path="/stats" element={<AppContent />} />
            <Route path="/resume-generator" element={<AppContent />} />
            <Route path="/ats-checker" element={<AppContent />} />
            <Route path="/settings" element={<AppContent />} />

            {/* 🎓 Placement Dashboard Routes */}
            <Route path="/placement/*" element={<PlacementLayout />}>
              <Route index element={<DashboardPlacement />} />
              <Route path="students" element={<Students />} />
              <Route path="recruiters" element={<Recruiters />} />
              <Route path="jobs" element={<Jobs />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="communication" element={<Communication />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* 💼 Recruitment Dashboard Routes */}
            <Route path="/recruitment/*" element={<RecruitmentLayout />}>
              <Route index element={<DashboardRec />} />
              <Route path="jobs" element={<JobPosting />} />
              <Route path="eligibility" element={<EligibilityCriteria />} />
              <Route path="calculator" element={<MatchCalculator />} />
              <Route path="matching" element={<CandidateMatching />} />
              <Route path="quick-hire" element={<QuickHire />} />
              <Route path="communication" element={<CommunicationRec />} />
              <Route path="reports" element={<Reports />} />
              <Route path="settings" element={<SettingsRec />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* ❌ Catch-All 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </ResumeProvider>
      </JobProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;