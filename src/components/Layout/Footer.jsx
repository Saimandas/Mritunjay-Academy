import Link from "next/link";
import {
  MapPin,
  Phone,
  ArrowUpRight,
} from "lucide-react";
import { schoolInfo } from "@/app/constants/data";

const Footer = () => {
  return (
    <footer className="bg-primary text-white">

      {/* =====================================================
          MAIN FOOTER
      ===================================================== */}

      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-6">

        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr_1fr]">


          {/* =================================================
              SCHOOL
          ================================================= */}

          <div>

            <h2 className="text-2xl font-bold tracking-tight">
              {schoolInfo.schoolName}
            </h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-white/65">
              A place for learning, values and the overall
              development of every student.
            </p>

            <div className="mt-5 flex items-center gap-2 text-sm text-white/55">

              <MapPin size={15} />

              <span>
                Pathsala, Bajali, Assam
              </span>

            </div>

          </div>


          {/* =================================================
              QUICK LINKS
          ================================================= */}

          <div>

            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/45">
              Quick Links
            </p>

            <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3">

              <FooterLink href="/">
                Home
              </FooterLink>

              <FooterLink href="/about">
                About
              </FooterLink>

              <FooterLink href="/notice-board">
                Notices
              </FooterLink>

              <FooterLink href="/events">
                Events
              </FooterLink>

              <FooterLink href="/gallery">
                Gallery
              </FooterLink>

              <FooterLink href="/contact">
                Contact
              </FooterLink>

            </div>

          </div>


          {/* =================================================
              SCHOOL
          ================================================= */}

          <div>

            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/45">
              School
            </p>

            <div className="mt-4 space-y-3">

              <FooterLink href="/administration/principal">
                Principal's Desk
              </FooterLink>

              <FooterLink href="/administration/rules-regulations">
                Rules & Regulations
              </FooterLink>

              <FooterLink href="/staff/teaching">
                Teaching Staff
              </FooterLink>

              <a
                href="tel:+918638288752"
                className="inline-flex items-center gap-2 text-sm text-white/65 transition hover:text-white"
              >
                <Phone size={14} />

                +91 8638288752
              </a>

            </div>

          </div>

        </div>


        {/* =====================================================
            BOTTOM
        ===================================================== */}

        <div className="mt-9 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-xs text-white/40">
            © 2026 {schoolInfo.schoolName}. All rights reserved.
          </p>


          <p className="text-xs text-white/40">
            Designed with care by{" "}
            <span className="font-medium text-white/60">
              KT Assam
            </span>
          </p>

        </div>

      </div>

    </footer>
  );
};


/* =========================================================
   FOOTER LINK
========================================================= */

function FooterLink({
  href,
  children,
}) {

  return (
    <Link
      href={href}
      className="group inline-flex w-fit items-center gap-1.5 text-sm text-white/65 transition-all duration-200 hover:translate-x-0.5 hover:text-white"
    >

      <span>
        {children}
      </span>

      <ArrowUpRight
        size={12}
        className="opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-60"
      />

    </Link>
  );
}


export default Footer;