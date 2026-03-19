import { useState } from "react";
import { Save, Eye, Palette, Type, Image, MessageSquare, AlertTriangle, Shield, BookOpen, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface LandingConfig {
  // Branding
  logoUrl: string;
  companyName: string;
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  // Header
  badgeText: string;
  headline: string;
  subheadline: string;
  // Content sections
  showWhySection: boolean;
  whySectionTitle: string;
  // Credential type
  credentialPoints: string[];
  // Click type
  clickPoints: string[];
  // Download type
  downloadPoints: string[];
  // Training CTA
  showTrainingCTA: boolean;
  trainingHeadline: string;
  trainingDescription: string;
  trainingButtonText: string;
  // Footer
  showReportLink: boolean;
  reportLinkText: string;
  // Custom CSS
  customCSS: string;
}

const defaultConfig: LandingConfig = {
  logoUrl: "",
  companyName: "Vishwa Samudra",
  primaryColor: "#1a365d",
  accentColor: "#d4a017",
  backgroundColor: "#f5f6fa",
  badgeText: "This was a phishing simulation",
  headline: "You've Been Phished!",
  subheadline: "Don't worry — this was a security awareness exercise by {company}.",
  showWhySection: true,
  whySectionTitle: "What happened",
  credentialPoints: [
    "The URL didn't match the official company domain",
    "The email created a false sense of urgency",
    "Legitimate services never ask for passwords via email links",
    "The page design mimicked a real service but had subtle differences",
  ],
  clickPoints: [
    "Hover over links before clicking to check the actual URL",
    "The sender address was spoofed to look legitimate",
    "The email used social engineering to trigger a quick reaction",
    "Always verify requests through official channels",
  ],
  downloadPoints: [
    "Never download attachments from unexpected emails",
    "The file extension may have been disguised",
    "Verify with the sender through a different channel",
    "Report suspicious emails to your IT security team",
  ],
  showTrainingCTA: true,
  trainingHeadline: "Complete Your Training",
  trainingDescription: "To improve your awareness, please complete the assigned course:",
  trainingButtonText: "Start Training",
  showReportLink: true,
  reportLinkText: "View your full phishing report →",
  customCSS: "",
};

export default function LandingCustomization() {
  const [config, setConfig] = useState<LandingConfig>(defaultConfig);
  const [previewType, setPreviewType] = useState<"credential" | "click" | "download">("click");
  const [saved, setSaved] = useState(false);

  const updateConfig = (partial: Partial<LandingConfig>) => setConfig(prev => ({ ...prev, ...partial }));

  const updatePoint = (type: "credentialPoints" | "clickPoints" | "downloadPoints", index: number, value: string) => {
    const points = [...config[type]];
    points[index] = value;
    updateConfig({ [type]: points });
  };

  const addPoint = (type: "credentialPoints" | "clickPoints" | "downloadPoints") => {
    updateConfig({ [type]: [...config[type], "New point"] });
  };

  const removePoint = (type: "credentialPoints" | "clickPoints" | "downloadPoints", index: number) => {
    updateConfig({ [type]: config[type].filter((_, i) => i !== index) });
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    toast.success("Landing page configuration saved!");
  };

  const handleReset = () => {
    setConfig(defaultConfig);
    toast.info("Configuration reset to defaults.");
  };

  const getPreviewPoints = () => {
    if (previewType === "credential") return config.credentialPoints;
    if (previewType === "download") return config.downloadPoints;
    return config.clickPoints;
  };

  const resolveText = (text: string) => text.replace(/\{company\}/g, config.companyName);

  return (
    <div className="animate-fade-in">
      <div className="page-header flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="page-title">Landing Page Customization</h1>
          <p className="page-subtitle">Customize the phishing awareness page users see after clicking a simulated phish</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset}>Reset Defaults</Button>
          <Button onClick={handleSave} className="gap-2 bg-primary text-primary-foreground">
            <Save className="w-4 h-4" />{saved ? "Saved!" : "Save Changes"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Editor Panel */}
        <div className="space-y-6">
          <Tabs defaultValue="branding">
            <TabsList className="w-full grid grid-cols-4">
              <TabsTrigger value="branding" className="gap-1 text-xs"><Palette className="w-3 h-3" />Branding</TabsTrigger>
              <TabsTrigger value="content" className="gap-1 text-xs"><Type className="w-3 h-3" />Content</TabsTrigger>
              <TabsTrigger value="tips" className="gap-1 text-xs"><MessageSquare className="w-3 h-3" />Tips</TabsTrigger>
              <TabsTrigger value="advanced" className="gap-1 text-xs"><Image className="w-3 h-3" />Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="branding" className="space-y-4 mt-4">
              <div className="bg-card border rounded-lg p-5 space-y-4">
                <h3 className="font-display font-semibold text-sm">Brand Identity</h3>
                <div><Label>Company Name</Label><Input value={config.companyName} onChange={e => updateConfig({ companyName: e.target.value })} /></div>
                <div><Label>Logo URL</Label><Input value={config.logoUrl} onChange={e => updateConfig({ logoUrl: e.target.value })} placeholder="https://example.com/logo.png" /></div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <Label className="text-xs">Primary Color</Label>
                    <div className="flex gap-2 items-center">
                      <input type="color" value={config.primaryColor} onChange={e => updateConfig({ primaryColor: e.target.value })} className="w-8 h-8 rounded cursor-pointer border-0" />
                      <Input value={config.primaryColor} onChange={e => updateConfig({ primaryColor: e.target.value })} className="text-xs font-mono" />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs">Accent Color</Label>
                    <div className="flex gap-2 items-center">
                      <input type="color" value={config.accentColor} onChange={e => updateConfig({ accentColor: e.target.value })} className="w-8 h-8 rounded cursor-pointer border-0" />
                      <Input value={config.accentColor} onChange={e => updateConfig({ accentColor: e.target.value })} className="text-xs font-mono" />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs">Background</Label>
                    <div className="flex gap-2 items-center">
                      <input type="color" value={config.backgroundColor} onChange={e => updateConfig({ backgroundColor: e.target.value })} className="w-8 h-8 rounded cursor-pointer border-0" />
                      <Input value={config.backgroundColor} onChange={e => updateConfig({ backgroundColor: e.target.value })} className="text-xs font-mono" />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="content" className="space-y-4 mt-4">
              <div className="bg-card border rounded-lg p-5 space-y-4">
                <h3 className="font-display font-semibold text-sm">Header Section</h3>
                <div><Label>Warning Badge Text</Label><Input value={config.badgeText} onChange={e => updateConfig({ badgeText: e.target.value })} /></div>
                <div><Label>Headline</Label><Input value={config.headline} onChange={e => updateConfig({ headline: e.target.value })} /></div>
                <div><Label>Subheadline</Label><Textarea value={config.subheadline} onChange={e => updateConfig({ subheadline: e.target.value })} rows={2} /><p className="text-xs text-muted-foreground mt-1">Use {"{company}"} to insert company name</p></div>
              </div>
              <div className="bg-card border rounded-lg p-5 space-y-4">
                <h3 className="font-display font-semibold text-sm">Training CTA</h3>
                <div className="flex items-center justify-between">
                  <Label>Show training section</Label>
                  <Switch checked={config.showTrainingCTA} onCheckedChange={v => updateConfig({ showTrainingCTA: v })} />
                </div>
                {config.showTrainingCTA && (
                  <>
                    <div><Label>Headline</Label><Input value={config.trainingHeadline} onChange={e => updateConfig({ trainingHeadline: e.target.value })} /></div>
                    <div><Label>Description</Label><Textarea value={config.trainingDescription} onChange={e => updateConfig({ trainingDescription: e.target.value })} rows={2} /></div>
                    <div><Label>Button Text</Label><Input value={config.trainingButtonText} onChange={e => updateConfig({ trainingButtonText: e.target.value })} /></div>
                  </>
                )}
              </div>
              <div className="bg-card border rounded-lg p-5 space-y-4">
                <h3 className="font-display font-semibold text-sm">Footer</h3>
                <div className="flex items-center justify-between">
                  <Label>Show report link</Label>
                  <Switch checked={config.showReportLink} onCheckedChange={v => updateConfig({ showReportLink: v })} />
                </div>
                {config.showReportLink && (
                  <div><Label>Link Text</Label><Input value={config.reportLinkText} onChange={e => updateConfig({ reportLinkText: e.target.value })} /></div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="tips" className="space-y-4 mt-4">
              <div className="bg-card border rounded-lg p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-semibold text-sm">Awareness Tips</h3>
                  <div className="flex items-center gap-2">
                    <Label className="text-xs">Show section</Label>
                    <Switch checked={config.showWhySection} onCheckedChange={v => updateConfig({ showWhySection: v })} />
                  </div>
                </div>
                <div><Label>Section Title</Label><Input value={config.whySectionTitle} onChange={e => updateConfig({ whySectionTitle: e.target.value })} /></div>
              </div>

              {(["credentialPoints", "clickPoints", "downloadPoints"] as const).map(type => (
                <div key={type} className="bg-card border rounded-lg p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm capitalize">{type.replace("Points", "")} Phish Tips</h4>
                    <Button variant="outline" size="sm" onClick={() => addPoint(type)}>+ Add</Button>
                  </div>
                  {config[type].map((point, i) => (
                    <div key={i} className="flex gap-2">
                      <Input value={point} onChange={e => updatePoint(type, i, e.target.value)} className="text-sm" />
                      <Button variant="ghost" size="sm" className="text-destructive shrink-0" onClick={() => removePoint(type, i)}>×</Button>
                    </div>
                  ))}
                </div>
              ))}
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4 mt-4">
              <div className="bg-card border rounded-lg p-5 space-y-4">
                <h3 className="font-display font-semibold text-sm">Custom CSS</h3>
                <p className="text-xs text-muted-foreground">Add custom CSS to further style the landing page. Use with caution.</p>
                <Textarea value={config.customCSS} onChange={e => updateConfig({ customCSS: e.target.value })} rows={8} className="font-mono text-xs" placeholder=".phish-landing h1 { font-size: 2rem; }" />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Live Preview */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-semibold text-sm flex items-center gap-2"><Eye className="w-4 h-4" />Live Preview</h3>
            <Select value={previewType} onValueChange={v => setPreviewType(v as typeof previewType)}>
              <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="credential">Credential</SelectItem>
                <SelectItem value="click">Link Click</SelectItem>
                <SelectItem value="download">Download</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div
            className="border rounded-lg overflow-hidden shadow-lg"
            style={{ backgroundColor: config.backgroundColor }}
          >
            <div className="p-6 max-h-[600px] overflow-y-auto">
              <div className="max-w-md mx-auto">
                {/* Preview Header */}
                <div className="text-center mb-6">
                  {config.logoUrl ? (
                    <img src={config.logoUrl} alt={config.companyName} className="w-28 mx-auto mb-3" />
                  ) : (
                    <div className="w-28 h-10 mx-auto mb-3 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">Logo</div>
                  )}
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-3"
                    style={{ backgroundColor: config.accentColor + "1a", color: config.accentColor }}
                  >
                    <AlertTriangle className="w-3 h-3" />
                    {config.badgeText}
                  </div>
                  <h1 className="font-display text-xl font-bold mb-1" style={{ color: config.primaryColor }}>{config.headline}</h1>
                  <p className="text-muted-foreground text-xs">{resolveText(config.subheadline)}</p>
                </div>

                {/* Preview Tips */}
                {config.showWhySection && (
                  <div className="bg-card border rounded-lg p-4 mb-4">
                    <h2 className="font-display font-semibold text-sm flex items-center gap-2 mb-3">
                      <Shield className="w-4 h-4" style={{ color: config.primaryColor }} />
                      {config.whySectionTitle}
                    </h2>
                    <ul className="space-y-2">
                      {getPreviewPoints().map((point, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs">
                          <span
                            className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5"
                            style={{ backgroundColor: config.primaryColor + "15", color: config.primaryColor }}
                          >{i + 1}</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Preview Training CTA */}
                {config.showTrainingCTA && (
                  <div className="border rounded-lg p-4 mb-4" style={{ backgroundColor: config.primaryColor + "08", borderColor: config.primaryColor + "30" }}>
                    <h3 className="font-display font-semibold text-sm flex items-center gap-2 mb-1">
                      <BookOpen className="w-4 h-4" style={{ color: config.primaryColor }} />
                      {config.trainingHeadline}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-3">{config.trainingDescription}</p>
                    <button
                      className="w-full py-2 rounded text-xs font-medium flex items-center justify-center gap-2"
                      style={{ backgroundColor: config.primaryColor, color: "#fff" }}
                    >
                      <BookOpen className="w-3 h-3" />
                      {config.trainingButtonText}
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                )}

                {/* Preview Footer */}
                {config.showReportLink && (
                  <div className="text-center">
                    <span className="text-xs" style={{ color: config.primaryColor }}>{config.reportLinkText}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
