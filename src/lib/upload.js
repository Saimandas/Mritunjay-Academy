import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload a file to Cloudinary
 *
 * @param {File} file
 * @param {Object} options
 * @param {string} options.folder
 * @param {string[]} options.allowedTypes
 * @param {number} options.maxSize
 */

export async function uploadFile(
  file,
  {
    folder,
    allowedTypes = [],
    maxSize = 10 * 1024 * 1024,
  }
) {
  // -----------------------------------------------
  // Check file
  // -----------------------------------------------

  if (
    !file ||
    typeof file === "string" ||
    file.size === 0
  ) {
    return null;
  }

  // -----------------------------------------------
  // Validate type
  // -----------------------------------------------

  if (
    allowedTypes.length > 0 &&
    !allowedTypes.includes(file.type)
  ) {
    throw new Error(
      `Invalid file type. Allowed types: ${allowedTypes.join(
        ", "
      )}`
    );
  }

  // -----------------------------------------------
  // Validate size
  // -----------------------------------------------

  if (file.size > maxSize) {
    const maxSizeMB =
      maxSize / (1024 * 1024);

    throw new Error(
      `File must be smaller than ${maxSizeMB} MB`
    );
  }

  // -----------------------------------------------
  // Convert File → Buffer
  // -----------------------------------------------

  const bytes =
    await file.arrayBuffer();

  const buffer =
    Buffer.from(bytes);

  // -----------------------------------------------
  // Upload to Cloudinary
  // -----------------------------------------------

  const result =
    await new Promise(
      (resolve, reject) => {
        const uploadStream =
          cloudinary.uploader.upload_stream(
            {
              resource_type: "image",
              folder,
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
  // Return useful information
  // -----------------------------------------------

  return {
    url: result.secure_url,
    publicId: result.public_id,
    resourceType: result.resource_type,
    format: result.format,
    bytes: result.bytes,
  };
}