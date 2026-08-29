import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import TeachingStaff from "@/models/teachingStaff";
import { requireAdmin } from "@/lib/auth";

export async function PATCH(request, { params }) {
  try {
    const auth = await requireAdmin();

    if (auth.response) {
      return auth.response;
    }

    await connectDB();

    const { id } = await params;

    const body = await request.json();

    console.log("PATCH TEACHER ID:", id);
    console.log("PATCH BODY:", body);

    if (typeof body.isPublished !== "boolean") {
      return NextResponse.json(
        {
          success: false,
          message:
            "isPublished must be true or false",
        },
        { status: 400 }
      );
    }

    const teacher =
      await TeachingStaff.findById(id);

    if (!teacher) {
      return NextResponse.json(
        {
          success: false,
          message: "Teacher not found",
        },
        { status: 404 }
      );
    }

    teacher.isPublished =
      body.isPublished;

    await teacher.save();

    console.log(
      "UPDATED STATUS:",
      teacher.isPublished
    );

    return NextResponse.json({
      success: true,
      message: teacher.isPublished
        ? "Teacher published successfully"
        : "Teacher hidden successfully",
      data: teacher.toObject(),
    });
  } catch (error) {
    console.error(
      "PATCH TEACHING STAFF ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error?.message ||
          "Failed to update teacher",
      },
      { status: 500 }
    );
  }
}


// =====================================================
// DELETE TEACHER
// =====================================================

export async function DELETE(request, { params }) {
  try {
    const auth = await requireAdmin();

    if (auth.response) {
      return auth.response;
    }

    await connectDB();

    const { id } = await params;

    console.log(
      "DELETE TEACHER ID:",
      id
    );

    const teacher =
      await TeachingStaff.findById(id);

    if (!teacher) {
      return NextResponse.json(
        {
          success: false,
          message: "Teacher not found",
        },
        { status: 404 }
      );
    }

    await TeachingStaff.findByIdAndDelete(id);

    console.log(
      "DELETED TEACHER:",
      id
    );

    return NextResponse.json({
      success: true,
      message:
        "Teacher deleted successfully",
    });
  } catch (error) {
    console.error(
      "DELETE TEACHING STAFF ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error?.message ||
          "Failed to delete teacher",
      },
      { status: 500 }
    );
  }
}