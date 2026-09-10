"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Garment = {
  id: number;
  name: string;
  price: number;
  image: string;
};

const IMAGES = {
  hero:
    "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=2200&q=90",

  consultation:
    "https://stitchkart.co.in/assets/service-consultation-DXjmdRSr.jpg",

  tailoring:
    "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1800&q=90",

  wardrobe:
    "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1800&q=90",

  traffic:
    "https://images.unsplash.com/photo-1532939163844-82d416d6adac?auto=format&fit=crop&w=1600&q=85",

  parking:
    "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1600&q=85",

  waiting:
    "https://images.unsplash.com/photo-1501139083538-0139583c060f?auto=format&fit=crop&w=1600&q=85",

  home:
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=90",

  wardrobeRoom:
    "https://images.unsplash.com/photo-1721739232541-d855ae6572af?auto=format&fit=crop&w=1800&q=90",

  measurement:
    "https://images.unsplash.com/photo-1768745888568-b3ef7c7ba366?auto=format&fit=crop&w=1800&q=90",

  craft:
    "https://images.unsplash.com/photo-1772290660319-ed78b7a2b469?auto=format&fit=crop&w=1800&q=90",

  atelier:
    "https://images.unsplash.com/photo-1780504863007-44f229d4d33f?auto=format&fit=crop&w=1800&q=90",
};

const GARMENTS = [
  {
    name: "Shirt",
    price: 199,
    image:
      "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=1000&q=90",
  },
  {
    name: "Trousers",
    price: 249,
    image:
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=90",
  },
  {
    name: "Jeans",
    price: 199,
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1000&q=90",
  },
  {
    name: "T-shirt",
    price: 149,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=90",
  },
  {
    name: "Dress",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=90",
  },
  {
    name: "Jacket",
    price: 399,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=90",
  },
];

const PROBLEMS = [
  {
    number: "01",
    title: "Traffic",
    subtitle: "Leave home",
    image: IMAGES.traffic,
  },
  {
    number: "02",
    title: "Parking",
    subtitle: "Find a spot",
    image: IMAGES.parking,
  },
  {
    number: "03",
    title: "Crowd",
    subtitle: "Wait your turn",
    image: IMAGES.tailoring,
  },
  {
    number: "04",
    title: "Waiting",
    subtitle: "Leave your clothes",
    image: IMAGES.waiting,
  },
  {
    number: "05",
    title: "Explain",
    subtitle: "Describe the fit",
    image: IMAGES.consultation,
  },
  {
    number: "06",
    title: "Return",
    subtitle: "Come back again",
    image: IMAGES.wardrobe,
  },
];

const FIT_ISSUES = [
  "Too loose",
  "Too tight",
  "Too long",
  "Too short",
  "Wrong shape",
  "Not sure",
];

function Arrow() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <path d="M5 12h13" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function Plus() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function Close() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

function Check() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState<Garment[]>([]);
  const [issues, setIssues] = useState<string[]>([]);
  const [orderType, setOrderType] = useState("Just me");
  const [groupSize, setGroupSize] = useState(2);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "",
    time: "",
  });

  useEffect(() => {
    document.body.style.overflow = bookingOpen ? "hidden" : "";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && bookingOpen) setBookingOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [bookingOpen]);

  const addGarment = (name: string) => {
    const garment = GARMENTS.find((item) => item.name === name);

    if (!garment) return;

    setSelected((current) => [
      ...current,
      {
        ...garment,
        id: Date.now() + Math.random(),
      },
    ]);
  };

  const removeGarment = (id: number) => {
    setSelected((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  const startBooking = (garment?: string) => {
    if (garment) addGarment(garment);

    setStep(1);
    setSubmitted(false);
    setBookingOpen(true);
  };

  const closeBooking = () => {
    setBookingOpen(false);
  };

  const subtotal = selected.reduce(
    (sum, item) => sum + item.price,
    0
  );

  const discountPercent =
    selected.length >= 5
      ? 20
      : selected.length >= 3
      ? 15
      : selected.length >= 2
      ? 10
      : 0;

  const discount = Math.round(
    subtotal * (discountPercent / 100)
  );

  const total = subtotal - discount;

  const toggleIssue = (issue: string) => {
    setIssues((current) =>
      current.includes(issue)
        ? current.filter((item) => item !== issue)
        : [...current, issue]
    );
  };

  const submitBooking = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F7F1E7] text-[#1B1515]">
      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between rounded-full border border-[#C7A56C]/20 bg-[#211719]/70 px-4 py-3 text-white shadow-xl backdrop-blur-xl md:px-6">
          <a
            href="#top"
            className="font-serif text-[25px] tracking-[-0.05em]"
          >
            LinearEra
          </a>

          <nav className="hidden items-center gap-8 text-[10px] uppercase tracking-[0.18em] lg:flex">
            <a href="#why">Why us</a>
            <a href="#services">Services</a>
            <a href="#pricing">Pricing</a>
            <a href="#process">How it works</a>
          </nav>

          <button
            onClick={() => startBooking()}
            className="rounded-full bg-white px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-black transition hover:scale-[1.03]"
          >
            Book a fit visit
          </button>
        </div>
      </header>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        id="top"
        className="relative min-h-[760px] overflow-hidden bg-black md:min-h-[920px]"
      >
        <img
          src={IMAGES.hero}
          alt="Clothing and tailoring"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-[#211719]/35" />

        <div className="absolute inset-0 bg-gradient-to-r from-[#211719]/90 via-[#211719]/45 to-transparent" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#211719]/85 via-transparent to-[#211719]/10" />

        <div className="relative mx-auto flex min-h-[760px] max-w-[1500px] items-end px-6 pb-12 pt-40 md:min-h-[920px] md:px-12 md:pb-20">
          <div className="w-full">
            <div className="mb-7 flex items-center gap-3 text-white/65">
              <span className="h-px w-10 bg-white/60" />
              <span className="text-[10px] uppercase tracking-[0.28em]">
                Bengaluru · Doorstep clothing alterations
              </span>
            </div>

            <h1 className="max-w-[1100px] font-serif text-[clamp(62px,10.5vw,155px)] leading-[0.76] tracking-[-0.065em] text-white">
              STOP GOING
              <br />
              TO TAILORS.
            </h1>

            <div className="mt-10 flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="max-w-[450px] text-base leading-7 text-white/75 md:text-lg">
                  Professional clothing alterations,
                  <br />
                  measured at your doorstep.
                </p>

                <div className="mt-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#B68A4C]" />
                  No traffic · No parking · No waiting
                </div>
              </div>

              <button
                onClick={() => startBooking()}
                className="flex w-fit items-center gap-3 rounded-full bg-[#F7F1E7] px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.17em] text-[#1B1515] shadow-[0_12px_35px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#C7A56C]"
              >
                Book a fit visit
                <Arrow />
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-7 right-7 hidden text-right text-white md:block">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/60">
            LinearEra
          </p>
          <p className="font-serif text-2xl">Fit Lives Better.</p>
        </div>
      </section>

      {/* =====================================================
          INTRO
      ===================================================== */}

      <section className="bg-[#24191B] px-6 py-24 text-[#F7F1E7] md:px-12 md:py-36">
        <div className="mx-auto grid max-w-[1350px] gap-12 lg:grid-cols-[0.7fr_1.6fr]">
          <p className="text-[10px] uppercase tracking-[0.28em] text-white/55">
            Why LinearEra
          </p>

          <div>
            <h2 className="font-serif text-[clamp(48px,6.5vw,92px)] leading-[0.9] tracking-[-0.055em]">
              A simple alteration
              <br />
              shouldn't require
              <br />
              <span className="text-[#B68A4C]">
                your entire afternoon.
              </span>
            </h2>

            <div className="mt-10 grid gap-5 border-t border-white/10 pt-7 sm:grid-cols-3">
              <div>
                <p className="font-serif text-3xl">01</p>
                <p className="mt-2 text-xs text-white/60">
                  You stay home.
                </p>
              </div>

              <div>
                <p className="font-serif text-3xl">02</p>
                <p className="mt-2 text-xs text-white/60">
                  We understand the fit.
                </p>
              </div>

              <div>
                <p className="font-serif text-3xl">03</p>
                <p className="mt-2 text-xs text-white/60">
                  Your clothes come back.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          OLD WAY
      ===================================================== */}

      <section
        id="why"
        className="bg-[#E9DED0] px-4 py-6 md:px-7 md:py-8"
      >
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-8 flex items-end justify-between px-2 md:mb-12">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-black/60">
                The old way
              </p>

              <h2 className="mt-3 max-w-[700px] font-serif text-[clamp(45px,6vw,82px)] leading-[0.88] tracking-[-0.055em]">
                You shouldn't have
                <br />
                to plan your day
                <br />
                around a tailor.
              </h2>
            </div>

            <p className="hidden max-w-[220px] text-right text-[10px] leading-5 text-black/60 md:block">
              A small alteration can become a surprisingly
              complicated journey.
            </p>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-visible">
            {PROBLEMS.map((problem) => (
              <article
                key={problem.number}
                className="group relative aspect-[4/5] min-w-[78vw] shrink-0 snap-center overflow-hidden rounded-[2px] bg-[#24191B] shadow-[0_24px_60px_rgba(36,25,27,0.16)] sm:min-w-[52vw] md:min-w-0"
              >
                <img
                  src={problem.image}
                  alt={problem.title}
                  className="absolute inset-0 h-full w-full object-cover saturate-[0.88] contrast-[1.02] transition-transform duration-300 group-hover:scale-[1.02] group-hover:saturate-100"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                <span className="absolute left-5 top-5 text-[10px] tracking-[0.2em] text-white/60">
                  {problem.number}
                </span>

                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">
                    {problem.subtitle}
                  </p>

                  <h3 className="mt-1 font-serif text-4xl md:text-5xl">
                    {problem.title}
                  </h3>
                </div>
              </article>
            ))}
          </div>

          <div className="py-24 text-center md:py-32">
            <p className="text-[10px] uppercase tracking-[0.25em] text-black/55">
              All this...
            </p>

            <h3 className="mt-5 font-serif text-[clamp(52px,7vw,100px)] leading-[0.84] tracking-[-0.06em]">
              for a simple
              <br />
              <span className="italic">alteration?</span>
            </h3>

            <p className="mt-6 text-sm text-black/60">
              There has to be a better way.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          SOLUTION
      ===================================================== */}

      <section
        id="process"
        className="bg-[#F7F1E7] px-5 py-24 md:px-10 md:py-36"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="relative overflow-hidden">
              <img
                src={IMAGES.consultation}
                alt="Fit consultation"
                className="aspect-[4/5] w-full object-cover"
              />

              <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/20 bg-black/65 p-5 text-white backdrop-blur-xl">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/60">
                  Your home
                </p>

                <p className="mt-1 font-serif text-3xl">
                  The fitting room comes to you.
                </p>
              </div>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-black/55">
                The LinearEra way
              </p>

              <h2 className="mt-5 font-serif text-[clamp(50px,6vw,88px)] leading-[0.87] tracking-[-0.06em]">
                From your
                <br />
                wardrobe
                <br />
                <span className="italic">to your doorstep.</span>
              </h2>

              <div className="mt-12">
                {[
                  [
                    "01",
                    "Book",
                    "Tell us which garments need attention.",
                  ],
                  [
                    "02",
                    "Fit visit",
                    "Our Fit Consultant visits you.",
                  ],
                  [
                    "03",
                    "Tailoring",
                    "A specialist makes the alteration.",
                  ],
                  [
                    "04",
                    "Quality check",
                    "The finished garment is checked.",
                  ],
                  [
                    "05",
                    "Return",
                    "Your clothes come back to your doorstep.",
                  ],
                ].map(([number, title, text]) => (
                  <div
                    key={number}
                    className="grid grid-cols-[38px_115px_1fr] border-t border-black/10 py-5"
                  >
                    <span className="text-[10px] text-black/50">
                      {number}
                    </span>

                    <span className="font-serif text-xl">
                      {title}
                    </span>

                    <span className="text-[11px] leading-5 text-black/60">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PROCESS VISUAL
      ===================================================== */}

      <section className="overflow-hidden bg-[#211719] py-5">
        <div className="flex gap-3 overflow-x-auto px-5 pb-2">
          {[
            ["01", "YOU", IMAGES.home],
            ["02", "MEASURE", IMAGES.measurement],
            ["03", "TAILOR", IMAGES.atelier],
            ["04", "CRAFT", IMAGES.craft],
            ["05", "RETURN", IMAGES.wardrobeRoom],
          ].map(([number, title, image]) => (
            <div
              key={number}
              className="relative h-[380px] min-w-[280px] overflow-hidden md:h-[500px] md:min-w-[370px]"
            >
              <img
                src={image}
                alt={title}
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-black/30" />

              <div className="absolute bottom-5 left-5 text-white">
                <span className="text-[10px] tracking-[0.2em] text-white/50">
                  {number}
                </span>

                <h3 className="font-serif text-4xl md:text-5xl">
                  {title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          EDITORIAL FIT MOMENT
      ===================================================== */}

      <section className="bg-[#F7F1E7] px-5 py-8 md:px-10 md:py-14">
        <div className="mx-auto grid max-w-[1450px] gap-3 md:grid-cols-[1.25fr_0.75fr]">
          <div className="group relative min-h-[420px] overflow-hidden rounded-[2px] bg-[#24191B] md:min-h-[620px]">
            <img
              src={IMAGES.consultation}
              alt="Professional clothing fit consultation"
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#211719]/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-5 text-white md:bottom-9 md:left-9 md:right-9">
              <div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-white/50">
                  The fit visit
                </p>
                <p className="mt-2 max-w-[520px] font-serif text-4xl leading-[0.9] md:text-6xl">
                  A professional eye.
                  <br />
                  <span className="italic text-[#C7A56C]">At your door.</span>
                </p>
              </div>
              <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 md:flex">
                <Arrow />
              </span>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1">
            <div className="relative min-h-[300px] overflow-hidden rounded-[2px] bg-[#DDD1C1]">
              <img
                src={IMAGES.tailoring}
                alt="Tailoring craftsmanship"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#211719]/70 to-transparent" />
              <div className="absolute bottom-5 left-5 text-white">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">01 · Craft</p>
                <p className="mt-1 font-serif text-3xl">Measured first.</p>
              </div>
            </div>
            <div className="flex min-h-[300px] flex-col justify-between rounded-[2px] bg-[#2A1D1F] p-6 text-[#F7F1E7] md:p-8">
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#C7A56C]">02 · Finish</p>
              <div>
                <p className="font-serif text-4xl leading-[0.92] md:text-5xl">
                  Your clothes deserve more than “good enough.”
                </p>
                <div className="mt-7 h-px bg-white/10" />
                <p className="mt-5 text-[11px] leading-5 text-white/65">
                  We combine a human fit assessment with skilled alteration and a final quality check.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          VISUAL FIT LIBRARY
      ===================================================== */}

      <section className="bg-[#F7F1E7] px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1450px]">
          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-black/55">
                See what we mean by fit
              </p>
              <h2 className="mt-4 max-w-[850px] font-serif text-[clamp(48px,6.5vw,92px)] leading-[0.84] tracking-[-0.06em]">
                Fit is not just
                <br />
                a <span className="italic text-[#8B3152]">size.</span>
              </h2>
            </div>
            <p className="max-w-[300px] text-[11px] leading-5 text-black/60">
              Shoulder. Sleeve. Waist. Length. Shape.
              A trained eye sees what a size label cannot.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-12">
            <div className="group relative min-h-[430px] overflow-hidden md:col-span-7 md:min-h-[650px]">
              <img
                src={IMAGES.measurement}
                alt="Measuring a garment for a better fit"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.015]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#211719]/75 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-white md:bottom-8 md:left-8">
                <p className="text-[10px] uppercase tracking-[0.24em] text-white/50">
                  01 · Measure
                </p>
                <p className="mt-2 font-serif text-4xl leading-[0.9] md:text-6xl">
                  The right fit
                  <br />starts with detail.
                </p>
              </div>
            </div>

            <div className="grid gap-3 md:col-span-5">
              <div className="group relative min-h-[300px] overflow-hidden">
                <img
                  src={IMAGES.craft}
                  alt="Hand finishing a garment"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.015]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#211719]/75 to-transparent" />
                <div className="absolute bottom-5 left-5 text-white">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">02 · Craft</p>
                  <p className="mt-1 font-serif text-3xl md:text-4xl">Precision matters.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="group relative min-h-[270px] overflow-hidden">
                  <img
                    src={IMAGES.atelier}
                    alt="Tailor working on garment alterations"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.015]"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <p className="absolute bottom-4 left-4 font-serif text-2xl text-white">03 · Alter</p>
                </div>

                <div className="group relative min-h-[270px] overflow-hidden">
                  <img
                    src={IMAGES.wardrobeRoom}
                    alt="Clothes ready in a wardrobe"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.015]"
                  />
                  <div className="absolute inset-0 bg-black/15" />
                  <p className="absolute bottom-4 left-4 font-serif text-2xl text-white">04 · Return</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          SERVICES
      ===================================================== */}

      <section
        id="services"
        className="bg-[#F7F1E7] px-5 py-24 md:px-10 md:py-36"
      >
        <div className="mx-auto max-w-[1450px]">
          <div className="mb-12 flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-black/55">
                Your wardrobe
              </p>

              <h2 className="mt-4 font-serif text-[clamp(55px,7vw,100px)] leading-[0.83] tracking-[-0.06em]">
                What needs
                <br />
                fixing?
              </h2>
            </div>

            <p className="max-w-[300px] text-[11px] leading-5 text-black/60">
              Pick a garment. Tell us what feels wrong.
              We'll handle the rest.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
            {GARMENTS.map((item) => (
              <button
                key={item.name}
                onClick={() => startBooking(item.name)}
                className="group relative aspect-[4/5] overflow-hidden rounded-[2px] bg-[#DED2C3] text-left shadow-[0_18px_45px_rgba(36,25,27,0.10)]"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white md:bottom-6 md:left-6 md:right-6">
                  <div>
                    <h3 className="font-serif text-2xl md:text-4xl">
                      {item.name}
                    </h3>

                    <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-white/55">
                      From ₹{item.price}
                    </p>
                  </div>

                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black transition group-hover:rotate-45">
                    <Plus />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          FIT CHECK
      ===================================================== */}

      <section className="bg-[#E5D6C5] px-5 py-24 md:px-10 md:py-36">
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-black/55">
              Not sure?
            </p>

            <h2 className="mt-5 font-serif text-[clamp(50px,6vw,88px)] leading-[0.86] tracking-[-0.06em]">
              You don't need
              <br />
              to know the
              <br />
              <span className="italic">tailoring term.</span>
            </h2>

            <p className="mt-8 max-w-[430px] text-sm leading-6 text-black/60">
              Say what feels wrong. Our Fit Consultant can
              identify what needs to change.
            </p>

            <button
              onClick={() => startBooking()}
              className="mt-9 flex items-center gap-3 rounded-full bg-[#1B1515] px-7 py-4 text-[10px] uppercase tracking-[0.17em] text-white"
            >
              Check my fit
              <Arrow />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {[
              [
                "Too loose",
                "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85",
              ],
              [
                "Too tight",
                "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=85",
              ],
              [
                "Too long",
                "https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&w=900&q=85",
              ],
              [
                "Not sure",
                "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85",
              ],
            ].map(([title, image]) => (
              <button
                key={title}
                onClick={() => startBooking()}
                className="group relative aspect-square overflow-hidden bg-black text-left"
              >
                <img
                  src={image}
                  alt={title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />

                <div className="absolute inset-0 bg-black/25" />

                <span className="absolute bottom-4 left-4 font-serif text-2xl text-white md:text-3xl">
                  {title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          PRICING
      ===================================================== */}

      <section
        id="pricing"
        className="bg-[#211719] px-5 py-24 text-[#F7F1E7] md:px-10 md:py-36"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/55">
                Pricing
              </p>

              <h2 className="mt-5 font-serif text-[clamp(58px,7vw,100px)] leading-[0.82] tracking-[-0.06em]">
                More clothes.
                <br />
                <span className="italic text-[#B68A4C]">
                  Less per piece.
                </span>
              </h2>

              <p className="mt-8 max-w-[400px] text-sm leading-6 text-white/65">
                Combine garments during the same doorstep visit
                and unlock bundle savings.
              </p>

              <div className="mt-10 space-y-3">
                {[
                  ["2 garments", "10% off"],
                  ["3–4 garments", "15% off"],
                  ["5+ garments", "20% off"],
                ].map(([count, saving]) => (
                  <div
                    key={count}
                    className="flex items-center justify-between border-b border-white/10 py-4"
                  >
                    <span className="font-serif text-2xl">
                      {count}
                    </span>

                    <span className="text-[10px] uppercase tracking-[0.15em] text-[#B68A4C]">
                      {saving}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-px bg-white/10 md:grid-cols-3">
              {GARMENTS.map((item) => (
                <button
                  key={item.name}
                  onClick={() => startBooking(item.name)}
                  className="group bg-[#2A1D1F] p-3 text-left md:p-4"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover opacity-80 transition-transform duration-300 group-hover:scale-[1.02] group-hover:opacity-100"
                    />
                  </div>

                  <div className="mt-3 flex items-end justify-between">
                    <span className="font-serif text-xl">
                      {item.name}
                    </span>

                    <span className="text-xs">
                      ₹{item.price}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <p className="mt-7 text-[10px] leading-5 text-white/65">
            Starting prices for the pilot. Final
            pricing can vary depending on the alteration required.
          </p>
        </div>
      </section>

      {/* =====================================================
          VISUAL WARDROBE CTA
      ===================================================== */}

      <section className="bg-[#F7F1E7] px-5 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-[1400px]">
          <div className="relative overflow-hidden">
            <img
              src={IMAGES.wardrobe}
              alt="Wardrobe"
              className="h-[550px] w-full object-cover md:h-[700px]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#211719]/85 via-transparent to-[#211719]/10" />

            <div className="absolute bottom-6 left-6 right-6 text-white md:bottom-10 md:left-10">
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/65">
                Your wardrobe
              </p>

              <h2 className="mt-3 max-w-[800px] font-serif text-[clamp(50px,7vw,100px)] leading-[0.82] tracking-[-0.06em]">
                Bring the clothes.
                <br />
                <span className="italic text-[#C7A56C]">
                  We'll bring the fit.
                </span>
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          GROUP ORDER
      ===================================================== */}

      <section className="bg-[#DDD1C1] px-5 py-24 md:px-10 md:py-36">
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative overflow-hidden">
            <img
              src={IMAGES.home}
              alt="At home service"
              className="h-[550px] w-full object-cover md:h-[680px]"
            />

            <div className="absolute left-5 top-5 rounded-full bg-white/90 px-5 py-3 text-[10px] uppercase tracking-[0.17em]">
              One doorstep visit
            </div>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-black/55">
              Fit together
            </p>

            <h2 className="mt-5 font-serif text-[clamp(52px,6vw,88px)] leading-[0.84] tracking-[-0.06em]">
              Your family.
              <br />
              Your friends.
              <br />
              <span className="italic">One visit.</span>
            </h2>

            <p className="mt-8 max-w-[460px] text-sm leading-6 text-black/50">
              Have multiple garments to alter? Combine them into
              the same doorstep visit and unlock bundle pricing.
            </p>

            <button
              onClick={() => {
                setOrderType("Family / Friends");
                startBooking();
              }}
              className="mt-9 flex items-center gap-3 rounded-full bg-[#1B1515] px-7 py-4 text-[10px] uppercase tracking-[0.17em] text-white"
            >
              Start a group order
              <Arrow />
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="relative min-h-[720px] overflow-hidden bg-black">
        <img
          src={IMAGES.consultation}
          alt="Doorstep fitting"
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/40" />

        <div className="relative mx-auto flex min-h-[720px] max-w-[1450px] flex-col justify-end px-6 pb-14 md:px-12 md:pb-20">
          <p className="text-[10px] uppercase tracking-[0.28em] text-white/65">
            LinearEra
          </p>

          <h2 className="mt-5 max-w-[1100px] font-serif text-[clamp(65px,10vw,145px)] leading-[0.76] tracking-[-0.065em] text-white">
            YOUR CLOTHES.
            <br />
            <span className="italic text-[#C7A56C]">
              YOUR FIT.
            </span>
          </h2>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <button
              onClick={() => startBooking()}
              className="flex items-center justify-center gap-3 rounded-full bg-white px-8 py-5 text-[10px] font-semibold uppercase tracking-[0.17em] text-black"
            >
              Book a fit visit
              <Arrow />
            </button>

            <span className="text-[10px] text-white/55">
              No app. No shop visit. No complicated form.
            </span>
          </div>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="bg-[#211719] px-6 py-12 text-white md:px-10">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-serif text-4xl tracking-[-0.05em]">
              LinearEra
            </p>

            <p className="mt-2 text-[10px] text-white/50">
              Fit Lives Better.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-7 gap-y-3 text-[10px] uppercase tracking-[0.17em] text-white/60">
            <a href="#why">Why us</a>
            <a href="#services">Services</a>
            <a href="#pricing">Pricing</a>
            <a href="#process">How it works</a>
          </div>

          <p className="text-[10px] text-white/20">
            © {new Date().getFullYear()} LinearEra
          </p>
        </div>
      </footer>

      {/* =====================================================
          MOBILE CTA
      ===================================================== */}

      <div className="fixed bottom-4 left-4 right-4 z-40 md:hidden">
        <button
          onClick={() => startBooking()}
          className="flex w-full items-center justify-center gap-3 rounded-full bg-[#1B1515] px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.17em] text-white shadow-2xl ring-1 ring-[#C7A56C]/20"
        >
          Book a fit visit
          <Arrow />
        </button>
      </div>

      {/* =====================================================
          BOOKING EXPERIENCE
      ===================================================== */}

      {bookingOpen && (
        <div className="fixed inset-0 z-[100]">
          <button
            aria-label="Close booking"
            onClick={closeBooking}
            className="absolute inset-0 bg-[#120D0E]/75 backdrop-blur-md"
          />

          <aside className="absolute right-0 top-0 flex h-full w-full max-w-[760px] flex-col overflow-hidden bg-[#F7F1E7] shadow-[-30px_0_100px_rgba(18,13,14,0.28)]">
            <div className="flex items-center justify-between border-b border-black/10 bg-[#211719] px-5 py-4 text-white md:px-8">
              <div className="flex items-center gap-3">
                <span className="font-serif text-xl tracking-[-0.04em]">LinearEra</span>
                <span className="h-3 w-px bg-white/20" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/65">
                  Fit visit
                </span>
              </div>
              <button
                onClick={closeBooking}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:bg-white hover:text-black"
              >
                <Close />
              </button>
            </div>

            <div className="border-b border-black/10 bg-[#F7F1E7] px-5 py-4 md:px-8">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-[10px] uppercase tracking-[0.22em] text-black/55">
                  Your fit, arranged
                </p>
                <p className="font-serif text-sm text-black/60">0{step} / 03</p>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  ["01", "Select"],
                  ["02", "Fit"],
                  ["03", "Visit"],
                ].map(([number, label], index) => (
                  <button
                    key={number}
                    onClick={() => index + 1 <= step && setStep(index + 1)}
                    className="group text-left"
                  >
                    <div
                      className={`h-1.5 overflow-hidden rounded-full ${
                        index + 1 <= step ? "bg-[#211719]" : "bg-black/10"
                      }`}
                    />
                    <div className="mt-2 flex items-center gap-2">
                      <span className={`text-[10px] ${index + 1 <= step ? "text-[#A77A42]" : "text-black/60"}`}>
                        {number}
                      </span>
                      <span className={`text-[10px] uppercase tracking-[0.14em] ${index + 1 === step ? "text-black" : "text-black/50"}`}>
                        {label}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="px-5 py-7 md:px-8 md:py-9">
                {submitted ? (
                  <div className="flex min-h-[620px] flex-col justify-between">
                    <div>
                      <div className="relative mb-8 aspect-[16/7] overflow-hidden rounded-[24px]">
                        <img src={IMAGES.consultation} alt="LinearEra fit consultation" className="h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#211719]/80 via-transparent to-transparent" />
                        <div className="absolute bottom-5 left-5 text-white">
                          <p className="text-[10px] uppercase tracking-[0.22em] text-white/55">LinearEra</p>
                          <p className="mt-1 font-serif text-2xl">Your fit journey starts here.</p>
                        </div>
                      </div>
                      <p className="text-[10px] uppercase tracking-[0.25em] text-[#A77A42]">Request received</p>
                      <h3 className="mt-3 max-w-[560px] font-serif text-[clamp(48px,7vw,78px)] leading-[0.82] tracking-[-0.055em]">
                        We'll call
                        <br />
                        <span className="italic">you.</span>
                      </h3>
                      <p className="mt-6 max-w-[450px] text-sm leading-6 text-black/60">
                        We'll confirm your visit, understand the garments you're bringing and arrange the next step.
                      </p>
                    </div>
                    <button
                      onClick={closeBooking}
                      className="mt-10 w-full rounded-full bg-[#211719] px-7 py-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#3A2528]"
                    >
                      Back to LinearEra
                    </button>
                  </div>
                ) : (
                  <>
                    {step === 1 && (
                      <div>
                        <div className="grid gap-7 md:grid-cols-[1fr_190px] md:items-end">
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.22em] text-[#A77A42]">Step 01 · Your wardrobe</p>
                            <h4 className="mt-3 font-serif text-[clamp(42px,6vw,66px)] leading-[0.84] tracking-[-0.05em]">
                              What are we
                              <br />
                              <span className="italic">fixing?</span>
                            </h4>
                            <p className="mt-5 max-w-[430px] text-sm leading-6 text-black/60">
                              Select every garment that needs attention. More pieces can be handled in the same visit.
                            </p>
                          </div>
                          <div className="hidden overflow-hidden rounded-[20px] md:block">
                            <img src={IMAGES.wardrobe} alt="Wardrobe" className="aspect-[4/5] w-full object-cover" />
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="mb-2 flex items-center justify-between">
                            <p className="text-[10px] uppercase tracking-[0.18em] text-black/55">Who are we fitting?</p>
                            {orderType !== "Just me" && (
                              <span className="text-[10px] uppercase tracking-[0.14em] text-[#A77A42]">Group booking</span>
                            )}
                          </div>

                          <div className="grid grid-cols-3 gap-1.5">
                            {["Just me", "Family", "Friends"].map((type) => (
                              <button
                                type="button"
                                key={type}
                                onClick={() => setOrderType(type)}
                                className={`rounded-xl border px-3 py-4 text-left transition ${
                                  orderType === type
                                    ? "border-[#211719] bg-[#211719] text-white"
                                    : "border-black/10 bg-white/35 hover:border-black/25"
                                }`}
                              >
                                <span className="block font-serif text-lg">{type}</span>
                                <span className={`mt-1 block text-[10px] ${orderType === type ? "text-white/65" : "text-black/50"}`}>
                                  {type === "Just me" ? "One wardrobe" : "One doorstep visit"}
                                </span>
                              </button>
                            ))}
                          </div>

                          {orderType !== "Just me" && (
                            <div className="mt-2 flex items-center justify-between rounded-xl border border-[#A77A42]/25 bg-[#A77A42]/[0.07] px-4 py-3">
                              <div>
                                <p className="text-[10px] uppercase tracking-[0.15em] text-black/55">People in this visit</p>
                                <p className="mt-0.5 text-[11px] text-black/55">Everyone can bring their garments.</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <button type="button" onClick={() => setGroupSize(Math.max(2, groupSize - 1))} className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 bg-white">−</button>
                                <span className="w-6 text-center font-serif text-lg">{groupSize}</span>
                                <button type="button" onClick={() => setGroupSize(Math.min(8, groupSize + 1))} className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 bg-white">+</button>
                              </div>
                            </div>
                          )}
                        </div>

                        <div id="linearera-garment-picker" className="mt-8 scroll-mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
                          {GARMENTS.map((item) => (
                            <button
                              key={item.name}
                              type="button"
                              onClick={() => addGarment(item.name)}
                              className="group relative aspect-[4/5] overflow-hidden rounded-[18px] bg-[#211719] text-left"
                            >
                              <img src={item.image} alt={item.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#211719]/90 via-transparent to-transparent" />
                              <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[7px] uppercase tracking-[0.12em] text-black">₹{item.price}+</div>
                              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                                <div>
                                  <p className="font-serif text-xl leading-none">{item.name}</p>
                                  <p className="mt-1 text-[7px] uppercase tracking-[0.13em] text-white/65">Select garment</p>
                                </div>
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black transition group-hover:rotate-45"><Plus /></span>
                              </div>
                            </button>
                          ))}
                        </div>

                        {selected.length > 0 && (
                           <div className="mb-3 flex items-center justify-between rounded-[16px] border border-[#A77A42]/20 bg-[#A77A42]/[0.06] px-4 py-3">
                             <div>
                               <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-black/60">Add another garment</p>
                               <p className="mt-0.5 text-[10px] text-black/55">Add more pieces to the same doorstep visit.</p>
                             </div>
                             <button
                               type="button"
                               onClick={() => document.getElementById("linearera-garment-picker")?.scrollIntoView({ behavior: "smooth", block: "center" })}
                               className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#211719] text-white transition hover:scale-105"
                               aria-label="Add another garment"
                             >
                               <Plus />
                             </button>
                           </div>
                         )}

                         {selected.length > 0 && (
                          <div className="mt-7 rounded-[20px] border border-black/10 bg-white/40 p-4 md:p-5">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-[10px] uppercase tracking-[0.2em] text-black/55">Your selection</p>
                                <p className="mt-1 font-serif text-2xl">{selected.length} {selected.length === 1 ? "garment" : "garments"}</p>
                              </div>
                              {discountPercent > 0 && (
                                <div className="rounded-full bg-[#A77A42]/10 px-3 py-2 text-[10px] uppercase tracking-[0.13em] text-[#8B642F]">
                                  {discountPercent}% bundle saving
                                </div>
                              )}
                            </div>

                            <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                              {selected.map((item) => (
                                <div key={item.id} className="group relative min-w-[96px] overflow-hidden rounded-xl bg-black">
                                  <img src={item.image} alt={item.name} className="h-[112px] w-[96px] object-cover" />
                                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                                    <p className="font-serif text-sm text-white">{item.name}</p>
                                  </div>
                                  <button type="button" onClick={() => removeGarment(item.id)} className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-black" aria-label={`Remove ${item.name}`}>×</button>
                                </div>
                              ))}
                            </div>

                            <div className="mt-4 flex items-center justify-between border-t border-black/10 pt-4">
                              <span className="text-[10px] uppercase tracking-[0.15em] text-black/55">Estimated total</span>
                              <span className="font-serif text-2xl">₹{total}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {step === 2 && (
                      <div>
                        <div className="grid gap-6 md:grid-cols-[1fr_180px] md:items-end">
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.22em] text-[#A77A42]">Step 02 · Fit</p>
                            <h4 className="mt-3 font-serif text-[clamp(42px,6vw,66px)] leading-[0.84] tracking-[-0.05em]">
                              Tell us what
                              <br />
                              <span className="italic">feels wrong.</span>
                            </h4>
                            <p className="mt-5 max-w-[440px] text-sm leading-6 text-black/60">
                              You don't need to know tailoring terminology. Choose what you notice — our Fit Consultant will assess the rest.
                            </p>
                          </div>
                          <div className="hidden overflow-hidden rounded-[20px] md:block">
                            <img src={IMAGES.consultation} alt="Fit consultation" className="aspect-square w-full object-cover" />
                          </div>
                        </div>

                        <div className="mt-7 flex items-center justify-between rounded-[18px] border border-black/10 bg-white/40 px-4 py-3">
                           <div>
                             <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-black/60">Not sure what to choose?</p>
                             <p className="mt-1 text-[10px] text-black/55">Choose this and we'll assess the fit at home.</p>
                           </div>
                           <button
                             type="button"
                             onClick={() => setIssues((current) => current.includes("Not sure") ? current : [...current, "Not sure"])}
                             className={`rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] transition ${issues.includes("Not sure") ? "bg-[#211719] text-white" : "border border-black/10 bg-white text-black"}`}
                           >
                             Not sure
                           </button>
                         </div>

                         <div className="mt-6 grid grid-cols-2 gap-2">
                          {[
                            ["Too loose", GARMENTS[0].image],
                            ["Too tight", GARMENTS[1].image],
                            ["Too long", GARMENTS[2].image],
                            ["Too short", GARMENTS[4].image],
                            ["Wrong shape", GARMENTS[5].image],
                            ["Not sure", IMAGES.consultation],
                          ].map(([issue, image]) => {
                            const active = issues.includes(issue);
                            return (
                              <button
                                key={issue}
                                type="button"
                                onClick={() => toggleIssue(issue)}
                                className={`group relative min-h-[150px] overflow-hidden rounded-[18px] text-left transition ${active ? "ring-2 ring-[#A77A42] ring-offset-2 ring-offset-[#F7F1E7]" : ""}`}
                              >
                                <img src={image} alt="" className={`absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] ${active ? "scale-105" : ""}`} />
                                <div className={`absolute inset-0 ${active ? "bg-[#211719]/65" : "bg-[#211719]/45"}`} />
                                <div className="absolute inset-x-4 bottom-4 flex items-end justify-between text-white">
                                  <span className="font-serif text-2xl">{issue}</span>
                                  <span className={`flex h-7 w-7 items-center justify-center rounded-full border ${active ? "border-white bg-white text-black" : "border-white/40 bg-black/10"}`}>
                                    {active ? <Check /> : "+"}
                                  </span>
                                </div>
                              </button>
                            );
                          })}
                        </div>

                        <div className="mt-6 rounded-[20px] bg-[#211719] p-5 text-white">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-[10px] uppercase tracking-[0.2em] text-white/55">Selected garments</p>
                              <p className="mt-1 font-serif text-2xl">{selected.length} {selected.length === 1 ? "piece" : "pieces"} to assess</p>
                            </div>
                            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 font-serif">{issues.length}</span>
                          </div>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {selected.map((item) => (
                              <span key={item.id} className="rounded-full bg-white/10 px-3 py-2 text-[10px] uppercase tracking-[0.12em] text-white/65">{item.name}</span>
                            ))}
                          </div>
                          <p className="mt-4 text-[10px] leading-4 text-white/50">
                            Not sure? That's completely fine. Select “Not sure” and we'll assess the fit at home.
                          </p>
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <form id="linearera-booking-form" onSubmit={submitBooking}>
                        <div className="grid gap-6 md:grid-cols-[1fr_190px] md:items-end">
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.22em] text-[#A77A42]">Step 03 · Doorstep</p>
                            <h4 className="mt-3 font-serif text-[clamp(42px,6vw,66px)] leading-[0.84] tracking-[-0.05em]">
                              Where should
                              <br />
                              <span className="italic">we come?</span>
                            </h4>
                            <p className="mt-5 max-w-[430px] text-sm leading-6 text-black/60">
                              A Fit Consultant visits your home, understands the garments and arranges the next step.
                            </p>
                          </div>
                          <div className="hidden overflow-hidden rounded-[20px] md:block">
                            <img src={IMAGES.home} alt="At-home LinearEra service" className="aspect-[4/5] w-full object-cover" />
                          </div>
                        </div>

                        <div className="mt-8 grid gap-3 sm:grid-cols-2">
                          <label className="rounded-[18px] border border-black/10 bg-white/35 px-4 py-3">
                            <span className="text-[10px] uppercase tracking-[0.16em] text-black/50">Your name</span>
                            <input required type="text" placeholder="Enter your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-2 w-full bg-transparent text-sm outline-none placeholder:text-black/60" />
                          </label>
                          <label className="rounded-[18px] border border-black/10 bg-white/35 px-4 py-3">
                            <span className="text-[10px] uppercase tracking-[0.16em] text-black/50">Phone number</span>
                            <input required type="tel" placeholder="+91" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-2 w-full bg-transparent text-sm outline-none placeholder:text-black/60" />
                          </label>
                          <label className="rounded-[18px] border border-black/10 bg-white/35 px-4 py-3 sm:col-span-2">
                            <span className="text-[10px] uppercase tracking-[0.16em] text-black/50">Area / locality</span>
                            <input required type="text" placeholder="Where in Bengaluru?" value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} className="mt-2 w-full bg-transparent text-sm outline-none placeholder:text-black/60" />
                          </label>
                          <label className="rounded-[18px] border border-black/10 bg-white/35 sm:col-span-2">
                            <span className="block px-4 pt-3 text-[10px] uppercase tracking-[0.16em] text-black/50">Preferred visit time</span>
                            <select required value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className="w-full bg-transparent px-4 py-3 text-sm outline-none">
                              <option value="">Choose a time</option>
                              <option>Morning</option>
                              <option>Afternoon</option>
                              <option>Evening</option>
                            </select>
                          </label>
                        </div>

                        <div className="mt-6 overflow-hidden rounded-[22px] border border-black/10 bg-white/35">
                          <div className="border-b border-black/10 px-5 py-4">
                            <p className="text-[10px] uppercase tracking-[0.2em] text-black/55">What happens next</p>
                          </div>
                          <div className="grid sm:grid-cols-2 lg:grid-cols-4">
                            {[
                              ["01", "We call", "Confirm your visit"],
                              ["02", "We fit", "Assess garments + take measurements"],
                              ["03", "You pay at home", "Final price confirmed after assessment"],
                              ["04", "We handle it", "Tailoring + quality check"],
                            ].map(([number, title, description]) => (
                              <div key={number} className="border-b border-black/10 p-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
                                <span className="text-[10px] text-[#A77A42]">{number}</span>
                                <p className="mt-2 font-serif text-xl">{title}</p>
                                <p className="mt-1 text-[10px] leading-4 text-black/55">{description}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mt-6 rounded-[22px] bg-[#211719] p-5 text-white md:p-6">
                          <div className="flex items-end justify-between gap-4">
                            <div>
                              <p className="text-[10px] uppercase tracking-[0.2em] text-white/55">Estimated starting price</p>
                              <p className="mt-1 font-serif text-4xl">₹{total}</p>
                            </div>
                          <p className="mt-4 border-t border-white/10 pt-4 text-[11px] leading-5 text-white/65">
                            No payment required now. Your Fit Consultant will assess the garments, take measurements and confirm the final alteration price with you at home. Payment is collected after the assessment.
                          </p>
                            {discountPercent > 0 && (
                              <span className="rounded-full bg-[#A77A42]/15 px-3 py-2 text-[10px] uppercase tracking-[0.13em] text-[#D4B277]">
                                {discountPercent}% bundle saving
                              </span>
                            )}
                          </div>
                          <div className="mt-5 border-t border-white/10 pt-4">
                            <div className="flex justify-between text-[10px] text-white/60"><span>Garments</span><span>{selected.length}</span></div>
                            <div className="mt-2 flex justify-between text-[10px] text-white/60"><span>Subtotal</span><span>₹{subtotal}</span></div>
                            {discount > 0 && <div className="mt-2 flex justify-between text-[10px] text-[#D4B277]"><span>Bundle saving</span><span>-₹{discount}</span></div>}
                          </div>
                          <p className="mt-5 text-[10px] leading-4 text-white/65">
                            Starting prices are estimates. Final pricing is confirmed after the Fit Consultant assesses the garment.
                          </p>
                        </div>
                      </form>
                    )}
                  </>
                )}
              </div>
            </div>

            {!submitted && (
              <div className="border-t border-black/10 bg-[#EEE5DA] px-5 py-4 md:px-8">
                <div className="flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => step === 1 ? closeBooking() : setStep(step - 1)}
                    className="px-2 py-3 text-[10px] uppercase tracking-[0.15em] text-black/55 transition hover:text-black"
                  >
                    {step === 1 ? "Cancel" : "Back"}
                  </button>

                  {step < 3 ? (
                    <button
                      type="button"
                      disabled={(step === 1 && selected.length === 0) || (step === 2 && issues.length === 0)}
                      onClick={() => setStep(step + 1)}
                      className="flex items-center gap-3 rounded-full bg-[#211719] px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.17em] text-white shadow-[0_12px_30px_rgba(33,23,25,0.2)] transition hover:bg-[#3A2528] disabled:cursor-not-allowed disabled:opacity-20"
                    >
                      {step === 1 ? "Continue to fit" : "Continue to visit"}
                      <Arrow />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      form="linearera-booking-form"
                      className="flex items-center gap-3 rounded-full bg-[#211719] px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.17em] text-white shadow-[0_12px_30px_rgba(33,23,25,0.2)] transition hover:bg-[#3A2528]"
                    >
                      Request my fit visit
                      <Arrow />
                    </button>
                  )}
                </div>
              </div>
            )}
          </aside>
        </div>
      )}

    </main>
  );
}
