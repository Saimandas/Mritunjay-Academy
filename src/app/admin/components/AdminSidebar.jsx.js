"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Bell,
  GraduationCap,
  Users,
  UserRound,
  Images,
  CalendarDays,
  MessageSquare,
  LogOut,
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  /* =====================================================
     LOAD LOGGED-IN USER
  ===================================================== */

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

        setUser(
          data?.user ||
            data?.data ||
            data ||
            null
        );
      } catch (error) {
        console.error("Failed to load user:", error);
        router.push("/admin/login");
      } finally {
        setLoadingUser(false);
      }
    }

    loadUser();
  }, [router]);

  /* =====================================================
     LOGOUT
  ===================================================== */

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  /* =====================================================
     WAIT FOR USER
  ===================================================== */

  if (loadingUser) {
    return (
      <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-6 py-5">
          <h1 className="text-lg font-bold text-gray-900">
            School Panel
          </h1>

          <p className="mt-1 text-xs text-gray-500">
            Admin Panel
          </p>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900" />
        </div>
      </aside>
    );
  }

  /* =====================================================
     ROLE
  ===================================================== */

  const role = String(
    user?.role || ""
  ).toLowerCase();

  const isAdmin = role === "admin";
  const isOperator = role === "operator";

  /* =====================================================
     IF ROLE IS INVALID
  ===================================================== */

  if (!isAdmin && !isOperator) {
    return (
      <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-gray-200 bg-white">

        <div className="border-b border-gray-200 px-6 py-5">
          <h1 className="text-lg font-bold text-gray-900">
            School Panel
          </h1>

          <p className="mt-1 text-xs text-red-500">
            Unauthorized
          </p>
        </div>

        <div className="flex flex-1 items-center justify-center px-6 text-center">
          <div>
            <p className="text-sm font-medium text-gray-700">
              Unauthorized account
            </p>

            <button
              onClick={handleLogout}
              className="mt-4 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white"
            >
              Logout
            </button>
          </div>
        </div>

      </aside>
    );
  }

  return (
    <aside
      className="
        fixed
        left-0
        top-0
        z-50
        flex
        h-screen
        w-64
        flex-col
        border-r
        border-gray-200
        bg-white
      "
    >

      {/* =================================================
          LOGO
      ================================================= */}

      <div className="border-b border-gray-200 px-6 py-5">

        <h1 className="text-lg font-bold text-gray-900">
       School Panel
        </h1>

        <div className="mt-1 flex items-center gap-2">

          <p className="text-xs text-gray-500">
            Admin Panel
          </p>

          {/* ROLE BADGE */}

          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
              isAdmin
                ? "bg-gray-900 text-white"
                : "bg-green-100 text-green-700"
            }`}
          >
            {role}
          </span>

        </div>

      </div>

      {/* =================================================
          NAVIGATION
      ================================================= */}

      <nav className="flex-1 space-y-1 overflow-y-auto p-4">

        {/* =================================================
            ADMIN ONLY
        ================================================= */}

        {isAdmin && (
          <>
            <SidebarLink
              href="/admin"
              label="Dashboard"
              icon={<LayoutDashboard size={18} />}
              active={pathname === "/admin"}
            />

            <SidebarLink
              href="/admin/teaching-staff"
              label="Teaching Staff"
              icon={<GraduationCap size={18} />}
              active={pathname.startsWith(
                "/admin/teaching-staff"
              )}
            />

            <SidebarLink
              href="/admin/non-teaching-staff"
              label="Non-Teaching Staff"
              icon={<Users size={18} />}
              active={pathname.startsWith(
                "/admin/non-teaching-staff"
              )}
            />

            <SidebarLink
              href="/admin/principal"
              label="Principal"
              icon={<UserRound size={18} />}
              active={pathname.startsWith(
                "/admin/principal"
              )}
            />
          </>
        )}

        {/* =================================================
            ADMIN + OPERATOR
        ================================================= */}
        <SidebarLink
              href="/admin"
              label="Dashboard"
              icon={<LayoutDashboard size={18} />}
              active={pathname === "/admin"}
            />
        <SidebarLink
          href="/admin/notices"
          label="Notices"
          icon={<Bell size={18} />}
          active={pathname.startsWith(
            "/admin/notices"
          )}
        />

        <SidebarLink
          href="/admin/events"
          label="Events"
          icon={<CalendarDays size={18} />}
          active={pathname.startsWith(
            "/admin/events"
          )}
        />

        <SidebarLink
          href="/admin/gallery"
          label="Gallery"
          icon={<Images size={18} />}
          active={pathname.startsWith(
            "/admin/gallery"
          )}
        />
        <SidebarLink
          href="/admin/achievement"
          label="Achievements"
          icon={<Images size={18} />}
          active={pathname.startsWith(
            "admin/achievement"
          )}
        />

        <SidebarLink
          href="/admin/contact-messages"
          label="Contact Messages"
          icon={<MessageSquare size={18} />}
          active={pathname.startsWith(
            "/admin/contact-messages"
          )}
        />

      </nav>

      {/* =================================================
          USER INFO
      ================================================= */}

      <div className="border-t border-gray-200 px-4 py-3">

        <div className="mb-3 rounded-lg bg-gray-50 px-3 py-2">

          <p className="truncate text-xs font-medium text-gray-900">
            {user?.name ||
              user?.email ||
              "User"}
          </p>

          {user?.email && user?.name && (
            <p className="mt-0.5 truncate text-[11px] text-gray-500">
              {user.email}
            </p>
          )}

        </div>

        {/* =================================================
            LOGOUT
        ================================================= */}

        <button
          onClick={handleLogout}
          className="
            flex
            w-full
            items-center
            gap-3
            rounded-lg
            px-3
            py-3
            text-sm
            font-medium
            text-gray-600
            transition
            hover:bg-red-50
            hover:text-red-600
          "
        >
          <LogOut size={18} />

          <span>
            Logout
          </span>
        </button>

      </div>

    </aside>
  );
}

/* =========================================================
   SIDEBAR LINK
========================================================= */

function SidebarLink({
  href,
  label,
  icon,
  active,
}) {
  return (
    <Link
      href={href}
      className={`
        flex
        items-center
        gap-3
        rounded-lg
        px-3
        py-3
        text-sm
        font-medium
        transition
        ${
          active
            ? "bg-gray-900 text-white"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        }
      `}
    >
      {icon}

      <span>
        {label}
      </span>
    </Link>
  );
}