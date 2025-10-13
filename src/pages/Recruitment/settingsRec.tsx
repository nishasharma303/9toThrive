import { PageHeader } from "@/components/layout/PageHeaderRec";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Save } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Settings() {
  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="Settings"
        description="Manage your recruiter profile and system preferences"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-gradient-card shadow-card border-border">
          <h3 className="text-lg font-semibold text-foreground mb-6">Profile Information</h3>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Recruiter Name</Label>
              <Input
                id="name"
                defaultValue="Sarah Johnson"
                className="mt-2 bg-input border-border"
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                defaultValue="sarah.johnson@company.com"
                className="mt-2 bg-input border-border"
              />
            </div>

            <div>
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                defaultValue="Tech Innovations Inc."
                className="mt-2 bg-input border-border"
              />
            </div>

            <div>
              <Label htmlFor="team">Team Access Roles</Label>
              <Select>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="recruiter">Recruiter</SelectItem>
                  <SelectItem value="hiring-manager">Hiring Manager</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card shadow-card border-border">
          <h3 className="text-lg font-semibold text-foreground mb-6">Integration & Privacy</h3>

          <div className="space-y-6">
            <div>
              <Label htmlFor="ats">ATS Integration URL</Label>
              <Input
                id="ats"
                placeholder="https://api.yourATS.com/webhook"
                className="mt-2 bg-input border-border"
              />
            </div>

            <div className="space-y-4 pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="privacy">Data Privacy Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Anonymize candidate data in exports
                  </p>
                </div>
                <Switch id="privacy" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive updates on candidate activity
                  </p>
                </div>
                <Switch id="notifications" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-shortlist">AI Auto-Shortlist</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable automatic candidate shortlisting
                  </p>
                </div>
                <Switch id="auto-shortlist" defaultChecked />
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-6 flex justify-end">
        <Button size="lg">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}
