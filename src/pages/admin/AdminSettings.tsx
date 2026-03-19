import { useState } from "react";
import { Save, Bell, Shield, Palette, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    orgName: "Vishwa Samudra",
    adminEmail: "admin@vishwasamudra.com",
    emailNotifications: true,
    autoReminders: true,
    reminderFrequency: "3",
    phishReportEmail: "security@vishwasamudra.com",
    requireMFA: false,
    sessionTimeout: "60",
    passwordMinLength: "8",
    passwordRequireUppercase: true,
    passwordRequireLowercase: true,
    passwordRequireNumbers: true,
    passwordRequireSpecial: true,
  });
  const [saved, setSaved] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); toast.success("Settings saved!"); };

  const handleChangePassword = () => {
    if (!currentPassword) { setPasswordError("Current password is required."); return; }
    if (!PASSWORD_REGEX.test(newPassword)) {
      setPasswordError("New password must be at least 8 characters with uppercase, lowercase, number, and special character.");
      return;
    }
    if (newPassword !== confirmPassword) { setPasswordError("Passwords do not match."); return; }
    setPasswordError("");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    toast.success("Password changed successfully!");
  };

  return (
    <div className="animate-fade-in max-w-2xl">
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Platform configuration and preferences</p>
      </div>

      <div className="space-y-6">
        {/* General */}
        <div className="bg-card border rounded-lg p-6">
          <h3 className="font-display font-semibold mb-4 flex items-center gap-2"><Palette className="w-5 h-5" />General</h3>
          <div className="space-y-4">
            <div><Label>Organization Name</Label><Input value={settings.orgName} onChange={e => setSettings({ ...settings, orgName: e.target.value })} /></div>
            <div><Label>Admin Email</Label><Input value={settings.adminEmail} onChange={e => setSettings({ ...settings, adminEmail: e.target.value })} /></div>
            <div><Label>Phish Report Email</Label><Input value={settings.phishReportEmail} onChange={e => setSettings({ ...settings, phishReportEmail: e.target.value })} /></div>
          </div>
        </div>

        {/* Change Admin Password */}
        <div className="bg-card border rounded-lg p-6">
          <h3 className="font-display font-semibold mb-4 flex items-center gap-2"><Lock className="w-5 h-5" />Change Admin Password</h3>
          <div className="space-y-4">
            <div><Label>Current Password</Label><Input type="password" value={currentPassword} onChange={e => { setCurrentPassword(e.target.value); setPasswordError(""); }} /></div>
            <div><Label>New Password</Label><Input type="password" value={newPassword} onChange={e => { setNewPassword(e.target.value); setPasswordError(""); }} /></div>
            <div><Label>Confirm New Password</Label><Input type="password" value={confirmPassword} onChange={e => { setConfirmPassword(e.target.value); setPasswordError(""); }} /></div>
            <p className="text-xs text-muted-foreground">Min 8 chars, uppercase, lowercase, number, special char</p>
            {passwordError && <p className="text-xs text-destructive">{passwordError}</p>}
            <Button onClick={handleChangePassword} variant="outline" className="gap-2"><Lock className="w-4 h-4" />Change Password</Button>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-card border rounded-lg p-6">
          <h3 className="font-display font-semibold mb-4 flex items-center gap-2"><Bell className="w-5 h-5" />Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Email notifications for campaign events</Label>
              <Switch checked={settings.emailNotifications} onCheckedChange={v => setSettings({ ...settings, emailNotifications: v })} />
            </div>
            <div className="flex items-center justify-between">
              <Label>Auto-send course reminders</Label>
              <Switch checked={settings.autoReminders} onCheckedChange={v => setSettings({ ...settings, autoReminders: v })} />
            </div>
            {settings.autoReminders && (
              <div><Label>Reminder frequency (days)</Label><Input type="number" value={settings.reminderFrequency} onChange={e => setSettings({ ...settings, reminderFrequency: e.target.value })} /></div>
            )}
          </div>
        </div>

        {/* Security */}
        <div className="bg-card border rounded-lg p-6">
          <h3 className="font-display font-semibold mb-4 flex items-center gap-2"><Shield className="w-5 h-5" />Security & Password Policy</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Require MFA for admin accounts</Label>
              <Switch checked={settings.requireMFA} onCheckedChange={v => setSettings({ ...settings, requireMFA: v })} />
            </div>
            <div><Label>Session Timeout (minutes)</Label><Input type="number" value={settings.sessionTimeout} onChange={e => setSettings({ ...settings, sessionTimeout: e.target.value })} /></div>
            <div><Label>Minimum Password Length</Label><Input type="number" value={settings.passwordMinLength} onChange={e => setSettings({ ...settings, passwordMinLength: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2"><input type="checkbox" checked={settings.passwordRequireUppercase} onChange={e => setSettings({ ...settings, passwordRequireUppercase: e.target.checked })} className="rounded" /><Label className="text-sm">Uppercase letters</Label></div>
              <div className="flex items-center gap-2"><input type="checkbox" checked={settings.passwordRequireLowercase} onChange={e => setSettings({ ...settings, passwordRequireLowercase: e.target.checked })} className="rounded" /><Label className="text-sm">Lowercase letters</Label></div>
              <div className="flex items-center gap-2"><input type="checkbox" checked={settings.passwordRequireNumbers} onChange={e => setSettings({ ...settings, passwordRequireNumbers: e.target.checked })} className="rounded" /><Label className="text-sm">Numbers</Label></div>
              <div className="flex items-center gap-2"><input type="checkbox" checked={settings.passwordRequireSpecial} onChange={e => setSettings({ ...settings, passwordRequireSpecial: e.target.checked })} className="rounded" /><Label className="text-sm">Special characters</Label></div>
            </div>
          </div>
        </div>
      </div>

      <Button onClick={handleSave} className="gap-2 mt-6 bg-primary text-primary-foreground">
        <Save className="w-4 h-4" />{saved ? "Saved!" : "Save Settings"}
      </Button>
    </div>
  );
}
