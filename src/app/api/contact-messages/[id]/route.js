import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import ContactMessage from "@/models/contactMessageModel";
import { requireAdmin } from "@/lib/auth";


// PATCH — Admin only
export async function PATCH(request, { params }) {
  try {
    const { response } = await requireAdmin();

    if (response) {
      return response;
    }

    await connectDB();

    const { id } = await params;
    const body = await request.json();

    const { isRead } = body;

    if (typeof isRead !== "boolean") {
      return NextResponse.json(
        {
          success: false,
          message: "isRead must be a boolean",
        },
        { status: 400 }
      );
    }

    const message = await ContactMessage.findByIdAndUpdate(
      id,
      {
        isRead,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!message) {
      return NextResponse.json(
        {
          success: false,
          message: "Message not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Message updated successfully",
      data: message,
    });
  } catch (error) {
    console.error(
      "UPDATE CONTACT MESSAGE ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update message",
      },
      { status: 500 }
    );
  }
}


// DELETE — Admin only
export async function DELETE(request, { params }) {
  try {
    const { response } = await requireAdmin();

    if (response) {
      return response;
    }

    await connectDB();

    const { id } = await params;

    const message =
      await ContactMessage.findByIdAndDelete(id);

    if (!message) {
      return NextResponse.json(
        {
          success: false,
          message: "Message not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    console.error(
      "DELETE CONTACT MESSAGE ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete message",
      },
      { status: 500 }
    );
  }
}