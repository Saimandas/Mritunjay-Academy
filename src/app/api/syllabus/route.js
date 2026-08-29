import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Syllabus from "@/models/syllabusModel";
import { requireAdmin } from "@/lib/auth";

// GET /api/syllabus
// Public

export async function GET() {
  try {
    await connectDB();

    const syllabus = await Syllabus.find({
      isPublished: true,
    })
      .sort({
        academicYear: -1,
        className: 1,
        subject: 1,
      })
      .lean();

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

// POST /api/syllabus
// Admin only

export async function POST(request) {
  try {
    const { response } = await requireAdmin();

    if (response) {
      return response;
    }

    await connectDB();

    const body = await request.json();

    const {
      title,
      className,
      subject,
      description,
      fileUrl,
      publicId,
      academicYear,
      isPublished,
    } = body;

    if (
      !title ||
      !className ||
      !subject ||
      !fileUrl ||
      !academicYear
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Title, class, subject, file, and academic year are required",
        },
        { status: 400 }
      );
    }

    const syllabus = await Syllabus.create({
      title,
      className,
      subject,
      description,
      fileUrl,
      publicId,
      academicYear,
      isPublished,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Syllabus created successfully",
        data: syllabus,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE SYLLABUS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 400 }
    );
  }
}