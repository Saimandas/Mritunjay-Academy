"use client";

import { useEffect, useState } from "react";
import {
  Trophy,
  Award,
  Medal,
  Star,
  Loader2,
  ArrowUpRight,
} from "lucide-react";

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAchievements() {
      try {
        const response = await fetch("/api/achievement", {
          cache: "no-store",
        });

        const data = await response.json();

        if (response.ok) {
          setAchievements(data?.data || []);
        }
      } catch (error) {
        console.error("Achievements error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadAchievements();
  }, []);

  return (
    <main className="min-h-screen bg-[#fffaf8] text-[#292323]">

      {/* =====================================================
          COMPACT PAGE INTRO
      ===================================================== */}

      <section className="border-b border-[#ead9d5] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-7 lg:px-6">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#b91c1c]">
                <span className="h-2 w-2 rounded-full bg-[#b91c1c]" />
                Student Excellence
              </div>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#231f20] sm:text-4xl">
                Achievements
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6b6262]">
                Celebrating the dedication, talent and accomplishments
                of the students of Mrityunjoy Academy Sarthebari.
              </p>
            </div>

            {!loading && achievements.length > 0 && (
              <div className="flex w-fit items-center gap-2 rounded-full bg-[#fff0ed] px-4 py-2 text-xs font-bold text-[#a31d1d]">
                <Trophy size={15} />
                {achievements.length}{" "}
                {achievements.length === 1
                  ? "Achievement"
                  : "Achievements"}
              </div>
            )}

          </div>

        </div>
      </section>


      {/* =====================================================
          ACHIEVEMENT CONTENT
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-5 py-9 lg:px-6">

        {/* SMALL INTRO STRIP */}

        {!loading && achievements.length > 0 && (
          <div className="mb-7 flex items-center gap-4 rounded-2xl border border-[#ead9d5] bg-[#fff5f2] px-5 py-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#b91c1c] text-white">
              <Medal size={21} />
            </div>

            <div>
              <p className="text-sm font-bold text-[#342b2b]">
                Celebrating student success
              </p>

              <p className="mt-0.5 text-xs leading-5 text-[#746969]">
                Every achievement reflects hard work, commitment
                and the encouragement of our school community.
              </p>
            </div>

          </div>
        )}


        {/* =================================================
            LOADING
        ================================================= */}

        {loading && <AchievementSkeleton />}


        {/* =================================================
            EMPTY
        ================================================= */}

        {!loading && achievements.length === 0 && (
          <div className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#ddc7c3] bg-white px-6 text-center">

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fff0ed] text-[#b91c1c]">
              <Trophy size={28} />
            </div>

            <h2 className="mt-5 text-xl font-bold text-[#292323]">
              No achievements available
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-[#746969]">
              Student achievements will appear here once
              they are added.
            </p>

          </div>
        )}


        {/* =================================================
            ACHIEVEMENT GRID
        ================================================= */}

        {!loading && achievements.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {achievements.map((item, index) => (
              <AchievementCard
                key={item._id || index}
                achievement={item}
                index={index}
              />
            ))}

          </div>
        )}

      </section>


      {/* =====================================================
          CLOSING STRIP
      ===================================================== */}

      {!loading && achievements.length > 0 && (
        <section className="border-t border-[#ead9d5] bg-white">

          <div className="mx-auto flex max-w-7xl items-center gap-4 px-5 py-7 lg:px-6">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#fff0ed] text-[#b91c1c]">
              <Star size={18} />
            </div>

            <p className="text-sm leading-6 text-[#665959]">
              We are proud of every student who continues to
              learn, participate and strive for excellence.
            </p>

          </div>

        </section>
      )}

    </main>
  );
}


/* =========================================================
   ACHIEVEMENT CARD
========================================================= */

function AchievementCard({ achievement, index }) {
  return (
    <article
      className="
        group
        overflow-hidden
        rounded-2xl
        border
        border-[#ead9d5]
        bg-white
        shadow-[0_3px_15px_rgba(91,35,28,0.05)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-[#d8aaa3]
        hover:shadow-[0_14px_35px_rgba(91,35,28,0.11)]
      "
      style={{
        animationDelay: `${index * 70}ms`,
      }}
    >

      {/* =================================================
          IMAGE
      ================================================= */}

      <div className="relative aspect-[4/3] overflow-hidden bg-[#f8e9e6]">

        {achievement.photo ? (
          <img
            src={achievement.photo}
            alt={achievement.name || "Student achievement"}
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-500
              group-hover:scale-[1.035]
            "
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[#b91c1c]">
            <Trophy
              size={64}
              strokeWidth={1.1}
            />
          </div>
        )}

        {/* TOP NUMBER */}

        <div className="
          absolute
          left-4
          top-4
          flex
          h-9
          min-w-9
          items-center
          justify-center
          rounded-lg
          bg-white/95
          px-2
          text-[11px]
          font-extrabold
          text-[#a31d1d]
          shadow-sm
        ">
          {String(index + 1).padStart(2, "0")}
        </div>


        {/* BOTTOM ICON */}

        <div className="
          absolute
          bottom-4
          left-4
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          bg-white/95
          text-[#b91c1c]
          shadow-md
        ">
          <Award size={19} />
        </div>

      </div>


      {/* =================================================
          CONTENT
      ================================================= */}

      <div className="p-5">

        <div className="flex items-start justify-between gap-4">

          <h2 className="text-lg font-bold leading-6 text-[#292323]">
            {achievement.name || "Student"}
          </h2>

          <div className="
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
            <ArrowUpRight size={15} />
          </div>

        </div>


        {/* ACHIEVEMENT */}

        {achievement.achievement && (
          <div className="mt-4 border-t border-[#eee1de] pt-4">

            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#a29494]">
              Achievement
            </p>

            <p
              className="
                line-clamp-2
                text-sm
                font-medium
                leading-6
                text-[#554b4b]
              "
              title={achievement.achievement}
            >
              {achievement.achievement}
            </p>

          </div>
        )}

      </div>

    </article>
  );
}


/* =========================================================
   SKELETON
========================================================= */

function AchievementSkeleton() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border border-[#ead9d5] bg-white"
        >

          <div className="aspect-[4/3] animate-pulse bg-[#f2e8e5]" />

          <div className="space-y-4 p-5">

            <div className="h-5 w-2/3 animate-pulse rounded bg-[#f2e8e5]" />

            <div className="border-t border-[#eee1de] pt-4">

              <div className="h-3 w-24 animate-pulse rounded bg-[#f2e8e5]" />

              <div className="mt-2 h-4 w-full animate-pulse rounded bg-[#f2e8e5]" />

              <div className="mt-2 h-4 w-4/5 animate-pulse rounded bg-[#f2e8e5]" />

            </div>

          </div>

        </div>
      ))}

    </div>
  );
}