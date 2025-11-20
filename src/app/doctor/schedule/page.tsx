"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { Plus, Trash2 } from "lucide-react";

interface AvailabilitySlot {
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    isOnline: boolean;
    isInClinic: boolean;
}

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function DoctorAvailabilityPage() {
    const { user } = useAuth();
    const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!user) return;
        fetch(`/api/doctors/me/availability?uid=${user.uid}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.availability) {
                    setSlots(data.availability);
                }
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [user]);

    const addSlot = () => {
        setSlots([
            ...slots,
            { dayOfWeek: 1, startTime: "09:00", endTime: "17:00", isOnline: true, isInClinic: false },
        ]);
    };

    const removeSlot = (index: number) => {
        setSlots(slots.filter((_, i) => i !== index));
    };

    const updateSlot = (index: number, field: keyof AvailabilitySlot, value: any) => {
        const newSlots = [...slots];
        newSlots[index] = { ...newSlots[index], [field]: value };
        setSlots(newSlots);
    };

    const saveAvailability = async () => {
        if (!user) return;
        setSaving(true);
        try {
            const res = await fetch("/api/doctors/me/availability", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ uid: user.uid, availability: slots }),
            });

            if (res.ok) {
                alert("Availability updated!");
            } else {
                alert("Failed to update availability.");
            }
        } catch (error) {
            console.error(error);
            alert("Error saving.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8">Loading...</div>;

    return (
        <div className="container mx-auto max-w-4xl py-10 px-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Manage Availability</h1>
                <Button onClick={addSlot} className="gap-2">
                    <Plus className="h-4 w-4" /> Add Slot
                </Button>
            </div>

            <div className="space-y-4">
                {slots.map((slot, index) => (
                    <div key={index} className="flex flex-wrap items-end gap-4 p-4 border rounded-lg bg-white shadow-sm">
                        <div className="space-y-1">
                            <label className="text-xs font-medium">Day</label>
                            <select
                                value={slot.dayOfWeek}
                                onChange={(e) => updateSlot(index, "dayOfWeek", parseInt(e.target.value))}
                                className="flex h-10 w-[140px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            >
                                {DAYS.map((day, i) => (
                                    <option key={i} value={i}>{day}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-medium">Start Time</label>
                            <Input
                                type="time"
                                value={slot.startTime}
                                onChange={(e) => updateSlot(index, "startTime", e.target.value)}
                                className="w-[120px]"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-medium">End Time</label>
                            <Input
                                type="time"
                                value={slot.endTime}
                                onChange={(e) => updateSlot(index, "endTime", e.target.value)}
                                className="w-[120px]"
                            />
                        </div>

                        <div className="flex items-center gap-4 pb-2">
                            <label className="flex items-center gap-2 text-sm cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={slot.isOnline}
                                    onChange={(e) => updateSlot(index, "isOnline", e.target.checked)}
                                    className="w-4 h-4"
                                />
                                Online
                            </label>
                            <label className="flex items-center gap-2 text-sm cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={slot.isInClinic}
                                    onChange={(e) => updateSlot(index, "isInClinic", e.target.checked)}
                                    className="w-4 h-4"
                                />
                                Clinic
                            </label>
                        </div>

                        <Button variant="ghost" size="icon" onClick={() => removeSlot(index)} className="text-red-500 hover:text-red-600 hover:bg-red-50 ml-auto">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                ))}

                {slots.length === 0 && (
                    <div className="text-center py-12 text-slate-500 border-2 border-dashed rounded-lg">
                        No availability slots added yet. Click "Add Slot" to get started.
                    </div>
                )}
            </div>

            <div className="mt-8 flex justify-end">
                <Button size="lg" onClick={saveAvailability} disabled={saving} className="min-w-[150px]">
                    {saving ? "Saving..." : "Save Changes"}
                </Button>
            </div>
        </div>
    );
}
