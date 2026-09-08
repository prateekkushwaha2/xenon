"use client";

import {
  FormEvent,
  useMemo,
  useState,
} from "react";

type Garment = {
  id: number;
  name: string;
  price: number;
  image: string;
};

const GARMENTS = [
  {
    name: "Shirt",
    price: 199,
    image:
      "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Trousers",
    price: 249,
    image:
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Jeans",
    price: 199,
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "T-shirt",
    price: 149,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Dress",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Jacket",
    price: 399,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85",
  },
];

const PROBLEM_IMAGES = {
  traffic:
    "https://images.unsplash.com/photo-1532939163844-82d416d6adac?auto=format&fit=crop&w=1400&q=85",
  parking:
    "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1400&q=85",
  waiting:
    "https://images.unsplash.com/photo-1501139083538-0139583c060f?auto=format&fit=crop&w=1400&q=85",
  tailoring:
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1400&q=85",
};

const HERO_IMAGE =
  "https://washotailor.com/wp-content/uploads/2025/06/WhatsApp-Image-2025-05-30-at-19.34.56-682x1024.jpeg";

const CRAFT_IMAGE =
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1800&q=90";

const CLOSET_IMAGE =
  "https://vosecommerceimages.blob.core.windows.net/ecommerceimages/personal_organizer/closet/Personal_Organizer_Closet_1_mob.jpg";

const BEFORE_AFTER_IMAGE =
  "https://img.p.mapq.st/?q=75&url=https%3A%2F%2Fs3-media0.fl.yelpcdn.com%2Fbphoto%2FjibTuR3Vi8eqCz9g2TVvPQ%2Fl.jpg&w=3840";

function ArrowIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M5 12h13" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedGarments, setSelectedGarments] = useState<Garment[]>([]);
  const [fitIssues, setFitIssues] = useState<string[]>([]);
  const [orderType, setOrderType] = useState("Just me");
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "",
    preferredTime: "",
  });

  const addGarment = (garmentName: string) => {
    const source = GARMENTS.find((item) => item.name === garmentName);

    if (!source) return;

    setSelectedGarments((current) => [
      ...current,
      {
        ...source,
        id: Date.now() + Math.random(),
      },
    ]);
  };

  const removeGarment = (id: number) => {
    setSelectedGarments((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  const openBooking = (garment?: string) => {
    if (garment) {
      addGarment(garment);
    }

    setBookingStep(1);
    setSubmitted(false);
    setBookingOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeBooking = () => {
    setBookingOpen(false);
    document.body.style.overflow = "";
  };

  const toggleIssue = (issue: string) => {
    setFitIssues((current) =>
      current.includes(issue)
        ? current.filter((item) => item !== issue)
        : [...current, issue]
    );
  };

  const subtotal = selectedGarments.reduce(
    (sum, garment) => sum + garment.price,
    0
  );

  const discountPercent =
    selectedGarments.length >= 5
      ? 20
      : selectedGarments.length >= 3
      ? 15
      : selectedGarments.length >= 2
      ? 10
      : 0;

  const discount = Math.round(
    subtotal * (discountPercent / 100)
  );

  const total = subtotal - discount;

  const estimatedTime = useMemo(() => {
    if (selectedGarments.length >= 5) return "₹1,000+";
    if (selectedGarments.length >= 3) return "₹500+";
    if (selectedGarments.length >= 2) return "₹350+";
    return "₹149+";
  }, [selectedGarments.length]);

  const submitBooking = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#f3f0e8] text-[#151515] overflow-x-hidden">
      {/* =========================================================
          NAVBAR
      ========================================================= */}

      <header className="fixed left-0 top-0 z-40 w-full">
        <div className="mx-auto mt-4 flex w-[calc(100%-28px)] max-w-[1380px] items-center justify-between rounded-full border border-black/10 bg-[#f5f2ea]/90 px-5 py-3 shadow-sm backdrop-blur-xl md:px-7">
          <a
            href="#top"
            className="font-serif text-[25px] tracking-[-0.04em]"
          >
            LinearEra
          </a>

          <nav className="hidden items-center gap-8 text-[12px] uppercase tracking-[0.16em] md:flex">
            <a href="#why" className="transition hover:opacity-50">
              Why LinearEra
            </a>
            <a href="#services" className="transition hover:opacity-50">
              Services
            </a>
            <a href="#pricing" className="transition hover:opacity-50">
              Pricing
            </a>
            <a href="#process" className="transition hover:opacity-50">
              How it works
            </a>
          </nav>

          <button
            onClick={() => openBooking()}
            className="rounded-full bg-[#171717] px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.13em] text-white transition hover:scale-[1.02]"
          >
            Book a fit visit
          </button>
        </div>
      </header>

      {/* =========================================================
          HERO
      ========================================================= */}

      <section id="top" className="relative min-h-[900px] overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt="Clothing measurement at home"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        <div className="relative mx-auto flex min-h-[900px] w-full max-w-[1500px] items-end px-6 pb-16 pt-40 md:px-12 md:pb-20 lg:px-20">
          <div className="max-w-[1000px] text-white">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-white/70" />
              <span className="text-[10px] uppercase tracking-[0.28em]">
                Bengaluru · Doorstep Clothing Alterations
              </span>
            </div>

            <h1 className="max-w-[1050px] font-serif text-[clamp(64px,10vw,150px)] leading-[0.78] tracking-[-0.065em]">
              STOP GOING
              <br />
              TO TAILORS.
            </h1>

            <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <p className="max-w-[420px] text-[17px] leading-7 text-white/85 md:text-[20px]">
                Professional clothing alterations,
                <br />
                measured at your doorstep.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => openBooking()}
                  className="flex items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-[12px] font-semibold uppercase tracking-[0.15em] text-black transition hover:scale-[1.02]"
                >
                  Book a fit visit
                  <ArrowIcon />
                </button>

                <button
                  onClick={() => {
                    document
                      .getElementById("services")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="rounded-full border border-white/50 px-7 py-4 text-[12px] uppercase tracking-[0.15em] text-white backdrop-blur-sm transition hover:bg-white/10"
                >
                  Explore
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-7 right-8 hidden text-right text-white/60 md:block">
          <p className="text-[9px] uppercase tracking-[0.25em]">
            Your clothes.
          </p>
          <p className="font-serif text-2xl">Your fit.</p>
        </div>
      </section>

      {/* =========================================================
          MANIFESTO
      ========================================================= */}

      <section className="bg-[#151515] px-6 py-24 text-[#f3f0e8] md:px-12 md:py-36">
        <div className="mx-auto max-w-[1300px]">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.6fr]">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/45">
                The problem
              </p>
            </div>

            <div>
              <p className="font-serif text-[clamp(45px,6vw,88px)] leading-[0.95] tracking-[-0.055em]">
                A simple alteration
                <br />
                shouldn't require
                <br />
                <span className="text-[#c5aa72]">an entire afternoon.</span>
              </p>

              <p className="mt-10 max-w-[650px] text-[15px] leading-7 text-white/55">
                You bought the clothes. They almost fit. Then comes
                the traffic, parking, queue, explaining, waiting,
                collecting and sometimes going back again.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          VISUAL PROBLEM JOURNEY
      ========================================================= */}

      <section
        id="why"
        className="bg-[#e7e2d7] px-4 py-5 md:px-7 md:py-7"
      >
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-8 flex items-end justify-between px-2 md:mb-12">
            <div>
              <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-black/45">
                The old way
              </p>
              <h2 className="font-serif text-[clamp(44px,6vw,80px)] leading-[0.9] tracking-[-0.05em]">
                One alteration.
                <br />
                Six unnecessary steps.
              </h2>
            </div>

            <span className="hidden font-serif text-5xl text-black/15 md:block">
              01—06
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {[
              {
                no: "01",
                title: "Traffic",
                stat: "45 MIN",
                image: PROBLEM_IMAGES.traffic,
                text: "Leave home. Sit in traffic.",
              },
              {
                no: "02",
                title: "Parking",
                stat: "WHERE?",
                image: PROBLEM_IMAGES.parking,
                text: "Circle around looking for a spot.",
              },
              {
                no: "03",
                title: "Crowded shop",
                stat: "WAIT",
                image: PROBLEM_IMAGES.tailoring,
                text: "Squeeze into a busy little shop.",
              },
              {
                no: "04",
                title: "Waiting",
                stat: "TIME",
                image: PROBLEM_IMAGES.waiting,
                text: "Leave your clothes behind.",
              },
              {
                no: "05",
                title: "Explain",
                stat: "AGAIN",
                image: HERO_IMAGE,
                text: "Try to explain exactly what feels wrong.",
              },
              {
                no: "06",
                title: "Come back",
                stat: "×2",
                image: CLOSET_IMAGE,
                text: "Return later. Sometimes twice.",
              },
            ].map((item) => (
              <div
                key={item.no}
                className="group relative aspect-[4/5] overflow-hidden bg-black"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/10" />

                <div className="absolute left-4 top-4 flex items-center gap-2 text-white">
                  <span className="text-[10px] tracking-[0.2em]">
                    {item.no}
                  </span>
                  <span className="h-px w-5 bg-white/50" />
                </div>

                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="mb-2 font-serif text-4xl leading-none md:text-5xl">
                    {item.stat}
                  </div>
                  <h3 className="text-lg font-medium">{item.title}</h3>
                  <p className="mt-1 max-w-[220px] text-xs leading-5 text-white/65">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="px-3 py-16 text-center md:py-24">
            <p className="text-[11px] uppercase tracking-[0.25em] text-black/40">
              All this...
            </p>
            <h3 className="mt-5 font-serif text-[clamp(48px,7vw,100px)] leading-[0.85] tracking-[-0.055em]">
              for a simple
              <br />
              <span className="italic">alteration?</span>
            </h3>

            <p className="mt-7 text-sm text-black/50">
              There has to be a better way.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          SOLUTION
      ========================================================= */}

      <section
        id="process"
        className="relative overflow-hidden bg-[#f3f0e8] px-6 py-24 md:px-12 md:py-36"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_1fr]">
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={HERO_IMAGE}
                alt="LinearEra fit consultation"
                className="h-full w-full object-cover"
              />

              <div className="absolute bottom-5 left-5 rounded-2xl bg-[#f3f0e8]/90 p-5 backdrop-blur">
                <p className="text-[9px] uppercase tracking-[0.22em] text-black/45">
                  LinearEra
                </p>
                <p className="mt-1 font-serif text-2xl">
                  Fit comes first.
                </p>
              </div>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-black/40">
                The LinearEra way
              </p>

              <h2 className="mt-5 max-w-[650px] font-serif text-[clamp(48px,6vw,88px)] leading-[0.9] tracking-[-0.055em]">
                We bring the
                <br />
                fitting room
                <br />
                <span className="italic">to you.</span>
              </h2>

              <p className="mt-8 max-w-[550px] text-[15px] leading-7 text-black/55">
                A trained Fit Consultant comes to your home,
                understands how the garment should fit, measures
                what needs changing and takes the garment with them.
              </p>

              <div className="mt-12 space-y-7">
                {[
                  ["01", "Book", "Choose what you need fixed."],
                  ["02", "Fit visit", "We visit your home and assess the garment."],
                  ["03", "Tailoring", "A specialist performs the alteration."],
                  ["04", "Quality check", "Every garment is checked before return."],
                  ["05", "Doorstep", "Your clothes come back ready to wear."],
                ].map(([number, title, text]) => (
                  <div
                    key={number}
                    className="grid grid-cols-[45px_130px_1fr] items-start border-b border-black/10 pb-5"
                  >
                    <span className="text-[10px] text-black/35">
                      {number}
                    </span>
                    <span className="font-serif text-xl">{title}</span>
                    <span className="text-xs leading-5 text-black/45">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          VISUAL PROCESS STRIP
      ========================================================= */}

      <section className="bg-[#171717] py-5">
        <div className="flex min-w-max gap-3 px-5 md:px-10">
          {[
            {
              title: "YOU",
              image:
                "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85",
            },
            {
              title: "MEASURE",
              image: HERO_IMAGE,
            },
            {
              title: "TAILOR",
              image: CRAFT_IMAGE,
            },
            {
              title: "CHECK",
              image: BEFORE_AFTER_IMAGE,
            },
            {
              title: "DELIVER",
              image: CLOSET_IMAGE,
            },
          ].map((item, index) => (
            <div
              key={item.title}
              className="relative h-[330px] w-[250px] shrink-0 overflow-hidden md:h-[430px] md:w-[330px]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-black/30" />

              <div className="absolute bottom-5 left-5">
                <span className="text-[10px] tracking-[0.25em] text-white/60">
                  0{index + 1}
                </span>
                <h3 className="mt-1 font-serif text-4xl text-white">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
          SERVICES
      ========================================================= */}

      <section
        id="services"
        className="bg-[#f3f0e8] px-5 py-24 md:px-10 md:py-36"
      >
        <div className="mx-auto max-w-[1450px]">
          <div className="mb-12 flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-black/40">
                Your wardrobe
              </p>
              <h2 className="mt-4 font-serif text-[clamp(52px,7vw,100px)] leading-[0.85] tracking-[-0.06em]">
                What needs
                <br />
                fixing?
              </h2>
            </div>

            <p className="max-w-[320px] text-sm leading-6 text-black/45">
              Shirts. Jeans. Trousers. Dresses. Jackets.
              Small adjustments or complete refitting.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {GARMENTS.map((item) => (
              <button
                key={item.name}
                onClick={() => openBooking(item.name)}
                className="group relative aspect-[4/5] overflow-hidden bg-[#ded9cf] text-left"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="font-serif text-3xl md:text-4xl">
                        {item.name}
                      </p>
                      <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-white/65">
                        from ₹{item.price}
                      </p>
                    </div>

                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition group-hover:rotate-45">
                      <PlusIcon />
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          FIT PROBLEMS
      ========================================================= */}

      <section className="bg-[#d8d1c3] px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-black/40">
                Not sure what is wrong?
              </p>

              <h2 className="mt-5 font-serif text-[clamp(48px,6vw,82px)] leading-[0.88] tracking-[-0.055em]">
                You don't need
                <br />
                to know the
                <br />
                <span className="italic">tailoring term.</span>
              </h2>

              <p className="mt-8 max-w-[430px] text-sm leading-6 text-black/50">
                Just tell us what feels wrong. Our Fit Consultant
                can identify the alteration during the visit.
              </p>

              <button
                onClick={() => openBooking()}
                className="mt-8 flex items-center gap-3 rounded-full bg-[#171717] px-6 py-4 text-[11px] uppercase tracking-[0.16em] text-white"
              >
                Check my fit
                <ArrowIcon />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  title: "Too loose",
                  image:
                    "https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&w=900&q=85",
                },
                {
                  title: "Too tight",
                  image:
                    "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=900&q=85",
                },
                {
                  title: "Too long",
                  image:
                    "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85",
                },
                {
                  title: "Wrong shape",
                  image:
                    "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="group relative aspect-square overflow-hidden"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-black/25" />
                  <div className="absolute bottom-4 left-4">
                    <p className="font-serif text-2xl text-white md:text-3xl">
                      {item.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          PRICING
      ========================================================= */}

      <section
        id="pricing"
        className="bg-[#151515] px-5 py-24 text-[#f3f0e8] md:px-10 md:py-36"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/35">
                Simple pricing
              </p>

              <h2 className="mt-5 font-serif text-[clamp(55px,7vw,100px)] leading-[0.85] tracking-[-0.06em]">
                Better
                <br />
                together.
              </h2>

              <p className="mt-8 max-w-[420px] text-sm leading-6 text-white/45">
                Bring more than one garment during the same doorstep
                visit and your per-piece cost comes down.
              </p>

              <div className="mt-10 border-l border-[#c5aa72] pl-5">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#c5aa72]">
                  Bundle savings
                </p>
                <p className="mt-2 font-serif text-3xl">
                  2+ garments = save
                </p>
                <p className="mt-1 text-xs text-white/40">
                  3+ garments save even more.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-3">
              {GARMENTS.map((item) => (
                <button
                  key={item.name}
                  onClick={() => openBooking(item.name)}
                  className="group bg-[#1c1c1c] p-4 text-left transition hover:bg-[#242424] md:p-5"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                    />
                  </div>

                  <div className="mt-4 flex items-end justify-between">
                    <div>
                      <p className="font-serif text-xl">
                        {item.name}
                      </p>
                      <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-white/35">
                        alteration
                      </p>
                    </div>

                    <p className="text-sm">₹{item.price}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-3 md:grid-cols-3">
            {[
              ["01", "2 garments", "10% off"],
              ["02", "3–4 garments", "15% off"],
              ["03", "5+ garments", "20% off"],
            ].map(([number, title, discount]) => (
              <div
                key={number}
                className="border border-white/10 p-6"
              >
                <p className="text-[10px] text-white/30">{number}</p>
                <p className="mt-8 font-serif text-3xl">{title}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[#c5aa72]">
                  {discount}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-[10px] text-white/25">
            Illustrative starting prices for the MVP. Final price
            depends on the alteration after assessment.
          </p>
        </div>
      </section>

      {/* =========================================================
          BEFORE AFTER
      ========================================================= */}

      <section className="bg-[#f3f0e8] px-5 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-black/35">
                The difference
              </p>

              <h2 className="mt-4 font-serif text-[clamp(50px,7vw,100px)] leading-[0.85] tracking-[-0.06em]">
                Fit changes
                <br />
                everything.
              </h2>
            </div>

            <p className="hidden max-w-[250px] text-xs leading-5 text-black/40 md:block">
              Good alterations are not about changing your clothes.
              They're about making the clothes work for you.
            </p>
          </div>

          <div className="relative overflow-hidden bg-black">
            <img
              src={BEFORE_AFTER_IMAGE}
              alt="Before and after trouser alteration"
              className="h-[500px] w-full object-cover md:h-[700px]"
            />

            <div className="absolute left-4 top-4 rounded-full bg-black/70 px-4 py-2 text-[9px] uppercase tracking-[0.18em] text-white backdrop-blur">
              Before / After
            </div>

            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white">
              <div>
                <p className="font-serif text-4xl md:text-6xl">
                  The right fit.
                </p>
                <p className="mt-2 text-xs text-white/60">
                  A small change. A completely different silhouette.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CRAFT
      ========================================================= */}

      <section className="relative min-h-[750px] overflow-hidden bg-black">
        <img
          src={CRAFT_IMAGE}
          alt="Tailoring craftsmanship"
          className="absolute inset-0 h-full w-full object-cover opacity-80"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-black/10" />

        <div className="relative mx-auto flex min-h-[750px] max-w-[1400px] items-center px-6 py-24 md:px-12">
          <div className="max-w-[700px] text-white">
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/45">
              Behind the scenes
            </p>

            <h2 className="mt-5 font-serif text-[clamp(55px,8vw,110px)] leading-[0.82] tracking-[-0.06em]">
              Your clothes
              <br />
              deserve
              <br />
              <span className="italic text-[#d0ba88]">
                precision.
              </span>
            </h2>

            <p className="mt-9 max-w-[500px] text-sm leading-7 text-white/60">
              The Fit Consultant understands the garment.
              The tailoring specialist executes the change.
              A quality check makes sure the finished piece is
              ready to return to you.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          GROUP ORDER
      ========================================================= */}

      <section className="bg-[#ddd6c8] px-5 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative overflow-hidden">
              <img
                src={CLOSET_IMAGE}
                alt="Organized wardrobe"
                className="h-[550px] w-full object-cover md:h-[700px]"
              />

              <div className="absolute left-5 top-5 rounded-full bg-white/90 px-5 py-3 text-[10px] uppercase tracking-[0.18em]">
                One visit
              </div>

              <div className="absolute bottom-5 left-5 rounded-2xl bg-[#171717] p-5 text-white">
                <p className="font-serif text-3xl">
                  More clothes.
                </p>
                <p className="mt-1 text-xs text-white/50">
                  Lower cost per garment.
                </p>
              </div>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-black/40">
                Fit together
              </p>

              <h2 className="mt-5 font-serif text-[clamp(52px,6vw,88px)] leading-[0.86] tracking-[-0.06em]">
                Your family.
                <br />
                Your friends.
                <br />
                <span className="italic">One visit.</span>
              </h2>

              <p className="mt-8 max-w-[500px] text-sm leading-7 text-black/50">
                Got a pile of clothes waiting for alterations?
                Combine them into one doorstep visit. Split the
                cost with family, friends or roommates and unlock
                bundle savings.
              </p>

              <button
                onClick={() => {
                  setOrderType("Family / Friends");
                  openBooking();
                }}
                className="mt-9 flex items-center gap-3 rounded-full bg-[#171717] px-7 py-4 text-[11px] uppercase tracking-[0.17em] text-white"
              >
                Start a group order
                <ArrowIcon />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          BRAND / WARDROBE
      ========================================================= */}

      <section className="bg-[#f3f0e8] px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1400px] text-center">
          <p className="text-[10px] uppercase tracking-[0.25em] text-black/35">
            Bought it anywhere.
            <br />
            Fit it here.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-5 font-serif text-2xl text-black/25 md:gap-x-16 md:text-4xl">
            <span>ZARA</span>
            <span>H&M</span>
            <span>UNIQLO</span>
            <span>AJIO</span>
            <span>MYNTRA</span>
            <span>LOCAL</span>
          </div>

          <p className="mx-auto mt-8 max-w-[500px] text-[11px] leading-5 text-black/35">
            Examples only — LinearEra is not affiliated with these
            brands. Your clothes can come from anywhere.
          </p>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}

      <section className="relative min-h-[700px] overflow-hidden bg-black">
        <img
          src={HERO_IMAGE}
          alt="Doorstep fitting"
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/40" />

        <div className="relative mx-auto flex min-h-[700px] max-w-[1400px] flex-col justify-end px-6 pb-16 md:px-12 md:pb-20">
          <p className="text-[10px] uppercase tracking-[0.28em] text-white/45">
            LinearEra
          </p>

          <h2 className="mt-5 max-w-[1000px] font-serif text-[clamp(65px,10vw,145px)] leading-[0.78] tracking-[-0.065em] text-white">
            YOUR CLOTHES.
            <br />
            <span className="italic text-[#d0ba88]">
              YOUR FIT.
            </span>
          </h2>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <button
              onClick={() => openBooking()}
              className="flex items-center justify-center gap-3 rounded-full bg-white px-8 py-5 text-[11px] font-semibold uppercase tracking-[0.17em] text-black"
            >
              Book a fit visit
              <ArrowIcon />
            </button>

            <span className="text-xs text-white/45">
              No app. No shop visit. No complicated form.
            </span>
          </div>
        </div>
      </section>

      {/* =========================================================
          FOOTER
      ========================================================= */}

      <footer className="bg-[#151515] px-6 py-12 text-white md:px-10">
        <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="font-serif text-4xl tracking-[-0.04em]">
              LinearEra
            </p>
            <p className="mt-3 text-xs text-white/35">
              Fit Lives Better.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-[10px] uppercase tracking-[0.18em] text-white/45">
            <a href="#why">Why us</a>
            <a href="#services">Services</a>
            <a href="#pricing">Pricing</a>
            <a href="#process">How it works</a>
          </div>

          <p className="text-[10px] text-white/25">
            © {new Date().getFullYear()} LinearEra
          </p>
        </div>
      </footer>

      {/* =========================================================
          MOBILE STICKY CTA
      ========================================================= */}

      <div className="fixed bottom-4 left-4 right-4 z-30 md:hidden">
        <button
          onClick={() => openBooking()}
          className="flex w-full items-center justify-center gap-3 rounded-full bg-[#171717] px-6 py-4 text-[11px] font-medium uppercase tracking-[0.16em] text-white shadow-2xl"
        >
          Book a fit visit
          <ArrowIcon />
        </button>
      </div>

      {/* =========================================================
          BOOKING DRAWER
      ========================================================= */}

      {bookingOpen && (
        <div className="fixed inset-0 z-[100] flex">
          {/* Overlay */}
          <button
            aria-label="Close booking"
            onClick={closeBooking}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <aside className="relative ml-auto flex h-full w-full max-w-[620px] flex-col bg-[#f3f0e8] shadow-2xl">
            {/* Drawer header */}
            <div className="flex items-center justify-between border-b border-black/10 px-5 py-5 md:px-7">
              <div>
                <p className="text-[9px] uppercase tracking-[0.25em] text-black/40">
                  LinearEra
                </p>
                <h3 className="mt-1 font-serif text-2xl">
                  Book a fit visit
                </h3>
              </div>

              <button
                onClick={closeBooking}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Progress */}
            <div className="grid grid-cols-3 border-b border-black/10">
              {[
                ["01", "Garments"],
                ["02", "Fit"],
                ["03", "Visit"],
              ].map(([number, label], index) => (
                <button
                  key={number}
                  onClick={() => {
                    if (index + 1 <= bookingStep) {
                      setBookingStep(index + 1);
                    }
                  }}
                  className={`border-r border-black/10 px-4 py-4 text-left ${
                    bookingStep === index + 1
                      ? "bg-[#171717] text-white"
                      : "text-black/40"
                  }`}
                >
                  <span className="text-[9px]">{number}</span>
                  <span className="ml-3 text-[10px] uppercase tracking-[0.13em]">
                    {label}
                  </span>
                </button>
              ))}
            </div>

            {/* Drawer body */}
            <div className="flex-1 overflow-y-auto px-5 py-7 md:px-7">
              {submitted ? (
                <div className="flex min-h-[600px] flex-col items-center justify-center text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#171717] text-white">
                    <CheckIcon />
                  </div>

                  <p className="mt-8 text-[10px] uppercase tracking-[0.25em] text-black/40">
                    Request received
                  </p>

                  <h3 className="mt-4 font-serif text-5xl leading-none">
                    We'll call you.
                  </h3>

                  <p className="mt-6 max-w-[350px] text-sm leading-6 text-black/50">
                    We'll confirm your preferred visit time and
                    understand the garments you want altered.
                  </p>

                  <button
                    onClick={closeBooking}
                    className="mt-9 rounded-full bg-[#171717] px-7 py-4 text-[10px] uppercase tracking-[0.17em] text-white"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  {/* STEP 1 */}
                  {bookingStep === 1 && (
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-black/40">
                        Step 01
                      </p>

                      <h4 className="mt-3 font-serif text-4xl leading-none md:text-5xl">
                        What are we fixing?
                      </h4>

                      <p className="mt-4 max-w-[430px] text-sm leading-6 text-black/45">
                        Pick everything you'd like us to look at
                        during the same visit.
                      </p>

                      <div className="mt-8 grid grid-cols-2 gap-2">
                        {GARMENTS.map((item) => (
                          <button
                            key={item.name}
                            onClick={() => addGarment(item.name)}
                            className="group relative aspect-[4/5] overflow-hidden bg-black"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="absolute inset-0 h-full w-full object-cover opacity-80 transition group-hover:scale-105"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                              <div>
                                <p className="font-serif text-xl">
                                  {item.name}
                                </p>
                                <p className="text-[9px] uppercase tracking-[0.14em] text-white/55">
                                  ₹{item.price}+
                                </p>
                              </div>

                              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black">
                                <PlusIcon />
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>

                      {selectedGarments.length > 0 && (
                        <div className="mt-7">
                          <p className="mb-3 text-[9px] uppercase tracking-[0.2em] text-black/35">
                            Selected
                          </p>

                          <div className="space-y-2">
                            {selectedGarments.map((item) => (
                              <div
                                key={item.id}
                                className="flex items-center justify-between border border-black/10 bg-white/40 p-3"
                              >
                                <div className="flex items-center gap-3">
                                  <img
                                    src={item.image}
                                    alt=""
                                    className="h-12 w-12 object-cover"
                                  />
                                  <div>
                                    <p className="font-serif text-lg">
                                      {item.name}
                                    </p>
                                    <p className="text-[9px] text-black/40">
                                      ₹{item.price}
                                    </p>
                                  </div>
                                </div>

                                <button
                                  onClick={() =>
                                    removeGarment(item.id)
                                  }
                                  className="text-[9px] uppercase tracking-[0.15em] text-black/35"
                                >
                                  Remove
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* STEP 2 */}
                  {bookingStep === 2 && (
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-black/40">
                        Step 02
                      </p>

                      <h4 className="mt-3 font-serif text-4xl leading-none md:text-5xl">
                        What feels wrong?
                      </h4>

                      <p className="mt-4 text-sm leading-6 text-black/45">
                        Don't worry about tailoring terminology.
                        Just describe the feeling.
                      </p>

                      <div className="mt-8 grid grid-cols-2 gap-2">
                        {[
                          "Too loose",
                          "Too tight",
                          "Too long",
                          "Too short",
                          "Wrong shape",
                          "Not sure",
                        ].map((issue) => {
                          const active = fitIssues.includes(issue);

                          return (
                            <button
                              key={issue}
                              onClick={() => toggleIssue(issue)}
                              className={`flex min-h-[110px] flex-col justify-between border p-5 text-left transition ${
                                active
                                  ? "border-black bg-[#171717] text-white"
                                  : "border-black/10 bg-white/30"
                              }`}
                            >
                              <span className="font-serif text-2xl">
                                {issue}
                              </span>

                              <span
                                className={`flex h-7 w-7 items-center justify-center rounded-full border ${
                                  active
                                    ? "border-white bg-white text-black"
                                    : "border-black/15"
                                }`}
                              >
                                {active && <CheckIcon />}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      <div className="mt-8 border border-black/10 bg-white/30 p-5">
                        <p className="text-[9px] uppercase tracking-[0.2em] text-black/35">
                          Selected garments
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {selectedGarments.map((item) => (
                            <span
                              key={item.id}
                              className="rounded-full bg-[#171717] px-4 py-2 text-[9px] uppercase tracking-[0.12em] text-white"
                            >
                              {item.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 3 */}
                  {bookingStep === 3 && (
                    <form
                      onSubmit={submitBooking}
                      className="space-y-7"
                    >
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-black/40">
                          Step 03
                        </p>

                        <h4 className="mt-3 font-serif text-4xl leading-none md:text-5xl">
                          Where should we come?
                        </h4>
                      </div>

                      <div>
                        <p className="mb-2 text-[9px] uppercase tracking-[0.18em] text-black/40">
                          Visit type
                        </p>

                        <div className="grid grid-cols-3 gap-2">
                          {[
                            "Just me",
                            "Family",
                            "Friends",
                          ].map((item) => (
                            <button
                              type="button"
                              key={item}
                              onClick={() => setOrderType(item)}
                              className={`border px-3 py-4 text-[10px] uppercase tracking-[0.12em] ${
                                orderType === item
                                  ? "border-black bg-black text-white"
                                  : "border-black/10"
                              }`}
                            >
                              {item}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <input
                          required
                          placeholder="Your name"
                          value={form.name}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              name: e.target.value,
                            })
                          }
                          className="w-full border-b border-black/15 bg-transparent px-0 py-4 text-sm outline-none placeholder:text-black/30"
                        />

                        <input
                          required
                          type="tel"
                          placeholder="Phone number"
                          value={form.phone}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              phone: e.target.value,
                            })
                          }
                          className="w-full border-b border-black/15 bg-transparent px-0 py-4 text-sm outline-none placeholder:text-black/30"
                        />

                        <input
                          required
                          placeholder="Area / locality in Bengaluru"
                          value={form.area}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              area: e.target.value,
                            })
                          }
                          className="w-full border-b border-black/15 bg-transparent px-0 py-4 text-sm outline-none placeholder:text-black/30"
                        />

                        <select
                          required
                          value={form.preferredTime}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              preferredTime: e.target.value,
                            })
                          }
                          className="w-full border-b border-black/15 bg-transparent px-0 py-4 text-sm outline-none"
                        >
                          <option value="">
                            Preferred visit time
                          </option>
                          <option>Morning</option>
                          <option>Afternoon</option>
                          <option>Evening</option>
                        </select>
                      </div>

                      <div className="rounded-2xl bg-[#171717] p-5 text-white">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[9px] uppercase tracking-[0.2em] text-white/35">
                              Estimated total
                            </p>

                            <p className="mt-1 font-serif text-3xl">
                              ₹{total || estimatedTime}
                            </p>
                          </div>

                          <div className="text-right">
                            <p className="text-[9px] text-white/35">
                              {selectedGarments.length} garment
                              {selectedGarments.length === 1
                                ? ""
                                : "s"}
                            </p>

                            {discountPercent > 0 && (
                              <p className="mt-1 text-[9px] uppercase tracking-[0.12em] text-[#cdb57d]">
                                {discountPercent}% bundle saving
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="mt-5 border-t border-white/10 pt-4 text-[10px] text-white/40">
                          Final price is confirmed after the
                          Fit Consultant assesses the garment.
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="flex w-full items-center justify-center gap-3 rounded-full bg-[#171717] px-6 py-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white"
                      >
                        Request my fit visit
                        <ArrowIcon />
                      </button>
                    </form>
                  )}
                </>
              )}
            </div>

            {/* Drawer footer navigation */}
            {!submitted && (
              <div className="border-t border-black/10 bg-[#eeeae1] px-5 py-4 md:px-7">
                <div className="flex items-center justify-between gap-3">
                  <button
                    onClick={() => {
                      if (bookingStep > 1) {
                        setBookingStep(bookingStep - 1);
                      } else {
                        closeBooking();
                      }
                    }}
                    className="px-3 py-3 text-[10px] uppercase tracking-[0.15em] text-black/40"
                  >
                    {bookingStep === 1 ? "Cancel" : "Back"}
                  </button>

                  {bookingStep < 3 && (
                    <button
                      disabled={
                        bookingStep === 1 &&
                        selectedGarments.length === 0
                      }
                      onClick={() => {
                        if (bookingStep === 1) {
                          setBookingStep(2);
                        } else {
                          setBookingStep(3);
                        }
                      }}
                      className="flex items-center gap-3 rounded-full bg-[#171717] px-6 py-3 text-[10px] uppercase tracking-[0.15em] text-white disabled:cursor-not-allowed disabled:opacity-25"
                    >
                      Continue
                      <ArrowIcon />
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
