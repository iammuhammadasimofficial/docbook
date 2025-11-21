"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User, Stethoscope } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function RoleSelectionPage() {
  const [role, setRole] = useState<"PATIENT" | "DOCTOR" | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  const handleContinue = async () => {
    if (!role || !user) return;
    setLoading(true);
    try {
      // Call API to update user role
      const res = await fetch("/api/auth/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
          phone: user.phoneNumber,
          role: role,
        }),
      });

      if (res.ok) {
        if (role === "DOCTOR") {
          router.push("/doctor/onboarding");
        } else {
          router.push("/patient/dashboard");
        }
      } else {
        console.error("Failed to update role");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-2xl text-center">
        <h1 className="mb-4 text-3xl font-bold text-slate-900">
          Choose your role
        </h1>
        <p className="mb-12 text-slate-500">
          How would you like to use DocBook?
        </p>

        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div
            className={`cursor-pointer rounded-xl border-2 bg-white p-8 shadow-sm transition-all ${role === "PATIENT" ? "border-blue-600 ring-2 ring-blue-100" : "border-transparent hover:border-slate-200"}`}
            onClick={() => setRole("PATIENT")}
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <User className="h-8 w-8" />
            </div>
            <h3 className="mb-2 text-xl font-bold">I am a Patient</h3>
            <p className="text-sm text-slate-500">
              Book appointments, find doctors, and manage your health records.
            </p>
          </div>

          <div
            className={`cursor-pointer rounded-xl border-2 bg-white p-8 shadow-sm transition-all ${role === "DOCTOR" ? "border-purple-600 ring-2 ring-purple-100" : "border-transparent hover:border-slate-200"}`}
            onClick={() => setRole("DOCTOR")}
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-purple-600">
              <Stethoscope className="h-8 w-8" />
            </div>
            <h3 className="mb-2 text-xl font-bold">I am a Doctor</h3>
            <p className="text-sm text-slate-500">
              Manage your schedule, patients, and grow your practice.
            </p>
          </div>
        </div>

        <Button
          size="lg"
          className="w-full px-12 md:w-auto"
          disabled={!role || loading}
          onClick={handleContinue}
        >
          {loading ? "Setting up..." : "Continue"}
        </Button>
      </div>
    </div>
  );
}
