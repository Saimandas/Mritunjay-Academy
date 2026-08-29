"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole, Mail, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Invalid email or password");
        return;
      }

      router.push("/admin");
      router.refresh();

    } catch (error) {
      console.error("LOGIN ERROR:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-5">

      <div className="w-full max-w-md">

        {/* HEADER */}

        <div className="mb-8 text-center">

          <div className="
            mx-auto
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-xl
            bg-gray-900
            text-white
          ">
            <LockKeyhole size={24} />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-gray-900">
            Admin Login
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Sign in to manage the Jatiya Vidyalaya website.
          </p>

        </div>


        {/* LOGIN CARD */}

        <div className="
          rounded-xl
          border
          border-gray-200
          bg-white
          p-6
          shadow-sm
          sm:p-8
        ">

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* EMAIL */}

            <div>

              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Email
              </label>

              <div className="relative">

                <Mail
                  size={18}
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="admin@example.com"
                  autoComplete="email"
                  required
                  className="
                    w-full
                    rounded-lg
                    border
                    border-gray-200
                    bg-white
                    py-2.5
                    pl-10
                    pr-3
                    text-sm
                    text-gray-900
                    outline-none
                    transition
                    placeholder:text-gray-400
                    focus:border-gray-400
                    focus:ring-2
                    focus:ring-gray-100
                  "
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div>

              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <div className="relative">

                <LockKeyhole
                  size={18}
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />

                <input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="
                    w-full
                    rounded-lg
                    border
                    border-gray-200
                    bg-white
                    py-2.5
                    pl-10
                    pr-3
                    text-sm
                    text-gray-900
                    outline-none
                    transition
                    placeholder:text-gray-400
                    focus:border-gray-400
                    focus:ring-2
                    focus:ring-gray-100
                  "
                />

              </div>

            </div>


            {/* ERROR */}

            {error && (
              <div className="
                rounded-lg
                border
                border-red-200
                bg-red-50
                px-3
                py-2.5
                text-sm
                text-red-600
              ">
                {error}
              </div>
            )}


            {/* SUBMIT */}

            <button
              type="submit"
              disabled={loading}
              className="
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-lg
                bg-gray-900
                px-4
                py-2.5
                text-sm
                font-medium
                text-white
                transition
                hover:bg-gray-800
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >

              {loading ? (
                <>
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}

            </button>

          </form>

        </div>


        {/* FOOTER */}

        <p className="mt-6 text-center text-xs text-gray-400">
          Jatiya Vidyalaya · Administration
        </p>

      </div>

    </main>
  );
}