import { useState } from "react";
import { Save, Shield, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function SSOConfig() {
  const [config, setConfig] = useState({
    enabled: false,
    tenantId: "",
    clientId: "",
    clientSecret: "",
    redirectUri: window.location.origin + "/auth/callback",
    autoProvision: true,
    defaultGroup: "All Employees",
    defaultDepartment: "General",
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="animate-fade-in max-w-2xl">
      <div className="page-header">
        <h1 className="page-title">Azure AD / SSO Configuration</h1>
        <p className="page-subtitle">Configure single sign-on with Microsoft Azure Active Directory</p>
      </div>

      <div className="bg-card border rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-primary" />
            <div>
              <h3 className="font-display font-semibold">Azure AD Integration</h3>
              <p className="text-sm text-muted-foreground">Enable SSO for seamless user login</p>
            </div>
          </div>
          <Switch checked={config.enabled} onCheckedChange={v => setConfig({ ...config, enabled: v })} />
        </div>

        {config.enabled && (
          <div className="space-y-4">
            <div className="bg-muted rounded-lg p-4 text-sm">
              <p className="font-medium mb-2">Setup Instructions:</p>
              <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                <li>Go to Azure Portal → Azure Active Directory → App Registrations</li>
                <li>Create a new registration with redirect URI below</li>
                <li>Copy Tenant ID, Client ID, and create a Client Secret</li>
                <li>Add API permissions: User.Read, openid, profile, email</li>
              </ol>
            </div>

            <div>
              <Label>Tenant ID</Label>
              <Input value={config.tenantId} onChange={e => setConfig({ ...config, tenantId: e.target.value })} placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" />
            </div>
            <div>
              <Label>Client ID (Application ID)</Label>
              <Input value={config.clientId} onChange={e => setConfig({ ...config, clientId: e.target.value })} placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" />
            </div>
            <div>
              <Label>Client Secret</Label>
              <Input type="password" value={config.clientSecret} onChange={e => setConfig({ ...config, clientSecret: e.target.value })} />
            </div>
            <div>
              <Label>Redirect URI</Label>
              <Input value={config.redirectUri} readOnly className="bg-muted" />
              <p className="text-xs text-muted-foreground mt-1">Add this URI to your Azure AD app registration</p>
            </div>

            <div className="border-t pt-4 space-y-4">
              <h4 className="font-medium text-sm">Auto-Provisioning</h4>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="autoProvision" checked={config.autoProvision} onChange={e => setConfig({ ...config, autoProvision: e.target.checked })} className="rounded" />
                <Label htmlFor="autoProvision">Automatically create users on first SSO login</Label>
              </div>
              <div>
                <Label>Default Group</Label>
                <Input value={config.defaultGroup} onChange={e => setConfig({ ...config, defaultGroup: e.target.value })} />
              </div>
              <div>
                <Label>Default Department</Label>
                <Input value={config.defaultDepartment} onChange={e => setConfig({ ...config, defaultDepartment: e.target.value })} />
              </div>
            </div>
          </div>
        )}
      </div>

      <Button onClick={handleSave} className="gap-2 bg-primary text-primary-foreground">
        <Save className="w-4 h-4" />{saved ? "Saved!" : "Save SSO Settings"}
      </Button>
    </div>
  );
}
