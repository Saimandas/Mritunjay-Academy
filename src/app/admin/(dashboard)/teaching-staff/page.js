"use client";

import { useEffect, useRef, useState } from "react";

import {
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Loader2,
  X,
  UserRound,
  Image as ImageIcon,
  GraduationCap,
  BookOpen,
  Mail,
  Phone,
} from "lucide-react";

import { toast } from "sonner";

const API_URL = "/api/staff/teaching";

export default function TeachingStaffPage() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [selectedTeacher, setSelectedTeacher] =
    useState(null);

  const [photoPreview, setPhotoPreview] =
    useState(null);

  const [activeSection, setActiveSection] =
    useState("school");

  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    designation: "",
    qualification: "",
    subject: "",
    email: "",
    phone: "",
    section: "school",
    isActive: true,
    photo: null,
  });

  // =====================================================
  // FETCH STAFF
  // =====================================================

  async function fetchStaff(section = activeSection) {
    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}?section=${encodeURIComponent(section)}`,
        {
          cache: "no-store",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to fetch teaching staff"
        );
      }

      setStaff(result.data || []);
    } catch (error) {
      console.error(
        "FETCH TEACHING STAFF ERROR:",
        error
      );

      setStaff([]);

      toast.error(
        error.message ||
          "Failed to fetch teaching staff"
      );
    } finally {
      setLoading(false);
    }
  }

  // =====================================================
  // INITIAL FETCH
  // =====================================================

  useEffect(() => {
    fetchStaff("school");
  }, []);

  // =====================================================
  // CHANGE SECTION
  // =====================================================

  function handleSectionChange(section) {
    setActiveSection(section);

    setSelectedTeacher(null);

    fetchStaff(section);
  }

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
  // PHOTO
  // =====================================================

  function handlePhotoChange(e) {
    const file =
      e.target.files?.[0] || null;

    if (!file) return;

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
  // RESET
  // =====================================================

  function resetForm() {
    setForm({
      name: "",
      designation: "",
      qualification: "",
      subject: "",
      email: "",
      phone: "",
      section: activeSection,
      isActive: true,
      photo: null,
    });

    setPhotoPreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  // =====================================================
  // OPEN FORM
  // =====================================================

  function openForm() {
    resetForm();

    setForm((previous) => ({
      ...previous,
      section: activeSection,
    }));

    setShowForm(true);
  }

  // =====================================================
  // CLOSE FORM
  // =====================================================

  function closeForm() {
    if (submitting) return;

    resetForm();
    setShowForm(false);
  }

  // =====================================================
  // CREATE
  // =====================================================

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.name.trim()) {
      toast.error(
        "Please enter the teacher's name."
      );
      return;
    }

    if (!form.designation.trim()) {
      toast.error(
        "Please enter the designation."
      );
      return;
    }

    if (!form.section) {
      toast.error(
        "Please select a section."
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
        "qualification",
        form.qualification.trim()
      );

      formData.append(
        "subject",
        form.subject.trim()
      );

      formData.append(
        "email",
        form.email.trim()
      );

      formData.append(
        "phone",
        form.phone.trim()
      );

      formData.append(
        "section",
        form.section
      );

      formData.append(
        "isActive",
        String(form.isActive)
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

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to create teacher"
        );
      }

      resetForm();
      setShowForm(false);

      // Fetch the currently selected section again
      await fetchStaff(form.section);

      toast.success(
        "Teacher added successfully."
      );
    } catch (error) {
      console.error(
        "CREATE TEACHING STAFF ERROR:",
        error
      );

      toast.error(
        error.message ||
          "Failed to create teacher."
      );
    } finally {
      setSubmitting(false);
    }
  }

  // =====================================================
  // DELETE
  // =====================================================

  async function handleDelete(id) {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this teacher?"
      );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to delete teacher"
        );
      }

      setStaff((previous) =>
        previous.filter(
          (item) => item._id !== id
        )
      );

      if (
        selectedTeacher?._id === id
      ) {
        setSelectedTeacher(null);
      }

      toast.success(
        "Teacher deleted successfully."
      );
    } catch (error) {
      toast.error(
        error.message ||
          "Failed to delete teacher."
      );
    }
  }

  // =====================================================
  // ACTIVE / INACTIVE
  // =====================================================

  async function toggleActive(member) {
    const newStatus = !member.isActive;

    try {
      const response = await fetch(
        `${API_URL}/${member._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            isActive: newStatus,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to update teacher"
        );
      }

      setStaff((previous) =>
        previous.map((item) =>
          item._id === member._id
            ? result.data
            : item
        )
      );

      if (
        selectedTeacher?._id ===
        member._id
      ) {
        setSelectedTeacher(
          result.data
        );
      }

      toast.success(
        newStatus
          ? "Teacher activated."
          : "Teacher deactivated."
      );
    } catch (error) {
      toast.error(
        error.message ||
          "Failed to update teacher."
      );
    }
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="mx-auto max-w-7xl">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

        <div>

          <p className="mb-1 text-sm font-medium text-gray-500">
            Website Management
          </p>

          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Teaching Staff
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
            Manage teachers for the school and
            higher secondary sections.
          </p>

        </div>

        <button
          type="button"
          onClick={openForm}
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
          Add Teacher
        </button>

      </div>


      {/* =================================================
          SECTION TABS
      ================================================= */}

      <div className="mb-8 border-b border-gray-200">

        <div className="flex gap-7">

          {/* SCHOOL */}

          <button
            type="button"
            onClick={() =>
              handleSectionChange("school")
            }
            className={`
              relative
              pb-3
              text-sm
              font-medium
              transition
              ${
                activeSection === "school"
                  ? "text-gray-900"
                  : "text-gray-500 hover:text-gray-800"
              }
            `}
          >

            School Section

            {activeSection === "school" && (
              <span className="
                absolute
                bottom-0
                left-0
                h-0.5
                w-full
                bg-gray-900
              " />
            )}

          </button>


          {/* HIGHER SECONDARY */}

          <button
            type="button"
            onClick={() =>
              handleSectionChange(
                "higherSecondary"
              )
            }
            className={`
              relative
              pb-3
              text-sm
              font-medium
              transition
              ${
                activeSection ===
                "higherSecondary"
                  ? "text-gray-900"
                  : "text-gray-500 hover:text-gray-800"
              }
            `}
          >

            Higher Secondary

            {activeSection ===
              "higherSecondary" && (
              <span className="
                absolute
                bottom-0
                left-0
                h-0.5
                w-full
                bg-gray-900
              " />
            )}

          </button>

        </div>

      </div>


      {/* =================================================
          ADD FORM
      ================================================= */}

      {showForm && (
        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

          <div className="mb-6 flex items-center justify-between">

            <div>

              <h2 className="text-lg font-semibold text-gray-900">
                Add Teaching Staff
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Add a teacher to the{" "}
                <strong>
                  {form.section ===
                  "school"
                    ? "School"
                    : "Higher Secondary"}
                </strong>{" "}
                section.
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
              "
            >
              <X size={20} />
            </button>

          </div>


          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* SECTION */}

            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Section
              </label>

              <select
                name="section"
                value={form.section}
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
                  outline-none
                  focus:border-gray-900
                  focus:ring-1
                  focus:ring-gray-900
                "
              >

                <option value="school">
                  School Section
                </option>

                <option value="higherSecondary">
                  Higher Secondary
                </option>

              </select>

            </div>


            {/* PHOTO */}

            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Teacher Photo
              </label>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

                <div className="
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
                ">

                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Preview"
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
                    "
                  />

                  <p className="mt-2 text-xs text-gray-500">
                    JPG, PNG or WEBP · Maximum
                    5 MB
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
                        onClick={removePhoto}
                        className="text-xs font-medium text-red-600 hover:underline"
                      >
                        Remove
                      </button>

                    </div>
                  )}

                </div>

              </div>

            </div>


            {/* NAME */}

            <Input
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter teacher name"
              required
            />


            {/* DESIGNATION */}

            <Input
              label="Designation"
              name="designation"
              value={form.designation}
              onChange={handleChange}
              placeholder="e.g. Assistant Teacher"
              required
            />


            {/* SUBJECT */}

            <Input
              label="Subject"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="e.g. Mathematics"
            />


            {/* QUALIFICATION */}

            <Input
              label="Qualification"
              name="qualification"
              value={form.qualification}
              onChange={handleChange}
              placeholder="e.g. M.Sc., B.Ed."
            />


            {/* EMAIL + PHONE */}

            <div className="grid gap-5 md:grid-cols-2">

              <Input
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="teacher@example.com"
              />

              <Input
                label="Phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />

            </div>


            {/* ACTIVE */}

            <label className="flex cursor-pointer items-center gap-3">

              <input
                type="checkbox"
                name="isActive"
                checked={form.isActive}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300"
              />

              <span className="text-sm text-gray-700">
                Active on website
              </span>

            </label>


            {/* ACTIONS */}

            <div className="flex gap-3 pt-2">

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
                  : "Add Teacher"}

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

        <div className="mb-4 flex items-end justify-between">

          <div>

            <h2 className="text-lg font-semibold text-gray-900">
              {activeSection === "school"
                ? "School Section Staff"
                : "Higher Secondary Staff"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {loading
                ? "Loading..."
                : `${staff.length} staff member${
                    staff.length !== 1
                      ? "s"
                      : ""
                  }`}
            </p>

          </div>

        </div>


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

        ) : staff.length === 0 ? (

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
              <GraduationCap size={22} />
            </div>

            <h3 className="mt-4 font-semibold text-gray-900">
              No teaching staff
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              No teachers have been added to
              this section yet.
            </p>

          </div>

        ) : (

          <div className="grid gap-4 md:grid-cols-2">

            {staff.map(
              (member) => (

                <div
                  key={member._id}
                  className="
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    p-5
                    transition
                    hover:border-gray-300
                    hover:shadow-sm
                  "
                >

                  <div className="flex items-start justify-between gap-4">

                    <div className="flex min-w-0 gap-4">

                      {/* PHOTO */}

                      <div className="
                        flex
                        h-20
                        w-20
                        shrink-0
                        items-center
                        justify-center
                        overflow-hidden
                        rounded-xl
                        bg-gray-100
                      ">

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

                        <div className="
                          flex
                          flex-wrap
                          items-center
                          gap-2
                        ">

                          <h3 className="font-semibold text-gray-900">
                            {member.name}
                          </h3>

                         

                        </div>

                        <p className="mt-1 text-sm text-gray-600">
                          {member.designation}
                        </p>

                        {member.subject && (
                          <p className="mt-1 text-xs text-gray-500">
                            {member.subject}
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

                    <div className="flex shrink-0 gap-2">

                      <button
                        type="button"
                        onClick={() =>
                          setSelectedTeacher(
                            member
                          )
                        }
                        title="Preview"
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


                      {/* <button
                        type="button"
                        onClick={() =>
                          toggleActive(
                            member
                          )
                        }
                        title={
                          member.isActive
                            ? "Deactivate"
                            : "Activate"
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
                        {member.isActive ? (
                          <EyeOff size={17} />
                        ) : (
                          <Eye size={17} />
                        )}
                      </button> */}


                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(
                            member._id
                          )
                        }
                        title="Delete"
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

              )
            )}

          </div>

        )}

      </section>


      {/* =================================================
          PREVIEW MODAL
      ================================================= */}

      {selectedTeacher && (

        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-black/50
            p-4
          "
          onClick={() =>
            setSelectedTeacher(null)
          }
        >

          <div
            className="
              relative
              max-h-[90vh]
              w-full
              max-w-xl
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
                setSelectedTeacher(null)
              }
              className="
                absolute
                right-4
                top-4
                z-20
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-white
                text-gray-600
                shadow-md
                hover:bg-gray-100
              "
            >
              <X size={20} />
            </button>


            {/* IMAGE */}

            <div className="
              h-80
              overflow-hidden
              bg-gray-100
            ">

              {selectedTeacher.photo ? (
                <img
                  src={
                    selectedTeacher.photo
                  }
                  alt={
                    selectedTeacher.name
                  }
                  className="
                    h-full
                    w-full
                    object-cover
                    object-[center_10%]
                  "
                />
              ) : (
                <div className="
                  flex
                  h-full
                  items-center
                  justify-center
                ">
                  <UserRound
                    size={80}
                    className="text-gray-400"
                  />
                </div>
              )}

            </div>


            {/* DETAILS */}

            <div className="p-6">

              <div className="
                flex
                items-start
                justify-between
                gap-4
              ">

                <div>

                  <p className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wider
                    text-gray-400
                  ">
                    {selectedTeacher.section ===
                    "school"
                      ? "School Section"
                      : "Higher Secondary"}
                  </p>

                  <h2 className="
                    mt-1
                    text-2xl
                    font-bold
                    text-gray-900
                  ">
                    {selectedTeacher.name}
                  </h2>

                  <p className="
                    mt-1
                    text-base
                    text-gray-600
                  ">
                    {
                      selectedTeacher.designation
                    }
                  </p>

                </div>

                <span
                  className={`
                    shrink-0
                    rounded-full
                    px-3
                    py-1
                    text-xs
                    font-medium
                    ${
                      selectedTeacher.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }
                  `}
                >
                  
                </span>

              </div>


              <div className="
                mt-6
                divide-y
                divide-gray-100
                border-y
                border-gray-100
              ">

                {selectedTeacher.subject && (
                  <PreviewInfo
                    icon={<BookOpen size={17} />}
                    label="Subject"
                    value={
                      selectedTeacher.subject
                    }
                  />
                )}

                {selectedTeacher.qualification && (
                  <PreviewInfo
                    icon={
                      <GraduationCap
                        size={17}
                      />
                    }
                    label="Qualification"
                    value={
                      selectedTeacher.qualification
                    }
                  />
                )}

                {selectedTeacher.email && (
                  <PreviewInfo
                    icon={<Mail size={17} />}
                    label="Email"
                    value={
                      selectedTeacher.email
                    }
                  />
                )}

                {selectedTeacher.phone && (
                  <PreviewInfo
                    icon={<Phone size={17} />}
                    label="Phone"
                    value={
                      selectedTeacher.phone
                    }
                  />
                )}

              </div>


              <div className="mt-6 flex gap-3">

                <button
                  type="button"
                  onClick={() =>
                    toggleActive(
                      selectedTeacher
                    )
                  }
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-lg
                    border
                    border-gray-200
                    px-4
                    py-2.5
                    text-sm
                    font-medium
                    text-gray-700
                    hover:bg-gray-50
                  "
                >

                  

                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}


/* =========================================================
   INPUT
========================================================= */

function Input({
  label,
  ...props
}) {
  return (
    <div>

      <label className="
        mb-2
        block
        text-sm
        font-medium
        text-gray-700
      ">
        {label}
      </label>

      <input
        {...props}
        className="
          w-full
          rounded-lg
          border
          border-gray-300
          px-3
          py-2.5
          text-sm
          outline-none
          transition
          focus:border-gray-900
          focus:ring-1
          focus:ring-gray-900
        "
      />

    </div>
  );
}


/* =========================================================
   PREVIEW INFO
========================================================= */

function PreviewInfo({
  icon,
  label,
  value,
}) {
  return (
    <div className="
      flex
      items-center
      gap-4
      py-4
    ">

      <div className="
        flex
        h-9
        w-9
        shrink-0
        items-center
        justify-center
        rounded-lg
        bg-gray-100
        text-gray-600
      ">
        {icon}
      </div>

      <div className="min-w-0">

        <p className="
          text-xs
          font-medium
          uppercase
          tracking-wide
          text-gray-400
        ">
          {label}
        </p>

        <p className="
          mt-1
          break-words
          text-sm
          text-gray-700
        ">
          {value}
        </p>

      </div>

    </div>
  );
}