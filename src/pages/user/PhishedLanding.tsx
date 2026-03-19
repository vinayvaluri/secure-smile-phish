import { useSearchParams, Link } from "react-router-dom";
import { AlertTriangle, BookOpen, Shield, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const phishReasons: Record<string, { title: string; points: string[]; course: string; courseTitle: string }> = {
  "credential": {
    title: "You entered credentials on a fake login page",
    points: [
      "The URL didn't match the official company domain",
      "The email created a false sense of urgency",
      "Legitimate services never ask for passwords via email links",
      "The page design mimicked a real service but had subtle differences",
    ],
    course: "/user/course/phishing-101",
    courseTitle: "Phishing Awareness 101",
  },
  "click": {
    title: "You clicked on a suspicious link in the email",
    points: [
      "Hover over links before clicking to check the actual URL",
      "The sender address was spoofed to look legitimate",
      "The email used social engineering to trigger a quick reaction",
      "Always verify requests through official channels",
    ],
    course: "/user/course/social-eng",
    courseTitle: "Social Engineering Defense",
  },
  "download": {
    title: "You downloaded a potentially malicious attachment",
    points: [
      "Never download attachments from unexpected emails",
      "The file extension may have been disguised",
      "Verify with the sender through a different channel",
      "Report suspicious emails to your IT security team",
    ],
    course: "/user/course/phishing-101",
    courseTitle: "Phishing Awareness 101",
  },
};

export default function PhishedLanding() {
  const [params] = useSearchParams();
  const type = params.get("type") || "click";
  const reason = phishReasons[type] || phishReasons.click;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <img src={logo} alt="Vishwa Samudra" className="w-32 mx-auto mb-4" />
          <div className="inline-flex items-center gap-2 bg-warning/10 text-warning px-4 py-2 rounded-full text-sm font-medium mb-4">
            <AlertTriangle className="w-4 h-4" />
            This was a phishing simulation
          </div>
          <h1 className="font-display text-2xl font-bold mb-2">You've Been Phished!</h1>
          <p className="text-muted-foreground">Don't worry — this was a security awareness exercise by Vishwa Samudra.</p>
        </div>

        {/* Why you were phished */}
        <div className="bg-card border rounded-lg p-6 mb-6">
          <h2 className="font-display font-semibold flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-destructive" />
            {reason.title}
          </h2>
          <ul className="space-y-3">
            {reason.points.map((point, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span className="w-5 h-5 rounded-full bg-destructive/10 text-destructive flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Course Link */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-6">
          <h3 className="font-display font-semibold flex items-center gap-2 mb-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Complete Your Training
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            To improve your awareness, please complete the assigned course:
          </p>
          <Link to={reason.course}>
            <Button className="w-full gap-2 bg-primary text-primary-foreground">
              <GraduationCapIcon />
              Start: {reason.courseTitle}
              <ExternalLink className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="text-center">
          <Link to="/user/report" className="text-sm text-primary hover:underline">
            View your full phishing report →
          </Link>
        </div>
      </div>
    </div>
  );
}

function GraduationCapIcon() {
  return <BookOpen className="w-4 h-4" />;
}
