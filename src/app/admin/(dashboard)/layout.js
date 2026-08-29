import { redirect } from "next/navigation";

import AdminSidebar from "../components/AdminSidebar.jsx.js";
import { getAuthenticatedUser } from "@/lib/auth";

export default async function DashboardLayout({ children }) {
  const user = await getAuthenticatedUser();

  // Protect ALL dashboard pages
  if (!user || user.role !== "admin"&&user.role!=="operator") {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* SIDEBAR */}
      <AdminSidebar />

      {/* MAIN AREA */}
      <main className="ml-64 min-h-screen">

        {/* TOP BAR */}
        <header className="border-b border-gray-200 bg-white px-8 py-4">

          <p className="text-sm font-medium text-gray-900">
            Administration
          </p>

          <p className="text-xs text-gray-500">
            {user.name}
          </p>

        </header>

        {/* PAGE CONTENT */}
        <div className="p-8">
          {children}
        </div>

      </main>

    </div>
  );
}