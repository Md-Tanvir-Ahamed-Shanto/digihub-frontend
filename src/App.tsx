import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Import pages
import Index from "./pages/Index";
import Solutions from "./pages/Solutions";
import HowItWorks from "./pages/HowItWorks";
import CaseStudies from "./pages/CaseStudies";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import About from "./pages/About";
import Team from "./pages/Team";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";

// Login Pages
import ClientLogin from "./pages/ClientLogin";
import AdminLogin from "./pages/AdminLogin";

// Dashboard Pages
import ClientDashboard from "./pages/ClientDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import SubmitProject from "./pages/SubmitProject";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized"; // New Unauthorized page

// Auth System Components
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute
import PartnerDashboard from "./pages/DeveloperDashboard";
import PartnerLogin from "./pages/DeveloperLogin";
import SetPassword from "./pages/SetPassword";
import SetPasswordFailed from './pages/SetPasswordFailed';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider> {/* Wrap your Routes with AuthProvider */}
          <ScrollToTop />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/services" element={<Solutions />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/case-studies/:id" element={<CaseStudyDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Team />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/submit-project" element={<SubmitProject />} />
            <Route path="/set-password" element={<SetPassword />} />
            <Route path="/set-password-failed" element={<SetPasswordFailed />} />

            {/* Login Routes (Accessible to anyone, will redirect if already logged in typically) */}
            <Route path="/client-login" element={<ClientLogin />} />
            <Route path="/partner-login" element={<PartnerLogin />} />
            <Route path="/admin-login" element={<AdminLogin />} />

            {/* Unauthorized Page */}
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* PROTECTED ROUTES */}
            <Route element={<ProtectedRoute allowedRoles={['client']} />}>
              <Route path="/client-dashboard" element={<ClientDashboard />} />
              {/* Add other client-specific routes here */}
              {/* <Route path="/client/projects/:id" element={<ClientProjectDetail />} /> */}
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['partner']} />}>
              <Route path="/partner-dashboard" element={<PartnerDashboard />} />
              {/* Add other partner-specific routes here */}
              {/* <Route path="/partner/projects" element={<PartnerProjects />} /> */}
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              {/* Add other admin-specific routes here */}
              {/* <Route path="/admin/users" element={<AdminUsers />} /> */}
            </Route>

            {/* Catch-all for Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;