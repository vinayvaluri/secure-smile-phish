import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Play, Pause, CheckCircle, Subtitles, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import logo from "@/assets/logo.png";

const courses: Record<string, {
  title: string; description: string; duration: string; modules: { title: string; duration: string }[];
  subtitles: { language: string; label: string }[];
}> = {
  "phishing-101": {
    title: "Phishing Awareness 101",
    description: "Learn to identify and protect against common phishing attacks. This course covers email phishing, spear phishing, and whaling attacks.",
    duration: "15 min",
    modules: [
      { title: "What is Phishing?", duration: "3 min" },
      { title: "Types of Phishing Attacks", duration: "4 min" },
      { title: "How to Identify Phishing Emails", duration: "4 min" },
      { title: "Reporting Suspicious Emails", duration: "2 min" },
      { title: "Quiz & Assessment", duration: "2 min" },
    ],
    subtitles: [
      { language: "en", label: "English" },
      { language: "hi", label: "Hindi" },
    ],
  },
  "social-eng": {
    title: "Social Engineering Defense",
    description: "Understanding social engineering tactics and building defense mechanisms against manipulation techniques.",
    duration: "22 min",
    modules: [
      { title: "Introduction to Social Engineering", duration: "5 min" },
      { title: "Common Tactics & Techniques", duration: "6 min" },
      { title: "Psychological Manipulation", duration: "5 min" },
      { title: "Building Your Defense", duration: "4 min" },
      { title: "Quiz & Assessment", duration: "2 min" },
    ],
    subtitles: [{ language: "en", label: "English" }],
  },
  "password-sec": {
    title: "Password Security Best Practices",
    description: "How to create, manage, and protect strong passwords across your accounts.",
    duration: "10 min",
    modules: [
      { title: "Why Password Security Matters", duration: "2 min" },
      { title: "Creating Strong Passwords", duration: "3 min" },
      { title: "Password Managers", duration: "3 min" },
      { title: "Quiz", duration: "2 min" },
    ],
    subtitles: [],
  },
};

export default function CourseViewer() {
  const { courseId } = useParams();
  const course = courses[courseId || ""] || courses["phishing-101"];
  const [currentModule, setCurrentModule] = useState(0);
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedSubtitle, setSelectedSubtitle] = useState(course.subtitles[0]?.language || "off");

  const progress = Math.round((completedModules.length / course.modules.length) * 100);

  const handleComplete = () => {
    if (!completedModules.includes(currentModule)) {
      setCompletedModules([...completedModules, currentModule]);
    }
    if (currentModule < course.modules.length - 1) {
      setCurrentModule(currentModule + 1);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Vishwa Samudra" className="w-8 h-auto" />
            <span className="font-display font-semibold text-sm">{course.title}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Progress value={progress} className="w-24 h-2" />
              <span className="text-xs font-medium">{progress}%</span>
            </div>
            <Link to="/user/report">
              <Button variant="ghost" size="sm" className="gap-1"><ArrowLeft className="w-4 h-4" />Back</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Video Area */}
          <div className="lg:col-span-2">
            <div className="bg-navy-dark aspect-video rounded-lg flex items-center justify-center relative mb-4">
              <button onClick={() => setIsPlaying(!isPlaying)} className="w-16 h-16 rounded-full bg-gold/80 hover:bg-gold flex items-center justify-center transition-colors">
                {isPlaying ? <Pause className="w-7 h-7 text-navy-dark" /> : <Play className="w-7 h-7 text-navy-dark ml-1" />}
              </button>
              {/* Subtitle indicator */}
              {selectedSubtitle !== "off" && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-foreground/80 text-background px-4 py-1.5 rounded text-sm">
                  [Subtitles: {course.subtitles.find(s => s.language === selectedSubtitle)?.label}]
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display font-semibold">{course.modules[currentModule].title}</h2>
                <p className="text-sm text-muted-foreground">{course.modules[currentModule].duration}</p>
              </div>
              <div className="flex items-center gap-3">
                {course.subtitles.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Subtitles className="w-4 h-4 text-muted-foreground" />
                    <Select value={selectedSubtitle} onValueChange={setSelectedSubtitle}>
                      <SelectTrigger className="w-32 h-8 text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="off">Off</SelectItem>
                        {course.subtitles.map(s => (
                          <SelectItem key={s.language} value={s.language}>{s.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <Button onClick={handleComplete} className="gap-1 bg-primary text-primary-foreground" size="sm">
                  <CheckCircle className="w-4 h-4" />Mark Complete
                </Button>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6 bg-card border rounded-lg p-5">
              <h3 className="font-display font-semibold mb-2">About This Course</h3>
              <p className="text-sm text-muted-foreground">{course.description}</p>
            </div>
          </div>

          {/* Module List */}
          <div className="bg-card border rounded-lg p-4">
            <h3 className="font-display font-semibold mb-4">Course Modules</h3>
            <div className="space-y-1">
              {course.modules.map((mod, i) => {
                const isCompleted = completedModules.includes(i);
                const isCurrent = currentModule === i;
                return (
                  <button
                    key={i}
                    onClick={() => setCurrentModule(i)}
                    className={`w-full flex items-center gap-3 p-3 rounded-md text-left transition-colors text-sm ${
                      isCurrent ? "bg-primary/10 text-primary" :
                      isCompleted ? "text-success" :
                      "text-foreground hover:bg-muted"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-4 h-4 shrink-0 text-success" />
                    ) : (
                      <span className="w-4 h-4 shrink-0 rounded-full border-2 flex items-center justify-center text-[10px]">{i + 1}</span>
                    )}
                    <span className="flex-1">{mod.title}</span>
                    <span className="text-xs text-muted-foreground">{mod.duration}</span>
                    {isCurrent && <ChevronRight className="w-4 h-4" />}
                  </button>
                );
              })}
            </div>

            {progress === 100 && (
              <div className="mt-6 bg-success/10 border border-success/20 rounded-lg p-4 text-center">
                <CheckCircle className="w-8 h-8 text-success mx-auto mb-2" />
                <p className="font-display font-semibold text-success">Course Completed!</p>
                <p className="text-xs text-muted-foreground mt-1">Great job on improving your security awareness.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
