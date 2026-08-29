import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Event from "@/models/eventModel";
import { requireAdmin } from "@/lib/auth";
import { uploadFile } from "@/lib/upload";

export async function POST(request) {
  try {
    const { response } = await requireAdmin();

    if (response) {
      return response;
    }

    await connectDB();

    const formData = await request.formData();

    const name = formData.get("name");
    const date = formData.get("date");
    const image = formData.get("image");

    // Validate name
    if (!name || !String(name).trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Event name is required.",
        },
        { status: 400 }
      );
    }

    // Validate image
    if (
      !image ||
      typeof image === "string" ||
      image.size === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Event image is required.",
        },
        { status: 400 }
      );
    }

    // Upload image to Cloudinary first
    const uploaded = await uploadFile(image, {
      folder: "jatiya-vidyalaya/events",

      allowedTypes: [
        "image/jpeg",
        "image/png",
        "image/webp",
      ],

      maxSize: 10 * 1024 * 1024,
    });
    console.log(uploaded);
    
    if (!uploaded?.url || !uploaded?.publicId) {
      return NextResponse.json(
        {
          success: false,
          message: "Event image upload failed.",
        },
        { status: 500 }
      );
    }
    console.log("uploded",uploaded.url);
    
    // Create the database document only after
    // the Cloudinary upload succeeds
    const event = await Event.create({
      name: String(name).trim(),

      date: date
        ? new Date(date)
        : new Date(),
      image: uploaded.url
    });
    console.log(event);
    

    return NextResponse.json(
      {
        success: true,
        message: "Event created successfully.",
        data: event,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE EVENT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error.message ||
          "Failed to create event.",
      },
      { status: 500 }
    );
  }
}

// Get all events
export async function GET() {
  try {
    await connectDB();

    const events = await Event.find()
      .sort({ date: -1, createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: events,
    });
  } catch (error) {
    console.error("GET EVENTS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error.message ||
          "Failed to fetch events.",
      },
      { status: 500 }
    );
  }
}