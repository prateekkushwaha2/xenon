"use client";

import { useEffect, useMemo, useState } from "react";

/* =========================================================
   LINEARERA PRICING CONFIGURATION
   Change these values later after unit-economics validation.
   ========================================================= */

const PRICING = {
  garments: {
    "Pants / Jeans": 199,
    Shirt: 199,
    Dress: 299,
    "T-shirt": 149,
    Jacket: 399,
    Repair: 149,
  },

  bundleDiscounts: [
    { minimum: 5, discount: 20 },
    { minimum: 3, discount: 15 },
    { minimum: 2, discount: 10 },
    { minimum: 1, discount: 0 },
  ],
};

const getBundleDiscount = (count: number) => {
  return (
    PRICING.bundleDiscounts.find((item) => count >= item.minimum)
      ?.discount ?? 0
  );
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
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1000&q=85",
  },
  {
    number: "02",
    title: "We Come to You",
    description:
      "A trained LinearEra Fit Consultant visits your doorstep.",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=85",
  },
  {
    number: "03",
    title: "We Alter",
    description:
      "Your garment goes to our tailoring specialist for the work.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1000&q=85",
  },
  {
    number: "04",
    title: "We Deliver",
    description:
      "After a quality check, your garment comes back to you.",
    image:
      "https://images.unsplash.com/photo-1598032895397-b9472444bf93?auto=format&fit=crop&w=1000&q=85",
  },
];

const garments = [
  {
    id: "pants",
    name: "Pants / Jeans",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "shirt",
    name: "Shirt",
    image:
      "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "dress",
    name: "Dress",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "tshirt",
    name: "T-shirt",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "jacket",
    name: "Jacket",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "repair",
    name: "Repair",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=85",
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

type SelectedGarment = {
  id: string;
  name: string;
  issue: string;
};

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);

  const [orderType, setOrderType] = useState<"individual" | "group">(
    "individual"
  );

  const [selectedGarments, setSelectedGarments] = useState<
    SelectedGarment[]
  >([]);

  const [activeGarmentId, setActiveGarmentId] = useState<string | null>(
    null
  );

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");

  const [submitted, setSubmitted] = useState(false);

  const garmentCount = selectedGarments.length;

  const subtotal = useMemo(() => {
    return selectedGarments.reduce((total, item) => {
      return total + (PRICING.garments[item.name as keyof typeof PRICING.garments] ?? 0);
    }, 0);
  }, [selectedGarments]);

  const discountPercentage = getBundleDiscount(garmentCount);

  const discountAmount = Math.round(
    subtotal * (discountPercentage / 100)
  );

  const estimatedTotal = subtotal - discountAmount;

  useEffect(() => {
    document.body.style.overflow = bookingOpen ? "hidden" : "";

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

  const addGarment = (garment: (typeof garments)[number]) => {
    const exists = selectedGarments.find(
      (item) => item.id === garment.id
    );

    if (exists) {
      setActiveGarmentId(garment.id);
      setBookingStep(2);
      return;
    }

    const newGarment: SelectedGarment = {
      id: `${garment.id}-${Date.now()}`,
      name: garment.name,
      issue: "",
    };

    setSelectedGarments((current) => [...current, newGarment]);
    setActiveGarmentId(newGarment.id);
    setBookingStep(2);
  };

  const updateIssue = (issue: string) => {
    if (!activeGarmentId) return;

    setSelectedGarments((current) =>
      current.map((garment) =>
        garment.id === activeGarmentId
          ? { ...garment, issue }
          : garment
      )
    );

    setBookingStep(1);
  };

  const removeGarment = (id: string) => {
    setSelectedGarments((current) =>
      current.filter((item) => item.id !== id)
    );

    if (activeGarmentId === id) {
      setActiveGarmentId(null);
    }
  };

  const continueToDetails = () => {
    if (selectedGarments.length === 0) return;

    const incomplete = selectedGarments.find((item) => !item.issue);

    if (incomplete) {
      setActiveGarmentId(incomplete.id);
      setBookingStep(2);
      return;
    }

    setBookingStep(3);
  };

  const submitBooking = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <main className="min-h-screen overflow-hidden bg-[#f6f1e8] text-[#171613]">
        {/* =====================================================
            NAVBAR
        ====================================================== */}

        <header className="fixed left-0 right-0 top-0 z-40 border-b border-black/[0.08] bg-[#f6f1e8]/90 backdrop-blur-xl">
          <div className="mx-auto flex h-[74px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
            <a href="#top">
              <div className="font-serif text-[25px] leading-none tracking-[-0.04em]">
                LinearEra
              </div>

              <div className="mt-1 text-[7px] font-medium uppercase tracking-[0.38em] text-black/50">
                Fit lives better
              </div>
            </a>

            <nav className="hidden items-center gap-9 text-[13px] lg:flex">
              <a href="#why" className="transition-opacity hover:opacity-50">
                Why LinearEra
              </a>

              <a href="#how" className="transition-opacity hover:opacity-50">
                How It Works
              </a>

              <a
                href="#pricing"
                className="transition-opacity hover:opacity-50"
              >
                Pricing
              </a>

              <a href="#fit" className="transition-opacity hover:opacity-50">
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

        {/* =====================================================
            HERO
        ====================================================== */}

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
                </div>
              </div>
            </div>

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

        {/* =====================================================
            PROBLEM
        ====================================================== */}

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

              <p className="max-w-[650px] text-[18px] leading-8 text-black/55">
                For a simple alteration, you shouldn't have to reorganize
                your day. But that's exactly what the traditional experience
                often demands.
              </p>
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
                    <h3 className="font-serif text-[28px]">
                      {problem.title}
                    </h3>

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

        {/* =====================================================
            SOLUTION
        ====================================================== */}

        <section
          id="how"
          className="relative overflow-hidden bg-[#171613] px-5 py-24 text-white sm:px-8 lg:px-12 lg:py-32"
        >
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

            <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 lg:grid-cols-4">
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
                    <span className="font-serif text-[28px] text-[#d7b982]">
                      {step.number}
                    </span>

                    <div>
                      <h3 className="font-serif text-[30px]">
                        {step.title}
                      </h3>

                      <p className="mt-3 text-[13px] leading-6 text-white/50">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            PRICING
        ====================================================== */}

        <section
          id="pricing"
          className="bg-[#f6f1e8] px-5 py-24 sm:px-8 lg:px-12 lg:py-32"
        >
          <div className="mx-auto max-w-[1320px]">
            <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
              <div>
                <div className="flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.28em] text-black/40">
                  <span className="h-px w-7 bg-[#b8945f]" />
                  Transparent pricing
                </div>

                <h2 className="mt-6 font-serif text-[50px] leading-[0.92] tracking-[-0.04em] sm:text-[65px]">
                  Simple prices.
                  <br />
                  <span className="italic">Better together.</span>
                </h2>

                <p className="mt-6 max-w-[440px] text-[15px] leading-7 text-black/50">
                  Most alterations start from ₹149. Add more garments to the
                  same visit and unlock bundle savings.
                </p>
              </div>

              <div>
                <div className="overflow-hidden rounded-3xl border border-black/10 bg-white">
                  {Object.entries(PRICING.garments).map(
                    ([name, price], index) => (
                      <div
                        key={name}
                        className="flex items-center justify-between border-b border-black/10 px-6 py-5 last:border-b-0 sm:px-8"
                      >
                        <div className="flex items-center gap-5">
                          <span className="text-[9px] tracking-[0.2em] text-black/25">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <span className="text-[13px] font-medium">
                            {name}
                          </span>
                        </div>

                        <span className="font-serif text-[19px]">
                          ₹{price}+
                        </span>
                      </div>
                    )
                  )}
                </div>

                <div className="mt-4 rounded-3xl bg-[#293024] p-7 text-white sm:p-8">
                  <div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-center">
                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#d7b982]">
                        Bundle & save
                      </p>

                      <p className="mt-3 font-serif text-[27px]">
                        More clothes.
                        <br />
                        Better value.
                      </p>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      {[
                        ["1", "0%"],
                        ["2", "10%"],
                        ["3–4", "15%"],
                        ["5+", "20%"],
                      ].map(([count, discount]) => (
                        <div
                          key={count}
                          className="min-w-[58px] rounded-xl border border-white/10 bg-white/[0.05] px-3 py-3 text-center"
                        >
                          <p className="text-[11px] font-medium">{count}</p>
                          <p className="mt-1 text-[9px] text-[#d7b982]">
                            {discount}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* GROUP ORDER */}
            <div className="mt-5 overflow-hidden rounded-3xl border border-black/10 bg-[#ebe4d8]">
              <div className="grid lg:grid-cols-[1fr_0.8fr]">
                <div className="p-8 sm:p-10 lg:p-12">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-black/40">
                    Fit Together
                  </p>

                  <h3 className="mt-4 font-serif text-[38px] leading-[0.95] sm:text-[48px]">
                    Family, friends,
                    <br />
                    <span className="italic">roommates.</span>
                  </h3>

                  <p className="mt-5 max-w-[500px] text-[14px] leading-7 text-black/50">
                    Combine everyone's clothes into one doorstep visit. One
                    booking, shared convenience and bundle pricing.
                  </p>

                  <button
                    onClick={() => {
                      setOrderType("group");
                      openBooking();
                    }}
                    className="mt-7 rounded-full bg-[#171613] px-6 py-3.5 text-[12px] font-medium text-white"
                  >
                    Start a Group Order →
                  </button>
                </div>

                <div className="grid grid-cols-2 bg-[#293024] text-white">
                  <div className="flex flex-col justify-between border-r border-white/10 p-7 sm:p-9">
                    <span className="font-serif text-[38px] text-[#d7b982]">
                      01
                    </span>

                    <div>
                      <p className="font-serif text-[22px]">Dad</p>
                      <p className="mt-1 text-[11px] text-white/40">
                        2 garments
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between border-b border-white/10 p-7 sm:p-9">
                    <span className="font-serif text-[38px] text-[#d7b982]">
                      02
                    </span>

                    <div>
                      <p className="font-serif text-[22px]">Mom</p>
                      <p className="mt-1 text-[11px] text-white/40">
                        2 garments
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between border-r border-white/10 p-7 sm:p-9">
                    <span className="font-serif text-[38px] text-[#d7b982]">
                      03
                    </span>

                    <div>
                      <p className="font-serif text-[22px]">You</p>
                      <p className="mt-1 text-[11px] text-white/40">
                        3 garments
                      </p>
                    </div>
                  </div>

                  <div className="flex items-end justify-center p-7 sm:p-9">
                    <span className="font-serif text-[42px] text-[#d7b982]">
                      +7
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            FIT CHECK
        ====================================================== */}

        <section
          id="fit"
          className="border-y border-black/[0.08] bg-[#e9e1d4] px-5 py-24 sm:px-8 lg:px-12 lg:py-32"
        >
          <div className="mx-auto max-w-[1320px]">
            <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
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
                Don't know the tailoring term? You don't need to. Tell us what
                feels wrong and we'll assess it.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {garments.map((garment) => (
                <button
                  key={garment.id}
                  onClick={() => {
                    openBooking();
                    addGarment(garment);
                  }}
                  className="group overflow-hidden rounded-2xl border border-black/10 bg-white text-left transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative aspect-[0.82] overflow-hidden">
                    <img
                      src={garment.image}
                      alt={garment.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>

                  <div className="flex items-center justify-between p-4">
                    <span className="text-[12px] font-medium">
                      {garment.name}
                    </span>

                    <span className="text-[#ae8750]">→</span>
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
                className="rounded-full bg-[#e8d0a7] px-6 py-3.5 text-[12px] font-semibold text-[#171613]"
              >
                Start a Fit Check →
              </button>
            </div>
          </div>
        </section>

        {/* =====================================================
            FINAL CTA
        ====================================================== */}

        <section className="relative overflow-hidden bg-[#171613] px-5 py-28 text-white sm:px-8 lg:px-12 lg:py-36">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1800&q=85')",
            }}
          />

          <div className="absolute inset-0 bg-[#171613]/70" />

          <div className="relative mx-auto max-w-[900px] text-center">
            <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#d7b982]">
              LinearEra
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
              className="group mt-9 inline-flex items-center gap-4 rounded-full bg-[#e8d0a7] px-8 py-4 text-[13px] font-semibold text-[#171613]"
            >
              Book a Fit Visit
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>
        </section>

        {/* =====================================================
            FOOTER
        ====================================================== */}

        <footer className="bg-[#11100e] px-5 py-12 text-white sm:px-8 lg:px-12">
          <div className="mx-auto flex max-w-[1320px] flex-col justify-between gap-10 sm:flex-row sm:items-end">
            <div>
              <div className="font-serif text-[27px]">LinearEra</div>

              <p className="mt-2 text-[8px] uppercase tracking-[0.32em] text-white/35">
                Fit lives better
              </p>
            </div>

            <div className="flex flex-wrap gap-6 text-[10px] uppercase tracking-[0.15em] text-white/35">
              <a href="#why">Why LinearEra</a>
              <a href="#how">How It Works</a>
              <a href="#pricing">Pricing</a>
              <button onClick={openBooking}>Book</button>
            </div>

            <p className="text-[9px] text-white/25">
              © {new Date().getFullYear()} LinearEra
            </p>
          </div>
        </footer>
      </main>

      {/* =======================================================
          MOBILE CTA
      ======================================================== */}

      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-black/10 bg-[#f6f1e8]/95 p-3 backdrop-blur-xl sm:hidden">
        <button
          onClick={openBooking}
          className="flex w-full items-center justify-center gap-3 rounded-full bg-[#171613] py-3.5 text-[12px] font-semibold text-white"
        >
          Book a Fit Visit
          <span className="text-[#e8d0a7]">→</span>
        </button>
      </div>

      {/* =======================================================
          BOOKING EXPERIENCE
      ======================================================== */}

      {bookingOpen && (
        <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md">
          <div className="absolute inset-0 flex justify-end">
            <div className="booking-panel relative flex h-full w-full max-w-[760px] flex-col bg-[#f6f1e8] shadow-2xl">
              {/* HEADER */}
              <div className="flex shrink-0 items-center justify-between border-b border-black/10 px-6 py-5 sm:px-9">
                <div>
                  <p className="font-serif text-[23px]">LinearEra</p>

                  {!submitted && (
                    <div className="mt-2 flex items-center gap-1.5">
                      {[1, 2, 3].map((step) => (
                        <span
                          key={step}
                          className={`h-1 rounded-full transition-all ${
                            bookingStep >= step
                              ? "w-9 bg-[#ae8750]"
                              : "w-4 bg-black/10"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={closeBooking}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-xl transition hover:bg-black hover:text-white"
                >
                  ×
                </button>
              </div>

              {/* SUCCESS */}
              {submitted ? (
                <div className="flex flex-1 items-center justify-center px-7 text-center sm:px-12">
                  <div className="max-w-[500px]">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#293024] text-xl text-[#e8d0a7]">
                      ✓
                    </div>

                    <p className="mt-8 text-[9px] font-semibold uppercase tracking-[0.28em] text-black/35">
                      Request received
                    </p>

                    <h2 className="mt-4 font-serif text-[48px] leading-[0.9]">
                      You're almost there.
                    </h2>

                    <p className="mx-auto mt-6 max-w-[420px] text-[14px] leading-7 text-black/50">
                      We'll contact you shortly to confirm your Fit Visit,
                      location and final service details.
                    </p>

                    <div className="mt-8 rounded-2xl bg-[#ebe4d8] p-6 text-left">
                      <div className="flex justify-between text-[12px]">
                        <span className="text-black/45">Garments</span>
                        <span>{garmentCount}</span>
                      </div>

                      <div className="mt-3 flex justify-between text-[12px]">
                        <span className="text-black/45">
                          Estimated total
                        </span>
                        <span className="font-medium">
                          ₹{estimatedTotal}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={closeBooking}
                      className="mt-8 rounded-full bg-[#171613] px-8 py-4 text-[12px] font-medium text-white"
                    >
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
                  {/* MAIN BOOKING AREA */}
                  <div className="min-h-0 flex-1 overflow-y-auto px-6 py-8 sm:px-9 sm:py-10">
                    {/* STEP 1 */}
                    {bookingStep === 1 && (
                      <>
                        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                          <div>
                            <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-black/35">
                              Step 01
                            </p>

                            <h2 className="mt-4 font-serif text-[42px] leading-[0.9]">
                              What are we
                              <br />
                              fixing?
                            </h2>

                            <p className="mt-4 text-[13px] leading-6 text-black/45">
                              Select everything you'd like altered in this
                              visit.
                            </p>
                          </div>

                          <div className="flex rounded-full border border-black/10 bg-white p-1 text-[10px]">
                            <button
                              onClick={() => setOrderType("individual")}
                              className={`rounded-full px-4 py-2 ${
                                orderType === "individual"
                                  ? "bg-[#171613] text-white"
                                  : "text-black/45"
                              }`}
                            >
                              Just me
                            </button>

                            <button
                              onClick={() => setOrderType("group")}
                              className={`rounded-full px-4 py-2 ${
                                orderType === "group"
                                  ? "bg-[#171613] text-white"
                                  : "text-black/45"
                              }`}
                            >
                              Family / Friends
                            </button>
                          </div>
                        </div>

                        {orderType === "group" && (
                          <div className="mt-5 rounded-2xl bg-[#293024] p-5 text-white">
                            <p className="text-[9px] uppercase tracking-[0.2em] text-[#d7b982]">
                              Fit Together
                            </p>

                            <p className="mt-2 text-[13px] text-white/65">
                              Add everyone's garments to one doorstep visit
                              and automatically unlock bundle pricing.
                            </p>
                          </div>
                        )}

                        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                          {garments.map((garment) => (
                            <button
                              key={garment.id}
                              onClick={() => addGarment(garment)}
                              className="group overflow-hidden rounded-2xl border border-black/10 bg-white text-left transition hover:-translate-y-1 hover:border-[#ae8750] hover:shadow-lg"
                            >
                              <div className="aspect-square overflow-hidden">
                                <img
                                  src={garment.image}
                                  alt={garment.name}
                                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                />
                              </div>

                              <div className="flex items-center justify-between p-3.5">
                                <span className="text-[11px] font-medium">
                                  {garment.name}
                                </span>

                                <span className="text-[#ae8750]">+</span>
                              </div>
                            </button>
                          ))}
                        </div>

                        {selectedGarments.length > 0 && (
                          <div className="mt-8">
                            <div className="flex items-center justify-between">
                              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/35">
                                Your garments
                              </p>

                              <p className="text-[11px] text-black/40">
                                {garmentCount} selected
                              </p>
                            </div>

                            <div className="mt-3 space-y-2">
                              {selectedGarments.map((item) => (
                                <div
                                  key={item.id}
                                  className="flex items-center justify-between rounded-xl border border-black/10 bg-white px-4 py-3"
                                >
                                  <div>
                                    <p className="text-[12px] font-medium">
                                      {item.name}
                                    </p>

                                    <p className="mt-1 text-[10px] text-black/35">
                                      {item.issue || "Fit issue not selected"}
                                    </p>
                                  </div>

                                  <button
                                    onClick={() =>
                                      removeGarment(item.id)
                                    }
                                    className="text-[10px] text-black/30 hover:text-black"
                                  >
                                    Remove
                                  </button>
                                </div>
                              ))}
                            </div>

                            <button
                              onClick={continueToDetails}
                              className="mt-5 flex w-full items-center justify-center gap-3 rounded-xl bg-[#171613] py-4 text-[12px] font-medium text-white"
                            >
                              Continue
                              <span className="text-[#e8d0a7]">→</span>
                            </button>
                          </div>
                        )}
                      </>
                    )}

                    {/* STEP 2 */}
                    {bookingStep === 2 && activeGarmentId && (
                      <>
                        <button
                          onClick={() => setBookingStep(1)}
                          className="text-[10px] uppercase tracking-[0.2em] text-black/35"
                        >
                          ← Back
                        </button>

                        <p className="mt-8 text-[9px] font-semibold uppercase tracking-[0.25em] text-black/35">
                          Step 02
                        </p>

                        <h2 className="mt-4 font-serif text-[42px] leading-[0.9]">
                          What's wrong
                          <br />
                          with the fit?
                        </h2>

                        <p className="mt-4 text-[13px] leading-6 text-black/45">
                          Choose what feels wrong. You don't need to know the
                          tailoring term.
                        </p>

                        <div className="mt-7 rounded-2xl bg-[#ebe4d8] p-5">
                          <p className="text-[9px] uppercase tracking-[0.2em] text-black/35">
                            Working on
                          </p>

                          <p className="mt-2 font-serif text-[23px]">
                            {
                              selectedGarments.find(
                                (item) => item.id === activeGarmentId
                              )?.name
                            }
                          </p>
                        </div>

                        <div className="mt-5 grid gap-2">
                          {issues.map((issue) => (
                            <button
                              key={issue}
                              onClick={() => updateIssue(issue)}
                              className="flex items-center justify-between rounded-xl border border-black/10 bg-white px-5 py-4 text-left text-[13px] transition hover:border-[#ae8750] hover:bg-[#ebe4d8]"
                            >
                              <span>{issue}</span>
                              <span className="text-[#ae8750]">→</span>
                            </button>
                          ))}
                        </div>

                        <button
                          onClick={() => updateIssue("Not sure")}
                          className="mt-3 w-full rounded-xl border border-dashed border-black/20 px-5 py-4 text-[12px] text-black/50"
                        >
                          I don't know — let LinearEra check it
                        </button>
                      </>
                    )}

                    {/* STEP 3 */}
                    {bookingStep === 3 && (
                      <form onSubmit={submitBooking}>
                        <button
                          type="button"
                          onClick={() => setBookingStep(1)}
                          className="text-[10px] uppercase tracking-[0.2em] text-black/35"
                        >
                          ← Back
                        </button>

                        <p className="mt-8 text-[9px] font-semibold uppercase tracking-[0.25em] text-black/35">
                          Step 03
                        </p>

                        <h2 className="mt-4 font-serif text-[42px] leading-[0.9]">
                          Where should
                          <br />
                          we come?
                        </h2>

                        <div className="mt-7 space-y-4">
                          <div>
                            <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.15em] text-black/45">
                              Your name
                            </label>

                            <input
                              required
                              value={name}
                              onChange={(event) =>
                                setName(event.target.value)
                              }
                              placeholder="Your name"
                              className="w-full rounded-xl border border-black/10 bg-white px-5 py-4 text-[13px] outline-none focus:border-[#ae8750]"
                            />
                          </div>

                          <div>
                            <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.15em] text-black/45">
                              Phone number
                            </label>

                            <input
                              required
                              type="tel"
                              value={phone}
                              onChange={(event) =>
                                setPhone(event.target.value)
                              }
                              placeholder="Your phone number"
                              className="w-full rounded-xl border border-black/10 bg-white px-5 py-4 text-[13px] outline-none focus:border-[#ae8750]"
                            />
                          </div>

                          <div>
                            <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.15em] text-black/45">
                              Area / locality
                            </label>

                            <input
                              required
                              value={area}
                              onChange={(event) =>
                                setArea(event.target.value)
                              }
                              placeholder="e.g. Indiranagar"
                              className="w-full rounded-xl border border-black/10 bg-white px-5 py-4 text-[13px] outline-none focus:border-[#ae8750]"
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-[#171613] py-4 text-[12px] font-medium text-white"
                        >
                          Request My Fit Visit
                          <span className="text-[#e8d0a7]">→</span>
                        </button>

                        <p className="mt-4 text-center text-[9px] leading-5 text-black/30">
                          No payment required now. We'll call to confirm the
                          appointment and final price.
                        </p>
                      </form>
                    )}
                  </div>

                  {/* ORDER SUMMARY */}
                  {selectedGarments.length > 0 && (
                    <aside className="shrink-0 border-t border-black/10 bg-[#ebe4d8] p-6 sm:p-8 lg:w-[270px] lg:border-l lg:border-t-0">
                      <div className="lg:sticky lg:top-0">
                        <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-black/35">
                          Your visit
                        </p>

                        <div className="mt-5 space-y-3">
                          {selectedGarments.map((item) => (
                            <div key={item.id}>
                              <div className="flex justify-between gap-3">
                                <span className="text-[11px]">
                                  {item.name}
                                </span>

                                <span className="text-[11px]">
                                  ₹
                                  {
                                    PRICING.garments[
                                      item.name as keyof typeof PRICING.garments
                                    ]
                                  }
                                </span>
                              </div>

                              {item.issue && (
                                <p className="mt-1 text-[9px] text-black/35">
                                  {item.issue}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>

                        <div className="my-5 h-px bg-black/10" />

                        <div className="flex justify-between text-[11px]">
                          <span className="text-black/45">Subtotal</span>
                          <span>₹{subtotal}</span>
                        </div>

                        {discountPercentage > 0 && (
                          <div className="mt-2 flex justify-between text-[11px] text-[#526149]">
                            <span>
                              Bundle saving ({discountPercentage}%)
                            </span>

                            <span>−₹{discountAmount}</span>
                          </div>
                        )}

                        <div className="mt-4 flex items-end justify-between">
                          <span className="text-[10px] uppercase tracking-[0.15em] text-black/40">
                            Estimated
                          </span>

                          <span className="font-serif text-[27px]">
                            ₹{estimatedTotal}
                          </span>
                        </div>

                        <div className="mt-6 rounded-xl bg-white/60 p-4">
                          <p className="text-[10px] font-medium">
                            {garmentCount === 1
                              ? "Add another garment"
                              : "You're unlocking bundle savings"}
                          </p>

                          <p className="mt-1 text-[9px] leading-5 text-black/40">
                            {garmentCount === 1
                              ? "Add one more and save 10%."
                              : garmentCount < 3
                                ? "Add one more and save 15%."
                                : garmentCount < 5
                                  ? "Add more garments to reach 20% savings."
                                  : "Maximum bundle saving unlocked."}
                          </p>
                        </div>
                      </div>
                    </aside>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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
        }

        .booking-panel {
          animation: panelIn 0.35s ease-out both;
        }

        @keyframes panelIn {
          from {
            transform: translateX(30px);
            opacity: 0;
          }

          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </>
  );
}
