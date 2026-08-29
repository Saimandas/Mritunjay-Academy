"use client";

import { useEffect, useState } from "react";

import {
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Loader2,
  X,
  Bell,
  FileText,
  Download,
} from "lucide-react";

import { toast } from "sonner";

const categories = [
  "General",
  "Academic",
  "Examination",
  "Admission",
  "Event",
  "Important",
];

export default function AdminNoticesPage() {
  const [notices, setNotices] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "General",
    isPublished: true,
    file: null,
  });

  // =====================================================
  // FETCH NOTICES
  // =====================================================

  async function fetchNotices() {
    try {
      setLoading(true);

      const response = await fetch("/api/notices");

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to fetch notices"
        );
      }

      setNotices(result.data || []);
    } catch (error) {
      console.error("FETCH NOTICES ERROR:", error);

      toast.error(
        error.message || "Failed to fetch notices"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNotices();
  }, []);

  // =====================================================
  // FORM CHANGE
  // =====================================================

  function handleChange(e) {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setForm((previous) => ({
      ...previous,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  }

  // =====================================================
  // FILE CHANGE
  // =====================================================

  function handleFileChange(e) {
    const file = e.target.files?.[0] || null;

    if (!file) {
      setForm((previous) => ({
        ...previous,
        file: null,
      }));

      return;
    }

    // PDF ONLY

    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed.");

      e.target.value = "";

      setForm((previous) => ({
        ...previous,
        file: null,
      }));

      return;
    }

    // 10 MB LIMIT

    if (file.size > 10 * 1024 * 1024) {
      toast.error(
        "PDF must be smaller than 10 MB."
      );

      e.target.value = "";

      setForm((previous) => ({
        ...previous,
        file: null,
      }));

      return;
    }

    setForm((previous) => ({
      ...previous,
      file,
    }));
  }

  // =====================================================
  // CREATE NOTICE
  // =====================================================

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.title.trim()) {
      toast.error("Please enter a notice title.");
      return;
    }

    if (!form.description.trim()) {
      toast.error(
        "Please enter the notice description."
      );
      return;
    }

    try {
      setSubmitting(true);

      const formData = new FormData();

      formData.append(
        "title",
        form.title.trim()
      );

      formData.append(
        "description",
        form.description.trim()
      );

      formData.append(
        "category",
        form.category
      );

      formData.append(
        "isPublished",
        String(form.isPublished)
      );

      if (form.file) {
        formData.append(
          "file",
          form.file
        );
      }

      const response = await fetch(
        "/api/notices",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to create notice"
        );
      }

      setNotices((previous) => [
        result.data,
        ...previous,
      ]);

      setForm({
        title: "",
        description: "",
        category: "General",
        isPublished: true,
        file: null,
      });

      setShowForm(false);

      toast.success(
        "Notice created successfully."
      );
    } catch (error) {
      console.error(
        "CREATE NOTICE ERROR:",
        error
      );

      toast.error(
        error.message ||
          "Failed to create notice."
      );
    } finally {
      setSubmitting(false);
    }
  }

  // =====================================================
  // DELETE NOTICE
  // =====================================================

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this notice?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `/api/notices/${id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to delete notice"
        );
      }

      setNotices((previous) =>
        previous.filter(
          (notice) =>
            notice._id !== id
        )
      );

      toast.success(
        "Notice deleted successfully."
      );
    } catch (error) {
      console.error(
        "DELETE NOTICE ERROR:",
        error
      );

      toast.error(
        error.message ||
          "Failed to delete notice."
      );
    }
  }

  // =====================================================
  // TOGGLE PUBLISHED
  // =====================================================

  async function togglePublished(notice) {
    try {
      const response = await fetch(
        `/api/notices/${notice._id}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            isPublished:
              !notice.isPublished,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to update notice"
        );
      }

      setNotices((previous) =>
        previous.map((item) =>
          item._id === notice._id
            ? result.data
            : item
        )
      );

      toast.success(
        notice.isPublished
          ? "Notice hidden."
          : "Notice published."
      );
    } catch (error) {
      console.error(
        "UPDATE NOTICE ERROR:",
        error
      );

      toast.error(
        error.message ||
          "Failed to update notice."
      );
    }
  }

  // =====================================================
  // RESET FORM
  // =====================================================

  function closeForm() {
    if (submitting) {
      return;
    }

    setShowForm(false);

    setForm({
      title: "",
      description: "",
      category: "General",
      isPublished: true,
      file: null,
    });
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="mx-auto max-w-7xl">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <p className="mb-1 text-sm font-medium text-gray-500">
            Website Management
          </p>

          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Notice Board
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
            Create and manage announcements displayed
            on the school website.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="
            inline-flex
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
          "
        >
          <Plus size={18} />

          Add Notice
        </button>
      </div>


      {/* =================================================
          CREATE NOTICE FORM
      ================================================= */}

      {showForm && (
        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6">

          {/* FORM HEADER */}

          <div className="mb-6 flex items-center justify-between">

            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Create Notice
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Add a new announcement to the notice board.
              </p>
            </div>

            <button
              type="button"
              onClick={closeForm}
              disabled={submitting}
              className="
                rounded-lg
                p-2
                text-gray-500
                transition
                hover:bg-gray-100
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <X size={20} />
            </button>
          </div>


          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* TITLE */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Notice Title
              </label>

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter notice title"
                required
                className="
                  w-full
                  rounded-lg
                  border
                  border-gray-300
                  bg-white
                  px-3
                  py-2.5
                  text-sm
                  text-gray-900
                  outline-none
                  transition
                  placeholder:text-gray-400
                  focus:border-gray-900
                  focus:ring-1
                  focus:ring-gray-900
                "
              />
            </div>


            {/* CATEGORY */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Category
              </label>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="
                  w-full
                  rounded-lg
                  border
                  border-gray-300
                  bg-white
                  px-3
                  py-2.5
                  text-sm
                  text-gray-900
                  outline-none
                  transition
                  focus:border-gray-900
                  focus:ring-1
                  focus:ring-gray-900
                "
              >
                {categories.map(
                  (category) => (
                    <option
                      key={category}
                      value={category}
                    >
                      {category}
                    </option>
                  )
                )}
              </select>
            </div>


            {/* DESCRIPTION */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Description
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter notice details"
                rows={5}
                required
                className="
                  w-full
                  resize-none
                  rounded-lg
                  border
                  border-gray-300
                  bg-white
                  px-3
                  py-2.5
                  text-sm
                  text-gray-900
                  outline-none
                  transition
                  placeholder:text-gray-400
                  focus:border-gray-900
                  focus:ring-1
                  focus:ring-gray-900
                "
              />
            </div>


            {/* PDF UPLOAD */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Notice Attachment
              </label>

              <input
                type="file"
                accept="application/pdf,.pdf"
                onChange={handleFileChange}
                className="
                  block
                  w-full
                  cursor-pointer
                  rounded-lg
                  border
                  border-gray-300
                  bg-white
                  text-sm
                  text-gray-600
                  file:mr-4
                  file:cursor-pointer
                  file:border-0
                  file:bg-gray-100
                  file:px-4
                  file:py-2.5
                  file:text-sm
                  file:font-medium
                  file:text-gray-700
                  hover:file:bg-gray-200
                "
              />

              <p className="mt-1.5 text-xs text-gray-500">
                PDF only. Maximum file size: 10 MB.
              </p>


              {form.file && (
                <div className="mt-3 flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2.5">

                  <FileText
                    size={17}
                    className="shrink-0 text-gray-500"
                  />

                  <span className="min-w-0 truncate text-sm text-gray-700">
                    {form.file.name}
                  </span>

                  <span className="ml-auto shrink-0 text-xs text-gray-400">
                    {(
                      form.file.size /
                      (1024 * 1024)
                    ).toFixed(2)}{" "}
                    MB
                  </span>

                </div>
              )}
            </div>


            {/* PUBLISH */}

            <label className="flex cursor-pointer items-center gap-3">

              <input
                type="checkbox"
                name="isPublished"
                checked={form.isPublished}
                onChange={handleChange}
                className="
                  h-4
                  w-4
                  rounded
                  border-gray-300
                  text-gray-900
                  focus:ring-gray-900
                "
              />

              <span className="text-sm text-gray-700">
                Publish this notice immediately
              </span>

            </label>


            {/* FORM BUTTONS */}

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">

              <button
                type="submit"
                disabled={submitting}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  bg-gray-900
                  px-5
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

                {submitting && (
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />
                )}

                {submitting
                  ? "Creating..."
                  : "Create Notice"}

              </button>


              <button
                type="button"
                onClick={closeForm}
                disabled={submitting}
                className="
                  rounded-lg
                  border
                  border-gray-300
                  px-5
                  py-2.5
                  text-sm
                  font-medium
                  text-gray-700
                  transition
                  hover:bg-gray-50
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                Cancel
              </button>

            </div>

          </form>

        </div>
      )}


      {/* =================================================
          NOTICE LIST
      ================================================= */}

      <section>

        <div className="mb-4">

          <h2 className="text-lg font-semibold text-gray-900">
            All Notices
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {notices.length} notice
            {notices.length !== 1
              ? "s"
              : ""}{" "}
            found.
          </p>

        </div>


        {/* LOADING */}

        {loading ? (

          <div className="
            flex
            min-h-48
            items-center
            justify-center
            rounded-xl
            border
            border-gray-200
            bg-white
          ">

            <Loader2
              size={28}
              className="animate-spin text-gray-500"
            />

          </div>

        ) : notices.length === 0 ? (

          /* EMPTY STATE */

          <div className="
            rounded-xl
            border
            border-dashed
            border-gray-300
            bg-white
            p-12
            text-center
          ">

            <div className="
              mx-auto
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              bg-gray-100
              text-gray-500
            ">
              <Bell size={22} />
            </div>

            <h3 className="mt-4 font-semibold text-gray-900">
              No notices yet
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Create your first notice to display it
              on the school website.
            </p>

            <button
              type="button"
              onClick={() =>
                setShowForm(true)
              }
              className="
                mt-5
                inline-flex
                items-center
                gap-2
                rounded-lg
                bg-gray-900
                px-4
                py-2.5
                text-sm
                font-medium
                text-white
                hover:bg-gray-800
              "
            >
              <Plus size={17} />

              Create Notice
            </button>

          </div>

        ) : (

          /* NOTICE LIST */

          <div className="space-y-3">

            {notices.map((notice) => (

              <div
                key={notice._id}
                className="
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  p-5
                "
              >

                <div className="
                  flex
                  flex-col
                  gap-4
                  sm:flex-row
                  sm:items-start
                  sm:justify-between
                ">

                  {/* CONTENT */}

                  <div className="min-w-0">

                    {/* TITLE / CATEGORY / STATUS */}

                    <div className="
                      flex
                      flex-wrap
                      items-center
                      gap-2
                    ">

                      <h3 className="font-semibold text-gray-900">
                        {notice.title}
                      </h3>


                      {notice.category && (
                        <span className="
                          rounded-full
                          bg-blue-100
                          px-2.5
                          py-1
                          text-xs
                          font-medium
                          text-blue-700
                        ">
                          {notice.category}
                        </span>
                      )}


                      <span
                        className={`
                          rounded-full
                          px-2.5
                          py-1
                          text-xs
                          font-medium
                          ${
                            notice.isPublished
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-600"
                          }
                        `}
                      >
                        {notice.isPublished
                          ? "Published"
                          : "Hidden"}
                      </span>

                    </div>


                    {/* DESCRIPTION */}

                    <p className="
                      mt-2
                      text-sm
                      leading-6
                      text-gray-600
                    ">
                      {notice.description}
                    </p>


                    {/* DATE */}

                    {(notice.createdAt ||
                      notice.date) && (

                      <p className="mt-3 text-xs text-gray-400">

                        Created{" "}

                        {new Date(
                          notice.createdAt ||
                            notice.date
                        ).toLocaleDateString()}

                      </p>
                    )}


                    {/* =================================================
                        PDF BUTTONS
                    ================================================= */}

                    {notice.fileUrl && (

                      <div className="
                        mt-4
                        flex
                        flex-wrap
                        items-center
                        gap-2
                      ">

                        {/* VIEW PDF */}

                        <a
                          href={notice.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-lg
                            border
                            border-gray-200
                            bg-white
                            px-3
                            py-2
                            text-sm
                            font-medium
                            text-gray-700
                            transition
                            hover:bg-gray-50
                          "
                        >

                          <Eye size={16} />

                          View PDF

                        </a>


                        {/* DOWNLOAD PDF */}

                        <a
                          href={notice.fileUrl.replace(
                            "/upload/",
                            "/upload/fl_attachment/"
                          )}
                          className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-lg
                            bg-gray-900
                            px-3
                            py-2
                            text-sm
                            font-medium
                            text-white
                            transition
                            hover:bg-gray-800
                          "
                        >

                          <Download size={16} />

                          Download PDF

                        </a>

                      </div>
                    )}

                  </div>


                  {/* ACTIONS */}

                  <div className="
                    flex
                    shrink-0
                    items-center
                    gap-2
                  ">

                    {/* PUBLISH / HIDE */}

                    <button
                      type="button"
                      onClick={() =>
                        togglePublished(
                          notice
                        )
                      }
                      title={
                        notice.isPublished
                          ? "Hide notice"
                          : "Publish notice"
                      }
                      className="
                        rounded-lg
                        border
                        border-gray-200
                        p-2
                        text-gray-600
                        transition
                        hover:bg-gray-100
                      "
                    >

                      {notice.isPublished ? (
                        <EyeOff size={17} />
                      ) : (
                        <Eye size={17} />
                      )}

                    </button>


                    {/* DELETE */}

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(
                          notice._id
                        )
                      }
                      title="Delete notice"
                      className="
                        rounded-lg
                        border
                        border-red-200
                        p-2
                        text-red-600
                        transition
                        hover:bg-red-50
                      "
                    >

                      <Trash2 size={17} />

                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>

    </div>
  );
}