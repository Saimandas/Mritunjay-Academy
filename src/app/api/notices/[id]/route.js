import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Notice from "@/models/noticeModel";
import { requireAdmin } from "@/lib/auth";


// GET /api/notices/:id
// PUBLIC

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const notice = await Notice.findById(id).lean();

    if (!notice) {
      return NextResponse.json(
        {
          success: false,
          message: "Notice not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: notice,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch notice",
      },
      { status: 500 }
    );
  }
}


// PATCH /api/notices/:id
// ADMIN ONLY

export async function PATCH(request, { params }) {
  try {
    // Authentication
    const { user, response } = await requireAdmin();

    if (response) {
      return response;
    }

    await connectDB();

    const { id } = await params;

    const body = await request.json();

    const notice = await Notice.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!notice) {
      return NextResponse.json(
        {
          success: false,
          message: "Notice not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: notice,
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


// DELETE /api/notices/:id
// ADMIN ONLY

export async function DELETE(request, { params }) {
  try {
    // Authentication
    const { user, response } = await requireAdmin();

    if (response) {
      return response;
    }

    await connectDB();

    const { id } = await params;

    const notice = await Notice.findByIdAndDelete(id);

    if (!notice) {
      return NextResponse.json(
        {
          success: false,
          message: "Notice not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Notice deleted successfully",
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete notice",
      },
      { status: 500 }
    );
  }
}