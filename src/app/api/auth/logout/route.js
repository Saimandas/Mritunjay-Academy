import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import connectDB from "@/lib/mongodb";
import Session from "@/models/sessionModel";

export async function POST() {
  try {
    await connectDB();

    const cookieStore = await cookies();

    const token = cookieStore.get("session")?.value;

    if (token) {
      await Session.deleteOne({
        token,
      });
    }

    const response = NextResponse.json({
      success: true,
      message: "Logged out successfully",
    });

    response.cookies.delete("session");

    return response;

  } catch (error) {
    console.error("LOGOUT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}