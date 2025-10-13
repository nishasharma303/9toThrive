import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { db } from "@/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface Student {
  id: string;
  name: string;
  email?: string;
}

interface SendNotificationDialogProps {
  students: Student[];
}

export function SendNotificationDialog({ students }: SendNotificationDialogProps) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [manualEmails, setManualEmails] = useState("");
  const [sending, setSending] = useState(false);

  const studentsWithEmail = students.filter(s => s.email);

  const toggleEmail = (email: string) => {
    setSelectedEmails(prev =>
      prev.includes(email) ? prev.filter(e => e !== email) : [...prev, email]
    );
  };

  const handleSend = async () => {
    if (!message.trim()) {
      toast.error("Please enter a message");
      return;
    }

    const manualEmailList = manualEmails
      .split(/[,;\n]/)
      .map(e => e.trim())
      .filter(e => e && e.includes('@'));
    
    const allEmails = [...new Set([...selectedEmails, ...manualEmailList])];

    if (allEmails.length === 0) {
      toast.error("Please select or enter at least one email");
      return;
    }

    setSending(true);

    try {
      const notificationsRef = collection(db, "notifications");

      // Create a notification document for each recipient
      const promises = allEmails.map(email =>
        addDoc(notificationsRef, {
          email,
          message,
          timestamp: serverTimestamp(),
          type: "email", // can later change to push, SMS, etc.
        })
      );

      await Promise.all(promises);

      toast.success(`Notification sent to ${allEmails.length} recipient(s)!`);
      setMessage("");
      setSelectedEmails([]);
      setManualEmails("");
      setOpen(false);
    } catch (error: any) {
      console.error("Send notification error:", error);
      toast.error(error.message || "Failed to send notifications");
    } finally {
      setSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Send className="w-4 h-4 mr-2" />
          Send Notification
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Send Notification to Students</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your notification message..."
              rows={5}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="manual-emails">Manual Email Entry (comma or newline separated)</Label>
            <Textarea
              id="manual-emails"
              value={manualEmails}
              onChange={(e) => setManualEmails(e.target.value)}
              placeholder="email1@example.com, email2@example.com&#10;or&#10;email3@example.com"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Select Students ({selectedEmails.length} selected)</Label>
            <div className="border rounded-md p-4 max-h-60 overflow-y-auto space-y-2">
              {studentsWithEmail.length === 0 ? (
                <p className="text-sm text-muted-foreground">No students with email addresses found</p>
              ) : (
                <>
                  <div className="flex items-center space-x-2 pb-2 border-b">
                    <Checkbox
                      id="select-all"
                      checked={selectedEmails.length === studentsWithEmail.length}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedEmails(studentsWithEmail.map(s => s.email!));
                        } else {
                          setSelectedEmails([]);
                        }
                      }}
                    />
                    <label htmlFor="select-all" className="text-sm font-medium">
                      Select All
                    </label>
                  </div>
                  {studentsWithEmail.map((student) => (
                    <div key={student.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={student.id}
                        checked={selectedEmails.includes(student.email!)}
                        onCheckedChange={() => toggleEmail(student.email!)}
                      />
                      <label htmlFor={student.id} className="text-sm">
                        {student.name} ({student.email})
                      </label>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSend} disabled={sending}>
              {sending ? "Sending..." : "Send Notification"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
