"use client";

import { useEffect, useState } from "react";

type BookingData = {
  garment: string;
  issue: string;
  name: string;
  phone: string;
  area: string;
};

const problems = [
  {
    number: "01",
    title: "Traffic",
    description: "Waste time on the road for a simple alteration.",
    icon: "↗",
  },
  {
    number: "02",
    title: "Parking",
    description: "Find parking just to walk into a tailor shop.",
    icon: "⌖",
  },
  {
    number: "03",
    title: "Crowds",
    description: "Cramped shops, queues and waiting around.",
    icon: "◌",
  },
  {
    number: "04",
    title: "Waiting",
    description: "Leave your clothes behind and wait for days.",
    icon: "◷",
  },
  {
    number: "05",
    title: "Explaining Again",
    description: "Try to explain exactly what doesn't feel right.",
    icon: "⌁",
  },
  {
    number: "06",
    title: "Multiple Visits",
    description: "Go there. Leave it. Come back. Repeat.",
    icon: "↻",
  },
];

const steps = [
  {
    number: "01",
    title: "Book a Visit",
    description: "Tell us what needs attention in just a few taps.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=85",
  },
  {
    number: "02",
    title: "We Come to You",
    description:
      "A trained LinearEra Fit Consultant visits your doorstep.",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=85",
  },
  {
    number: "03",
    title: "We Alter",
    description:
      "Your garment goes to our tailoring specialist for the work.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=85",
  },
  {
    number: "04",
    title: "We Deliver",
    description:
      "After a quality check, your garment comes back to you.",
    image:
      "https://images.unsplash.com/photo-1598032895397-b9472444bf93?auto=format&fit=crop&w=900&q=85",
  },
];

const garments = [
  {
    id: "pants",
    name: "Pants / Jeans",
    symbol: "01",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: "shirt",
    name: "Shirt",
    symbol: "02",
    image:
      "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: "dress",
    name: "Dress",
    symbol: "03",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: "tshirt",
    name: "T-shirt",
    symbol: "04",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: "jacket",
    name: "Jacket",
    symbol: "05",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: "repair",
    name: "Repair",
    symbol: "06",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=700&q=85",
  },
];

const issues = [
  "Too long",
  "Too loose",
  "Too tight",
  "Waist",
  "Sleeves",
  "Shoulders",
  "Zipper / Repair",
  "Something else",
];

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);

  const [booking, setBooking] = useState<BookingData>({
    garment: "",
    issue: "",
    name: "",
    phone: "",
    area: "",
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (bookingOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [bookingOpen]);

  const openBooking = () => {
    setBookingOpen(true);
    setBookingStep(1);
    setSubmitted(false);
  };

  const closeBooking = () => {
    setBookingOpen(false);
  };

  const selectGarment = (garment: string) => {
    setBooking((previous) => ({
      ...previous,
      garment,
    }));

    setBookingStep(2);
  };

  const selectIssue = (issue: string) => {
    setBooking((previous) => ({
      ...previous,
      issue,
    }));

    setBookingStep(3);
  };

  const submitBooking = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <main className="min-h-screen overflow-hidden bg-[#f6f1e8] text-[#171613]">
        {/* NAVBAR */}
        <header className="fixed left-0 right-0 top-0 z-40 border-b border-black/[0.08] bg-[#f6f1e8]/90 backdrop-blur-xl">
          <div className="mx-auto flex h-[74px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
            <a href="#top" className="group">
              <div className="font-serif text-[25px] leading-none tracking-[-0.04em]">
                LinearEra
              </div>
              <div className="mt-1 text-[7px] font-medium uppercase tracking-[0.38em] text-black/50">
                Fit lives better
              </div>
            </a>

            <nav className="hidden items-center gap-9 text-[13px] lg:flex">
              <a
                href="#why"
                className="transition-opacity hover:opacity-50"
              >
                Why LinearEra
              </a>
              <a
                href="#how"
                className="transition-opacity hover:opacity-50"
              >
                How It Works
              </a>
              <a
                href="#services"
                className="transition-opacity hover:opacity-50"
              >
                Services
              </a>
              <a
                href="#fit"
                className="transition-opacity hover:opacity-50"
              >
                Fit Check
              </a>
            </nav>

            <button
              onClick={openBooking}
              className="group flex items-center gap-3 rounded-full bg-[#171613] px-5 py-3 text-[12px] font-medium text-white transition hover:scale-[1.02]"
            >
              Book a Fit Visit
              <span className="text-[#e8d0a7] transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>
        </header>

        {/* HERO */}
        <section id="top" className="relative pt-[74px]">
          <div className="mx-auto grid min-h-[calc(100vh-74px)] max-w-[1440px] lg:grid-cols-[0.88fr_1.12fr]">
            <div className="relative z-10 flex flex-col justify-center px-6 py-20 sm:px-10 lg:px-14 xl:px-20">
              <div className="hero-reveal">
                <div className="mb-7 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-black/45">
                  <span className="h-px w-8 bg-[#b8945f]" />
                  Doorstep clothing alterations
                </div>

                <h1 className="max-w-[700px] font-serif text-[60px] leading-[0.86] tracking-[-0.055em] sm:text-[78px] lg:text-[88px] xl:text-[104px]">
                  Stop going
                  <br />
                  to <span className="text-[#ae8750]">tailors.</span>
                </h1>

                <p className="mt-9 max-w-[510px] text-[17px] leading-7 text-black/58 sm:text-[19px]">
                  Professional clothing alterations, brought to your
                  doorstep. A trained Fit Consultant understands the fit,
                  measures your garment and gets it altered by a tailoring
                  specialist.
                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={openBooking}
                    className="group inline-flex items-center justify-center gap-4 rounded-full bg-[#171613] px-7 py-4 text-[13px] font-medium text-white transition hover:-translate-y-0.5"
                  >
                    Book a Fit Visit
                    <span className="text-[#e8d0a7] transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </button>

                  <a
                    href="#fit"
                    className="inline-flex items-center justify-center rounded-full border border-black/20 px-7 py-4 text-[13px] font-medium transition hover:bg-[#171613] hover:text-white"
                  >
                    I don't know what's wrong
                  </a>
                </div>

                <div className="mt-12 flex flex-wrap gap-x-7 gap-y-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-black/40">
                  <span>Doorstep</span>
                  <span>Fit Consultant</span>
                  <span>Quality Checked</span>
                  <span>2–3 Day Service</span>
                </div>
              </div>
            </div>

            {/* HERO IMAGE */}
            <div className="relative min-h-[600px] overflow-hidden lg:min-h-0">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1800&q=90')",
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-r from-[#f6f1e8] via-transparent to-transparent lg:from-[#f6f1e8]/50" />

              <div className="absolute bottom-7 right-7 max-w-[220px] border border-white/30 bg-black/45 p-5 text-white backdrop-blur-md sm:bottom-10 sm:right-10">
                <p className="text-[8px] uppercase tracking-[0.25em] text-white/55">
                  LinearEra
                </p>
                <p className="mt-2 font-serif text-[22px] leading-tight">
                  Your clothes.
                  <br />
                  Your fit.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PROBLEM */}
        <section
          id="why"
          className="border-y border-black/[0.08] bg-[#ebe4d8] px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
        >
          <div className="mx-auto max-w-[1320px]">
            <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
              <div>
                <div className="flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.28em] text-black/40">
                  <span className="h-px w-7 bg-[#b8945f]" />
                  The old way
                </div>

                <h2 className="mt-5 max-w-[500px] font-serif text-[48px] leading-[0.94] tracking-[-0.04em] sm:text-[65px]">
                  Tired of the
                  <br />
                  same old
                  <br />
                  <span className="italic">tailor experience?</span>
                </h2>
              </div>

              <div>
                <p className="max-w-[650px] text-[18px] leading-8 text-black/55">
                  For a simple alteration, you shouldn't have to reorganize
                  your day. But that's exactly what the traditional experience
                  often demands.
                </p>
              </div>
            </div>

            <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {problems.map((problem) => (
                <div
                  key={problem.number}
                  className="problem-card group relative overflow-hidden rounded-2xl border border-black/[0.08] bg-[#f6f1e8] p-6 sm:p-7"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-[9px] font-semibold tracking-[0.25em] text-black/30">
                      {problem.number}
                    </span>

                    <span className="text-xl text-[#ae8750]">
                      {problem.icon}
                    </span>
                  </div>

                  <div className="mt-14">
                    <h3 className="font-serif text-[28px]">{problem.title}</h3>

                    <p className="mt-3 max-w-[280px] text-[13px] leading-6 text-black/50">
                      {problem.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <p className="font-serif text-[30px] italic sm:text-[40px]">
                All this... for a simple alteration?
              </p>

              <div className="mx-auto mt-7 h-12 w-px bg-[#b8945f]" />

              <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-black/40">
                There has to be a better way.
              </p>
            </div>
          </div>
        </section>

        {/* SOLUTION */}
        <section className="relative overflow-hidden bg-[#171613] px-5 py-24 text-white sm:px-8 lg:px-12 lg:py-32">
          <div className="pointer-events-none absolute right-[-160px] top-[-180px] h-[450px] w-[450px] rounded-full border border-[#c8a46a]/10" />
          <div className="pointer-events-none absolute right-[-90px] top-[-110px] h-[310px] w-[310px] rounded-full border border-[#c8a46a]/10" />

          <div className="relative mx-auto max-w-[1320px]">
            <div className="max-w-[750px]">
              <div className="flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.28em] text-white/35">
                <span className="h-px w-7 bg-[#c8a46a]" />
                The LinearEra way
              </div>

              <h2 className="mt-6 font-serif text-[52px] leading-[0.92] tracking-[-0.04em] sm:text-[72px]">
                So why go
                <br />
                <span className="text-[#d7b982]">through all that?</span>
              </h2>

              <p className="mt-7 max-w-[550px] text-[16px] leading-7 text-white/50">
                We bring the fitting experience to you — from the first
                measurement to the final quality check.
              </p>
            </div>

            {/* PROCESS */}
            <div
              id="how"
              className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 lg:grid-cols-4"
            >
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="group relative min-h-[390px] overflow-hidden bg-[#1d1c19]"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-35 transition duration-700 group-hover:scale-105 group-hover:opacity-55"
                    style={{
                      backgroundImage: `url('${step.image}')`,
                    }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#171613] via-[#171613]/60 to-transparent" />

                  <div className="relative flex h-full flex-col justify-between p-7">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-[28px] text-[#d7b982]">
                        {step.number}
                      </span>

                      {step.number !== "04" && (
                        <span className="text-xl text-white/30">→</span>
                      )}
                    </div>

                    <div>
                      <h3 className="font-serif text-[30px]">{step.title}</h3>

                      <p className="mt-3 text-[13px] leading-6 text-white/50">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-14 flex flex-col justify-between gap-7 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
              <p className="max-w-[600px] text-[13px] leading-6 text-white/40">
                No crowded shop. No parking hunt. No unnecessary waiting.
                Just a better way to get your clothes fitting right.
              </p>

              <button
                onClick={openBooking}
                className="group inline-flex items-center gap-3 text-[12px] font-medium"
              >
                Book your doorstep visit
                <span className="text-[#d7b982] transition-transform group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* FIT SECTION */}
        <section
          id="fit"
          className="bg-[#f6f1e8] px-5 py-24 sm:px-8 lg:px-12 lg:py-32"
        >
          <div className="mx-auto max-w-[1320px]">
            <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
              <div>
                <div className="flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.28em] text-black/40">
                  <span className="h-px w-7 bg-[#b8945f]" />
                  Fit diagnostic
                </div>

                <h2 className="mt-6 font-serif text-[50px] leading-[0.92] tracking-[-0.04em] sm:text-[70px]">
                  What needs
                  <br />
                  <span className="italic">fixing?</span>
                </h2>
              </div>

              <p className="max-w-[520px] text-[16px] leading-7 text-black/50 lg:justify-self-end">
                Choose your garment. We'll help you identify what needs to
                change — even if you don't know the tailoring term for it.
              </p>
            </div>

            <div
              id="services"
              className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
            >
              {garments.map((garment) => (
                <button
                  key={garment.id}
                  onClick={() => selectGarment(garment.name)}
                  className="group overflow-hidden rounded-2xl border border-black/10 bg-white text-left transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative aspect-[0.82] overflow-hidden">
                    <img
                      src={garment.image}
                      alt={garment.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                    <span className="absolute bottom-3 left-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/70">
                      {garment.symbol}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-4">
                    <span className="text-[12px] font-medium">
                      {garment.name}
                    </span>

                    <span className="text-[#ae8750] transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-7 flex flex-col items-center justify-between gap-5 rounded-3xl bg-[#293024] px-7 py-8 text-white sm:flex-row sm:px-10">
              <div>
                <p className="font-serif text-[26px]">
                  Not sure what's wrong?
                </p>
                <p className="mt-1 text-[12px] text-white/45">
                  Show us. We'll figure it out together.
                </p>
              </div>

              <button
                onClick={openBooking}
                className="rounded-full bg-[#e8d0a7] px-6 py-3.5 text-[12px] font-semibold text-[#171613] transition hover:scale-[1.02]"
              >
                Upload a Garment Photo →
              </button>
            </div>
          </div>
        </section>

        {/* BEFORE AFTER */}
        <section className="border-y border-black/[0.08] bg-[#e9e1d4] px-5 py-24 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-[1320px]">
            <div className="grid gap-10 lg:grid-cols-[0.55fr_1.45fr] lg:items-end">
              <div>
                <div className="flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.28em] text-black/40">
                  <span className="h-px w-7 bg-[#b8945f]" />
                  The difference
                </div>

                <h2 className="mt-5 font-serif text-[48px] leading-[0.94] tracking-[-0.04em] sm:text-[65px]">
                  Real clothes.
                  <br />
                  <span className="italic">Better fit.</span>
                </h2>
              </div>

              <p className="max-w-[480px] text-[15px] leading-7 text-black/50 lg:justify-self-end">
                The right alteration doesn't change who you are. It simply
                lets the garment sit the way it was meant to.
              </p>
            </div>

            <div className="mt-14 grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Trouser Length",
                  before:
                    "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&w=900&q=85",
                  after:
                    "https://images.unsplash.com/photo-1506629905607-d9e9a2c8e9f1?auto=format&fit=crop&w=900&q=85",
                },
                {
                  title: "Shirt Fit",
                  before:
                    "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=900&q=85",
                  after:
                    "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=85",
                },
                {
                  title: "Silhouette",
                  before:
                    "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=900&q=85",
                  after:
                    "https://images.unsplash.com/photo-1612722432474-b971cdcea546?auto=format&fit=crop&w=900&q=85",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="overflow-hidden rounded-2xl bg-[#f6f1e8]"
                >
                  <div className="grid grid-cols-2">
                    <div className="relative aspect-[0.8]">
                      <img
                        src={item.before}
                        alt={`${item.title} before`}
                        className="h-full w-full object-cover grayscale"
                      />
                      <span className="absolute bottom-3 left-3 bg-black/65 px-2 py-1 text-[8px] font-semibold uppercase tracking-[0.18em] text-white">
                        Before
                      </span>
                    </div>

                    <div className="relative aspect-[0.8]">
                      <img
                        src={item.after}
                        alt={`${item.title} after`}
                        className="h-full w-full object-cover"
                      />
                      <span className="absolute bottom-3 left-3 bg-[#e8d0a7] px-2 py-1 text-[8px] font-semibold uppercase tracking-[0.18em] text-[#171613]">
                        After
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-5">
                    <span className="font-serif text-[21px]">
                      {item.title}
                    </span>

                    <span className="text-[9px] uppercase tracking-[0.18em] text-black/35">
                      Fit
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="font-serif text-[28px] italic sm:text-[38px]">
                The difference is in the fit.
              </p>
            </div>
          </div>
        </section>

        {/* BRANDS */}
        <section className="bg-[#f6f1e8] px-5 py-20 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-[1320px]">
            <div className="grid gap-8 md:grid-cols-[0.7fr_1.3fr] md:items-center">
              <div>
                <p className="font-serif text-[29px] leading-tight">
                  From your favourite brands
                  <br />
                  to your wardrobe.
                </p>

                <p className="mt-3 text-[12px] text-black/45">
                  We make it fit.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-5 border-y border-black/10 py-8 text-center sm:grid-cols-5">
                {["ZARA", "H&M", "MYNTRA", "UNIQLO", "AJIO"].map(
                  (brand) => (
                    <div
                      key={brand}
                      className="flex items-center justify-center font-semibold tracking-[-0.04em] text-black/55"
                    >
                      {brand}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="relative overflow-hidden bg-[#171613] px-5 py-24 text-white sm:px-8 lg:px-12 lg:py-32">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-25"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1800&q=85')",
            }}
          />

          <div className="absolute inset-0 bg-[#171613]/65" />

          <div className="relative mx-auto max-w-[900px] text-center">
            <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#d7b982]">
              Your next alteration
            </p>

            <h2 className="mt-6 font-serif text-[52px] leading-[0.9] tracking-[-0.045em] sm:text-[80px]">
              Got something
              <br />
              that doesn't fit?
            </h2>

            <p className="mx-auto mt-7 max-w-[500px] text-[15px] leading-7 text-white/50">
              A better fit is just a doorstep visit away.
            </p>

            <button
              onClick={openBooking}
              className="group mt-9 inline-flex items-center gap-4 rounded-full bg-[#e8d0a7] px-8 py-4 text-[13px] font-semibold text-[#171613] transition hover:-translate-y-0.5"
            >
              Book a Fit Visit
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>

            <p className="mt-5 text-[9px] uppercase tracking-[0.2em] text-white/30">
              No payment required now
            </p>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-[#11100e] px-5 py-12 text-white sm:px-8 lg:px-12">
          <div className="mx-auto flex max-w-[1320px] flex-col justify-between gap-10 sm:flex-row sm:items-end">
            <div>
              <div className="font-serif text-[27px]">LinearEra</div>
              <p className="mt-2 text-[8px] uppercase tracking-[0.32em] text-white/35">
                Fit lives better
              </p>
            </div>

            <div className="flex flex-wrap gap-6 text-[10px] uppercase tracking-[0.15em] text-white/35">
              <a href="#why" className="hover:text-white">
                Why LinearEra
              </a>
              <a href="#how" className="hover:text-white">
                How It Works
              </a>
              <a href="#fit" className="hover:text-white">
                Fit Check
              </a>
              <button onClick={openBooking} className="hover:text-white">
                Book
              </button>
            </div>

            <p className="text-[9px] text-white/25">
              © {new Date().getFullYear()} LinearEra
            </p>
          </div>
        </footer>
      </main>

      {/* MOBILE STICKY CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-black/10 bg-[#f6f1e8]/95 p-3 backdrop-blur-xl sm:hidden">
        <button
          onClick={openBooking}
          className="flex w-full items-center justify-center gap-3 rounded-full bg-[#171613] py-3.5 text-[12px] font-semibold text-white"
        >
          Book a Fit Visit
          <span className="text-[#e8d0a7]">→</span>
        </button>
      </div>

      {/* BOOKING MODAL */}
      {bookingOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-5">
          <div className="relative max-h-[94vh] w-full max-w-[620px] overflow-y-auto rounded-t-[28px] bg-[#f6f1e8] shadow-2xl sm:rounded-[28px]">
            {/* MODAL HEADER */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-black/10 bg-[#f6f1e8]/95 px-6 py-5 backdrop-blur-xl sm:px-8">
              <div>
                <p className="font-serif text-[22px]">Book a Fit Visit</p>

                {!submitted && (
                  <div className="mt-2 flex gap-1">
                    {[1, 2, 3].map((step) => (
                      <span
                        key={step}
                        className={`h-1 rounded-full transition-all ${
                          bookingStep >= step
                            ? "w-10 bg-[#ae8750]"
                            : "w-5 bg-black/10"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={closeBooking}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-lg transition hover:bg-black hover:text-white"
                aria-label="Close booking"
              >
                ×
              </button>
            </div>

            {/* SUCCESS */}
            {submitted ? (
              <div className="px-7 py-20 text-center sm:px-10">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#293024] text-2xl text-[#e8d0a7]">
                  ✓
                </div>

                <p className="mt-8 text-[9px] font-semibold uppercase tracking-[0.28em] text-black/35">
                  Request received
                </p>

                <h3 className="mt-4 font-serif text-[42px] leading-none">
                  You're almost there.
                </h3>

                <p className="mx-auto mt-6 max-w-[390px] text-[14px] leading-7 text-black/50">
                  We'll contact you shortly to confirm your Fit Visit,
                  location and service details.
                </p>

                <button
                  onClick={closeBooking}
                  className="mt-9 rounded-full bg-[#171613] px-7 py-3.5 text-[12px] font-medium text-white"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                {/* STEP 1 */}
                {bookingStep === 1 && (
                  <div className="px-6 py-8 sm:px-8 sm:py-10">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-black/35">
                      Step 01
                    </p>

                    <h3 className="mt-4 font-serif text-[39px] leading-[0.95]">
                      What are we
                      <br />
                      fixing?
                    </h3>

                    <p className="mt-4 text-[13px] leading-6 text-black/45">
                      Choose the garment that needs attention.
                    </p>

                    <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {garments.map((garment) => (
                        <button
                          key={garment.id}
                          onClick={() => selectGarment(garment.name)}
                          className="group overflow-hidden rounded-xl border border-black/10 bg-white text-left transition hover:border-[#ae8750] hover:shadow-md"
                        >
                          <div className="aspect-square overflow-hidden">
                            <img
                              src={garment.image}
                              alt={garment.name}
                              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            />
                          </div>

                          <div className="flex items-center justify-between p-3">
                            <span className="text-[11px] font-medium">
                              {garment.name}
                            </span>
                            <span className="text-[#ae8750]">→</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 2 */}
                {bookingStep === 2 && (
                  <div className="px-6 py-8 sm:px-8 sm:py-10">
                    <button
                      onClick={() => setBookingStep(1)}
                      className="text-[10px] uppercase tracking-[0.2em] text-black/35 hover:text-black"
                    >
                      ← Back
                    </button>

                    <p className="mt-8 text-[9px] font-semibold uppercase tracking-[0.25em] text-black/35">
                      Step 02
                    </p>

                    <h3 className="mt-4 font-serif text-[39px] leading-[0.95]">
                      What's wrong
                      <br />
                      with the fit?
                    </h3>

                    <p className="mt-4 text-[13px] leading-6 text-black/45">
                      You don't need to know the tailoring term. Just choose
                      what feels wrong.
                    </p>

                    <div className="mt-8 grid gap-2">
                      {issues.map((issue) => (
                        <button
                          key={issue}
                          onClick={() => selectIssue(issue)}
                          className="flex items-center justify-between rounded-xl border border-black/10 bg-white px-5 py-4 text-left text-[13px] transition hover:border-[#ae8750] hover:bg-[#ebe4d8]"
                        >
                          <span>{issue}</span>
                          <span className="text-[#ae8750]">→</span>
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => selectIssue("Not sure")}
                      className="mt-4 w-full rounded-xl border border-dashed border-black/20 px-5 py-4 text-[12px] text-black/55 transition hover:border-[#ae8750]"
                    >
                      I don't know — let LinearEra check it
                    </button>
                  </div>
                )}

                {/* STEP 3 */}
                {bookingStep === 3 && (
                  <form
                    onSubmit={submitBooking}
                    className="px-6 py-8 sm:px-8 sm:py-10"
                  >
                    <button
                      type="button"
                      onClick={() => setBookingStep(2)}
                      className="text-[10px] uppercase tracking-[0.2em] text-black/35 hover:text-black"
                    >
                      ← Back
                    </button>

                    <p className="mt-8 text-[9px] font-semibold uppercase tracking-[0.25em] text-black/35">
                      Step 03
                    </p>

                    <h3 className="mt-4 font-serif text-[39px] leading-[0.95]">
                      Where should
                      <br />
                      we come?
                    </h3>

                    <div className="mt-7 rounded-2xl bg-[#ebe4d8] p-5">
                      <p className="text-[9px] uppercase tracking-[0.2em] text-black/35">
                        Your selection
                      </p>

                      <p className="mt-2 text-[13px] font-medium">
                        {booking.garment}
                        <span className="mx-2 text-black/25">·</span>
                        {booking.issue}
                      </p>
                    </div>

                    <div className="mt-6 space-y-4">
                      <div>
                        <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.15em] text-black/45">
                          Your name
                        </label>

                        <input
                          required
                          value={booking.name}
                          onChange={(event) =>
                            setBooking({
                              ...booking,
                              name: event.target.value,
                            })
                          }
                          placeholder="Enter your name"
                          className="w-full rounded-xl border border-black/10 bg-white px-5 py-4 text-[13px] outline-none transition placeholder:text-black/25 focus:border-[#ae8750]"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.15em] text-black/45">
                          Phone number
                        </label>

                        <input
                          required
                          type="tel"
                          value={booking.phone}
                          onChange={(event) =>
                            setBooking({
                              ...booking,
                              phone: event.target.value,
                            })
                          }
                          placeholder="Enter your phone number"
                          className="w-full rounded-xl border border-black/10 bg-white px-5 py-4 text-[13px] outline-none transition placeholder:text-black/25 focus:border-[#ae8750]"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.15em] text-black/45">
                          Area / locality
                        </label>

                        <input
                          required
                          value={booking.area}
                          onChange={(event) =>
                            setBooking({
                              ...booking,
                              area: event.target.value,
                            })
                          }
                          placeholder="e.g. Indiranagar"
                          className="w-full rounded-xl border border-black/10 bg-white px-5 py-4 text-[13px] outline-none transition placeholder:text-black/25 focus:border-[#ae8750]"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-[#171613] py-4 text-[13px] font-medium text-white transition hover:bg-black"
                    >
                      Request My Fit Visit
                      <span className="text-[#e8d0a7]">→</span>
                    </button>

                    <p className="mt-4 text-center text-[9px] leading-5 text-black/30">
                      No payment required now. We'll call to confirm your
                      appointment.
                    </p>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* ANIMATION STYLES */}
      <style jsx>{`
        @keyframes reveal {
          from {
            opacity: 0;
            transform: translateY(24px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-reveal {
          animation: reveal 0.9s ease-out both;
        }

        .problem-card {
          transition:
            transform 0.35s ease,
            box-shadow 0.35s ease,
            background-color 0.35s ease;
        }

        .problem-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 18px 45px rgba(23, 22, 19, 0.08);
          background-color: #f9f5ee;
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </>
  );
}
