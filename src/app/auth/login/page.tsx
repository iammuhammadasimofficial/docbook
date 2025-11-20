"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState<"PHONE" | "OTP">("PHONE");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // NOTE: Real Firebase Phone Auth requires a valid domain and ReCaptcha setup.
    // For this MVP demo, we will simulate the flow or use a test number if configured.

    const handleSendOtp = async () => {
        setLoading(true);
        try {
            // In a real app:
            // const verifier = new RecaptchaVerifier(auth, 'recaptcha-container', {});
            // const confirmation = await signInWithPhoneNumber(auth, phoneNumber, verifier);
            // window.confirmationResult = confirmation;

            // For MVP Demo:
            console.log("Sending OTP to", phoneNumber);
            setTimeout(() => {
                setStep("OTP");
                setLoading(false);
            }, 1000);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        setLoading(true);
        try {
            // In a real app:
            // await window.confirmationResult.confirm(otp);

            // For MVP Demo:
            console.log("Verifying OTP", otp);
            setTimeout(() => {
                router.push("/dashboard"); // Redirect to dashboard
                setLoading(false);
            }, 1000);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-slate-900">Welcome Back</h1>
                    <p className="text-slate-500">Login to manage your appointments</p>
                </div>

                {step === "PHONE" ? (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Phone Number</label>
                            <Input
                                placeholder="+92 300 1234567"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>
                        <div id="recaptcha-container"></div>
                        <Button
                            className="w-full bg-blue-600 hover:bg-blue-700"
                            onClick={handleSendOtp}
                            disabled={loading || !phoneNumber}
                        >
                            {loading ? "Sending..." : "Send OTP"}
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Enter OTP</label>
                            <Input
                                placeholder="123456"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                maxLength={6}
                            />
                        </div>
                        <Button
                            className="w-full bg-blue-600 hover:bg-blue-700"
                            onClick={handleVerifyOtp}
                            disabled={loading || otp.length !== 6}
                        >
                            {loading ? "Verifying..." : "Verify & Login"}
                        </Button>
                        <button
                            className="w-full text-sm text-slate-500 hover:text-blue-600"
                            onClick={() => setStep("PHONE")}
                        >
                            Change Phone Number
                        </button>
                    </div>
                )}

                <div className="mt-6 text-center text-sm text-slate-500">
                    Don't have an account? <Link href="/auth/login?mode=signup" className="text-blue-600 font-semibold">Sign Up</Link>
                </div>
            </div>
        </div>
    );
}
