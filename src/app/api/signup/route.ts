import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { hash } from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const body = await req.json();
    const { email, name, password } = body;

    // Validate required fields
    if (!email || !name || !password) {
      return NextResponse.json(
        { user: null, message: "All fields are required." },
        { status: 400 }
      );
    }

    // Check if user already exists by email
    const existingUserByEmail = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Exclude password from response
    const { password: newUserPassword, ...rest } = newUser;

    // Return success response with redirect to sign-in page
    return NextResponse.json(
      {
        user: rest,
        message: "User created successfully. Redirecting to sign-in page.",
      },
      { status: 201, headers: { Location: "/sign-in" } }
    );
  } catch (error) {
    // Log and return error
    console.error("Error creating user:", error);
    return NextResponse.json(
      { user: null, message: "An error occurred. Please try again." },
      { status: 500 }
    );
  }
}
