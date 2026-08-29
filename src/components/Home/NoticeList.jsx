"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import {
  Bell,
  CalendarDays,
  ArrowRight,
  BookOpen,
  Users,
  Trophy,
} from "lucide-react";


// ======================================================
// NOTICES
// ======================================================

const notices = [
  {
    title: "Admission Notice for Class XI",
    date: "08 Aug 2026",
  },
  {
    title: "Half-Yearly Examination Routine",
    date: "02 Aug 2026",
  },
  {
    title: "Holiday Notice",
    date: "28 Jul 2026",
  },
  {
    title: "Unit Test Result",
    date: "20 Jul 2026",
  },
  {
    title: "Parent-Teacher Meeting",
    date: "18 Jul 2026",
  },
  {
    title: "School Reopening Notice",
    date: "15 Jul 2026",
  },
  {
    title: "Inter-School Quiz Competition",
    date: "12 Jul 2026",
  },
  {
    title: "Monthly Test Schedule",
    date: "08 Jul 2026",
  },
  {
    title: "Cleanliness Drive",
    date: "05 Jul 2026",
  },
  {
    title: "Annual Sports Registration",
    date: "02 Jul 2026",
  },
  {
    title: "Parent Orientation Programme",
    date: "28 Jun 2026",
  },
  {
    title: "School Development Meeting",
    date: "24 Jun 2026",
  },
];


// ======================================================
// EVENTS
// ======================================================

const events = [
  {
    title: "Bihu Celebration",
    date: "14 Apr 2026",
    image: "/events/bihu.jpg",
  },
  {
    title: "World Environment Day",
    date: "05 Jun 2026",
    image: "/events/environment.jpg",
  },
  {
    title: "Annual Sports",
    date: "12 Feb 2026",
    image: "/events/sports.jpg",
  },
];


// ======================================================
// GALLERY
// ======================================================

const gallery = [
  "/gallery/1.jpg",
  "/gallery/2.jpg",
  "/gallery/3.jpg",
  "/gallery/4.jpg",
  "/gallery/5.jpg",
  "/gallery/6.jpg",
];


// ======================================================
// HOME PAGE
// ======================================================

export default function Home() {
  const noticeRef = useRef(null);

  const [noticeHovered, setNoticeHovered] = useState(false);


  // ====================================================
  // NOTICE AUTO SCROLL
  // ====================================================

  useEffect(() => {
    const container = noticeRef.current;

    if (!container) return;

    let animationFrame;
    let lastTime = performance.now();
    let pauseUntil = 0;

    // Pixels per second
    const speed = 20;

    const autoScroll = (currentTime) => {
      const delta = currentTime - lastTime;

      lastTime = currentTime;

      const maxScroll =
        container.scrollHeight -
        container.clientHeight;

      // Only scroll if content is larger than container
      if (
        maxScroll > 0 &&
        !noticeHovered &&
        currentTime > pauseUntil
      ) {

        // Reached the bottom
        if (container.scrollTop >= maxScroll - 1) {

          // Stay at bottom for a moment
          pauseUntil = currentTime + 1500;

          // Return to top
          container.scrollTop = 0;

        } else {

          // Smooth continuous movement
          container.scrollTop +=
            (speed * delta) / 1000;

        }
      }

      animationFrame =
        requestAnimationFrame(autoScroll);
    };


    animationFrame =
      requestAnimationFrame(autoScroll);


    return () => {
      cancelAnimationFrame(animationFrame);
    };

  }, [noticeHovered]);


  return (
    <main className="bg-background">


      {/* ==================================================
          HERO
      ================================================== */}

      <section className="bg-background py-5 md:py-6">

        <div className="mx-auto max-w-7xl px-5 lg:px-6">

          <div className="grid gap-5 lg:grid-cols-[1fr_310px]">


            {/* SCHOOL IMAGE */}

            <div className="relative overflow-hidden">

              <img
                src="/school.jpg"
                alt="Jatiya Vidyalaya"
                className="
                  h-[280px]
                  w-full
                  object-cover
                  sm:h-[350px]
                  lg:h-[390px]
                "
              />


              <div
                className="
                  absolute
                  inset-x-0
                  bottom-0
                  bg-gradient-to-t
                  from-black/70
                  to-transparent
                  p-6
                  md:p-8
                "
              >

                <p className="text-sm font-medium text-white/80">
                  Welcome to
                </p>

                <h1
                  className="
                    mt-1
                    text-2xl
                    font-semibold
                    text-white
                    md:text-3xl
                  "
                >
                  Jatiya Vidyalaya
                </h1>

                <p
                  className="
                    mt-2
                    max-w-lg
                    text-sm
                    leading-6
                    text-white/85
                  "
                >
                  A place for learning, discipline,
                  knowledge and the overall development
                  of our students.
                </p>

              </div>

            </div>


            {/* ==================================================
                NOTICE PANEL
            ================================================== */}

            <div
              className="
                overflow-hidden
                border
                border-border
                bg-card
              "
            >

              {/* NOTICE HEADER */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-b
                  border-border
                  px-5
                  py-4
                "
              >

                <div className="flex items-center gap-2">

                  <Bell
                    size={18}
                    className="text-primary"
                  />

                  <h2
                    className="
                      font-semibold
                      text-heading
                    "
                  >
                    Latest Notices
                  </h2>

                </div>


                <Link
                  href="/notice-board"
                  className="
                    text-xs
                    font-medium
                    text-primary
                    transition-opacity
                    hover:opacity-70
                  "
                >
                  View All
                </Link>

              </div>


              {/* NOTICE SCROLL AREA */}

              <div
                ref={noticeRef}
                onMouseEnter={() =>
                  setNoticeHovered(true)
                }
                onMouseLeave={() =>
                  setNoticeHovered(false)
                }
                className="
                  h-[390px]
                  overflow-y-scroll
                  overscroll-contain
                "
              >

                {notices.map((notice, index) => (

                  <Link
                    href="/notice-board"
                    key={`${notice.title}-${index}`}
                    className="
                      flex
                      gap-3
                      border-b
                      border-border
                      px-5
                      py-4
                      transition-colors
                      last:border-b-0
                      hover:bg-light-green
                    "
                  >

                    <Bell
                      size={14}
                      className="
                        mt-0.5
                        shrink-0
                        text-text
                      "
                    />


                    <div className="min-w-0">

                      <p
                        className="
                          text-sm
                          font-medium
                          leading-5
                          text-heading
                        "
                      >
                        {notice.title}
                      </p>


                      <p
                        className="
                          mt-1
                          text-xs
                          text-text
                        "
                      >
                        {notice.date}
                      </p>

                    </div>

                  </Link>

                ))}

              </div>

            </div>

          </div>

        </div>

      </section>



      {/* ==================================================
          QUICK INFORMATION
      ================================================== */}

      <section
        className="
          border-y
          border-border
          bg-light-green
        "
      >

        <div
          className="
            mx-auto
            grid
            max-w-7xl
            grid-cols-2
            md:grid-cols-4
          "
        >

          <InfoItem
            value="25+"
            label="Years of Excellence"
            border
          />

          <InfoItem
            value="1500+"
            label="Students"
            border
          />

          <InfoItem
            value="100+"
            label="Faculty Members"
            border
          />

          <InfoItem
            value="20+"
            label="Activities & Clubs"
          />

        </div>

      </section>



      {/* ==================================================
          ABOUT + PRINCIPAL
      ================================================== */}

      <section className="py-12 md:py-16">

        <div
          className="
            mx-auto
            grid
            max-w-7xl
            gap-8
            px-5
            md:grid-cols-2
            lg:px-6
          "
        >

          {/* ABOUT */}

          <div
            className="
              border
              border-border
              bg-card
              p-6
              md:p-7
            "
          >

            <div className="flex items-center justify-between">

              <h2
                className="
                  text-xl
                  font-semibold
                  text-heading
                "
              >
                About Our School
              </h2>


              <Link
                href="/about"
                className="
                  text-sm
                  font-medium
                  text-primary
                  transition-opacity
                  hover:opacity-70
                "
              >
                Read More
              </Link>

            </div>


            <div
              className="
                mt-5
                grid
                gap-5
                sm:grid-cols-[180px_1fr]
              "
            >

              <img
                src="/school-gate.jpg"
                alt="School campus"
                className="
                  h-44
                  w-full
                  object-cover
                "
              />


              <div>

                <p
                  className="
                    text-sm
                    leading-7
                    text-text
                  "
                >
                  Jatiya Vidyalaya is a
                  co-educational institution
                  committed to providing quality
                  education in a disciplined and
                  caring environment.
                </p>


                <p
                  className="
                    mt-3
                    text-sm
                    leading-7
                    text-text
                  "
                >
                  The school encourages academic
                  learning, cultural activities,
                  sports and the overall development
                  of its students.
                </p>

              </div>

            </div>

          </div>



          {/* PRINCIPAL */}

          <div
            className="
              border
              border-border
              bg-card
              p-6
              md:p-7
            "
          >

            <h2
              className="
                text-xl
                font-semibold
                text-heading
              "
            >
              From the Principal's Desk
            </h2>


            <div
              className="
                mt-5
                grid
                gap-5
                sm:grid-cols-[170px_1fr]
              "
            >

              <img
                src="/principal.jpg"
                alt="Principal"
                className="
                  h-48
                  w-full
                  object-cover
                "
              />


              <div>

                <p
                  className="
                    text-sm
                    leading-7
                    text-text
                  "
                >
                  Education is not only about
                  academic success. It is about
                  developing responsible, disciplined
                  and thoughtful individuals.
                </p>


                <p
                  className="
                    mt-3
                    text-sm
                    leading-7
                    text-text
                  "
                >
                  We are committed to providing
                  our students with a supportive
                  environment where they can learn,
                  participate and grow.
                </p>


                <p
                  className="
                    mt-4
                    text-sm
                    font-semibold
                    text-primary
                  "
                >
                  — Principal
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>



      {/* ==================================================
          ACADEMICS
      ================================================== */}

      <section
        className="
          bg-light-green
          py-12
          md:py-14
        "
      >

        <div
          className="
            mx-auto
            max-w-7xl
            px-5
            lg:px-6
          "
        >

          <div className="flex items-end justify-between">

            <div>

              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-primary
                "
              >
                Education
              </p>


              <h2
                className="
                  mt-1
                  text-xl
                  font-semibold
                  text-heading
                "
              >
                Our Academic Sections
              </h2>

            </div>


            <Link
              href="/academics"
              className="
                hidden
                text-sm
                font-medium
                text-primary
                transition-opacity
                hover:opacity-70
                sm:block
              "
            >
              View Academics
            </Link>

          </div>


          <div
            className="
              mt-6
              grid
              gap-4
              md:grid-cols-3
            "
          >

            <AcademicCard
              icon={<BookOpen size={23} />}
              title="Primary Section"
              subtitle="Class I to V"
            />

            <AcademicCard
              icon={<Users size={23} />}
              title="Secondary Section"
              subtitle="Class VI to X"
            />

            <AcademicCard
              icon={<Trophy size={23} />}
              title="Higher Secondary"
              subtitle="Class XI & XII"
            />

          </div>

        </div>

      </section>



      {/* ==================================================
          EVENTS
      ================================================== */}

      <section className="py-12 md:py-14">

        <div
          className="
            mx-auto
            max-w-7xl
            px-5
            lg:px-6
          "
        >

          <div className="flex items-end justify-between">

            <div>

              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-primary
                "
              >
                School Life
              </p>


              <h2
                className="
                  mt-1
                  text-xl
                  font-semibold
                  text-heading
                "
              >
                Events & Activities
              </h2>

            </div>


            <Link
              href="/gallery"
              className="
                text-sm
                font-medium
                text-primary
                transition-opacity
                hover:opacity-70
              "
            >
              View All
            </Link>

          </div>


          <div
            className="
              mt-6
              grid
              gap-5
              md:grid-cols-3
            "
          >

            {events.map((event) => (

              <div
                key={event.title}
                className="
                  overflow-hidden
                  border
                  border-border
                  bg-card
                "
              >

                <img
                  src={event.image}
                  alt={event.title}
                  className="
                    h-48
                    w-full
                    object-cover
                  "
                />


                <div className="p-4">

                  <h3
                    className="
                      font-semibold
                      text-heading
                    "
                  >
                    {event.title}
                  </h3>


                  <div
                    className="
                      mt-2
                      flex
                      items-center
                      gap-2
                      text-xs
                      text-text
                    "
                  >

                    <CalendarDays size={14} />

                    {event.date}

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>



      {/* ==================================================
          GALLERY
      ================================================== */}

      <section
        className="
          bg-light-green
          py-12
          md:py-14
        "
      >

        <div
          className="
            mx-auto
            max-w-7xl
            px-5
            lg:px-6
          "
        >

          <div className="flex items-end justify-between">

            <div>

              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-primary
                "
              >
                School Moments
              </p>


              <h2
                className="
                  mt-1
                  text-xl
                  font-semibold
                  text-heading
                "
              >
                Photo Gallery
              </h2>

            </div>


            <Link
              href="/gallery"
              className="
                text-sm
                font-medium
                text-primary
                transition-opacity
                hover:opacity-70
              "
            >
              View All
            </Link>

          </div>


          <div
            className="
              mt-6
              grid
              grid-cols-2
              gap-3
              md:grid-cols-3
              lg:grid-cols-6
            "
          >

            {gallery.map((image, index) => (

              <Link
                href="/gallery"
                key={image}
                className="group overflow-hidden"
              >

                <img
                  src={image}
                  alt={`School gallery ${index + 1}`}
                  className="
                    aspect-square
                    w-full
                    object-cover
                    transition-transform
                    duration-300
                    group-hover:scale-105
                  "
                />

              </Link>

            ))}

          </div>

        </div>

      </section>



      {/* ==================================================
          CONTACT
      ================================================== */}

      <section
        className="
          bg-primary
          py-10
          text-white
        "
      >

        <div
          className="
            mx-auto
            flex
            max-w-7xl
            flex-col
            justify-between
            gap-6
            px-5
            md:flex-row
            md:items-center
            lg:px-6
          "
        >

          <div>

            <p
              className="
                text-xs
                font-medium
                uppercase
                tracking-wider
                text-white/60
              "
            >
              Get in Touch
            </p>


            <h2 className="mt-1 text-xl font-semibold">
              Jatiya Vidyalaya
            </h2>


            <p
              className="
                mt-2
                text-sm
                text-white/75
              "
            >
              Tihu, Nalbari, Assam
            </p>

          </div>


          <Link
            href="/contact"
            className="
              inline-flex
              items-center
              gap-2
              self-start
              border
              border-white/30
              px-5
              py-2.5
              text-sm
              font-medium
              transition-colors
              hover:bg-white/10
              md:self-auto
            "
          >

            Contact Us

            <ArrowRight size={16} />

          </Link>

        </div>

      </section>

    </main>
  );
}


// ======================================================
// INFO ITEM
// ======================================================

function InfoItem({
  value,
  label,
  border = false,
}) {
  return (
    <div
      className={`
        px-5
        py-5
        md:px-8
        ${border ? "border-r border-border" : ""}
      `}
    >

      <p
        className="
          text-2xl
          font-bold
          text-primary
        "
      >
        {value}
      </p>


      <p
        className="
          mt-1
          text-xs
          text-text
        "
      >
        {label}
      </p>

    </div>
  );
}


// ======================================================
// ACADEMIC CARD
// ======================================================

function AcademicCard({
  icon,
  title,
  subtitle,
}) {
  return (
    <Link
      href="/academics"
      className="
        flex
        items-center
        gap-4
        border
        border-border
        bg-card
        p-5
        transition-colors
        hover:border-primary
        hover:bg-background
      "
    >

      <div
        className="
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          bg-light-green
          text-primary
        "
      >
        {icon}
      </div>


      <div>

        <h3
          className="
            font-semibold
            text-heading
          "
        >
          {title}
        </h3>


        <p
          className="
            mt-1
            text-xs
            text-text
          "
        >
          {subtitle}
        </p>

      </div>


      <ArrowRight
        size={16}
        className="
          ml-auto
          text-text
        "
      />

    </Link>
  );
}