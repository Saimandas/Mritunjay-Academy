import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Gallery from "@/models/galleryModel";
import { requireAdmin } from "@/lib/auth";

// =====================================================
// GET GALLERY
// =====================================================

export async function GET() {
  try {
    await connectDB();

    const gallery = await Gallery.find({})
      .sort({
        displayOrder: 1,
        createdAt: -1,
      })
      .lean();

    return NextResponse.json({
      success: true,
      data: gallery,
    });
  } catch (error) {
    console.error(
      "GET GALLERY ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error.message ||
          "Failed to fetch gallery.",
      },
      {
        status: 500,
      }
    );
  }
}

