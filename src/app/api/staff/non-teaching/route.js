import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import NonTeachingStaff from "@/models/nonTeachingStaff";
import { requireAdmin } from "@/lib/auth";
import { uploadFile } from "@/lib/upload";


// =====================================================
// GET
// ADMIN STAFF LIST
// =====================================================

export async function GET() {
  try {
    const { response } = await requireAdmin();

    if (response) {
      return response;
    }

    await connectDB();

    // IMPORTANT:
    // Admin gets BOTH published and hidden staff.
    const staff = await NonTeachingStaff.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: staff,
    });

  } catch (error) {
    console.error(
      "GET NON-TEACHING STAFF ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error.message ||
          "Failed to fetch non-teaching staff",
      },
      {
        status: 500,
      }
    );
  }
}


// =====================================================
// POST
// CREATE NON-TEACHING STAFF
// =====================================================

export async function POST(request) {
  try {
    // -----------------------------------------------
    // ADMIN AUTH
    // -----------------------------------------------

    const { response } = await requireAdmin();

    if (response) {
      return response;
    }


    // -----------------------------------------------
    // DATABASE
    // -----------------------------------------------

    await connectDB();


    // -----------------------------------------------
    // FORM DATA
    // -----------------------------------------------

    const formData =
      await request.formData();


    const name =
      formData.get("name");

    const designation =
      formData.get("designation");

    const department =
      formData.get("department");

    const qualification =
      formData.get("qualification");

    const isPublished =
      formData.get("isPublished") === "true";

    const photo =
      formData.get("photo");


    // -----------------------------------------------
    // VALIDATION
    // -----------------------------------------------

    if (
      !name ||
      !name.toString().trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Name is required",
        },
        {
          status: 400,
        }
      );
    }


    if (
      !designation ||
      !designation.toString().trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Designation is required",
        },
        {
          status: 400,
        }
      );
    }


    // -----------------------------------------------
    // PHOTO UPLOAD
    // -----------------------------------------------

    let photoUrl = null;
    let photoPublicId = null;

    if (
      photo &&
      typeof photo !== "string" &&
      photo.size > 0
    ) {

      const uploaded =
        await uploadFile(
          photo,
          {
            folder:
              "jatiya-vidyalaya/non-teaching-staff",

            allowedTypes: [
              "image/jpeg",
              "image/png",
              "image/webp",
            ],

            maxSize:
              5 * 1024 * 1024,
          }
        );


      if (uploaded) {
        photoUrl =
          uploaded.url;

        photoPublicId =
          uploaded.publicId;
      }
    }


    // -----------------------------------------------
    // CREATE STAFF
    // -----------------------------------------------

    const staff =
      await NonTeachingStaff.create({

        name:
          name.toString().trim(),

        designation:
          designation.toString().trim(),

        department:
          department
            ? department.toString().trim()
            : "",

        qualification:
          qualification
            ? qualification.toString().trim()
            : "",

        photo:
          photoUrl,

        photoPublicId:
          photoPublicId,

        isPublished,
      });


    // -----------------------------------------------
    // RESPONSE
    // -----------------------------------------------

    return NextResponse.json(
      {
        success: true,
        message:
          "Non-teaching staff created successfully",

        data: staff,
      },
      {
        status: 201,
      }
    );

  } catch (error) {

    console.error(
      "CREATE NON-TEACHING STAFF ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error.message ||
          "Failed to create non-teaching staff",
      },
      {
        status: 500,
      }
    );
  }
}