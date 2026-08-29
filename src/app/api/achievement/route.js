import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Achievement from "@/models/achievementModel";
import { requireAdmin } from "@/lib/auth";
import { uploadFile } from "@/lib/upload";

/* =========================================================
   GET ACHIEVEMENTS
   PUBLIC
========================================================= */

export async function GET() {
  try {
    await connectDB();

    const achievements = await Achievement.find({
      isPublished: true,
    })
      .sort({
        createdAt: -1,
      })
      .lean();

    return NextResponse.json({
      success: true,
      data: achievements,
    });
  } catch (error) {
    console.error(
      "GET ACHIEVEMENTS ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error.message ||
          "Failed to fetch achievements",
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================================================
   POST ACHIEVEMENT
   ADMIN ONLY
========================================================= */

export async function POST(request) {
  try {
    /* =====================================================
       ADMIN AUTH
    ===================================================== */

    const { response } = await requireAdmin();

    if (response) {
      return response;
    }

    await connectDB();

    /* =====================================================
       FORM DATA
    ===================================================== */

    const formData =
      await request.formData();

    const name =
      formData.get("name");

    const achievement =
      formData.get("achievement");

    const isPublished =
      formData.get("isPublished") !== "false";

    const photo =
      formData.get("photo");

    /* =====================================================
       VALIDATION
    ===================================================== */

    if (
      !name ||
      !String(name).trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Student name is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !achievement ||
      !String(achievement).trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Achievement is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !photo ||
      typeof photo === "string" ||
      photo.size <= 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Student photo is required.",
        },
        {
          status: 400,
        }
      );
    }

    /* =====================================================
       CLOUDINARY UPLOAD
    ===================================================== */

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
            "Student photo upload failed.",
        },
        {
          status: 500,
        }
      );
    }

    /* =====================================================
       CREATE ACHIEVEMENT
    ===================================================== */

    const newAchievement =
      await Achievement.create({
        name:
          String(name).trim(),

        achievement:
          String(achievement).trim(),

        photo:
          uploaded.url,

        photoPublicId:
          uploaded.publicId || null,

        isPublished,
      });

    return NextResponse.json(
      {
        success: true,
        data: newAchievement,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "CREATE ACHIEVEMENT ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error.message ||
          "Failed to create achievement",
      },
      {
        status: 500,
      }
    );
  }
}