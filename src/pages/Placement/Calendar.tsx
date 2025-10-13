import { useState, useEffect } from "react";
import { PageHeader } from "@/components/Placement/PageHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format, startOfWeek, endOfWeek, isWithinInterval } from "date-fns";
import { AddEventDialog } from "@/components/Placement/AddEventDialog";

interface Job {
  id: string;
  title: string;
  company: string;
  scheduled_date: string | null;
  status: string;
}

interface CalendarEvent {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  event_type: string;
}

export default function CalendarPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
    fetchEvents();

    const jobsChannel = supabase
      .channel('jobs-calendar-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'jobs' }, () => {
        fetchJobs();
      })
      .subscribe();

    const eventsChannel = supabase
      .channel('events-calendar-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'calendar_events' }, () => {
        fetchEvents();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(jobsChannel);
      supabase.removeChannel(eventsChannel);
    };
  }, []);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .not('scheduled_date', 'is', null)
        .order('scheduled_date', { ascending: true });

      if (error) throw error;
      setJobs((data || []) as Job[]);
    } catch (error: any) {
      toast.error(`Failed to fetch jobs: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('calendar_events')
        .select('*')
        .order('event_date', { ascending: true });

      if (error) throw error;
      setEvents((data || []) as CalendarEvent[]);
    } catch (error: any) {
      toast.error(`Failed to fetch events: ${error.message}`);
    }
  };

  const handleEventAdded = async (newEvent: any) => {
    try {
      const { error } = await supabase.from('calendar_events').insert({
        title: newEvent.title,
        description: newEvent.description,
        event_date: newEvent.event_date,
        event_type: newEvent.event_type,
      });

      if (error) throw error;
      toast.success("Event added successfully!");
      fetchEvents();
    } catch (error: any) {
      toast.error(`Failed to add event: ${error.message}`);
    }
  };

  const eventsOnSelectedDate = selectedDate
    ? events.filter(event => {
        const eventDate = new Date(event.event_date);
        return (
          eventDate.getDate() === selectedDate.getDate() &&
          eventDate.getMonth() === selectedDate.getMonth() &&
          eventDate.getFullYear() === selectedDate.getFullYear()
        );
      })
    : [];

  const jobsOnSelectedDate = selectedDate
    ? jobs.filter(job => {
        if (!job.scheduled_date) return false;
        const jobDate = new Date(job.scheduled_date);
        return (
          jobDate.getDate() === selectedDate.getDate() &&
          jobDate.getMonth() === selectedDate.getMonth() &&
          jobDate.getFullYear() === selectedDate.getFullYear()
        );
      })
    : [];

  const allEventsOnSelectedDate = [...eventsOnSelectedDate, ...jobsOnSelectedDate];

  const datesWithEvents = [
    ...jobs.filter(job => job.scheduled_date).map(job => new Date(job.scheduled_date!)),
    ...events.map(event => new Date(event.event_date))
  ];

  // Get this week's events
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(today, { weekStartsOn: 1 });

  const thisWeeksEvents = [
    ...jobs.filter(job => job.scheduled_date && isWithinInterval(new Date(job.scheduled_date), { start: weekStart, end: weekEnd })),
    ...events.filter(event => isWithinInterval(new Date(event.event_date), { start: weekStart, end: weekEnd }))
  ].sort((a, b) => {
    const dateA = new Date('scheduled_date' in a ? a.scheduled_date! : a.event_date);
    const dateB = new Date('scheduled_date' in b ? b.scheduled_date! : b.event_date);
    return dateA.getTime() - dateB.getTime();
  });

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
            onSelect={setSelectedDate}
            className="rounded-md border"
            modifiers={{
              hasEvent: datesWithEvents
            }}
            modifiersClassNames={{
              hasEvent: "bg-primary/20 font-bold"
            }}
          />
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Select a date'}
          </h3>
          
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
                  {event.description && (
                    <p className="text-sm text-muted-foreground mb-1">{event.description}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(event.event_date), 'h:mm a')}
                  </p>
                </Card>
              ))}
              {jobsOnSelectedDate.map((job) => (
                <Card key={job.id} className="p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{job.title}</h4>
                    <Badge variant={job.status === 'active' ? 'default' : 'secondary'}>
                      Interview
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{job.company}</p>
                  {job.scheduled_date && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {format(new Date(job.scheduled_date), 'h:mm a')}
                    </p>
                  )}
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">
              No events scheduled for this date
            </p>
          )}
        </Card>
      </div>

      <Card className="p-6 mt-6">
        <h3 className="text-lg font-semibold mb-4">This Week's Events</h3>
        <div className="space-y-2">
          {thisWeeksEvents.length > 0 ? (
            thisWeeksEvents.map((item) => {
              const isJob = 'scheduled_date' in item;
              const eventDate = isJob ? item.scheduled_date : item.event_date;
              
              return (
                <div key={item.id} className="flex justify-between items-center py-3 px-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <p className="font-medium">{isJob ? item.title : item.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {isJob ? item.company : item.event_type}
                    </p>
                  </div>
                  {eventDate && (
                    <Badge variant="outline" className="ml-2">
                      {format(new Date(eventDate), 'EEE, MMM d, h:mm a')}
                    </Badge>
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-center text-muted-foreground py-4">
              No events this week
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}
