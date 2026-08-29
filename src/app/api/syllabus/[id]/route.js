import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Syllabus from "@/models/syllabusModel";
import { requireAdmin } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";

// GET /api/syllabus/:id
// Public

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const syllabus = await Syllabus.findById(id).lean();

    if (!syllabus) {
      return NextResponse.json(
        {
          success: false,
          message: "Syllabus not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: syllabus,
    });
  } catch (error) {
    console.error("GET SYLLABUS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch syllabus",
      },
      { status: 500 }
    );
  }
}

// PATCH /api/syllabus/:id
// Admin only

export async function PATCH(request, { params }) {
  try {
    const { response } = await requireAdmin();

    if (response) {
      return response;
    }

    await connectDB();

    const { id } = await params;

    const body = await request.json();

    const syllabus = await Syllabus.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!syllabus) {
      return NextResponse.json(
        {
          success: false,
          message: "Syllabus not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Syllabus updated successfully",
      data: syllabus,
    });
  } catch (error) {
    console.error("UPDATE SYLLABUS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 400 }
    );
  }
}

// DELETE /api/syllabus/:id
// Admin only

export async function DELETE(request, { params }) {
  try {
    const { response } = await requireAdmin();

    if (response) {
      return response;
    }

    await connectDB();

    const { id } = await params;

    const syllabus = await Syllabus.findById(id);

    if (!syllabus) {
      return NextResponse.json(
        {
          success: false,
          message: "Syllabus not found",
        },
        { status: 404 }
      );
    }

    // Delete PDF from Cloudinary if publicId exists
    if (syllabus.publicId) {
      await cloudinary.uploader.destroy(
        syllabus.publicId,
        {
          resource_type: "raw",
        }
      );
    }

    // Delete database record
    await Syllabus.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Syllabus deleted successfully",
    });
  } catch (error) {
    console.error("DELETE SYLLABUS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete syllabus",
      },
      { status: 500 }
    );
  }
}