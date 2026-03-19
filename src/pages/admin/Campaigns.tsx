import { useState } from "react";
import { Plus, Play, Pause, Trash2, Calendar, Users, Building2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Campaign {
  id: string;
  name: string;
  template: string;
  targetType: "user" | "group" | "department";
  targets: string;
  status: "scheduled" | "active" | "paused" | "completed";
  scheduledDate: string;
  sent: number;
  clicked: number;
  reported: number;
}

const defaultCampaigns: Campaign[] = [
  { id: "1", name: "Q1 Security Test - Finance", template: "Password Reset Alert", targetType: "department", targets: "Finance", status: "completed", scheduledDate: "2026-03-01", sent: 45, clicked: 8, reported: 12 },
  { id: "2", name: "IT Phish Test - All Staff", template: "IT Support Ticket", targetType: "group", targets: "All Employees", status: "active", scheduledDate: "2026-03-18", sent: 320, clicked: 42, reported: 55 },
  { id: "3", name: "Executive Awareness", template: "CEO Impersonation", targetType: "group", targets: "C-Suite", status: "scheduled", scheduledDate: "2026-03-25", sent: 0, clicked: 0, reported: 0 },
];

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(defaultCampaigns);
  const [showCreate, setShowCreate] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: "", template: "Password Reset Alert", targetType: "user" as const,
    targets: "", scheduledDate: "", emails: "",
  });

  const handleCreate = () => {
    const c: Campaign = {
      id: Date.now().toString(),
      name: newCampaign.name,
      template: newCampaign.template,
      targetType: newCampaign.targetType,
      targets: newCampaign.targets || newCampaign.emails,
      status: "scheduled",
      scheduledDate: newCampaign.scheduledDate,
      sent: 0, clicked: 0, reported: 0,
    };
    setCampaigns([c, ...campaigns]);
    setShowCreate(false);
    setNewCampaign({ name: "", template: "Password Reset Alert", targetType: "user", targets: "", scheduledDate: "", emails: "" });
  };

  const toggleStatus = (id: string) => {
    setCampaigns(campaigns.map(c => {
      if (c.id !== id) return c;
      if (c.status === "active") return { ...c, status: "paused" as const };
      if (c.status === "paused" || c.status === "scheduled") return { ...c, status: "active" as const };
      return c;
    }));
  };

  const deleteCampaign = (id: string) => setCampaigns(campaigns.filter(c => c.id !== id));

  const statusColors: Record<string, string> = {
    active: "bg-success/10 text-success",
    scheduled: "bg-warning/10 text-warning",
    paused: "bg-muted text-muted-foreground",
    completed: "bg-primary/10 text-primary",
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header flex items-center justify-between">
        <div>
          <h1 className="page-title">Phishing Campaigns</h1>
          <p className="page-subtitle">Schedule and manage phishing simulations</p>
        </div>
        <Dialog open={showCreate} onOpenChange={setShowCreate}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-primary text-primary-foreground"><Plus className="w-4 h-4" />New Campaign</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>Create Campaign</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Campaign Name</Label>
                <Input value={newCampaign.name} onChange={e => setNewCampaign({ ...newCampaign, name: e.target.value })} placeholder="e.g., Q2 Finance Phish Test" />
              </div>
              <div>
                <Label>Template</Label>
                <Select value={newCampaign.template} onValueChange={v => setNewCampaign({ ...newCampaign, template: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Password Reset Alert">Password Reset Alert</SelectItem>
                    <SelectItem value="IT Support Ticket">IT Support Ticket</SelectItem>
                    <SelectItem value="Invoice Payment">Invoice Payment</SelectItem>
                    <SelectItem value="HR Benefits Update">HR Benefits Update</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Target Type</Label>
                <Tabs value={newCampaign.targetType} onValueChange={v => setNewCampaign({ ...newCampaign, targetType: v as any })}>
                  <TabsList className="w-full">
                    <TabsTrigger value="user" className="flex-1 gap-1"><User className="w-3 h-3" />User</TabsTrigger>
                    <TabsTrigger value="group" className="flex-1 gap-1"><Users className="w-3 h-3" />Group</TabsTrigger>
                    <TabsTrigger value="department" className="flex-1 gap-1"><Building2 className="w-3 h-3" />Department</TabsTrigger>
                  </TabsList>
                  <TabsContent value="user" className="mt-3">
                    <Label>Email Addresses (one per line)</Label>
                    <Textarea value={newCampaign.emails} onChange={e => setNewCampaign({ ...newCampaign, emails: e.target.value })} rows={4} placeholder="john@company.com&#10;jane@company.com" />
                  </TabsContent>
                  <TabsContent value="group" className="mt-3">
                    <Label>Select Group</Label>
                    <Select value={newCampaign.targets} onValueChange={v => setNewCampaign({ ...newCampaign, targets: v })}>
                      <SelectTrigger><SelectValue placeholder="Choose group" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All Employees">All Employees</SelectItem>
                        <SelectItem value="C-Suite">C-Suite</SelectItem>
                        <SelectItem value="New Hires">New Hires</SelectItem>
                        <SelectItem value="High Risk">High Risk Users</SelectItem>
                      </SelectContent>
                    </Select>
                  </TabsContent>
                  <TabsContent value="department" className="mt-3">
                    <Label>Select Department</Label>
                    <Select value={newCampaign.targets} onValueChange={v => setNewCampaign({ ...newCampaign, targets: v })}>
                      <SelectTrigger><SelectValue placeholder="Choose department" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Finance">Finance</SelectItem>
                        <SelectItem value="HR">Human Resources</SelectItem>
                        <SelectItem value="IT">IT</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Operations">Operations</SelectItem>
                      </SelectContent>
                    </Select>
                  </TabsContent>
                </Tabs>
              </div>
              <div>
                <Label>Schedule Date & Time</Label>
                <Input type="datetime-local" value={newCampaign.scheduledDate} onChange={e => setNewCampaign({ ...newCampaign, scheduledDate: e.target.value })} />
              </div>
              <Button onClick={handleCreate} className="w-full bg-primary text-primary-foreground">Schedule Campaign</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card rounded-lg border">
        <table className="data-table">
          <thead>
            <tr>
              <th>Campaign</th>
              <th>Template</th>
              <th>Target</th>
              <th>Status</th>
              <th>Sent</th>
              <th>Clicked</th>
              <th>Reported</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map(c => (
              <tr key={c.id}>
                <td className="font-medium">{c.name}</td>
                <td className="text-muted-foreground">{c.template}</td>
                <td>
                  <span className="flex items-center gap-1 text-xs">
                    {c.targetType === "user" ? <User className="w-3 h-3" /> : c.targetType === "group" ? <Users className="w-3 h-3" /> : <Building2 className="w-3 h-3" />}
                    {c.targets}
                  </span>
                </td>
                <td><span className={`badge-status ${statusColors[c.status]}`}>{c.status}</span></td>
                <td>{c.sent}</td>
                <td className="text-destructive font-medium">{c.clicked}</td>
                <td className="text-success font-medium">{c.reported}</td>
                <td className="text-muted-foreground">{c.scheduledDate}</td>
                <td>
                  <div className="flex gap-1">
                    {c.status !== "completed" && (
                      <Button variant="ghost" size="sm" onClick={() => toggleStatus(c.id)}>
                        {c.status === "active" ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" onClick={() => deleteCampaign(c.id)} className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
