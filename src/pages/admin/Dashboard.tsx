import { Shield, Users, Mail, AlertTriangle, TrendingUp, CheckCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const stats = [
  { label: "Active Campaigns", value: "12", icon: Mail, color: "text-primary" },
  { label: "Total Users", value: "1,248", icon: Users, color: "text-secondary" },
  { label: "Phish Rate", value: "23%", icon: AlertTriangle, color: "text-destructive" },
  { label: "Courses Completed", value: "847", icon: CheckCircle, color: "text-success" },
  { label: "Awareness Score", value: "76%", icon: TrendingUp, color: "text-primary" },
  { label: "Templates", value: "34", icon: Shield, color: "text-secondary" },
];

const campaignData = [
  { month: "Jan", sent: 400, clicked: 92, reported: 45 },
  { month: "Feb", sent: 350, clicked: 78, reported: 52 },
  { month: "Mar", sent: 520, clicked: 110, reported: 68 },
  { month: "Apr", sent: 480, clicked: 85, reported: 72 },
  { month: "May", sent: 600, clicked: 130, reported: 90 },
  { month: "Jun", sent: 550, clicked: 95, reported: 88 },
];

const pieData = [
  { name: "Clicked", value: 23, color: "hsl(0, 72%, 51%)" },
  { name: "Reported", value: 35, color: "hsl(142, 71%, 45%)" },
  { name: "Ignored", value: 42, color: "hsl(220, 14%, 80%)" },
];

const recentCampaigns = [
  { name: "Q1 Finance Phish", status: "Completed", sent: 450, clicked: 67, date: "2026-03-15" },
  { name: "IT Support Scam", status: "Active", sent: 320, clicked: 42, date: "2026-03-18" },
  { name: "CEO Impersonation", status: "Scheduled", sent: 0, clicked: 0, date: "2026-03-25" },
  { name: "Password Reset Trap", status: "Completed", sent: 280, clicked: 35, date: "2026-03-10" },
];

export default function Dashboard() {
  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Overview of phishing simulation & awareness training</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card">
            <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
            <div className="text-2xl font-display font-bold">{stat.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-card rounded-lg border p-6">
          <h3 className="font-display font-semibold mb-4">Campaign Performance</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={campaignData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 87%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="sent" fill="hsl(220, 60%, 22%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="clicked" fill="hsl(0, 72%, 51%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="reported" fill="hsl(142, 71%, 45%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-lg border p-6">
          <h3 className="font-display font-semibold mb-4">User Response</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value" paddingAngle={4}>
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">
            {pieData.map((d) => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                {d.name} ({d.value}%)
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Campaigns Table */}
      <div className="bg-card rounded-lg border">
        <div className="px-6 py-4 border-b">
          <h3 className="font-display font-semibold">Recent Campaigns</h3>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Campaign</th>
              <th>Status</th>
              <th>Sent</th>
              <th>Clicked</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {recentCampaigns.map((c) => (
              <tr key={c.name}>
                <td className="font-medium">{c.name}</td>
                <td>
                  <span className={`badge-status ${
                    c.status === "Active" ? "bg-success/10 text-success" :
                    c.status === "Completed" ? "bg-primary/10 text-primary" :
                    "bg-warning/10 text-warning"
                  }`}>
                    {c.status}
                  </span>
                </td>
                <td>{c.sent}</td>
                <td>{c.clicked}</td>
                <td className="text-muted-foreground">{c.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
