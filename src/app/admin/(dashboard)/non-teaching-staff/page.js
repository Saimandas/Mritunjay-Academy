"use client";

import { useEffect, useRef, useState } from "react";

import {
  Plus,
  Trash2,
  Eye,
  Loader2,
  X,
  UserRound,
  Image as ImageIcon,
} from "lucide-react";

import { toast } from "sonner";

const API_URL = "/api/staff/non-teaching";

export default function NonTeachingStaffPage() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [photoPreview, setPhotoPreview] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    designation: "",
    department: "",
    qualification: "",
    isPublished: true,
    photo: null,
  });

  // =====================================================
  // FETCH STAFF
  // =====================================================

  async function fetchStaff() {
    try {
      setLoading(true);

      const response = await fetch(API_URL, {
        method: "GET",
        cache: "no-store",
      });

      const text = await response.text();

      let result;

      try {
        result = JSON.parse(text);
      } catch {
        console.error("SERVER RESPONSE:", text);

        throw new Error(
          "Server returned an invalid response."
        );
      }

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to fetch non-teaching staff"
        );
      }

      setStaff(result.data || []);
    } catch (error) {
      console.error(
        "FETCH NON-TEACHING STAFF ERROR:",
        error
      );

      toast.error(
        error.message ||
          "Failed to fetch non-teaching staff"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStaff();
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
  // PHOTO CHANGE
  // =====================================================

  function handlePhotoChange(e) {
    const file =
      e.target.files?.[0] || null;

    if (!file) {
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error(
        "Only JPG, PNG and WEBP images are allowed."
      );

      e.target.value = "";

      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error(
        "Photo must be smaller than 5 MB."
      );

      e.target.value = "";

      return;
    }

    setForm((previous) => ({
      ...previous,
      photo: file,
    }));

    setPhotoPreview(
      URL.createObjectURL(file)
    );
  }

  // =====================================================
  // REMOVE PHOTO
  // =====================================================

  function removePhoto() {
    setForm((previous) => ({
      ...previous,
      photo: null,
    }));

    setPhotoPreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  // =====================================================
  // RESET FORM
  // =====================================================

  function resetForm() {
    setForm({
      name: "",
      designation: "",
      department: "",
      qualification: "",
      isPublished: true,
      photo: null,
    });

    setPhotoPreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  // =====================================================
  // CLOSE FORM
  // =====================================================

  function closeForm() {
    if (submitting) {
      return;
    }

    resetForm();
    setShowForm(false);
  }

  // =====================================================
  // CREATE STAFF
  // =====================================================

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.name.trim()) {
      toast.error(
        "Please enter the staff member's name."
      );

      return;
    }

    if (!form.designation.trim()) {
      toast.error(
        "Please enter the designation."
      );

      return;
    }

    try {
      setSubmitting(true);

      const formData = new FormData();

      formData.append(
        "name",
        form.name.trim()
      );

      formData.append(
        "designation",
        form.designation.trim()
      );

      formData.append(
        "department",
        form.department.trim()
      );

      formData.append(
        "qualification",
        form.qualification.trim()
      );

      formData.append(
        "isPublished",
        String(form.isPublished)
      );

      if (form.photo) {
        formData.append(
          "photo",
          form.photo
        );
      }

      const response = await fetch(
        API_URL,
        {
          method: "POST",
          body: formData,
        }
      );

      const text =
        await response.text();

      let result;

      try {
        result = JSON.parse(text);
      } catch {
        console.error(
          "CREATE SERVER RESPONSE:",
          text
        );

        throw new Error(
          "Server returned an invalid response."
        );
      }

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to create staff"
        );
      }

      setStaff((previous) => [
        result.data,
        ...previous,
      ]);

      resetForm();
      setShowForm(false);

      toast.success(
        "Staff member added successfully."
      );
    } catch (error) {
      console.error(
        "CREATE NON-TEACHING STAFF ERROR:",
        error
      );

      toast.error(
        error.message ||
          "Failed to create staff."
      );
    } finally {
      setSubmitting(false);
    }
  }

  // =====================================================
  // DELETE STAFF
  // =====================================================

  async function handleDelete(id) {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this staff member?"
      );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "DELETE",
        }
      );

      const text =
        await response.text();

      let result;

      try {
        result = JSON.parse(text);
      } catch {
        console.error(
          "DELETE SERVER RESPONSE:",
          text
        );

        throw new Error(
          "Server returned an invalid response."
        );
      }

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to delete staff"
        );
      }

      setStaff((previous) =>
        previous.filter(
          (item) => item._id !== id
        )
      );

      if (
        selectedStaff?._id === id
      ) {
        setSelectedStaff(null);
      }

      toast.success(
        "Staff member deleted successfully."
      );
    } catch (error) {
      console.error(
        "DELETE NON-TEACHING STAFF ERROR:",
        error
      );

      toast.error(
        error.message ||
          "Failed to delete staff."
      );
    }
  }

  // =====================================================
  // PREVIEW
  // =====================================================

  function handlePreview(member) {
    setSelectedStaff(member);
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
            Non-Teaching Staff
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage non-teaching staff displayed
            on the school website.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            setShowForm(true)
          }
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
          Add Staff
        </button>

      </div>


      {/* =================================================
          ADD FORM
      ================================================= */}

      {showForm && (
        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6">

          {/* FORM HEADER */}

          <div className="mb-6 flex items-center justify-between">

            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Add Non-Teaching Staff
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Enter the staff member's information.
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
                hover:bg-gray-100
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

            {/* PHOTO */}

            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Staff Photo
              </label>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

                {/* PHOTO PREVIEW */}

                <div
                  className="
                    flex
                    h-28
                    w-28
                    shrink-0
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-100
                  "
                >
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Staff preview"
                      className="
                        h-full
                        w-full
                        object-cover
                        object-[center_10%]
                      "
                    />
                  ) : (
                    <UserRound
                      size={38}
                      className="text-gray-400"
                    />
                  )}
                </div>


                {/* UPLOAD */}

                <div className="flex-1">

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={
                      handlePhotoChange
                    }
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

                  <p className="mt-2 text-xs text-gray-500">
                    JPG, PNG or WEBP.
                    Maximum 5 MB.
                  </p>

                  {form.photo && (
                    <div className="mt-2 flex items-center gap-2">

                      <ImageIcon
                        size={15}
                        className="text-gray-400"
                      />

                      <span className="max-w-xs truncate text-xs text-gray-500">
                        {form.photo.name}
                      </span>

                      <button
                        type="button"
                        onClick={
                          removePhoto
                        }
                        className="
                          text-xs
                          font-medium
                          text-red-600
                          hover:underline
                        "
                      >
                        Remove
                      </button>

                    </div>
                  )}

                </div>

              </div>

            </div>


            {/* NAME */}

            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter staff name"
                required
                className="
                  w-full
                  rounded-lg
                  border
                  border-gray-300
                  px-3
                  py-2.5
                  text-sm
                  outline-none
                  focus:border-gray-900
                  focus:ring-1
                  focus:ring-gray-900
                "
              />

            </div>


            {/* DESIGNATION */}

            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Designation
              </label>

              <input
                type="text"
                name="designation"
                value={form.designation}
                onChange={handleChange}
                placeholder="e.g. Office Assistant"
                required
                className="
                  w-full
                  rounded-lg
                  border
                  border-gray-300
                  px-3
                  py-2.5
                  text-sm
                  outline-none
                  focus:border-gray-900
                  focus:ring-1
                  focus:ring-gray-900
                "
              />

            </div>


            {/* DEPARTMENT */}

            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Department
              </label>

              <input
                type="text"
                name="department"
                value={form.department}
                onChange={handleChange}
                placeholder="e.g. Administration"
                className="
                  w-full
                  rounded-lg
                  border
                  border-gray-300
                  px-3
                  py-2.5
                  text-sm
                  outline-none
                  focus:border-gray-900
                  focus:ring-1
                  focus:ring-gray-900
                "
              />

            </div>


            {/* QUALIFICATION */}

            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Qualification
              </label>

              <input
                type="text"
                name="qualification"
                value={form.qualification}
                onChange={handleChange}
                placeholder="Enter qualification"
                className="
                  w-full
                  rounded-lg
                  border
                  border-gray-300
                  px-3
                  py-2.5
                  text-sm
                  outline-none
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
                name="isPublished"
                checked={form.isPublished}
                onChange={handleChange}
                className="
                  h-4
                  w-4
                  rounded
                  border-gray-300
                "
              />

              <span className="text-sm text-gray-700">
                Publish this staff member
              </span>

            </label>


            {/* FORM ACTIONS */}

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
                  ? "Adding..."
                  : "Add Staff"}

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
                  hover:bg-gray-50
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
          STAFF LIST
      ================================================= */}

      <section>

        <div className="mb-4">

          <h2 className="text-lg font-semibold text-gray-900">
            All Non-Teaching Staff
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {staff.length} staff member
            {staff.length !== 1 ? "s" : ""} found.
          </p>

        </div>


        {/* LOADING */}

        {loading ? (

          <div
            className="
              flex
              min-h-48
              items-center
              justify-center
              rounded-xl
              border
              border-gray-200
              bg-white
            "
          >
            <Loader2
              size={28}
              className="animate-spin text-gray-500"
            />
          </div>

        ) : staff.length === 0 ? (

          /* EMPTY */

          <div
            className="
              rounded-xl
              border
              border-dashed
              border-gray-300
              bg-white
              p-12
              text-center
            "
          >

            <div
              className="
                mx-auto
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                bg-gray-100
                text-gray-500
              "
            >
              <UserRound size={22} />
            </div>

            <h3 className="mt-4 font-semibold text-gray-900">
              No non-teaching staff yet
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Add your first staff member
              to display them on the website.
            </p>

          </div>

        ) : (

          /* STAFF CARDS */

          <div className="grid gap-4 md:grid-cols-2">

            {staff.map((member) => (

              <div
                key={member._id}
                className="
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  p-5
                "
              >

                <div
                  className="
                    flex
                    items-start
                    justify-between
                    gap-4
                  "
                >

                  {/* STAFF INFO */}

                  <div
                    className="
                      flex
                      min-w-0
                      gap-4
                    "
                  >

                    {/* PHOTO */}

                    <div
                      className="
                        flex
                        h-20
                        w-20
                        shrink-0
                        items-center
                        justify-center
                        overflow-hidden
                        rounded-xl
                        bg-gray-100
                      "
                    >
                      {member.photo ? (

                        <img
                          src={member.photo}
                          alt={member.name}
                          className="
                            h-full
                            w-full
                            object-cover
                            object-[center_10%]
                          "
                        />

                      ) : (

                        <UserRound
                          size={26}
                          className="text-gray-400"
                        />

                      )}
                    </div>


                    {/* DETAILS */}

                    <div className="min-w-0">

                      <div
                        className="
                          flex
                          flex-wrap
                          items-center
                          gap-2
                        "
                      >

                        <h3 className="font-semibold text-gray-900">
                          {member.name}
                        </h3>

                        <span
                          className={`
                            rounded-full
                            px-2.5
                            py-1
                            text-xs
                            font-medium
                            ${
                              member.isPublished
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-600"
                            }
                          `}
                        >
                          {member.isPublished
                            ? "Published"
                            : "Hidden"}
                        </span>

                      </div>

                      <p className="mt-1 text-sm text-gray-600">
                        {member.designation}
                      </p>

                      {member.department && (
                        <p className="mt-1 text-xs text-gray-500">
                          {member.department}
                        </p>
                      )}

                      {member.qualification && (
                        <p className="mt-2 text-xs text-gray-400">
                          {member.qualification}
                        </p>
                      )}

                    </div>

                  </div>


                  {/* ACTIONS */}

                  <div
                    className="
                      flex
                      shrink-0
                      gap-2
                    "
                  >

                    {/* PREVIEW */}

                    <button
                      type="button"
                      onClick={() =>
                        handlePreview(member)
                      }
                      title="Preview staff"
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
                      <Eye size={17} />
                    </button>


                    {/* DELETE */}

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(
                          member._id
                        )
                      }
                      title="Delete staff"
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


      {/* =================================================
          PREVIEW MODAL
      ================================================= */}

      {selectedStaff && (

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
          "
          onClick={() =>
            setSelectedStaff(null)
          }
        >

          <div
            className="
              relative
              w-full
              max-w-md
              overflow-hidden
              rounded-2xl
              bg-white
              shadow-xl
            "
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* CLOSE */}

            <button
              type="button"
              onClick={() =>
                setSelectedStaff(null)
              }
              className="
                absolute
                right-3
                top-3
                z-10
                rounded-full
                bg-white/90
                p-2
                text-gray-600
                shadow
                hover:bg-white
              "
            >
              <X size={18} />
            </button>


            {/* PHOTO */}

            <div
              className="
                flex
                h-72
                w-full
                items-center
                justify-center
                overflow-hidden
                bg-gray-100
              "
            >

              {selectedStaff.photo ? (

                <img
                  src={selectedStaff.photo}
                  alt={selectedStaff.name}
                  className="
                    h-full
                    w-full
                    object-cover
                    object-[center_10%]
                  "
                />

              ) : (

                <UserRound
                  size={70}
                  className="text-gray-300"
                />

              )}

            </div>


            {/* DETAILS */}

            <div className="p-6">

              <div
                className="
                  flex
                  items-start
                  justify-between
                  gap-4
                "
              >

                <div>

                  <h2 className="text-xl font-bold text-gray-900">
                    {selectedStaff.name}
                  </h2>

                  <p className="mt-1 text-sm font-medium text-gray-600">
                    {selectedStaff.designation}
                  </p>

                </div>

                <span
                  className={`
                    shrink-0
                    rounded-full
                    px-2.5
                    py-1
                    text-xs
                    font-medium
                    ${
                      selectedStaff.isPublished
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }
                  `}
                >
                  {selectedStaff.isPublished
                    ? "Published"
                    : "Hidden"}
                </span>

              </div>


              {selectedStaff.department && (

                <div className="mt-5">

                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Department
                  </p>

                  <p className="mt-1 text-sm text-gray-700">
                    {selectedStaff.department}
                  </p>

                </div>

              )}


              {selectedStaff.qualification && (

                <div className="mt-4">

                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Qualification
                  </p>

                  <p className="mt-1 text-sm text-gray-700">
                    {selectedStaff.qualification}
                  </p>

                </div>

              )}

            </div>

          </div>

        </div>

      )}

    </div>
  );
}