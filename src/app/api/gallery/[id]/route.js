import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Gallery from "@/models/galleryModel";
import { requireAdmin } from "@/lib/auth";

// =====================================================
// GET SINGLE GALLERY
// =====================================================

export async function GET(
  request,
  { params }
) {
  try {
    await connectDB();

    const { id } = await params;

    const gallery =
      await Gallery.findById(id).lean();

    if (!gallery) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Gallery item not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      data: gallery,
    });
  } catch (error) {
    console.error(
      "GET SINGLE GALLERY ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error.message ||
          "Failed to fetch gallery.",
      },
      {
        status: 500,
      }
    );
  }
}

// =====================================================
// PATCH GALLERY
// =====================================================

export async function PATCH(
  request,
  { params }
) {
  try {
    // -------------------------------------------------
    // ADMIN AUTH
    // -------------------------------------------------

    const { response } = await requireAdmin();

    if (response) {
      return response;
    }

    await connectDB();

    const { id } = await params;

    // -------------------------------------------------
    // FIND EXISTING
    // -------------------------------------------------

    const gallery =
      await Gallery.findById(id);

    if (!gallery) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Gallery item not found.",
        },
        {
          status: 404,
        }
      );
    }

    // -------------------------------------------------
    // JSON BODY
    // -------------------------------------------------

    const body = await request.json();

    const {
      title,
      description,
      image,
      publicId,
      category,
      date,
      displayOrder,
      isPublished,
    } = body;

    // -------------------------------------------------
    // UPDATE TEXT
    // -------------------------------------------------

    if (title !== undefined) {
      gallery.title =
        String(title).trim();
    }

    if (description !== undefined) {
      gallery.description =
        String(description).trim();
    }

    if (category !== undefined) {
      gallery.category = category;
    }

    if (date !== undefined) {
      gallery.date = date
        ? new Date(date)
        : gallery.date;
    }

    if (
      displayOrder !== undefined
    ) {
      gallery.displayOrder =
        Number(displayOrder);
    }

    if (
      isPublished !== undefined
    ) {
      gallery.isPublished =
        Boolean(isPublished);
    }

    // -------------------------------------------------
    // IMAGE
    // -------------------------------------------------
    // Only replace image if a new
    // image URL + publicId are sent.
    //
    // Otherwise old image remains.
    // -------------------------------------------------

    if (
      image &&
      publicId
    ) {
      gallery.image = image;
      gallery.publicId = publicId;
    }

    await gallery.save();

    return NextResponse.json({
      success: true,
      data: gallery,
    });
  } catch (error) {
    console.error(
      "UPDATE GALLERY ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error.message ||
          "Failed to update gallery.",
      },
      {
        status: 500,
      }
    );
  }
}

// =====================================================
// DELETE GALLERY
// =====================================================

export async function DELETE(
  request,
  { params }
) {
  try {
    // -------------------------------------------------
    // ADMIN AUTH
    // -------------------------------------------------

    const { response } = await requireAdmin();

    if (response) {
      return response;
    }

    await connectDB();

    const { id } = await params;

    const gallery =
      await Gallery.findById(id);

    if (!gallery) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Gallery item not found.",
        },
        {
          status: 404,
        }
      );
    }

    await Gallery.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message:
        "Gallery item deleted successfully.",
    });
  } catch (error) {
    console.error(
      "DELETE GALLERY ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error.message ||
          "Failed to delete gallery.",
      },
      {
        status: 500,
      }
    );
  }
}