"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Mail,
  Phone,
  Users,
  Search,
  Loader2,
  X,
  UserRound,
  Briefcase,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export default function NonTeachingStaffPage() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedStaff, setSelectedStaff] = useState(null);

  /* =====================================================
     FETCH NON-TEACHING STAFF
  ===================================================== */

  useEffect(() => {
    async function fetchNonTeachingStaff() {
      try {
        setLoading(true);

        const response = await fetch("/api/staff/non-teaching", {
          cache: "no-store",
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result?.message ||
              "Failed to fetch non-teaching staff information."
          );
        }

        setStaff(result?.data || []);
      } catch (error) {
        console.error(
          "FETCH NON-TEACHING STAFF ERROR:",
          error
        );

        setStaff([]);
      } finally {
        setLoading(false);
      }
    }

    fetchNonTeachingStaff();
  }, []);

  /* =====================================================
     DESIGNATION FILTERS
  ===================================================== */

  const designations = useMemo(() => {
    const values = staff
      .map((person) => person.designation)
      .filter(Boolean);

    return ["All", ...new Set(values)];
  }, [staff]);

  /* =====================================================
     FILTER STAFF
  ===================================================== */

  const filteredStaff = useMemo(() => {
    const query = search.trim().toLowerCase();

    return staff.filter((person) => {
      const matchesSearch =
        !query ||
        person.name?.toLowerCase().includes(query) ||
        person.designation?.toLowerCase().includes(query) ||
        person.qualification?.toLowerCase().includes(query) ||
        person.email?.toLowerCase().includes(query);

      const matchesFilter =
        activeFilter === "All" ||
        person.designation === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [staff, search, activeFilter]);

  return (
    <main className="min-h-screen bg-background text-text">

      {/* =====================================================
          PAGE INTRO
      ===================================================== */}

      <section className="border-b border-border bg-card">

        <div className="mx-auto max-w-7xl px-5 py-7 lg:px-6">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <div className="
                flex
                items-center
                gap-2
                text-xs
                font-bold
                uppercase
                tracking-[0.18em]
                text-primary
              ">

                <span>Our People</span>

                <span className="
                  h-1
                  w-1
                  rounded-full
                  bg-primary
                " />

                <span>Administration</span>

              </div>


              <h1 className="
                mt-2
                text-3xl
                font-bold
                tracking-tight
                text-heading
                sm:text-4xl
              ">
                Non-Teaching Staff
              </h1>


              <p className="
                mt-2
                max-w-2xl
                text-sm
                leading-6
                text-text
              ">
                Meet the dedicated members of Mrityunjoy Academy
                Sarthebari who support the daily operations and
                administration of our school.
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
                text-primary
                transition-all
                hover:gap-3
              "
            >

              Back Home

              <ArrowRight
                size={16}
                className="
                  transition-transform
                  group-hover:translate-x-1
                "
              />

            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          SUMMARY
      ===================================================== */}

      <section className="border-b border-border bg-primary/5">

        <div className="
          mx-auto
          grid
          max-w-7xl
          grid-cols-2
          divide-x
          divide-border
          sm:grid-cols-3
          lg:px-6
        ">

          <SummaryItem
            icon={<Users size={19} />}
            value={staff.length}
            label="Staff Members"
          />

          <SummaryItem
            icon={<Briefcase size={19} />}
            value="Administrative"
            label="Support"
          />

          <SummaryItem
            icon={<UserRound size={19} />}
            value="School"
            label="Community"
          />

        </div>

      </section>


      {/* =====================================================
          DIRECTORY
      ===================================================== */}

      <section className="
        px-5
        py-8
        lg:px-6
        lg:py-10
      ">

        <div className="mx-auto max-w-7xl">


          {/* =================================================
              DIRECTORY HEADER
          ================================================= */}

          <div className="
            flex
            flex-col
            gap-4
            border-b
            border-border
            pb-5
            lg:flex-row
            lg:items-center
            lg:justify-between
          ">

            <div>

              <p className="
                text-xs
                font-bold
                uppercase
                tracking-[0.16em]
                text-primary
              ">
                Staff Directory
              </p>

              <h2 className="
                mt-1
                text-xl
                font-bold
                text-heading
              ">
                People behind our school
              </h2>

            </div>


            {/* SEARCH */}

            <div className="
              relative
              w-full
              sm:max-w-xs
            ">

              <Search
                size={17}
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-text/50
                "
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search staff..."
                className="
                  h-10
                  w-full
                  rounded-lg
                  border
                  border-border
                  bg-card
                  pl-10
                  pr-4
                  text-sm
                  text-heading
                  outline-none
                  transition
                  placeholder:text-text/40
                  focus:border-primary
                  focus:ring-2
                  focus:ring-primary/10
                "
              />

            </div>

          </div>


          {/* =================================================
              DESIGNATION FILTER
          ================================================= */}

          {!loading &&
            staff.length > 0 &&
            designations.length > 1 && (

              <div className="
                flex
                gap-2
                overflow-x-auto
                py-5
              ">

                {designations.map((designation) => {

                  const active =
                    activeFilter === designation;

                  return (

                    <button
                      key={designation}
                      type="button"
                      onClick={() =>
                        setActiveFilter(designation)
                      }
                      className={`
                        shrink-0
                        rounded-full
                        px-4
                        py-2
                        text-xs
                        font-semibold
                        transition-all
                        ${
                          active
                            ? "bg-primary !text-white shadow-sm"
                            : "border border-border bg-card text-text hover:border-primary/30 hover:text-primary"
                        }
                      `}
                    >
                      {designation}
                    </button>

                  );
                })}

              </div>

            )}


          {/* =================================================
              LOADING
          ================================================= */}

          {loading && (

            <div className="
              flex
              min-h-[360px]
              items-center
              justify-center
            ">

              <div className="
                flex
                items-center
                gap-3
                rounded-lg
                border
                border-border
                bg-card
                px-5
                py-4
                text-sm
              ">

                <Loader2
                  size={19}
                  className="animate-spin text-primary"
                />

                <span className="text-text">
                  Loading non-teaching staff...
                </span>

              </div>

            </div>

          )}


          {/* =================================================
              EMPTY
          ================================================= */}

          {!loading && staff.length === 0 && (

            <div className="
              flex
              min-h-[330px]
              items-center
              justify-center
            ">

              <div className="max-w-sm text-center">

                <div className="
                  mx-auto
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-xl
                  bg-primary/10
                  text-primary
                ">

                  <Users size={25} />

                </div>


                <h3 className="
                  mt-4
                  text-lg
                  font-bold
                  text-heading
                ">
                  Non-teaching staff unavailable
                </h3>


                <p className="
                  mt-2
                  text-sm
                  leading-6
                  text-text
                ">
                  Non-teaching staff information will appear here
                  once it has been added to the school directory.
                </p>

              </div>

            </div>

          )}


          {/* =================================================
              NO RESULTS
          ================================================= */}

          {!loading &&
            staff.length > 0 &&
            filteredStaff.length === 0 && (

              <div className="
                py-20
                text-center
              ">

                <Search
                  size={28}
                  className="mx-auto text-primary/50"
                />


                <h3 className="
                  mt-4
                  font-bold
                  text-heading
                ">
                  No staff members found
                </h3>


                <p className="
                  mt-1
                  text-sm
                  text-text
                ">
                  Try a different name or designation.
                </p>


                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setActiveFilter("All");
                  }}
                  className="
                    mt-5
                    rounded-lg
                    bg-primary
                    px-4
                    py-2.5
                    text-sm
                    font-semibold
                    !text-white
                    transition
                    hover:opacity-90
                  "
                >
                  Clear Search
                </button>

              </div>

            )}


          {/* =================================================
              STAFF GRID
          ================================================= */}

          {!loading && filteredStaff.length > 0 && (

            <div className="
              mt-2
              grid
              gap-5
              sm:grid-cols-2
              lg:grid-cols-3
            ">

              {filteredStaff.map((person, index) => (

                <StaffCard
                  key={person._id || index}
                  person={person}
                  index={index}
                  onClick={() =>
                    setSelectedStaff(person)
                  }
                />

              ))}

            </div>

          )}

        </div>

      </section>


      {/* =====================================================
          CONTACT STRIP
      ===================================================== */}

      <section className="
        border-y
        border-primary/20
        bg-primary/5
      ">

        <div className="
          mx-auto
          flex
          max-w-7xl
          flex-col
          gap-4
          px-5
          py-6
          sm:flex-row
          sm:items-center
          sm:justify-between
          lg:px-6
        ">

          <div className="
            flex
            items-center
            gap-4
          ">

            <div className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-lg
              bg-primary
              text-white
            ">

              <Mail size={19} />

            </div>


            <div>

              <p className="font-bold text-heading">
                Want to contact the school?
              </p>

              <p className="
                mt-1
                text-sm
                text-text
              ">
                Reach out to the administration for more information.
              </p>

            </div>

          </div>


          <Link
            href="/contact"
            className="
              group
              inline-flex
              w-fit
              items-center
              gap-2
              rounded-lg
              bg-primary
              px-5
              py-3
              text-sm
              font-bold
              !text-white
              transition-all
              hover:opacity-90
            "
          >

            Contact Us

            <ArrowUpRight
              size={16}
              className="
                !text-white
                transition-transform
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
              "
            />

          </Link>

        </div>

      </section>


      {/* =====================================================
          STAFF MODAL
      ===================================================== */}

      {selectedStaff && (

        <StaffModal
          person={selectedStaff}
          onClose={() => setSelectedStaff(null)}
        />

      )}

    </main>
  );
}


/* =========================================================
   SUMMARY ITEM
========================================================= */

function SummaryItem({
  icon,
  value,
  label,
}) {
  return (
    <div className="
      flex
      items-center
      gap-3
      px-4
      py-4
      sm:px-6
    ">

      <div className="
        flex
        h-9
        w-9
        shrink-0
        items-center
        justify-center
        rounded-lg
        bg-card
        text-primary
      ">
        {icon}
      </div>


      <div className="min-w-0">

        <p className="
          truncate
          text-sm
          font-bold
          text-heading
        ">
          {value}
        </p>

        <p className="
          truncate
          text-[11px]
          text-text
        ">
          {label}
        </p>

      </div>

    </div>
  );
}


/* =========================================================
   STAFF CARD
========================================================= */

function StaffCard({
  person,
  index,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        group
        w-full
        overflow-hidden
        rounded-2xl
        border
        border-border
        bg-card
        text-left
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-primary/30
        hover:shadow-lg
        focus:outline-none
        focus:ring-2
        focus:ring-primary/20
      "
      style={{
        animationDelay: `${index * 60}ms`,
      }}
    >

      {/* =================================================
          PHOTO
      ================================================= */}

      <div className="
        relative
        h-64
        overflow-hidden
        bg-primary/10
      ">

        {person.photo ? (

          <img
            src={person.photo}
            alt={person.name || "Staff member"}
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

          <div className="
            flex
            h-full
            w-full
            items-center
            justify-center
            text-primary
          ">

            <UserRound
              size={58}
              strokeWidth={1.2}
            />

          </div>

        )}


        {/* PHOTO LABEL */}

        <div className="
          absolute
          bottom-3
          left-3
          rounded-md
          bg-white/95
          px-2.5
          py-1
          text-[10px]
          font-bold
          uppercase
          tracking-wider
          text-primary
          shadow-sm
        ">
          Staff
        </div>

      </div>


      {/* =================================================
          DETAILS
      ================================================= */}

      <div className="p-5">

        <div className="
          flex
          items-start
          justify-between
          gap-3
        ">

          <div className="min-w-0">

            <h3 className="
              truncate
              text-lg
              font-bold
              text-heading
            ">
              {person.name || "Staff Member"}
            </h3>


            {person.designation && (

              <p className="
                mt-1
                text-xs
                font-semibold
                text-primary
              ">
                {person.designation}
              </p>

            )}

          </div>


          {/* ARROW */}

          <span className="
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-primary/10
            text-primary
            transition-all
            group-hover:bg-primary
            group-hover:text-white
          ">

            <ArrowRight size={15} />

          </span>

        </div>


        {/* QUALIFICATION */}

        {person.qualification && (

          <div className="
            mt-5
            flex
            items-center
            gap-3
            border-t
            border-border
            pt-4
          ">

            <div className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-lg
              bg-primary/10
              text-primary
            ">

              <UserRound size={15} />

            </div>


            <div className="min-w-0">

              <p className="
                text-[10px]
                font-bold
                uppercase
                tracking-wider
                text-text/50
              ">
                Qualification
              </p>


              <p className="
                mt-0.5
                truncate
                text-sm
                font-medium
                text-heading
              ">
                {person.qualification}
              </p>

            </div>

          </div>

        )}


        {/* VIEW PROFILE */}

        <p className="
          mt-5
          text-xs
          font-bold
          text-primary
        ">
          View staff profile →
        </p>

      </div>

    </button>
  );
}


/* =========================================================
   STAFF MODAL
========================================================= */

function StaffModal({
  person,
  onClose,
}) {
  useEffect(() => {

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      document.body.style.overflow =
        previousOverflow;

    };

  }, [onClose]);


  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/50
        p-4
        backdrop-blur-sm
      "
      onMouseDown={(event) => {

        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }

      }}
    >

      <div className="
        relative
        max-h-[90vh]
        w-full
        max-w-3xl
        overflow-y-auto
        rounded-2xl
        border
        border-border
        bg-card
        shadow-2xl
      ">


        {/* =================================================
            CLOSE
        ================================================= */}

        <button
          type="button"
          onClick={onClose}
          aria-label="Close staff information"
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
            bg-background
            text-text
            shadow-sm
            transition
            hover:bg-primary
            hover:text-white
          "
        >
          <X size={18} />
        </button>


        {/* =================================================
            PROFILE
        ================================================= */}

        <div className="
          grid
          md:grid-cols-[280px_1fr]
        ">


          {/* IMAGE */}

          <div className="
            h-80
            bg-primary/10
            md:h-full
            md:min-h-[390px]
          ">

            {person.photo ? (

              <img
                src={person.photo}
                alt={person.name || "Staff member"}
                className="
                  h-full
                  w-full
                  object-cover
                  object-[center_12%]
                "
              />

            ) : (

              <div className="
                flex
                h-full
                w-full
                items-center
                justify-center
                text-primary
              ">

                <UserRound
                  size={70}
                  strokeWidth={1.2}
                />

              </div>

            )}

          </div>


          {/* DETAILS */}

          <div className="p-6 sm:p-8">

            <p className="
              text-xs
              font-bold
              uppercase
              tracking-[0.18em]
              text-primary
            ">
              Non-Teaching Staff
            </p>


            <h2 className="
              mt-2
              pr-8
              text-2xl
              font-bold
              tracking-tight
              text-heading
              sm:text-3xl
            ">
              {person.name || "Staff Member"}
            </h2>


            {person.designation && (

              <p className="
                mt-2
                text-sm
                font-semibold
                text-primary
              ">
                {person.designation}
              </p>

            )}


            <div className="
              mt-7
              space-y-5
            ">


              {person.qualification && (

                <StaffDetail
                  icon={<UserRound size={18} />}
                  label="Qualification"
                  value={person.qualification}
                />

              )}


              {person.email && (

                <StaffDetail
                  icon={<Mail size={18} />}
                  label="Email"
                  value={person.email}
                />

              )}


              {person.phone && (

                <StaffDetail
                  icon={<Phone size={18} />}
                  label="Phone"
                  value={person.phone}
                />

              )}

            </div>

          </div>

        </div>


        {/* =================================================
            BIO
        ================================================= */}

        {(person.bio || person.description) && (

          <div className="
            border-t
            border-border
            bg-primary/5
            p-6
            sm:p-8
          ">

            <div className="
              flex
              items-center
              gap-2
              text-xs
              font-bold
              uppercase
              tracking-[0.16em]
              text-primary
            ">

              <span className="
                h-px
                w-6
                bg-primary
              " />

              About Staff Member

            </div>


            <p className="
              mt-4
              text-sm
              leading-7
              text-text
            ">
              {person.bio ||
                person.description}
            </p>

          </div>

        )}


        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="
          flex
          justify-end
          border-t
          border-border
          bg-primary/5
          px-6
          py-4
          sm:px-8
        ">

          <button
            type="button"
            onClick={onClose}
            className="
              rounded-lg
              bg-primary
              px-5
              py-2.5
              text-sm
              font-semibold
              !text-white
              transition
              hover:opacity-90
            "
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   STAFF DETAIL
========================================================= */

function StaffDetail({
  icon,
  label,
  value,
}) {
  return (
    <div className="flex gap-3">

      <div className="
        flex
        h-10
        w-10
        shrink-0
        items-center
        justify-center
        rounded-lg
        bg-primary/10
        text-primary
      ">
        {icon}
      </div>


      <div className="min-w-0">

        <p className="
          text-xs
          text-text/60
        ">
          {label}
        </p>


        <p className="
          mt-1
          break-words
          text-sm
          font-semibold
          text-heading
        ">
          {value}
        </p>

      </div>

    </div>
  );
}