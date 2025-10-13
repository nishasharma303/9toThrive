import { useState, useEffect } from "react";
import { PageHeader } from "@/components/Placement/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { db } from "@/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

interface Student {
  id: string;
  Name: string;
  Email: string;
  Branch: string;
  RegNo: string;
  Skills?: string;
  verification_status: "verified" | "unverified";
}

export default function Communication() {
  const [message, setMessage] = useState("");
  const [audience, setAudience] = useState("all");
  const [notificationType, setNotificationType] = useState<"email" | "sms" | "dashboard">("email");
  const [sending, setSending] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const snapshot = await getDocs(collection(db, "students"));
      const data: Student[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      } as Student));
      setStudents(data);
    } catch (error: any) {
      console.error("Failed to fetch students:", error);
      toast.error("Failed to fetch students");
    }
  };

  const handleSend = async () => {
    if (!message.trim()) {
      toast.error("Please enter a message before sending!");
      return;
    }

    setSending(true);

    try {
      // Filter students based on audience
      let targetStudents = students;
      if (audience !== "all") {
        if (audience === "verified") {
          targetStudents = students.filter(s => s.verification_status === "verified");
        } else if (audience === "unverified") {
          targetStudents = students.filter(s => s.verification_status === "unverified");
        } else {
          targetStudents = students.filter(s => s.Branch === audience);
        }
      }

      const studentEmails = targetStudents.map(s => s.Email);

      // TODO: Call Firebase Cloud Function or backend API to send notifications
      // Example:
      // await sendNotificationFirebase({ emails: studentEmails, message, type: notificationType });

      toast.success(`Notification sent to ${studentEmails.length} students`);
      setMessage("");
    } catch (error: any) {
      console.error("Send notification error:", error);
      toast.error(error.message || "Failed to send notification");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="p-8">
      <PageHeader title="Communication" description="Send bulk notifications to students" />

      <Card className="p-6 max-w-3xl">
        <div className="space-y-6">
          {/* Audience Selection */}
          <div className="space-y-2">
            <Label htmlFor="audience">Select Audience</Label>
            <Select value={audience} onValueChange={setAudience}>
              <SelectTrigger id="audience">
                <SelectValue placeholder="Choose audience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Students</SelectItem>
                <SelectItem value="Computer Science">Computer Science</SelectItem>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Mechanical">Mechanical</SelectItem>
                <SelectItem value="Civil">Civil</SelectItem>
                <SelectItem value="verified">Verified Students Only</SelectItem>
                <SelectItem value="unverified">Unverified Students</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Notification Type */}
          <div className="space-y-2">
            <Label htmlFor="notificationType">Notification Type</Label>
            <Select value={notificationType} onValueChange={(value: any) => setNotificationType(value)}>
              <SelectTrigger id="notificationType">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="sms">SMS Alert</SelectItem>
                <SelectItem value="dashboard">Dashboard Alert</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Message Input */}
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Type your notification message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={8}
              className="resize-none"
            />
            <p className="text-sm text-mint-cream">{message.length} / 500 characters</p>
          </div>

          {/* Send Button */}
          <Button onClick={handleSend} className="w-full sm:w-auto" disabled={sending}>
            <Send className="w-4 h-4 mr-2" />
            {sending ? "Sending..." : "Send Notification"}
          </Button>

          {/* Info Box */}
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h4 className="font-semibold text-foreground mb-2">Notification Channels</h4>
            <ul className="text-sm text-mint-cream space-y-1">
              <li>• Email notifications will be sent to registered email addresses</li>
              <li>• SMS alerts (if phone numbers are verified)</li>
              <li>• In-app notifications (if student portal is active)</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
