import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import TeachingStaff from "@/models/teachingStaff";
import { requireAdmin } from "@/lib/auth";
import { uploadFile } from "@/lib/upload";

// =====================================================
// GET
// PUBLIC
// =====================================================

// =====================================================
// GET
// PUBLIC
// =====================================================
// =====================================================
// GET
// PUBLIC
// =====================================================

// =====================================================
// GET
// PUBLIC
// =====================================================

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const section = searchParams.get("section");

    if (!section) {
      return NextResponse.json(
        {
          success: false,
          message: "Section is required",
        },
        { status: 400 }
      );
    }

    if (
      section !== "school" &&
      section !== "higherSecondary"
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid section. Use school or higherSecondary.",
        },
        { status: 400 }
      );
    }

    const staff = await TeachingStaff.find({
      section,
      isActive: true,
    })
      .sort({
        displayOrder: 1,
        createdAt: -1,
      })
      .lean();

    return NextResponse.json({
      success: true,
      data: staff,
    });
  } catch (error) {
    console.error("FETCH TEACHING STAFF ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch teaching staff",
      },
      { status: 500 }
    );
  }
}
// =====================================================
// POST
// ADMIN ONLY
// =====================================================

export async function POST(request) {
  try {
    // -----------------------------------------------
    // Authentication
    // -----------------------------------------------

    const { response } = await requireAdmin();

    if (response) {
      return response;
    }

    // -----------------------------------------------
    // Database
    // -----------------------------------------------

    await connectDB();

    // -----------------------------------------------
    // FormData
    // -----------------------------------------------

    const formData = await request.formData();

    const name = formData.get("name");
    const designation = formData.get("designation");
    const qualification = formData.get("qualification");
    const subject = formData.get("subject");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const displayOrder = formData.get("displayOrder");
    const section = formData.get("section");
    const photo = formData.get("photo");

    // -----------------------------------------------
    // Validation
    // -----------------------------------------------

    if (!name || !designation || !section) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Name, designation and section are required.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      section !== "school" &&
      section !== "higherSecondary"
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid section. Use school or higherSecondary.",
        },
        {
          status: 400,
        }
      );
    }

    // -----------------------------------------------
    // Upload Photo
    // -----------------------------------------------

    let photoUrl = null;

    if (
      photo &&
      typeof photo !== "string" &&
      photo.size > 0
    ) {
      const uploadedPhoto = await uploadFile(photo, {
        folder:
          "jatiya-vidyalaya/teaching-staff",

        allowedTypes: [
          "image/jpeg",
          "image/png",
          "image/webp",
        ],

        maxSize: 5 * 1024 * 1024,
      });

      if (uploadedPhoto) {
        photoUrl = uploadedPhoto.url;
      }
    }

    // -----------------------------------------------
    // Create Staff
    // -----------------------------------------------

    const staff = await TeachingStaff.create({
      name: name.trim(),

      designation: designation.trim(),

      qualification:
        qualification &&
        typeof qualification === "string"
          ? qualification.trim()
          : "",

      subject:
        subject &&
        typeof subject === "string"
          ? subject.trim()
          : "",

      email:
        email &&
        typeof email === "string"
          ? email.trim().toLowerCase()
          : "",

      phone:
        phone &&
        typeof phone === "string"
          ? phone.trim()
          : "",

      displayOrder: displayOrder
        ? Number(displayOrder)
        : 0,

      section,

      photo: photoUrl,

      isActive: true,
    });

    // -----------------------------------------------
    // Response
    // -----------------------------------------------

    return NextResponse.json(
      {
        success: true,
        data: staff,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "CREATE TEACHING STAFF ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error?.message ||
          "Failed to create teaching staff",
      },
      {
        status: 500,
      }
    );
  }
}