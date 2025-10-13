-- Enable DELETE policies for jobs table
CREATE POLICY "Allow delete to jobs"
ON public.jobs
FOR DELETE
USING (true);

-- Enable DELETE policies for placement_officers table
CREATE POLICY "Allow delete to placement_officers"
ON public.placement_officers
FOR DELETE
USING (true);

-- Enable DELETE policies for company_rounds table
CREATE POLICY "Allow delete to company_rounds"
ON public.company_rounds
FOR DELETE
USING (true);

-- Create events table for manual calendar events
CREATE TABLE public.calendar_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  event_date TIMESTAMP WITH TIME ZONE NOT NULL,
  event_type TEXT NOT NULL DEFAULT 'other',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for calendar_events
ALTER TABLE public.calendar_events ENABLE ROW LEVEL SECURITY;

-- Create policies for calendar_events
CREATE POLICY "Allow public read access to calendar_events"
ON public.calendar_events
FOR SELECT
USING (true);

CREATE POLICY "Allow insert to calendar_events"
ON public.calendar_events
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Allow update to calendar_events"
ON public.calendar_events
FOR UPDATE
USING (true);

CREATE POLICY "Allow delete to calendar_events"
ON public.calendar_events
FOR DELETE
USING (true);

-- Add trigger for updated_at on calendar_events
CREATE TRIGGER update_calendar_events_updated_at
BEFORE UPDATE ON public.calendar_events
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for calendar_events
ALTER PUBLICATION supabase_realtime ADD TABLE public.calendar_events;