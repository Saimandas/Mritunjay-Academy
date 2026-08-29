"use client";

import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Loader2,
  ArrowRight,
  MessageCircle,
  Navigation,
} from "lucide-react";
import { schoolInfo } from "../constants/data";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    phone: "",
  });

  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setSuccess("");
    setError("");

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.message.trim()
    ) {
      setError("Name, email and message are required.");
      return;
    }

    try {
      setSending(true);

      const response = await fetch("/api/contact-messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject,
          message: form.message.trim(),
          phone: form.phone.trim(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message || "Failed to send message."
        );
      }

      setSuccess("Your message has been sent successfully.");

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
        phone: "",
      });
    } catch (error) {
      console.error("CONTACT FORM ERROR:", error);

      setError(
        error?.message || "Failed to send message."
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#fffaf8] text-[#292323]">

      {/* =====================================================
          COMPACT HEADER
      ===================================================== */}

      <section className="border-b border-[#ead9d5] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-7 lg:px-6">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#b91c1c]">
                <span className="h-2 w-2 rounded-full bg-[#b91c1c]" />
                Get in Touch
              </div>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#231f20] sm:text-4xl">
                Contact Us
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6b6262]">
                Have a question about admission, academics,
                activities or the school? We would be happy
                to hear from you.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-[#a31d1d]">
              <MessageCircle size={16} />
              School Office
            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          CONTACT AREA
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-5 py-8 lg:px-6 lg:py-10">

        <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">


          {/* =================================================
              CONTACT INFORMATION
          ================================================= */}

          <div className="rounded-2xl bg-[#5f1717] p-6 text-white sm:p-7">

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                <MessageCircle size={21} />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#f5b8ae]">
                  Contact Information
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  School Office
                </h2>
              </div>
            </div>

            <p className="mt-5 text-sm leading-6 text-white/65">
              For enquiries and assistance, contact the
              school office using any of the details below.
            </p>


            <div className="mt-7 space-y-5">

              {/* ADDRESS */}

              <ContactItem
                icon={<MapPin size={18} />}
                title="School Address"
              >
                {schoolInfo.schoolName}
                <br />
                {schoolInfo.adress}
                <br />
                Assam, India
              </ContactItem>


              {/* PHONE */}

              <ContactItem
                icon={<Phone size={18} />}
                title="Phone"
              >
                <a
                  href={`tel:+91${schoolInfo.phone}`}
                  className="transition hover:text-white"
                >
                  +91 {schoolInfo.phone}
                </a>
              </ContactItem>


              {/* EMAIL */}

              <ContactItem
                icon={<Mail size={18} />}
                title="Email"
              >
                <a
                  href={`mailto:${schoolInfo.email}`}
                  className="break-all transition hover:text-white"
                >
                  {schoolInfo.email}
                </a>
              </ContactItem>


              {/* HOURS */}

              <ContactItem
                icon={<Clock size={18} />}
                title="Office Hours"
              >
                Monday – Saturday
                <br />
                9:00 AM – 3:00 PM
              </ContactItem>

            </div>


            {/* SMALL BOTTOM STRIP */}

            <div className="mt-8 border-t border-white/10 pt-5">
              <div className="flex items-center gap-2 text-xs font-medium text-white/55">
                <Navigation size={14} />
                 ${schoolInfo.adress},Assam
              </div>
            </div>

          </div>


          {/* =================================================
              FORM
          ================================================= */}

          <div className="rounded-2xl border border-[#ead9d5] bg-white p-6 shadow-[0_8px_35px_rgba(91,35,28,0.06)] sm:p-8">

            <div className="flex items-start justify-between gap-5">

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#b91c1c]">
                  Send an Enquiry
                </p>

                <h2 className="mt-2 text-2xl font-bold text-[#292323]">
                  Send Us a Message
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-[#746969]">
                  Fill in the form below and the school office
                  will get back to you.
                </p>
              </div>

              <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#fff0ed] text-[#b91c1c] sm:flex">
                <Send size={19} />
              </div>

            </div>


            {/* SUCCESS */}

            {success && (
              <div className="mt-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                {success}
              </div>
            )}


            {/* ERROR */}

            {error && (
              <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </div>
            )}


            <form
              onSubmit={handleSubmit}
              className="mt-7 space-y-5"
            >

              {/* NAME + EMAIL */}

              <div className="grid gap-5 md:grid-cols-2">

                <FormField
                  label="Your Name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />

                <FormField
                  label="Email Address"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  required
                />

              </div>


              {/* PHONE */}

              <FormField
                label="Phone Number"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />


              {/* SUBJECT */}

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#514747]"
                >
                  Subject
                </label>

                <select
                  id="subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="
                    w-full
                    rounded-xl
                    border
                    border-[#dfd0cd]
                    bg-[#fffaf8]
                    px-4
                    py-3
                    text-sm
                    text-[#292323]
                    outline-none
                    transition
                    focus:border-[#b91c1c]
                    focus:ring-2
                    focus:ring-[#b91c1c]/10
                  "
                >
                  <option value="">
                    Select a subject
                  </option>

                  <option value="Admission Enquiry">
                    Admission Enquiry
                  </option>

                  <option value="Academic Information">
                    Academic Information
                  </option>

                  <option value="General Enquiry">
                    General Enquiry
                  </option>

                  <option value="Other">
                    Other
                  </option>
                </select>
              </div>


              {/* MESSAGE */}

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#514747]"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  required
                  className="
                    w-full
                    resize-none
                    rounded-xl
                    border
                    border-[#dfd0cd]
                    bg-[#fffaf8]
                    px-4
                    py-3
                    text-sm
                    leading-6
                    text-[#292323]
                    outline-none
                    transition
                    placeholder:text-[#a99c9c]
                    focus:border-[#b91c1c]
                    focus:ring-2
                    focus:ring-[#b91c1c]/10
                  "
                />
              </div>


              {/* BUTTON */}

              <button
                type="submit"
                disabled={sending}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#b91c1c]
                  px-6
                  py-3
                  text-sm
                  font-bold
                  text-white
                  shadow-sm
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:bg-[#991b1b]
                  hover:shadow-md
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {sending ? (
                  <>
                    <Loader2
                      size={16}
                      className="animate-spin"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <ArrowRight size={16} />
                  </>
                )}
              </button>

            </form>

          </div>

        </div>

      </section>


      {/* =====================================================
          MAP
      ===================================================== */}

      <section className="border-t border-[#ead9d5] bg-white">

        <div className="mx-auto max-w-7xl px-5 py-8 lg:px-6 lg:py-10">

          <div className="mb-5 flex items-end justify-between gap-4">

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#b91c1c]">
                Find Us
              </p>

              <h2 className="mt-2 text-2xl font-bold text-[#292323]">
                School Location
              </h2>
            </div>

            <div className="hidden items-center gap-2 text-xs font-medium text-[#776b6b] sm:flex">
              <MapPin size={14} />
              Pathsala, Bajali
            </div>

          </div>

          <div className="overflow-hidden rounded-2xl border border-[#ead9d5] bg-[#f7eeeb]">

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3574.6465475440777!2d90.62606747502957!3d26.37029177697461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3759ab793945844d%3A0xa3d0e22fcb1e0377!2sChilaray%20Jatiya%20Vidyalaya%2C%20North%20salmara!5e0!3m2!1sen!2sin!4v1786602470925!5m2!1sen!2sin"
              className="h-[300px] w-full border-0 sm:h-[360px]"
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />

          </div>

        </div>

      </section>

    </main>
  );
}


/* =========================================================
   CONTACT ITEM
========================================================= */

function ContactItem({ icon, title, children }) {
  return (
    <div className="flex gap-4">

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#f4b0a8]">
        {icon}
      </div>

      <div className="min-w-0">

        <p className="text-xs font-bold uppercase tracking-wide text-white/45">
          {title}
        </p>

        <div className="mt-1 text-sm leading-6 text-white/80">
          {children}
        </div>

      </div>

    </div>
  );
}


/* =========================================================
   FORM FIELD
========================================================= */

function FormField({
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
  required = false,
}) {
  return (
    <div>

      <label
        htmlFor={name}
        className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#514747]"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="
          w-full
          rounded-xl
          border
          border-[#dfd0cd]
          bg-[#fffaf8]
          px-4
          py-3
          text-sm
          text-[#292323]
          outline-none
          transition
          placeholder:text-[#a99c9c]
          focus:border-[#b91c1c]
          focus:ring-2
          focus:ring-[#b91c1c]/10
        "
      />

    </div>
  );
}