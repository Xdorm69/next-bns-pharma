import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { signupSchema } from "@/lib/validations/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // ✅ Validate using zod
    const parsed = signupSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.error.issues.map((err) => err.message).join(", "),
        },
        { status: 400 }
      );
    }

    const { name, email, password } = parsed.data;

    // ✅ Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "User already exists" },
        { status: 400 }
      );
    }

    // ✅ Hash password (salt rounds = 10)
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Save user to DB
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
        data: { id: user.id, name: user.name, email: user.email },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("User creation failed:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
