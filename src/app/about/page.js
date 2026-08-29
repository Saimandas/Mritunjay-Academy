import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Heart,
  School,
  Target,
  Users,
  Trophy,
  MapPin,
} from "lucide-react";
import { schoolInfo } from "../constants/data";

const SCHOOL_NAME = "Mrityunjoy Academy Sarthebari";

export default function AboutPage() {
  return (
    <main className="bg-[#fffafa] text-slate-700">


      {/* =====================================================
          INTRODUCTION
      ===================================================== */}

      <section className="border-b border-red-100 bg-white">

        <div className="mx-auto max-w-7xl px-5 py-10 lg:px-6 lg:py-14">

          <div className="grid items-center gap-9 lg:grid-cols-[1fr_1fr]">

            {/* IMAGE */}

            <div className="relative overflow-hidden rounded-xl">

              <img
                src="/School Img.jpeg"
                alt={`${SCHOOL_NAME} campus`}
                className="
                  aspect-[4/3]
                  w-full
                  object-cover
                "
              />

              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  rounded-tr-xl
                  bg-red-700
                  px-5
                  py-3
                  text-white
                "
              >
                <p className="text-[10px] font-medium uppercase tracking-wider text-white/70">
                  Our School
                </p>

                <p className="mt-0.5 text-sm font-semibold">
                  {SCHOOL_NAME}
                </p>
              </div>

            </div>


            {/* CONTENT */}

            <div>

              <div
                className="
                  mb-3
                  inline-flex
                  items-center
                  gap-2
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.15em]
                  text-red-700
                "
              >

                <span className="h-1.5 w-1.5 rounded-full bg-red-700" />

                About Our School

              </div>


              <h1
                className="
                  max-w-xl
                  text-3xl
                  font-bold
                  leading-tight
                  tracking-tight
                  text-slate-900
                  sm:text-4xl
                "
              >
                A place to learn,
                <span className="text-red-700">
                  {" "}grow and move forward.
                </span>
              </h1>


              <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
                Mrityunjoy Academy Sarthebari is a co-educational
                school committed to providing students with a strong
                foundation in education, discipline and good values.
              </p>


              <p className="mt-4 text-sm leading-7 text-slate-600">
                We believe that school life should give students
                opportunities to learn, participate, develop confidence
                and discover their abilities. Along with classroom
                education, students are encouraged to take part in
                different academic, cultural and co-curricular activities.
              </p>


              <div className="mt-6 grid gap-3 sm:grid-cols-2">

                <Point text="Supportive learning environment" />

                <Point text="Focus on discipline and values" />

                <Point text="Academic development" />

                <Point text="Sports and cultural activities" />

              </div>

            </div>

          </div>

        </div>

      </section>



      {/* =====================================================
          SCHOOL AT A GLANCE
      ===================================================== */}

      <section className="bg-red-700 text-white">

        <div className="mx-auto max-w-7xl px-5 lg:px-6">

          <div className="grid sm:grid-cols-2 lg:grid-cols-4">

            <Glance
              icon={<School size={22} />}
              label="School Type"
              value="Co-educational"
            />

            <Glance
              icon={<Users size={22} />}
              label="School Community"
              value="Students & Teachers"
            />

            <Glance
              icon={<GraduationCap size={22} />}
              label="Education"
              value="School Education"
            />

            <Glance
              icon={<BookOpen size={22} />}
              label="Location"
              value="Sarthebari, Assam"
            />

          </div>

        </div>

      </section>



      {/* =====================================================
          VISION + MISSION
      ===================================================== */}

      <section className="bg-white py-12 lg:py-16">

        <div className="mx-auto max-w-7xl px-5 lg:px-6">

          <div className="mb-8">

            <p
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.16em]
                text-red-700
              "
            >
              Our Approach
            </p>

            <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
              Education with purpose
            </h2>

          </div>


          <div className="grid gap-5 md:grid-cols-2">

            {/* VISION */}

            <div
              className="
                rounded-xl
                border
                border-red-100
                bg-red-50/50
                p-6
                sm:p-7
              "
            >

              <div className="flex items-start gap-4">

                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-red-700
                    text-white
                  "
                >
                  <Target size={21} />
                </div>


                <div>

                  <p className="text-xs font-bold uppercase tracking-wider text-red-700">
                    Our Vision
                  </p>

                  <h3 className="mt-2 text-xl font-bold text-slate-900">
                    Building confident individuals
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    To help students develop knowledge, confidence,
                    discipline and a sense of responsibility so that
                    they can face the future with confidence.
                  </p>

                </div>

              </div>

            </div>


            {/* MISSION */}

            <div
              className="
                rounded-xl
                border
                border-slate-200
                bg-white
                p-6
                shadow-sm
                sm:p-7
              "
            >

              <div className="flex items-start gap-4">

                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-red-50
                    text-red-700
                  "
                >
                  <Heart size={21} />
                </div>


                <div>

                  <p className="text-xs font-bold uppercase tracking-wider text-red-700">
                    Our Mission
                  </p>

                  <h3 className="mt-2 text-xl font-bold text-slate-900">
                    Learning with values
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    To provide meaningful education in a safe,
                    disciplined and caring environment while encouraging
                    students to participate, learn and grow.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>



      {/* =====================================================
          WHAT WE FOCUS ON
      ===================================================== */}

      <section className="border-y border-red-100 bg-red-50/40 py-12 lg:py-16">

        <div className="mx-auto max-w-7xl px-5 lg:px-6">

          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">

            {/* LEFT */}

            <div>

              <p
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.16em]
                  text-red-700
                "
              >
                School Life
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
                Learning beyond textbooks
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                Education is not limited to the classroom. We encourage
                students to participate in activities that help them
                develop confidence, teamwork and responsibility.
              </p>


              <Link
                href="/gallery"
                className="
                  mt-6
                  inline-flex
                  items-center
                  gap-2
                  rounded-md
                  bg-red-700
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-red-800
                "
              >
                See School Gallery
                <ArrowRight size={16} />
              </Link>

            </div>


            {/* RIGHT */}

            <div className="grid gap-3 sm:grid-cols-2">

              <FocusCard
                icon={<BookOpen size={20} />}
                title="Academic Learning"
                text="Helping students build a strong foundation through regular classroom learning."
              />

              <FocusCard
                icon={<GraduationCap size={20} />}
                title="Student Development"
                text="Encouraging students to develop confidence, communication and independent thinking."
              />

              <FocusCard
                icon={<Trophy size={20} />}
                title="Activities"
                text="Students get opportunities to participate in sports, cultural programmes and competitions."
              />

              <FocusCard
                icon={<Users size={20} />}
                title="Teamwork"
                text="Developing cooperation, friendship and respect among students and teachers."
              />

            </div>

          </div>

        </div>

      </section>



      {/* =====================================================
          PRINCIPAL MESSAGE
      ===================================================== */}

      <section className="bg-white py-12 lg:py-16">

        <div className="mx-auto max-w-7xl px-5 lg:px-6">

          <div
            className="
              overflow-hidden
              rounded-xl
              border
              border-red-100
              bg-white
              shadow-sm
            "
          >

            <div className="grid lg:grid-cols-[300px_1fr]">

              {/* IMAGE */}

              <div className="relative min-h-[300px]">

                <img
                  src="/Principal.jpeg"
                  alt="Principal"
                  className="
                    absolute
                    inset-0
                    h-full
                    w-full
                    object-cover
                  "
                />

              </div>


              {/* MESSAGE */}

              <div className="p-6 sm:p-8 lg:p-10">

                <div
                  className="
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.16em]
                    text-red-700
                  "
                >
                  From the Principal's Desk
                </div>


                <h2 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
                  Working together for every student
                </h2>


                <div className="mt-5 space-y-3 text-sm leading-7 text-slate-600">

                  <p>
                    Education plays an important role in shaping the
                    future of every student. Our responsibility is to
                    provide an environment where students can learn,
                    participate and develop their abilities.
                  </p>

                  <p>
                    We believe that academic learning, discipline,
                    good values and participation all have an important
                    place in a student's development.
                  </p>

                  <p>
                    With the cooperation of parents, teachers and the
                    wider school community, we aim to help our students
                    move forward with confidence.
                  </p>

                </div>


                <div className="mt-6 border-t border-slate-100 pt-5">

                  <p className="font-bold text-slate-900">
                    Mrityunjoy Academy Sarthebari
                  </p>

                  <p className="mt-1 text-xs text-red-700">
                    Principal
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>



      {/* =====================================================
          SCHOOL INFORMATION
      ===================================================== */}

      <section className="bg-slate-50 py-12 lg:py-14">

        <div className="mx-auto max-w-7xl px-5 lg:px-6">

          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">

            {/* LEFT */}

            <div>

              <p
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.16em]
                  text-red-700
                "
              >
                School Information
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                Mrityunjoy Academy
              </h2>

              <div className="mt-4 flex items-start gap-2 text-sm text-slate-600">

                <MapPin
                  size={17}
                  className="mt-0.5 shrink-0 text-red-700"
                />

                <span>
                  Sarthebari, Assam
                </span>

              </div>

            </div>


            {/* INFORMATION */}

            <div className="rounded-xl border border-slate-200 bg-white">

              <InfoRow
                label="School Name"
                value={schoolInfo.schoolName}
              />

              <InfoRow
                label="School Type"
                value="Co-educational School"
              />

              <InfoRow
                label="Location"
                value={schoolInfo.adress}
              />

              <InfoRow
                label="Affiliation"
                value={schoolInfo.Affiliation}
              />

              <InfoRow
                label="Education"
                value="School & Higher Secondary Education"
                last
              />

            </div>

          </div>

        </div>

      </section>



      {/* =====================================================
          CAMPUS / GALLERY
      ===================================================== */}

      <section className="bg-white py-12 lg:py-16">

        <div className="mx-auto max-w-7xl px-5 lg:px-6">

          <div className="flex items-end justify-between gap-5">

            <div>

              <p
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.16em]
                  text-red-700
                "
              >
                Our Campus
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
                A glimpse of school life
              </h2>

            </div>


            <Link
              href="/gallery"
              className="
                hidden
                items-center
                gap-1.5
                text-sm
                font-semibold
                text-red-700
                sm:flex
              "
            >
              View Gallery
              <ArrowRight size={16} />
            </Link>

          </div>


          <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-4">

            <CampusImage src="/campus/Campus1.jpeg" />

            <CampusImage src="/campus/Campus2.jpeg" />

            <CampusImage src="/campus/Campus3.jpeg" />

            <CampusImage src="/campus/Campus4.jpeg" />

          </div>


          <Link
            href="/gallery"
            className="
              mt-5
              inline-flex
              items-center
              gap-1.5
              text-sm
              font-semibold
              text-red-700
              sm:hidden
            "
          >
            View Gallery
            <ArrowRight size={16} />
          </Link>

        </div>

      </section>



      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="bg-red-700">

        <div className="mx-auto max-w-5xl px-5 py-11 text-center lg:px-6">

          <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-100">
            Mrityunjoy Academy Sarthebari
          </p>

          <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
            Growing through learning and values
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/75">
            Explore our school, meet our teachers and stay connected
            with the latest activities and announcements.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">

            <Link
              href="/academics"
              className="
                inline-flex
                items-center
                gap-2
                rounded-md
                bg-white
                px-5
                py-2.5
                text-sm
                font-semibold
                text-red-700
                transition
                hover:bg-red-50
              "
            >
              Explore Academics
              <ArrowRight size={16} />
            </Link>


            <Link
              href="/contact"
              className="
                inline-flex
                items-center
                gap-2
                rounded-md
                border
                border-white/30
                px-5
                py-2.5
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-white/10
              "
            >
              Contact Us
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}



/* =========================================================
   POINT
========================================================= */

function Point({ text }) {
  return (
    <div className="flex items-center gap-2.5">

      <CheckCircle2
        size={17}
        className="shrink-0 text-red-700"
      />

      <span className="text-sm font-medium text-slate-700">
        {text}
      </span>

    </div>
  );
}



/* =========================================================
   GLANCE
========================================================= */

function Glance({
  icon,
  label,
  value,
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-3
        border-b
        border-white/15
        px-1
        py-5
        sm:px-5
        lg:border-b-0
        lg:border-r
        lg:py-6
        lg:first:pl-0
        lg:last:border-r-0
      "
    >

      <div
        className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-lg
          bg-white/10
          text-white
        "
      >
        {icon}
      </div>

      <div>

        <p className="text-[11px] text-white/60">
          {label}
        </p>

        <p className="mt-0.5 text-sm font-bold text-white">
          {value}
        </p>

      </div>

    </div>
  );
}



/* =========================================================
   FOCUS CARD
========================================================= */

function FocusCard({
  icon,
  title,
  text,
}) {
  return (
    <div
      className="
        rounded-xl
        border
        border-red-100
        bg-white
        p-5
        transition
        duration-300
        hover:-translate-y-1
        hover:shadow-md
      "
    >

      <div
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-lg
          bg-red-50
          text-red-700
        "
      >
        {icon}
      </div>


      <h3 className="mt-4 text-sm font-bold text-slate-900">
        {title}
      </h3>


      <p className="mt-2 text-xs leading-6 text-slate-600">
        {text}
      </p>

    </div>
  );
}



/* =========================================================
   INFO ROW
========================================================= */

function InfoRow({
  label,
  value,
  last = false,
}) {
  return (
    <div
      className={`
        grid
        gap-1
        px-5
        py-3.5
        sm:grid-cols-[220px_1fr]
        ${last ? "" : "border-b border-slate-100"}
      `}
    >

      <p className="text-xs font-semibold text-slate-800">
        {label}
      </p>

      <p className="text-xs text-slate-600">
        {value}
      </p>

    </div>
  );
}



/* =========================================================
   CAMPUS IMAGE
========================================================= */

function CampusImage({ src }) {
  return (
    <Link
      href="/gallery"
      className="
        group
        block
        overflow-hidden
        rounded-lg
      "
    >

      <img
        src={src}
        alt={`${schoolInfo.schoolName} campus`}
        className="
          aspect-[4/3]
          w-full
          object-cover
          transition
          duration-500
          group-hover:scale-105
        "
      />

    </Link>
  );
}