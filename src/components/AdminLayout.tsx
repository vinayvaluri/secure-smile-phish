import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Mail, FileText, Users, GraduationCap, Settings,
  Send, Calendar, Shield, ChevronLeft, ChevronRight, LogOut, Bell, UserCircle, Layout, BarChart3
} from "lucide-react";
import logo from "@/assets/logo.png";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
  { icon: FileText, label: "Templates", path: "/admin/templates" },
  { icon: Calendar, label: "Campaigns", path: "/admin/campaigns" },
  { icon: Send, label: "Sender Config", path: "/admin/sender" },
  { icon: Users, label: "User Management", path: "/admin/users" },
  { icon: Layout, label: "Landing Page", path: "/admin/landing" },
  { icon: GraduationCap, label: "LMS", path: "/admin/lms" },
  { icon: Shield, label: "SSO / Azure AD", path: "/admin/sso" },
  { icon: Settings, label: "Settings", path: "/admin/settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`bg-sidebar flex flex-col transition-all duration-300 ${
          collapsed ? "w-16" : "w-64"
        }`}
      >
        <div className="sidebar-logo">
          <div className={`${collapsed ? "w-8 h-8" : "w-10 h-10"} rounded-lg bg-white flex items-center justify-center p-1 shadow-sm`}>
            <img src={logo} alt="Vishwa Samudra" className="w-full h-auto object-contain" />
          </div>
          {!collapsed && (
            <span className="text-sidebar-primary font-display font-bold text-sm leading-tight">
              Vishwa Samudra<br />
              <span className="text-sidebar-foreground/60 text-[10px] font-normal tracking-wider">
                PHISHING SIMULATOR
              </span>
            </span>
          )}
        </div>

        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item ${isActive ? "nav-item-active" : "nav-item-inactive"}`}
                title={collapsed ? item.label : undefined}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="nav-item nav-item-inactive mx-2 mb-4 justify-center"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-14 border-b bg-card flex items-center justify-between px-6 shrink-0">
          <h2 className="font-display font-semibold text-sm text-foreground">
            Admin Panel
          </h2>
          <div className="flex items-center gap-4">
            <button className="relative text-muted-foreground hover:text-foreground transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
            </button>
            <div className="flex items-center gap-2 text-sm">
              <UserCircle className="w-6 h-6 text-muted-foreground" />
              <span className="font-medium">Admin</span>
            </div>
            <button className="text-muted-foreground hover:text-destructive transition-colors">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
