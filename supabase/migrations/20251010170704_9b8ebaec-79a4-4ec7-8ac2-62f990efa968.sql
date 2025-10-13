-- Add scheduled_date to jobs table
ALTER TABLE public.jobs ADD COLUMN IF NOT EXISTS scheduled_date timestamp with time zone;

-- Create placement_officers table
CREATE TABLE IF NOT EXISTS public.placement_officers (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  assigned_companies text[] DEFAULT '{}',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS for placement_officers
ALTER TABLE public.placement_officers ENABLE ROW LEVEL SECURITY;

-- Create policies for placement_officers
CREATE POLICY "Allow public read access to placement_officers"
ON public.placement_officers FOR SELECT
USING (true);

CREATE POLICY "Allow insert to placement_officers"
ON public.placement_officers FOR INSERT
WITH CHECK (true);

CREATE POLICY "Allow update to placement_officers"
ON public.placement_officers FOR UPDATE
USING (true);

-- Create company_rounds table for tracking recruitment stages
CREATE TABLE IF NOT EXISTS public.company_rounds (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name text NOT NULL,
  job_role text NOT NULL,
  current_stage text NOT NULL DEFAULT 'Application Screening',
  stages jsonb DEFAULT '[]'::jsonb,
  total_applicants integer DEFAULT 0,
  students_qualified jsonb DEFAULT '[]'::jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS for company_rounds
ALTER TABLE public.company_rounds ENABLE ROW LEVEL SECURITY;

-- Create policies for company_rounds
CREATE POLICY "Allow public read access to company_rounds"
ON public.company_rounds FOR SELECT
USING (true);

CREATE POLICY "Allow insert to company_rounds"
ON public.company_rounds FOR INSERT
WITH CHECK (true);

CREATE POLICY "Allow update to company_rounds"
ON public.company_rounds FOR UPDATE
USING (true);

-- Add triggers for updated_at
CREATE TRIGGER update_placement_officers_updated_at
BEFORE UPDATE ON public.placement_officers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_company_rounds_updated_at
BEFORE UPDATE ON public.company_rounds
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for new tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.placement_officers;
ALTER PUBLICATION supabase_realtime ADD TABLE public.company_rounds;