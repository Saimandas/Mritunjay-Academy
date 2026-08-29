"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Trophy,
  Upload,
} from "lucide-react";

export default function AchievementsAdminPage() {
  const [achievements, setAchievements] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [editingId, setEditingId] =
    useState(null);

  const [showForm, setShowForm] =
    useState(false);

  const [name, setName] =
    useState("");

  const [achievement, setAchievement] =
    useState("");

  const [photo, setPhoto] =
    useState(null);

  const [preview, setPreview] =
    useState("");

  const [isPublished, setIsPublished] =
    useState(true);

  /* =====================================================
     LOAD
  ===================================================== */

  async function loadAchievements() {
    try {
      setLoading(true);

      const response =
        await fetch(
          "/api/achievement",
          {
            cache: "no-store",
          }
        );

      const data =
        await response.json();

      if (response.ok) {
        setAchievements(
          data?.data || []
        );
      }
    } catch (error) {
      console.error(
        "Load achievements error:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAchievements();
  }, []);

  /* =====================================================
     RESET FORM
  ===================================================== */

  function resetForm() {
    setEditingId(null);
    setName("");
    setAchievement("");
    setPhoto(null);
    setPreview("");
    setIsPublished(true);
    setShowForm(false);
  }

  /* =====================================================
     EDIT
  ===================================================== */

  function startEdit(item) {
    setEditingId(item._id);
    setName(item.name || "");
    setAchievement(
      item.achievement || ""
    );
    setPreview(item.photo || "");
    setPhoto(null);
    setIsPublished(
      item.isPublished !== false
    );
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  /* =====================================================
     IMAGE
  ===================================================== */

  function handlePhotoChange(
    event
  ) {
    const file =
      event.target.files?.[0];

    if (!file) return;

    setPhoto(file);

    setPreview(
      URL.createObjectURL(file)
    );
  }

  /* =====================================================
     SAVE
  ===================================================== */

  async function handleSubmit(
    event
  ) {
    event.preventDefault();

    if (!name.trim()) {
      alert(
        "Please enter student name."
      );
      return;
    }

    if (!achievement.trim()) {
      alert(
        "Please enter the achievement."
      );
      return;
    }

    if (
      !editingId &&
      !photo
    ) {
      alert(
        "Please select a student photo."
      );
      return;
    }

    try {
      setSaving(true);

      const formData =
        new FormData();

      formData.append(
        "name",
        name.trim()
      );

      formData.append(
        "achievement",
        achievement.trim()
      );

      formData.append(
        "isPublished",
        String(isPublished)
      );

      if (photo) {
        formData.append(
          "photo",
          photo
        );
      }

      const url =
        editingId
          ? `/api/achievement/${editingId}`
          : "/api/achievement";

      const response =
        await fetch(url, {
          method:
            editingId
              ? "PATCH"
              : "POST",
          body: formData,
        });

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Failed to save achievement"
        );
      }

      resetForm();

      await loadAchievements();
    } catch (error) {
      console.error(
        "Save achievement error:",
        error
      );

      alert(
        error.message ||
          "Failed to save achievement"
      );
    } finally {
      setSaving(false);
    }
  }

  /* =====================================================
     DELETE
  ===================================================== */

  async function deleteAchievement(
    id
  ) {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this achievement?"
      );

    if (!confirmed) {
      return;
    }

    try {
      const response =
        await fetch(
          `/api/achievement/${id}`,
          {
            method: "DELETE",
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Delete failed"
        );
      }

      await loadAchievements();
    } catch (error) {
      console.error(
        "Delete achievement error:",
        error
      );

      alert(
        error.message ||
          "Failed to delete achievement"
      );
    }
  }

  return (
    <div className="pb-10">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <p className="mb-1 text-sm font-medium text-gray-500">
            Website Management
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Student Achievements
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage student achievements displayed
            on the school website.
          </p>

        </div>

        <button
          type="button"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
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
            font-semibold
            text-white
            transition
            hover:bg-gray-800
          "
        >
          <Plus size={17} />

          Add Achievement
        </button>

      </div>


      {/* =================================================
          FORM
      ================================================= */}

      {showForm && (
        <section className="mb-8 rounded-xl border border-gray-200 bg-white p-6">

          <div className="mb-6 flex items-center justify-between">

            <div>

              <h2 className="font-semibold text-gray-900">
                {editingId
                  ? "Edit Achievement"
                  : "Add Achievement"}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Add the student name, photograph
                and achievement.
              </p>

            </div>

            <button
              type="button"
              onClick={resetForm}
              className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
            >
              <X size={18} />
            </button>

          </div>


          <form
            onSubmit={handleSubmit}
            className="grid gap-6 md:grid-cols-[220px_1fr]"
          >

            {/* PHOTO */}

            <div>

              <label className="block text-sm font-medium text-gray-700">
                Student Photo
              </label>

              <div className="mt-2">

                {preview ? (
                  <img
                    src={preview}
                    alt="Student preview"
                    className="h-52 w-full rounded-xl object-cover"
                  />
                ) : (
                  <div className="flex h-52 items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 text-gray-400">
                    <div className="text-center">

                      <Upload
                        size={28}
                        className="mx-auto"
                      />

                      <p className="mt-2 text-xs">
                        Choose photo
                      </p>

                    </div>
                  </div>
                )}

              </div>

              <label className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50">

                <Upload size={16} />

                {photo
                  ? "Change Photo"
                  : "Choose Photo"}

                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={
                    handlePhotoChange
                  }
                  className="hidden"
                />

              </label>

              <p className="mt-2 text-xs text-gray-400">
                JPG, PNG or WebP. Maximum 5 MB.
              </p>

            </div>


            {/* DETAILS */}

            <div className="space-y-5">

              {/* NAME */}

              <div>

                <label className="block text-sm font-medium text-gray-700">
                  Student Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(event) =>
                    setName(
                      event.target.value
                    )
                  }
                  placeholder="Enter student name"
                  className="
                    mt-2
                    w-full
                    rounded-lg
                    border
                    border-gray-300
                    px-4
                    py-3
                    text-sm
                    outline-none
                    transition
                    focus:border-gray-900
                    focus:ring-1
                    focus:ring-gray-900
                  "
                />

              </div>


              {/* ACHIEVEMENT */}

              <div>

                <label className="block text-sm font-medium text-gray-700">
                  Achievement
                </label>

                <input
                  type="text"
                  value={achievement}
                  onChange={(event) =>
                    setAchievement(
                      event.target.value
                    )
                  }
                  placeholder="e.g. Won 1st position in State Level Science Exhibition"
                  className="
                    mt-2
                    w-full
                    rounded-lg
                    border
                    border-gray-300
                    px-4
                    py-3
                    text-sm
                    outline-none
                    transition
                    focus:border-gray-900
                    focus:ring-1
                    focus:ring-gray-900
                  "
                />

              </div>


              {/* PUBLISHED */}

              <label className="flex cursor-pointer items-center gap-3">

                <input
                  type="checkbox"
                  checked={isPublished}
                  onChange={(event) =>
                    setIsPublished(
                      event.target.checked
                    )
                  }
                  className="h-4 w-4 rounded border-gray-300"
                />

                <span className="text-sm text-gray-700">
                  Show on public website
                </span>

              </label>


              {/* BUTTONS */}

              <div className="flex gap-3 pt-2">

                <button
                  type="submit"
                  disabled={saving}
                  className="
                    rounded-lg
                    bg-gray-900
                    px-5
                    py-2.5
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:bg-gray-800
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Update Achievement"
                    : "Add Achievement"}
                </button>

                <button
                  type="button"
                  onClick={resetForm}
                  className="
                    rounded-lg
                    border
                    border-gray-300
                    px-5
                    py-2.5
                    text-sm
                    font-medium
                    text-gray-700
                    hover:bg-gray-50
                  "
                >
                  Cancel
                </button>

              </div>

            </div>

          </form>

        </section>
      )}


      {/* =================================================
          ACHIEVEMENTS LIST
      ================================================= */}

      <section>

        {loading ? (
          <div className="rounded-xl border border-gray-200 bg-white p-10 text-center text-sm text-gray-500">
            Loading achievements...
          </div>
        ) : achievements.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">

            <Trophy
              size={36}
              className="mx-auto text-gray-300"
            />

            <h3 className="mt-4 font-semibold text-gray-900">
              No achievements yet
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Add your first student achievement.
            </p>

          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">

            {achievements.map(
              (item) => (
                <div
                  key={item._id}
                  className="
                    flex
                    flex-col
                    gap-4
                    border-b
                    border-gray-100
                    p-5
                    last:border-0
                    sm:flex-row
                    sm:items-center
                  "
                >

                  <img
                    src={item.photo}
                    alt={item.name}
                    className="h-20 w-20 shrink-0 rounded-xl object-cover"
                  />

                  <div className="min-w-0 flex-1">

                    <div className="flex flex-wrap items-center gap-2">

                      <h3 className="font-semibold text-gray-900">
                        {item.name}
                      </h3>

                      <span
                        className={`
                          rounded-full
                          px-2
                          py-0.5
                          text-[10px]
                          font-semibold
                          ${
                            item.isPublished
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-500"
                          }
                        `}
                      >
                        {item.isPublished
                          ? "Published"
                          : "Hidden"}
                      </span>

                    </div>

                    <p className="mt-1 text-sm text-gray-500">
                      {item.achievement}
                    </p>

                  </div>


                  {/* ACTIONS */}

                  <div className="flex shrink-0 gap-2">

                    <button
                      type="button"
                      onClick={() =>
                        startEdit(item)
                      }
                      className="rounded-lg border border-gray-200 p-2 text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        deleteAchievement(
                          item._id
                        )
                      }
                      className="rounded-lg border border-red-200 p-2 text-red-500 hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                    </button>

                  </div>

                </div>
              )
            )}

          </div>
        )}

      </section>

    </div>
  );
}