-- Create students table
CREATE TABLE public.students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  reg_no text UNIQUE NOT NULL,
  branch text NOT NULL,
  skills text[] DEFAULT '{}',
  verification_status text NOT NULL DEFAULT 'unverified' CHECK (verification_status IN ('verified', 'unverified', 'pending')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create recruiters table
CREATE TABLE public.recruiters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  contact_name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  domain text,
  active_postings integer DEFAULT 0,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'flagged')),
  average_salary text,
  job_roles text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create jobs table
CREATE TABLE public.jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  company text NOT NULL,
  role text NOT NULL,
  description text,
  location text,
  salary text,
  deadline timestamptz,
  applicants integer DEFAULT 0,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'closed', 'draft')),
  flagged boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create notifications table
CREATE TABLE public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES public.students(id) ON DELETE CASCADE,
  message text NOT NULL,
  type text NOT NULL CHECK (type IN ('email', 'sms', 'dashboard')),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recruiters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for students (public read for placement admins)
CREATE POLICY "Allow public read access to students"
  ON public.students FOR SELECT
  USING (true);

CREATE POLICY "Allow insert to students"
  ON public.students FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow update to students"
  ON public.students FOR UPDATE
  USING (true);

-- RLS Policies for recruiters
CREATE POLICY "Allow public read access to recruiters"
  ON public.recruiters FOR SELECT
  USING (true);

CREATE POLICY "Allow insert to recruiters"
  ON public.recruiters FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow update to recruiters"
  ON public.recruiters FOR UPDATE
  USING (true);

-- RLS Policies for jobs
CREATE POLICY "Allow public read access to jobs"
  ON public.jobs FOR SELECT
  USING (true);

CREATE POLICY "Allow insert to jobs"
  ON public.jobs FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow update to jobs"
  ON public.jobs FOR UPDATE
  USING (true);

-- RLS Policies for notifications
CREATE POLICY "Allow public read access to notifications"
  ON public.notifications FOR SELECT
  USING (true);

CREATE POLICY "Allow insert to notifications"
  ON public.notifications FOR INSERT
  WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_students_updated_at
  BEFORE UPDATE ON public.students
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_recruiters_updated_at
  BEFORE UPDATE ON public.recruiters
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_jobs_updated_at
  BEFORE UPDATE ON public.jobs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for all tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.students;
ALTER PUBLICATION supabase_realtime ADD TABLE public.recruiters;
ALTER PUBLICATION supabase_realtime ADD TABLE public.jobs;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;