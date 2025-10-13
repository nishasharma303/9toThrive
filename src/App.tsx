import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PlacementLayout } from "./components/layout/PlacementLayout";
import Dashboard from "./pages/Placement/Dashboard";
import Students from "./pages/Placement/Students";
import Recruiters from "./pages/Placement/Recruiters";
import Jobs from "./pages/Placement/Jobs";
import Communication from "./pages/Placement/Communication";
import Settings from "./pages/Placement/Settings";
import CalendarPage from "./pages/Placement/Calendar";
import RecruitmentTracking from "./pages/Placement/RecruitmentTracking";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/placement" replace />} />
          <Route path="/placement" element={<PlacementLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="students" element={<Students />} />
            <Route path="recruiters" element={<Recruiters />} />
            <Route path="jobs" element={<Jobs />} />
            <Route path="communication" element={<Communication />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="recruitment-tracking" element={<RecruitmentTracking />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
