import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Notice from "@/models/noticeModel";
import { requireAdmin } from "@/lib/auth";

import { v2 as cloudinary } from "cloudinary";


// =====================================================
// CLOUDINARY CONFIG
// =====================================================

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


// =====================================================
// GET /api/notices
// PUBLIC
// =====================================================

export async function GET() {
  try {
    await connectDB();

    const notices = await Notice.find({
      isPublished: true,
    })
      .sort({
        isPinned: -1,
        date: -1,
      })
      .lean();

    return NextResponse.json({
      success: true,
      data: notices,
    });

  } catch (error) {
    console.error("GET NOTICES ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch notices",
      },
      {
        status: 500,
      }
    );
  }
}


// =====================================================
// POST /api/notices
// ADMIN ONLY
// =====================================================

export async function POST(request) {
  try {

    // =================================================
    // ADMIN AUTHENTICATION
    // =================================================

    const { user, response } =
      await requireAdmin();

    if (response) {
      return response;
    }


    // =================================================
    // DATABASE
    // =================================================

    await connectDB();


    // =================================================
    // FORM DATA
    // =================================================

    const formData =
      await request.formData();


    const title =
      formData.get("title");

    const description =
      formData.get("description");

    const category =
      formData.get("category") ||
      "General";

    const isPublished =
      formData.get("isPublished") ===
      "true";

    const file =
      formData.get("file");


    // =================================================
    // VALIDATE TITLE
    // =================================================

    if (
      !title ||
      !title.toString().trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Title is required",
        },
        {
          status: 400,
        }
      );
    }


    // =================================================
    // VALIDATE DESCRIPTION
    // =================================================

    if (
      !description ||
      !description.toString().trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Description is required",
        },
        {
          status: 400,
        }
      );
    }


    // =================================================
    // VALIDATE CATEGORY
    // =================================================

    const allowedCategories = [
      "General",
      "Academic",
      "Examination",
      "Admission",
      "Event",
      "Important",
    ];

    if (
      !allowedCategories.includes(
        category
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid notice category",
        },
        {
          status: 400,
        }
      );
    }


    // =================================================
    // FILE VARIABLES
    // =================================================

    let fileUrl = null;
    let publicId = null;


    // =================================================
    // PDF UPLOAD
    // =================================================

    if (
      file &&
      typeof file !== "string" &&
      file.size > 0
    ) {

      // -----------------------------------------------
      // PDF ONLY
      // -----------------------------------------------

      if (
        file.type !==
        "application/pdf"
      ) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Only PDF files are allowed",
          },
          {
            status: 400,
          }
        );
      }


      // -----------------------------------------------
      // 10 MB MAXIMUM
      // -----------------------------------------------

      if (
        file.size >
        10 * 1024 * 1024
      ) {
        return NextResponse.json(
          {
            success: false,
            message:
              "PDF must be smaller than 10 MB",
          },
          {
            status: 400,
          }
        );
      }


      // -----------------------------------------------
      // CONVERT FILE TO BUFFER
      // -----------------------------------------------

      const bytes =
        await file.arrayBuffer();

      const buffer =
        Buffer.from(bytes);


      // -----------------------------------------------
      // CLOUDINARY UPLOAD
      // -----------------------------------------------

      const uploadResult =
        await new Promise(
          (resolve, reject) => {

            const uploadStream =
              cloudinary.uploader.upload_stream(
                {
                  // IMPORTANT:
                  // PDF is validated above.
                  // Cloudinary uses image resource type
                  // so the PDF can be delivered/viewed.
                  resource_type: "image",

                  folder:
                    "jatiya-vidyalaya/notices",
                },

                (error, result) => {

                  if (error) {
                    reject(error);
                  } else {
                    resolve(result);
                  }

                }
              );


            uploadStream.end(buffer);
          }
        );


      // -----------------------------------------------
      // SAVE CLOUDINARY DETAILS
      // -----------------------------------------------

      fileUrl =
        uploadResult.secure_url;

      publicId =
        uploadResult.public_id;
    }


    // =================================================
    // CREATE NOTICE
    // =================================================

    const notice =
      await Notice.create({

        title:
          title.toString().trim(),

        description:
          description.toString().trim(),

        category,

        fileUrl,

        publicId,

        isPublished,

        isPinned: false,

        date: new Date(),
      });


    // =================================================
    // RESPONSE
    // =================================================

    return NextResponse.json(
      {
        success: true,

        message:
          "Notice created successfully",

        data: notice,
      },
      {
        status: 201,
      }
    );

  } catch (error) {

    console.error(
      "CREATE NOTICE ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          error.message ||
          "Failed to create notice",
      },
      {
        status: 500,
      }
    );
  }
}