import { useState } from "react";
import { Save, Mail, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logo from "@/assets/logo.png";

export default function SenderConfig() {
  const [config, setConfig] = useState({
    senderName: "Vishwa Samudra IT Support",
    senderEmail: "it-support@vishwasamudra.com",
    replyTo: "noreply@vishwasamudra.com",
    companyName: "Vishwa Samudra",
    smtpHost: "",
    smtpPort: "587",
    smtpUser: "",
    smtpPass: "",
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="animate-fade-in max-w-2xl">
      <div className="page-header">
        <h1 className="page-title">Sender Configuration</h1>
        <p className="page-subtitle">Configure email sender details for phishing simulations</p>
      </div>

      {/* Company Branding Preview */}
      <div className="bg-card border rounded-lg p-6 mb-6">
        <h3 className="font-display font-semibold mb-4 flex items-center gap-2"><Building2 className="w-5 h-5" />Company Branding</h3>
        <div className="flex items-center gap-4 bg-muted rounded-lg p-4">
          <div className="w-16 h-16 rounded-lg bg-white flex items-center justify-center p-2 shadow-sm">
            <img src={logo} alt="Vishwa Samudra" className="w-full h-auto object-contain" />
          </div>
          <div>
            <p className="font-display font-bold text-lg">{config.companyName}</p>
            <p className="text-sm text-muted-foreground">Challenge It. Change It.</p>
          </div>
        </div>
      </div>

      {/* Sender Details */}
      <div className="bg-card border rounded-lg p-6 mb-6">
        <h3 className="font-display font-semibold mb-4 flex items-center gap-2"><Mail className="w-5 h-5" />Sender Details</h3>
        <div className="space-y-4">
          <div>
            <Label>Sender Display Name</Label>
            <Input value={config.senderName} onChange={e => setConfig({ ...config, senderName: e.target.value })} />
          </div>
          <div>
            <Label>Sender Email</Label>
            <Input type="email" value={config.senderEmail} onChange={e => setConfig({ ...config, senderEmail: e.target.value })} />
          </div>
          <div>
            <Label>Reply-To Email</Label>
            <Input type="email" value={config.replyTo} onChange={e => setConfig({ ...config, replyTo: e.target.value })} />
          </div>
          <div>
            <Label>Company Name</Label>
            <Input value={config.companyName} onChange={e => setConfig({ ...config, companyName: e.target.value })} />
          </div>
        </div>
      </div>

      {/* SMTP Settings */}
      <div className="bg-card border rounded-lg p-6 mb-6">
        <h3 className="font-display font-semibold mb-4">SMTP Configuration</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <Label>SMTP Host</Label>
              <Input value={config.smtpHost} onChange={e => setConfig({ ...config, smtpHost: e.target.value })} placeholder="smtp.company.com" />
            </div>
            <div>
              <Label>Port</Label>
              <Input value={config.smtpPort} onChange={e => setConfig({ ...config, smtpPort: e.target.value })} />
            </div>
          </div>
          <div>
            <Label>SMTP Username</Label>
            <Input value={config.smtpUser} onChange={e => setConfig({ ...config, smtpUser: e.target.value })} />
          </div>
          <div>
            <Label>SMTP Password</Label>
            <Input type="password" value={config.smtpPass} onChange={e => setConfig({ ...config, smtpPass: e.target.value })} />
          </div>
        </div>
      </div>

      <Button onClick={handleSave} className="gap-2 bg-primary text-primary-foreground">
        <Save className="w-4 h-4" />{saved ? "Saved!" : "Save Configuration"}
      </Button>
    </div>
  );
}
