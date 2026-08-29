"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Bell,
  CalendarDays,
  FileText,
  ExternalLink,
  Loader2,
  Megaphone,
  ChevronRight,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const categories = [
  "All",
  "Important",
  "Examination",
  "Event",
  "Meeting",
  "Holiday",
  "Admission",
  "General",
  "Academic",
];

export default function NoticesPage() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    async function fetchNotices() {
      try {
        setLoading(true);

        const response = await fetch("/api/notices", {
          cache: "no-store",
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result?.message || "Failed to fetch notices"
          );
        }

        setNotices(result?.data || []);
      } catch (error) {
        console.error("FETCH NOTICES ERROR:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchNotices();
  }, []);

  const filteredNotices = useMemo(() => {
    if (selectedCategory === "All") {
      return notices;
    }

    return notices.filter(
      (notice) =>
        (notice.category || "General") === selectedCategory
    );
  }, [notices, selectedCategory]);

  return (
    <main className="min-h-screen bg-[#fffaf8] text-[#292323]">

      {/* =====================================================
          COMPACT PAGE HEADER
      ===================================================== */}

      <section className="border-b border-[#ead9d5] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-7 lg:px-6">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#b91c1c]">
                <span className="h-2 w-2 rounded-full bg-[#b91c1c]" />
                School Information
              </div>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#231f20] sm:text-4xl">
                Notice Board
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6b6262]">
                Important announcements, examination updates,
                events and other information from the school.
              </p>
            </div>

            <div className="flex w-fit items-center gap-2 rounded-full bg-[#fff0ed] px-4 py-2 text-xs font-bold text-[#a31d1d]">
              <Bell size={15} />

              {notices.length}{" "}
              {notices.length === 1 ? "Notice" : "Notices"}
            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          NOTICE CONTENT
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-5 py-8 lg:px-6">

        {/* =================================================
            FILTER BAR
        ================================================= */}

        <div className="mb-7 rounded-2xl border border-[#ead9d5] bg-white p-4">

          <div className="mb-3 flex items-center gap-2">
            <Megaphone size={16} className="text-[#b91c1c]" />

            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#514747]">
              Filter Notices
            </span>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">

            {categories.map((category) => {
              const active = selectedCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`
                    shrink-0
                    rounded-full
                    border
                    px-4
                    py-2
                    text-xs
                    font-semibold
                    transition-all
                    duration-200
                    ${
                      active
                        ? "border-[#b91c1c] bg-[#b91c1c] text-white shadow-sm"
                        : "border-[#e6d8d5] bg-white text-[#665b5b] hover:border-[#c99b94] hover:bg-[#fff5f2] hover:text-[#a31d1d]"
                    }
                  `}
                >
                  {category}
                </button>
              );
            })}

          </div>
        </div>


        {/* =================================================
            RESULT COUNT
        ================================================= */}

        {!loading && notices.length > 0 && (
          <div className="mb-5 flex items-center justify-between">

            <p className="text-sm text-[#756969]">
              Showing{" "}
              <span className="font-bold text-[#302727]">
                {filteredNotices.length}
              </span>{" "}
              {filteredNotices.length === 1
                ? "notice"
                : "notices"}
            </p>

            {selectedCategory !== "All" && (
              <button
                type="button"
                onClick={() => setSelectedCategory("All")}
                className="text-xs font-semibold text-[#b91c1c] hover:underline"
              >
                Clear filter
              </button>
            )}

          </div>
        )}


        {/* =================================================
            LOADING
        ================================================= */}

        {loading && <NoticeSkeleton />}


        {/* =================================================
            EMPTY
        ================================================= */}

        {!loading && filteredNotices.length === 0 && (
          <div className="flex min-h-[330px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#ddc7c3] bg-white px-6 text-center">

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fff0ed] text-[#b91c1c]">
              <Bell size={27} />
            </div>

            <h2 className="mt-5 text-xl font-bold text-[#292323]">
              No notices found
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-[#746969]">
              There are no notices available for the selected
              category at the moment.
            </p>

            {selectedCategory !== "All" && (
              <button
                type="button"
                onClick={() => setSelectedCategory("All")}
                className="mt-5 rounded-full bg-[#b91c1c] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#991b1b]"
              >
                View All Notices
              </button>
            )}

          </div>
        )}


        {/* =================================================
            NOTICE LIST
        ================================================= */}

        {!loading && filteredNotices.length > 0 && (
          <div className="space-y-4">

            {filteredNotices.map((notice, index) => (
              <NoticeCard
                key={notice._id || index}
                notice={notice}
                index={index}
              />
            ))}

          </div>
        )}

      </section>


      {/* =====================================================
          BACK TO HOME
      ===================================================== */}

      <section className="border-t border-[#ead9d5] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-7 lg:px-6">

          <Link
            href="/"
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              font-semibold
              text-[#a31d1d]
              transition-all
              hover:gap-3
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
   NOTICE CARD
========================================================= */

function NoticeCard({ notice, index }) {
  const category = notice.category || "General";

  const formattedDate = notice.date
    ? new Date(notice.date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "";

  const isImportant =
    category.toLowerCase() === "important";

  return (
    <article
      className={`
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        bg-white
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:shadow-[0_12px_35px_rgba(91,35,28,0.09)]
        ${
          isImportant
            ? "border-[#d9a5a0]"
            : "border-[#ead9d5]"
        }
      `}
    >

      {/* IMPORTANT ACCENT */}

      {isImportant && (
        <div className="absolute inset-y-0 left-0 w-1 bg-[#b91c1c]" />
      )}


      <div className="flex gap-4 p-5 sm:gap-5 sm:p-6">

        {/* DATE / ICON */}

        <div className="hidden shrink-0 sm:block">

          <div className="
            flex
            h-14
            w-14
            flex-col
            items-center
            justify-center
            rounded-xl
            bg-[#fff0ed]
            text-[#b91c1c]
          ">
            <FileText size={19} />

            <span className="mt-1 text-[8px] font-bold uppercase tracking-wider">
              Notice
            </span>
          </div>

        </div>


        {/* CONTENT */}

        <div className="min-w-0 flex-1">

          {/* META */}

          <div className="flex flex-wrap items-center gap-2">

            <span
              className={`
                rounded-full
                px-3
                py-1
                text-[10px]
                font-bold
                uppercase
                tracking-wide
                ${
                  isImportant
                    ? "bg-[#b91c1c] text-white"
                    : "bg-[#fff0ed] text-[#a31d1d]"
                }
              `}
            >
              {category}
            </span>

            {formattedDate && (
              <>
                <span className="h-1 w-1 rounded-full bg-[#cdbdb9]" />

                <span className="flex items-center gap-1.5 text-xs text-[#807474]">
                  <CalendarDays size={13} />
                  {formattedDate}
                </span>
              </>
            )}

          </div>


          {/* TITLE */}

          <h2 className="
            mt-3
            text-lg
            font-bold
            leading-7
            text-[#292323]
            transition-colors
            group-hover:text-[#a31d1d]
            sm:text-xl
          ">
            {notice.title}
          </h2>


          {/* DESCRIPTION */}

          {notice.description && (
            <p className="
              mt-2
              max-w-4xl
              text-sm
              leading-6
              text-[#665b5b]
            ">
              {notice.description}
            </p>
          )}


          {/* ACTIONS */}

          <div className="mt-5 flex flex-wrap items-center gap-3">

            {notice.link && (
              <a
                href={notice.link}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-[#292323]
                  px-4
                  py-2
                  text-xs
                  font-bold
                  text-white
                  transition-all
                  hover:bg-[#a31d1d]
                "
              >
                View Details
                <ExternalLink size={13} />
              </a>
            )}

            {notice.fileUrl && (
              <a
                href={notice.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-[#ddc7c3]
                  bg-white
                  px-4
                  py-2
                  text-xs
                  font-bold
                  text-[#a31d1d]
                  transition-all
                  hover:border-[#b91c1c]
                  hover:bg-[#fff5f2]
                "
              >
                <FileText size={13} />
                View PDF
                <ChevronRight
                  size={13}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </a>
            )}

            {!notice.link && !notice.fileUrl && formattedDate && (
              <span className="flex items-center gap-1.5 text-xs text-[#8a7c7c]">
                <CalendarDays size={13} />
                Published {formattedDate}
              </span>
            )}

          </div>

        </div>

      </div>

    </article>
  );
}


/* =========================================================
   SKELETON
========================================================= */

function NoticeSkeleton() {
  return (
    <div className="space-y-4">

      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border border-[#ead9d5] bg-white p-5 sm:p-6"
        >

          <div className="flex gap-5">

            <div className="hidden h-14 w-14 shrink-0 animate-pulse rounded-xl bg-[#f2e8e5] sm:block" />

            <div className="flex-1">

              <div className="flex gap-2">
                <div className="h-6 w-20 animate-pulse rounded-full bg-[#f2e8e5]" />
                <div className="h-6 w-24 animate-pulse rounded-full bg-[#f2e8e5]" />
              </div>

              <div className="mt-4 h-6 w-2/3 animate-pulse rounded bg-[#f2e8e5]" />

              <div className="mt-3 h-4 w-full animate-pulse rounded bg-[#f2e8e5]" />

              <div className="mt-2 h-4 w-4/5 animate-pulse rounded bg-[#f2e8e5]" />

              <div className="mt-5 h-8 w-28 animate-pulse rounded-full bg-[#f2e8e5]" />

            </div>

          </div>

        </div>
      ))}

    </div>
  );
}