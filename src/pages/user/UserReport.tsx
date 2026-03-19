import { Link } from "react-router-dom";
import { Shield, TrendingUp, AlertTriangle, CheckCircle, BookOpen, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import logo from "@/assets/logo.png";

const userReport = {
  name: "Rajesh Kumar",
  email: "rajesh@vishwasamudra.com",
  department: "Finance",
  totalSimulations: 8,
  phished: 2,
  reported: 4,
  ignored: 2,
  awarenessScore: 75,
  coursesAssigned: 3,
  coursesCompleted: 2,
  history: [
    { date: "2026-03-18", campaign: "IT Support Scam", result: "phished", action: "Clicked link" },
    { date: "2026-03-10", campaign: "Password Reset Alert", result: "reported", action: "Reported to IT" },
    { date: "2026-02-25", campaign: "Invoice Payment", result: "phished", action: "Entered credentials" },
    { date: "2026-02-15", campaign: "HR Benefits", result: "reported", action: "Reported to IT" },
    { date: "2026-02-01", campaign: "CEO Request", result: "ignored", action: "Deleted email" },
    { date: "2026-01-20", campaign: "Delivery Notification", result: "reported", action: "Reported to IT" },
  ],
  pendingCourses: [
    { id: "social-eng", title: "Social Engineering Defense", deadline: "2026-03-25", progress: 40 },
  ],
  completedCourses: [
    { id: "phishing-101", title: "Phishing Awareness 101", completedDate: "2026-03-12" },
    { id: "password-sec", title: "Password Security Best Practices", completedDate: "2026-02-28" },
  ],
};

export default function UserReport() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Vishwa Samudra" className="w-10 h-auto" />
            <span className="font-display font-bold text-sm">Security Awareness Report</span>
          </div>
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-1"><ArrowLeft className="w-4 h-4" />Back</Button>
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8 animate-fade-in">
        {/* User Info */}
        <div className="mb-8">
          <h1 className="font-display text-2xl font-bold">{userReport.name}</h1>
          <p className="text-muted-foreground">{userReport.email} · {userReport.department}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="stat-card text-center">
            <Shield className="w-5 h-5 text-primary mx-auto mb-1" />
            <div className="text-2xl font-display font-bold">{userReport.totalSimulations}</div>
            <div className="text-xs text-muted-foreground">Simulations</div>
          </div>
          <div className="stat-card text-center">
            <AlertTriangle className="w-5 h-5 text-destructive mx-auto mb-1" />
            <div className="text-2xl font-display font-bold text-destructive">{userReport.phished}</div>
            <div className="text-xs text-muted-foreground">Phished</div>
          </div>
          <div className="stat-card text-center">
            <CheckCircle className="w-5 h-5 text-success mx-auto mb-1" />
            <div className="text-2xl font-display font-bold text-success">{userReport.reported}</div>
            <div className="text-xs text-muted-foreground">Reported</div>
          </div>
          <div className="stat-card text-center">
            <TrendingUp className="w-5 h-5 text-primary mx-auto mb-1" />
            <div className="text-2xl font-display font-bold">{userReport.awarenessScore}%</div>
            <div className="text-xs text-muted-foreground">Awareness Score</div>
          </div>
        </div>

        {/* Pending Courses */}
        {userReport.pendingCourses.length > 0 && (
          <div className="bg-warning/5 border border-warning/20 rounded-lg p-6 mb-6">
            <h3 className="font-display font-semibold flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-warning" />Pending Training
            </h3>
            {userReport.pendingCourses.map(c => (
              <div key={c.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{c.title}</p>
                  <p className="text-xs text-muted-foreground">Deadline: {c.deadline}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24">
                    <Progress value={c.progress} className="h-2" />
                  </div>
                  <span className="text-xs font-medium">{c.progress}%</span>
                  <Link to={`/user/course/${c.id}`}>
                    <Button size="sm" className="bg-primary text-primary-foreground">Continue</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Simulation History */}
        <div className="bg-card border rounded-lg">
          <div className="px-6 py-4 border-b">
            <h3 className="font-display font-semibold">Simulation History</h3>
          </div>
          <table className="data-table">
            <thead>
              <tr><th>Date</th><th>Campaign</th><th>Result</th><th>Action</th></tr>
            </thead>
            <tbody>
              {userReport.history.map((h, i) => (
                <tr key={i}>
                  <td className="text-muted-foreground">{h.date}</td>
                  <td className="font-medium">{h.campaign}</td>
                  <td>
                    <span className={`badge-status ${
                      h.result === "phished" ? "bg-destructive/10 text-destructive" :
                      h.result === "reported" ? "bg-success/10 text-success" :
                      "bg-muted text-muted-foreground"
                    }`}>{h.result}</span>
                  </td>
                  <td className="text-muted-foreground">{h.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Completed Courses */}
        <div className="mt-6 bg-card border rounded-lg p-6">
          <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-success" />Completed Courses
          </h3>
          <div className="space-y-2">
            {userReport.completedCourses.map(c => (
              <div key={c.id} className="flex items-center justify-between py-2">
                <span className="text-sm font-medium">{c.title}</span>
                <span className="text-xs text-muted-foreground">Completed: {c.completedDate}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
