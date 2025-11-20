import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const profileSchema = z.object({
    uid: z.string(),
    specialization: z.string().min(2),
    clinicName: z.string().optional(),
    clinicAddress: z.string().optional(),
    city: z.string().optional(),
    bio: z.string().optional(),
    yearsOfExperience: z.number().min(0),
    feeOnline: z.number().min(0),
    feeInClinic: z.number().min(0),
    supportsOnline: z.boolean(),
    supportsInClinic: z.boolean(),
    appointmentDurationMinutes: z.number().min(15),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const result = profileSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({ error: "Invalid input", details: result.error }, { status: 400 });
        }

        const { uid, ...data } = result.data;

        // Check if user exists and is a DOCTOR
        const user = await prisma.user.findUnique({
            where: { id: uid },
        });

        if (!user || user.role !== "DOCTOR") {
            return NextResponse.json({ error: "Unauthorized or Invalid Role" }, { status: 403 });
        }

        // Upsert profile
        const profile = await prisma.doctorProfile.upsert({
            where: { userId: uid },
            update: data,
            create: {
                userId: uid,
                ...data,
            },
        });

        return NextResponse.json({ profile });
    } catch (error) {
        console.error("Error updating profile:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const uid = searchParams.get("uid");

    if (!uid) {
        return NextResponse.json({ error: "Missing UID" }, { status: 400 });
    }

    try {
        const profile = await prisma.doctorProfile.findUnique({
            where: { userId: uid },
        });

        return NextResponse.json({ profile });
    } catch (error) {
        console.error("Error fetching profile:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
