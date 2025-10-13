import { useState, useEffect } from "react";
import { PageHeader } from "@/components/Placement/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface PlacementOfficer {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  assigned_companies: string[];
}

export default function Settings() {
  const [officers, setOfficers] = useState<PlacementOfficer[]>([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    assigned_companies: ""
  });

  useEffect(() => {
    fetchOfficers();

    const channel = supabase
      .channel('officers-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'placement_officers' }, () => {
        fetchOfficers();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchOfficers = async () => {
    const { data, error } = await supabase
      .from('placement_officers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error(`Failed to fetch officers: ${error.message}`);
    } else {
      setOfficers((data || []) as PlacementOfficer[]);
    }
  };

  const handleAddOfficer = async () => {
    if (!formData.name || !formData.email) {
      toast.error("Name and email are required");
      return;
    }

    const companies = formData.assigned_companies
      .split(',')
      .map(c => c.trim())
      .filter(Boolean);

    const { error } = await supabase
      .from('placement_officers')
      .insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        assigned_companies: companies
      });

    if (error) {
      toast.error(`Failed to add officer: ${error.message}`);
    } else {
      toast.success("Placement officer added successfully");
      setOpen(false);
      setFormData({ name: "", email: "", phone: "", assigned_companies: "" });
      fetchOfficers();
    }
  };

  const handleDeleteOfficer = async (id: string) => {
    try {
      const { error } = await supabase
        .from('placement_officers')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success("Officer deleted successfully");
      fetchOfficers();
    } catch (error: any) {
      toast.error(`Failed to delete officer: ${error.message}`);
    }
  };

  return (
    <div className="p-8">
      <PageHeader
        title="Settings"
        description="Manage placement officers and system preferences"
      />

      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Placement Officers</h3>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Officer
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Placement Officer</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Officer name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="officer@college.edu"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1234567890"
                  />
                </div>
                <div>
                  <Label htmlFor="companies">Assigned Companies (comma-separated)</Label>
                  <Input
                    id="companies"
                    value={formData.assigned_companies}
                    onChange={(e) => setFormData({ ...formData, assigned_companies: e.target.value })}
                    placeholder="Google, Microsoft, Amazon"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddOfficer}>Add Officer</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          {officers.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No placement officers added yet
            </p>
          ) : (
            officers.map((officer) => (
              <Card key={officer.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold">{officer.name}</h4>
                    <p className="text-sm text-muted-foreground">{officer.email}</p>
                    {officer.phone && (
                      <p className="text-sm text-muted-foreground">{officer.phone}</p>
                    )}
                    {officer.assigned_companies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {officer.assigned_companies.map((company, idx) => (
                          <Badge key={idx} variant="secondary">
                            {company}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteOfficer(officer.id)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}
