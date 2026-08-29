"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bell,
  CalendarDays,
  GraduationCap,
  Users,
  UserRound,
  Images,
  MessageSquare,
  Trophy,
  ArrowRight,
} from "lucide-react";
/* =========================================================
   ADMIN DASHBOARD ITEMS
========================================================= */

const stats = [
  {
    title: "Notices",
    description: "Manage school announcements",
    href: "/admin/notices",
    icon: Bell,
    access: ["admin", "operator"],
  },

  {
    title: "Events",
    description: "Manage school events",
    href: "/admin/events",
    icon: CalendarDays,
    access: ["admin", "operator"],
  },

  {
    title: "Teaching Staff",
    description: "Manage teaching staff",
    href: "/admin/teaching-staff",
    icon: GraduationCap,
    access: ["admin"],
  },

  {
    title: "Non-Teaching Staff",
    description: "Manage supporting staff",
    href: "/admin/non-teaching-staff",
    icon: Users,
    access: ["admin"],
  },

  {
    title: "Principal",
    description: "Manage principal information",
    href: "/admin/principal",
    icon: UserRound,
    access: ["admin"],
  },

  {
    title: "Gallery",
    description: "Manage school photographs",
    href: "/admin/gallery",
    icon: Images,
    access: ["admin", "operator"],
  },
  {
  title: "Achievements",
  description: "Manage student achievements",
  href: "/admin/achievement",
  icon: Trophy,
  access: ["admin","operator"],
},
  {
    title: "Contact Messages",
    description: "View messages received from visitors",
    href: "/admin/contact-messages",
    icon: MessageSquare,
    access: ["admin", "operator"],
  },
];

/* =========================================================
   DASHBOARD
========================================================= */

export default function AdminDashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  /* =======================================================
     LOAD CURRENT USER
  ======================================================= */

  useEffect(() => {
    async function loadUser() {
      try {
        const response = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        if (!response.ok) {
          router.push("/admin/login");
          return;
        }

        const data = await response.json();

        const currentUser =
          data?.user ||
          data?.data ||
          data ||
          null;

        setUser(currentUser);
      } catch (error) {
        console.error(
          "Dashboard user error:",
          error
        );

        router.push("/admin/login");
      } finally {
        setLoadingUser(false);
      }
    }

    loadUser();
  }, [router]);

  /* =======================================================
     LOADING
  ======================================================= */

  if (loadingUser) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900" />

          <p className="text-sm text-gray-500">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  /* =======================================================
     ROLE
  ======================================================= */

  const role = String(
    user?.role || ""
  ).toLowerCase();

  const isAdmin = role === "admin";
  const isOperator = role === "operator";

  /* =======================================================
     INVALID ROLE
  ======================================================= */

  if (!isAdmin && !isOperator) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-5 text-center">

          <h2 className="font-semibold text-red-700">
            Unauthorized
          </h2>

          <p className="mt-1 text-sm text-red-600">
            You do not have permission to access
            the admin panel.
          </p>

        </div>
      </div>
    );
  }

  /* =======================================================
     FILTER CARDS BASED ON ROLE
  ======================================================= */

  const visibleStats = stats.filter((item) =>
    item.access.includes(role)
  );

  /* =======================================================
     RETURN
  ======================================================= */

  return (
    <div>

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="mb-8">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

          <div>

            <p className="mb-1 text-sm font-medium text-gray-500">
              Dashboard
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Welcome to the Admin Panel
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
              Manage the content and information
              displayed on the Jatiya Vidyalaya website.
            </p>

          </div>

          {/* ROLE */}

          <div
            className={`
              inline-flex
              w-fit
              items-center
              rounded-full
              px-3
              py-1.5
              text-xs
              font-semibold
              uppercase
              tracking-wide
              ${
                isAdmin
                  ? "bg-gray-900 text-white"
                  : "bg-green-100 text-green-700"
              }
            `}
          >
            {role}
          </div>

        </div>

      </div>


      {/* =====================================================
          WEBSITE MANAGEMENT
      ===================================================== */}

      <section>

        <div className="mb-5">

          <h2 className="text-lg font-semibold text-gray-900">
            Website Management
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Choose a section to manage.
          </p>

        </div>


        {/* =================================================
            MANAGEMENT CARDS
        ================================================= */}

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

          {visibleStats.map((item) => {

            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="
                  group
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  p-5
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:border-gray-300
                  hover:shadow-sm
                "
              >

                {/* TOP */}

                <div className="flex items-start justify-between">

                  <div
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-lg
                      bg-gray-100
                      text-gray-700
                      transition-colors
                      group-hover:bg-gray-900
                      group-hover:text-white
                    "
                  >
                    <Icon size={20} />
                  </div>


                  <ArrowRight
                    size={18}
                    className="
                      text-gray-400
                      transition-transform
                      duration-200
                      group-hover:translate-x-1
                      group-hover:text-gray-900
                    "
                  />

                </div>


                {/* CONTENT */}

                <div className="mt-5">

                  <h3 className="font-semibold text-gray-900">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-sm leading-5 text-gray-500">
                    {item.description}
                  </p>

                </div>

              </Link>
            );
          })}

        </div>

      </section>


      {/* =====================================================
          ADMINISTRATION
      ===================================================== */}

      <section className="mt-8 rounded-xl border border-gray-200 bg-white p-6">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <h2 className="font-semibold text-gray-900">
              Administration
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {isAdmin
                ? "You have full access to manage all sections of the school website."
                : "You have access to notices, events, gallery and contact messages."
              }
            </p>

          </div>


          {/* ROLE BADGE */}

          <div
            className={`
              w-fit
              rounded-lg
              px-4
              py-2
              text-sm
              font-medium
              ${
                isAdmin
                  ? "bg-gray-100 text-gray-700"
                  : "bg-green-50 text-green-700"
              }
            `}
          >
            {isAdmin
              ? "Administrator"
              : "Operator"
            }
          </div>

        </div>

      </section>

    </div>
  );
}