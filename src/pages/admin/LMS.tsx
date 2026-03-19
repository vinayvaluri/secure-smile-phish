import { useState } from "react";
import { Plus, Upload, Trash2, Edit, Eye, GraduationCap, Clock, Users, Subtitles, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

interface Subtitle {
  language: string;
  label: string;
  content: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  videoUrl: string;
  duration: string;
  subtitles: Subtitle[];
  completionDeadlineDays: number;
  reminderEnabled: boolean;
  reminderDaysBefore: number;
  assignedUsers: number;
  completedUsers: number;
  createdAt: string;
}

const defaultCourses: Course[] = [
  {
    id: "phishing-101", title: "Phishing Awareness 101", description: "Learn to identify common phishing attacks and protect yourself.",
    category: "Phishing", videoUrl: "", duration: "15 min", subtitles: [
      { language: "en", label: "English", content: "00:00:00,000 --> 00:00:05,000\nWelcome to Phishing Awareness 101" },
      { language: "hi", label: "Hindi", content: "00:00:00,000 --> 00:00:05,000\nफ़िशिंग जागरूकता 101 में आपका स्वागत है" },
    ],
    completionDeadlineDays: 7, reminderEnabled: true, reminderDaysBefore: 2, assignedUsers: 248, completedUsers: 189, createdAt: "2026-01-15",
  },
  {
    id: "social-eng", title: "Social Engineering Defense", description: "Understanding social engineering tactics and how to counter them.",
    category: "Social Engineering", videoUrl: "", duration: "22 min", subtitles: [
      { language: "en", label: "English", content: "00:00:00,000 --> 00:00:05,000\nSocial Engineering Defense course" },
    ],
    completionDeadlineDays: 14, reminderEnabled: true, reminderDaysBefore: 3, assignedUsers: 150, completedUsers: 98, createdAt: "2026-02-01",
  },
  {
    id: "password-sec", title: "Password Security Best Practices", description: "How to create and manage strong passwords.",
    category: "Password Security", videoUrl: "", duration: "10 min", subtitles: [],
    completionDeadlineDays: 5, reminderEnabled: false, reminderDaysBefore: 1, assignedUsers: 300, completedUsers: 267, createdAt: "2026-02-20",
  },
];

export default function LMS() {
  const [courses, setCourses] = useState<Course[]>(defaultCourses);
  const [showCreate, setShowCreate] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState<Course | null>(null);
  const [editCourse, setEditCourse] = useState<Course | null>(null);
  const [newCourse, setNewCourse] = useState({
    title: "", description: "", category: "Phishing", videoFile: null as File | null,
    duration: "", completionDeadlineDays: 7, reminderEnabled: true, reminderDaysBefore: 2,
  });
  const [newSubtitle, setNewSubtitle] = useState({ language: "en", label: "English", content: "" });

  const handleCreate = () => {
    const c: Course = {
      id: Date.now().toString(), title: newCourse.title, description: newCourse.description,
      category: newCourse.category, videoUrl: newCourse.videoFile ? URL.createObjectURL(newCourse.videoFile) : "",
      duration: newCourse.duration || "10 min", subtitles: [],
      completionDeadlineDays: newCourse.completionDeadlineDays,
      reminderEnabled: newCourse.reminderEnabled, reminderDaysBefore: newCourse.reminderDaysBefore,
      assignedUsers: 0, completedUsers: 0, createdAt: new Date().toISOString().split("T")[0],
    };
    setCourses([c, ...courses]);
    setNewCourse({ title: "", description: "", category: "Phishing", videoFile: null, duration: "", completionDeadlineDays: 7, reminderEnabled: true, reminderDaysBefore: 2 });
    setShowCreate(false);
  };

  const handleAddSubtitle = (courseId: string) => {
    setCourses(courses.map(c => {
      if (c.id !== courseId) return c;
      return { ...c, subtitles: [...c.subtitles, { ...newSubtitle }] };
    }));
    if (showSubtitles) {
      setShowSubtitles({ ...showSubtitles, subtitles: [...showSubtitles.subtitles, { ...newSubtitle }] });
    }
    setNewSubtitle({ language: "en", label: "English", content: "" });
  };

  const handleDeleteSubtitle = (courseId: string, lang: string) => {
    setCourses(courses.map(c => {
      if (c.id !== courseId) return c;
      return { ...c, subtitles: c.subtitles.filter(s => s.language !== lang) };
    }));
    if (showSubtitles) {
      setShowSubtitles({ ...showSubtitles, subtitles: showSubtitles.subtitles.filter(s => s.language !== lang) });
    }
  };

  const handleDelete = (id: string) => setCourses(courses.filter(c => c.id !== id));

  return (
    <div className="animate-fade-in">
      <div className="page-header flex items-center justify-between">
        <div>
          <h1 className="page-title">Learning Management</h1>
          <p className="page-subtitle">Manage courses, videos, and training materials</p>
        </div>
        <Dialog open={showCreate} onOpenChange={setShowCreate}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-primary text-primary-foreground"><Plus className="w-4 h-4" />Add Course</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>Create Course</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label>Title</Label><Input value={newCourse.title} onChange={e => setNewCourse({ ...newCourse, title: e.target.value })} /></div>
              <div><Label>Description</Label><Textarea value={newCourse.description} onChange={e => setNewCourse({ ...newCourse, description: e.target.value })} rows={3} /></div>
              <div>
                <Label>Category</Label>
                <Select value={newCourse.category} onValueChange={v => setNewCourse({ ...newCourse, category: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Phishing">Phishing</SelectItem>
                    <SelectItem value="Social Engineering">Social Engineering</SelectItem>
                    <SelectItem value="Password Security">Password Security</SelectItem>
                    <SelectItem value="Data Protection">Data Protection</SelectItem>
                    <SelectItem value="Compliance">Compliance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Upload Video</Label>
                <Input type="file" accept="video/*" onChange={e => setNewCourse({ ...newCourse, videoFile: e.target.files?.[0] || null })} />
              </div>
              <div><Label>Duration</Label><Input value={newCourse.duration} onChange={e => setNewCourse({ ...newCourse, duration: e.target.value })} placeholder="e.g., 15 min" /></div>
              <div>
                <Label>Completion Deadline (days)</Label>
                <Input type="number" value={newCourse.completionDeadlineDays} onChange={e => setNewCourse({ ...newCourse, completionDeadlineDays: parseInt(e.target.value) || 7 })} />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="reminder" checked={newCourse.reminderEnabled} onChange={e => setNewCourse({ ...newCourse, reminderEnabled: e.target.checked })} className="rounded" />
                <Label htmlFor="reminder">Enable reminders</Label>
              </div>
              {newCourse.reminderEnabled && (
                <div>
                  <Label>Remind days before deadline</Label>
                  <Input type="number" value={newCourse.reminderDaysBefore} onChange={e => setNewCourse({ ...newCourse, reminderDaysBefore: parseInt(e.target.value) || 1 })} />
                </div>
              )}
              <Button onClick={handleCreate} className="w-full bg-primary text-primary-foreground">Create Course</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Course Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => {
          const progress = course.assignedUsers ? Math.round((course.completedUsers / course.assignedUsers) * 100) : 0;
          return (
            <div key={course.id} className="bg-card border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              {/* Video Placeholder */}
              <div className="bg-navy-dark aspect-video flex items-center justify-center relative">
                <Play className="w-12 h-12 text-gold opacity-60" />
                {course.subtitles.length > 0 && (
                  <span className="absolute bottom-2 right-2 badge-status bg-card/90 text-foreground">
                    <Subtitles className="w-3 h-3 mr-1 inline" />{course.subtitles.length} subtitles
                  </span>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-display font-semibold text-sm">{course.title}</h3>
                  <span className="badge-status bg-secondary/20 text-secondary-foreground">{course.category}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-4">{course.description}</p>

                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{course.duration}</span>
                  <span className="flex items-center gap-1"><Users className="w-3 h-3" />{course.assignedUsers} assigned</span>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Completion</span>
                    <span className="font-medium">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                {course.reminderEnabled && (
                  <p className="text-xs text-warning mb-3">⏰ Reminder: {course.reminderDaysBefore} days before {course.completionDeadlineDays}-day deadline</p>
                )}

                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => setShowSubtitles(course)}><Subtitles className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="sm"><Edit className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(course.id)} className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Subtitles Dialog */}
      <Dialog open={!!showSubtitles} onOpenChange={() => setShowSubtitles(null)}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Subtitles: {showSubtitles?.title}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            {showSubtitles?.subtitles.map(s => (
              <div key={s.language} className="flex items-center justify-between bg-muted rounded p-3">
                <div>
                  <span className="font-medium text-sm">{s.label}</span>
                  <span className="text-xs text-muted-foreground ml-2">({s.language})</span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleDeleteSubtitle(showSubtitles.id, s.language)} className="text-destructive">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}

            <div className="border-t pt-4 space-y-3">
              <h4 className="font-medium text-sm">Add Subtitle</h4>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label>Language Code</Label>
                  <Input value={newSubtitle.language} onChange={e => setNewSubtitle({ ...newSubtitle, language: e.target.value })} placeholder="en" />
                </div>
                <div>
                  <Label>Label</Label>
                  <Input value={newSubtitle.label} onChange={e => setNewSubtitle({ ...newSubtitle, label: e.target.value })} placeholder="English" />
                </div>
              </div>
              <div>
                <Label>Subtitle Content (SRT/VTT format)</Label>
                <Textarea value={newSubtitle.content} onChange={e => setNewSubtitle({ ...newSubtitle, content: e.target.value })} rows={5} placeholder="00:00:00,000 --> 00:00:05,000&#10;Welcome to the course" className="font-mono text-xs" />
              </div>
              <div>
                <Label>Or Upload SRT/VTT File</Label>
                <Input type="file" accept=".srt,.vtt" onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (ev) => setNewSubtitle({ ...newSubtitle, content: ev.target?.result as string || "" });
                    reader.readAsText(file);
                  }
                }} />
              </div>
              <Button onClick={() => showSubtitles && handleAddSubtitle(showSubtitles.id)} className="w-full bg-primary text-primary-foreground">Add Subtitle</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
