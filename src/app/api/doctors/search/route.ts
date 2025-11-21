import { NextResponse } from "next/server";
import { prisma } from "@/database/client";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";
    const city = searchParams.get("city") || "";
    const specialty = searchParams.get("specialty") || "";

    try {
        const doctors = await prisma.doctorProfile.findMany({
            where: {
                isApproved: true, // Only show approved doctors
                AND: [
                    {
                        OR: [
                            { user: { name: { contains: query } } },
                            { specialization: { contains: query } },
                            { clinicName: { contains: query } },
                        ],
                    },
                    city ? { city: { contains: city } } : {},
                    specialty ? { specialization: { contains: specialty } } : {},
                ],
            },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                        phone: true,
                    },
                },
                availability: true,
            },
        });

        return NextResponse.json({ doctors });
    } catch (error) {
        console.error("Error searching doctors:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
