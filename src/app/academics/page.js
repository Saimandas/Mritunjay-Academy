"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Library,
  Users,
} from "lucide-react";

export default function AcademicsPage() {
  return (
    <main className="bg-background text-text">

      {/* =====================================================
          COMPACT PAGE INTRO
      ===================================================== */}

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-8 lg:px-6">
          <div className="academics-reveal flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Academics</p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-heading sm:text-4xl">
                Academic Programmes
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-text">
                Explore the academic structure and learning opportunities at Pathsala Sikshapith.
              </p>
            </div>

            <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-all duration-300 hover:gap-3">
              Home
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>


      {/* =====================================================
          SHORT INTRO
      ===================================================== */}

      <section className="py-10">
        <div className="mx-auto max-w-7xl px-5 lg:px-6">
          <div className="grid gap-7 md:grid-cols-[0.75fr_1.25fr] md:items-center">

            <div className="academics-reveal overflow-hidden rounded-xl">
              <img src="/Students.jpeg" alt="Students of Pathsala Sikshapith" className="h-[230px] w-full object-cover object-[center_70%] transition-transform duration-700 hover:scale-105 sm:h-[280px]" />
            </div>

            <div className="academics-reveal" style={{ animationDelay: "120ms" }}>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Learning at Pathsala Sikshapith</p>

              <h2 className="mt-2 max-w-2xl text-2xl font-bold tracking-tight text-heading sm:text-3xl">
                Learning for every stage of a student's journey.
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-text">
                Pathsala Sikshapith provides students with opportunities to
                build strong academic foundations, develop subject knowledge
                and prepare for the next stage of their education.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <AcademicPoint text="Strong academic foundation" />
                <AcademicPoint text="Student-focused learning" />
                <AcademicPoint text="Regular academic guidance" />
                <AcademicPoint text="Preparation for higher studies" />
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* =====================================================
          TWO ACADEMIC SECTIONS
      ===================================================== */}

      <section className="bg-light-green py-10">
        <div className="mx-auto max-w-7xl px-5 lg:px-6">

          <div className="academics-reveal mb-7">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Academic Structure</p>

            <h2 className="mt-2 text-2xl font-bold text-heading sm:text-3xl">
              Choose your academic section
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-text">
              Our academic programmes are organised to support students at different stages of their education.
            </p>
          </div>


          <div className="grid gap-5 lg:grid-cols-2">

            {/* SCHOOL SECTION */}

            <AcademicSection
              number="01"
              icon={<BookOpen size={24} />}
              title="School Section"
              classes="Class I – X"
              description="A complete school-level academic programme focused on developing strong foundations, subject knowledge, learning habits and confidence."
              features={[
                "Primary and secondary education",
                "Foundation in core subjects",
                "Regular classroom learning",
                "Academic and co-curricular activities",
              ]}
              delay="100ms"
            />


            {/* HIGHER SECONDARY SECTION */}

            <AcademicSection
              number="02"
              icon={<GraduationCap size={24} />}
              title="Higher Secondary Section"
              classes="Class XI – XII"
              description="Focused higher secondary education designed to strengthen subject knowledge and prepare students for examinations, higher studies and future career opportunities."
              features={[
                "Higher secondary education",
                "Subject-focused learning",
                "Examination preparation",
                "Preparation for higher studies",
              ]}
              delay="180ms"
            />

          </div>

        </div>
      </section>


      {/* =====================================================
          ACADEMIC EXPERIENCE
      ===================================================== */}

      <section className="py-10">
        <div className="mx-auto max-w-7xl px-5 lg:px-6">

          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">

            <div className="academics-reveal">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Our Approach</p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight text-heading sm:text-3xl">
                Supporting students beyond the classroom.
              </h2>

              <p className="mt-3 max-w-lg text-sm leading-7 text-text">
                Academic development is supported through regular teaching,
                assessment, activities and guidance. Our aim is to help
                students become confident and responsible learners.
              </p>
            </div>


            <div className="grid grid-cols-2 border-l border-t border-border">

              <LearningItem
                number="01"
                icon={<BookOpen size={19} />}
                title="Learning"
                text="Strong understanding of academic subjects."
                delay="80ms"
              />

              <LearningItem
                number="02"
                icon={<Library size={19} />}
                title="Activities"
                text="Opportunities to participate and explore."
                delay="140ms"
              />

              <LearningItem
                number="03"
                icon={<Users size={19} />}
                title="Guidance"
                text="Continuous support from teachers."
                delay="200ms"
              />

              <LearningItem
                number="04"
                icon={<GraduationCap size={19} />}
                title="Progress"
                text="Preparing students for their next step."
                delay="260ms"
              />

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          INFORMATION / QUICK LINKS
      ===================================================== */}

      <section className="border-y border-border bg-light-green py-9">
        <div className="mx-auto max-w-7xl px-5 lg:px-6">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div className="academics-reveal">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Academic Information</p>

              <h2 className="mt-2 text-xl font-bold text-heading sm:text-2xl">
                Stay connected with school updates.
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-text">
                Students and parents can find important academic information and school announcements through the links below.
              </p>
            </div>


            

          </div>

        </div>
      </section>


      {/* =====================================================
          CLOSING
      ===================================================== */}

      <section className="py-10">
        <div className="mx-auto max-w-3xl px-5 text-center lg:px-6">

          <div className="academics-reveal">

            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-light-green text-primary">
              <GraduationCap size={22} />
            </div>

            <h2 className="mt-4 text-xl font-bold text-heading sm:text-2xl">
              Growing through education.
            </h2>

            <p className="mt-2 text-sm leading-6 text-text">
              Pathsala Sikshapith aims to help every student build the knowledge,
              confidence and skills needed for the future.
            </p>

          </div>

        </div>
      </section>


      {/* =====================================================
          ANIMATIONS
      ===================================================== */}

      <style jsx global>{`
        .academics-reveal {
          opacity: 0;
          transform: translateY(20px);
          animation: academicsReveal 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .academic-card {
          opacity: 0;
          transform: translateY(20px);
          animation: academicsReveal 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .academic-card:hover {
          transform: translateY(-5px);
        }

        .learning-item {
          transition: background-color 0.3s ease, transform 0.3s ease;
        }

        .learning-item:hover {
          background-color: var(--light-green, rgba(34, 197, 94, 0.06));
        }

        .quick-link {
          transition: transform 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
        }

        .quick-link:hover {
          transform: translateY(-3px);
        }

        @keyframes academicsReveal {
          from {
            opacity: 0;
            transform: translateY(20px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .academics-reveal,
          .academic-card {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }

          .quick-link,
          .learning-item {
            transition: none !important;
          }
        }
      `}</style>

    </main>
  );
}


/* =========================================================
   ACADEMIC POINT
========================================================= */

function AcademicPoint({ text }) {
  return (
    <div className="flex items-center gap-2.5 text-sm font-medium text-heading">
      <CheckCircle2 size={16} className="shrink-0 text-primary" />
      <span>{text}</span>
    </div>
  );
}


/* =========================================================
   ACADEMIC SECTION
========================================================= */

function AcademicSection({ number, icon, title, classes, description, features, delay }) {
  return (
    <article className="academic-card group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-xl sm:p-7" style={{ animationDelay: delay }}>

      <div className="flex items-start justify-between">

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-light-green text-primary transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>

        <span className="text-xs font-bold tracking-[0.2em] text-text/40">
          {number}
        </span>

      </div>


      <div className="mt-6">

        <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
          {classes}
        </p>

        <h3 className="mt-2 text-2xl font-bold text-heading">
          {title}
        </h3>

        <p className="mt-3 text-sm leading-7 text-text">
          {description}
        </p>

      </div>


      <div className="mt-5 grid gap-2.5 border-t border-border pt-5 sm:grid-cols-2">

        {features.map((feature) => (
          <div key={feature} className="flex items-center gap-2 text-sm text-heading">
            <CheckCircle2 size={15} className="shrink-0 text-primary" />
            <span>{feature}</span>
          </div>
        ))}

      </div>

    </article>
  );
}


/* =========================================================
   LEARNING ITEM
========================================================= */

function LearningItem({ number, icon, title, text, delay }) {
  return (
    <div className="academic-card learning-item border-b border-r border-border p-5 sm:p-6" style={{ animationDelay: delay }}>

      <div className="flex items-center justify-between">

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-light-green text-primary">
          {icon}
        </div>

        <span className="text-xs font-bold text-text/40">
          {number}
        </span>

      </div>

      <h3 className="mt-4 font-bold text-heading">
        {title}
      </h3>

      <p className="mt-1.5 text-sm leading-6 text-text">
        {text}
      </p>

    </div>
  );
}


/* =========================================================
   QUICK LINK
========================================================= */

function QuickLink({ href, label }) {
  return (
    <Link href={href} className="quick-link inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold text-heading shadow-sm hover:border-primary hover:text-primary">
      {label}
      <ArrowRight size={15} />
    </Link>
  );
}