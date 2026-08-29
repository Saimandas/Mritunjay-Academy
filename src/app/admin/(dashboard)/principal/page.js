"use client";

import { useEffect, useRef, useState } from "react";

import {
  Loader2,
  Save,
  UserRound,
  Upload,
  X,
  Eye,
  Pencil,
} from "lucide-react";

import { toast } from "sonner";

export default function PrincipalPage() {
  const [principal, setPrincipal] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const [imagePreview, setImagePreview] =
    useState(null);

  const [selectedImage, setSelectedImage] =
    useState(null);

  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    designation: "Principal",
    qualification: "",
    message: "",
    isPublished: true,
  });

  // =====================================================
  // FETCH PRINCIPAL
  // =====================================================

  async function fetchPrincipal() {
    try {
      setLoading(true);

      const response = await fetch(
        "/api/principal",
        {
          method: "GET",
          cache: "no-store",
        }
      );

      const text =
        await response.text();

      let result;

      try {
        result = JSON.parse(text);
      } catch {
        console.error(
          "SERVER RESPONSE:",
          text
        );

        throw new Error(
          "Server returned an invalid response."
        );
      }

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to fetch principal"
        );
      }

      const data = result.data;

      // =================================================
      // PRINCIPAL EXISTS
      // =================================================

      if (data) {
        setPrincipal(data);

        setForm({
          name: data.name || "",

          designation:
            data.designation ||
            "Principal",

          qualification:
            data.qualification ||
            "",

          message:
            data.message || "",

          isPublished:
            data.isPublished ?? true,
        });

        /*
          Keep the existing Cloudinary image.
        */

        setImagePreview(
          data.image || null
        );

        setSelectedImage(null);

        setShowForm(false);
      }

      // =================================================
      // NO PRINCIPAL
      // =================================================

      else {
        setPrincipal(null);

        setForm({
          name: "",
          designation: "Principal",
          qualification: "",
          message: "",
          isPublished: true,
        });

        setImagePreview(null);

        setSelectedImage(null);

        setShowForm(true);
      }
    } catch (error) {
      console.error(
        "FETCH PRINCIPAL ERROR:",
        error
      );

      toast.error(
        error.message ||
          "Failed to fetch principal"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPrincipal();
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
  // IMAGE CHANGE
  // =====================================================

  function handleImageChange(e) {
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

    // -------------------------------------------------
    // TYPE
    // -------------------------------------------------

    if (
      !allowedTypes.includes(
        file.type
      )
    ) {
      toast.error(
        "Only JPG, PNG and WEBP images are allowed."
      );

      e.target.value = "";

      return;
    }

    // -------------------------------------------------
    // SIZE
    // -------------------------------------------------

    if (
      file.size >
      5 * 1024 * 1024
    ) {
      toast.error(
        "Image must be smaller than 5 MB."
      );

      e.target.value = "";

      return;
    }

    // -------------------------------------------------
    // SAVE SELECTED FILE
    // -------------------------------------------------

    setSelectedImage(file);

    /*
      Preview the NEW image.
    */

    const previewUrl =
      URL.createObjectURL(file);

    setImagePreview(previewUrl);
  }

  // =====================================================
  // REMOVE NEW IMAGE
  // =====================================================

  function removeSelectedImage() {
    /*
      We are NOT deleting the old
      Cloudinary image.

      We simply cancel the newly
      selected image.
    */

    setSelectedImage(null);

    setImagePreview(
      principal?.image || null
    );

    if (fileInputRef.current) {
      fileInputRef.current.value =
        "";
    }
  }

  // =====================================================
  // RESET IMAGE INPUT
  // =====================================================

  function resetImageInput() {
    setSelectedImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value =
        "";
    }
  }

  // =====================================================
  // OPEN UPDATE FORM
  // =====================================================

  function openUpdateForm() {
    if (!principal) {
      return;
    }

    setForm({
      name: principal.name || "",

      designation:
        principal.designation ||
        "Principal",

      qualification:
        principal.qualification ||
        "",

      message:
        principal.message || "",

      isPublished:
        principal.isPublished ??
        true,
    });

    /*
      VERY IMPORTANT:

      Restore the OLD image when
      opening the update form.
    */

    setImagePreview(
      principal.image || null
    );

    setSelectedImage(null);

    resetImageInput();

    setShowForm(true);
  }

  // =====================================================
  // SAVE PRINCIPAL
  // =====================================================

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.name.trim()) {
      toast.error(
        "Please enter the principal's name."
      );

      return;
    }

    try {
      setSaving(true);

      /*
        Existing principal:
        PATCH /api/principal

        No principal:
        POST /api/principal
      */

      const method =
        principal ? "PATCH" : "POST";

      const formData =
        new FormData();

      // -------------------------------------------------
      // TEXT
      // -------------------------------------------------

      formData.append(
        "name",
        form.name.trim()
      );

      formData.append(
        "designation",
        form.designation.trim()
      );

      formData.append(
        "qualification",
        form.qualification.trim()
      );

      formData.append(
        "message",
        form.message.trim()
      );

      formData.append(
        "isPublished",
        String(
          form.isPublished
        )
      );

      // -------------------------------------------------
      // IMAGE
      // -------------------------------------------------

      /*
        IMPORTANT:

        Only send "image" when the
        user actually selected a NEW
        image.

        If no new image is selected,
        the backend will keep the old
        image.
      */

      if (selectedImage) {
        formData.append(
          "image",
          selectedImage
        );
      }

      // -------------------------------------------------
      // REQUEST
      // -------------------------------------------------

      const response =
        await fetch(
          "/api/principal",
          {
            method,
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
          "SAVE PRINCIPAL SERVER RESPONSE:",
          text
        );

        throw new Error(
          "Server returned an invalid response."
        );
      }

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to save principal"
        );
      }

      // =================================================
      // SAVED PRINCIPAL
      // =================================================

      const savedPrincipal =
        result.data;

      /*
        This is important.

        We replace the entire local
        principal with the server result.

        Therefore the Cloudinary image
        returned by MongoDB remains visible.
      */

      setPrincipal(
        savedPrincipal
      );

      setForm({
        name:
          savedPrincipal.name ||
          "",

        designation:
          savedPrincipal.designation ||
          "Principal",

        qualification:
          savedPrincipal.qualification ||
          "",

        message:
          savedPrincipal.message ||
          "",

        isPublished:
          savedPrincipal.isPublished ??
          true,
      });

      // =================================================
      // KEEP SAVED IMAGE
      // =================================================

      setImagePreview(
        savedPrincipal.image ||
          null
      );

      /*
        Remove the local File object
        after successful upload.
      */

      setSelectedImage(null);

      /*
        Reset input ONLY after the
        server successfully saves it.
      */

      if (fileInputRef.current) {
        fileInputRef.current.value =
          "";
      }

      setShowForm(false);

      toast.success(
        principal
          ? "Principal information updated successfully."
          : "Principal added successfully."
      );
    } catch (error) {
      console.error(
        "SAVE PRINCIPAL ERROR:",
        error
      );

      toast.error(
        error.message ||
          "Failed to save principal."
      );
    } finally {
      setSaving(false);
    }
  }

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <Loader2
          size={28}
          className="animate-spin text-gray-500"
        />
      </div>
    );
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="mx-auto max-w-6xl">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <p className="mb-1 text-sm font-medium text-gray-500">
            Website Management
          </p>

          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Principal
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage the principal's information displayed
            on the school website.
          </p>

        </div>

        {/* HEADER ACTIONS */}

        {principal && !showForm && (
          <div className="flex gap-3">

            {/* PREVIEW */}

            <button
              type="button"
              onClick={() =>
                setShowPreview(true)
              }
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-lg
                border
                border-gray-300
                bg-white
                px-4
                py-2.5
                text-sm
                font-medium
                text-gray-700
                transition
                hover:bg-gray-50
              "
            >
              <Eye size={18} />

              Preview
            </button>


            {/* UPDATE */}

            <button
              type="button"
              onClick={
                openUpdateForm
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
              <Pencil size={18} />

              Update
            </button>

          </div>
        )}

      </div>


      {/* =================================================
          EXISTING PRINCIPAL
      ================================================= */}

      {principal && !showForm && (

        <div
          className="
            overflow-hidden
            rounded-xl
            border
            border-gray-200
            bg-white
          "
        >

          {/* =================================================
              PROFILE HEADER
          ================================================= */}

          <div
            className="
              border-b
              border-gray-200
              bg-gray-50
              p-6
            "
          >

            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

              {/* IMAGE */}

              <div
                className="
                  flex
                  h-32
                  w-32
                  shrink-0
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                "
              >

                {principal.image ? (

                  <img
                    src={principal.image}
                    alt={principal.name}
                    className="
                      h-full
                      w-full
                      object-cover
                      object-[center_10%]
                    "
                  />

                ) : (

                  <UserRound
                    size={48}
                    className="text-gray-300"
                  />

                )}

              </div>


              {/* BASIC INFORMATION */}

              <div className="min-w-0">

                <div className="mb-2 flex flex-wrap items-center gap-2">

                  <h2 className="text-2xl font-bold text-gray-900">
                    {principal.name}
                  </h2>

                  <span
                    className={`
                      rounded-full
                      px-2.5
                      py-1
                      text-xs
                      font-medium
                      ${
                        principal.isPublished
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }
                    `}
                  >
                    {principal.isPublished
                      ? "Published"
                      : "Hidden"}
                  </span>

                </div>

                <p className="text-sm font-medium text-gray-600">
                  {principal.designation}
                </p>

                {principal.qualification && (
                  <p className="mt-2 text-sm text-gray-500">
                    {principal.qualification}
                  </p>
                )}

              </div>

            </div>

          </div>


          {/* =================================================
              MESSAGE
          ================================================= */}

          <div className="p-6">

            <h3 className="text-sm font-semibold text-gray-900">
              Principal's Message
            </h3>

            <div
              className="
                mt-4
                whitespace-pre-wrap
                rounded-lg
                bg-gray-50
                p-5
                text-sm
                leading-7
                text-gray-700
              "
            >
              {principal.message ||
                "No message has been added."}
            </div>

          </div>

        </div>
      )}


      {/* =================================================
          ADD / UPDATE FORM
      ================================================= */}

      {showForm && (

        <div
          className="
            rounded-xl
            border
            border-gray-200
            bg-white
          "
        >

          {/* FORM HEADER */}

          <div
            className="
              flex
              items-center
              justify-between
              border-b
              border-gray-200
              p-6
            "
          >

            <div>

              <h2 className="font-semibold text-gray-900">
                {principal
                  ? "Update Principal"
                  : "Add Principal"}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {principal
                  ? "Update the existing principal's information."
                  : "Add the principal's information."}
              </p>

            </div>

            {principal && (
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);

                  setSelectedImage(
                    null
                  );

                  setImagePreview(
                    principal.image ||
                      null
                  );

                  resetImageInput();
                }}
                disabled={saving}
                className="
                  rounded-lg
                  p-2
                  text-gray-500
                  transition
                  hover:bg-gray-100
                "
              >
                <X size={20} />
              </button>
            )}

          </div>


          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="space-y-6 p-6"
          >

            {/* =================================================
                NAME
            ================================================= */}

            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter principal's name"
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


            {/* =================================================
                DESIGNATION
            ================================================= */}

            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Designation
              </label>

              <input
                type="text"
                name="designation"
                value={form.designation}
                onChange={handleChange}
                placeholder="Principal"
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


            {/* =================================================
                QUALIFICATION
            ================================================= */}

            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Qualification
              </label>

              <input
                type="text"
                name="qualification"
                value={form.qualification}
                onChange={handleChange}
                placeholder="e.g. M.A., B.Ed."
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


            {/* =================================================
                IMAGE
            ================================================= */}

            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Principal Photo
              </label>

              <div
                className="
                  flex
                  flex-col
                  gap-4
                  sm:flex-row
                  sm:items-center
                "
              >

                {/* IMAGE */}

                <div
                  className="
                    flex
                    h-32
                    w-32
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

                  {imagePreview ? (

                    <img
                      src={imagePreview}
                      alt="Principal preview"
                      className="
                        h-full
                        w-full
                        object-cover
                        object-[center_10%]
                      "
                    />

                  ) : (

                    <UserRound
                      size={42}
                      className="text-gray-400"
                    />

                  )}

                </div>


                {/* FILE */}

                <div className="flex-1">

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={
                      handleImageChange
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
                    JPG, PNG or WEBP. Maximum 5 MB.
                  </p>


                  {/* NEW IMAGE */}

                  {selectedImage && (

                    <div
                      className="
                        mt-3
                        flex
                        items-center
                        gap-2
                      "
                    >

                      <Upload
                        size={15}
                        className="text-gray-400"
                      />

                      <span className="max-w-xs truncate text-xs text-gray-500">
                        {selectedImage.name}
                      </span>

                      <button
                        type="button"
                        onClick={
                          removeSelectedImage
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


                  {/* OLD IMAGE NOTICE */}

                  {principal &&
                    !selectedImage &&
                    principal.image && (

                      <p className="mt-3 text-xs text-gray-400">
                        Existing photo will be kept
                        unless you select a new one.
                      </p>

                    )}

                </div>

              </div>

            </div>


            {/* =================================================
                MESSAGE
            ================================================= */}

            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Principal's Message
              </label>

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Write the principal's message..."
                rows={8}
                className="
                  w-full
                  resize-y
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


            {/* =================================================
                PUBLISHED
            ================================================= */}

            <label className="flex cursor-pointer items-center gap-3">

              <input
                type="checkbox"
                name="isPublished"
                checked={
                  form.isPublished
                }
                onChange={
                  handleChange
                }
                className="
                  h-4
                  w-4
                  rounded
                  border-gray-300
                "
              />

              <span className="text-sm text-gray-700">
                Show principal information
                on the website
              </span>

            </label>


            {/* =================================================
                ACTIONS
            ================================================= */}

            <div
              className="
                flex
                justify-end
                gap-3
                border-t
                border-gray-200
                pt-6
              "
            >

              {principal && (
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);

                    setSelectedImage(
                      null
                    );

                    setImagePreview(
                      principal.image ||
                        null
                    );

                    resetImageInput();
                  }}
                  disabled={saving}
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
              )}


              <button
                type="submit"
                disabled={saving}
                className="
                  inline-flex
                  items-center
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

                {saving ? (
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />
                ) : (
                  <Save size={17} />
                )}

                {saving
                  ? "Saving..."
                  : principal
                    ? "Save Changes"
                    : "Add Principal"}

              </button>

            </div>

          </form>

        </div>
      )}


      {/* =================================================
          PREVIEW MODAL
      ================================================= */}

      {showPreview &&
        principal && (

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
              setShowPreview(false)
            }
          >

            <div
              className="
                relative
                max-h-[90vh]
                w-full
                max-w-2xl
                overflow-y-auto
                rounded-2xl
                bg-white
                shadow-2xl
              "
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              {/* CLOSE */}

              <button
                type="button"
                onClick={() =>
                  setShowPreview(false)
                }
                className="
                  absolute
                  right-4
                  top-4
                  z-10
                  rounded-full
                  bg-white/90
                  p-2
                  text-gray-600
                  shadow
                  hover:bg-white
                "
              >
                <X size={20} />
              </button>


              {/* IMAGE */}

              <div
                className="
                  flex
                  h-80
                  w-full
                  items-center
                  justify-center
                  overflow-hidden
                  bg-gray-100
                "
              >

                {principal.image ? (

                  <img
                    src={principal.image}
                    alt={principal.name}
                    className="
                      h-full
                      w-full
                      object-cover
                      object-[center_10%]
                    "
                  />

                ) : (

                  <UserRound
                    size={80}
                    className="text-gray-300"
                  />

                )}

              </div>


              {/* DETAILS */}

              <div className="p-7">

                <div
                  className="
                    flex
                    flex-wrap
                    items-start
                    justify-between
                    gap-4
                  "
                >

                  <div>

                    <h2 className="text-2xl font-bold text-gray-900">
                      {principal.name}
                    </h2>

                    <p className="mt-1 text-sm font-medium text-gray-600">
                      {principal.designation}
                    </p>

                    {principal.qualification && (
                      <p className="mt-2 text-sm text-gray-500">
                        {principal.qualification}
                      </p>
                    )}

                  </div>


                  <span
                    className={`
                      rounded-full
                      px-3
                      py-1
                      text-xs
                      font-medium
                      ${
                        principal.isPublished
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }
                    `}
                  >
                    {principal.isPublished
                      ? "Published"
                      : "Hidden"}
                  </span>

                </div>


                {/* MESSAGE */}

                <div className="mt-7">

                  <h3 className="text-sm font-semibold text-gray-900">
                    Principal's Message
                  </h3>

                  <p
                    className="
                      mt-3
                      whitespace-pre-wrap
                      text-sm
                      leading-7
                      text-gray-600
                    "
                  >
                    {principal.message ||
                      "No message has been added."}
                  </p>

                </div>

              </div>

            </div>

          </div>

        )}

    </div>
  );
}