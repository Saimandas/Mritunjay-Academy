"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Home,
  ShieldCheck,
  Wifi,
} from "lucide-react";


/* =========================================================
   SCHOOL RULES
========================================================= */

const schoolRules = [
  "The students will have to pay tuition fees for 12 months for an academic session.",

  "Students should pay the tuition fee for an academic session in three instalments (July | October | January).",

  "Tuition fees for the whole year must be paid at the time of form fill up of H.S. First Year Examination / H.S. Final Examination.",

  "Students having attendance of less than 90% will not be allowed to sit for the Final/Test Examinations.",

  "Students unable to obtain at least 60% marks in any Examination must attend the Remedial Classes to be held after the school breaks up or on holidays and they should enable themselves to obtain 60% marks.",

  "Using mobile phone is strictly prohibited in the school campus.",

  "The guardians will not be allowed to meet their children during the school hour (except for unavoidable reason). In this regard, permission from the Principal is mandatory.",

  "The students should inform the Principal by an application with the signature of their guardians for granting leave of absence. Disciplinary action will be taken against the students violating the rules or giving opinion against the rules and regulations of the institution.",

  "Students must attend their classes or any function with clean uniform prescribed by the authority.",

  "Students will have to compensate for doing any damage of property of the institution.",

  "The School authority may amend the rules & regulations when felt necessary.",
];


/* =========================================================
   HOSTEL RULES
========================================================= */

const hostelRules = [
  "The admission of hostel boarders covers one academic session (12 months). The boarders will avail hostel facility for next session after getting newly admitted.",

  "Guardians should take permission from Hostel Guide to meet their children.",

  "In case a boarder has to go out of the hostel with guardians on account of illness or for any other unavoidable reason written permission from Hostel In-Charge is mandatory.",

  "Other people will be allowed to meet the boarder after showing the identity cards.",

  "Visiting hours : Sunday – from 9:00 a.m. to 1:00 p.m.",

  "Guardians should spend 30 minutes with their children in the hostel campus.",

  "Boarders will be allowed to go home during holidays like Rongali Bihu, summer vacation, Durga Puja and Magh Bihu. They should come to hostel on the previous day of the school opens; otherwise they will be considered absent and a fine of Rs. 300/- will be imposed on them.",

  "Mess dues and other fees should be paid on or before 10th of every month.",

  "Wicked natured students will be expelled from the hostel. In this regard, no complaint from the guardians will be entertained.",

  "No fees will be returned if any boarder leaves the Hostel in mid-session.",
];


/* =========================================================
   PAGE
========================================================= */

export default function RulesAndRegulationsPage() {

  return (

    <main className="min-h-screen bg-background text-text">


      {/* =====================================================
          COMPACT PAGE HEADER
      ===================================================== */}

      <section className="border-b border-primary/20 bg-primary">

        <div className="mx-auto max-w-7xl px-5 py-7 sm:py-8 lg:px-6">

          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

            <div>

              <p className="text-[11px] font-bold uppercase tracking-[0.2em] !text-white/70">
                Administration
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight !text-white sm:text-4xl">
                Rules & Regulations
              </h1>

              <p className="mt-2 text-sm !text-white/75">
                Guidelines for students, guardians and hostel boarders
              </p>

            </div>


            <Link
              href="/"
              className="
                inline-flex
                w-fit
                items-center
                gap-2
                text-sm
                font-semibold
                !text-white
                transition-all
                duration-200
                hover:gap-3
              "
            >

              Home

              <ArrowRight
                size={15}
                className="!text-white"
              />

            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          INTRO STRIP
      ===================================================== */}

      <section className="border-b border-border bg-card">

        <div className="mx-auto flex max-w-7xl items-center gap-4 px-5 py-5 lg:px-6">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">

            <ShieldCheck size={22} />

          </div>


          <div>

            <h2 className="text-base font-bold text-heading sm:text-lg">
              Important Information for Students
            </h2>

            <p className="mt-1 text-sm leading-6 text-text">
              Students and guardians are expected to follow the rules
              and regulations of the institution.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <section className="px-5 py-8 sm:py-10 lg:px-6 lg:py-12">

        <div className="mx-auto max-w-7xl">


          {/* =================================================
              SCHOOL RULES
          ================================================= */}

          <RulesSection
            number="01"
            icon={<BookOpen size={22} />}
            title="School Rules & Regulations"
            description="Rules applicable to students during their academic session."
            rules={schoolRules}
          />


          {/* =================================================
              COMMUNICATION
          ================================================= */}

          <section className="my-7 overflow-hidden rounded-xl border border-primary/10 bg-primary/5">

            <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:p-6">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-white">

                <Wifi size={22} />

              </div>


              <div className="flex-1">

                <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
                  Student Facility
                </p>

                <h2 className="mt-1 text-lg font-bold text-heading">
                  Internet Facility
                </h2>

                <p className="mt-1 text-sm leading-6 text-text">
                  Free internet facility for students & staff will be
                  available for important communications.
                </p>

              </div>


              <div className="hidden h-10 w-px bg-primary/15 sm:block" />

              <div className="text-sm font-semibold text-primary">
                For Important Communications
              </div>

            </div>

          </section>


          {/* =================================================
              HOSTEL RULES
          ================================================= */}

          <RulesSection
            number="02"
            icon={<Home size={22} />}
            title="Hostel Rules & Regulations"
            description="Guidelines for students staying in the school hostel."
            rules={hostelRules}
            hostel
          />


          {/* =================================================
              BOTTOM NOTE
          ================================================= */}

          <div className="mt-7 flex items-start gap-4 rounded-xl border border-primary/10 bg-card p-5">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">

              <GraduationCap size={20} />

            </div>


            <div>

              <p className="font-semibold text-heading">
                Please follow the school guidelines
              </p>

              <p className="mt-1 text-sm leading-6 text-text">
                These rules are intended to maintain discipline,
                responsibility and a positive environment for all
                students.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CONTACT STRIP
      ===================================================== */}

      <section className="border-t border-primary/20 bg-primary">

        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 sm:flex-row sm:items-center sm:justify-between lg:px-6">

          <div>

            <p className="text-base font-bold !text-white">
              Have a question about the rules?
            </p>

            <p className="mt-1 text-sm !text-white/70">
              Contact the school administration for clarification.
            </p>

          </div>


          <Link
            href="/contact"
            className="
              group
              inline-flex
              w-fit
              items-center
              justify-center
              gap-2
              rounded-lg
              bg-white
              px-5
              py-3
              text-sm
              font-bold
              !text-primary
              transition-all
              duration-200
              hover:bg-white/90
              hover:gap-3
            "
          >

            Contact Us

            <ArrowRight
              size={16}
              className="!text-primary transition-transform duration-200 group-hover:translate-x-1"
            />

          </Link>

        </div>

      </section>


      {/* =====================================================
          ANIMATION
      ===================================================== */}

      <style jsx global>{`

        .rules-section {
          animation: rulesSectionIn 0.55s ease both;
        }

        .rule-item {
          transition:
            background-color 0.2s ease,
            padding-left 0.2s ease;
        }

        .rule-item:hover {
          background-color: rgba(185, 28, 28, 0.035);
        }

        .rule-number {
          transition:
            transform 0.2s ease,
            background-color 0.2s ease;
        }

        .rule-item:hover .rule-number {
          transform: scale(1.06);
        }

        @keyframes rulesSectionIn {

          from {
            opacity: 0;
            transform: translateY(12px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }

        }

        @media (prefers-reduced-motion: reduce) {

          .rules-section,
          .rule-item,
          .rule-number {
            animation: none !important;
            transition: none !important;
          }

        }

      `}</style>

    </main>

  );
}


/* =========================================================
   RULES SECTION
========================================================= */

function RulesSection({
  number,
  icon,
  title,
  description,
  rules,
  hostel = false,
}) {

  return (

    <section className="rules-section overflow-hidden rounded-xl border border-border bg-card shadow-sm">


      {/* =====================================================
          SECTION HEADER
      ===================================================== */}

      <div className="border-b border-border px-5 py-5 sm:px-6">

        <div className="flex items-center gap-4">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-white">

            {icon}

          </div>


          <div className="min-w-0 flex-1">

            <div className="flex items-center gap-2">

              <span className="text-[10px] font-bold tracking-[0.15em] text-primary">
                {number}
              </span>

              <span className="h-px w-5 bg-primary/30" />

              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-text/60">
                {hostel ? "Hostel" : "School"}
              </span>

            </div>


            <h2 className="mt-1 text-xl font-bold tracking-tight text-heading sm:text-2xl">
              {title}
            </h2>

            <p className="mt-1 text-sm text-text">
              {description}
            </p>

          </div>

        </div>

      </div>


      {/* =====================================================
          RULE LIST
      ===================================================== */}

      <div className="divide-y divide-border">

        {rules.map((rule, index) => (

          <div
            key={index}
            className="rule-item flex gap-4 px-5 py-4 sm:px-6"
          >

            {/* NUMBER */}

            <div className="rule-number flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-[10px] font-bold text-primary">

              {String(index + 1).padStart(2, "0")}

            </div>


            {/* TEXT */}

            <div className="flex min-w-0 flex-1 items-start gap-3">

              <CheckCircle2
                size={16}
                className="mt-1 shrink-0 text-primary/60"
              />

              <p className="text-sm leading-6 text-text sm:text-[15px] sm:leading-7">
                {rule}
              </p>

            </div>


            <ChevronRight
              size={16}
              className="mt-1 hidden shrink-0 text-primary/30 sm:block"
            />

          </div>

        ))}

      </div>


      {/* =====================================================
          HOSTEL SIGNATURE
      ===================================================== */}

      {hostel && (

        <div className="border-t border-border bg-primary/5 px-5 py-4 text-right sm:px-6">

          <p className="text-xs font-semibold text-text">
            Principal / Management Committee
          </p>

        </div>

      )}

    </section>

  );
}