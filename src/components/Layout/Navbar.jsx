"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { schoolInfo } from "@/app/constants/data";

const SCHOOL_NAME = "Mrityunjoy Academy Sarthebari";

const links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About Us",
    href: "/about",
  },
  // {
  //   name: "Academics",
  //   href: "/academics",
  // },
  {
    name: "Administration",
    children: [
      {
        name: "Principal's Desk",
        href: "/administration/principal",
      },
      {
        name: "Rules & Regulations",
        href: "/administration/rules-regulations",
      },
    ],
  },
  {
    name: "Staff",
    children: [
      {
        name: "Teaching Staff",
        href: "/staff/teaching",
      },
      {
        name: "Non-Teaching Staff",
        href: "/staff/non-teaching",
      },
    ],
  },
  {
    name: "Achievements",
    href: "/achievements",
  },
  {
    name: "Gallery",
    href: "/gallery",
  },
  {
    name: "Notice Board",
    href: "/notice-board",
  },
  {
    name: "Contact Us",
    href: "/contact",
  },
];

export default function Navbar() {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  /* =====================================================
     CLOSE MENU WHEN ROUTE CHANGES
  ===================================================== */

  useEffect(() => {
    setMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  /* =====================================================
     LOCK BODY WHEN MOBILE MENU IS OPEN
  ===================================================== */

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  /* =====================================================
     ACTIVE LINK
  ===================================================== */

  const isActive = (href) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  /* =====================================================
     ACTIVE DROPDOWN
  ===================================================== */

  const isParentActive = (children) => {
    return children?.some((child) =>
      pathname.startsWith(child.href)
    );
  };

  /* =====================================================
     DROPDOWN
  ===================================================== */

  const toggleDropdown = (name) => {
    setOpenDropdown((current) =>
      current === name ? null : name
    );
  };

  return (
    <header className="relative z-50 w-full bg-white">

      {/* =====================================================
          MAIN HEADER
      ===================================================== */}

      <div className="border-b border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div
            className="
              flex
              min-h-[72px]
              items-center
              justify-between
              gap-6
            "
          >

            {/* =================================================
                BRAND
            ================================================= */}

            <Link
              href="/"
              className="
                group
                flex
                min-w-0
                shrink-0
                items-center
                gap-3
              "
            >

              {/* LOGO */}

              <div
                className="
                  flex
                  h-[54px]
                  w-[62px]
                  shrink-0
                  items-center
                  justify-center
                "
              >

                <img
                  src="/logo.jpg"
                  alt={SCHOOL_NAME}
                  className="
                    h-full
                    w-full
                    object-contain
                    transition-transform
                    duration-300
                    group-hover:scale-105
                  "
                />

              </div>


              {/* SCHOOL DETAILS */}

              <div className="min-w-0">

                <h1
                  className="
                    whitespace-nowrap
                    text-[16px]
                    font-bold
                    leading-tight
                    tracking-tight
                    text-red-700
                    sm:text-[18px]
                    lg:text-[20px]
                  "
                >
                  {schoolInfo.schoolName}
                </h1>


                <div
                  className="
                    mt-1
                    flex
                    items-center
                    gap-2
                    whitespace-nowrap
                    text-[9px]
                    font-medium
                    text-slate-500
                    sm:text-[10px]
                  "
                >

                  <span>
                    A Co-educational School
                  </span>

                  <span
                    className="
                      h-1
                      w-1
                      rounded-full
                      bg-red-300
                    "
                  />

                  <span>
                   {schoolInfo.adress}
                  </span>

                </div>

              </div>

            </Link>


            {/* =================================================
                DESKTOP NAVIGATION
            ================================================= */}

            <nav
              className="
                hidden
                h-[72px]
                items-center
                lg:flex
              "
            >

              {links.map((link) => {

                const active = link.href
                  ? isActive(link.href)
                  : isParentActive(link.children);

                return (

                  <div
                    key={link.name}
                    className="relative h-full"
                    onMouseEnter={() => {
                      if (link.children) {
                        setOpenDropdown(link.name);
                      }
                    }}
                    onMouseLeave={() => {
                      if (link.children) {
                        setOpenDropdown(null);
                      }
                    }}
                  >

                    {/* =================================================
                        NORMAL LINK
                    ================================================= */}

                    {!link.children ? (

                      <Link
                        href={link.href}
                        className={`
                          relative
                          flex
                          h-full
                          items-center
                          px-3
                          text-[13px]
                          font-semibold
                          whitespace-nowrap
                          transition-colors
                          duration-200
                          xl:px-3.5
                          xl:text-[13px]

                          ${
                            active
                              ? "text-red-700"
                              : "text-slate-800 hover:text-red-700"
                          }
                        `}
                      >

                        {link.name}

                        {/* ACTIVE LINE */}

                        <span
                          className={`
                            absolute
                            bottom-0
                            left-3
                            right-3
                            h-[2px]
                            rounded-full
                            bg-red-700
                            transition-transform
                            duration-200
                            xl:left-3.5
                            xl:right-3.5

                            ${
                              active
                                ? "scale-x-100"
                                : "scale-x-0"
                            }
                          `}
                        />

                      </Link>

                    ) : (

                      /* =================================================
                         DROPDOWN BUTTON
                      ================================================= */

                      <button
                        type="button"
                        onClick={() =>
                          toggleDropdown(link.name)
                        }
                        className={`
                          relative
                          flex
                          h-full
                          items-center
                          gap-1.5
                          px-3
                          text-[13px]
                          font-semibold
                          whitespace-nowrap
                          transition-colors
                          duration-200
                          xl:px-3.5
                          xl:text-[13px]

                          ${
                            active
                              ? "text-red-700"
                              : "text-slate-800 hover:text-red-700"
                          }
                        `}
                      >

                        {link.name}

                        <ChevronDown
                          size={14}
                          strokeWidth={2}
                          className={`
                            transition-transform
                            duration-200

                            ${
                              openDropdown === link.name
                                ? "rotate-180"
                                : ""
                            }
                          `}
                        />

                        {/* ACTIVE LINE */}

                        <span
                          className={`
                            absolute
                            bottom-0
                            left-3
                            right-3
                            h-[2px]
                            rounded-full
                            bg-red-700
                            transition-transform
                            duration-200
                            xl:left-3.5
                            xl:right-3.5

                            ${
                              active
                                ? "scale-x-100"
                                : "scale-x-0"
                            }
                          `}
                        />

                      </button>

                    )}


                    {/* =================================================
                        DESKTOP DROPDOWN
                    ================================================= */}

                    {link.children && (

                      <div
                        className={`
                          absolute
                          left-1/2
                          top-full
                          z-[100]
                          w-60
                          -translate-x-1/2
                          pt-1.5
                          transition-all
                          duration-200

                          ${
                            openDropdown === link.name
                              ? "visible translate-y-0 opacity-100"
                              : "invisible -translate-y-1 opacity-0"
                          }
                        `}
                      >

                        <div
                          className="
                            overflow-hidden
                            rounded-lg
                            border
                            border-slate-200
                            bg-white
                            p-1.5
                            shadow-xl
                          "
                        >

                          <div
                            className="
                              mb-1
                              h-[3px]
                              rounded-full
                              bg-red-700
                            "
                          />

                          {link.children.map((child) => {

                            const childActive =
                              isActive(child.href);

                            return (

                              <Link
                                key={child.name}
                                href={child.href}
                                className={`
                                  group
                                  flex
                                  items-center
                                  justify-between
                                  rounded-md
                                  px-3.5
                                  py-3
                                  text-[13px]
                                  transition-colors

                                  ${
                                    childActive
                                      ? "bg-red-50 font-semibold text-red-700"
                                      : "text-slate-700 hover:bg-red-50 hover:text-red-700"
                                  }
                                `}
                              >

                                <span>
                                  {child.name}
                                </span>

                                <ArrowRight
                                  size={14}
                                  className="
                                    -translate-x-1
                                    opacity-0
                                    transition-all
                                    duration-200
                                    group-hover:translate-x-0
                                    group-hover:opacity-100
                                  "
                                />

                              </Link>

                            );

                          })}

                        </div>

                      </div>

                    )}

                  </div>

                );

              })}

            </nav>


            {/* =================================================
                MOBILE MENU BUTTON
            ================================================= */}

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              className="
                rounded-lg
                border
                border-slate-200
                p-2
                text-slate-700
                transition
                hover:border-red-200
                hover:bg-red-50
                hover:text-red-700
                lg:hidden
              "
            >

              <Menu size={24} />

            </button>

          </div>

        </div>

      </div>


      {/* =====================================================
          MOBILE DRAWER
      ===================================================== */}

      <div
        className={`
          fixed
          inset-0
          z-[200]
          lg:hidden

          ${
            menuOpen
              ? "visible"
              : "invisible"
          }
        `}
      >

        {/* OVERLAY */}

        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setMenuOpen(false)}
          className={`
            absolute
            inset-0
            h-full
            w-full
            bg-black/40
            transition-opacity
            duration-300

            ${
              menuOpen
                ? "opacity-100"
                : "opacity-0"
            }
          `}
        />


        {/* DRAWER */}

        <aside
          className={`
            absolute
            right-0
            top-0
            flex
            h-full
            w-[88%]
            max-w-sm
            flex-col
            bg-white
            shadow-2xl
            transition-transform
            duration-300

            ${
              menuOpen
                ? "translate-x-0"
                : "translate-x-full"
            }
          `}
        >

          {/* =================================================
              MOBILE HEADER
          ================================================= */}

          <div
            className="
              flex
              h-[72px]
              shrink-0
              items-center
              justify-between
              border-b
              border-slate-200
              px-4
            "
          >

            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="
                flex
                min-w-0
                items-center
                gap-2.5
              "
            >

              <div
                className="
                  flex
                  h-12
                  w-14
                  shrink-0
                  items-center
                  justify-center
                "
              >

                <img
                  src="/logo.jpg"
                  alt={SCHOOL_NAME}
                  className="
                    h-full
                    w-full
                    object-contain
                  "
                />

              </div>


              <div className="min-w-0">

                <p
                  className="
                    max-w-[210px]
                    text-[12px]
                    font-bold
                    leading-tight
                    text-red-700
                  "
                >
                  {SCHOOL_NAME}
                </p>

                <p
                  className="
                    mt-1
                    text-[9px]
                    text-slate-500
                  "
                >
                  Sarthebari, Assam
                </p>

              </div>

            </Link>


            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="
                rounded-lg
                p-2
                text-slate-600
                transition
                hover:bg-red-50
                hover:text-red-700
              "
            >

              <X size={23} />

            </button>

          </div>


          {/* =================================================
              MOBILE MENU CONTENT
          ================================================= */}

          <div
            className="
              flex-1
              overflow-y-auto
              px-3
              py-5
            "
          >

            <p
              className="
                mb-2
                px-3
                text-[9px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-slate-400
              "
            >
              Menu
            </p>


            <div className="space-y-1">

              {links.map((link) => {

                const active = link.href
                  ? isActive(link.href)
                  : isParentActive(link.children);


                {/* =================================================
                    NORMAL MOBILE LINK
                ================================================= */}

                if (!link.children) {

                  return (

                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`
                        flex
                        items-center
                        justify-between
                        rounded-lg
                        px-3.5
                        py-3.5
                        text-[14px]
                        font-medium
                        transition

                        ${
                          active
                            ? "bg-red-50 text-red-700"
                            : "text-slate-700 hover:bg-slate-50 hover:text-red-700"
                        }
                      `}
                    >

                      <span>
                        {link.name}
                      </span>

                      <ArrowRight size={16} />

                    </Link>

                  );

                }


                {/* =================================================
                    MOBILE DROPDOWN
                ================================================= */}

                return (

                  <div key={link.name}>

                    <button
                      type="button"
                      onClick={() =>
                        toggleDropdown(link.name)
                      }
                      className={`
                        flex
                        w-full
                        items-center
                        justify-between
                        rounded-lg
                        px-3.5
                        py-3.5
                        text-left
                        text-[14px]
                        font-medium
                        transition

                        ${
                          active
                            ? "bg-red-50 text-red-700"
                            : "text-slate-700 hover:bg-slate-50 hover:text-red-700"
                        }
                      `}
                    >

                      <span>
                        {link.name}
                      </span>

                      <ChevronDown
                        size={17}
                        className={`
                          transition-transform
                          duration-200

                          ${
                            openDropdown === link.name
                              ? "rotate-180"
                              : ""
                          }
                        `}
                      />

                    </button>


                    <div
                      className={`
                        overflow-hidden
                        transition-all
                        duration-300

                        ${
                          openDropdown === link.name
                            ? "max-h-52 opacity-100"
                            : "max-h-0 opacity-0"
                        }
                      `}
                    >

                      <div
                        className="
                          ml-3
                          border-l
                          border-red-100
                          pl-2
                        "
                      >

                        {link.children.map((child) => {

                          const childActive =
                            isActive(child.href);

                          return (

                            <Link
                              key={child.name}
                              href={child.href}
                              onClick={() => {
                                setMenuOpen(false);
                                setOpenDropdown(null);
                              }}
                              className={`
                                block
                                rounded-md
                                px-3
                                py-3
                                text-[13px]
                                transition

                                ${
                                  childActive
                                    ? "bg-red-50 font-semibold text-red-700"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-red-700"
                                }
                              `}
                            >

                              {child.name}

                            </Link>

                          );

                        })}

                      </div>

                    </div>

                  </div>

                );

              })}

            </div>

          </div>


          {/* =================================================
              MOBILE FOOTER
          ================================================= */}

          <div
            className="
              shrink-0
              border-t
              border-slate-200
              px-4
              py-3
            "
          >

            <p
              className="
                text-center
                text-[9px]
                text-slate-400
              "
            >
              {SCHOOL_NAME}
            </p>

          </div>

        </aside>

      </div>

    </header>
  );
}