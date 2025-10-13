import React, { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebaseConfig"; // your firebase config file
import { db } from "@/firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Props = {
  trigger: React.ReactNode;
};

export default function SignInDialog({ trigger }: Props) {
  const [role, setRole] = useState<string>("student");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
  setErrorMsg("");
}, [mode]);

  async function onSubmit(e: React.FormEvent) {
  e.preventDefault();
  const form = e.currentTarget as HTMLFormElement;
  const data = new FormData(form);
  const email = String(data.get("email") || "");
  const password = String(data.get("password") || "");

  try {
    if (mode === "signin") {
      // 🔹 Sign in existing user
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 🔹 Fetch their role from Firestore
      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);

      if (snap.exists()) {
        const userData = snap.data();
        const role = userData.role;
        console.log("✅ Logged in as", role);

        // route based on role
        if (role === "student") navigate("/student", { replace: true });
        else if (role === "recruiter") navigate("/recruitment", { replace: true });
        else navigate("/placement", { replace: true });
      } else {
        console.log("⚠️ No role found in Firestore!");
      }
    } 
    else {
      // 🔹 Sign up new user
      const confirm = String(data.get("confirmPassword") || "");
      if (password !== confirm) return alert("Passwords do not match");

      const name = String(data.get("name") || "");
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 🔹 Store user role & name in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        role,
        createdAt: new Date().toISOString(),
      });

      console.log("✅ Account created with role:", role);

      // route based on role
      if (role === "student") navigate("/student", { replace: true });
      else if (role === "recruiter") navigate("/recruitment", { replace: true });
      else navigate("/placement", { replace: true });
    }

    setOpen(false);
  } catch (error: any) {
  console.error("❌ Auth error:", error.message);
  let msg = "";

  switch (error.code) {
    case "auth/user-not-found":
      msg = "No account found with this email. Please sign up first.";
      break;
    case "auth/email-already-in-use":
      msg = "This email is already registered. Please sign in instead.";
      break;
    case "auth/wrong-password":
    case "auth/invalid-credential":
      msg = "Invalid email or password. Please check your credentials and try again.";
      break;
    case "auth/too-many-requests":
      msg = "Too many failed attempts. Please wait a few minutes before trying again.";
      break;
    case "auth/invalid-email":
      msg = "Please enter a valid email address.";
      break;
    default:
      msg = "Something went wrong. Please try again later.";
  }

  setErrorMsg(msg);
}
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === "signin" ? "Sign In" : "Create Account"}</DialogTitle>
          <DialogDescription>
            {mode === "signin"
              ? "Access your 9toThrive dashboard."
              : "Create an account to get started."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4 mt-2">
          {mode === "signup" && (
            <div>
              <label className="block text-sm mb-1">Full name</label>
              <Input name="name" type="text" placeholder="Your full name" />
            </div>
          )}

          <div>
            <label className="block text-sm mb-1">Email</label>
            <Input name="email" type="email" placeholder="you@school.edu" required />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <Input name="password" type="password" placeholder="Enter password" required />
          </div>

          {mode === "signup" && (
            <div>
              <label className="block text-sm mb-1">Confirm password</label>
              <Input name="confirmPassword" type="password" placeholder="Repeat password" required />
            </div>
          )}

          <div>
            <label className="block text-sm mb-2">Role</label>
            <RadioGroup value={role} onValueChange={setRole} className="flex gap-4">
              <label className="inline-flex items-center gap-2">
                <RadioGroupItem value="student" />
                <span className="text-sm">Student</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <RadioGroupItem value="recruiter" />
                <span className="text-sm">Recruiter</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <RadioGroupItem value="placement" />
                <span className="text-sm">Placement Cell</span>
              </label>
            </RadioGroup>
          </div>

          {errorMsg && (
            <p className="text-sm text-red-500 text-center">{errorMsg}</p>
            )}

          <DialogFooter className="flex justify-end gap-2">
            {mode === "signin" ? (
              <>
                <Button variant="ghost" type="button" onClick={() => setMode("signup")}>
                  Create account
                </Button>
                <Button type="submit">Sign In</Button>
              </>
            ) : (
              <>
                <Button variant="ghost" type="button" onClick={() => setMode("signin")}>
                  Already have an account?
                </Button>
                <Button type="submit">Create Account</Button>
              </>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}