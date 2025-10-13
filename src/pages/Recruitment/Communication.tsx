import { PageHeader } from "@/components/layout/PageHeaderRec";
import { DataTable } from "@/components/Recruitment/Table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Send, Calendar, CheckCircle, Clock, Building2, Phone, Mail } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const interviewData = [
  {
    id: 1,
    candidate: "Priya Sharma",
    role: "Frontend Developer",
    date: "2025-04-15",
    time: "10:00 AM",
    status: "Scheduled",
  },
  {
    id: 2,
    candidate: "Rahul Verma",
    role: "Backend Engineer",
    date: "2025-04-16",
    time: "2:00 PM",
    status: "Completed",
  },
  {
    id: 3,
    candidate: "Ananya Reddy",
    role: "UI/UX Designer",
    date: "2025-04-17",
    time: "11:00 AM",
    status: "Scheduled",
  },
  {
    id: 4,
    candidate: "Vikram Singh",
    role: "Data Scientist",
    date: "2025-04-18",
    time: "3:00 PM",
    status: "Pending",
  },
];

const columns = [
  { header: "Candidate Name", accessor: "candidate" },
  { header: "Role", accessor: "role" },
  {
    header: "Date",
    accessor: "date",
    cell: (value: string) => new Date(value).toLocaleDateString(),
  },
  { header: "Time", accessor: "time" },
  {
    header: "Status",
    accessor: "status",
    cell: (value: string) => {
      const variant =
        value === "Completed" ? "default" : value === "Scheduled" ? "secondary" : "outline";
      const icon =
        value === "Completed" ? CheckCircle : value === "Scheduled" ? Calendar : Clock;
      const Icon = icon;
      return (
        <Badge variant={variant}>
          <Icon className="w-3 h-3 mr-1" />
          {value}
        </Badge>
      );
    },
  },
  {
    header: "Actions",
    accessor: "id",
    cell: (_, row) => (
      <div className="flex gap-2">
        {row.status !== "Completed" && (
          <>
            <Button size="sm" variant="ghost">
              <Calendar className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost">
              <CheckCircle className="w-4 h-4" />
            </Button>
          </>
        )}
      </div>
    ),
  },
];

export default function Communication() {
  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="Placement Cell Communication"
        description="Coordinate with college placement offices for recruitment activities"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="p-6 bg-gradient-card shadow-card border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            Contact Placement Cell
          </h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="college">College/University</Label>
              <Input 
                id="college"
                placeholder="e.g., IIT Delhi, NIT Trichy"
                className="mt-2 bg-input border-border"
              />
            </div>

            <div>
              <Label htmlFor="coordinator">Placement Coordinator Name</Label>
              <Input 
                id="coordinator"
                placeholder="e.g., Dr. Sharma"
                className="mt-2 bg-input border-border"
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email"
                type="email"
                placeholder="placement@college.edu"
                className="mt-2 bg-input border-border"
              />
            </div>

            <div>
              <Label htmlFor="phone">Contact Number</Label>
              <Input 
                id="phone"
                type="tel"
                placeholder="+91 XXXXXXXXXX"
                className="mt-2 bg-input border-border"
              />
            </div>

            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input 
                id="subject"
                placeholder="Campus Recruitment Drive 2025"
                className="mt-2 bg-input border-border"
              />
            </div>

            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Describe your recruitment requirements and proposed dates..."
                className="min-h-[120px] mt-2 bg-input border-border"
              />
            </div>

            <Button className="w-full">
              <Send className="w-4 h-4 mr-2" />
              Send Request
            </Button>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card shadow-card border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Saved Placement Contacts
          </h3>
          
          <div className="space-y-3">
            {[
              { college: "IIT Delhi", coordinator: "Dr. Rajesh Kumar", email: "placement@iitd.ac.in", phone: "+91 98765 43210" },
              { college: "NIT Trichy", coordinator: "Prof. Meera Nair", email: "tpo@nitt.edu", phone: "+91 98765 43211" },
              { college: "BITS Pilani", coordinator: "Dr. Amit Sharma", email: "placement@bits-pilani.ac.in", phone: "+91 98765 43212" },
            ].map((contact, index) => (
              <div 
                key={index}
                className="p-4 bg-muted rounded-lg border border-border hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-foreground">{contact.college}</h4>
                    <p className="text-sm text-muted-foreground">{contact.coordinator}</p>
                  </div>
                  <Button size="sm" variant="ghost">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-3 h-3" />
                    <span>{contact.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-3 h-3" />
                    <span>{contact.phone}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button variant="outline" className="w-full mt-4">
            Add New Contact
          </Button>
        </Card>
      </div>

      <Card className="bg-card border-border shadow-card">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Interview Schedule</h3>
        </div>
        <DataTable columns={columns} data={interviewData} />
      </Card>
    </div>
  );
}
