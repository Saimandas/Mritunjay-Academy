import { NextResponse } from "next/server";
import mongoose from "mongoose";

import connectDB from "@/lib/mongodb";
import Achievement from "@/models/achievementModel";
import { requireAdmin } from "@/lib/auth";

/* =========================================================
   GET SINGLE ACHIEVEMENT
   PUBLIC
========================================================= */

export async function GET(
  request,
  { params }
) {
  try {
    const { id } = await params;

    if (
      !mongoose.Types.ObjectId.isValid(id)
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid achievement ID",
        },
        {
          status: 400,
        }
      );
    }

    await connectDB();

    const achievement =
      await Achievement.findOne({
        _id: id,
        isPublished: true,
      }).lean();

    if (!achievement) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Achievement not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      data: achievement,
    });
  } catch (error) {
    console.error(
      "GET ACHIEVEMENT ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error.message ||
          "Failed to fetch achievement",
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================================================
   PATCH ACHIEVEMENT
   ADMIN ONLY
========================================================= */

export async function PATCH(
  request,
  { params }
) {
  try {
    const { response } =
      await requireAdmin();

    if (response) {
      return response;
    }

    const { id } = await params;

    if (
      !mongoose.Types.ObjectId.isValid(id)
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid achievement ID",
        },
        {
          status: 400,
        }
      );
    }

    await connectDB();

    const achievement =
      await Achievement.findById(id);

    if (!achievement) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Achievement not found",
        },
        {
          status: 404,
        }
      );
    }

    const formData =
      await request.formData();

    const name =
      formData.get("name");

    const achievementText =
      formData.get("achievement");

    const isPublishedValue =
      formData.get("isPublished");

    const photo =
      formData.get("photo");

    /* =====================================================
       UPDATE TEXT
    ===================================================== */

    if (
      name !== null &&
      String(name).trim()
    ) {
      achievement.name =
        String(name).trim();
    }

    if (
      achievementText !== null &&
      String(achievementText).trim()
    ) {
      achievement.achievement =
        String(
          achievementText
        ).trim();
    }

    if (
      isPublishedValue !== null
    ) {
      achievement.isPublished =
        String(
          isPublishedValue
        ) === "true";
    }

    /* =====================================================
       REPLACE PHOTO
    ===================================================== */

    if (
      photo &&
      typeof photo !== "string" &&
      photo.size > 0
    ) {
      const uploaded =
        await uploadFile(photo, {
          folder:
            "jatiya-vidyalaya/achievements",

          allowedTypes: [
            "image/jpeg",
            "image/png",
            "image/webp",
          ],

          maxSize:
            5 * 1024 * 1024,
        });

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

      achievement.photo =
        uploaded.url;

      achievement.photoPublicId =
        uploaded.publicId || null;
    }

    await achievement.save();

    return NextResponse.json({
      success: true,
      data: achievement,
    });
  } catch (error) {
    console.error(
      "UPDATE ACHIEVEMENT ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error.message ||
          "Failed to update achievement",
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================================================
   DELETE ACHIEVEMENT
   ADMIN ONLY
========================================================= */

export async function DELETE(
  request,
  { params }
) {
  try {
    const { response } =
      await requireAdmin();

    if (response) {
      return response;
    }

    const { id } = await params;

    if (
      !mongoose.Types.ObjectId.isValid(id)
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid achievement ID",
        },
        {
          status: 400,
        }
      );
    }

    await connectDB();

    const achievement =
      await Achievement.findById(id);

    if (!achievement) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Achievement not found",
        },
        {
          status: 404,
        }
      );
    }

    /*
      We delete the database record here.

      If your existing upload utility already
      exposes a Cloudinary delete helper, you can
      use achievement.photoPublicId here as well.
    */

    await Achievement.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message:
        "Achievement deleted successfully",
    });
  } catch (error) {
    console.error(
      "DELETE ACHIEVEMENT ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error.message ||
          "Failed to delete achievement",
      },
      {
        status: 500,
      }
    );
  }
}