"use client";

import { useEffect, useState } from "react";
import {
  X,
  Loader2,
  ImageIcon,
  CalendarDays,
} from "lucide-react";

export default function GalleryPage() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] =
    useState(null);

  // Get gallery photos from the database
  async function fetchGallery() {
    try {
      setLoading(true);

      const response = await fetch(
        "/api/gallery",
        {
          cache: "no-store",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to fetch gallery"
        );
      }

      // Only show published photos on the public page
      const publishedGallery = (
        result.data || []
      ).filter(
        (item) => item.isPublished === true
      );

      setGallery(publishedGallery);
    } catch (error) {
      console.error(
        "FETCH PUBLIC GALLERY ERROR:",
        error
      );

      setGallery([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchGallery();
  }, []);

  // Format gallery date
  function formatDate(date) {
    if (!date) {
      return "";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "";
    }

    return parsedDate.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  }

  return (
    <>
      <main className="min-h-screen bg-background">

        {/* Header */}

        <section className="border-b border-border bg-light-green/30">

          <div className="
            mx-auto
            max-w-7xl
            px-5
            py-12
            lg:px-6
            md:py-16
          ">

            <p className="
              text-xs
              font-semibold
              uppercase
              tracking-wider
              text-primary
            ">
              School Moments
            </p>

            <h1 className="
              mt-2
              text-3xl
              font-bold
              tracking-tight
              text-heading
              md:text-4xl
            ">
              Photo Gallery
            </h1>

            <p className="
              mt-3
              max-w-2xl
              text-sm
              leading-6
              text-text
              md:text-base
            ">
              Explore moments and memories
              from Jatiya Vidyalaya.
            </p>

          </div>

        </section>

        {/* Gallery */}

        <section className="
          mx-auto
          max-w-7xl
          px-5
          py-10
          lg:px-6
          md:py-14
        ">

          {loading ? (

            <div className="
              flex
              min-h-64
              items-center
              justify-center
              rounded-lg
              border
              border-border
              bg-card
            ">

              <div className="
                flex
                flex-col
                items-center
                gap-3
              ">

                <Loader2
                  size={28}
                  className="
                    animate-spin
                    text-primary
                  "
                />

                <p className="
                  text-sm
                  text-text
                ">
                  Loading gallery...
                </p>

              </div>

            </div>

          ) : gallery.length === 0 ? (

            <div className="
              flex
              min-h-64
              flex-col
              items-center
              justify-center
              rounded-lg
              border
              border-dashed
              border-border
              bg-card
              px-6
              text-center
            ">

              <div className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-lg
                bg-light-green
                text-primary
              ">
                <ImageIcon size={22} />
              </div>

              <h2 className="
                mt-4
                font-semibold
                text-heading
              ">
                No photos available
              </h2>

              <p className="
                mt-1
                text-sm
                text-text
              ">
                There are no published
                gallery photos at the moment.
              </p>

            </div>

          ) : (

            <div className="
              grid
              gap-5
              sm:grid-cols-2
              lg:grid-cols-3
            ">

              {gallery.map((item) => (

                <button
                  key={item._id}
                  type="button"
                  onClick={() =>
                    setSelectedImage(item)
                  }
                  className="
                    group
                    overflow-hidden
                    rounded-lg
                    border
                    border-border
                    bg-card
                    text-left
                    transition
                    hover:-translate-y-0.5
                    hover:shadow-md
                  "
                >

                  {/* Image */}

                  <div className="
                    aspect-[4/3]
                    w-full
                    overflow-hidden
                    bg-light-green
                  ">

                    <img
                      src={item.image}
                      alt={
                        item.title ||
                        "School gallery photo"
                      }
                      className="
                        h-full
                        w-full
                        object-cover
                        object-[center_10%]
                        transition-transform
                        duration-300
                        group-hover:scale-105
                      "
                    />

                  </div>

                  {/* Information */}

                  <div className="p-4">

                    <h2 className="
                      line-clamp-2
                      text-sm
                      font-semibold
                      text-heading
                    ">
                      {item.title}
                    </h2>

                    {item.description && (
                      <p className="
                        mt-1.5
                        line-clamp-2
                        text-xs
                        leading-5
                        text-text
                      ">
                        {item.description}
                      </p>
                    )}

                    <div className="
                      mt-3
                      flex
                      flex-wrap
                      items-center
                      gap-3
                    ">

                      {item.category && (
                        <span className="
                          rounded-md
                          bg-light-green
                          px-2.5
                          py-1
                          text-[11px]
                          font-medium
                          text-primary
                        ">
                          {item.category}
                        </span>
                      )}

                      {item.date && (
                        <span className="
                          flex
                          items-center
                          gap-1.5
                          text-[11px]
                          text-text
                        ">
                          <CalendarDays
                            size={13}
                          />

                          {formatDate(
                            item.date
                          )}
                        </span>
                      )}

                    </div>

                  </div>

                </button>

              ))}

            </div>

          )}

        </section>

      </main>

      {/* Image Preview */}

      {selectedImage && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/80
            p-4
            md:p-8
          "
          onClick={() =>
            setSelectedImage(null)
          }
        >

          <button
            type="button"
            onClick={() =>
              setSelectedImage(null)
            }
            className="
              absolute
              right-4
              top-4
              z-10
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-lg
              bg-white/10
              text-white
              backdrop-blur
              transition
              hover:bg-white/20
            "
            aria-label="Close preview"
          >
            <X size={22} />
          </button>

          <div
            className="
              flex
              max-h-[90vh]
              max-w-6xl
              flex-col
              items-center
            "
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <img
              src={selectedImage.image}
              alt={
                selectedImage.title ||
                "Gallery preview"
              }
              className="
                max-h-[75vh]
                max-w-full
                rounded-lg
                object-contain
              "
            />

            <div className="
              mt-4
              max-w-2xl
              text-center
            ">

              <h2 className="
                text-lg
                font-semibold
                text-white
              ">
                {selectedImage.title}
              </h2>

              {selectedImage.description && (
                <p className="
                  mt-1
                  text-sm
                  text-white/70
                ">
                  {selectedImage.description}
                </p>
              )}

              <div className="
                mt-2
                flex
                items-center
                justify-center
                gap-3
                text-xs
                text-white/60
              ">

                {/* {selectedImage.category && (
                  <span>
                    {selectedImage.category}
                  </span>
                )} */}

                {selectedImage.date && (
                  <span>
                    {formatDate(
                      selectedImage.date
                    )}
                  </span>
                )}

              </div>

            </div>

          </div>

        </div>
      )}
    </>
  );
}