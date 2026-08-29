"use client";

import { usePathname } from "next/navigation";

import Navbar from "./Layout/Navbar";
import Footer from "./Layout/Footer";

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();

  const isAdmin =
    pathname === "/admin" ||
    pathname.startsWith("/admin/");

  return (
    <>
      {!isAdmin && <Navbar />}

      {children}

      {!isAdmin && <Footer />}
    </>
  );
}