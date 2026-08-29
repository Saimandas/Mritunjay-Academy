import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Gallery from "@/models/galleryModel";
import { requireAdmin } from "@/lib/auth";
import { uploadFile } from "@/lib/upload";

export async function POST(request) {
  let uploaded = null;

  try {
    const { response } = await requireAdmin();

    if (response) {
      return response;
    }

    await connectDB();

    // Get the form data sent from the frontend
    const formData = await request.formData();

    const title = formData.get("title");
    const description = formData.get("description");
    const category = formData.get("category");
    const date = formData.get("date");
    const displayOrder = formData.get("displayOrder");
    const isPublished = formData.get("isPublished");
    const image = formData.get("image");

    // Check the title
    if (!title || !String(title).trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Gallery title is required.",
        },
        { status: 400 }
      );
    }

    // Check the image
    if (
      !image ||
      typeof image === "string" ||
      image.size === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Gallery image is required.",
        },
        { status: 400 }
      );
    }

    // First upload the image to Cloudinary
    uploaded = await uploadFile(image, {
      folder: "jatiya-vidyalaya/gallery",

      allowedTypes: [
        "image/jpeg",
        "image/png",
        "image/webp",
      ],

      maxSize: 10 * 1024 * 1024,
    });

    if (!uploaded?.url || !uploaded?.publicId) {
      throw new Error("Image upload failed.");
    }

    console.log(
      "Gallery image uploaded:",
      uploaded.url
    );

    // Now create the gallery document in MongoDB
    const gallery = await Gallery.create({
      title: String(title).trim(),

      description: description
        ? String(description).trim()
        : "",

      image: uploaded.url,

      publicId: uploaded.publicId,

      category: category
        ? String(category)
        : "Other",

      date: date
        ? new Date(date)
        : new Date(),

      displayOrder:
        displayOrder !== null &&
        displayOrder !== ""
          ? Number(displayOrder)
          : 0,

      isPublished:
        isPublished === null
          ? true
          : isPublished === "true",
    });

    console.log(
      "Gallery document created:",
      gallery._id.toString()
    );

    // Only return success after both Cloudinary
    // and MongoDB have completed successfully
    return NextResponse.json(
      {
        success: true,
        message: "Gallery created successfully.",
        data: gallery,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "CREATE GALLERY ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error.message ||
          "Failed to create gallery.",
      },
      { status: 500 }
    );
  }
}