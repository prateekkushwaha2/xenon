"use client";

import {
  useEffect,
  useMemo,
  useState,
  type FormEvent,
} from "react";

/* =========================================================
   TYPES
========================================================= */

type GarmentType =
  | "Shirt"
  | "Pants / Jeans"
  | "Dress"
  | "T-shirt"
  | "Jacket"
  | "Repair";

type OrderType = "Just me" | "Family / Friends";

type Garment = {
  id: string;
  type: GarmentType;
  issue?: string;
};

/* =========================================================
   PRICING
========================================================= */

const PRICING: Record<GarmentType, number> = {
  Shirt: 199,
  "Pants / Jeans": 199,
  Dress: 299,
  "T-shirt": 149,
  Jacket: 399,
  Repair: 149,
};

const BUNDLE_DISCOUNTS = [
  { minimum: 5, discount: 20 },
  { minimum: 3, discount: 15 },
  { minimum: 2, discount: 10 },
  { minimum: 1, discount: 0 },
];

/* =========================================================
   GARMENTS
========================================================= */

const GARMENTS: {
  type: GarmentType;
  image: string;
  description: string;
}[] = [
  {
    type: "Pants / Jeans",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1200&q=85",
    description: "Length · waist · taper",
  },
  {
    type: "Shirt",
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&q=85",
    description: "Sleeves · waist · shoulders",
  },
  {
    type: "Dress",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1200&q=85",
    description: "Length · waist · fit",
  },
  {
    type: "T-shirt",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=85",
    description: "Length · sleeves · body",
  },
  {
    type: "Jacket",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=85",
    description: "Sleeves · waist · shoulders",
  },
  {
    type: "Repair",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=85",
    description: "Zip · button · tear",
  },
];

/* =========================================================
   FIT PROBLEMS
========================================================= */

const FIT_ISSUES = [
  {
    title: "Too loose",
    icon: "↔",
    description: "Needs taking in",
  },
  {
    title: "Too tight",
    icon: "⇆",
    description: "Needs more room",
  },
  {
    title: "Too long",
    icon: "↕",
    description: "Reduce length",
  },
  {
    title: "Too short",
    icon: "↕",
    description: "Adjust length",
  },
  {
    title: "Sleeves",
    icon: "⌁",
    description: "Length or shape",
  },
  {
    title: "Waist",
    icon: "◌",
    description: "Waist adjustment",
  },
  {
    title: "Not sure",
    icon: "?",
    description: "We'll assess it",
  },
];

/* =========================================================
   SERVICES
========================================================= */

const SERVICES = [
  "Trouser & Jeans Alteration",
  "Shirt Alteration",
  "T-shirt Alteration",
  "Dress Alteration",
  "Sleeve Adjustment",
  "Waist Adjustment",
  "Length Adjustment",
  "Zipper & Minor Repairs",
];

/* =========================================================
   HELPERS
========================================================= */

function uid() {
  return `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}`;
}

/* =========================================================
   MAIN
========================================================= */

export default function Home() {
  const [bookingOpen, setBookingOpen] =
    useState(false);

  const [selectedFit, setSelectedFit] =
    useState("");

  const [bookingStep, setBookingStep] =
    useState(1);

  const [orderType, setOrderType] =
    useState<OrderType>("Just me");

  const [garments, setGarments] =
    useState<Garment[]>([]);

  const [activeGarmentId, setActiveGarmentId] =
    useState<string | null>(null);

  const [name, setName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [area, setArea] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [submitted, setSubmitted] =
    useState(false);

  const [mobileMenu, setMobileMenu] =
    useState(false);

  /* =======================================================
     BODY LOCK WHEN BOOKING OPEN
  ======================================================= */

  useEffect(() => {
    document.body.style.overflow =
      bookingOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [bookingOpen]);

  /* =======================================================
     BOOKING PRICING
  ======================================================= */

  const subtotal = useMemo(
    () =>
      garments.reduce(
        (sum, garment) =>
          sum + PRICING[garment.type],
        0
      ),
    [garments]
  );

  const discountRate = useMemo(() => {
    if (garments.length >= 5) return 20;
    if (garments.length >= 3) return 15;
    if (garments.length >= 2) return 10;
    return 0;
  }, [garments.length]);

  const discount = Math.round(
    (subtotal * discountRate) / 100
  );

  const estimatedTotal =
    subtotal - discount;

  const activeGarment =
    garments.find(
      (garment) =>
        garment.id === activeGarmentId
    );

  /* =======================================================
     BOOKING
  ======================================================= */

  function openBooking(
    initialGarment?: GarmentType
  ) {
    if (initialGarment) {
      const garment = {
        id: uid(),
        type: initialGarment,
      };

      setGarments((current) => [
        ...current,
        garment,
      ]);

      setActiveGarmentId(
        garment.id
      );
    }

    setBookingOpen(true);
  }

  function closeBooking() {
    setBookingOpen(false);
  }

  function addGarment(
    type: GarmentType
  ) {
    const garment: Garment = {
      id: uid(),
      type,
    };

    setGarments((current) => [
      ...current,
      garment,
    ]);

    setActiveGarmentId(
      garment.id
    );
  }

  function removeGarment(
    id: string
  ) {
    setGarments((current) =>
      current.filter(
        (garment) =>
          garment.id !== id
      )
    );

    if (
      activeGarmentId === id
    ) {
      setActiveGarmentId(null);
    }
  }

  function selectIssue(
    issue: string
  ) {
    if (!activeGarmentId)
      return;

    setGarments((current) =>
      current.map((garment) =>
        garment.id ===
        activeGarmentId
          ? {
              ...garment,
              issue,
            }
          : garment
      )
    );
  }

  function startBooking() {
    setBookingStep(1);
    setSubmitted(false);
    setBookingOpen(true);
  }

  function goToStepTwo() {
    if (!garments.length)
      return;

    setActiveGarmentId(
      garments[0].id
    );

    setBookingStep(2);
  }

  function goToStepThree() {
    const incomplete =
      garments.find(
        (garment) =>
          !garment.issue
      );

    if (incomplete) {
      setActiveGarmentId(
        incomplete.id
      );

      setBookingStep(2);
      return;
    }

    setBookingStep(3);
  }

  function submitBooking(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setSubmitted(true);
  }

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f5f1e8] text-[#171713]">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <nav className="fixed inset-x-0 top-0 z-40 border-b border-black/10 bg-[#f5f1e8]/90 backdrop-blur-xl">

        <div className="mx-auto flex h-[76px] max-w-[1500px] items-center justify-between px-5 sm:px-8 lg:px-12">

          <a
            href="#top"
            className="font-serif text-2xl tracking-[-0.04em] sm:text-3xl"
          >
            LinearEra
          </a>

          {/* DESKTOP NAV */}

          <div className="hidden items-center gap-8 text-[11px] font-medium uppercase tracking-[0.18em] lg:flex">

            <a
              href="#problem"
              className="transition hover:opacity-50"
            >
              Why LinearEra
            </a>

            <a
              href="#how-it-works"
              className="transition hover:opacity-50"
            >
              How it works
            </a>

            <a
              href="#services"
              className="transition hover:opacity-50"
            >
              Services
            </a>

            <a
              href="#pricing"
              className="transition hover:opacity-50"
            >
              Pricing
            </a>

          </div>

          <div className="flex items-center gap-3">

            <button
              onClick={startBooking}
              className="rounded-full bg-[#171713] px-5 py-3 text-[11px] font-medium uppercase tracking-[0.12em] text-white transition hover:opacity-85 sm:px-6"
            >
              Book a Fit Visit
            </button>

            <button
              onClick={() =>
                setMobileMenu(
                  !mobileMenu
                )
              }
              className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 lg:hidden"
              aria-label="Menu"
            >
              {mobileMenu
                ? "×"
                : "☰"}
            </button>

          </div>

        </div>

        {/* MOBILE MENU */}

        {mobileMenu && (
          <div className="border-t border-black/10 bg-[#f5f1e8] px-5 py-6 lg:hidden">

            <div className="flex flex-col gap-5 text-sm">

              <a
                href="#problem"
                onClick={() =>
                  setMobileMenu(
                    false
                  )
                }
              >
                Why LinearEra
              </a>

              <a
                href="#how-it-works"
                onClick={() =>
                  setMobileMenu(
                    false
                  )
                }
              >
                How it works
              </a>

              <a
                href="#services"
                onClick={() =>
                  setMobileMenu(
                    false
                  )
                }
              >
                Services
              </a>

              <a
                href="#pricing"
                onClick={() =>
                  setMobileMenu(
                    false
                  )
                }
              >
                Pricing
              </a>

              <button
                onClick={() => {
                  setMobileMenu(
                    false
                  );
                  startBooking();
                }}
                className="rounded-full bg-[#171713] px-6 py-4 text-left text-white"
              >
                Book a Fit Visit →
              </button>

            </div>

          </div>
        )}

      </nav>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        id="top"
        className="relative px-5 pb-20 pt-32 sm:px-8 lg:px-12 lg:pb-28 lg:pt-40"
      >

        <div className="mx-auto grid max-w-[1500px] items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">

          {/* COPY */}

          <div>

            <div className="mb-7 flex items-center gap-3">

              <span className="h-px w-10 bg-[#b39a61]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#8e816c]">
                Doorstep clothing alterations
              </span>

            </div>

            <h1 className="max-w-4xl font-serif text-[58px] leading-[0.88] tracking-[-0.06em] sm:text-7xl lg:text-[92px] xl:text-[108px]">

              STOP GOING
              <br />
              TO TAILORS.

            </h1>

            <p className="mt-8 max-w-xl text-base leading-7 text-[#6f695e] sm:text-lg">

              Professional clothing alterations,
              <br className="hidden sm:block" />
              at your doorstep.

            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">

              <button
                onClick={startBooking}
                className="rounded-full bg-[#171713] px-7 py-4 text-sm font-medium text-white transition hover:scale-[1.01] hover:opacity-90"
              >
                Book a Fit Visit →
              </button>

              <a
                href="#fit-check"
                className="rounded-full border border-black/15 px-7 py-4 text-center text-sm font-medium transition hover:bg-[#171713] hover:text-white"
              >
                I don't know what's wrong
              </a>

            </div>

            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-[9px] font-medium uppercase tracking-[0.22em] text-[#958b7a]">

              <span>At your doorstep</span>
              <span>Fit-first</span>
              <span>Quality checked</span>

            </div>

          </div>

          {/* HERO VISUAL */}

          <div className="relative">

            <div className="relative aspect-[1/1.02] overflow-hidden rounded-[30px] bg-[#d8d0c0] sm:rounded-[40px]">

              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=90"
                alt="Clothing fitting"
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-black/5" />

              <div className="absolute bottom-7 left-7 right-7 text-white sm:bottom-10 sm:left-10 sm:right-10">

                <p className="text-[9px] uppercase tracking-[0.3em] text-white/60">
                  LinearEra Fit Visit
                </p>

                <p className="mt-3 max-w-lg font-serif text-3xl leading-none tracking-[-0.03em] sm:text-5xl">
                  Your clothes.
                  <br />
                  Your fit.
                  <br />
                  Your doorstep.
                </p>

              </div>

            </div>

            <div className="absolute -bottom-5 left-5 hidden rounded-2xl border border-black/10 bg-[#f8f5ef] p-5 shadow-xl sm:block lg:-left-6">

              <p className="text-[9px] uppercase tracking-[0.25em] text-[#968b79]">
                The difference
              </p>

              <p className="mt-2 font-serif text-xl">
                No tailor trip.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          PROBLEM — VISUAL JOURNEY
      ===================================================== */}

      <section
        id="problem"
        className="border-y border-black/10 bg-[#171713] px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-28"
      >

        <div className="mx-auto max-w-[1500px]">

          <div className="max-w-3xl">

            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/35">
              The old way
            </p>

            <h2 className="mt-5 font-serif text-5xl leading-[0.92] tracking-[-0.05em] sm:text-6xl lg:text-8xl">
              All this...
              <br />
              for a simple alteration?
            </h2>

          </div>

          {/* VISUAL JOURNEY */}

          <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

            <ProblemVisual
              number="01"
              title="TRAFFIC"
              icon="🚗"
              text="Drive across the city just to reach a tailor."
            />

            <ProblemVisual
              number="02"
              title="PARKING"
              icon="P"
              text="Circle around looking for a place to stop."
            />

            <ProblemVisual
              number="03"
              title="CROWDED SHOP"
              icon="👥"
              text="Wait while someone explains their alteration."
            />

            <ProblemVisual
              number="04"
              title="EXPLAINING"
              icon="✋"
              text="Try to explain exactly what feels wrong."
            />

            <ProblemVisual
              number="05"
              title="WAITING"
              icon="◷"
              text="Leave the garment and wait for it to be ready."
            />

            <ProblemVisual
              number="06"
              title="MULTIPLE VISITS"
              icon="↻"
              text="Come back again. Sometimes more than once."
            />

          </div>

          <div className="mt-16 border-t border-white/10 pt-10">

            <p className="max-w-3xl font-serif text-3xl leading-tight tracking-[-0.03em] text-white/90 sm:text-5xl">
              There has to be
              <br />
              a better way.
            </p>

          </div>

        </div>

      </section>

      {/* =====================================================
          SOLUTION
      ===================================================== */}

      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-32">

        <div className="mx-auto max-w-[1500px]">

          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">

            <div>

              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#968b79]">
                The LinearEra way
              </p>

              <h2 className="mt-5 max-w-xl font-serif text-5xl leading-[0.95] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
                The tailor
                <br />
                comes to you.
              </h2>

            </div>

            <p className="max-w-xl text-base leading-7 text-[#70695d] lg:pb-2">
              Instead of making you travel with your clothes,
              LinearEra brings a trained Fit Consultant to your
              doorstep. We understand the fit first, then take
              care of the alteration.
            </p>

          </div>

          {/* VISUAL PROCESS */}

          <div className="mt-16 overflow-hidden rounded-[32px] border border-black/10 bg-[#e9e2d6]">

            <div className="grid lg:grid-cols-4">

              <SolutionStep
                number="01"
                title="YOU"
                icon="◯"
                text="Show us the garment and tell us what feels wrong."
              />

              <SolutionStep
                number="02"
                title="FIT CONSULTANT"
                icon="⌁"
                text="We assess the fit and take the required measurements."
              />

              <SolutionStep
                number="03"
                title="TAILORING SPECIALIST"
                icon="✂"
                text="The garment is altered by a skilled specialist."
              />

              <SolutionStep
                number="04"
                title="BACK TO YOU"
                icon="✓"
                text="After quality checking, it comes back to your doorstep."
              />

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          HOW IT WORKS
      ===================================================== */}

      <section
        id="how-it-works"
        className="bg-[#e8e0d3] px-5 py-20 sm:px-8 lg:px-12 lg:py-32"
      >

        <div className="mx-auto max-w-[1500px]">

          <div className="max-w-3xl">

            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#968b79]">
              How it works
            </p>

            <h2 className="mt-5 font-serif text-5xl leading-[0.94] tracking-[-0.05em] sm:text-6xl lg:text-8xl">
              Three simple
              <br />
              steps.
            </h2>

          </div>

          <div className="mt-14 grid gap-3 lg:grid-cols-3">

            <LargeStep
              number="01"
              title="Book"
              text="Tell us what needs fixing. You can select one garment or bring several."
            />

            <LargeStep
              number="02"
              title="We visit"
              text="A trained Fit Consultant comes to your home, checks the fit and takes measurements."
            />

            <LargeStep
              number="03"
              title="We take care of it"
              text="The garment is altered, quality checked and returned to your doorstep."
            />

          </div>

        </div>

      </section>

      {/* =====================================================
          FIT CHECK
      ===================================================== */}

      <section
        id="fit-check"
        className="bg-[#171713] px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-32"
      >

        <div className="mx-auto max-w-[1500px]">

          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">

            <div>

              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/35">
                Not sure?
              </p>

              <h2 className="mt-5 font-serif text-5xl leading-[0.94] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
                What's wrong
                <br />
                with your fit?
              </h2>

              <p className="mt-6 max-w-md text-sm leading-6 text-white/50">
                You don't need to know tailoring terminology.
                Tell us what feels wrong and we'll help figure
                out what needs to change.
              </p>

            </div>

            <div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">

                {FIT_ISSUES.map(
                  (issue) => {
                    const selected =
                      selectedFit ===
                      issue.title;

                    return (
                      <button
                        key={
                          issue.title
                        }
                        onClick={() =>
                          setSelectedFit(
                            issue.title
                          )
                        }
                        className={`min-h-[145px] rounded-[24px] border p-5 text-left transition ${
                          selected
                            ? "border-white bg-white text-[#171713]"
                            : "border-white/10 bg-white/[0.03] hover:border-white/30"
                        }`}
                      >

                        <div
                          className={`flex h-11 w-11 items-center justify-center rounded-full text-xl ${
                            selected
                              ? "bg-[#eee8dc]"
                              : "bg-white/10"
                          }`}
                        >
                          {
                            issue.icon
                          }
                        </div>

                        <p className="mt-7 text-sm font-medium">
                          {
                            issue.title
                          }
                        </p>

                        <p
                          className={`mt-1 text-[10px] ${
                            selected
                              ? "text-black/50"
                              : "text-white/40"
                          }`}
                        >
                          {
                            issue.description
                          }
                        </p>

                      </button>
                    );
                  }
                )}

              </div>

              {selectedFit && (
                <div className="mt-4 flex flex-col justify-between gap-5 rounded-[24px] border border-white/10 bg-white/[0.05] p-6 sm:flex-row sm:items-center">

                  <div>

                    <p className="text-[9px] uppercase tracking-[0.25em] text-white/35">
                      Your selection
                    </p>

                    <p className="mt-2 text-lg">
                      {selectedFit}
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      startBooking()
                    }
                    className="rounded-full bg-white px-6 py-4 text-sm font-medium text-black"
                  >
                    Let us check it →
                  </button>

                </div>
              )}

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          SERVICES
      ===================================================== */}

      <section
        id="services"
        className="bg-white px-5 py-20 sm:px-8 lg:px-12 lg:py-32"
      >

        <div className="mx-auto max-w-[1500px]">

          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">

            <div>

              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#968b79]">
                What we fix
              </p>

              <h2 className="mt-5 font-serif text-5xl leading-[0.95] tracking-[-0.05em] sm:text-6xl">
                Small change.
                <br />
                Big difference.
              </h2>

              <p className="mt-6 max-w-md text-sm leading-6 text-[#70695d]">
                From everyday trousers to dresses, shirts and
                jackets — if the garment can be altered, we
                can assess it.
              </p>

            </div>

            <div className="border-t border-black/10">

              {SERVICES.map(
                (service, index) => (
                  <button
                    key={service}
                    onClick={() =>
                      openBooking(
                        service.includes(
                          "Trouser"
                        )
                          ? "Pants / Jeans"
                          : service.includes(
                              "Shirt"
                            )
                          ? "Shirt"
                          : service.includes(
                              "T-shirt"
                            )
                          ? "T-shirt"
                          : service.includes(
                              "Dress"
                            )
                          ? "Dress"
                          : service.includes(
                              "Zipper"
                            )
                          ? "Repair"
                          : "Shirt"
                      )
                    }
                    className="group flex w-full items-center justify-between border-b border-black/10 py-6 text-left transition hover:px-3"
                  >

                    <div className="flex items-center gap-5">

                      <span className="text-[9px] tracking-[0.2em] text-[#a1937e]">
                        {String(
                          index + 1
                        ).padStart(
                          2,
                          "0"
                        )}
                      </span>

                      <span className="text-sm sm:text-base">
                        {service}
                      </span>

                    </div>

                    <span className="text-lg text-black/25 transition group-hover:translate-x-1 group-hover:text-black">
                      →
                    </span>

                  </button>
                )
              )}

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          PRICING
      ===================================================== */}

      <section
        id="pricing"
        className="px-5 py-20 sm:px-8 lg:px-12 lg:py-32"
      >

        <div className="mx-auto max-w-[1500px]">

          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">

            <div>

              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#968b79]">
                Simple pricing
              </p>

              <h2 className="mt-5 font-serif text-5xl leading-[0.94] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
                Better together.
              </h2>

            </div>

            <p className="max-w-md text-sm leading-6 text-[#70695d]">
              Bring more than one garment during the same visit
              and save more. Prices shown are estimated and final
              pricing is confirmed after assessment.
            </p>

          </div>

          <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

            {GARMENTS.slice(
              0,
              6
            ).map((garment) => (
              <button
                key={garment.type}
                onClick={() =>
                  openBooking(
                    garment.type
                  )
                }
                className="group overflow-hidden rounded-[28px] border border-black/10 bg-white text-left transition hover:-translate-y-1 hover:shadow-xl"
              >

                <div className="relative aspect-[1.15] overflow-hidden">

                  <img
                    src={
                      garment.image
                    }
                    alt={
                      garment.type
                    }
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  <div className="absolute bottom-5 left-5 right-5 text-white">

                    <p className="font-serif text-2xl">
                      {
                        garment.type
                      }
                    </p>

                    <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-white/70">
                      From ₹
                      {
                        PRICING[
                          garment.type
                        ]
                      }
                    </p>

                  </div>

                </div>

                <div className="flex items-center justify-between px-5 py-5">

                  <span className="text-xs text-[#777064]">
                    Add to visit
                  </span>

                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eee8dc] transition group-hover:bg-[#171713] group-hover:text-white">
                    +
                  </span>

                </div>

              </button>
            ))}

          </div>

          {/* BUNDLE */}

          <div className="mt-4 grid gap-3 sm:grid-cols-4">

            <BundleItem
              count="1 garment"
              saving="Regular price"
            />

            <BundleItem
              count="2 garments"
              saving="10% off"
              active
            />

            <BundleItem
              count="3+ garments"
              saving="15% off"
              active
            />

            <BundleItem
              count="5+ garments"
              saving="20% off"
              active
            />

          </div>

        </div>

      </section>

      {/* =====================================================
          BEFORE / AFTER
      ===================================================== */}

      <section className="bg-[#171713] px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-32">

        <div className="mx-auto max-w-[1500px]">

          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">

            <div>

              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/35">
                The result
              </p>

              <h2 className="mt-5 font-serif text-5xl leading-[0.94] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
                The difference
                <br />
                is in the fit.
              </h2>

            </div>

            <p className="max-w-xl text-sm leading-7 text-white/50">
              Good alterations shouldn't make a garment look
              altered. They should make it look like it was made
              for you.
            </p>

          </div>

          <div className="mt-14 grid gap-3 md:grid-cols-2">

            <BeforeAfter
              label="BEFORE"
              image="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=85"
              text="Something feels off."
            />

            <BeforeAfter
              label="AFTER"
              image="https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=1200&q=85"
              text="Now it feels right."
            />

          </div>

        </div>

      </section>

      {/* =====================================================
          GROUP ORDER
      ===================================================== */}

      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-32">

        <div className="mx-auto max-w-[1500px]">

          <div className="overflow-hidden rounded-[34px] bg-[#d9d0bf]">

            <div className="grid lg:grid-cols-[1fr_0.85fr]">

              <div className="p-8 sm:p-12 lg:p-20">

                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#7f725e]">
                  Fit together
                </p>

                <h2 className="mt-5 max-w-xl font-serif text-5xl leading-[0.94] tracking-[-0.05em] sm:text-6xl">
                  One visit.
                  <br />
                  Multiple wardrobes.
                </h2>

                <p className="mt-7 max-w-lg text-sm leading-7 text-[#665f54]">
                  Ordering for your family, partner, roommates
                  or friends? Put the garments together in one
                  visit and unlock bundle savings.
                </p>

                <button
                  onClick={() => {
                    setOrderType(
                      "Family / Friends"
                    );
                    startBooking();
                  }}
                  className="mt-8 rounded-full bg-[#171713] px-7 py-4 text-sm font-medium text-white"
                >
                  Book together →
                </button>

              </div>

              <div className="relative min-h-[340px] overflow-hidden lg:min-h-full">

                <img
                  src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85"
                  alt="Fashion wardrobe"
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-black/20" />

                <div className="absolute bottom-7 left-7 rounded-2xl bg-white/90 p-5 text-[#171713] backdrop-blur">

                  <p className="text-[9px] uppercase tracking-[0.2em] text-black/40">
                    Bundle
                  </p>

                  <p className="mt-1 font-serif text-2xl">
                    Up to 20% off
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="bg-[#eee7da] px-5 py-24 sm:px-8 lg:px-12 lg:py-36">

        <div className="mx-auto max-w-[1200px] text-center">

          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#968b79]">
            Your clothes deserve better
          </p>

          <h2 className="mt-6 font-serif text-6xl leading-[0.88] tracking-[-0.06em] sm:text-7xl lg:text-[110px]">
            STOP GOING
            <br />
            TO TAILORS.
          </h2>

          <p className="mx-auto mt-8 max-w-lg text-sm leading-7 text-[#70695d] sm:text-base">
            Professional clothing alterations,
            without the trip.
          </p>

          <button
            onClick={startBooking}
            className="mt-9 rounded-full bg-[#171713] px-8 py-5 text-sm font-medium text-white transition hover:opacity-90"
          >
            Book a Fit Visit →
          </button>

        </div>

      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="bg-[#171713] px-5 py-12 text-white sm:px-8 lg:px-12">

        <div className="mx-auto max-w-[1500px]">

          <div className="flex flex-col justify-between gap-10 sm:flex-row sm:items-end">

            <div>

              <div className="font-serif text-3xl tracking-[-0.04em]">
                LinearEra
              </div>

              <p className="mt-3 max-w-xs text-xs leading-5 text-white/35">
                Professional clothing alterations,
                brought to your doorstep.
              </p>

            </div>

            <div className="flex flex-wrap gap-x-7 gap-y-3 text-[10px] uppercase tracking-[0.18em] text-white/35">

              <a href="#problem">
                Why LinearEra
              </a>

              <a href="#how-it-works">
                How it works
              </a>

              <a href="#services">
                Services
              </a>

              <a href="#pricing">
                Pricing
              </a>

            </div>

          </div>

          <div className="mt-12 border-t border-white/10 pt-6 text-[10px] text-white/25">
            © {new Date().getFullYear()} LinearEra. All rights reserved.
          </div>

        </div>

      </footer>

      {/* =====================================================
          BOOKING DRAWER
      ===================================================== */}

      {bookingOpen && (
        <BookingDrawer
          step={bookingStep}
          setStep={setBookingStep}
          orderType={orderType}
          setOrderType={setOrderType}
          garments={garments}
          activeGarment={
            activeGarment
          }
          activeGarmentId={
            activeGarmentId
          }
          setActiveGarmentId={
            setActiveGarmentId
          }
          addGarment={
            addGarment
          }
          removeGarment={
            removeGarment
          }
          selectIssue={
            selectIssue
          }
          goToStepTwo={
            goToStepTwo
          }
          goToStepThree={
            goToStepThree
          }
          subtotal={subtotal}
          discount={discount}
          discountRate={
            discountRate
          }
          total={
            estimatedTotal
          }
          name={name}
          phone={phone}
          area={area}
          address={address}
          setName={setName}
          setPhone={setPhone}
          setArea={setArea}
          setAddress={setAddress}
          submitted={submitted}
          submitBooking={
            submitBooking
          }
          closeBooking={
            closeBooking
          }
        />
      )}

    </main>
  );
}

/* =========================================================
   PROBLEM VISUAL
========================================================= */

function ProblemVisual({
  number,
  title,
  icon,
  text,
}: {
  number: string;
  title: string;
  icon: string;
  text: string;
}) {
  return (
    <div className="group relative min-h-[260px] overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.035] p-6 transition hover:bg-white/[0.07] sm:p-8">

      <div className="flex items-start justify-between">

        <span className="text-[9px] tracking-[0.25em] text-white/30">
          {number}
        </span>

        <span className="text-4xl opacity-80 transition duration-300 group-hover:scale-110">
          {icon}
        </span>

      </div>

      <div className="absolute bottom-7 left-7 right-7">

        <p className="font-serif text-3xl tracking-[-0.03em]">
          {title}
        </p>

        <p className="mt-3 max-w-xs text-xs leading-5 text-white/40">
          {text}
        </p>

      </div>

    </div>
  );
}

/* =========================================================
   SOLUTION STEP
========================================================= */

function SolutionStep({
  number,
  title,
  icon,
  text,
}: {
  number: string;
  title: string;
  icon: string;
  text: string;
}) {
  return (
    <div className="border-b border-black/10 p-7 last:border-b-0 sm:p-9 lg:border-b-0 lg:border-r lg:last:border-r-0">

      <div className="flex items-center justify-between">

        <span className="text-[9px] tracking-[0.2em] text-[#988b76]">
          {number}
        </span>

        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white font-serif text-lg">
          {icon}
        </span>

      </div>

      <p className="mt-16 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7f725e]">
        {title}
      </p>

      <p className="mt-4 text-sm leading-6 text-[#70695d]">
        {text}
      </p>

    </div>
  );
}

/* =========================================================
   LARGE STEP
========================================================= */

function LargeStep({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="min-h-[310px] rounded-[28px] border border-black/10 bg-[#f5f1e8] p-7 sm:p-9">

      <div className="flex items-center justify-between">

        <span className="font-serif text-4xl text-[#b19a68]">
          {number}
        </span>

        <span className="text-[9px] uppercase tracking-[0.25em] text-[#968b79]">
          LinearEra
        </span>

      </div>

      <div className="mt-24">

        <h3 className="font-serif text-4xl tracking-[-0.04em]">
          {title}
        </h3>

        <p className="mt-4 max-w-sm text-sm leading-6 text-[#70695d]">
          {text}
        </p>

      </div>

    </div>
  );
}

/* =========================================================
   BUNDLE ITEM
========================================================= */

function BundleItem({
  count,
  saving,
  active = false,
}: {
  count: string;
  saving: string;
  active?: boolean;
}) {
  return (
    <div
      className={`rounded-[20px] border p-5 ${
        active
          ? "border-[#b6a57f] bg-[#e9e1d3]"
          : "border-black/10 bg-white/40"
      }`}
    >

      <p className="text-xs font-medium">
        {count}
      </p>

      <p className="mt-2 text-[10px] uppercase tracking-[0.15em] text-[#80735e]">
        {saving}
      </p>

    </div>
  );
}

/* =========================================================
   BEFORE AFTER
========================================================= */

function BeforeAfter({
  label,
  image,
  text,
}: {
  label: string;
  image: string;
  text: string;
}) {
  return (
    <div className="group relative aspect-[1.25] overflow-hidden rounded-[28px]">

      <img
        src={image}
        alt={label}
        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      <div className="absolute bottom-6 left-6 right-6">

        <div className="flex items-center justify-between">

          <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/60">
            {label}
          </span>

          <span className="text-white/40">
            {label === "BEFORE"
              ? "01"
              : "02"}
          </span>

        </div>

        <p className="mt-3 font-serif text-3xl text-white">
          {text}
        </p>

      </div>

    </div>
  );
}

/* =========================================================
   BOOKING DRAWER
========================================================= */

function BookingDrawer({
  step,
  setStep,
  orderType,
  setOrderType,
  garments,
  activeGarment,
  activeGarmentId,
  setActiveGarmentId,
  addGarment,
  removeGarment,
  selectIssue,
  goToStepTwo,
  goToStepThree,
  subtotal,
  discount,
  discountRate,
  total,
  name,
  phone,
  area,
  address,
  setName,
  setPhone,
  setArea,
  setAddress,
  submitted,
  submitBooking,
  closeBooking,
}: {
  step: number;
  setStep: (
    step: number
  ) => void;
  orderType: OrderType;
  setOrderType: (
    value: OrderType
  ) => void;
  garments: Garment[];
  activeGarment?: Garment;
  activeGarmentId: string | null;
  setActiveGarmentId: (
    id: string
  ) => void;
  addGarment: (
    type: GarmentType
  ) => void;
  removeGarment: (
    id: string
  ) => void;
  selectIssue: (
    issue: string
  ) => void;
  goToStepTwo: () => void;
  goToStepThree: () => void;
  subtotal: number;
  discount: number;
  discountRate: number;
  total: number;
  name: string;
  phone: string;
  area: string;
  address: string;
  setName: (
    value: string
  ) => void;
  setPhone: (
    value: string
  ) => void;
  setArea: (
    value: string
  ) => void;
  setAddress: (
    value: string
  ) => void;
  submitted: boolean;
  submitBooking: (
    event: FormEvent<HTMLFormElement>
  ) => void;
  closeBooking: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[100]">

      {/* BACKDROP */}

      <button
        onClick={closeBooking}
        className="absolute inset-0 cursor-default bg-black/55 backdrop-blur-[3px]"
        aria-label="Close booking"
      />

      {/* DRAWER */}

      <div className="absolute inset-x-0 bottom-0 top-0 flex justify-end">

        <div className="relative flex h-full w-full flex-col overflow-hidden bg-[#f4f0e8] shadow-2xl lg:max-w-[1120px] lg:border-l lg:border-black/10">

          {/* =================================================
              DRAWER HEADER
          ================================================= */}

          <header className="flex shrink-0 items-center justify-between border-b border-black/10 bg-[#f4f0e8]/95 px-5 py-4 backdrop-blur-xl sm:px-8">

            <div>

              <p className="font-serif text-2xl tracking-[-0.04em]">
                LinearEra
              </p>

              <div className="mt-2 flex gap-1">

                {[1, 2, 3].map(
                  (item) => (
                    <span
                      key={item}
                      className={`h-1 rounded-full transition-all ${
                        step >= item
                          ? "w-8 bg-[#b39a61]"
                          : "w-3 bg-black/10"
                      }`}
                    />
                  )
                )}

              </div>

            </div>

            <button
              onClick={closeBooking}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 text-lg transition hover:bg-[#171713] hover:text-white"
            >
              ×
            </button>

          </header>

          {/* =================================================
              SUCCESS
          ================================================= */}

          {submitted ? (
            <BookingSuccess
              name={name}
              phone={phone}
              garments={garments}
              total={total}
              closeBooking={
                closeBooking
              }
            />
          ) : (
            <>

              {/* =================================================
                  CONTENT
              ================================================= */}

              <div className="min-h-0 flex-1 overflow-y-auto">

                <div className="grid min-h-full lg:grid-cols-[minmax(0,1fr)_330px]">

                  {/* MAIN BOOKING */}

                  <div className="min-w-0 px-5 pb-32 pt-8 sm:px-8 sm:pb-28 sm:pt-10 lg:px-10 lg:pb-12">

                    {/* STEP 1 */}

                    {step === 1 && (
                      <BookingStepOne
                        orderType={
                          orderType
                        }
                        setOrderType={
                          setOrderType
                        }
                        garments={
                          garments
                        }
                        addGarment={
                          addGarment
                        }
                        removeGarment={
                          removeGarment
                        }
                      />
                    )}

                    {/* STEP 2 */}

                    {step === 2 && (
                      <BookingStepTwo
                        garments={
                          garments
                        }
                        activeGarment={
                          activeGarment
                        }
                        activeGarmentId={
                          activeGarmentId
                        }
                        setActiveGarmentId={
                          setActiveGarmentId
                        }
                        selectIssue={
                          selectIssue
                        }
                      />
                    )}

                    {/* STEP 3 */}

                    {step === 3 && (
                      <BookingStepThree
                        name={name}
                        phone={phone}
                        area={area}
                        address={
                          address
                        }
                        setName={
                          setName
                        }
                        setPhone={
                          setPhone
                        }
                        setArea={
                          setArea
                        }
                        setAddress={
                          setAddress
                        }
                        submitBooking={
                          submitBooking
                        }
                      />
                    )}

                  </div>

                  {/* DESKTOP SUMMARY */}

                  <aside className="hidden border-l border-black/10 bg-[#e9e2d6] lg:block">

                    <div className="sticky top-0 flex h-full flex-col p-7 xl:p-8">

                      <BookingSummary
                        garments={
                          garments
                        }
                        subtotal={
                          subtotal
                        }
                        discount={
                          discount
                        }
                        discountRate={
                          discountRate
                        }
                        total={
                          total
                        }
                        removeGarment={
                          removeGarment
                        }
                      />

                      <div className="mt-auto pt-8">

                        {step ===
                          1 && (
                          <button
                            onClick={
                              goToStepTwo
                            }
                            disabled={
                              !garments.length
                            }
                            className="w-full rounded-full bg-[#171713] px-6 py-4 text-sm font-medium text-white disabled:opacity-30"
                          >
                            Continue →
                          </button>
                        )}

                        {step ===
                          2 && (
                          <button
                            onClick={
                              goToStepThree
                            }
                            className="w-full rounded-full bg-[#171713] px-6 py-4 text-sm font-medium text-white"
                          >
                            Continue →
                          </button>
                        )}

                        {step ===
                          3 && (
                          <div className="rounded-2xl bg-white/50 p-4">

                            <p className="text-xs font-medium">
                              No payment
                              required now.
                            </p>

                            <p className="mt-1 text-[10px] leading-5 text-[#777064]">
                              We'll confirm
                              the visit by
                              phone.
                            </p>

                          </div>
                        )}

                      </div>

                    </div>

                  </aside>

                </div>

              </div>

              {/* MOBILE FOOTER */}

              <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-black/10 bg-[#f4f0e8]/95 p-3 backdrop-blur-xl lg:hidden">

                <div className="flex items-center gap-3">

                  <div className="min-w-0 flex-1">

                    {garments.length >
                    0 ? (
                      <>
                        <p className="text-[9px] uppercase tracking-[0.2em] text-[#8b806f]">
                          {garments.length} garment
                          {garments.length !==
                          1
                            ? "s"
                            : ""}
                        </p>

                        <p className="mt-1 text-lg font-medium">
                          ₹{total}
                        </p>
                      </>
                    ) : (
                      <p className="text-xs text-[#777064]">
                        Select a garment
                        to continue
                      </p>
                    )}

                  </div>

                  {step ===
                    1 && (
                    <button
                      onClick={
                        goToStepTwo
                      }
                      disabled={
                        !garments.length
                      }
                      className="rounded-full bg-[#171713] px-6 py-4 text-xs font-medium text-white disabled:opacity-30"
                    >
                      Continue →
                    </button>
                  )}

                  {step ===
                    2 && (
                    <button
                      onClick={
                        goToStepThree
                      }
                      className="rounded-full bg-[#171713] px-6 py-4 text-xs font-medium text-white"
                    >
                      Continue →
                    </button>
                  )}

                  {step ===
                    3 && (
                    <button
                      onClick={() => {
                        const form =
                          document.querySelector(
                            "#linearera-booking-form"
                          ) as
                            | HTMLFormElement
                            | null;

                        form?.requestSubmit();
                      }}
                      className="rounded-full bg-[#171713] px-5 py-4 text-xs font-medium text-white"
                    >
                      Request visit
                    </button>
                  )}

                </div>

              </div>

            </>
          )}

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   BOOKING STEP 1
========================================================= */

function BookingStepOne({
  orderType,
  setOrderType,
  garments,
  addGarment,
  removeGarment,
}: {
  orderType: OrderType;
  setOrderType: (
    value: OrderType
  ) => void;
  garments: Garment[];
  addGarment: (
    type: GarmentType
  ) => void;
  removeGarment: (
    id: string
  ) => void;
}) {
  return (
    <div>

      <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#9b8a70]">
        Step 01 · Choose garments
      </p>

      <h2 className="mt-5 font-serif text-5xl leading-[0.9] tracking-[-0.055em] sm:text-6xl">
        What are we
        <br />
        fixing?
      </h2>

      <p className="mt-5 max-w-md text-sm leading-6 text-[#777064]">
        Select everything you'd like altered during this visit.
      </p>

      {/* ORDER TYPE */}

      <div className="mt-7 inline-flex max-w-full rounded-full border border-black/10 bg-white p-1">

        {(
          [
            "Just me",
            "Family / Friends",
          ] as OrderType[]
        ).map((option) => (
          <button
            key={option}
            onClick={() =>
              setOrderType(
                option
              )
            }
            className={`rounded-full px-5 py-3 text-[11px] transition sm:px-7 ${
              orderType === option
                ? "bg-[#171713] text-white"
                : "text-[#777064]"
            }`}
          >
            {option}
          </button>
        ))}

      </div>

      {orderType ===
        "Family / Friends" && (
        <div className="mt-4 rounded-2xl bg-[#e9e2d6] p-4">

          <p className="text-xs font-medium">
            One visit. Multiple wardrobes.
          </p>

          <p className="mt-1 text-[10px] leading-5 text-[#777064]">
            Add garments for everyone joining the same visit.
            Bundle savings apply automatically.
          </p>

        </div>
      )}

      {/* GARMENT GRID */}

      <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3">

        {GARMENTS.map(
          (garment) => {
            const count =
              garments.filter(
                (item) =>
                  item.type ===
                  garment.type
              ).length;

            return (
              <button
                key={
                  garment.type
                }
                onClick={() =>
                  addGarment(
                    garment.type
                  )
                }
                className="group overflow-hidden rounded-[20px] border border-black/10 bg-white text-left transition hover:-translate-y-0.5 hover:shadow-lg"
              >

                <div className="relative aspect-[0.9] overflow-hidden">

                  <img
                    src={
                      garment.image
                    }
                    alt={
                      garment.type
                    }
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

                  {count > 0 && (
                    <div className="absolute right-2 top-2 flex h-7 min-w-7 items-center justify-center rounded-full bg-white px-2 text-[10px] font-semibold">
                      {count}
                    </div>
                  )}

                  <div className="absolute bottom-3 left-3 right-3 text-white">

                    <p className="font-serif text-xl leading-none">
                      {
                        garment.type
                      }
                    </p>

                    <p className="mt-1 text-[8px] uppercase tracking-[0.12em] text-white/70">
                      From ₹
                      {
                        PRICING[
                          garment.type
                        ]
                      }
                    </p>

                  </div>

                </div>

                <div className="flex items-center justify-between px-3 py-3">

                  <span className="text-[9px] text-[#777064]">
                    Add
                  </span>

                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#eee8dc] text-sm">
                    +
                  </span>

                </div>

              </button>
            );
          }
        )}

      </div>

      {/* SELECTED */}

      {garments.length >
        0 && (
        <div className="mt-10">

          <div className="mb-4 flex items-center justify-between">

            <p className="text-[9px] uppercase tracking-[0.25em] text-[#9b8a70]">
              Your garments
            </p>

            <p className="text-[9px] text-[#8b806f]">
              {garments.length} selected
            </p>

          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">

            {garments.map(
              (
                garment,
                index
              ) => {

                const image =
                  GARMENTS.find(
                    (item) =>
                      item.type ===
                      garment.type
                  )?.image;

                return (
                  <div
                    key={
                      garment.id
                    }
                    className="relative min-w-[130px] overflow-hidden rounded-2xl border border-black/10 bg-white"
                  >

                    <img
                      src={
                        image
                      }
                      alt=""
                      className="h-20 w-full object-cover"
                    />

                    <button
                      onClick={() =>
                        removeGarment(
                          garment.id
                        )
                      }
                      className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs shadow"
                    >
                      ×
                    </button>

                    <div className="p-3">

                      <p className="truncate text-[10px] font-medium">
                        {index + 1}.{" "}
                        {
                          garment.type
                        }
                      </p>

                      <p className="mt-1 text-[9px] text-[#8c8478]">
                        ₹
                        {
                          PRICING[
                            garment.type
                          ]
                        }
                      </p>

                    </div>

                  </div>
                );
              }
            )}

          </div>

        </div>
      )}

    </div>
  );
}

/* =========================================================
   BOOKING STEP 2
========================================================= */

function BookingStepTwo({
  garments,
  activeGarment,
  activeGarmentId,
  setActiveGarmentId,
  selectIssue,
}: {
  garments: Garment[];
  activeGarment?: Garment;
  activeGarmentId: string | null;
  setActiveGarmentId: (
    id: string
  ) => void;
  selectIssue: (
    issue: string
  ) => void;
}) {
  return (
    <div>

      <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#9b8a70]">
        Step 02 · Fit assessment
      </p>

      <h2 className="mt-5 font-serif text-5xl leading-[0.9] tracking-[-0.055em] sm:text-6xl">
        What's wrong
        <br />
        with the fit?
      </h2>

      <p className="mt-5 max-w-md text-sm leading-6 text-[#777064]">
        Don't worry about knowing the exact alteration. Just
        tell us what feels off.
      </p>

      {/* GARMENT TABS */}

      <div className="mt-8 flex gap-2 overflow-x-auto pb-2">

        {garments.map(
          (garment, index) => {

            const image =
              GARMENTS.find(
                (item) =>
                  item.type ===
                  garment.type
              )?.image;

            return (
              <button
                key={
                  garment.id
                }
                onClick={() =>
                  setActiveGarmentId(
                    garment.id
                  )
                }
                className={`relative flex min-w-[135px] items-center gap-2 rounded-2xl border p-2 text-left ${
                  activeGarmentId ===
                  garment.id
                    ? "border-[#171713] bg-white"
                    : "border-black/10"
                }`}
              >

                <img
                  src={image}
                  alt=""
                  className="h-12 w-10 rounded-xl object-cover"
                />

                <div className="min-w-0">

                  <p className="truncate text-[10px] font-medium">
                    {index + 1}.{" "}
                    {
                      garment.type
                    }
                  </p>

                  <p className="mt-1 truncate text-[9px] text-[#8c8478]">
                    {
                      garment.issue ||
                      "Select fit"
                    }
                  </p>

                </div>

                {garment.issue && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#171713] text-[9px] text-white">
                    ✓
                  </span>
                )}

              </button>
            );
          }
        )}

      </div>

      {/* ISSUE */}

      {activeGarment && (
        <div className="mt-8 rounded-[26px] bg-[#e9e2d6] p-5 sm:p-7">

          <div className="mb-7 flex items-center justify-between">

            <div>

              <p className="text-[9px] uppercase tracking-[0.25em] text-[#9b8a70]">
                Currently fixing
              </p>

              <h3 className="mt-2 font-serif text-3xl">
                {
                  activeGarment.type
                }
              </h3>

            </div>

          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">

            {FIT_ISSUES.map(
              (issue) => (
                <button
                  key={
                    issue.title
                  }
                  onClick={() =>
                    selectIssue(
                      issue.title
                    )
                  }
                  className={`min-h-[125px] rounded-[20px] border p-4 text-left transition ${
                    activeGarment.issue ===
                    issue.title
                      ? "border-[#171713] bg-[#171713] text-white"
                      : "border-black/10 bg-white hover:border-black/30"
                  }`}
                >

                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-lg ${
                      activeGarment.issue ===
                      issue.title
                        ? "bg-white/10"
                        : "bg-[#eee8dc]"
                    }`}
                  >
                    {
                      issue.icon
                    }
                  </div>

                  <p className="mt-5 text-xs font-medium">
                    {
                      issue.title
                    }
                  </p>

                  <p
                    className={`mt-1 text-[9px] ${
                      activeGarment.issue ===
                      issue.title
                        ? "text-white/50"
                        : "text-[#8c8478]"
                    }`}
                  >
                    {
                      issue.description
                    }
                  </p>

                </button>
              )
            )}

          </div>

        </div>
      )}

    </div>
  );
}

/* =========================================================
   BOOKING STEP 3
========================================================= */

function BookingStepThree({
  name,
  phone,
  area,
  address,
  setName,
  setPhone,
  setArea,
  setAddress,
  submitBooking,
}: {
  name: string;
  phone: string;
  area: string;
  address: string;
  setName: (
    value: string
  ) => void;
  setPhone: (
    value: string
  ) => void;
  setArea: (
    value: string
  ) => void;
  setAddress: (
    value: string
  ) => void;
  submitBooking: (
    event: FormEvent<HTMLFormElement>
  ) => void;
}) {
  return (
    <div>

      <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#9b8a70]">
        Step 03 · Your doorstep
      </p>

      <h2 className="mt-5 font-serif text-5xl leading-[0.9] tracking-[-0.055em] sm:text-6xl">
        Where should
        <br />
        we come?
      </h2>

      <p className="mt-5 max-w-md text-sm leading-6 text-[#777064]">
        Give us the basics. We'll call you to confirm the visit.
      </p>

      <form
        id="linearera-booking-form"
        onSubmit={
          submitBooking
        }
        className="mt-9 max-w-xl"
      >

        <div className="grid gap-4 sm:grid-cols-2">

          <BookingInput
            label="Your name"
            value={name}
            onChange={
              setName
            }
            placeholder="Your name"
            required
          />

          <BookingInput
            label="Phone number"
            value={phone}
            onChange={
              setPhone
            }
            placeholder="+91"
            type="tel"
            required
          />

          <BookingInput
            label="Area / locality"
            value={area}
            onChange={
              setArea
            }
            placeholder="Indiranagar"
            required
          />

          <div>

            <label className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8c8478]">
              Visit
            </label>

            <div className="mt-2 flex h-14 items-center rounded-[17px] border border-black/10 bg-white px-4 text-xs text-[#777064]">
              We'll confirm the time by phone
            </div>

          </div>

        </div>

        <div className="mt-4">

          <label className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8c8478]">
            Address
          </label>

          <textarea
            value={address}
            onChange={(
              event
            ) =>
              setAddress(
                event.target
                  .value
              )
            }
            required
            rows={4}
            placeholder="House / apartment / office address"
            className="mt-2 w-full resize-none rounded-[18px] border border-black/10 bg-white px-4 py-4 text-sm outline-none placeholder:text-black/25 focus:border-black"
          />

        </div>

        <div className="mt-5 rounded-[20px] bg-[#e9e2d6] p-5">

          <p className="text-xs font-medium">
            What happens next?
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">

            <MiniBookingStep
              number="01"
              text="We call to confirm"
            />

            <MiniBookingStep
              number="02"
              text="Fit Consultant visits"
            />

            <MiniBookingStep
              number="03"
              text="We alter & return"
            />

          </div>

        </div>

        <button
          type="submit"
          className="mt-6 hidden w-full rounded-full bg-[#171713] py-4 text-sm font-medium text-white lg:block"
        >
          Request my Fit Visit →
        </button>

        <p className="mt-3 hidden text-center text-[9px] text-[#8c8478] lg:block">
          No payment required now · Final price confirmed after assessment
        </p>

      </form>

    </div>
  );
}

/* =========================================================
   SUMMARY
========================================================= */

function BookingSummary({
  garments,
  subtotal,
  discount,
  discountRate,
  total,
  removeGarment,
}: {
  garments: Garment[];
  subtotal: number;
  discount: number;
  discountRate: number;
  total: number;
  removeGarment: (
    id: string
  ) => void;
}) {
  return (
    <div>

      <p className="text-[9px] uppercase tracking-[0.3em] text-[#9b8a70]">
        Your visit
      </p>

      {garments.length ===
      0 ? (
        <div className="mt-12">

          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/60 font-serif text-3xl">
            +
          </div>

          <p className="mt-5 font-serif text-2xl">
            Add your clothes.
          </p>

          <p className="mt-2 max-w-xs text-[10px] leading-5 text-[#8c8478]">
            Multiple garments in one visit unlock bundle savings.
          </p>

        </div>
      ) : (
        <>

          <div className="mt-7 space-y-4">

            {garments.map(
              (
                garment,
                index
              ) => (
                <div
                  key={
                    garment.id
                  }
                  className="flex items-start justify-between gap-3"
                >

                  <div className="flex gap-2">

                    <span className="text-[9px] text-[#9b8a70]">
                      {String(
                        index + 1
                      ).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    <div>

                      <p className="text-[11px] font-medium">
                        {
                          garment.type
                        }
                      </p>

                      <p className="mt-1 text-[9px] text-[#8c8478]">
                        {
                          garment.issue ||
                          "Fit assessment"
                        }
                      </p>

                    </div>

                  </div>

                  <div className="flex items-center gap-2">

                    <span className="text-[11px]">
                      ₹
                      {
                        PRICING[
                          garment.type
                        ]
                      }
                    </span>

                    <button
                      onClick={() =>
                        removeGarment(
                          garment.id
                        )
                      }
                      className="text-[#9b8a70]"
                    >
                      ×
                    </button>

                  </div>

                </div>
              )
            )}

          </div>

          <div className="my-7 h-px bg-black/10" />

          <div className="space-y-3 text-[10px]">

            <div className="flex justify-between">

              <span className="text-[#777064]">
                Subtotal
              </span>

              <span>
                ₹{subtotal}
              </span>

            </div>

            <div className="flex justify-between text-[#657055]">

              <span>
                Bundle saving ({discountRate}%)
              </span>

              <span>
                −₹{discount}
              </span>

            </div>

          </div>

          <div className="mt-7">

            <p className="text-[9px] uppercase tracking-[0.25em] text-[#9b8a70]">
              Estimated
            </p>

            <p className="mt-1 font-serif text-5xl tracking-[-0.04em]">
              ₹{total}
            </p>

          </div>

          <div className="mt-6 rounded-[18px] bg-white/50 p-4">

            <p className="text-[10px] font-medium">
              {garments.length <
              2
                ? "Add another garment"
                : garments.length <
                  3
                ? "10% bundle saving unlocked"
                : garments.length <
                  5
                ? "15% bundle saving unlocked"
                : "20% bundle saving unlocked"}
            </p>

            <p className="mt-1 text-[9px] leading-4 text-[#8c8478]">
              The more garments you include in the same visit, the more you save.
            </p>

          </div>

        </>
      )}

    </div>
  );
}

/* =========================================================
   SUCCESS
========================================================= */

function BookingSuccess({
  name,
  phone,
  garments,
  total,
  closeBooking,
}: {
  name: string;
  phone: string;
  garments: Garment[];
  total: number;
  closeBooking: () => void;
}) {
  return (
    <div className="flex flex-1 items-center justify-center overflow-y-auto px-5 py-12">

      <div className="w-full max-w-xl text-center">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#171713] text-2xl text-white">
          ✓
        </div>

        <p className="mt-8 text-[9px] uppercase tracking-[0.3em] text-[#9b8a70]">
          LinearEra
        </p>

        <h2 className="mt-4 font-serif text-5xl leading-[0.9] tracking-[-0.05em] sm:text-6xl">
          Your fit journey
          <br />
          starts here.
        </h2>

        <p className="mx-auto mt-6 max-w-md text-sm leading-6 text-[#777064]">
          Thanks {name || "there"}. We'll contact you on{" "}
          {phone || "your number"} to confirm your Fit Visit.
        </p>

        <div className="mt-8 rounded-[24px] border border-black/10 bg-white/50 p-6 text-left">

          <div className="flex justify-between border-b border-black/10 pb-4">

            <span className="text-xs text-[#777064]">
              Garments
            </span>

            <span className="text-xs font-medium">
              {garments.length}
            </span>

          </div>

          <div className="flex justify-between py-5">

            <span className="text-xs text-[#777064]">
              Estimated total
            </span>

            <span className="font-serif text-3xl">
              ₹{total}
            </span>

          </div>

          <p className="text-[10px] leading-5 text-[#8c8478]">
            Final pricing is confirmed after the Fit Consultant assesses the garments.
          </p>

        </div>

        <button
          onClick={closeBooking}
          className="mt-7 rounded-full bg-[#171713] px-8 py-4 text-sm font-medium text-white"
        >
          Back to LinearEra
        </button>

      </div>

    </div>
  );
}

/* =========================================================
   INPUT
========================================================= */

function BookingInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (
    value: string
  ) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">

      <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8c8478]">
        {label}
      </span>

      <input
        type={type}
        value={value}
        onChange={(
          event
        ) =>
          onChange(
            event.target.value
          )
        }
        placeholder={
          placeholder
        }
        required={required}
        className="mt-2 h-14 w-full rounded-[17px] border border-black/10 bg-white px-4 text-sm outline-none placeholder:text-black/25 focus:border-black"
      />

    </label>
  );
}

/* =========================================================
   MINI BOOKING STEP
========================================================= */

function MiniBookingStep({
  number,
  text,
}: {
  number: string;
  text: string;
}) {
  return (
    <div className="flex gap-3">

      <span className="text-[9px] tracking-[0.2em] text-[#9b8a70]">
        {number}
      </span>

      <span className="text-[10px] leading-4 text-[#625d54]">
        {text}
      </span>

    </div>
  );
}
