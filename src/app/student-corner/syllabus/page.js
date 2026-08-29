"use client";

import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  Download,
  Loader2,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function SyllabusPage() {
  const [syllabus, setSyllabus] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSyllabus() {
      try {
        const response = await fetch("/api/syllabus");
        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Failed to fetch syllabus"
          );
        }

        setSyllabus(result.data || []);
      } catch (error) {
        console.error("FETCH SYLLABUS ERROR:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSyllabus();
  }, []);

  return (
    <main>

      {/* PAGE HEADER */}

      <section className="border-b border-border bg-light-green">
        <div className="mx-auto max-w-7xl px-5 py-10 lg:px-6">

          <p className="text-sm font-medium text-primary">
            Student Corner
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-heading md:text-4xl">
            Syllabus
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-text">
            View and download syllabus documents for
            different classes and subjects.
          </p>

        </div>
      </section>


      {/* SYLLABUS */}

      <section className="py-12 md:py-16">

        <div className="mx-auto max-w-7xl px-5 lg:px-6">

          {loading ? (

            <div className="
              flex
              min-h-60
              items-center
              justify-center
              border
              border-border
              bg-card
            ">

              <div className="
                flex
                items-center
                gap-3
                text-sm
                text-text
              ">

                <Loader2
                  size={20}
                  className="animate-spin text-primary"
                />

                Loading syllabus...

              </div>

            </div>

          ) : syllabus.length === 0 ? (

            <div className="
              border
              border-dashed
              border-border
              bg-card
              px-6
              py-16
              text-center
            ">

              <div className="
                mx-auto
                flex
                h-12
                w-12
                items-center
                justify-center
                bg-light-green
                text-primary
              ">
                <FileText size={22} />
              </div>

              <h2 className="
                mt-4
                font-semibold
                text-heading
              ">
                No syllabus available
              </h2>

              <p className="
                mt-2
                text-sm
                text-text
              ">
                Syllabus documents will appear here
                when they are published.
              </p>

            </div>

          ) : (

            <div className="
              grid
              gap-5
              md:grid-cols-2
            ">

              {syllabus.map((item) => (
                <SyllabusCard
                  key={item._id}
                  item={item}
                />
              ))}

            </div>

          )}

        </div>

      </section>


      {/* BACK */}

      <section className="
        border-t
        border-border
        py-8
      ">

        <div className="
          mx-auto
          max-w-7xl
          px-5
          lg:px-6
        ">

          <Link
            href="/"
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              font-medium
              text-primary
              transition-opacity
              hover:opacity-70
            "
          >

            <ArrowLeft size={16} />

            Back to Home

          </Link>

        </div>

      </section>

    </main>
  );
}


/* =========================================================
   SYLLABUS CARD
========================================================= */

function SyllabusCard({ item }) {
  return (
    <article className="
      border
      border-border
      bg-card
      p-5
    ">

      <div className="flex gap-4">

        {/* ICON */}

        <div className="
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          bg-light-green
          text-primary
        ">

          <FileText size={21} />

        </div>


        {/* CONTENT */}

        <div className="min-w-0 flex-1">

          {/* YEAR + CLASS */}

          <div className="
            flex
            flex-wrap
            items-center
            gap-2
          ">

            <span className="
              bg-light-green
              px-2.5
              py-1
              text-[11px]
              font-semibold
              text-primary
            ">
              {item.academicYear}
            </span>

            <span className="
              text-xs
              text-text
            ">
              {item.className}
            </span>

          </div>


          {/* TITLE */}

          <h2 className="
            mt-3
            font-semibold
            text-heading
          ">
            {item.title}
          </h2>


          {/* SUBJECT */}

          <p className="
            mt-1
            text-sm
            font-medium
            text-primary
          ">
            {item.subject}
          </p>


          {/* DESCRIPTION */}

          {item.description && (
            <p className="
              mt-2
              text-sm
              leading-6
              text-text
            ">
              {item.description}
            </p>
          )}


          {/* DOWNLOAD */}

          <a
            href={item.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              mt-5
              inline-flex
              items-center
              gap-2
              border
              border-border
              px-3
              py-2
              text-sm
              font-medium
              text-heading
              transition-colors
              hover:bg-light-green
              hover:text-primary
            "
          >

            <Download size={16} />

            View / Download

          </a>

        </div>

      </div>

    </article>
  );
}