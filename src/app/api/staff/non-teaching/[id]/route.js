import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import NonTeachingStaff from "@/models/nonTeachingStaff";
import { requireAdmin } from "@/lib/auth";


// GET /api/staff/non-teaching/:id
// PUBLIC

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const staff = await NonTeachingStaff.findById(id).lean();

    if (!staff) {
      return NextResponse.json(
        {
          success: false,
          message: "Non-teaching staff member not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: staff,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch staff member",
      },
      { status: 500 }
    );
  }
}


// PATCH /api/staff/non-teaching/:id
// ADMIN ONLY

export async function PATCH(request, { params }) {
  try {
    const { response } = await requireAdmin();

    if (response) {
      return response;
    }

    await connectDB();

    const { id } = await params;

    const body = await request.json();

    const staff = await NonTeachingStaff.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!staff) {
      return NextResponse.json(
        {
          success: false,
          message: "Non-teaching staff member not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: staff,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 400 }
    );
  }
}


// DELETE /api/staff/non-teaching/:id
// ADMIN ONLY

export async function DELETE(request, { params }) {
  try {
    const { response } = await requireAdmin();

    if (response) {
      return response;
    }

    await connectDB();

    const { id } = await params;

    const staff = await NonTeachingStaff.findByIdAndDelete(id);

    if (!staff) {
      return NextResponse.json(
        {
          success: false,
          message: "Non-teaching staff member not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Non-teaching staff member deleted successfully",
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete staff member",
      },
      { status: 500 }
    );
  }
}