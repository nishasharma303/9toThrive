import { useState, useEffect } from "react";
import { PageHeader } from "@/components/Placement/PageHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import { format, startOfWeek, endOfWeek, isWithinInterval } from "date-fns";
import { AddEventDialog } from "@/components/Placement/AddEventDialog";
import { db } from "@/firebaseConfig";
import { collection, query, orderBy, onSnapshot, Timestamp, addDoc } from "firebase/firestore";

export interface Job {
  id: string;
  title: string;
  company: string;
  role: string;
  description?: string;
  applicants: number;
  status: string;
  salary?: string;
  location?: string;
  scheduled_at: Timestamp;
  created_at?: Timestamp;
  updated_at?: Timestamp;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  event_date: Timestamp | string;
  event_type: string;
  created_at?: Timestamp;
  updated_at?: Timestamp;
}

export default function CalendarPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState(true);

  const toDate = (date: Timestamp | string) => (date instanceof Timestamp ? date.toDate() : new Date(date));

  useEffect(() => {
    const jobsQuery = query(collection(db, "jobs"), orderBy("scheduled_at", "asc"));
    const eventsQuery = query(collection(db, "calendar_events"), orderBy("event_date", "asc"));

    const unsubJobs = onSnapshot(
      jobsQuery,
      (snapshot) => {
        setJobs(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Job[]);
        setLoading(false);
      },
      (error) => {
        console.error("Jobs fetch error:", error);
        toast.error(`Failed to fetch jobs: ${error.message}`);
        setLoading(false);
      }
    );

    const unsubEvents = onSnapshot(
      eventsQuery,
      (snapshot) => setEvents(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as CalendarEvent[]),
      (error) => {
        console.error("Events fetch error:", error);
        toast.error(`Failed to fetch events: ${error.message}`);
      }
    );

    return () => {
      unsubJobs();
      unsubEvents();
    };
  }, []);

  const handleEventAdded = async (newEvent: {
    title: string;
    description?: string;
    event_type: string;
    event_date: string | Date | Timestamp;
  }) => {
    if (!newEvent.title || !newEvent.event_type || !newEvent.event_date) {
      toast.error("Please provide title, type, and date.");
      return;
    }

    const eventTimestamp =
      newEvent.event_date instanceof Timestamp
        ? newEvent.event_date
        : newEvent.event_date instanceof Date
        ? Timestamp.fromDate(newEvent.event_date)
        : Timestamp.fromDate(new Date(newEvent.event_date));

    try {
      await addDoc(collection(db, "calendar_events"), {
        title: newEvent.title,
        description: newEvent.description || "",
        event_type: newEvent.event_type,
        event_date: eventTimestamp,
        created_at: Timestamp.now(),
      });
      toast.success("Event added successfully!");
    } catch (error) {
      console.error("Add event error:", error);
      toast.error(`Failed to add event: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const isSameDate = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();

  const eventsOnSelectedDate = events.filter((e) => isSameDate(toDate(e.event_date), selectedDate));
  const jobsOnSelectedDate = jobs.filter((j) => isSameDate(toDate(j.scheduled_at), selectedDate));
  const allEventsOnSelectedDate = [...eventsOnSelectedDate, ...jobsOnSelectedDate];

  const datesWithEvents = [...jobs.map((j) => toDate(j.scheduled_at)), ...events.map((e) => toDate(e.event_date))];

  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(today, { weekStartsOn: 1 });

  const thisWeeksEvents = [...jobs, ...events]
    .map((item) => ({
      item,
      date: "scheduled_at" in item ? toDate((item as Job).scheduled_at) : toDate((item as CalendarEvent).event_date),
    }))
    .filter(({ date }) => isWithinInterval(date, { start: weekStart, end: weekEnd }))
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .map(({ item }) => item);

  return (
    <div className="p-8">
      <PageHeader
        title="Calendar"
        description="View scheduled interviews and placement events"
        actions={<AddEventDialog onEventAdded={handleEventAdded} />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <Card className="p-6 lg:col-span-2">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            className="rounded-md border"
            modifiers={{ hasEvent: datesWithEvents }}
            modifiersClassNames={{ hasEvent: "bg-primary/20 font-bold" }}
          />
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">{format(selectedDate, "MMMM d, yyyy")}</h3>
          {loading ? (
            <div className="text-center py-4 text-muted-foreground">Loading...</div>
          ) : allEventsOnSelectedDate.length > 0 ? (
            <div className="space-y-3">
              {eventsOnSelectedDate.map((event) => (
                <Card key={event.id} className="p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{event.title}</h4>
                    <Badge variant="outline">{event.event_type}</Badge>
                  </div>
                  {event.description && <p className="text-sm text-muted-foreground mb-1">{event.description}</p>}
                  <p className="text-xs text-muted-foreground">{format(toDate(event.event_date), "h:mm a")}</p>
                </Card>
              ))}
              {jobsOnSelectedDate.map((job) => (
                <Card key={job.id} className="p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{job.title}</h4>
                    <Badge variant={job.status.toLowerCase() === "active" ? "default" : "secondary"}>Interview</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{job.company}</p>
                  {job.description && <p className="text-sm text-muted-foreground mb-1">{job.description}</p>}
                  <p className="text-xs text-muted-foreground mt-1">{format(toDate(job.scheduled_at), "h:mm a")}</p>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">No events scheduled for this date</p>
          )}
        </Card>
      </div>

      <Card className="p-6 mt-6">
        <h3 className="text-lg font-semibold mb-4">This Week's Events</h3>
        <div className="space-y-2">
          {thisWeeksEvents.length > 0 ? (
            thisWeeksEvents.map((item) => {
              const isJob = "scheduled_at" in item;
              const date = isJob ? toDate((item as Job).scheduled_at) : toDate((item as CalendarEvent).event_date);
              return (
                <div
                  key={item.id}
                  className="flex justify-between items-center py-3 px-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {isJob ? (item as Job).company : (item as CalendarEvent).event_type}
                    </p>
                    {isJob && (item as Job).description && (
                      <p className="text-sm text-muted-foreground">{(item as Job).description}</p>
                    )}
                  </div>
                  <Badge variant="outline" className="ml-2">{format(date, "EEE, MMM d, h:mm a")}</Badge>
                </div>
              );
            })
          ) : (
            <p className="text-center text-muted-foreground py-4">No events this week</p>
          )}
        </div>
      </Card>
    </div>
  );
}
