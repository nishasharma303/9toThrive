import { useEffect, useState } from "react";
import { PageHeader } from "@/components/Placement/PageHeader";
import { Link } from "react-router-dom";
import { StatCard } from "@/components/Placement/StatCard";
import { Users, CheckCircle, XCircle, Briefcase, FileText, CalendarCheck } from "lucide-react";
import { db } from "@/firebaseConfig";
import { collection, onSnapshot, Timestamp } from "firebase/firestore";
import { formatDistanceToNow } from "date-fns";

interface Activity {
  id: string;
  type: "job" | "event";
  title: string;
  company?: string;
  event_date?: Timestamp;
  created_at: Timestamp;
}
import { Button } from "@/components/ui/button";
import { Users, CheckCircle, XCircle, Briefcase, FileText, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const [studentsCount, setStudentsCount] = useState(0);
  const [verifiedCount, setVerifiedCount] = useState(0);
  const [unverifiedCount, setUnverifiedCount] = useState(0);
  const [recruitersCount, setRecruitersCount] = useState(0);
  const [jobsCount, setJobsCount] = useState(0);
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);

  useEffect(() => {
    // Students - real-time updates
    const unsubscribeStudents = onSnapshot(collection(db, "students"), (snapshot) => {
      const students = snapshot.docs.map((doc) => doc.data() as any);
      const verified = students.filter((s) => s.verification_status === "verified").length;
      const unverified = students.filter((s) => s.verification_status !== "verified").length;

      setStudentsCount(students.length);
      setVerifiedCount(verified);
      setUnverifiedCount(unverified);
    });

    // Recruiters
    const unsubscribeRecruiters = onSnapshot(collection(db, "recruiter"), (snapshot) => {
      setRecruitersCount(snapshot.docs.length);
    });

    // Jobs
    const unsubscribeJobs = onSnapshot(collection(db, "jobs"), (snapshot) => {
      const jobs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as any[];

      // Jobs this month
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      const jobsThisMonth = jobs.filter((job) => job.created_at?.toDate() >= startOfMonth);
      setJobsCount(jobsThisMonth.length);

      // Job activities
      const jobActivities: Activity[] = jobs.map((job) => ({
        id: job.id,
        type: "job",
        title: `Job Posted: ${job.title}`,
        company: job.company,
        created_at: job.created_at,
      }));

      setRecentActivities((prev) => {
        const existingEvents: Activity[] = prev.filter((a) => a.type === "event");
        const merged = [...jobActivities, ...existingEvents].sort(
          (a, b) => b.created_at.toDate().getTime() - a.created_at.toDate().getTime()
        );
        return merged.slice(0, 5);
      });
    });

    // Calendar events
    const unsubscribeEvents = onSnapshot(collection(db, "calendar_events"), (snapshot) => {
      const events = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as any[];

      const eventActivities: Activity[] = events.map((event) => ({
        id: event.id,
        type: "event",
        title: `Event: ${event.title} (${event.event_type})`,
        event_date: event.event_date,
        created_at: event.created_at,
      }));

      setRecentActivities((prev) => {
        const existingJobs: Activity[] = prev.filter((a) => a.type === "job");
        const merged = [...existingJobs, ...eventActivities].sort(
          (a, b) => b.created_at.toDate().getTime() - a.created_at.toDate().getTime()
        );
        return merged.slice(0, 5);
      });
    });

    return () => {
      unsubscribeStudents();
      unsubscribeRecruiters();
      unsubscribeJobs();
      unsubscribeEvents();
    };
  }, []);

  const stats = [
    {
      title: "Total Registered Students",
      value: studentsCount.toString(),
      icon: Users,
      description: "Active students in database",
    },
    {
      title: "Verified Students",
      value: verifiedCount.toString(),
      icon: CheckCircle,
      description: `${studentsCount > 0 ? ((verifiedCount / studentsCount) * 100).toFixed(1) : 0}% of total students`,
    },
    {
      title: "Unverified Students",
      value: unverifiedCount.toString(),
      icon: XCircle,
      description: "Pending verification",
    },
    {
      title: "Total Recruiters",
      value: recruitersCount.toString(),
      icon: Briefcase,
      description: "Active recruiting companies",
    },
    {
      title: "Jobs Posted This Month",
      value: jobsCount.toString(),
      icon: FileText,
      description: "New opportunities",
    },
    {
      title: "Placement Rate",
      value: studentsCount > 0 ? `${((verifiedCount / studentsCount) * 100).toFixed(1)}%` : "0%",
      icon: CalendarCheck,
      description: "Current academic year",
    },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-end mb-4">
        <Link to="/">
          <Button variant="ghost">Back to Home</Button>
        </Link>
      </div>

      <PageHeader
        title="Dashboard"
        description="Overview of placement cell activities and metrics"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Recent Activity
        </h2>
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="space-y-4">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between py-3 border-b border-border last:border-0"
                >
                  <div>
                    <p className="font-medium text-foreground">{activity.title}</p>
                    {activity.company && <p className="text-sm text-muted-foreground">{activity.company}</p>}
                    {activity.event_date && (
                      <p className="text-sm text-muted-foreground">
                        Event Date: {activity.event_date.toDate().toLocaleString()}
                      </p>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {formatDistanceToNow(activity.created_at.toDate(), { addSuffix: true })}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground">No recent activity</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
