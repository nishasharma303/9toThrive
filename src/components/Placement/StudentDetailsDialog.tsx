import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, User, BookOpen, Hash } from "lucide-react";

interface Student {
  id: string;
  name: string;
  branch: string;
  skills: string[];
  verification_status: "verified" | "unverified" | "pending";
  email: string;
  reg_no: string;
}

interface StudentDetailsDialogProps {
  student: Student | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function StudentDetailsDialog({ student, open, onOpenChange }: StudentDetailsDialogProps) {
  if (!student) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Student Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <Card className="p-6 bg-muted/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{student.name}</h3>
                <Badge 
                  variant={
                    student.verification_status === "verified"
                      ? "default"
                      : student.verification_status === "pending"
                      ? "outline"
                      : "destructive"
                  }
                  className={
                    student.verification_status === "verified"
                      ? "bg-success text-success-foreground"
                      : ""
                  }
                >
                  {student.verification_status}
                </Badge>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 rounded-lg border bg-card">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="font-medium break-all">{student.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg border bg-card">
              <Hash className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Registration No</p>
                <p className="font-medium">{student.reg_no}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-lg border bg-card">
            <BookOpen className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Branch</p>
              <p className="font-medium">{student.branch}</p>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              Skills & Expertise
            </h4>
            <div className="flex flex-wrap gap-2">
              {student.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-sm px-3 py-1">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
