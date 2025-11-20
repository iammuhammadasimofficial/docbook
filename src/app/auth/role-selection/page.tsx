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
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="max-w-2xl w-full text-center">
                <h1 className="text-3xl font-bold text-slate-900 mb-4">Choose your role</h1>
                <p className="text-slate-500 mb-12">How would you like to use DocBook?</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <div
                        className={`bg-white p-8 rounded-xl shadow-sm border-2 cursor-pointer transition-all ${role === "PATIENT" ? "border-blue-600 ring-2 ring-blue-100" : "border-transparent hover:border-slate-200"}`}
                        onClick={() => setRole("PATIENT")}
                    >
                        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <User className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">I am a Patient</h3>
                        <p className="text-sm text-slate-500">Book appointments, find doctors, and manage your health records.</p>
                    </div>

                    <div
                        className={`bg-white p-8 rounded-xl shadow-sm border-2 cursor-pointer transition-all ${role === "DOCTOR" ? "border-purple-600 ring-2 ring-purple-100" : "border-transparent hover:border-slate-200"}`}
                        onClick={() => setRole("DOCTOR")}
                    >
                        <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Stethoscope className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">I am a Doctor</h3>
                        <p className="text-sm text-slate-500">Manage your schedule, patients, and grow your practice.</p>
                    </div>
                </div>

                <Button
                    size="lg"
                    className="w-full md:w-auto px-12"
                    disabled={!role || loading}
                    onClick={handleContinue}
                >
                    {loading ? "Setting up..." : "Continue"}
                </Button>
            </div>
        </div>
    );
}
