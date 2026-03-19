import { useState } from "react";
import { Plus, Upload, Copy, Trash2, Edit, Eye, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Template {
  id: string;
  name: string;
  category: string;
  subject: string;
  body: string;
  landingPage: string;
  createdAt: string;
  isCustom: boolean;
}

const defaultTemplates: Template[] = [
  { id: "1", name: "Password Reset Alert", category: "Credential Harvesting", subject: "Urgent: Your password will expire in 24 hours", body: "<p>Dear {{name}},</p><p>Your password is expiring. Click below to reset.</p><a href='{{phish_url}}'>Reset Password</a>", landingPage: "default", createdAt: "2026-03-01", isCustom: false },
  { id: "2", name: "IT Support Ticket", category: "Tech Support", subject: "Action Required: System Update #{{ticket_id}}", body: "<p>Hi {{name}},</p><p>Please approve the system update.</p><a href='{{phish_url}}'>Approve Update</a>", landingPage: "default", createdAt: "2026-03-05", isCustom: false },
  { id: "3", name: "Invoice Payment", category: "Financial", subject: "Invoice #INV-{{invoice_id}} - Payment Due", body: "<p>Dear {{name}},</p><p>Please review the attached invoice.</p><a href='{{phish_url}}'>View Invoice</a>", landingPage: "default", createdAt: "2026-03-10", isCustom: false },
  { id: "4", name: "HR Benefits Update", category: "HR", subject: "Important: Benefits Enrollment Deadline", body: "<p>Hi {{name}},</p><p>Open enrollment closes soon. Update your selections.</p><a href='{{phish_url}}'>Update Benefits</a>", landingPage: "default", createdAt: "2026-03-12", isCustom: true },
];

export default function Templates() {
  const [templates, setTemplates] = useState<Template[]>(defaultTemplates);
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [showPreview, setShowPreview] = useState<Template | null>(null);
  const [editTemplate, setEditTemplate] = useState<Template | null>(null);
  const [newTemplate, setNewTemplate] = useState({ name: "", category: "Credential Harvesting", subject: "", body: "", landingPage: "default", courseId: "" });
  const [importText, setImportText] = useState("");

  const filtered = templates.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = () => {
    const t: Template = {
      id: Date.now().toString(),
      ...newTemplate,
      createdAt: new Date().toISOString().split("T")[0],
      isCustom: true,
    };
    setTemplates([t, ...templates]);
    setNewTemplate({ name: "", category: "Credential Harvesting", subject: "", body: "", landingPage: "default", courseId: "" });
    setShowCreate(false);
  };

  const handleImport = () => {
    try {
      const imported = JSON.parse(importText);
      const arr = Array.isArray(imported) ? imported : [imported];
      const newTemplates = arr.map((t: any, i: number) => ({
        id: `imp-${Date.now()}-${i}`,
        name: t.name || `Imported Template ${i + 1}`,
        category: t.category || "Imported",
        subject: t.subject || "",
        body: t.body || t.html || "",
        landingPage: t.landingPage || "default",
        createdAt: new Date().toISOString().split("T")[0],
        isCustom: true,
      }));
      setTemplates([...newTemplates, ...templates]);
      setImportText("");
      setShowImport(false);
    } catch {
      alert("Invalid JSON format. Please check your template data.");
    }
  };

  const handleDelete = (id: string) => {
    setTemplates(templates.filter(t => t.id !== id));
  };

  const handleDuplicate = (t: Template) => {
    const dup = { ...t, id: Date.now().toString(), name: `${t.name} (Copy)`, isCustom: true };
    setTemplates([dup, ...templates]);
  };

  const handleSaveEdit = () => {
    if (!editTemplate) return;
    setTemplates(templates.map(t => t.id === editTemplate.id ? editTemplate : t));
    setEditTemplate(null);
  };

  const TemplateForm = ({ data, onChange, onSave, title }: any) => (
    <div className="space-y-4">
      <div>
        <Label>Template Name</Label>
        <Input value={data.name} onChange={e => onChange({ ...data, name: e.target.value })} placeholder="e.g., CEO Urgent Request" />
      </div>
      <div>
        <Label>Category</Label>
        <Select value={data.category} onValueChange={v => onChange({ ...data, category: v })}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="Credential Harvesting">Credential Harvesting</SelectItem>
            <SelectItem value="Tech Support">Tech Support</SelectItem>
            <SelectItem value="Financial">Financial</SelectItem>
            <SelectItem value="HR">HR</SelectItem>
            <SelectItem value="Social Engineering">Social Engineering</SelectItem>
            <SelectItem value="Custom">Custom</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Email Subject</Label>
        <Input value={data.subject} onChange={e => onChange({ ...data, subject: e.target.value })} placeholder="Subject line..." />
      </div>
      <div>
        <Label>Email Body (HTML)</Label>
        <Textarea value={data.body} onChange={e => onChange({ ...data, body: e.target.value })} rows={8} placeholder="<p>Dear {{name}},</p>..." className="font-mono text-xs" />
        <p className="text-xs text-muted-foreground mt-1">Variables: {"{{name}}, {{email}}, {{phish_url}}, {{company}}"}</p>
      </div>
      <div>
        <Label>Landing Page After Click</Label>
        <Select value={data.landingPage} onValueChange={v => onChange({ ...data, landingPage: v })}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default Awareness Page</SelectItem>
            <SelectItem value="credential">Credential Harvesting Page</SelectItem>
            <SelectItem value="download">Fake Download Page</SelectItem>
            <SelectItem value="custom">Custom Landing Page</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Link to Course (optional)</Label>
        <Select value={data.courseId || "none"} onValueChange={v => onChange({ ...data, courseId: v === "none" ? "" : v })}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="none">No course linked</SelectItem>
            <SelectItem value="phishing-101">Phishing Awareness 101</SelectItem>
            <SelectItem value="social-eng">Social Engineering Defense</SelectItem>
            <SelectItem value="password-sec">Password Security</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button onClick={onSave} className="w-full bg-primary text-primary-foreground">{title}</Button>
    </div>
  );

  return (
    <div className="animate-fade-in">
      <div className="page-header flex items-center justify-between">
        <div>
          <h1 className="page-title">Phishing Templates</h1>
          <p className="page-subtitle">Create and manage email templates for simulations</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={showImport} onOpenChange={setShowImport}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2"><Upload className="w-4 h-4" />Import</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Import Templates</DialogTitle></DialogHeader>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Paste JSON template data below. Supports single or array of templates.</p>
                <Textarea value={importText} onChange={e => setImportText(e.target.value)} rows={10} placeholder='[{"name": "...", "subject": "...", "body": "..."}]' className="font-mono text-xs" />
                <Button onClick={handleImport} className="w-full bg-primary text-primary-foreground">Import Templates</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={showCreate} onOpenChange={setShowCreate}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-primary text-primary-foreground"><Plus className="w-4 h-4" />Create Template</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader><DialogTitle>Create Template</DialogTitle></DialogHeader>
              <TemplateForm data={newTemplate} onChange={setNewTemplate} onSave={handleCreate} title="Create Template" />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search templates..." className="pl-10" />
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((t) => (
          <div key={t.id} className="bg-card border rounded-lg p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-display font-semibold text-sm">{t.name}</h3>
                <span className="badge-status bg-secondary/20 text-secondary-foreground mt-1">{t.category}</span>
              </div>
              {t.isCustom && <span className="badge-status bg-accent/20 text-accent-foreground">Custom</span>}
            </div>
            <p className="text-xs text-muted-foreground mb-1"><strong>Subject:</strong> {t.subject}</p>
            <p className="text-xs text-muted-foreground mb-4">Created: {t.createdAt}</p>
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" onClick={() => setShowPreview(t)}><Eye className="w-4 h-4" /></Button>
              <Button variant="ghost" size="sm" onClick={() => setEditTemplate({ ...t })}><Edit className="w-4 h-4" /></Button>
              <Button variant="ghost" size="sm" onClick={() => handleDuplicate(t)}><Copy className="w-4 h-4" /></Button>
              <Button variant="ghost" size="sm" onClick={() => handleDelete(t.id)} className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Dialog */}
      <Dialog open={!!showPreview} onOpenChange={() => setShowPreview(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Preview: {showPreview?.name}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div className="bg-muted rounded p-3">
              <p className="text-xs text-muted-foreground">Subject</p>
              <p className="font-medium text-sm">{showPreview?.subject}</p>
            </div>
            <div className="border rounded p-4">
              <div dangerouslySetInnerHTML={{ __html: showPreview?.body || "" }} className="text-sm" />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editTemplate} onOpenChange={() => setEditTemplate(null)}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Edit Template</DialogTitle></DialogHeader>
          {editTemplate && <TemplateForm data={editTemplate} onChange={setEditTemplate} onSave={handleSaveEdit} title="Save Changes" />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
