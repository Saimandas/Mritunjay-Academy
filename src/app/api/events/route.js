import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Event from "@/models/eventModel";

// GET /api/events

export async function GET() {
  try {
    await connectDB();

    const events = await Event.find()
      .sort({
        date: 1,
      })
      .lean();

    return NextResponse.json({
      success: true,
      data: events,
    });
  } catch (error) {
    console.error(
      "GET EVENTS ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error.message ||
          "Failed to fetch events.",
      },
      {
        status: 500,
      }
    );
  }
}

// POST /api/events
