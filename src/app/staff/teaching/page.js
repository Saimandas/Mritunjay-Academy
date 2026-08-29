"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Mail,
  Phone,
  X,
  Users,
  Award,
  Loader2,
  Briefcase,
} from "lucide-react";

import { useEffect, useState } from "react";

export default function TeachingStaffPage() {
  const [schoolStaff, setSchoolStaff] = useState([]);
  const [higherSecondaryStaff, setHigherSecondaryStaff] = useState([]);

  const [loading, setLoading] = useState(true);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [activeSection, setActiveSection] = useState("school");

  useEffect(() => {
    async function fetchTeachingStaff() {
      try {
        setLoading(true);

        const [schoolResponse, higherSecondaryResponse] =
          await Promise.all([
            fetch("/api/staff/teaching?section=school", {
              cache: "no-store",
            }),

            fetch("/api/staff/teaching?section=higherSecondary", {
              cache: "no-store",
            }),
          ]);

        const schoolResult = await schoolResponse.json();
        const higherSecondaryResult =
          await higherSecondaryResponse.json();

        if (!schoolResponse.ok) {
          throw new Error(
            schoolResult?.message ||
              "Failed to fetch school teaching staff."
          );
        }

        if (!higherSecondaryResponse.ok) {
          throw new Error(
            higherSecondaryResult?.message ||
              "Failed to fetch higher secondary teaching staff."
          );
        }

        setSchoolStaff(schoolResult?.data || []);
        setHigherSecondaryStaff(
          higherSecondaryResult?.data || []
        );
      } catch (error) {
        console.error(
          "FETCH TEACHING STAFF ERROR:",
          error
        );

        setSchoolStaff([]);
        setHigherSecondaryStaff([]);
      } finally {
        setLoading(false);
      }
    }

    fetchTeachingStaff();
  }, []);

  const currentStaff =
    activeSection === "school"
      ? schoolStaff
      : higherSecondaryStaff;

  return (
    <main className="min-h-screen bg-[#fffaf8] text-[#272323]">

      {/* =====================================================
          COMPACT PAGE TOP
      ===================================================== */}

      <section className="border-b border-[#ead9d5] bg-white">

        <div className="mx-auto max-w-7xl px-5 py-6 lg:px-6">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#b91c1c]">

                <span className="h-2 w-2 rounded-full bg-[#b91c1c]" />

                Administration

              </div>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#231f20] sm:text-4xl">
                Teaching Staff
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6b6262]">
                Meet the teachers who guide our students through
                their academic journey at Mrityunjoy Academy
                Sarthebari.
              </p>

            </div>


            <Link
              href="/"
              className="
                group
                inline-flex
                w-fit
                items-center
                gap-2
                text-sm
                font-semibold
                text-[#b91c1c]
                transition-all
                hover:gap-3
              "
            >
              Back to Home

              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />

            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          SECTION SWITCHER
      ===================================================== */}

      <section className="border-b border-[#ead9d5] bg-[#fff5f2]">

        <div className="mx-auto max-w-7xl px-5 lg:px-6">

          <div className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <p className="text-xs font-semibold text-[#8b7777]">
                Faculty Directory
              </p>

              <p className="mt-1 text-sm text-[#554b4b]">
                Select an academic section
              </p>

            </div>


            <div className="flex rounded-xl border border-[#e6ceca] bg-white p-1">

              <SectionButton
                active={activeSection === "school"}
                onClick={() => setActiveSection("school")}
                title="School Section"
                count={schoolStaff.length}
              />

              <SectionButton
                active={activeSection === "higher"}
                onClick={() => setActiveSection("higher")}
                title="Higher Secondary"
                count={higherSecondaryStaff.length}
              />

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CONTENT
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-5 py-8 lg:px-6">

        {/* SECTION TITLE */}

        <div className="mb-7 flex items-center justify-between">

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#b91c1c] text-white shadow-sm">
              <GraduationCap size={24} />
            </div>

            <div>

              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#b91c1c]">
                {activeSection === "school"
                  ? "School Faculty"
                  : "Higher Secondary Faculty"}
              </p>

              <h2 className="mt-1 text-xl font-bold text-[#231f20] sm:text-2xl">
                {activeSection === "school"
                  ? "School Section"
                  : "Higher Secondary Section"}
              </h2>

            </div>

          </div>


          <div className="hidden items-center gap-2 rounded-full bg-[#f8e9e6] px-3 py-2 text-xs font-semibold text-[#8f2727] sm:flex">

            <Users size={14} />

            {currentStaff.length}{" "}
            {currentStaff.length === 1
              ? "Teacher"
              : "Teachers"}

          </div>

        </div>


        {/* =================================================
            LOADING
        ================================================= */}

        {loading && (

          <div className="flex min-h-[350px] items-center justify-center rounded-2xl border border-[#ead9d5] bg-white">

            <div className="flex items-center gap-3 text-sm text-[#675c5c]">

              <Loader2
                size={20}
                className="animate-spin text-[#b91c1c]"
              />

              Loading teaching staff...

            </div>

          </div>

        )}


        {/* =================================================
            EMPTY
        ================================================= */}

        {!loading && currentStaff.length === 0 && (

          <div className="rounded-2xl border border-dashed border-[#ddc7c3] bg-white px-6 py-16 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f9e8e5] text-[#b91c1c]">

              <GraduationCap size={25} />

            </div>

            <h3 className="mt-4 text-lg font-bold text-[#292323]">
              No faculty information available
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#746969]">
              Teaching staff information for this section
              will appear here once it has been added.
            </p>

          </div>

        )}


        {/* =================================================
            STAFF GRID
        ================================================= */}

        {!loading && currentStaff.length > 0 && (

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {currentStaff.map((teacher, index) => (

              <TeacherCard
                key={teacher._id || index}
                teacher={teacher}
                index={index}
                onClick={() =>
                  setSelectedTeacher(teacher)
                }
              />

            ))}

          </div>

        )}

      </section>


      {/* =====================================================
          SMALL SCHOOL MESSAGE
      ===================================================== */}

      {!loading && currentStaff.length > 0 && (

        <section className="border-y border-[#ead9d5] bg-white">

          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 sm:flex-row sm:items-center sm:justify-between lg:px-6">

            <div className="flex items-center gap-4">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#fff0ed] text-[#b91c1c]">

                <Briefcase size={18} />

              </div>

              <div>

                <p className="font-semibold text-[#292323]">
                  Dedicated people behind every classroom
                </p>

                <p className="mt-1 text-xs text-[#746969]">
                  Our teachers work together to support
                  learning, discipline and student development.
                </p>

              </div>

            </div>

            <Link
              href="/contact"
              className="
                inline-flex
                w-fit
                items-center
                gap-2
                rounded-lg
                bg-[#b91c1c]
                px-4
                py-2.5
                text-sm
                font-semibold
                !text-white
                transition
                hover:bg-[#991b1b]
              "
            >
              Contact School
              <ArrowRight size={15} className="!text-white" />
            </Link>

          </div>

        </section>

      )}


      {/* =====================================================
          TEACHER MODAL
      ===================================================== */}

      {selectedTeacher && (

        <TeacherPreview
          teacher={selectedTeacher}
          onClose={() => setSelectedTeacher(null)}
        />

      )}

    </main>
  );
}


/* =========================================================
   SECTION BUTTON
========================================================= */

function SectionButton({
  active,
  onClick,
  title,
  count,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex
        items-center
        gap-2
        rounded-lg
        px-4
        py-2.5
        text-xs
        font-bold
        transition-all
        sm:text-sm
        ${
          active
            ? "bg-[#b91c1c] !text-white shadow-sm"
            : "text-[#665959] hover:bg-[#fff5f2] hover:text-[#b91c1c]"
        }
      `}
    >

      {title}

      <span
        className={`
          rounded-full
          px-1.5
          py-0.5
          text-[10px]
          ${
            active
              ? "bg-white/20 !text-white"
              : "bg-[#f5e5e2] text-[#9a3333]"
          }
        `}
      >
        {count}
      </span>

    </button>
  );
}


/* =========================================================
   TEACHER CARD
========================================================= */

function TeacherCard({
  teacher,
  index,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        group
        overflow-hidden
        rounded-2xl
        border
        border-[#ead9d5]
        bg-white
        text-left
        shadow-[0_3px_15px_rgba(91,35,28,0.05)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-[#d8aaa3]
        hover:shadow-[0_12px_30px_rgba(91,35,28,0.10)]
        focus:outline-none
        focus:ring-2
        focus:ring-[#b91c1c]/30
      "
      style={{
        animationDelay: `${index * 60}ms`,
      }}
    >

      {/* PHOTO */}

      <div className="relative h-[270px] overflow-hidden bg-[#f8e9e6]">

        {teacher.photo ? (

          <img
            src={teacher.photo}
            alt={teacher.name || "Teacher"}
            className="
              h-full
              w-full
              object-cover
              object-[center_12%]
              transition-transform
              duration-500
              group-hover:scale-[1.035]
            "
          />

        ) : (

          <div className="flex h-full w-full items-center justify-center text-[#b91c1c]">

            <GraduationCap
              size={58}
              strokeWidth={1.2}
            />

          </div>

        )}


        {/* PHOTO LABEL */}

        <div className="absolute bottom-3 left-3 rounded-md bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#a31d1d] shadow-sm">
          Faculty
        </div>

      </div>


      {/* DETAILS */}

      <div className="p-5">

        <div className="flex items-start justify-between gap-3">

          <div className="min-w-0">

            <h3 className="truncate text-lg font-bold text-[#282222]">
              {teacher.name || "Teacher"}
            </h3>

            {teacher.designation && (

              <p className="mt-1 text-xs font-semibold text-[#b91c1c]">
                {teacher.designation}
              </p>

            )}

          </div>


          <span className="
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-[#fff0ed]
            text-[#b91c1c]
            transition-all
            group-hover:bg-[#b91c1c]
            group-hover:text-white
          ">

            <ArrowRight size={15} />

          </span>

        </div>


        {/* SUBJECT */}

        {teacher.subject && (

          <div className="mt-5 flex items-center gap-3 border-t border-[#eee1de] pt-4">

            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#fff1ee] text-[#b91c1c]">

              <BookOpen size={15} />

            </div>

            <div className="min-w-0">

              <p className="text-[10px] font-bold uppercase tracking-wider text-[#9b8c8c]">
                Subject
              </p>

              <p className="mt-0.5 truncate text-sm font-medium text-[#403737]">
                {teacher.subject}
              </p>

            </div>

          </div>

        )}


        <p className="mt-5 text-xs font-bold text-[#b91c1c]">
          View teacher profile →
        </p>

      </div>

    </button>
  );
}


/* =========================================================
   TEACHER PREVIEW
========================================================= */

function TeacherPreview({
  teacher,
  onClose,
}) {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );

      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-[#321313]/60
        p-4
        backdrop-blur-sm
      "
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >

      <div className="
        relative
        max-h-[90vh]
        w-full
        max-w-2xl
        overflow-y-auto
        rounded-2xl
        border
        border-[#ead9d5]
        bg-white
        shadow-2xl
      ">

        {/* CLOSE */}

        <button
          type="button"
          onClick={onClose}
          aria-label="Close teacher profile"
          className="
            absolute
            right-4
            top-4
            z-20
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            bg-white/95
            text-[#5f5151]
            shadow
            transition
            hover:bg-[#b91c1c]
            hover:!text-white
          "
        >
          <X size={18} />
        </button>


        {/* PROFILE */}

        <div className="grid md:grid-cols-[250px_1fr]">

          {/* IMAGE */}

          <div className="h-72 bg-[#f8e9e6] md:h-auto md:min-h-[390px]">

            {teacher.photo ? (

              <img
                src={teacher.photo}
                alt={teacher.name || "Teacher"}
                className="
                  h-full
                  w-full
                  object-cover
                  object-[center_10%]
                "
              />

            ) : (

              <div className="flex h-full items-center justify-center text-[#b91c1c]">

                <GraduationCap
                  size={70}
                  strokeWidth={1.2}
                />

              </div>

            )}

          </div>


          {/* DETAILS */}

          <div className="p-6 sm:p-8">

            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#b91c1c]">
              Teaching Faculty
            </p>

            <h2 className="mt-2 pr-8 text-2xl font-bold text-[#241f1f]">
              {teacher.name || "Teacher"}
            </h2>

            {teacher.designation && (

              <p className="mt-1 text-sm font-semibold text-[#b91c1c]">
                {teacher.designation}
              </p>

            )}


            <div className="mt-7 space-y-4">

              {teacher.subject && (

                <ProfileInfo
                  icon={<BookOpen size={17} />}
                  label="Subject"
                  value={teacher.subject}
                />

              )}

              {teacher.qualification && (

                <ProfileInfo
                  icon={<Award size={17} />}
                  label="Qualification"
                  value={teacher.qualification}
                />

              )}

              {teacher.email && (

                <ProfileInfo
                  icon={<Mail size={17} />}
                  label="Email"
                  value={teacher.email}
                />

              )}

              {teacher.phone && (

                <ProfileInfo
                  icon={<Phone size={17} />}
                  label="Phone"
                  value={teacher.phone}
                />

              )}

            </div>

          </div>

        </div>


        {/* BIO */}

        {(teacher.bio || teacher.description) && (

          <div className="border-t border-[#ead9d5] bg-[#fffaf8] p-6 sm:p-8">

            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#b91c1c]">
              About
            </p>

            <p className="mt-3 text-sm leading-7 text-[#655959]">
              {teacher.bio || teacher.description}
            </p>

          </div>

        )}

      </div>

    </div>
  );
}


/* =========================================================
   PROFILE INFO
========================================================= */

function ProfileInfo({
  icon,
  label,
  value,
}) {
  return (
    <div className="flex gap-3">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#fff0ed] text-[#b91c1c]">
        {icon}
      </div>

      <div className="min-w-0">

        <p className="text-[10px] font-bold uppercase tracking-wider text-[#a29494]">
          {label}
        </p>

        <p className="mt-1 break-words text-sm font-medium text-[#3e3535]">
          {value}
        </p>

      </div>

    </div>
  );
}