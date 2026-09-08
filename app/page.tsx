"use client";

import { useState } from "react";

const alterationOptions = [
  {
    title: "Too Long",
    description: "Pants, sleeves, dresses or shirts need shortening.",
  },
  {
    title: "Too Loose",
    description: "The garment feels loose around the waist, chest or body.",
  },
  {
    title: "Too Tight",
    description: "You need more room or adjustment for a better fit.",
  },
  {
    title: "Sleeves",
    description: "Sleeves are too long, short or need reshaping.",
  },
  {
    title: "Waist",
    description: "Waist needs to be taken in or let out.",
  },
  {
    title: "Shoulders",
    description: "Shoulders don't sit correctly or need adjustment.",
  },
  {
    title: "Zipper / Repair",
    description: "Broken zipper, button, seam or minor garment repair.",
  },
  {
    title: "Something Else",
    description: "Not sure what alteration you need? We'll assess it.",
  },
];

const steps = [
  {
    number: "01",
    title: "Book a visit",
    description:
      "Tell us what garment needs attention and choose a convenient time.",
  },
  {
    number: "02",
    title: "Meet your Fit Consultant",
    description:
      "A trained consultant visits your home, checks the fit and takes the required measurements.",
  },
  {
    number: "03",
    title: "We alter it",
    description:
      "Your garment goes to our tailoring specialist for the required work.",
  },
  {
    number: "04",
    title: "Delivered back",
    description:
      "After a quality check, your garment is returned to your doorstep.",
  },
];

const services = [
  "Trouser & Jeans Alteration",
  "Shirt Alteration",
  "T-shirt Alteration",
  "Dress Alteration",
  "Sleeve Adjustment",
  "Waist Adjustment",
  "Length Adjustment",
  "Zipper & Minor Repairs",
];

export default function Home() {
  const [selectedAlteration, setSelectedAlteration] = useState("");
  const [showBooking, setShowBooking] = useState(false);

  const handleBook = () => {
    setShowBooking(true);

    setTimeout(() => {
      document
        .getElementById("booking")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <main className="min-h-screen bg-[#f7f5f0] text-[#171717]">
      {/* NAVBAR */}
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-black/10 bg-[#f7f5f0]/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          <a
            href="#top"
            className="text-xl font-semibold tracking-[0.22em]"
          >
            FIT
          </a>

          <div className="hidden items-center gap-8 text-sm md:flex">
            <a href="#how-it-works" className="hover:opacity-60">
              How It Works
            </a>
            <a href="#services" className="hover:opacity-60">
              Services
            </a>
            <a href="#fit-check" className="hover:opacity-60">
              Fit Check
            </a>
          </div>

          <button
            onClick={handleBook}
            className="rounded-full bg-[#171717] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-black/80"
          >
            Book a Visit
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section id="top" className="px-6 pb-20 pt-36 lg:px-10 lg:pt-44">
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-black/50">
              Doorstep Clothing Alterations
            </p>

            <h1 className="max-w-4xl text-5xl font-medium leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-8xl">
              Perfect fit.
              <br />
              Without the
              <br />
              tailor trip.
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-black/60">
              A professional Fit Consultant comes to your doorstep, understands
              what is wrong with the fit, and gets your clothes altered by a
              tailoring specialist.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleBook}
                className="rounded-full bg-[#171717] px-7 py-4 text-sm font-medium text-white transition hover:bg-black/80"
              >
                Book a Fit Consultation →
              </button>

              <a
                href="#fit-check"
                className="rounded-full border border-black/20 px-7 py-4 text-center text-sm font-medium transition hover:bg-black hover:text-white"
              >
                Check My Fit
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-xs uppercase tracking-[0.15em] text-black/45">
              <span>Doorstep</span>
              <span>Professional</span>
              <span>Quality Checked</span>
            </div>
          </div>

          {/* HERO VISUAL */}
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-[2rem] bg-[#ded9cf]">
              <div className="flex h-full flex-col items-center justify-center px-10 text-center">
                <div className="mb-8 text-7xl">✂</div>

                <p className="text-xs uppercase tracking-[0.3em] text-black/40">
                  Your clothes
                </p>

                <p className="mt-4 max-w-sm text-3xl font-medium tracking-tight">
                  Your fit.
                  <br />
                  Your doorstep.
                </p>

                <div className="mt-10 h-px w-24 bg-black/20" />

                <p className="mt-6 max-w-xs text-sm leading-6 text-black/50">
                  From measurement to final quality check, we take care of the
                  process.
                </p>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-black/10 bg-white p-5 shadow-xl sm:block">
              <p className="text-[10px] uppercase tracking-[0.2em] text-black/40">
                Service
              </p>
              <p className="mt-1 text-sm font-medium">
                Fit-first alterations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="border-y border-black/10 bg-white px-6 py-24 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-black/40">
              The problem
            </p>

            <h2 className="mt-5 max-w-md text-4xl font-medium tracking-tight sm:text-5xl">
              Getting clothes altered shouldn't be a task.
            </h2>
          </div>

          <div className="max-w-2xl text-lg leading-8 text-black/60">
            <p>
              You buy something you like. You try it on. Something doesn't
              quite fit.
            </p>

            <p className="mt-6">
              Then comes the annoying part — finding a tailor, travelling
              there, explaining what needs changing, leaving your clothes,
              coming back again and hoping the alteration was done correctly.
            </p>

            <p className="mt-6 font-medium text-black">
              We believe the fitting experience should come to you.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="px-6 py-24 lg:px-10 lg:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-black/40">
              How it works
            </p>

            <h2 className="mt-5 text-4xl font-medium tracking-tight sm:text-6xl">
              Simple from
              <br />
              start to finish.
            </h2>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-black/10 bg-black/10 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div key={step.number} className="bg-[#f7f5f0] p-8 lg:p-9">
                <p className="text-xs font-semibold tracking-[0.2em] text-black/35">
                  {step.number}
                </p>

                <h3 className="mt-16 text-xl font-medium">{step.title}</h3>

                <p className="mt-4 text-sm leading-6 text-black/55">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FIT CHECK */}
      <section
        id="fit-check"
        className="bg-[#171717] px-6 py-24 text-white lg:px-10 lg:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40">
              Fit diagnostic
            </p>

            <h2 className="mt-5 text-4xl font-medium tracking-tight sm:text-6xl">
              What's wrong
              <br />
              with your fit?
            </h2>

            <p className="mt-6 max-w-xl text-base leading-7 text-white/55">
              Select the problem you're experiencing. We'll help you understand
              what kind of alteration may be required.
            </p>
          </div>

          <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {alterationOptions.map((option) => {
              const selected = selectedAlteration === option.title;

              return (
                <button
                  key={option.title}
                  onClick={() => setSelectedAlteration(option.title)}
                  className={`rounded-2xl border p-6 text-left transition ${
                    selected
                      ? "border-white bg-white text-black"
                      : "border-white/15 bg-white/[0.03] hover:border-white/40"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-medium">{option.title}</h3>

                    <span className="text-lg">↗</span>
                  </div>

                  <p
                    className={`mt-5 text-sm leading-6 ${
                      selected ? "text-black/55" : "text-white/45"
                    }`}
                  >
                    {option.description}
                  </p>
                </button>
              );
            })}
          </div>

          {selectedAlteration && (
            <div className="mt-8 rounded-2xl border border-white/15 bg-white/[0.05] p-7">
              <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                Selected
              </p>

              <div className="mt-3 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                <div>
                  <h3 className="text-xl font-medium">
                    {selectedAlteration}
                  </h3>

                  <p className="mt-2 text-sm text-white/50">
                    Bring the garment to your consultation. Our Fit Consultant
                    will assess the exact alteration required.
                  </p>
                </div>

                <button
                  onClick={handleBook}
                  className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black"
                >
                  Book a Fit Check →
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="bg-white px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-black/40">
                Services
              </p>

              <h2 className="mt-5 text-4xl font-medium tracking-tight sm:text-5xl">
                From small fixes to a better fit.
              </h2>

              <p className="mt-6 max-w-md text-base leading-7 text-black/55">
                Whether it's a pair of jeans that needs shortening or a shirt
                that doesn't sit right, we'll assess the garment and recommend
                the appropriate alteration.
              </p>
            </div>

            <div className="grid border-t border-black/10 sm:grid-cols-2">
              {services.map((service, index) => (
                <div
                  key={service}
                  className="flex items-center justify-between border-b border-black/10 py-6"
                >
                  <span className="text-base">{service}</span>

                  <span className="text-black/30">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DIFFERENTIATOR */}
      <section className="px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[2rem] bg-[#ded9cf] px-7 py-16 sm:px-12 lg:px-20 lg:py-20">
            <div className="grid gap-14 lg:grid-cols-[1fr_0.8fr] lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-black/40">
                  Why we're different
                </p>

                <h2 className="mt-5 max-w-2xl text-4xl font-medium tracking-tight sm:text-6xl">
                  Not just a tailor pickup service.
                </h2>
              </div>

              <div className="text-base leading-7 text-black/55">
                <p>
                  The experience starts with understanding the fit — not simply
                  collecting a garment and sending it somewhere.
                </p>

                <p className="mt-5">
                  Our Fit Consultants are trained to identify what needs to
                  change and communicate it clearly before the alteration is
                  done.
                </p>
              </div>
            </div>

            <div className="mt-16 grid gap-8 border-t border-black/10 pt-8 sm:grid-cols-3">
              <div>
                <p className="text-lg font-medium">01</p>
                <p className="mt-3 text-sm text-black/55">
                  Fit assessment at your doorstep
                </p>
              </div>

              <div>
                <p className="text-lg font-medium">02</p>
                <p className="mt-3 text-sm text-black/55">
                  Skilled tailoring specialist
                </p>
              </div>

              <div>
                <p className="text-lg font-medium">03</p>
                <p className="mt-3 text-sm text-black/55">
                  Quality check before delivery
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section
        id="booking"
        className="border-t border-black/10 bg-white px-6 py-24 lg:px-10 lg:py-32"
      >
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-black/40">
              Get started
            </p>

            <h2 className="mt-5 text-4xl font-medium tracking-tight sm:text-6xl">
              Ready for a better fit?
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-black/55">
              Book a doorstep fit consultation. We'll understand the garment,
              assess the alteration and take it from there.
            </p>
          </div>

          <form
            className="mx-auto mt-14 max-w-2xl space-y-5"
            onSubmit={(event) => {
              event.preventDefault();
              alert(
                "Thanks! Your request has been received. We'll contact you shortly."
              );
            }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <input
                required
                type="text"
                placeholder="Your name"
                className="w-full rounded-xl border border-black/15 bg-[#f7f5f0] px-5 py-4 outline-none transition placeholder:text-black/35 focus:border-black"
              />

              <input
                required
                type="tel"
                placeholder="Phone number"
                className="w-full rounded-xl border border-black/15 bg-[#f7f5f0] px-5 py-4 outline-none transition placeholder:text-black/35 focus:border-black"
              />
            </div>

            <input
              type="text"
              placeholder="Area / locality"
              className="w-full rounded-xl border border-black/15 bg-[#f7f5f0] px-5 py-4 outline-none transition placeholder:text-black/35 focus:border-black"
            />

            <select
              value={selectedAlteration}
              onChange={(event) => setSelectedAlteration(event.target.value)}
              className="w-full appearance-none rounded-xl border border-black/15 bg-[#f7f5f0] px-5 py-4 outline-none focus:border-black"
            >
              <option value="">What do you need help with?</option>

              {alterationOptions.map((option) => (
                <option key={option.title} value={option.title}>
                  {option.title}
                </option>
              ))}
            </select>

            <textarea
              rows={4}
              placeholder="Tell us briefly what isn't fitting correctly..."
              className="w-full resize-none rounded-xl border border-black/15 bg-[#f7f5f0] px-5 py-4 outline-none transition placeholder:text-black/35 focus:border-black"
            />

            <button
              type="submit"
              className="w-full rounded-xl bg-[#171717] px-6 py-4 font-medium text-white transition hover:bg-black/80"
            >
              Request a Fit Consultation →
            </button>

            <p className="text-center text-xs text-black/35">
              We'll contact you to confirm availability and the consultation
              details.
            </p>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#171717] px-6 py-14 text-white lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <p className="text-xl font-semibold tracking-[0.22em]">FIT</p>

            <p className="mt-3 text-sm text-white/40">
              Perfect fit. Without the tailor trip.
            </p>
          </div>

          <div className="text-sm text-white/40">
            © {new Date().getFullYear()} FIT. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
