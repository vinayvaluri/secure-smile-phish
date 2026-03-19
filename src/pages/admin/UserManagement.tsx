import { useState } from "react";
import { Plus, Upload, Trash2, Mail, Key, Search, Download, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface AppUser {
  id: string;
  name: string;
  email: string;
  department: string;
  group: string;
  status: "active" | "invited" | "disabled";
  lastLogin: string;
  phishRate: number;
  coursesCompleted: number;
}

const defaultUsers: AppUser[] = [
  { id: "1", name: "Rajesh Kumar", email: "rajesh@vishwasamudra.com", department: "Finance", group: "All Employees", status: "active", lastLogin: "2026-03-18", phishRate: 15, coursesCompleted: 3 },
  { id: "2", name: "Priya Sharma", email: "priya@vishwasamudra.com", department: "HR", group: "All Employees", status: "active", lastLogin: "2026-03-17", phishRate: 8, coursesCompleted: 5 },
  { id: "3", name: "Amit Patel", email: "amit@vishwasamudra.com", department: "IT", group: "High Risk", status: "active", lastLogin: "2026-03-16", phishRate: 32, coursesCompleted: 1 },
  { id: "4", name: "Sneha Reddy", email: "sneha@vishwasamudra.com", department: "Marketing", group: "New Hires", status: "invited", lastLogin: "-", phishRate: 0, coursesCompleted: 0 },
  { id: "5", name: "Vikram Singh", email: "vikram@vishwasamudra.com", department: "Operations", group: "C-Suite", status: "active", lastLogin: "2026-03-15", phishRate: 5, coursesCompleted: 4 },
];

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

export default function UserManagement() {
  const [users, setUsers] = useState<AppUser[]>(defaultUsers);
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [showBulkImport, setShowBulkImport] = useState(false);
  const [showBulkInvite, setShowBulkInvite] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState<AppUser | null>(null);
  const [newUser, setNewUser] = useState({ name: "", email: "", department: "IT", group: "All Employees", password: "", sendInvite: false });
  const [bulkCsv, setBulkCsv] = useState("");
  const [bulkInviteEmails, setBulkInviteEmails] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.department.toLowerCase().includes(search.toLowerCase())
  );

  const validatePassword = (pw: string) => {
    if (!PASSWORD_REGEX.test(pw)) {
      return "Password must be at least 8 characters with uppercase, lowercase, number, and special character.";
    }
    return "";
  };

  const handleCreate = () => {
    if (!newUser.sendInvite) {
      const err = validatePassword(newUser.password);
      if (err) { setPasswordError(err); return; }
    }
    const u: AppUser = {
      id: Date.now().toString(), name: newUser.name, email: newUser.email,
      department: newUser.department, group: newUser.group,
      status: newUser.sendInvite ? "invited" : "active",
      lastLogin: "-", phishRate: 0, coursesCompleted: 0,
    };
    setUsers([u, ...users]);
    setNewUser({ name: "", email: "", department: "IT", group: "All Employees", password: "", sendInvite: false });
    setPasswordError("");
    setShowCreate(false);
  };

  const handleBulkImport = () => {
    const lines = bulkCsv.trim().split("\n").filter(l => l.trim());
    const newUsers = lines.map((line, i) => {
      const [name, email, department, group] = line.split(",").map(s => s.trim());
      return {
        id: `bulk-${Date.now()}-${i}`, name: name || `User ${i + 1}`,
        email: email || "", department: department || "General", group: group || "All Employees",
        status: "active" as const, lastLogin: "-", phishRate: 0, coursesCompleted: 0,
      };
    });
    setUsers([...newUsers, ...users]);
    setBulkCsv("");
    setShowBulkImport(false);
  };

  const handleBulkInvite = () => {
    const emails = bulkInviteEmails.split("\n").map(e => e.trim()).filter(Boolean);
    const newUsers = emails.map((email, i) => ({
      id: `inv-${Date.now()}-${i}`, name: email.split("@")[0],
      email, department: "General", group: "All Employees",
      status: "invited" as const, lastLogin: "-", phishRate: 0, coursesCompleted: 0,
    }));
    setUsers([...newUsers, ...users]);
    setBulkInviteEmails("");
    setShowBulkInvite(false);
  };

  const handleResetPassword = () => {
    const err = validatePassword(newPassword);
    if (err) { setPasswordError(err); return; }
    setShowResetPassword(null);
    setNewPassword("");
    setPasswordError("");
  };

  const handleDelete = (id: string) => setUsers(users.filter(u => u.id !== id));

  const handleInvite = (user: AppUser) => {
    setUsers(users.map(u => u.id === user.id ? { ...u, status: "invited" as const } : u));
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="page-title">User Management</h1>
          <p className="page-subtitle">Manage users, groups, and departments</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Dialog open={showBulkInvite} onOpenChange={setShowBulkInvite}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2"><Send className="w-4 h-4" />Bulk Invite</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Bulk Invite Users</DialogTitle></DialogHeader>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Enter email addresses (one per line). Users will receive an invitation to create their password.</p>
                <Textarea value={bulkInviteEmails} onChange={e => setBulkInviteEmails(e.target.value)} rows={8} placeholder="user1@company.com&#10;user2@company.com" />
                <Button onClick={handleBulkInvite} className="w-full bg-primary text-primary-foreground">Send Invitations</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={showBulkImport} onOpenChange={setShowBulkImport}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2"><Upload className="w-4 h-4" />Bulk Import</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Bulk Import Users</DialogTitle></DialogHeader>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Paste CSV data: Name, Email, Department, Group (one per line)</p>
                <Textarea value={bulkCsv} onChange={e => setBulkCsv(e.target.value)} rows={8} placeholder="John Doe, john@company.com, Finance, All Employees&#10;Jane Smith, jane@company.com, HR, New Hires" className="font-mono text-xs" />
                <Button onClick={handleBulkImport} className="w-full bg-primary text-primary-foreground">Import Users</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={showCreate} onOpenChange={setShowCreate}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-primary text-primary-foreground"><Plus className="w-4 h-4" />Create User</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Create Local User</DialogTitle></DialogHeader>
              <div className="space-y-4">
                <div><Label>Full Name</Label><Input value={newUser.name} onChange={e => setNewUser({ ...newUser, name: e.target.value })} /></div>
                <div><Label>Email</Label><Input type="email" value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} /></div>
                <div>
                  <Label>Department</Label>
                  <Select value={newUser.department} onValueChange={v => setNewUser({ ...newUser, department: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IT">IT</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="HR">Human Resources</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Operations">Operations</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Group</Label>
                  <Select value={newUser.group} onValueChange={v => setNewUser({ ...newUser, group: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Employees">All Employees</SelectItem>
                      <SelectItem value="C-Suite">C-Suite</SelectItem>
                      <SelectItem value="New Hires">New Hires</SelectItem>
                      <SelectItem value="High Risk">High Risk</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="sendInvite" checked={newUser.sendInvite} onChange={e => setNewUser({ ...newUser, sendInvite: e.target.checked })} className="rounded" />
                  <Label htmlFor="sendInvite" className="text-sm">Send invite email (user creates own password)</Label>
                </div>
                {!newUser.sendInvite && (
                  <div>
                    <Label>Password</Label>
                    <Input type="password" value={newUser.password} onChange={e => { setNewUser({ ...newUser, password: e.target.value }); setPasswordError(""); }} />
                    <p className="text-xs text-muted-foreground mt-1">Min 8 chars, uppercase, lowercase, number, special char</p>
                    {passwordError && <p className="text-xs text-destructive mt-1">{passwordError}</p>}
                  </div>
                )}
                <Button onClick={handleCreate} className="w-full bg-primary text-primary-foreground">
                  {newUser.sendInvite ? "Create & Send Invite" : "Create User"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..." className="pl-10" />
      </div>

      <div className="bg-card rounded-lg border overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Group</th>
              <th>Status</th>
              <th>Phish Rate</th>
              <th>Courses</th>
              <th>Last Login</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.id}>
                <td className="font-medium">{u.name}</td>
                <td className="text-muted-foreground">{u.email}</td>
                <td>{u.department}</td>
                <td>{u.group}</td>
                <td>
                  <span className={`badge-status ${
                    u.status === "active" ? "bg-success/10 text-success" :
                    u.status === "invited" ? "bg-warning/10 text-warning" :
                    "bg-muted text-muted-foreground"
                  }`}>{u.status}</span>
                </td>
                <td className={u.phishRate > 20 ? "text-destructive font-medium" : "text-success font-medium"}>{u.phishRate}%</td>
                <td>{u.coursesCompleted}</td>
                <td className="text-muted-foreground">{u.lastLogin}</td>
                <td>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={() => { setShowResetPassword(u); setNewPassword(""); setPasswordError(""); }} title="Reset Password"><Key className="w-4 h-4" /></Button>
                    {u.status !== "active" && <Button variant="ghost" size="sm" onClick={() => handleInvite(u)} title="Send Invite"><Mail className="w-4 h-4" /></Button>}
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(u.id)} className="text-destructive" title="Delete"><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Reset Password Dialog */}
      <Dialog open={!!showResetPassword} onOpenChange={() => setShowResetPassword(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Reset Password: {showResetPassword?.name}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>New Password</Label>
              <Input type="password" value={newPassword} onChange={e => { setNewPassword(e.target.value); setPasswordError(""); }} />
              <p className="text-xs text-muted-foreground mt-1">Min 8 chars, uppercase, lowercase, number, special char</p>
              {passwordError && <p className="text-xs text-destructive mt-1">{passwordError}</p>}
            </div>
            <Button onClick={handleResetPassword} className="w-full bg-primary text-primary-foreground">Reset Password</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
