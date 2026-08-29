import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";

export async function POST(request) {
  try {
    // Check admin authentication
    const { response } = await requireAdmin();

    if (response) {
      return response;
    }

    // Get form data
    const formData = await request.formData();

    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: "No PDF file provided",
        },
        { status: 400 }
      );
    }

    // Check file type
    if (file.type !== "application/pdf") {
      return NextResponse.json(
        {
          success: false,
          message: "Only PDF files are allowed",
        },
        { status: 400 }
      );
    }

    // Convert file to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload PDF to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "jatiya-vidyalaya/syllabus",
          resource_type: "raw",
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
    });

    return NextResponse.json(
      {
        success: true,
        message: "Syllabus PDF uploaded successfully",
        data: {
          fileUrl: result.secure_url,
          publicId: result.public_id,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("SYLLABUS UPLOAD ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to upload syllabus PDF",
      },
      { status: 500 }
    );
  }
}