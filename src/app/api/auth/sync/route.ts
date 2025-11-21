import { NextResponse } from "next/server";
import { prisma } from "@/database/client";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { uid, email, phone, name, role } = body;

        if (!uid) {
            return NextResponse.json({ error: "Missing UID" }, { status: 400 });
        }

        // Upsert user
        const user = await prisma.user.upsert({
            where: { id: uid },
            update: {
                email: email || undefined,
                phone: phone || undefined,
                name: name || undefined,
                role: role || undefined,
            },
            create: {
                id: uid,
                email: email,
                phone: phone,
                name: name,
                role: role || "PATIENT", // Default role
            },
        });

        return NextResponse.json({ user });
    } catch (error) {
        console.error("Error syncing user:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
