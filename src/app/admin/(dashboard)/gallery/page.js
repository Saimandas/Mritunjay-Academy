"use client";

import { useEffect, useState } from "react";
import {
  Upload,
  Trash2,
  Loader2,
  X,
  Images,
} from "lucide-react";

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");

  // -----------------------------
  // Fetch Gallery
  // -----------------------------

  async function fetchImages() {
    try {
      setLoading(true);

      const response = await fetch("/api/gallery");
      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to fetch gallery"
        );
      }

      setImages(result.data || []);
    } catch (error) {
      console.error("FETCH GALLERY ERROR:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchImages();
  }, []);

  // -----------------------------
  // File Change
  // -----------------------------

  function handleFileChange(e) {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    setFile(selectedFile);
  }

  // -----------------------------
  // Upload Image
  // -----------------------------

  async function handleUpload(e) {
    e.preventDefault();

    if (!file) {
      alert("Please select an image.");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();

      formData.append("image", file);
      formData.append("title", title);

      const response = await fetch("/api/gallery/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to upload image"
        );
      }

      setImages((previous) => [
        result.data,
        ...previous,
      ]);

      setFile(null);
      setTitle("");

      // Reset file input
      e.target.reset();
    } catch (error) {
      console.error("UPLOAD GALLERY ERROR:", error);

      alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  // -----------------------------
  // Delete Image
  // -----------------------------

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this image?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `/api/gallery/${id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to delete image"
        );
      }

      setImages((previous) =>
        previous.filter((image) => image._id !== id)
      );
    } catch (error) {
      console.error("DELETE GALLERY ERROR:", error);

      alert(error.message);
    }
  }

  return (
    <div className="mx-auto max-w-7xl">

      {/* Header */}
      <div className="mb-8">

        <p className="mb-1 text-sm font-medium text-gray-500">
          Website Management
        </p>

        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Gallery
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Upload and manage photographs displayed on the
          school website.
        </p>

      </div>


      {/* Upload Section */}
      <section className="mb-8 rounded-xl border border-gray-200 bg-white p-6">

        <div className="mb-6">

          <h2 className="text-lg font-semibold text-gray-900">
            Upload Image
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Upload a photograph to the school gallery.
          </p>

        </div>


        <form
          onSubmit={handleUpload}
          className="space-y-5"
        >

          {/* Image */}
          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Image
            </label>

            <label
              className="
                flex cursor-pointer flex-col
                items-center justify-center
                rounded-xl border-2 border-dashed
                border-gray-300
                px-6 py-10
                transition
                hover:border-gray-500
                hover:bg-gray-50
              "
            >

              <Upload
                size={28}
                className="mb-3 text-gray-400"
              />

              <span className="text-sm font-medium text-gray-700">
                {file
                  ? file.name
                  : "Click to select an image"}
              </span>

              <span className="mt-1 text-xs text-gray-400">
                JPG, PNG or WEBP
              </span>

              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                className="hidden"
              />

            </label>

          </div>


          {/* Title */}
          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Image Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Annual Sports Day"
              className="
                w-full rounded-lg border border-gray-300
                px-3 py-2.5 text-sm outline-none
                focus:border-gray-900
                focus:ring-1 focus:ring-gray-900
              "
            />

          </div>


          {/* Upload Button */}
          <button
            type="submit"
            disabled={uploading}
            className="
              inline-flex items-center justify-center
              gap-2 rounded-lg bg-gray-900
              px-5 py-2.5 text-sm font-medium
              text-white transition
              hover:bg-gray-800
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >

            {uploading ? (
              <>
                <Loader2
                  size={17}
                  className="animate-spin"
                />

                Uploading...
              </>
            ) : (
              <>
                <Upload size={17} />

                Upload Image
              </>
            )}

          </button>

        </form>

      </section>


      {/* Gallery */}
      <section>

        <div className="mb-4">

          <h2 className="text-lg font-semibold text-gray-900">
            Gallery Images
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {images.length} image
            {images.length !== 1 ? "s" : ""}
          </p>

        </div>


        {/* Loading */}
        {loading ? (

          <div className="
            flex min-h-48 items-center
            justify-center rounded-xl
            border border-gray-200 bg-white
          ">
            <Loader2
              size={28}
              className="animate-spin text-gray-500"
            />
          </div>

        ) : images.length === 0 ? (

          /* Empty */
          <div className="
            rounded-xl border border-dashed
            border-gray-300 bg-white
            p-12 text-center
          ">

            <div className="
              mx-auto flex h-12 w-12
              items-center justify-center
              rounded-full bg-gray-100
              text-gray-500
            ">
              <Images size={22} />
            </div>

            <h3 className="mt-4 font-semibold text-gray-900">
              No images yet
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Upload your first gallery image.
            </p>

          </div>

        ) : (

          /* Images */
          <div className="
            grid grid-cols-2 gap-4
            sm:grid-cols-3
            lg:grid-cols-4
          ">

            {images.map((image) => (

              <div
                key={image._id}
                className="
                  group overflow-hidden
                  rounded-xl border
                  border-gray-200 bg-white
                "
              >

                {/* Image */}
                <div className="relative aspect-square">

                  <img
                    src={image.image}
                    alt={image.title || "Gallery image"}
                    className="
                      h-full w-full
                      object-cover
                    "
                  />


                  {/* Delete */}
                  <button
                    onClick={() =>
                      handleDelete(image._id)
                    }
                    className="
                      absolute right-2 top-2
                      rounded-lg bg-white/90
                      p-2 text-red-600
                      opacity-0 shadow-sm
                      transition
                      group-hover:opacity-100
                      hover:bg-red-50
                    "
                    title="Delete image"
                  >
                    <Trash2 size={16} />
                  </button>

                </div>


                {/* Details */}
                <div className="p-3">

                  <p className="
                    truncate text-sm
                    font-medium text-gray-900
                  ">
                    {image.title || "Untitled"}
                  </p>

                  {image.createdAt && (
                    <p className="
                      mt-1 text-xs
                      text-gray-400
                    ">
                      {new Date(
                        image.createdAt
                      ).toLocaleDateString()}
                    </p>
                  )}

                </div>

              </div>

            ))}

          </div>

        )}

      </section>

    </div>
  );
}