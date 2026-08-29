"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  ArrowRight,
  GraduationCap,
  Quote,
  Loader2,
  CheckCircle2,
  BookOpen,
  Users,
  Target,
} from "lucide-react";


/* =========================================================
   PRINCIPAL PAGE
========================================================= */

export default function PrincipalPage() {
  const [principal, setPrincipal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  /* =======================================================
     LOAD PRINCIPAL
  ======================================================= */

  useEffect(() => {
    let mounted = true;

    async function loadPrincipal() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/principal", {
          cache: "no-store",
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result?.message ||
              "Failed to fetch principal information"
          );
        }

        if (mounted) {
          setPrincipal(result?.data || null);
        }

      } catch (err) {
        console.error(
          "FETCH PRINCIPAL ERROR:",
          err
        );

        if (mounted) {
          setError(
            err?.message ||
              "Unable to load principal information."
          );
        }

      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadPrincipal();

    return () => {
      mounted = false;
    };
  }, []);


  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <main className="min-h-screen bg-background">

        <div className="flex min-h-[35vh] items-center justify-center px-5">

          <div className="flex items-center gap-3 rounded-lg border border-border bg-card px-5 py-4 shadow-sm">

            <Loader2
              size={19}
              className="animate-spin text-primary"
            />

            <span className="text-sm font-medium text-text">
              Loading principal information...
            </span>

          </div>

        </div>

      </main>
    );
  }


  /* =======================================================
     ERROR / EMPTY
  ======================================================= */

  if (error || !principal) {
    return (
      <main className="min-h-screen bg-background text-text">

        {/* COMPACT PAGE HEADER */}

        <section className="border-b border-primary/20 bg-primary">

          <div className="mx-auto max-w-7xl px-5 py-7 sm:py-8 lg:px-6">

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/75">
              Administration
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight !text-white sm:text-4xl">
              Principal&apos;s Desk
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 !text-white/75">
              Message, vision and guidance from the Principal of
              Mrityunjoy Academy Sarthebari.
            </p>

          </div>

        </section>


        {/* ERROR */}

        <section className="flex items-center justify-center px-5 py-20">

          <div className="max-w-md text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">

              <GraduationCap size={28} />

            </div>


            <h2 className="mt-5 text-xl font-bold text-heading">
              Information unavailable
            </h2>


            <p className="mt-2 text-sm leading-6 text-text">
              {error ||
                "Principal information is currently unavailable."}
            </p>


            <Link
              href="/"
              className="
                mt-6
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-lg
                bg-primary
                px-6
                py-3
                text-sm
                font-semibold
                !text-white
                transition
                hover:bg-primary-dark
                hover:!text-white
              "
            >
              <span className="!text-white">
                Return Home
              </span>

              <ArrowRight
                size={16}
                className="!text-white"
              />

            </Link>

          </div>

        </section>

      </main>
    );
  }


  /* =======================================================
     MESSAGE PARAGRAPHS
  ======================================================= */

  const paragraphs =
    typeof principal.message === "string"
      ? principal.message
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean)
      : [];


  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <main className="min-h-screen bg-background text-text">


      {/* =====================================================
          COMPACT PAGE HEADER
      ===================================================== */}

      <section className="border-b border-primary/20 bg-primary">

        <div className="mx-auto max-w-7xl px-5 py-7 sm:py-8 lg:px-6">

          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

            <div>

              <p className="text-[11px] font-bold uppercase tracking-[0.2em] !text-white/75">
                Administration
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight !text-white sm:text-4xl">
                Principal&apos;s Desk
              </h1>

              <p className="mt-2 text-sm !text-white/75">
                Message and vision from the Principal
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
                transition
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
          PRINCIPAL PROFILE
      ===================================================== */}

      <section className="px-5 py-8 sm:py-10 lg:px-6 lg:py-12">

        <div className="mx-auto max-w-7xl">

          <div className="grid overflow-hidden rounded-2xl border border-border bg-card shadow-sm lg:grid-cols-[350px_1fr]">


            {/* =================================================
                IMAGE
            ================================================= */}

            <div className="relative min-h-[380px] bg-primary/5">

              {principal.image ? (

                <img
                  src={principal.image}
                  alt={
                    principal.name ||
                    "Principal"
                  }
                  className="
                    absolute
                    inset-0
                    h-full
                    w-full
                    object-cover
                  "
                />

              ) : (

                <div className="flex h-full min-h-[380px] items-center justify-center text-primary">

                  <GraduationCap
                    size={90}
                    strokeWidth={1}
                  />

                </div>

              )}


              {/* IMAGE LABEL */}

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/75 to-transparent px-6 pb-6 pt-20">

                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/70">
                  Head of Institution
                </p>

                <h2 className="mt-1 text-xl font-bold !text-white">
                  {principal.name}
                </h2>

                <p className="mt-1 text-sm !text-white/70">
                  Principal
                </p>

              </div>

            </div>


            {/* =================================================
                MESSAGE
            ================================================= */}

            <div className="p-6 sm:p-8 lg:p-10">

              {/* LABEL */}

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">

                  <Quote size={20} />

                </div>

                <div>

                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
                    Principal&apos;s Message
                  </p>

                  <p className="mt-1 text-xs text-text">
                    A message to our students and parents
                  </p>

                </div>

              </div>


              {/* QUOTE */}

              {principal.quote && (

                <blockquote className="mt-6 border-l-4 border-primary bg-primary/5 px-5 py-4 text-base font-semibold leading-7 text-heading sm:text-lg">

                  {principal.quote}

                </blockquote>

              )}


              {/* MESSAGE */}

              {paragraphs.length > 0 && (

                <div className="mt-6 space-y-4">

                  {paragraphs.map(
                    (paragraph, index) => (

                      <p
                        key={index}
                        className="text-sm leading-7 text-text sm:text-[15px]"
                      >
                        {paragraph}
                      </p>

                    )
                  )}

                </div>

              )}


              {/* SIGNATURE */}

              <div className="mt-7 border-t border-border pt-5">

                <p className="font-bold text-heading">
                  {principal.name}
                </p>

                <p className="mt-1 text-xs text-text">
                  Principal, Mrityunjoy Academy Sarthebari
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          VISION
      ===================================================== */}

      <section className="border-y border-primary/10 bg-primary/5 px-5 py-10 sm:py-12 lg:px-6">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">


            {/* INTRO */}

            <div>

              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">

                <Target size={16} />

                Principal&apos;s Vision

              </div>


              <h2 className="mt-3 text-2xl font-bold tracking-tight text-heading sm:text-3xl">

                {principal.vision?.title ||
                  "Building a strong foundation for every student"}

              </h2>


              <p className="mt-3 max-w-lg text-sm leading-7 text-text">

                {principal.vision?.description ||
                  "Creating an environment where students can learn with confidence, develop good values and prepare themselves for the future."}

              </p>

            </div>


            {/* VISION ITEMS */}

            <div className="grid gap-3 sm:grid-cols-3">

              <VisionItem
                icon={<BookOpen size={19} />}
                title="Learning"
                text={
                  principal.vision?.learning ||
                  "Building curiosity, knowledge and strong academic foundations."
                }
              />


              <VisionItem
                icon={<CheckCircle2 size={19} />}
                title="Discipline"
                text={
                  principal.vision?.discipline ||
                  "Developing responsibility, respect and positive habits."
                }
              />


              <VisionItem
                icon={<Users size={19} />}
                title="Development"
                text={
                  principal.vision?.development ||
                  "Supporting confidence, teamwork and personal growth."
                }
              />

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          OUR COMMITMENT
      ===================================================== */}

      <section className="px-5 py-10 sm:py-12 lg:px-6 lg:py-14">

        <div className="mx-auto max-w-7xl">


          <div className="mb-7">

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
              Our Commitment
            </p>

            <h2 className="mt-2 text-2xl font-bold text-heading sm:text-3xl">
              Helping every student move forward
            </h2>

          </div>


          <div className="grid gap-4 md:grid-cols-3">

            <Commitment
              number="01"
              title="Academic Growth"
              text="Creating strong learning habits and encouraging students to achieve their academic potential."
            />

            <Commitment
              number="02"
              title="Student Confidence"
              text="Giving every student opportunities to participate, communicate and discover their abilities."
            />

            <Commitment
              number="03"
              title="Shared Responsibility"
              text="Working together with teachers, parents and the community for the development of every child."
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          END NOTE
      ===================================================== */}

      <section className="border-t border-border bg-card px-5 py-9 text-center">

        <div className="mx-auto max-w-2xl">

          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">

            <GraduationCap size={20} />

          </div>


          <p className="mt-4 text-sm leading-6 text-text">

            Together, we continue to build a learning environment
            where every student can grow with knowledge, confidence
            and values.

          </p>

        </div>

      </section>


    </main>
  );
}


/* =========================================================
   VISION ITEM
========================================================= */

function VisionItem({
  icon,
  title,
  text,
}) {

  return (

    <div className="rounded-xl border border-primary/10 bg-card p-5 shadow-sm">

      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">

        {icon}

      </div>


      <h3 className="mt-4 text-base font-bold text-heading">
        {title}
      </h3>


      <p className="mt-2 text-sm leading-6 text-text">
        {text}
      </p>

    </div>

  );
}


/* =========================================================
   COMMITMENT
========================================================= */

function Commitment({
  number,
  title,
  text,
}) {

  return (

    <div className="group rounded-xl border border-border bg-card p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">

      <div className="flex items-center justify-between">

        <span className="text-sm font-bold text-primary">
          {number}
        </span>

        <span className="h-px w-12 bg-primary/20 transition-all duration-300 group-hover:w-20 group-hover:bg-primary" />

      </div>


      <h3 className="mt-5 text-lg font-bold text-heading">
        {title}
      </h3>


      <p className="mt-2 text-sm leading-6 text-text">
        {text}
      </p>

    </div>

  );
}