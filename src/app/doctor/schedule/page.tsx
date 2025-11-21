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

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

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
      {
        dayOfWeek: 1,
        startTime: "09:00",
        endTime: "17:00",
        isOnline: true,
        isInClinic: false,
      },
    ]);
  };

  const removeSlot = (index: number) => {
    setSlots(slots.filter((_, i) => i !== index));
  };

  const updateSlot = (
    index: number,
    field: keyof AvailabilitySlot,
    value: string | number | boolean
  ) => {
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
    <div className="container mx-auto max-w-4xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Availability</h1>
        <Button onClick={addSlot} className="gap-2">
          <Plus className="h-4 w-4" /> Add Slot
        </Button>
      </div>

      <div className="space-y-4">
        {slots.map((slot, index) => (
          <div
            key={index}
            className="flex flex-wrap items-end gap-4 rounded-lg border bg-white p-4 shadow-sm"
          >
            <div className="space-y-1">
              <label className="text-xs font-medium">Day</label>
              <select
                value={slot.dayOfWeek}
                onChange={(e) =>
                  updateSlot(index, "dayOfWeek", parseInt(e.target.value))
                }
                className="border-input bg-background ring-offset-background focus-visible:ring-ring flex h-10 w-[140px] rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {DAYS.map((day, i) => (
                  <option key={i} value={i}>
                    {day}
                  </option>
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
              <label className="flex cursor-pointer items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={slot.isOnline}
                  onChange={(e) =>
                    updateSlot(index, "isOnline", e.target.checked)
                  }
                  className="h-4 w-4"
                />
                Online
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={slot.isInClinic}
                  onChange={(e) =>
                    updateSlot(index, "isInClinic", e.target.checked)
                  }
                  className="h-4 w-4"
                />
                Clinic
              </label>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeSlot(index)}
              className="ml-auto text-red-500 hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}

        {slots.length === 0 && (
          <div className="rounded-lg border-2 border-dashed py-12 text-center text-slate-500">
            No availability slots added yet. Click &quot;Add Slot&quot; to get
            started.
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-end">
        <Button
          size="lg"
          onClick={saveAvailability}
          disabled={saving}
          className="min-w-[150px]"
        >
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
