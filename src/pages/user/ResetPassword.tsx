import { useState } from "react";
import { Lock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

export default function ResetPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"email" | "reset">("email");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleSendReset = () => {
    if (!email.includes("@")) { setError("Please enter a valid email address."); return; }
    setError("");
    setEmailSent(true);
    // In production, this would send a reset email
    // For demo, allow direct reset
    setTimeout(() => setStep("reset"), 1500);
  };

  const handleResetPassword = () => {
    if (!PASSWORD_REGEX.test(newPassword)) {
      setError("Password must be at least 8 characters with uppercase, lowercase, number, and special character.");
      return;
    }
    if (newPassword !== confirmPassword) { setError("Passwords do not match."); return; }
    setError("");
    toast.success("Password reset successfully! You can now log in with your new password.");
    setTimeout(() => navigate("/"), 2000);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card border rounded-lg p-8 shadow-lg">
          <div className="text-center mb-6">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl font-display font-bold text-foreground">Reset Password</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {step === "email" ? "Enter your email to receive a reset link" : "Create your new password"}
            </p>
          </div>

          {step === "email" ? (
            <div className="space-y-4">
              <div>
                <Label>Email Address</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError(""); }}
                  placeholder="you@company.com"
                />
              </div>
              {error && <p className="text-xs text-destructive">{error}</p>}
              {emailSent && <p className="text-xs text-success">Reset link sent! Redirecting...</p>}
              <Button onClick={handleSendReset} className="w-full bg-primary text-primary-foreground" disabled={emailSent}>
                {emailSent ? "Sending..." : "Send Reset Link"}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <Label>New Password</Label>
                <Input type="password" value={newPassword} onChange={e => { setNewPassword(e.target.value); setError(""); }} />
              </div>
              <div>
                <Label>Confirm Password</Label>
                <Input type="password" value={confirmPassword} onChange={e => { setConfirmPassword(e.target.value); setError(""); }} />
              </div>
              <p className="text-xs text-muted-foreground">Min 8 chars, uppercase, lowercase, number, special char</p>
              {error && <p className="text-xs text-destructive">{error}</p>}
              <Button onClick={handleResetPassword} className="w-full bg-primary text-primary-foreground">
                Reset Password
              </Button>
            </div>
          )}

          <Button variant="ghost" className="w-full mt-4 gap-2 text-muted-foreground" onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
