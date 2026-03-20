import { useState } from "react";
import {
  FileText, Download, Filter, Users, ShieldAlert, GraduationCap,
  Clock, MousePointerClick, CheckCircle, XCircle, TrendingUp, Eye,
  Trash2, MailOpen, MailX
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend
} from "recharts";

// Mock data
const phishedUsers = [
  { id: 1, name: "John Smith", email: "john.smith@company.com", department: "Finance", campaign: "Q1 Finance Phish", clickedAt: "2026-03-15 09:23", credentialsEntered: true, reportedPhish: false },
  { id: 2, name: "Sarah Johnson", email: "sarah.j@company.com", department: "HR", campaign: "IT Support Scam", clickedAt: "2026-03-14 14:05", credentialsEntered: false, reportedPhish: true },
  { id: 3, name: "Mike Chen", email: "mike.chen@company.com", department: "Engineering", campaign: "Password Reset Trap", clickedAt: "2026-03-12 11:45", credentialsEntered: true, reportedPhish: false },
  { id: 4, name: "Emily Davis", email: "emily.d@company.com", department: "Marketing", campaign: "CEO Impersonation", clickedAt: "2026-03-10 16:30", credentialsEntered: true, reportedPhish: false },
  { id: 5, name: "Robert Wilson", email: "r.wilson@company.com", department: "Sales", campaign: "Q1 Finance Phish", clickedAt: "2026-03-15 10:12", credentialsEntered: false, reportedPhish: false },
  { id: 6, name: "Lisa Brown", email: "lisa.b@company.com", department: "Finance", campaign: "IT Support Scam", clickedAt: "2026-03-14 15:22", credentialsEntered: true, reportedPhish: false },
];

const trainingCompleted = [
  { id: 1, name: "Anna Taylor", email: "anna.t@company.com", department: "HR", course: "Phishing Fundamentals", completedAt: "2026-03-16", score: 92 },
  { id: 2, name: "David Lee", email: "david.l@company.com", department: "Engineering", course: "Social Engineering 101", completedAt: "2026-03-15", score: 88 },
  { id: 3, name: "Rachel Green", email: "rachel.g@company.com", department: "Marketing", course: "Email Security", completedAt: "2026-03-14", score: 95 },
  { id: 4, name: "Tom Hardy", email: "tom.h@company.com", department: "Sales", course: "Phishing Fundamentals", completedAt: "2026-03-13", score: 78 },
  { id: 5, name: "Susan Clark", email: "susan.c@company.com", department: "Finance", course: "Data Protection", completedAt: "2026-03-12", score: 85 },
];

const pendingTraining = [
  { id: 1, name: "Kevin Martin", email: "kevin.m@company.com", department: "IT", course: "Phishing Fundamentals", assignedAt: "2026-03-10", dueDate: "2026-03-25", progress: 45 },
  { id: 2, name: "Nancy White", email: "nancy.w@company.com", department: "Finance", course: "Social Engineering 101", assignedAt: "2026-03-08", dueDate: "2026-03-22", progress: 20 },
  { id: 3, name: "Paul Adams", email: "paul.a@company.com", department: "HR", course: "Email Security", assignedAt: "2026-03-05", dueDate: "2026-03-20", progress: 0 },
  { id: 4, name: "Maria Garcia", email: "maria.g@company.com", department: "Sales", course: "Data Protection", assignedAt: "2026-03-12", dueDate: "2026-03-28", progress: 60 },
  { id: 5, name: "James Brown", email: "james.b@company.com", department: "Engineering", course: "Phishing Fundamentals", assignedAt: "2026-03-11", dueDate: "2026-03-26", progress: 10 },
];

const noClickUsers = [
  { id: 1, name: "Chris Evans", email: "chris.e@company.com", department: "Engineering", campaignsSent: 8, lastCampaign: "2026-03-15", status: "Safe" },
  { id: 2, name: "Jennifer Lopez", email: "jennifer.l@company.com", department: "Marketing", campaignsSent: 6, lastCampaign: "2026-03-14", status: "Safe" },
  { id: 3, name: "Andrew Scott", email: "andrew.s@company.com", department: "IT", campaignsSent: 10, lastCampaign: "2026-03-15", status: "Champion" },
  { id: 4, name: "Diana Prince", email: "diana.p@company.com", department: "Legal", campaignsSent: 5, lastCampaign: "2026-03-12", status: "Safe" },
  { id: 5, name: "Bruce Wayne", email: "bruce.w@company.com", department: "Executive", campaignsSent: 12, lastCampaign: "2026-03-15", status: "Champion" },
];

const departmentRiskData = [
  { department: "Finance", phished: 12, safe: 28, risk: 30 },
  { department: "HR", phished: 5, safe: 15, risk: 25 },
  { department: "Engineering", phished: 8, safe: 42, risk: 16 },
  { department: "Marketing", phished: 6, safe: 14, risk: 30 },
  { department: "Sales", phished: 9, safe: 21, risk: 30 },
  { department: "IT", phished: 2, safe: 18, risk: 10 },
];

const trendData = [
  { month: "Oct", phishRate: 35, trainingRate: 40, reportRate: 15 },
  { month: "Nov", phishRate: 30, trainingRate: 52, reportRate: 20 },
  { month: "Dec", phishRate: 28, trainingRate: 58, reportRate: 25 },
  { month: "Jan", phishRate: 25, trainingRate: 65, reportRate: 30 },
  { month: "Feb", phishRate: 22, trainingRate: 72, reportRate: 35 },
  { month: "Mar", phishRate: 18, trainingRate: 78, reportRate: 42 },
];

const pieColors = [
  "hsl(0, 72%, 51%)",
  "hsl(142, 71%, 45%)",
  "hsl(43, 72%, 50%)",
  "hsl(220, 60%, 22%)",
];

const overviewPie = [
  { name: "Phished", value: 42 },
  { name: "Safe (No Click)", value: 156 },
  { name: "Pending Training", value: 38 },
  { name: "Training Done", value: 112 },
];

export default function Reports() {
  const [dateRange, setDateRange] = useState("last30");
  const [department, setDepartment] = useState("all");
  const [search, setSearch] = useState("");

  const filterBySearch = <T extends { name: string; email: string }>(data: T[]) =>
    data.filter(
      (d) =>
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.email.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="animate-fade-in">
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title flex items-center gap-2">
            <FileText className="w-6 h-6 text-primary" />
            Reports
          </h1>
          <p className="page-subtitle">Generate and export comprehensive security awareness reports</p>
        </div>
        <Button className="gap-2 self-start">
          <Download className="w-4 h-4" />
          Export All Reports
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">Filters:</span>
        </div>
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[160px] h-9 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last7">Last 7 days</SelectItem>
            <SelectItem value="last30">Last 30 days</SelectItem>
            <SelectItem value="last90">Last 90 days</SelectItem>
            <SelectItem value="all">All time</SelectItem>
          </SelectContent>
        </Select>
        <Select value={department} onValueChange={setDepartment}>
          <SelectTrigger className="w-[160px] h-9 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
            <SelectItem value="hr">HR</SelectItem>
            <SelectItem value="engineering">Engineering</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
            <SelectItem value="sales">Sales</SelectItem>
            <SelectItem value="it">IT</SelectItem>
          </SelectContent>
        </Select>
        <Input
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-[240px] h-9 text-sm"
        />
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="stat-card flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
            <ShieldAlert className="w-5 h-5 text-destructive" />
          </div>
          <div>
            <div className="text-2xl font-display font-bold">42</div>
            <div className="text-xs text-muted-foreground">Users Phished</div>
          </div>
        </div>
        <div className="stat-card flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-success" />
          </div>
          <div>
            <div className="text-2xl font-display font-bold">112</div>
            <div className="text-xs text-muted-foreground">Training Completed</div>
          </div>
        </div>
        <div className="stat-card flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
            <Clock className="w-5 h-5 text-warning" />
          </div>
          <div>
            <div className="text-2xl font-display font-bold">38</div>
            <div className="text-xs text-muted-foreground">Pending Training</div>
          </div>
        </div>
        <div className="stat-card flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <MousePointerClick className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="text-2xl font-display font-bold">156</div>
            <div className="text-xs text-muted-foreground">Didn't Click</div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-card rounded-lg border p-6">
          <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            Security Awareness Trend
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 87%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} unit="%" />
              <Tooltip formatter={(value: number) => `${value}%`} />
              <Legend />
              <Line type="monotone" dataKey="phishRate" name="Phish Rate" stroke="hsl(0, 72%, 51%)" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="trainingRate" name="Training Complete" stroke="hsl(142, 71%, 45%)" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="reportRate" name="Report Rate" stroke="hsl(43, 72%, 50%)" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-card rounded-lg border p-6">
          <h3 className="font-display font-semibold mb-4">User Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={overviewPie} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" paddingAngle={3}>
                {overviewPie.map((_, i) => (
                  <Cell key={i} fill={pieColors[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {overviewPie.map((d, i) => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: pieColors[i] }} />
                {d.name} ({d.value})
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Department Risk Chart */}
      <div className="bg-card rounded-lg border p-6 mb-6">
        <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
          <Users className="w-4 h-4 text-primary" />
          Department Risk Analysis
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={departmentRiskData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 87%)" />
            <XAxis dataKey="department" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="phished" name="Phished" fill="hsl(0, 72%, 51%)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="safe" name="Safe" fill="hsl(142, 71%, 45%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tabs for detailed tables */}
      <Tabs defaultValue="phished" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="phished" className="gap-1.5 text-xs sm:text-sm">
            <ShieldAlert className="w-3.5 h-3.5 hidden sm:block" />
            Phished Users
          </TabsTrigger>
          <TabsTrigger value="completed" className="gap-1.5 text-xs sm:text-sm">
            <CheckCircle className="w-3.5 h-3.5 hidden sm:block" />
            Training Done
          </TabsTrigger>
          <TabsTrigger value="pending" className="gap-1.5 text-xs sm:text-sm">
            <Clock className="w-3.5 h-3.5 hidden sm:block" />
            Pending Training
          </TabsTrigger>
          <TabsTrigger value="noclicks" className="gap-1.5 text-xs sm:text-sm">
            <XCircle className="w-3.5 h-3.5 hidden sm:block" />
            Didn't Click
          </TabsTrigger>
        </TabsList>

        {/* Phished Users */}
        <TabsContent value="phished">
          <div className="bg-card rounded-lg border">
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <h3 className="font-display font-semibold text-sm">Successfully Phished Users</h3>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Download className="w-3.5 h-3.5" />
                Export CSV
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Department</th>
                    <th>Campaign</th>
                    <th>Clicked At</th>
                    <th>Credentials</th>
                    <th>Reported</th>
                  </tr>
                </thead>
                <tbody>
                  {filterBySearch(phishedUsers).map((u) => (
                    <tr key={u.id}>
                      <td>
                        <div className="font-medium">{u.name}</div>
                        <div className="text-xs text-muted-foreground">{u.email}</div>
                      </td>
                      <td>{u.department}</td>
                      <td>{u.campaign}</td>
                      <td className="text-muted-foreground text-xs">{u.clickedAt}</td>
                      <td>
                        {u.credentialsEntered ? (
                          <Badge variant="destructive" className="text-xs">Entered</Badge>
                        ) : (
                          <Badge variant="secondary" className="text-xs">No</Badge>
                        )}
                      </td>
                      <td>
                        {u.reportedPhish ? (
                          <Badge className="bg-success/10 text-success border-0 text-xs">Yes</Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs">No</Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* Training Completed */}
        <TabsContent value="completed">
          <div className="bg-card rounded-lg border">
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <h3 className="font-display font-semibold text-sm">Training Completed</h3>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Download className="w-3.5 h-3.5" />
                Export CSV
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Department</th>
                    <th>Course</th>
                    <th>Completed</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {filterBySearch(trainingCompleted).map((u) => (
                    <tr key={u.id}>
                      <td>
                        <div className="font-medium">{u.name}</div>
                        <div className="text-xs text-muted-foreground">{u.email}</div>
                      </td>
                      <td>{u.department}</td>
                      <td>{u.course}</td>
                      <td className="text-muted-foreground">{u.completedAt}</td>
                      <td>
                        <Badge className={`text-xs border-0 ${u.score >= 90 ? "bg-success/10 text-success" : u.score >= 75 ? "bg-warning/10 text-warning" : "bg-destructive/10 text-destructive"}`}>
                          {u.score}%
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* Pending Training */}
        <TabsContent value="pending">
          <div className="bg-card rounded-lg border">
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <h3 className="font-display font-semibold text-sm">Pending Training</h3>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Download className="w-3.5 h-3.5" />
                Export CSV
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Department</th>
                    <th>Course</th>
                    <th>Due Date</th>
                    <th>Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {filterBySearch(pendingTraining).map((u) => (
                    <tr key={u.id}>
                      <td>
                        <div className="font-medium">{u.name}</div>
                        <div className="text-xs text-muted-foreground">{u.email}</div>
                      </td>
                      <td>{u.department}</td>
                      <td>{u.course}</td>
                      <td>
                        <span className={`text-sm ${new Date(u.dueDate) < new Date() ? "text-destructive font-medium" : "text-muted-foreground"}`}>
                          {u.dueDate}
                        </span>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 rounded-full bg-muted overflow-hidden">
                            <div
                              className={`h-full rounded-full ${u.progress >= 50 ? "bg-success" : u.progress > 0 ? "bg-warning" : "bg-destructive"}`}
                              style={{ width: `${u.progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">{u.progress}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* Users Who Didn't Click */}
        <TabsContent value="noclicks">
          <div className="bg-card rounded-lg border">
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <h3 className="font-display font-semibold text-sm">Users Who Didn't Click</h3>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Download className="w-3.5 h-3.5" />
                Export CSV
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Department</th>
                    <th>Campaigns Received</th>
                    <th>Last Campaign</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filterBySearch(noClickUsers).map((u) => (
                    <tr key={u.id}>
                      <td>
                        <div className="font-medium">{u.name}</div>
                        <div className="text-xs text-muted-foreground">{u.email}</div>
                      </td>
                      <td>{u.department}</td>
                      <td className="text-center">{u.campaignsSent}</td>
                      <td className="text-muted-foreground">{u.lastCampaign}</td>
                      <td>
                        <Badge className={`text-xs border-0 ${u.status === "Champion" ? "bg-success/10 text-success" : "bg-primary/10 text-primary"}`}>
                          {u.status === "Champion" ? "🏆 " : "✅ "}{u.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
