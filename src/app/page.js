"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  ArrowRight,
  Bell,
  CalendarDays,
  ChevronRight,
  ChevronLeft,
  GraduationCap,
  BookOpen,
  Users,
  Trophy,
  MapPin,
  Phone,
  Mail,
  Megaphone,
  School,
  UserRound,
} from "lucide-react";
import { schoolInfo } from "./constants/data";

/* =========================================================
   HERO SLIDES
========================================================= */

const heroSlides = [
  {
    image: "/School Img.jpeg",
    eyebrow: `Welcome to Sikhsapith${schoolInfo.schoolName}`,
    title: "Learning today, preparing for tomorrow.",
    description:
      "A place where students learn with curiosity, grow with confidence and develop strong values.",
  },

  {
    image: "/School Img 2.jpeg",
    eyebrow: "Our School",
    title: "A place to learn, grow and discover.",
    description:
      "We encourage students to participate, explore their interests and develop their abilities beyond the classroom.",
  },

  {
    image: "/School Img 3.jpeg",
    eyebrow: "Education & Values",
    title: "Knowledge with character.",
    description:
      "Our aim is to provide students with meaningful education in a disciplined, caring and supportive environment.",
  },
];

/* =========================================================
   HOME
========================================================= */

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);

  const [notices, setNotices] = useState([]);
  const [events, setEvents] = useState([]);
  const [principal, setPrincipal] = useState(null);

  const [loading, setLoading] = useState(true);

  /* =======================================================
     HERO AUTO SLIDER
  ======================================================= */

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((current) =>
        current === heroSlides.length - 1 ? 0 : current + 1
      );
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  /* =======================================================
     HERO CONTROLS
  ======================================================= */

  const nextSlide = () => {
    setActiveSlide((current) =>
      current === heroSlides.length - 1 ? 0 : current + 1
    );
  };

  const previousSlide = () => {
    setActiveSlide((current) =>
      current === 0 ? heroSlides.length - 1 : current - 1
    );
  };

  /* =======================================================
     LOAD HOME DATA
  ======================================================= */

  useEffect(() => {
    async function loadHomeData() {
      try {
        const [noticeRes, eventRes, principalRes] = await Promise.all([
          fetch("/api/notices"),
          fetch("/api/events"),
          fetch("/api/principal"),
        ]);

        const noticeData = await noticeRes.json();
        const eventData = await eventRes.json();
        const principalData = await principalRes.json();

        setNotices(
          Array.isArray(noticeData)
            ? noticeData
            : noticeData?.data || []
        );

        setEvents(
          Array.isArray(eventData)
            ? eventData
            : eventData?.data || []
        );

        setPrincipal(
          principalData?.data ||
            principalData?.principal ||
            principalData ||
            null
        );
      } catch (error) {
        console.error("Homepage data error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadHomeData();
  }, []);

  /* =======================================================
     VISIBLE DATA
  ======================================================= */

  const visibleNotices = notices.slice(0, 5);
  const visibleEvents = events.slice(0, 4);

  const slide = heroSlides[activeSlide];

  return (
    <main className="overflow-hidden bg-background text-heading">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="px-4 pt-4 sm:px-6 lg:px-8">

        <div className="relative mx-auto h-[390px] max-w-[1450px] overflow-hidden rounded-2xl border border-red-100 bg-light-red sm:h-[420px]">

          {/* =================================================
              SLIDES
          ================================================== */}

          {heroSlides.map((item, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === activeSlide
                  ? "opacity-100"
                  : "pointer-events-none opacity-0"
              }`}
            >

              {/* IMAGE */}

              <div className="absolute right-0 top-0 h-full w-[58%] overflow-hidden sm:w-[55%]">

                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />

                {/* image fade */}

                <div className="absolute inset-0 bg-gradient-to-r from-light-red via-light-red/35 to-transparent" />

                <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-light-red to-transparent sm:w-32" />

              </div>

            </div>
          ))}

          {/* =================================================
              HERO CONTENT
          ================================================== */}

          <div className="relative z-10 flex h-full items-center">

            <div
              key={activeSlide}
              className="hero-slide-item ml-7 max-w-[560px] pr-4 sm:ml-10 lg:ml-14"
            >

              <p className="hero-slide-item text-sm font-bold uppercase tracking-[0.16em] text-primary">
                {slide.eyebrow}
              </p>

              <h1 className="hero-slide-item mt-3 max-w-[520px] text-3xl font-bold leading-[1.12] text-heading sm:text-4xl lg:text-[46px]">
                {slide.title}
              </h1>

              <p className="hero-slide-item mt-4 max-w-[470px] text-sm leading-6 text-text sm:text-base">
                {slide.description}
              </p>

              <div className="hero-slide-item mt-6 flex flex-wrap gap-3">

                <Link
                  href="/about"
                  className="school-button inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white"
                >
                  <button className=" text-white">
                    Discover Our School
                  </button>

                  <ArrowRight size={17} color="white" />
                </Link>

              </div>

            </div>

          </div>

          {/* =================================================
              SLIDER BUTTONS
          ================================================== */}

          <button
            type="button"
            onClick={previousSlide}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-white/80 text-primary shadow-sm backdrop-blur transition hover:bg-white sm:left-5"
          >
            <ChevronLeft size={19} />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-white/80 text-primary shadow-sm backdrop-blur transition hover:bg-white sm:right-5"
          >
            <ChevronRight size={19} />
          </button>

          {/* =================================================
              DOTS
          ================================================== */}

          <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">

            {heroSlides.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeSlide === index
                    ? "w-7 bg-primary"
                    : "w-2 bg-primary/30 hover:bg-primary/60"
                }`}
              />
            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          ANNOUNCEMENT BAR
      ===================================================== */}

      <section className="px-4 pt-4 sm:px-6 lg:px-8">

        <div className="mx-auto flex max-w-[1450px] overflow-hidden rounded-xl bg-primary text-white">

          <div className="flex shrink-0 items-center gap-3 border-r border-white/20 px-5 py-4">

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
              <Megaphone size={18} />
            </div>

            <span className="text-sm font-bold">
              Latest Announcement
            </span>

          </div>

          <div className="flex min-w-0 flex-1 items-center overflow-hidden">

            <div className="flex min-w-max animate-none items-center gap-4 px-6 text-sm text-white/90">

              <span>
                Admission information and important school updates
                are available on the Notice Board.
              </span>

              <span className="text-white/40">|</span>

              <span>
                Annual activities and school events will be announced here.
              </span>

            </div>

          </div>

          <Link
            href="/notice-board"
            className="hidden shrink-0 items-center gap-2 border-l border-white/20 px-6 text-sm font-semibold transition hover:bg-white/10 md:flex"
          >
            View All Notices
            <ArrowRight size={16} />
          </Link>

        </div>

      </section>


      {/* =====================================================
          MAIN INFORMATION GRID
      ===================================================== */}

      <section className="py-5 sm:py-7">

        <div className="mx-auto max-w-[1450px] px-4 sm:px-6 lg:px-8">

          <div className="grid gap-4 xl:grid-cols-4">

            {/* =================================================
                NOTICES
            ================================================== */}

            <div className="reveal rounded-xl border border-red-100 bg-light-red p-4 sm:p-5">

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-primary shadow-sm">
                    <Bell size={19} />
                  </div>

                  <h2 className="text-lg font-bold text-primary">
                    Notices
                  </h2>

                </div>

                <Link
                  href="/notice-board"
                  className="group flex items-center gap-1 text-xs font-semibold text-primary"
                >
                  View All
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>

              </div>

              <div className="mt-4 overflow-hidden rounded-lg bg-white">

                {loading ? (
                  <LoadingRows count={4} />
                ) : visibleNotices.length === 0 ? (
                  <EmptyState text="No notices available at the moment." />
                ) : (
                  visibleNotices.map((notice, index) => (
                    <NoticeItem
                      key={notice._id || notice.id || index}
                      notice={notice}
                    />
                  ))
                )}

              </div>

            </div>


            {/* =================================================
                EVENTS
            ================================================== */}

            <div className="reveal rounded-xl border border-orange-100 bg-light-yellow p-4 sm:p-5">

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-primary shadow-sm">
                    <CalendarDays size={19} />
                  </div>

                  <h2 className="text-lg font-bold text-primary">
                    Upcoming Events
                  </h2>

                </div>

                <Link
                  href="/events"
                  className="group flex items-center gap-1 text-xs font-semibold text-primary"
                >
                  View All
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>

              </div>

              <div className="mt-4 overflow-hidden rounded-lg bg-white">

                {loading ? (
                  <LoadingRows count={4} />
                ) : visibleEvents.length === 0 ? (
                  <EmptyState text="No upcoming events available." />
                ) : (
                  visibleEvents.map((event, index) => (
                    <EventItem
                      key={event._id || event.id || index}
                      event={event}
                    />
                  ))
                )}

              </div>

            </div>


            {/* =================================================
                OUR SCHOOL
            ================================================== */}

            <div className="reveal rounded-xl border border-blue-100 bg-light-blue p-4 sm:p-5">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-blue-700 shadow-sm">
                  <School size={19} />
                </div>

                <h2 className="text-lg font-bold text-blue-800">
                  Our School
                </h2>

              </div>

              <div className="mt-4 overflow-hidden rounded-lg">

                <img
                  src="/School Img.jpeg"
                  alt="Sikhsapith school campus"
                  className="school-image h-[145px] w-full object-cover"
                />

              </div>

              
<p className="mt-4 text-sm leading-6 text-text">
  {`${schoolInfo.schoolName} is committed to providing quality education and encouraging students to grow through learning, participation and good values.`}
</p>   

              <Link
                href="/about"
                className="group mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-800"
              >
                Learn More
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

            </div>


            {/* =================================================
                PRINCIPAL
            ================================================== */}

            <div className="reveal rounded-xl border border-purple-100 bg-light-purple p-4 sm:p-5">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-purple-700 shadow-sm">
                  <UserRound size={19} />
                </div>

                <h2 className="text-lg font-bold text-purple-800">
                  Principal's Message
                </h2>

              </div>

              <div className="mt-4 flex gap-4">

                <div className="h-[150px] w-[115px] shrink-0 overflow-hidden rounded-lg bg-white">

                  <img
                    src={
                      principal?.photo ||
                      principal?.image ||
                      "/Principal.jpeg"
                    }
                    alt="Principal of Sikhsapith"
                    className="h-full w-full object-cover"
                  />

                </div>

                <div className="min-w-0">

                  <p className="line-clamp-6 text-sm leading-6 text-text">
                    Education is not only about academic success.
                    It is about helping students discover their
                    abilities, develop confidence and understand
                    the importance of responsibility.
                  </p>

                  <p className="mt-3 text-sm font-bold text-primary">
                    {principal?.name || "Principal"}
                  </p>

                </div>

              </div>

              <Link
                href="/administration/principal"
                className="group mt-4 inline-flex items-center gap-2 text-sm font-semibold text-purple-800"
              >
                Read Full Message
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          STATISTICS
      ===================================================== */}

      <section className="px-4 pb-6 sm:px-6 lg:px-8">

        <div className="mx-auto grid max-w-[1350px] overflow-hidden rounded-xl bg-primary sm:grid-cols-2 lg:grid-cols-4">

          <Stat
            icon={<GraduationCap size={28} />}
            number="1985"
            label="Established"
          />

          <Stat
            icon={<Users size={28} />}
            number="1200+"
            label="Students"
          />

          <Stat
            icon={<BookOpen size={28} />}
            number="65+"
            label="Teachers"
          />

          <Stat
            icon={<SchoolIcon />}
            number="I – XII"
            label="Classes"
          />

        </div>

      </section>


      {/* =====================================================
          SCHOOL INTRODUCTION
      ===================================================== */}

      <section className="py-12 sm:py-16">

        <div className="mx-auto grid max-w-[1200px] gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">

          <div className="reveal overflow-hidden rounded-xl">

            <img
              src="/School Img 2.jpeg"
              alt="Sikhsapith campus"
              className="school-image h-full min-h-[280px] w-full object-cover"
            />

          </div>

          <div className="reveal flex flex-col justify-center">

            <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
              About Sikhsapith
            </p>

            <h2 className="mt-2 text-2xl font-bold text-heading sm:text-3xl">
              Education, discipline and opportunity.
            </h2>

            <p className="mt-4 text-sm leading-7 text-text sm:text-base">
              The school has always been committed to providing students
              with quality education and helping them develop into
              responsible and capable individuals.
            </p>

            <p className="mt-3 text-sm leading-7 text-text sm:text-base">
              Along with academic learning, students are encouraged to
              participate in different activities and develop their
              talents, confidence and sense of responsibility.
            </p>

            <Link
              href="/about"
              className="school-button mt-6 inline-flex w-fit items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white"
            >
              <button className=" text-white"> About Our School</button>
              <ArrowRight size={17} color="white" />
            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          QUICK LINKS
      ===================================================== */}

      <section className="border-y border-border bg-light-red py-12">

        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">

          <div className="mb-7">

            <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
              Student & Parent Corner
            </p>

            <h2 className="mt-2 text-2xl font-bold text-heading">
              Important Links
            </h2>

          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

            <QuickLink
              href="/notice-board"
              title="Notice Board"
              icon={<Bell size={18} />}
            />

            <QuickLink
              href="/events"
              title="School Events"
              icon={<CalendarDays size={18} />}
            />

            <QuickLink
              href="/staff/teaching"
              title="Teaching Staff"
              icon={<Users size={18} />}
            />

            <QuickLink
              href="/gallery"
              title="Photo Gallery"
              icon={<BookOpen size={18} />}
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          CONTACT
      ===================================================== */}

      <section className="bg-primary-dark py-9 text-white">

        <div className="mx-auto grid max-w-[1200px] gap-7 px-4 sm:px-6 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">

          <ContactItem
            icon={<MapPin size={21} />}
            title="Visit Us"
            text="Pathsala, Bajali, Assam – 781325"
          />

          <ContactItem
            icon={<Phone size={21} />}
            title="Call Us"
            text="+91 12345 67890"
          />

          <ContactItem
            icon={<Mail size={21} />}
            title="Email Us"
            text="sikhsapith.pathsala@gmail.com"
          />

        </div>

      </section>


      {/* =====================================================
          ANIMATIONS
      ===================================================== */}

      <style jsx global>{`

        .hero-slide-item {
          animation:
            heroSlideItem
            0.7s
            cubic-bezier(.22,1,.36,1)
            both;
        }

        .hero-slide-item:nth-child(2) {
          animation-delay: 0.08s;
        }

        .hero-slide-item:nth-child(3) {
          animation-delay: 0.16s;
        }

        .hero-slide-item:nth-child(4) {
          animation-delay: 0.24s;
        }

        @keyframes heroSlideItem {

          from {
            opacity: 0;
            transform: translateY(15px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }

        }

        .reveal {
          animation:
            revealUp
            linear
            both;

          animation-timeline: view();
          animation-range:
            entry 0%
            cover 28%;
        }

        @keyframes revealUp {

          from {
            opacity: 0;
            transform: translateY(22px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }

        }

        .feature-card {
          transition:
            transform .3s ease,
            box-shadow .3s ease,
            border-color .3s ease;
        }

        .feature-card:hover {
          transform: translateY(-4px);
          border-color: #fca5a5;
          box-shadow:
            0 12px 25px
            rgba(127, 29, 29, .07);
        }

        .quick-link {
          transition:
            transform .25s ease,
            background-color .25s ease,
            border-color .25s ease,
            box-shadow .25s ease;
        }

        .quick-link:hover {
          transform: translateY(-3px);
          background-color: #ffffff;
          border-color: #fca5a5;
          box-shadow:
            0 8px 20px
            rgba(127, 29, 29, .06);
        }

        @media (max-width: 640px) {

          .reveal {
            animation: none;
          }

        }

        @media (prefers-reduced-motion: reduce) {

          *,
          *::before,
          *::after {

            animation-duration:
              .01ms !important;

            animation-iteration-count:
              1 !important;

            scroll-behavior:
              auto !important;

            transition-duration:
              .01ms !important;

          }

        }

      `}</style>

    </main>
  );
}


/* =========================================================
   STAT
========================================================= */

function Stat({
  icon,
  number,
  label,
}) {

  return (

    <div className="group flex items-center gap-4 border-b border-white/15 px-6 py-6 text-white transition-colors duration-300 hover:bg-white/5 sm:border-r lg:border-b-0">

      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-white/20 text-white transition-transform duration-300 group-hover:scale-105">

        {icon}

      </div>

      <div>

        <p className="text-2xl font-bold leading-none">
          {number}
        </p>

        <p className="mt-2 text-xs text-white/70">
          {label}
        </p>

      </div>

    </div>

  );
}


/* =========================================================
   NOTICE ITEM
========================================================= */

function NoticeItem({
  notice,
}) {

  const date =
    notice.createdAt ||
    notice.date;

  const formattedDate =
    date
      ? new Date(date)
      : null;

  const day =
    formattedDate
      ? formattedDate
          .getDate()
          .toString()
          .padStart(2, "0")
      : "--";

  const month =
    formattedDate
      ? formattedDate
          .toLocaleString(
            "en-US",
            {
              month: "short",
            }
          )
          .toUpperCase()
      : "---";

  const fileUrl =
    notice.fileUrl ||
    notice.file ||
    notice.pdfUrl ||
    notice.pdf ||
    notice.imageUrl ||
    notice.image ||
    notice.attachmentUrl ||
    notice.attachment ||
    null;

  const noticeId =
    notice._id ||
    notice.id;

  const target =
    fileUrl ||
    (
      noticeId
        ? `/notice-board/${noticeId}`
        : "/notice-board"
    );

  return (

    <a
      href={target}
      target={fileUrl ? "_blank" : undefined}
      rel={
        fileUrl
          ? "noopener noreferrer"
          : undefined
      }
      className="notice-item group flex gap-3 border-b border-border px-3 py-3 last:border-0"
    >

      <div className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-lg bg-primary/5 text-primary">

        <span className="text-base font-bold leading-none">
          {day}
        </span>

        <span className="mt-1 text-[8px] font-bold tracking-wide">
          {month}
        </span>

      </div>

      <div className="min-w-0 flex-1">

        <div className="flex items-start gap-2">

          <h3 className="line-clamp-2 flex-1 text-sm font-semibold leading-5 text-heading transition-colors group-hover:text-primary">
            {notice.title ||
              notice.name ||
              "School Notice"}
          </h3>

          {indexIsNew(notice) && (
            <span className="shrink-0 rounded bg-primary px-1.5 py-0.5 text-[8px] font-bold uppercase text-white">
              New
            </span>
          )}

        </div>

        {notice.description && (
          <p className="mt-1 line-clamp-1 text-xs text-text">
            {notice.description}
          </p>
        )}

      </div>

      <ChevronRight
        size={15}
        className="mt-3 shrink-0 text-text transition-transform group-hover:translate-x-1 group-hover:text-primary"
      />

    </a>
  );
}


/* =========================================================
   EVENT ITEM
========================================================= */

function EventItem({
  event,
}) {

  const date =
    event.date ||
    event.createdAt;

  const formattedDate =
    date
      ? new Date(date)
      : null;

  const day =
    formattedDate
      ? formattedDate
          .getDate()
          .toString()
          .padStart(2, "0")
      : "--";

  const month =
    formattedDate
      ? formattedDate
          .toLocaleString(
            "en-US",
            {
              month: "short",
            }
          )
          .toUpperCase()
      : "---";

  const fileUrl =
    event.fileUrl ||
    event.file ||
    event.pdfUrl ||
    event.pdf ||
    event.imageUrl ||
    event.image ||
    event.attachmentUrl ||
    event.attachment ||
    null;

  const eventId =
    event._id ||
    event.id;

  const target =
    fileUrl ||
    (
      eventId
        ? `/events/${eventId}`
        : "/events"
    );

  return (

    <a
      href={target}
      target={fileUrl ? "_blank" : undefined}
      rel={
        fileUrl
          ? "noopener noreferrer"
          : undefined
      }
      className="event-item group flex gap-3 border-b border-border px-3 py-3 last:border-0"
    >

      <div className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-lg bg-primary text-white">

        <span className="text-base font-bold leading-none">
          {day}
        </span>

        <span className="mt-1 text-[8px] font-semibold tracking-wide text-white/80">
          {month}
        </span>

      </div>

      <div className="min-w-0 flex-1">

        <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-heading transition-colors group-hover:text-primary">
          {event.title ||
            event.name ||
            "School Event"}
        </h3>

        <div className="mt-1 flex items-center gap-1.5 text-xs text-text">

          <CalendarDays size={12} />

          <span className="truncate">
            {formattedDate
              ? formattedDate.toLocaleDateString(
                  "en-IN",
                  {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }
                )
              : "Date to be announced"}
          </span>

        </div>

      </div>

      <ChevronRight
        size={15}
        className="mt-3 shrink-0 text-text transition-transform group-hover:translate-x-1 group-hover:text-primary"
      />

    </a>
  );
}


/* =========================================================
   QUICK LINK
========================================================= */

function QuickLink({
  href,
  title,
  icon,
}) {

  return (

    <Link
      href={href}
      className="quick-link flex items-center justify-between rounded-lg border border-border bg-white px-4 py-4"
    >

      <div className="flex items-center gap-3">

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/5 text-primary">
          {icon}
        </div>

        <span className="text-sm font-semibold text-heading">
          {title}
        </span>

      </div>

      <ChevronRight
        size={17}
        className="text-text"
      />

    </Link>

  );
}


/* =========================================================
   CONTACT ITEM
========================================================= */

function ContactItem({
  icon,
  title,
  text,
}) {

  return (

    <div className="flex items-start gap-4">

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/15 text-white">
        {icon}
      </div>

      <div>

        <p className="text-sm font-semibold">
          {title}
        </p>

        <p className="mt-1 text-sm text-white/65">
          {text}
        </p>

      </div>

    </div>

  );
}


/* =========================================================
   LOADING ROWS
========================================================= */

function LoadingRows({
  count = 4,
}) {

  return (

    <>

      {Array.from({
        length: count,
      }).map((_, index) => (

        <div
          key={index}
          className="flex animate-pulse gap-3 border-b border-border p-3 last:border-0"
        >

          <div className="h-11 w-11 rounded-lg bg-border" />

          <div className="flex-1">

            <div className="h-3.5 w-4/5 rounded bg-border" />

            <div className="mt-2 h-2.5 w-1/2 rounded bg-border" />

          </div>

        </div>

      ))}

    </>

  );
}


/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyState({
  text,
}) {

  return (

    <div className="flex min-h-28 items-center justify-center p-5 text-center text-xs text-text">
      {text}
    </div>

  );
}


/* =========================================================
   NEW NOTICE HELPER
========================================================= */

function indexIsNew(notice) {

  if (!notice?.createdAt && !notice?.date) {
    return false;
  }

  const date =
    new Date(
      notice.createdAt ||
      notice.date
    );

  const now =
    new Date();

  const difference =
    now.getTime() -
    date.getTime();

  const days =
    difference /
    (1000 * 60 * 60 * 24);

  return days >= 0 && days <= 7;
}


/* =========================================================
   SCHOOL ICON
========================================================= */

function SchoolIcon() {

  return (

    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >

      <path d="m3 10 9-6 9 6" />

      <path d="M5 10v8" />

      <path d="M19 10v8" />

      <path d="M3 18h18" />

      <path d="M8 10v4" />

      <path d="M12 10v4" />

      <path d="M16 10v4" />

    </svg>

  );
}