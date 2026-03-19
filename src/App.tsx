import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AdminLayout from "@/components/AdminLayout";
import Dashboard from "@/pages/admin/Dashboard";
import Templates from "@/pages/admin/Templates";
import Campaigns from "@/pages/admin/Campaigns";
import SenderConfig from "@/pages/admin/SenderConfig";
import UserManagement from "@/pages/admin/UserManagement";
import LMS from "@/pages/admin/LMS";
import SSOConfig from "@/pages/admin/SSOConfig";
import AdminSettings from "@/pages/admin/AdminSettings";
import LandingCustomization from "@/pages/admin/LandingCustomization";
import PhishedLanding from "@/pages/user/PhishedLanding";
import UserReport from "@/pages/user/UserReport";
import CourseViewer from "@/pages/user/CourseViewer";
import ResetPassword from "@/pages/user/ResetPassword";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AdminPage = ({ children }: { children: React.ReactNode }) => (
  <AdminLayout>{children}</AdminLayout>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/admin" replace />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminPage><Dashboard /></AdminPage>} />
          <Route path="/admin/templates" element={<AdminPage><Templates /></AdminPage>} />
          <Route path="/admin/campaigns" element={<AdminPage><Campaigns /></AdminPage>} />
          <Route path="/admin/sender" element={<AdminPage><SenderConfig /></AdminPage>} />
          <Route path="/admin/users" element={<AdminPage><UserManagement /></AdminPage>} />
          <Route path="/admin/lms" element={<AdminPage><LMS /></AdminPage>} />
          <Route path="/admin/sso" element={<AdminPage><SSOConfig /></AdminPage>} />
          <Route path="/admin/settings" element={<AdminPage><AdminSettings /></AdminPage>} />

          {/* User-facing Routes */}
          <Route path="/phished" element={<PhishedLanding />} />
          <Route path="/user/report" element={<UserReport />} />
          <Route path="/user/course/:courseId" element={<CourseViewer />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
