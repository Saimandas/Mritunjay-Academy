import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Event from "@/models/eventModel";
import { requireAdmin } from "@/lib/auth";
import { uploadFile } from "@/lib/upload";

export async function PATCH(request, { params }) {
  try {
    const { response } = await requireAdmin();

    if (response) {
      return response;
    }

    await connectDB();

    const { id } = await params;

    const event = await Event.findById(id);

    if (!event) {
      return NextResponse.json(
        {
          success: false,
          message: "Event not found.",
        },
        { status: 404 }
      );
    }

    const formData = await request.formData();

    const name = formData.get("name");
    const date = formData.get("date");
    const image = formData.get("image");

    if (!name || !String(name).trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Event name is required.",
        },
        { status: 400 }
      );
    }

    event.name = String(name).trim();

    if (date) {
      event.date = new Date(date);
    } else {
      event.date = new Date();
    }

    // Only upload a new image when the admin
    // actually selected one.
    if (
      image &&
      typeof image !== "string" &&
      image.size > 0
    ) {
      const uploaded = await uploadFile(image, {
        folder: "jatiya-vidyalaya/events",

        allowedTypes: [
          "image/jpeg",
          "image/png",
          "image/webp",
        ],

        maxSize: 10 * 1024 * 1024,
      });

      if (
        !uploaded?.url ||
        !uploaded?.publicId
      ) {
        return NextResponse.json(
          {
            success: false,
            message: "Event image upload failed.",
          },
          { status: 500 }
        );
      }

      event.image = uploaded.url;
      event.publicId = uploaded.publicId;
    }

    await event.save();

    return NextResponse.json({
      success: true,
      message: "Event updated successfully.",
      data: event,
    });
  } catch (error) {
    console.error("UPDATE EVENT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error.message ||
          "Failed to update event.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { response } = await requireAdmin();

    if (response) {
      return response;
    }

    await connectDB();

    const { id } = await params;

    const event = await Event.findById(id);

    if (!event) {
      return NextResponse.json(
        {
          success: false,
          message: "Event not found.",
        },
        { status: 404 }
      );
    }

    await Event.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Event deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE EVENT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error.message ||
          "Failed to delete event.",
      },
      { status: 500 }
    );
  }
}