"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  Loader2,
  Plus,
  Pencil,
  Trash2,
  Eye,
  X,
  Save,
  ImagePlus,
} from "lucide-react";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [editingEvent, setEditingEvent] = useState(null);
  const [previewEvent, setPreviewEvent] = useState(null);

  const [form, setForm] = useState({
    name: "",
    date: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState("");

  async function fetchEvents() {
    try {
      setLoading(true);

      const response = await fetch("/api/events", {
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to fetch events."
        );
      }

      setEvents(result.data || []);
    } catch (error) {
      console.error("FETCH EVENTS ERROR:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleImageChange(e) {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("Image size must be less than 10MB.");
      return;
    }

    setForm((previous) => ({
      ...previous,
      image: file,
    }));

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  }

  function resetForm() {
    setForm({
      name: "",
      date: "",
      image: null,
    });

    setImagePreview("");
    setEditingEvent(null);

    const input = document.getElementById("event-image");

    if (input) {
      input.value = "";
    }
  }

  function startEdit(event) {
    setEditingEvent(event);

    let formattedDate = "";

    if (event.date) {
      const date = new Date(event.date);

      if (!Number.isNaN(date.getTime())) {
        const year = date.getFullYear();

        const month = String(
          date.getMonth() + 1
        ).padStart(2, "0");

        const day = String(
          date.getDate()
        ).padStart(2, "0");

        formattedDate = `${year}-${month}-${day}`;
      }
    }

    setForm({
      name: event.name || "",
      date: formattedDate,
      image: null,
    });

    // Keep the old image visible while editing
    setImagePreview(event.image || "");

    const input = document.getElementById("event-image");

    if (input) {
      input.value = "";
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Event name is required.");
      return;
    }

    if (!editingEvent && !form.image) {
      alert("Event image is required.");
      return;
    }

    try {
      setSaving(true);

      const isEditing = Boolean(editingEvent);

      const url = isEditing
        ? `/api/events/${editingEvent._id}`
        : "/api/events/upload";

      const method = isEditing
        ? "PATCH"
        : "POST";

      const formData = new FormData();

      formData.append(
        "name",
        form.name.trim()
      );

      if (form.date) {
        formData.append(
          "date",
          form.date
        );
      }

      // Only send image if a new image was selected
      if (form.image) {
        formData.append(
          "image",
          form.image
        );
      }

      const response = await fetch(url, {
        method,
        body: formData,
      });

      const result = await response.json();
      console.log(result);
      
      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to save event."
        );
      }

      if (isEditing) {
        setEvents((previous) =>
          previous.map((item) =>
            item._id === result.data._id
              ? result.data
              : item
          )
        );
      } else {
        setEvents((previous) => [
          result.data,
          ...previous,
        ]);
      }

      resetForm();
    } catch (error) {
      console.error(
        "SAVE EVENT ERROR:",
        error
      );

      alert(error.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `/api/events/${id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to delete event."
        );
      }

      setEvents((previous) =>
        previous.filter(
          (item) => item._id !== id
        )
      );

      if (
        previewEvent &&
        previewEvent._id === id
      ) {
        setPreviewEvent(null);
      }
    } catch (error) {
      console.error(
        "DELETE EVENT ERROR:",
        error
      );

      alert(error.message);
    }
  }

  function formatDate(dateValue) {
    if (!dateValue) {
      return "Today";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "Today";
    }

    return date.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  }

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

  return (
    <div className="mx-auto max-w-6xl">

      <div className="mb-8">
        <p className="mb-1 text-sm font-medium text-gray-500">
          Website Management
        </p>

        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Events
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Manage school events displayed on
          the website.
        </p>
      </div>

      {/* Add / Edit */}

      <div className="mb-8 rounded-xl border border-gray-200 bg-white">

        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center gap-4">

            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
              {editingEvent ? (
                <Pencil size={20} />
              ) : (
                <Plus size={21} />
              )}
            </div>

            <div>
              <h2 className="font-semibold text-gray-900">
                {editingEvent
                  ? "Update Event"
                  : "Add Event"}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {editingEvent
                  ? "Update the event information."
                  : "Add a new event to the school website."}
              </p>
            </div>

          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-6"
        >

          {/* Event Name */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Event Name
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter event name"
              required
              className="
                w-full rounded-lg
                border border-gray-300
                px-3 py-2.5
                text-sm outline-none
                focus:border-gray-900
                focus:ring-1
                focus:ring-gray-900
              "
            />
          </div>

          {/* Date */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Date
            </label>

            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="
                w-full rounded-lg
                border border-gray-300
                px-3 py-2.5
                text-sm outline-none
                focus:border-gray-900
                focus:ring-1
                focus:ring-gray-900
              "
            />

            <p className="mt-2 text-xs text-gray-400">
              Leave empty to use today's date.
            </p>
          </div>

          {/* Image */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Event Image
            </label>

            <input
              id="event-image"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
              className="
                block w-full cursor-pointer
                rounded-lg border border-gray-300
                px-3 py-2.5 text-sm
                text-gray-600
                file:mr-4
                file:rounded-md
                file:border-0
                file:bg-gray-100
                file:px-3
                file:py-2
                file:text-sm
                file:font-medium
                file:text-gray-700
                hover:file:bg-gray-200
              "
            />

            <p className="mt-2 text-xs text-gray-400">
              JPG, PNG or WebP. Maximum 10MB.
            </p>

            {/* Image Preview */}

            {imagePreview && (
              <div className="mt-4">
                <p className="mb-2 text-xs font-medium text-gray-500">
                  {editingEvent &&
                  !form.image
                    ? "Current Image"
                    : "Image Preview"}
                </p>

                <div className="relative h-48 w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-100 sm:w-80">
                  <img
                    src={imagePreview}
                    alt="Event preview"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Buttons */}

          <div className="flex justify-end gap-3 border-t border-gray-200 pt-6">

            {editingEvent && (
              <button
                type="button"
                onClick={resetForm}
                disabled={saving}
                className="
                  inline-flex items-center gap-2
                  rounded-lg border
                  border-gray-300
                  px-5 py-2.5
                  text-sm font-medium
                  text-gray-700
                  transition hover:bg-gray-50
                  disabled:opacity-60
                "
              >
                <X size={17} />
                Cancel
              </button>
            )}

            <button
              type="submit"
              disabled={saving}
              className="
                inline-flex items-center gap-2
                rounded-lg bg-gray-900
                px-5 py-2.5
                text-sm font-medium
                text-white transition
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
              ) : editingEvent ? (
                <Save size={17} />
              ) : (
                <Plus size={17} />
              )}

              {saving
                ? "Saving..."
                : editingEvent
                ? "Update Event"
                : "Add Event"}
            </button>

          </div>

        </form>
      </div>

      {/* Events */}

      <div className="rounded-xl border border-gray-200 bg-white">

        <div className="border-b border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900">
            Existing Events
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {events.length}{" "}
            {events.length === 1
              ? "event"
              : "events"}{" "}
            added.
          </p>
        </div>

        {events.length === 0 ? (
          <div className="flex min-h-52 flex-col items-center justify-center px-6 text-center">

            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
              <CalendarDays size={22} />
            </div>

            <h3 className="mt-4 font-medium text-gray-900">
              No events yet
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Add your first school event above.
            </p>

          </div>
        ) : (
          <div className="divide-y divide-gray-200">

            {events.map((event) => (
              <div
                key={event._id}
                className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
              >

                <div className="flex items-start gap-4">

              {
                console.log(event)
                
              }
                  {/* Event Image */}

                  <div className="h-16 w-20 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
                    {event.image ? (
                      
                      <img
                        src={event.image}
                        alt={event.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-gray-400">
                        <CalendarDays size={20} />
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900">
                      {event.name}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      {formatDate(event.date)}
                    </p>
                  </div>

                </div>

                <div className="flex items-center gap-2">

                  <button
                    type="button"
                    onClick={() =>
                      setPreviewEvent(event)
                    }
                    className="
                      inline-flex items-center gap-2
                      rounded-lg border
                      border-gray-300
                      px-3 py-2
                      text-sm font-medium
                      text-gray-700
                      transition hover:bg-gray-50
                    "
                  >
                    <Eye size={16} />
                    <span className="hidden sm:inline">
                      Preview
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      startEdit(event)
                    }
                    className="
                      inline-flex items-center gap-2
                      rounded-lg border
                      border-gray-300
                      px-3 py-2
                      text-sm font-medium
                      text-gray-700
                      transition hover:bg-gray-50
                    "
                  >
                    <Pencil size={16} />
                    <span className="hidden sm:inline">
                      Edit
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(event._id)
                    }
                    className="
                      inline-flex items-center gap-2
                      rounded-lg border
                      border-red-200
                      px-3 py-2
                      text-sm font-medium
                      text-red-600
                      transition hover:bg-red-50
                    "
                  >
                    <Trash2 size={16} />
                    <span className="hidden sm:inline">
                      Delete
                    </span>
                  </button>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>

      {/* Preview Modal */}

      {previewEvent && (
        <div
          className="
            fixed inset-0 z-50
            flex items-center justify-center
            bg-black/50 p-4
          "
          onClick={() =>
            setPreviewEvent(null)
          }
        >
          <div
            className="
              w-full max-w-lg
              overflow-hidden
              rounded-xl
              bg-white shadow-xl
            "
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="flex items-center justify-between border-b border-gray-200 p-5">

              <h2 className="font-semibold text-gray-900">
                Event Preview
              </h2>

              <button
                type="button"
                onClick={() =>
                  setPreviewEvent(null)
                }
                className="
                  flex h-8 w-8
                  items-center justify-center
                  rounded-lg text-gray-500
                  hover:bg-gray-100
                "
              >
                <X size={18} />
              </button>

            </div>

            {previewEvent.image && (
              <div className="aspect-video w-full bg-gray-100">
                <img
                  src={previewEvent.image}
                  alt={previewEvent.name}
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            <div className="p-6">

              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Event
              </p>

              <h3 className="mt-1 text-xl font-semibold text-gray-900">
                {previewEvent.name}
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                {formatDate(
                  previewEvent.date
                )}
              </p>

            </div>

            <div className="border-t border-gray-200 p-5">

              <button
                type="button"
                onClick={() =>
                  setPreviewEvent(null)
                }
                className="
                  w-full rounded-lg
                  bg-gray-900
                  px-4 py-2.5
                  text-sm font-medium
                  text-white
                  transition hover:bg-gray-800
                "
              >
                Close Preview
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}