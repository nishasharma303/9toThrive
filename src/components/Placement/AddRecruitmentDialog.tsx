import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface AddRecruitmentDialogProps {
  onRoundAdded: (round: {
    company_name: string;
    job_role: string;
    total_applicants: number;
  }) => void;
}

export function AddRecruitmentDialog({ onRoundAdded }: AddRecruitmentDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    company_name: "",
    job_role: "",
    total_applicants: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.company_name || !formData.job_role || !formData.total_applicants) {
      toast.error("Please fill in all required fields");
      return;
    }

    onRoundAdded({
      company_name: formData.company_name,
      job_role: formData.job_role,
      total_applicants: parseInt(formData.total_applicants),
    });
    setFormData({ company_name: "", job_role: "", total_applicants: "" });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Recruitment
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Recruitment Round</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="company_name">Company Name *</Label>
            <Input
              id="company_name"
              value={formData.company_name}
              onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
              placeholder="e.g., Google"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="job_role">Job Role *</Label>
            <Input
              id="job_role"
              value={formData.job_role}
              onChange={(e) => setFormData({ ...formData, job_role: e.target.value })}
              placeholder="e.g., Software Engineer"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="total_applicants">Total Applicants *</Label>
            <Input
              id="total_applicants"
              type="number"
              value={formData.total_applicants}
              onChange={(e) => setFormData({ ...formData, total_applicants: e.target.value })}
              placeholder="e.g., 50"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Round</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
