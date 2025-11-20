"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const profileSchema = z.object({
    specialization: z.string().min(2, "Specialization is required"),
    clinicName: z.string().optional(),
    clinicAddress: z.string().optional(),
    city: z.string().optional(),
    bio: z.string().optional(),
    yearsOfExperience: z.coerce.number().min(0, "Must be 0 or more"),
    feeOnline: z.coerce.number().min(0, "Must be 0 or more"),
    feeInClinic: z.coerce.number().min(0, "Must be 0 or more"),
    supportsOnline: z.boolean(),
    supportsInClinic: z.boolean(),
    appointmentDurationMinutes: z.coerce.number().min(15, "Minimum 15 minutes"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function DoctorProfilePage() {
    const { user } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const form = useForm({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            specialization: "",
            yearsOfExperience: 0,
            feeOnline: 0,
            feeInClinic: 0,
            supportsOnline: false,
            supportsInClinic: false,
            appointmentDurationMinutes: 30,
            clinicName: "",
            clinicAddress: "",
            city: "",
            bio: "",
        },
    });

    useEffect(() => {
        if (!user) return;

        // Fetch existing profile
        fetch(`/api/doctors/me/profile?uid=${user.uid}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.profile) {
                    form.reset(data.profile);
                }
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [user, form]);

    const onSubmit = async (data: ProfileFormValues) => {
        if (!user) return;
        setSaving(true);
        try {
            const res = await fetch("/api/doctors/me/profile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ uid: user.uid, ...data }),
            });

            if (res.ok) {
                alert("Profile updated successfully!");
                router.refresh();
            } else {
                alert("Failed to update profile.");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-center">Loading profile...</div>;

    return (
        <div className="container mx-auto max-w-3xl py-10 px-4">
            <h1 className="text-3xl font-bold mb-8">Doctor Profile</h1>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Specialization</label>
                        <Input {...form.register("specialization")} placeholder="e.g. Cardiologist" />
                        {form.formState.errors.specialization && (
                            <p className="text-red-500 text-sm">{form.formState.errors.specialization.message as string}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Years of Experience</label>
                        <Input type="number" {...form.register("yearsOfExperience")} />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">City</label>
                        <Input {...form.register("city")} placeholder="e.g. New York" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Appointment Duration (minutes)</label>
                        <Input type="number" {...form.register("appointmentDurationMinutes")} />
                    </div>
                </div>

                <div className="space-y-4 border p-4 rounded-lg">
                    <h3 className="font-semibold">Consultation Fees & Types</h3>

                    <div className="flex items-center gap-4">
                        <input type="checkbox" {...form.register("supportsOnline")} id="online" className="w-4 h-4" />
                        <label htmlFor="online">Enable Online Consultations</label>
                    </div>
                    {form.watch("supportsOnline") && (
                        <div className="pl-8">
                            <label className="text-sm font-medium">Online Fee ($)</label>
                            <Input type="number" {...form.register("feeOnline")} className="max-w-[200px]" />
                        </div>
                    )}

                    <div className="flex items-center gap-4 mt-4">
                        <input type="checkbox" {...form.register("supportsInClinic")} id="clinic" className="w-4 h-4" />
                        <label htmlFor="clinic">Enable In-Clinic Consultations</label>
                    </div>
                    {form.watch("supportsInClinic") && (
                        <div className="pl-8 space-y-4">
                            <div>
                                <label className="text-sm font-medium">Clinic Fee ($)</label>
                                <Input type="number" {...form.register("feeInClinic")} className="max-w-[200px]" />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Clinic Name</label>
                                <Input {...form.register("clinicName")} placeholder="e.g. City Health Clinic" />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Clinic Address</label>
                                <Input {...form.register("clinicAddress")} placeholder="123 Medical St" />
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Bio</label>
                    <textarea
                        {...form.register("bio")}
                        className="w-full min-h-[100px] p-3 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Tell patients about yourself..."
                    />
                </div>

                <Button type="submit" disabled={saving} size="lg">
                    {saving ? "Saving..." : "Save Profile"}
                </Button>
            </form>
        </div>
    );
}
