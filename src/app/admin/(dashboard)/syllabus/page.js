"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  Loader2,
  X,
  FileText,
} from "lucide-react";

export default function SyllabusPage() {
  const [syllabus, setSyllabus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    title: "",
    className: "",
    session: "",
    fileUrl: "",
    isPublished: true,
  });

  // -----------------------------
  // Fetch syllabus
  // -----------------------------

  async function fetchSyllabus() {
    try {
      setLoading(true);

      const response = await fetch("/api/syllabus");
      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to fetch syllabus"
        );
      }

      setSyllabus(result.data || []);
    } catch (error) {
      console.error("FETCH SYLLABUS ERROR:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSyllabus();
  }, []);

  // -----------------------------
  // Form change
  // -----------------------------

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  // -----------------------------
  // Add syllabus
  // -----------------------------

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setSubmitting(true);

      const response = await fetch("/api/syllabus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to create syllabus"
        );
      }

      setSyllabus((previous) => [
        result.data,
        ...previous,
      ]);

      setForm({
        title: "",
        className: "",
        session: "",
        fileUrl: "",
        isPublished: true,
      });

      setShowForm(false);
    } catch (error) {
      console.error("CREATE SYLLABUS ERROR:", error);

      alert(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  // -----------------------------
  // Delete syllabus
  // -----------------------------

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this syllabus?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `/api/syllabus/${id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to delete syllabus"
        );
      }

      setSyllabus((previous) =>
        previous.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.error("DELETE SYLLABUS ERROR:", error);

      alert(error.message);
    }
  }

  return (
    <div className="mx-auto max-w-7xl">

      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <p className="mb-1 text-sm font-medium text-gray-500">
            Website Management
          </p>

          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Syllabus
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage syllabus documents displayed on the
            website.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="
            inline-flex items-center justify-center gap-2
            rounded-lg bg-gray-900 px-4 py-2.5
            text-sm font-medium text-white
            hover:bg-gray-800
          "
        >
          <Plus size={18} />
          Add Syllabus
        </button>

      </div>


      {/* Form */}
      {showForm && (
        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6">

          <div className="mb-6 flex items-center justify-between">

            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Add Syllabus
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Add a syllabus document.
              </p>
            </div>

            <button
              onClick={() => setShowForm(false)}
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
            >
              <X size={20} />
            </button>

          </div>


          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Title */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Title
              </label>

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. HS 1st Year Science Syllabus"
                required
                className="
                  w-full rounded-lg border border-gray-300
                  px-3 py-2.5 text-sm outline-none
                  focus:border-gray-900
                  focus:ring-1 focus:ring-gray-900
                "
              />
            </div>


            {/* Class */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Class
              </label>

              <input
                type="text"
                name="className"
                value={form.className}
                onChange={handleChange}
                placeholder="e.g. Class XI"
                required
                className="
                  w-full rounded-lg border border-gray-300
                  px-3 py-2.5 text-sm outline-none
                  focus:border-gray-900
                  focus:ring-1 focus:ring-gray-900
                "
              />
            </div>


            {/* Session */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Academic Session
              </label>

              <input
                type="text"
                name="session"
                value={form.session}
                onChange={handleChange}
                placeholder="e.g. 2026-27"
                required
                className="
                  w-full rounded-lg border border-gray-300
                  px-3 py-2.5 text-sm outline-none
                  focus:border-gray-900
                  focus:ring-1 focus:ring-gray-900
                "
              />
            </div>


            {/* File URL */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Document URL
              </label>

              <input
                type="url"
                name="fileUrl"
                value={form.fileUrl}
                onChange={handleChange}
                placeholder="https://..."
                required
                className="
                  w-full rounded-lg border border-gray-300
                  px-3 py-2.5 text-sm outline-none
                  focus:border-gray-900
                  focus:ring-1 focus:ring-gray-900
                "
              />

              <p className="mt-2 text-xs text-gray-400">
                We can connect document uploads/storage later.
              </p>
            </div>


            {/* Published */}
            <label className="flex items-center gap-3">

              <input
                type="checkbox"
                name="isPublished"
                checked={form.isPublished}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300"
              />

              <span className="text-sm text-gray-700">
                Publish this syllabus
              </span>

            </label>


            {/* Buttons */}
            <div className="flex gap-3 pt-2">

              <button
                type="submit"
                disabled={submitting}
                className="
                  inline-flex items-center gap-2
                  rounded-lg bg-gray-900
                  px-5 py-2.5
                  text-sm font-medium text-white
                  hover:bg-gray-800
                  disabled:opacity-60
                "
              >
                {submitting && (
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />
                )}

                {submitting
                  ? "Adding..."
                  : "Add Syllabus"}
              </button>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="
                  rounded-lg border border-gray-300
                  px-5 py-2.5
                  text-sm font-medium text-gray-700
                  hover:bg-gray-50
                "
              >
                Cancel
              </button>

            </div>

          </form>

        </div>
      )}


      {/* List */}
      <section>

        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            All Syllabus
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {syllabus.length} document
            {syllabus.length !== 1 ? "s" : ""}
          </p>
        </div>


        {loading ? (

          <div className="
            flex min-h-48 items-center
            justify-center rounded-xl
            border border-gray-200 bg-white
          ">
            <Loader2
              size={28}
              className="animate-spin text-gray-500"
            />
          </div>

        ) : syllabus.length === 0 ? (

          <div className="
            rounded-xl border border-dashed
            border-gray-300 bg-white
            p-12 text-center
          ">

            <div className="
              mx-auto flex h-12 w-12
              items-center justify-center
              rounded-full bg-gray-100
              text-gray-500
            ">
              <FileText size={22} />
            </div>

            <h3 className="mt-4 font-semibold text-gray-900">
              No syllabus added
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Add a syllabus document to get started.
            </p>

          </div>

        ) : (

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">

            <div className="divide-y divide-gray-200">

              {syllabus.map((item) => (

                <div
                  key={item._id}
                  className="
                    flex flex-col gap-4
                    p-5 sm:flex-row
                    sm:items-center
                    sm:justify-between
                  "
                >

                  <div className="flex min-w-0 gap-4">

                    <div className="
                      flex h-11 w-11 shrink-0
                      items-center justify-center
                      rounded-lg bg-gray-100
                      text-gray-600
                    ">
                      <FileText size={20} />
                    </div>

                    <div className="min-w-0">

                      <h3 className="truncate font-medium text-gray-900">
                        {item.title}
                      </h3>

                      <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500">
                        <span>
                          {item.className}
                        </span>

                        <span>
                          {item.session}
                        </span>
                      </div>

                    </div>

                  </div>


                  <div className="flex items-center gap-3">

                    <a
                      href={item.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        rounded-lg border border-gray-200
                        px-3 py-2 text-sm font-medium
                        text-gray-700 hover:bg-gray-50
                      "
                    >
                      View
                    </a>

                    <button
                      onClick={() =>
                        handleDelete(item._id)
                      }
                      className="
                        rounded-lg border border-red-200
                        p-2 text-red-600
                        hover:bg-red-50
                      "
                      title="Delete syllabus"
                    >
                      <Trash2 size={17} />
                    </button>

                  </div>

                </div>

              ))}

            </div>

          </div>

        )}

      </section>

    </div>
  );
}