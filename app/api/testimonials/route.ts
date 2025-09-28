import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    const {name, email, message} = await request.json();
    if(!name || !email || !message) return NextResponse.json({success: false, error: "Name Email Message is required"}, {status: 403});

    try {
        const testimonial = await prisma.testimonials.create({data: {name, email, message}});
        return NextResponse.json({success: true, message: "Testimonial created successfully", data: testimonial}, {status: 201});
    } catch (err) {
        console.error("Prisma create error:", err);
        return NextResponse.json({success: false, error: "Internal Server Error"}, {status: 500});
    }
}