import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import ContactMessage from "@/models/contactMessageModel";
import { requireAdmin } from "@/lib/auth";

// GET — Admin only
export async function GET() {
  try {
    const { response } = await requireAdmin();

    if (response) {
      return response;
    }

    await connectDB();

    const messages = await ContactMessage.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: messages,
    });
  } catch (error) {
    console.error("GET CONTACT MESSAGES ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch contact messages",
      },
      { status: 500 }
    );
  }
}


// POST — Public
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      name,
      email,
      subject,
      message,
      phone
    } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email and message are required",
        },
        { status: 400 }
      );
    }

    const contactMessage =
      await ContactMessage.create({
        name,
        email,
        subject,
        message,
        phone
      });

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully",
        data: contactMessage,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "CREATE CONTACT MESSAGE ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send message",
      },
      { status: 500 }
    );
  }
}