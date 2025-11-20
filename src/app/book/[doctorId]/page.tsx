"use client";

import { useState } from "react";
import { Navbar } from "@/components/shared/Navbar";
import { Stepper } from "@/components/shared/Stepper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, CreditCard, MapPin, Video, User, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
    { id: 1, name: "Doctor" },
    { id: 2, name: "Type" },
    { id: 3, name: "Time" },
    { id: 4, name: "Details" },
    { id: 5, name: "Payment" },
];

export default function BookingPage({ params }: { params: { doctorId: string } }) {
    const [currentStep, setCurrentStep] = useState(1);
    const [bookingData, setBookingData] = useState({
        type: "ONLINE", // ONLINE | IN_CLINIC
        date: "",
        time: "",
        patientName: "",
        patientAge: "",
        patientGender: "Male",
        illnessDescription: "",
        medicalHistory: "",
        paymentMethod: "CASH", // CASH | STRIPE
    });

    const handleNext = () => {
        if (currentStep < 5) setCurrentStep(currentStep + 1);
    };

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <div className="container mx-auto px-4 py-8 max-w-3xl">
                <div className="mb-8">
                    <Stepper steps={STEPS} currentStep={currentStep} />
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                    {/* Header for current step */}
                    <div className="bg-slate-50 px-6 py-4 border-b border-slate-100">
                        <h2 className="text-lg font-semibold text-slate-800">
                            {currentStep === 1 && "Confirm Doctor"}
                            {currentStep === 2 && "Choose Appointment Type"}
                            {currentStep === 3 && "Select Date & Time"}
                            {currentStep === 4 && "Patient Details"}
                            {currentStep === 5 && "Review & Pay"}
                        </h2>
                    </div>

                    <div className="p-6 min-h-[400px]">
                        {/* STEP 1: Doctor Info */}
                        {currentStep === 1 && (
                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className="w-24 h-24 bg-slate-200 rounded-full" />
                                <div>
                                    <h3 className="text-xl font-bold">Dr. Name Placeholder</h3>
                                    <p className="text-slate-500">Cardiologist • MBBS, FCPS</p>
                                </div>
                                <div className="flex gap-4 text-sm text-slate-600">
                                    <div className="flex items-center gap-1">
                                        <Video className="h-4 w-4" /> Online ($20)
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin className="h-4 w-4" /> In-Clinic ($30)
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STEP 2: Type Selection */}
                        {currentStep === 2 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div
                                    className={cn(
                                        "p-6 border-2 rounded-xl cursor-pointer transition-all hover:border-blue-400",
                                        bookingData.type === "ONLINE" ? "border-blue-600 bg-blue-50" : "border-slate-200"
                                    )}
                                    onClick={() => setBookingData({ ...bookingData, type: "ONLINE" })}
                                >
                                    <Video className="h-8 w-8 text-blue-600 mb-4" />
                                    <h3 className="font-bold text-lg">Video Consultation</h3>
                                    <p className="text-sm text-slate-500 mt-2">Consult with the doctor from home via high-quality video call.</p>
                                    <div className="mt-4 font-bold text-blue-600">$20</div>
                                </div>

                                <div
                                    className={cn(
                                        "p-6 border-2 rounded-xl cursor-pointer transition-all hover:border-purple-400",
                                        bookingData.type === "IN_CLINIC" ? "border-purple-600 bg-purple-50" : "border-slate-200"
                                    )}
                                    onClick={() => setBookingData({ ...bookingData, type: "IN_CLINIC" })}
                                >
                                    <MapPin className="h-8 w-8 text-purple-600 mb-4" />
                                    <h3 className="font-bold text-lg">In-Clinic Visit</h3>
                                    <p className="text-sm text-slate-500 mt-2">Visit the doctor personally at their clinic for a checkup.</p>
                                    <div className="mt-4 font-bold text-purple-600">$30</div>
                                </div>
                            </div>
                        )}

                        {/* STEP 3: Date & Time */}
                        {currentStep === 3 && (
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Select Date</label>
                                    <div className="flex gap-2 overflow-x-auto pb-2">
                                        {[0, 1, 2, 3, 4].map((day) => (
                                            <button
                                                key={day}
                                                className={cn(
                                                    "flex flex-col items-center justify-center min-w-[80px] h-20 rounded-lg border transition-colors",
                                                    bookingData.date === `2025-11-${20 + day}` ? "bg-blue-600 text-white border-blue-600" : "bg-white border-slate-200 hover:border-blue-300"
                                                )}
                                                onClick={() => setBookingData({ ...bookingData, date: `2025-11-${20 + day}` })}
                                            >
                                                <span className="text-xs uppercase">Nov</span>
                                                <span className="text-xl font-bold">{20 + day}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Select Time</label>
                                    <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                                        {["10:00", "10:30", "11:00", "11:30", "12:00", "14:00", "14:30", "15:00"].map((time) => (
                                            <button
                                                key={time}
                                                className={cn(
                                                    "py-2 px-4 rounded-md text-sm font-medium border transition-colors",
                                                    bookingData.time === time ? "bg-blue-600 text-white border-blue-600" : "bg-white border-slate-200 hover:border-blue-300"
                                                )}
                                                onClick={() => setBookingData({ ...bookingData, time })}
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STEP 4: Patient Details (NEW) */}
                        {currentStep === 4 && (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Patient Name</label>
                                        <Input
                                            placeholder="Full Name"
                                            value={bookingData.patientName}
                                            onChange={(e) => setBookingData({ ...bookingData, patientName: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Age</label>
                                        <Input
                                            type="number"
                                            placeholder="Age"
                                            value={bookingData.patientAge}
                                            onChange={(e) => setBookingData({ ...bookingData, patientAge: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Gender</label>
                                    <div className="flex gap-4">
                                        {["Male", "Female", "Other"].map((g) => (
                                            <label key={g} className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    checked={bookingData.patientGender === g}
                                                    onChange={() => setBookingData({ ...bookingData, patientGender: g })}
                                                    className="w-4 h-4 text-blue-600"
                                                />
                                                <span>{g}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Describe Illness / Symptoms</label>
                                    <textarea
                                        className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                        placeholder="Briefly describe what you are feeling..."
                                        value={bookingData.illnessDescription}
                                        onChange={(e) => setBookingData({ ...bookingData, illnessDescription: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Medical History (Optional)</label>
                                    <textarea
                                        className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                        placeholder="Any past surgeries, allergies, or chronic conditions..."
                                        value={bookingData.medicalHistory}
                                        onChange={(e) => setBookingData({ ...bookingData, medicalHistory: e.target.value })}
                                    />
                                </div>
                            </div>
                        )}

                        {/* STEP 5: Payment & Confirm */}
                        {currentStep === 5 && (
                            <div className="space-y-6">
                                <div className="bg-slate-50 p-4 rounded-lg space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Doctor</span>
                                        <span className="font-medium">Dr. Name Placeholder</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Date & Time</span>
                                        <span className="font-medium">{bookingData.date} at {bookingData.time}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Type</span>
                                        <span className="font-medium">{bookingData.type === "ONLINE" ? "Video Consultation" : "In-Clinic Visit"}</span>
                                    </div>
                                    <div className="border-t border-slate-200 my-2 pt-2 flex justify-between font-bold text-lg">
                                        <span>Total</span>
                                        <span>{bookingData.type === "ONLINE" ? "$20" : "$30"}</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Payment Method</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div
                                            className={cn(
                                                "p-4 border rounded-lg cursor-pointer flex flex-col items-center gap-2",
                                                bookingData.paymentMethod === "CASH" ? "border-blue-600 bg-blue-50" : "border-slate-200"
                                            )}
                                            onClick={() => setBookingData({ ...bookingData, paymentMethod: "CASH" })}
                                        >
                                            <div className="font-bold">Cash</div>
                                            <span className="text-xs text-slate-500">Pay at Clinic</span>
                                        </div>
                                        <div
                                            className={cn(
                                                "p-4 border rounded-lg cursor-pointer flex flex-col items-center gap-2",
                                                bookingData.paymentMethod === "STRIPE" ? "border-blue-600 bg-blue-50" : "border-slate-200"
                                            )}
                                            onClick={() => setBookingData({ ...bookingData, paymentMethod: "STRIPE" })}
                                        >
                                            <CreditCard className="h-5 w-5" />
                                            <div className="font-bold">Card</div>
                                            <span className="text-xs text-slate-500">Secure via Stripe</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer Actions */}
                    <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex justify-between">
                        <Button
                            variant="outline"
                            onClick={handleBack}
                            disabled={currentStep === 1}
                        >
                            Back
                        </Button>
                        <Button
                            onClick={handleNext}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            {currentStep === 5 ? "Confirm Booking" : "Next"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
