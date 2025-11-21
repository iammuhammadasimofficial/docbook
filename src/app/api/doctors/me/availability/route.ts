import { NextResponse } from "next/server";
import { prisma } from "@/database/client";
import { z } from "zod";

const availabilitySchema = z.object({
    uid: z.string(),
    availability: z.array(z.object({
        dayOfWeek: z.number().min(0).max(6),
        startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
        endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
        isOnline: z.boolean(),
        isInClinic: z.boolean(),
    })),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const result = availabilitySchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({ error: "Invalid input", details: result.error }, { status: 400 });
        }

        const { uid, availability } = result.data;

        // Check if user exists and is a DOCTOR
        const user = await prisma.user.findUnique({
            where: { id: uid },
            include: { doctorProfile: true },
        });

        if (!user || user.role !== "DOCTOR" || !user.doctorProfile) {
            return NextResponse.json({ error: "Unauthorized or Profile Missing" }, { status: 403 });
        }

        const doctorId = user.doctorProfile.id;

        // Transaction to replace availability
        await prisma.$transaction(async (tx) => {
            // Delete existing availability
            await tx.doctorAvailability.deleteMany({
                where: { doctorId },
            });

            // Create new availability
            if (availability.length > 0) {
                await tx.doctorAvailability.createMany({
                    data: availability.map((slot) => ({
                        doctorId,
                        ...slot,
                    })),
                });
            }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error updating availability:", error);
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
        const user = await prisma.user.findUnique({
            where: { id: uid },
            include: { doctorProfile: true },
        });

        if (!user || !user.doctorProfile) {
            return NextResponse.json({ error: "Profile not found" }, { status: 404 });
        }

        const availability = await prisma.doctorAvailability.findMany({
            where: { doctorId: user.doctorProfile.id },
            orderBy: { dayOfWeek: "asc" },
        });

        return NextResponse.json({ availability });
    } catch (error) {
        console.error("Error fetching availability:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
