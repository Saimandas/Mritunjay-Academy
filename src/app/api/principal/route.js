import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Principal from "@/models/principalModel";
import { requireAdmin } from "@/lib/auth";
import { uploadFile } from "@/lib/upload";

// =====================================================
// GET PRINCIPAL
// =====================================================

export async function GET() {
  try {
    await connectDB();

    const principal = await Principal.findOne()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: principal,
    });
  } catch (error) {
    console.error(
      "GET PRINCIPAL ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error.message ||
          "Failed to fetch principal",
      },
      {
        status: 500,
      }
    );
  }
}

// =====================================================
// POST PRINCIPAL
// ONLY ONE PRINCIPAL
// =====================================================

export async function POST(request) {
  try {
    const { response } =
      await requireAdmin();

    if (response) {
      return response;
    }

    await connectDB();

    // -------------------------------------------------
    // CHECK IF PRINCIPAL ALREADY EXISTS
    // -------------------------------------------------

    const existingPrincipal =
      await Principal.findOne();

    if (existingPrincipal) {
      return NextResponse.json(
        {
          success: false,
          message:
            "A principal already exists. Please update the existing principal.",
        },
        {
          status: 409,
        }
      );
    }

    // -------------------------------------------------
    // FORM DATA
    // -------------------------------------------------

    const formData =
      await request.formData();

    const name =
      formData.get("name");

    const designation =
      formData.get("designation");

    const qualification =
      formData.get("qualification");

    const message =
      formData.get("message");

    const email =
      formData.get("email");

    const phone =
      formData.get("phone");

    const isPublished =
      formData.get("isPublished") ===
      "true";

    const photo =
      formData.get("photo");

    // -------------------------------------------------
    // VALIDATION
    // -------------------------------------------------

    if (
      !name ||
      !String(name).trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Principal name is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !message ||
      !String(message).trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Principal message is required.",
        },
        {
          status: 400,
        }
      );
    }

    // -------------------------------------------------
    // PHOTO UPLOAD
    // -------------------------------------------------

    let photoUrl = null;

    if (
      photo &&
      typeof photo !== "string" &&
      photo.size > 0
    ) {
      const uploaded =
        await uploadFile(photo, {
          folder:
            "jatiya-vidyalaya/principal",

          allowedTypes: [
            "image/jpeg",
            "image/png",
            "image/webp",
          ],

          maxSize:
            5 * 1024 * 1024,
        });

      photoUrl =
        uploaded?.url || null;
    }

    // -------------------------------------------------
    // CREATE PRINCIPAL
    // -------------------------------------------------

    const principal =
      await Principal.create({
        name: String(name).trim(),

        designation:
          designation
            ? String(
                designation
              ).trim()
            : "Principal",

        qualification:
          qualification
            ? String(
                qualification
              ).trim()
            : "",

        message:
          String(message).trim(),

        email:
          email
            ? String(email).trim()
            : "",

        phone:
          phone
            ? String(phone).trim()
            : "",

        photo: photoUrl,

        isPublished,
      });

    return NextResponse.json(
      {
        success: true,
        data: principal,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "CREATE PRINCIPAL ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error.message ||
          "Failed to create principal",
      },
      {
        status: 500,
      }
    );
  }
}

// =====================================================
// PATCH PRINCIPAL
// UPDATE EXISTING PRINCIPAL
// =====================================================

export async function PATCH(request) {
  try {
    const { response } =
      await requireAdmin();

    if (response) {
      return response;
    }

    await connectDB();

    // -------------------------------------------------
    // FIND EXISTING PRINCIPAL
    // -------------------------------------------------

    const principal =
      await Principal.findOne();

    if (!principal) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Principal not found.",
        },
        {
          status: 404,
        }
      );
    }

    // -------------------------------------------------
    // FORM DATA
    // -------------------------------------------------

    const formData =
      await request.formData();

    const name =
      formData.get("name");

    const designation =
      formData.get("designation");

    const qualification =
      formData.get("qualification");

    const message =
      formData.get("message");

    const email =
      formData.get("email");

    const phone =
      formData.get("phone");

    const isPublished =
      formData.get("isPublished") ===
      "true";

    // IMPORTANT:
    // Your frontend is sending the file as "image"
    const photo =
      formData.get("image");

    console.log("PATCH PHOTO:", photo);

    // -------------------------------------------------
    // VALIDATION
    // -------------------------------------------------

    if (
      !name ||
      !String(name).trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Principal name is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !message ||
      !String(message).trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Principal message is required.",
        },
        {
          status: 400,
        }
      );
    }

    // -------------------------------------------------
    // UPDATE TEXT FIELDS
    // -------------------------------------------------

    principal.name =
      String(name).trim();

    principal.designation =
      designation
        ? String(
            designation
          ).trim()
        : "Principal";

    principal.qualification =
      qualification
        ? String(
            qualification
          ).trim()
        : "";

    principal.message =
      String(message).trim();

    principal.email =
      email
        ? String(email).trim()
        : "";

    principal.phone =
      phone
        ? String(phone).trim()
        : "";

    principal.isPublished =
      isPublished;

    // -------------------------------------------------
    // UPDATE PHOTO IF NEW PHOTO EXISTS
    // -------------------------------------------------
          console.log(photo)
          
    if (
      photo &&
      typeof photo !== "string" &&
      photo.size > 0
    ) {
      const uploaded =
        await uploadFile(photo, {
          folder:
            "jatiya-vidyalaya/principal",

          allowedTypes: [
            "image/jpeg",
            "image/png",
            "image/webp",
          ],

          maxSize:
            5 * 1024 * 1024,
        });
        console.log("uplo",uploaded);
        

      if (!uploaded?.url) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Photo upload failed.",
          },
          {
            status: 500,
          }
        );
      }

      // Save NEW Cloudinary URL
      principal.image =
        uploaded.url;
    }

    // -------------------------------------------------
    // SAVE
    // -------------------------------------------------

    await principal.save();

    return NextResponse.json({
      success: true,
      message:
        "Principal updated successfully.",
      data: principal.toObject(),
    });
  } catch (error) {
    console.error(
      "UPDATE PRINCIPAL ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error.message ||
          "Failed to update principal",
      },
      {
        status: 500,
      }
    );
  }
}