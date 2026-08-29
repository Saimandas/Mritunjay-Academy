"use client";

import { useEffect, useState } from "react";
import {
  Mail,
  Trash2,
  Loader2,
  Check,
  MailOpen,
  UserRound,
} from "lucide-react";

export default function ContactMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // --------------------------------
  // Fetch Messages
  // --------------------------------

  async function fetchMessages() {
    try {
      setLoading(true);

      const response = await fetch(
        "/api/contact-messages"
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to fetch contact messages"
        );
      }

      setMessages(result.data || []);
    } catch (error) {
      console.error(
        "FETCH CONTACT MESSAGES ERROR:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  // --------------------------------
  // Toggle Read
  // --------------------------------

  async function toggleRead(message) {
    try {
      const response = await fetch(
        `/api/contact-messages/${message._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isRead: !message.isRead,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to update message"
        );
      }

      setMessages((previous) =>
        previous.map((item) =>
          item._id === message._id
            ? result.data
            : item
        )
      );
    } catch (error) {
      console.error(
        "UPDATE CONTACT MESSAGE ERROR:",
        error
      );

      alert(error.message);
    }
  }

  // --------------------------------
  // Delete
  // --------------------------------

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `/api/contact-messages/${id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to delete message"
        );
      }

      setMessages((previous) =>
        previous.filter(
          (message) => message._id !== id
        )
      );
    } catch (error) {
      console.error(
        "DELETE CONTACT MESSAGE ERROR:",
        error
      );

      alert(error.message);
    }
  }

  // --------------------------------
  // Loading
  // --------------------------------

  if (loading) {
    return (
      <div className="
        flex min-h-64
        items-center justify-center
      ">
        <Loader2
          size={28}
          className="animate-spin text-gray-500"
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">

      {/* Header */}

      <div className="mb-8">

        <p className="
          mb-1 text-sm
          font-medium text-gray-500
        ">
          Website Management
        </p>

        <h1 className="
          text-2xl font-bold
          tracking-tight text-gray-900
          sm:text-3xl
        ">
          Contact Messages
        </h1>

        <p className="
          mt-2 text-sm
          text-gray-500
        ">
          View and manage messages submitted
          through the Contact Us page.
        </p>

      </div>


      {/* Stats */}

      <div className="
        mb-6 grid gap-4
        sm:grid-cols-2
      ">

        {/* Total */}

        <div className="
          rounded-xl border
          border-gray-200
          bg-white p-5
        ">

          <div className="
            flex items-center
            justify-between
          ">

            <div>

              <p className="
                text-sm text-gray-500
              ">
                Total Messages
              </p>

              <p className="
                mt-1 text-2xl
                font-bold text-gray-900
              ">
                {messages.length}
              </p>

            </div>

            <div className="
              flex h-10 w-10
              items-center justify-center
              rounded-lg bg-gray-100
              text-gray-600
            ">
              <Mail size={20} />
            </div>

          </div>

        </div>


        {/* Unread */}

        <div className="
          rounded-xl border
          border-gray-200
          bg-white p-5
        ">

          <div className="
            flex items-center
            justify-between
          ">

            <div>

              <p className="
                text-sm text-gray-500
              ">
                Unread Messages
              </p>

              <p className="
                mt-1 text-2xl
                font-bold text-gray-900
              ">
                {
                  messages.filter(
                    (message) =>
                      !message.isRead
                  ).length
                }
              </p>

            </div>

            <div className="
              flex h-10 w-10
              items-center justify-center
              rounded-lg
              bg-gray-100
              text-gray-600
            ">
              <MailOpen size={20} />
            </div>

          </div>

        </div>

      </div>


      {/* Messages */}

      {messages.length === 0 ? (

        <div className="
          rounded-xl
          border border-dashed
          border-gray-300
          bg-white p-12
          text-center
        ">

          <div className="
            mx-auto flex h-12 w-12
            items-center justify-center
            rounded-full bg-gray-100
            text-gray-500
          ">
            <Mail size={22} />
          </div>

          <h3 className="
            mt-4 font-semibold
            text-gray-900
          ">
            No messages yet
          </h3>

          <p className="
            mt-1 text-sm
            text-gray-500
          ">
            Messages submitted through
            Contact Us will appear here.
          </p>

        </div>

      ) : (

        <div className="space-y-4">

          {messages.map((message) => (

            <div
              key={message._id}
              className={`
                rounded-xl border
                bg-white p-5
                ${
                  message.isRead
                    ? "border-gray-200"
                    : "border-gray-300"
                }
              `}
            >

              {/* Top */}

              <div className="
                flex flex-col
                gap-4
                sm:flex-row
                sm:items-start
                sm:justify-between
              ">

                {/* Sender */}

                <div className="
                  flex min-w-0
                  gap-4
                ">

                  <div className="
                    flex h-11 w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-gray-100
                    text-gray-600
                  ">
                    <UserRound size={20} />
                  </div>

                  <div className="min-w-0">

                    <div className="
                      flex flex-wrap
                      items-center gap-2
                    ">

                      <h2 className="
                        font-semibold
                        text-gray-900
                      ">
                        {message.name}
                      </h2>

                      {!message.isRead && (
                        <span className="
                          rounded-full
                          bg-blue-100
                          px-2.5 py-1
                          text-xs font-medium
                          text-blue-700
                        ">
                          New
                        </span>
                      )}

                    </div>


                    {/* Email */}

                    <a
                      href={`mailto:${message.email}`}
                      className="
                        mt-1 block
                        text-sm text-gray-500
                        hover:text-gray-900
                      "
                    >
                      {message.email}
                    </a>


                    {/* Phone */}

                    {message.phone && (
                      <a
                        href={`tel:${message.phone}`}
                        className="
                          mt-1 block
                          text-sm text-gray-500
                          hover:text-gray-900
                        "
                      >
                        {message.phone}
                      </a>
                    )}

                  </div>

                </div>


                {/* Date */}

                <p className="
                  shrink-0 text-xs
                  text-gray-400
                ">
                  {new Date(
                    message.createdAt
                  ).toLocaleString()}
                </p>

              </div>


              {/* Content */}

              <div className="
                mt-5
                rounded-lg
                bg-gray-50
                p-4
              ">

                {message.subject && (
                  <h3 className="
                    mb-2 font-medium
                    text-gray-900
                  ">
                    {message.subject}
                  </h3>
                )}

                <p className="
                  whitespace-pre-wrap
                  text-sm leading-6
                  text-gray-600
                ">
                  {message.message}
                </p>

              </div>


              {/* Actions */}

              <div className="
                mt-4 flex
                items-center
                justify-end gap-2
              ">

                <button
                  onClick={() =>
                    toggleRead(message)
                  }
                  className="
                    inline-flex
                    items-center gap-2
                    rounded-lg
                    border border-gray-200
                    px-3 py-2
                    text-sm font-medium
                    text-gray-700
                    hover:bg-gray-50
                  "
                >

                  {message.isRead ? (
                    <>
                      <Mail size={16} />
                      Mark Unread
                    </>
                  ) : (
                    <>
                      <Check size={16} />
                      Mark Read
                    </>
                  )}

                </button>


                <button
                  onClick={() =>
                    handleDelete(message._id)
                  }
                  className="
                    inline-flex
                    items-center gap-2
                    rounded-lg
                    border border-red-200
                    px-3 py-2
                    text-sm font-medium
                    text-red-600
                    hover:bg-red-50
                  "
                >
                  <Trash2 size={16} />
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}