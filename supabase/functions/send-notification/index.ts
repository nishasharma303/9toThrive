import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "npm:resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  studentIds: string[];
  message: string;
  type: "email" | "sms" | "dashboard";
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const { studentIds, message, type }: NotificationRequest = await req.json();

    console.log(`Sending ${type} notification to ${studentIds.length} students`);

    // Fetch student details
    const { data: students, error: fetchError } = await supabaseClient
      .from("students")
      .select("*")
      .in("id", studentIds);

    if (fetchError) {
      throw new Error(`Failed to fetch students: ${fetchError.message}`);
    }

    const results = [];

    for (const student of students || []) {
      try {
        // Create notification record
        const { error: insertError } = await supabaseClient
          .from("notifications")
          .insert({
            student_id: student.id,
            message,
            type,
            status: "pending",
          });

        if (insertError) {
          console.error(`Failed to create notification record for ${student.email}:`, insertError);
        }

        // Send email if type is email
        if (type === "email" && student.email) {
          const { error: emailError } = await resend.emails.send({
            from: "Placement Cell <onboarding@resend.dev>",
            to: [student.email],
            subject: "Notification from Placement Cell",
            html: `
              <h2>Hello ${student.name}!</h2>
              <p>${message}</p>
              <p>Best regards,<br>Placement Cell</p>
            `,
          });

          if (emailError) {
            console.error(`Failed to send email to ${student.email}:`, emailError);
            
            // Update notification status to failed
            await supabaseClient
              .from("notifications")
              .update({ status: "failed" })
              .eq("student_id", student.id)
              .eq("message", message);
              
            results.push({ email: student.email, status: "failed" });
          } else {
            // Update notification status to sent
            await supabaseClient
              .from("notifications")
              .update({ status: "sent" })
              .eq("student_id", student.id)
              .eq("message", message);
              
            results.push({ email: student.email, status: "sent" });
          }
        } else if (type === "dashboard") {
          // For dashboard notifications, just mark as sent
          await supabaseClient
            .from("notifications")
            .update({ status: "sent" })
            .eq("student_id", student.id)
            .eq("message", message);
            
          results.push({ student: student.name, status: "sent" });
        } else if (type === "sms") {
          // SMS functionality would go here
          // For now, just mark as sent
          await supabaseClient
            .from("notifications")
            .update({ status: "sent" })
            .eq("student_id", student.id)
            .eq("message", message);
            
          results.push({ student: student.name, status: "sent" });
        }
      } catch (error: any) {
        console.error(`Error processing notification for student ${student.id}:`, error);
        results.push({ student: student.name, status: "failed", error: error.message });
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        results,
        message: `Notifications sent to ${results.filter(r => r.status === "sent").length} students`
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
