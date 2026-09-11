"use client";

import { ArrowRight } from "lucide-react";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

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
  // Men
  { name: "Shirt", price: 199, image: "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=1000&q=90", category: "Men" },
  { name: "T-shirt", price: 149, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=90", category: "Men" },
  { name: "Polo T-shirt", price: 169, image: "https://images.unsplash.com/photo-1625910513413-5fc45e8c3c4f?auto=format&fit=crop&w=1000&q=90", category: "Men" },
  { name: "Kurta", price: 249, image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=1000&q=90", category: "Men" },
  { name: "Kurta Pajama", price: 399, image: "https://images.unsplash.com/photo-1597983073493-88cd35cf93c9?auto=format&fit=crop&w=1000&q=90", category: "Men" },
  { name: "Sherwani", price: 699, image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=90", category: "Men" },
  { name: "Bandhgala", price: 599, image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=1000&q=90", category: "Men" },
  { name: "Blazer", price: 399, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=90", category: "Men" },
  { name: "Suit", price: 699, image: "https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&w=1000&q=90", category: "Men" },
  { name: "Waistcoat", price: 299, image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=90", category: "Men" },
  { name: "Trousers", price: 249, image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=90", category: "Men" },
  { name: "Jeans", price: 199, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1000&q=90", category: "Men" },
  { name: "Chinos", price: 199, image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1000&q=90", category: "Men" },
  { name: "Shorts", price: 149, image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=1000&q=90", category: "Men" },
  { name: "Joggers", price: 149, image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=1000&q=90", category: "Men" },
  { name: "Dhoti", price: 299, image: "https://images.unsplash.com/photo-1583391733981-849840a7b5f1?auto=format&fit=crop&w=1000&q=90", category: "Men" },
  { name: "Veshti", price: 299, image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=90", category: "Men" },

  // Women
  { name: "Saree", price: 399, image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=90", category: "Women" },
  { name: "Blouse", price: 249, image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=90", category: "Women" },
  { name: "Salwar Suit", price: 399, image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=1000&q=90", category: "Women" },
  { name: "Anarkali", price: 449, image: "https://images.unsplash.com/photo-1597983073493-88cd35cf93c9?auto=format&fit=crop&w=1000&q=90", category: "Women" },
  { name: "Lehenga", price: 599, image: "https://images.unsplash.com/photo-1583391733981-849840a7b5f1?auto=format&fit=crop&w=1000&q=90", category: "Women" },
  { name: "Gown", price: 499, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=90", category: "Women" },
  { name: "Dress", price: 299, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=90", category: "Women" },
  { name: "Jumpsuit", price: 299, image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=90", category: "Women" },
  { name: "Skirt", price: 199, image: "https://images.unsplash.com/photo-1583496661160-fb5886a13d27?auto=format&fit=crop&w=1000&q=90", category: "Women" },
  { name: "Palazzo", price: 199, image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=1000&q=90", category: "Women" },
  { name: "Leggings", price: 149, image: "https://images.unsplash.com/photo-1506629905607-d9f1c3e4d4b7?auto=format&fit=crop&w=1000&q=90", category: "Women" },
  { name: "Women’s Jeans", price: 199, image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=90", category: "Women" },
  { name: "Top", price: 149, image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1000&q=90", category: "Women" },
  { name: "Kurti", price: 249, image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=1000&q=90", category: "Women" },
  { name: "Co-ord Set", price: 299, image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1000&q=90", category: "Women" },
  { name: "Shrug", price: 199, image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=90", category: "Women" },
  { name: "Women’s Blazer", price: 399, image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=1000&q=90", category: "Women" },
  { name: "Women’s Jacket", price: 399, image: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=1000&q=90", category: "Women" },

  // Kids / shared wardrobe
  { name: "Kids Shirt", price: 149, image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1000&q=90", category: "Kids" },
  { name: "Kids Dress", price: 199, image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=1000&q=90", category: "Kids" },
  { name: "Kids Kurta", price: 199, image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=1000&q=90", category: "Kids" },
  { name: "Kids Jeans", price: 149, image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=1000&q=90", category: "Kids" },
  { name: "Hoodie", price: 199, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1000&q=90", category: "All" },
  { name: "Sweatshirt", price: 199, image: "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=1000&q=90", category: "All" },
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

const VISIT_TIMES = [
  {
    value: "Morning · 9 AM–12 PM",
    title: "Morning",
    detail: "9 AM – 12 PM",
  },
  {
    value: "Afternoon · 12–4 PM",
    title: "Afternoon",
    detail: "12 PM – 4 PM",
  },
  {
    value: "Evening · 5–8 PM",
    title: "Evening",
    detail: "5 PM – 8 PM",
  },
];

function getNextVisitDates() {
  const dates: { value: string; day: string; date: string; month: string }[] = [];
  const now = new Date();

  for (let i = 0; i < 7; i += 1) {
    const date = new Date(now);
    date.setHours(12, 0, 0, 0);
    date.setDate(now.getDate() + i);

    const value = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0"),
    ].join("-");

    dates.push({
      value,
      day:
        i === 0
          ? "Today"
          : i === 1
            ? "Tomorrow"
            : date.toLocaleDateString("en-IN", { weekday: "short" }),
      date: String(date.getDate()),
      month: date.toLocaleDateString("en-IN", { month: "short" }),
    });
  }

  return dates;
}

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
  const [customGarment, setCustomGarment] = useState("");
  const [garmentSearch, setGarmentSearch] = useState("");
  const [garmentCategory, setGarmentCategory] = useState("All");
  const [orderType, setOrderType] = useState("Just me");
  const [groupSize, setGroupSize] = useState(2);
  const [submitted, setSubmitted] = useState(false);

  const [appointmentDate, setAppointmentDate] = useState("");
  const [visitDates, setVisitDates] = useState<{ value: string; day: string; date: string; month: string }[]>([]);
  const [profileLoaded, setProfileLoaded] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    area: "",
    pincode: "",
    time: "",
  });

  const [trackingId, setTrackingId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

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

  useEffect(() => {
    setVisitDates(getNextVisitDates());

    try {
      const saved = window.localStorage.getItem("lera_customer_profile");
      if (saved) {
        const parsed = JSON.parse(saved);
        setForm((current) => ({
          ...current,
          name: typeof parsed.name === "string" ? parsed.name : "",
          phone: typeof parsed.phone === "string" ? parsed.phone : "",
          email: typeof parsed.email === "string" ? parsed.email : "",
          area: typeof parsed.area === "string" ? parsed.area : "",
          pincode: typeof parsed.pincode === "string" ? parsed.pincode : "",
        }));
      }
    } catch (error) {
      console.error("Could not load saved L’ERA profile", error);
    } finally {
      setProfileLoaded(true);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    const previousRoot = root.style.backgroundColor;
    const previousBody = body.style.backgroundColor;
    const previousOverscroll = root.style.overscrollBehaviorY;

    root.style.backgroundColor = "#211719";
    body.style.backgroundColor = "#211719";
    root.style.overscrollBehaviorY = "none";

    return () => {
      root.style.backgroundColor = previousRoot;
      body.style.backgroundColor = previousBody;
      root.style.overscrollBehaviorY = previousOverscroll;
    };
  }, []);

  useEffect(() => {
    if (!profileLoaded) return;

    try {
      window.localStorage.setItem(
        "lera_customer_profile",
        JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          area: form.area,
          pincode: form.pincode,
        }),
      );
    } catch (error) {
      console.error("Could not save L’ERA profile", error);
    }
  }, [form, profileLoaded]);

  const filteredGarments = useMemo(() => {
    const query = garmentSearch.trim().toLowerCase();
    return GARMENTS.filter((item) => {
      const matchesCategory = garmentCategory === "All" || item.category === garmentCategory || item.category === "All";
      const matchesSearch = !query || item.name.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [garmentSearch, garmentCategory]);

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

  const addCustomGarment = () => {
    const name = customGarment.trim();
    if (!name) return;

    setSelected((current) => [
      ...current,
      {
        id: Date.now() + Math.random(),
        name,
        price: 0,
        image: IMAGES.wardrobeRoom,
      },
    ]);
    setCustomGarment("");
  };

  const removeGarment = (id: number) => {
    setSelected((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  const resetBookingSession = () => {
    setStep(1);
    setSelected([]);
    setIssues([]);
    setCustomGarment("");
    setGarmentSearch("");
    setGarmentCategory("All");
    setOrderType("Just me");
    setGroupSize(2);
    setSubmitted(false);
    setAppointmentDate("");
    setForm((current) => ({ ...current, time: "" }));
    setTrackingId("");
    setSubmitError("");
  };

  const startBooking = (garment?: string, initialOrderType?: string) => {
    resetBookingSession();
    if (initialOrderType) setOrderType(initialOrderType);
    if (garment) {
      const item = GARMENTS.find((entry) => entry.name === garment);
      if (item) {
        setSelected([{ ...item, id: Date.now() + Math.random() }]);
      }
    }
    setBookingOpen(true);
  };

  const closeBooking = () => {
    setBookingOpen(false);
  };

  const subtotal = selected.reduce(
    (sum, item) => sum + item.price,
    0
  );

  const pricedGarments = selected.filter((item) => item.price > 0).length;

  const discountPercent =
    pricedGarments >= 5
      ? 20
      : pricedGarments >= 3
      ? 15
      : pricedGarments >= 2
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

  const generateTrackingId = () =>
    `LE-${crypto.randomUUID().replace(/-/g, "").slice(0, 8).toUpperCase()}`;

  const submitBooking = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitError("");

    if (submitting) return;

    try {
      setSubmitting(true);

      const newTrackingId = generateTrackingId();
      const params = new URLSearchParams(window.location.search);
      const getParam = (key: string) => params.get(key) || null;

      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          customer_name: form.name.trim(),
          email: form.email.trim() || null,
          phone: form.phone.trim(),
          address: form.area.trim(),
          area: form.area.trim(),
          city: "Bengaluru",
          pincode: form.pincode.trim(),
          total,
          status: "Request Received",
          tracking_id: newTrackingId,
          preferred_visit_date: appointmentDate || null,
          preferred_visit_time: form.time,
          order_type: orderType,
          group_size: orderType === "Just me" ? 1 : groupSize,
          fit_issues: issues,
          marketing_source: getParam("utm_source") || document.referrer || "direct",
          utm_source: getParam("utm_source"),
          utm_medium: getParam("utm_medium"),
          utm_campaign: getParam("utm_campaign"),
          utm_content: getParam("utm_content"),
          utm_term: getParam("utm_term"),
          landing_page: window.location.pathname,
          referrer: document.referrer || null,
          fbclid: getParam("fbclid"),
          gclid: getParam("gclid"),
        })
        .select("id, tracking_id")
        .single();

      if (orderError || !order) {
        console.error(orderError);
        throw new Error("We couldn't save your request. Please try again.");
      }

      const orderItems = selected.map((item) => ({
        order_id: order.id,
        product_name: item.name,
        category: "Alteration",
        price: item.price,
        quantity: 1,
      }));

      if (orderItems.length > 0) {
        const { error: itemsError } = await supabase
          .from("order_items")
          .insert(orderItems);

        if (itemsError) {
          console.error(itemsError);
          throw new Error("Your request was saved, but the garment details could not be saved.");
        }
      }

      setTrackingId(order.tracking_id || newTrackingId);

      if (form.email.trim()) {
        try {
          await fetch("/api/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              type: "confirmation",
              to: form.email.trim(),
              customerName: form.name.trim(),
              trackingId: order.tracking_id || newTrackingId,
              status: "Request Received",
              appointmentDate,
              appointmentTime: form.time,
            }),
          });
        } catch (emailError) {
          console.error("Confirmation email failed", emailError);
        }
      }

      setSubmitted(true);
    } catch (error) {
      console.error(error);
      setSubmitError(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
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
            className="font-serif text-[25px] font-medium tracking-[0.12em]"
          >
            L’ERA
          </a>

          <a
            href="/track"
            className="ml-auto mr-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/70 transition hover:text-white lg:hidden"
          >
            Track
          </a>

          <nav className="hidden items-center gap-8 text-sm uppercase tracking-[0.18em] lg:flex">
            <a href="#why">Why us</a>
            <a href="#services">Services</a>
            <a href="#pricing">Pricing</a>
            <a href="#process">How it works</a>
            <a href="/track">Track</a>
          </nav>

          <button
            onClick={() => startBooking()}
            className="rounded-full bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-black transition hover:scale-[1.03]"
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
              <span className="text-xs uppercase tracking-[0.28em]">
                Bengaluru · Doorstep clothing alterations
              </span>
            </div>

            <h1 className="max-w-[1100px] font-serif text-[clamp(52px,9.5vw,132px)] leading-[0.8] tracking-[-0.065em] text-white">
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

                <div className="mt-4 flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-white/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#B68A4C]" />
                  No traffic · No parking · No waiting
                </div>
              </div>

              <button
                onClick={() => startBooking()}
                className="flex w-fit items-center gap-3 rounded-full bg-[#F7F1E7] px-7 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#1B1515] shadow-[0_12px_35px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#C7A56C]"
              >
                Book a fit visit
                <Arrow />
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-7 right-7 hidden text-right text-white md:block">
          <p className="text-sm uppercase tracking-[0.2em] text-white/60">
            L’ERA
          </p>
          <p className="font-serif text-2xl">Fit Lives Better.</p>
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
              <p className="text-xs uppercase tracking-[0.25em] text-black/60">
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

            <p className="hidden max-w-[220px] text-right text-xs leading-5 text-black/60 md:block">
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

                <span className="absolute left-5 top-5 text-xs tracking-[0.2em] text-white/60">
                  {problem.number}
                </span>

                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <p className="text-sm uppercase tracking-[0.2em] text-white/50">
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
            <p className="text-xs uppercase tracking-[0.25em] text-black/55">
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
                <p className="text-sm uppercase tracking-[0.2em] text-white/60">
                  Your home
                </p>

                <p className="mt-1 font-serif text-3xl">
                  The fitting room comes to you.
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-black/55">
                The L’ERA way
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
                    <span className="text-xs text-black/50">
                      {number}
                    </span>

                    <span className="font-serif text-xl">
                      {title}
                    </span>

                    <span className="text-xs leading-5 text-black/60">
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
                <span className="text-xs tracking-[0.2em] text-white/50">
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
                <p className="text-xs uppercase tracking-[0.24em] text-white/50">
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
                <p className="text-sm uppercase tracking-[0.2em] text-white/50">01 · Craft</p>
                <p className="mt-1 font-serif text-3xl">Measured first.</p>
              </div>
            </div>
            <div className="flex min-h-[300px] flex-col justify-between rounded-[2px] bg-[#2A1D1F] p-6 text-[#F7F1E7] md:p-8">
              <p className="text-xs uppercase tracking-[0.24em] text-[#C7A56C]">02 · Finish</p>
              <div>
                <p className="font-serif text-4xl leading-[0.92] md:text-5xl">
                  Your clothes deserve more than “good enough.”
                </p>
                <div className="mt-7 h-px bg-white/10" />
                <p className="mt-5 text-xs leading-5 text-white/65">
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
              <p className="text-xs uppercase tracking-[0.25em] text-black/55">
                See what we mean by fit
              </p>
              <h2 className="mt-4 max-w-[850px] font-serif text-[clamp(48px,6.5vw,92px)] leading-[0.84] tracking-[-0.06em]">
                Fit is not just
                <br />
                a <span className="italic text-[#8B3152]">size.</span>
              </h2>
            </div>
            <p className="max-w-[300px] text-xs leading-5 text-black/60">
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
                <p className="text-xs uppercase tracking-[0.24em] text-white/50">
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
                  <p className="text-sm uppercase tracking-[0.2em] text-white/50">02 · Craft</p>
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
          FIT CHECK
      ===================================================== */}

      <section className="bg-[#E5D6C5] px-5 py-24 md:px-10 md:py-36">
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-black/55">
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
              className="mt-9 flex items-center gap-3 rounded-full bg-[#1B1515] px-7 py-4 text-xs uppercase tracking-[0.17em] text-white"
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
          THE FIT RELATIONSHIP
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#F7F1E7] px-5 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <p className="text-xs uppercase tracking-[0.25em] text-black/50">
                The first visit
              </p>
              <h2 className="mt-5 max-w-[680px] font-serif text-[clamp(52px,6.5vw,92px)] leading-[0.83] tracking-[-0.06em]">
                We don't just
                <br />
                <span className="italic text-[#8B3152]">measure.</span>
                <br />
                We remember.
              </h2>
              <p className="mt-8 max-w-[430px] text-base leading-7 text-black/60">
                A great fit is personal. We want to understand what feels right to you, how your clothes should sit, and what your wardrobe actually needs — not just write down a set of numbers.
              </p>
              <div className="mt-9 flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-black/45">
                <span className="h-px w-10 bg-[#A77A42]" />
                Your fit becomes easier every time.
              </div>
            </div>

            <div>
              {[
                [
                  "01",
                  "Listen first",
                  "We start with the garment and the person wearing it. What feels wrong? What do you wish it did differently? What kind of fit do you like?",
                ],
                [
                  "02",
                  "Observe how you move",
                  "We look beyond a standing measurement — posture, shoulder slope, stance and how the garment behaves when you sit, reach and move.",
                ],
                [
                  "03",
                  "Measure what matters",
                  "We take the body measurements relevant to the garment, then compare them with the garment itself. Alteration is about the relationship between both.",
                ],
                [
                  "04",
                  "Record your fit preferences",
                  "Relaxed or sharp. Longer sleeve or cleaner break. More room here, less there. These preferences become part of your L’ERA fit notes.",
                ],
                [
                  "05",
                  "Keep learning",
                  "On future visits, we don't start from zero. Your previous fit notes, preferences and alteration history can make the next experience faster and more personal.",
                ],
              ].map(([number, title, text]) => (
                <div key={number} className="group border-t border-black/10 py-7 md:py-8">
                  <div className="grid gap-4 md:grid-cols-[55px_220px_1fr] md:items-start">
                    <span className="text-xs tracking-[0.18em] text-[#A77A42]">{number}</span>
                    <h3 className="font-serif text-3xl leading-none tracking-[-0.03em] transition-transform duration-300 group-hover:translate-x-1 md:text-4xl">
                      {title}
                    </h3>
                    <p className="max-w-[520px] text-sm leading-6 text-black/55">{text}</p>
                  </div>
                </div>
              ))}

              <div className="border-y border-black/10 py-8">
                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-black/45">
                      The promise
                    </p>
                    <p className="mt-2 max-w-[560px] font-serif text-3xl leading-[0.95] md:text-4xl">
                      The more we work with you, the less you have to explain.
                    </p>
                  </div>
                  <button
                    onClick={() => startBooking()}
                    className="flex w-fit shrink-0 items-center gap-3 rounded-full bg-[#211719] px-6 py-3.5 text-xs uppercase tracking-[0.16em] text-white transition hover:bg-[#3A2528]"
                  >
                    Start your fit profile
                    <Arrow />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PRICING
      ===================================================== */}

      <section
        id="pricing"
        className="bg-[#211719] px-5 py-20 text-[#F7F1E7] md:px-10 md:py-28"
      >
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/60">
                Simple pricing
              </p>

              <h2 className="mt-4 max-w-[620px] font-serif text-[clamp(46px,6vw,78px)] leading-[0.86] tracking-[-0.055em]">
                Bring more.
                <br />
                <span className="italic text-[#C7A56C]">Pay less per piece.</span>
              </h2>

              <p className="mt-7 max-w-[470px] text-base leading-7 text-white/70">
                Combine garments in the same doorstep visit and unlock a better
                price across the order.
              </p>

              <button
                onClick={() => startBooking()}
                className="mt-8 inline-flex items-center rounded-full bg-[#F7F1E7] px-6 py-3.5 text-sm font-semibold text-[#211719] transition hover:bg-white"
              >
                Check your price
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>

            <div className="grid gap-3">
              {[
                ["2 garments", "10% off"],
                ["3–4 garments", "15% off"],
                ["5+ garments", "20% off"],
              ].map(([count, saving], index) => (
                <div
                  key={count}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#2A1D1F] px-6 py-5 md:px-7 md:py-6"
                >
                  <div className="flex items-center gap-5">
                    <span className="font-serif text-2xl text-white/45">
                      0{index + 1}
                    </span>
                    <span className="text-base font-medium">{count}</span>
                  </div>

                  <span className="rounded-xl bg-[#3A2925] px-4 py-2 text-sm font-semibold text-[#C7A56C]">
                    {saving}
                  </span>
                </div>
              ))}

              <div className="mt-2 rounded-2xl border border-[#C7A56C]/25 bg-[#F7F1E7] p-5 text-[#211719]">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#80664D]">
                  Final price
                </p>
                <p className="mt-2 text-base leading-6">
                  Starting prices are shown online. Your Fit Consultant confirms
                  the final alteration price after seeing the garments at home.
                </p>
              </div>
            </div>
          </div>
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
              <p className="text-xs uppercase tracking-[0.25em] text-white/65">
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

            <div className="absolute left-5 top-5 rounded-full bg-white/90 px-5 py-3 text-xs uppercase tracking-[0.17em]">
              One doorstep visit
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-black/55">
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
                startBooking();
                setOrderType("Family / Friends");
              }}
              className="mt-9 flex items-center gap-3 rounded-full bg-[#1B1515] px-7 py-4 text-xs uppercase tracking-[0.17em] text-white"
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

      <section className="relative min-h-[720px] overflow-hidden bg-[#211719]">
        <img
          src={IMAGES.consultation}
          alt="Doorstep fitting"
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#211719] via-[#211719]/35 to-[#211719]/45" />

        <div className="relative mx-auto flex min-h-[720px] max-w-[1450px] flex-col justify-end px-6 pb-14 md:px-12 md:pb-20">
          <p className="text-xs uppercase tracking-[0.28em] text-white/65">
            L’ERA
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
              className="flex items-center justify-center gap-3 rounded-full bg-white px-8 py-5 text-sm font-semibold uppercase tracking-[0.15em] text-black"
            >
              Book a fit visit
              <Arrow />
            </button>

            <span className="text-xs text-white/55">
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
              L’ERA
            </p>

            <p className="mt-2 text-xs text-white/50">
              Fit Lives Better.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-7 gap-y-3 text-xs uppercase tracking-[0.17em] text-white/60">
            <a href="#why">Why us</a>
            <a href="#services">Services</a>
            <a href="#pricing">Pricing</a>
            <a href="#process">How it works</a>
            <a href="/track">Track request</a>
          </div>

          <p className="text-xs text-white/20">
            © {new Date().getFullYear()} L’ERA
          </p>
        </div>
      </footer>

      {/* =====================================================
          MOBILE CTA
      ===================================================== */}

      <div className="fixed bottom-4 left-4 right-4 z-40 md:hidden">
        <button
          onClick={() => startBooking()}
          className="flex w-full items-center justify-center gap-3 rounded-full bg-[#1B1515] px-6 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-white shadow-2xl ring-1 ring-[#C7A56C]/20"
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
                <span className="font-serif text-xl font-medium tracking-[0.12em]">L’ERA</span>
                <span className="h-3 w-px bg-white/20" />
                <span className="text-sm uppercase tracking-[0.2em] text-white/65">
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
                <p className="text-xs uppercase tracking-[0.22em] text-black/55">
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
                      <span className={`text-xs ${index + 1 <= step ? "text-[#A77A42]" : "text-black/60"}`}>
                        {number}
                      </span>
                      <span className={`text-xs uppercase tracking-[0.14em] ${index + 1 === step ? "text-black" : "text-black/50"}`}>
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
                        <img src={IMAGES.consultation} alt="L’ERA fit consultation" className="h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#211719]/80 via-transparent to-transparent" />
                        <div className="absolute bottom-5 left-5 text-white">
                          <p className="text-xs uppercase tracking-[0.22em] text-white/55">L’ERA</p>
                          <p className="mt-1 font-serif text-2xl">Your fit journey starts here.</p>
                        </div>
                      </div>
                      <p className="text-xs uppercase tracking-[0.25em] text-[#A77A42]">Request received</p>
                      <h3 className="mt-3 max-w-[560px] font-serif text-[clamp(48px,7vw,78px)] leading-[0.82] tracking-[-0.055em]">
                        We'll call
                        <br />
                        <span className="italic">you.</span>
                      </h3>
                      <p className="mt-6 max-w-[450px] text-sm leading-6 text-black/60">
                        Your request is now in our system. We'll confirm the visit by phone and take it from there.
                      </p>

                      <div className="mt-7 rounded-[4px] bg-[#211719] p-5 text-white">
                        <p className="text-xs uppercase tracking-[0.2em] text-white/50">Your tracking ID</p>
                        <p className="mt-2 font-serif text-3xl tracking-[0.08em] text-[#D4B277]">{trackingId}</p>
                        <p className="mt-3 text-sm leading-5 text-white/60">
                          Keep this ID. You can use it to check your request status from the tracking page.
                        </p>
                        {form.email.trim() ? (
                          <p className="mt-3 text-xs text-white/45">A confirmation email was requested for {form.email.trim()}.</p>
                        ) : (
                          <p className="mt-3 text-xs text-white/45">No email was provided. Your phone number is enough for our team to contact you.</p>
                        )}
                      </div>
                    </div>
                    <div className="mt-10 grid gap-2 sm:grid-cols-2">
                      <button
                        type="button"
                        onClick={() => startBooking()}
                        className="w-full rounded-full bg-[#211719] px-7 py-5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#3A2528]"
                      >
                        Book another fit visit
                      </button>
                      <a
                        href="/track"
                        className="flex w-full items-center justify-center rounded-full border border-black/10 bg-white/60 px-7 py-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#211719] transition hover:bg-white"
                      >
                        Track this request
                      </a>
                    </div>
                  </div>
                ) : (
                  <>
                    {step === 1 && (
                      <div>
                        <div className="grid gap-7 md:grid-cols-[1fr_190px] md:items-end">
                          <div>
                            <p className="text-xs uppercase tracking-[0.22em] text-[#A77A42]">Step 01 · Your wardrobe</p>
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
                            <p className="text-sm uppercase tracking-[0.18em] text-black/55">Who are we fitting?</p>
                            {orderType !== "Just me" && (
                              <span className="text-xs uppercase tracking-[0.14em] text-[#A77A42]">Group booking</span>
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
                                <span className={`mt-1 block text-xs ${orderType === type ? "text-white/65" : "text-black/50"}`}>
                                  {type === "Just me" ? "One wardrobe" : "One doorstep visit"}
                                </span>
                              </button>
                            ))}
                          </div>

                          {orderType !== "Just me" && (
                            <div className="mt-2 flex items-center justify-between rounded-xl border border-[#A77A42]/25 bg-[#A77A42]/[0.07] px-4 py-3">
                              <div>
                                <p className="text-sm uppercase tracking-[0.15em] text-black/55">People in this visit</p>
                                <p className="mt-0.5 text-xs text-black/55">Everyone can bring their garments.</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <button type="button" onClick={() => setGroupSize(Math.max(2, groupSize - 1))} className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 bg-white">−</button>
                                <span className="w-6 text-center font-serif text-lg">{groupSize}</span>
                                <button type="button" onClick={() => setGroupSize(Math.min(8, groupSize + 1))} className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 bg-white">+</button>
                              </div>
                            </div>
                          )}
                        </div>

                        <div id="linearera-garment-picker" className="mt-8 scroll-mt-6">
                          <div className="mb-4">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                              <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#211719]">Choose your garments</p>
                                <p className="mt-1 text-sm leading-5 text-black/55">Search by name or browse by who it’s for.</p>
                              </div>
                              <div className="relative w-full sm:max-w-[280px]">
                                <input
                                  type="search"
                                  value={garmentSearch}
                                  onChange={(e) => setGarmentSearch(e.target.value)}
                                  placeholder="Search shirt, saree, sherwani..."
                                  className="min-h-[48px] w-full rounded-xl border border-black/10 bg-white px-4 pr-10 text-base text-black outline-none placeholder:text-black/40 focus:border-[#A77A42]"
                                  aria-label="Search garments"
                                />
                                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black/45">⌕</span>
                              </div>
                            </div>
                            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                              {["All", "Men", "Women", "Kids"].map((category) => (
                                <button
                                  key={category}
                                  type="button"
                                  onClick={() => setGarmentCategory(category)}
                                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${garmentCategory === category ? "bg-[#211719] text-white" : "border border-black/10 bg-white text-black/65 hover:border-black/20"}`}
                                >
                                  {category === "All" ? "Everyone" : category}
                                </button>
                              ))}
                            </div>
                          </div>

                          {filteredGarments.length > 0 ? (
                            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                          {filteredGarments.map((item) => (
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
                          ) : (
                            <div className="rounded-2xl border border-dashed border-black/15 bg-white/50 p-6 text-center">
                              <p className="text-base font-semibold text-[#211719]">We don’t have that in the list yet.</p>
                              <p className="mt-1 text-sm text-black/55">Add the garment below and your Fit Consultant can assess it at home.</p>
                            </div>
                          )}
                        </div>

                        <div className="mt-4 rounded-[18px] border border-[#A77A42]/25 bg-[#A77A42]/[0.06] p-4 sm:p-5">
                          <div className="flex items-start gap-3">
                            <div className="flex-1">
                              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#211719]">Can’t find your garment?</p>
                              <p className="mt-1 text-sm leading-5 text-black/55">Type it below — for example, gown, sherwani, kurta or anything else.</p>
                            </div>
                          </div>
                          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                            <input
                              type="text"
                              value={customGarment}
                              onChange={(e) => setCustomGarment(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  addCustomGarment();
                                }
                              }}
                              placeholder="e.g. Gown, Sherwani"
                              className="min-h-[48px] flex-1 rounded-xl border border-black/10 bg-white px-4 text-base text-black outline-none placeholder:text-black/40 focus:border-[#A77A42]"
                              aria-label="Enter a garment not shown in the list"
                            />
                            <button
                              type="button"
                              onClick={addCustomGarment}
                              disabled={!customGarment.trim()}
                              className="min-h-[48px] rounded-xl bg-[#211719] px-5 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#3A2528] disabled:cursor-not-allowed disabled:opacity-30"
                            >
                              Add garment
                            </button>
                          </div>
                          <p className="mt-2 text-xs leading-5 text-black/50">Price for custom garments is confirmed by your Fit Consultant after seeing the garment.</p>
                        </div>

                         {selected.length > 0 && (
                          <div className="mt-7 rounded-[20px] border border-black/10 bg-white/40 p-4 md:p-5">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm uppercase tracking-[0.2em] text-black/55">Your selection</p>
                                <p className="mt-1 font-serif text-2xl">{selected.length} {selected.length === 1 ? "garment" : "garments"}</p>
                              </div>
                              {discountPercent > 0 && (
                                <div className="rounded-full bg-[#A77A42]/10 px-3 py-2 text-xs uppercase tracking-[0.13em] text-[#8B642F]">
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
                              <span className="text-sm uppercase tracking-[0.15em] text-black/55">Estimated price</span>
                              <span className="font-serif text-2xl">{selected.some((item) => item.price === 0) ? "Confirmed at home" : `₹${total}`}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {step === 2 && (
                      <div>
                        <div className="grid gap-6 md:grid-cols-[1fr_180px] md:items-end">
                          <div>
                            <p className="text-xs uppercase tracking-[0.22em] text-[#A77A42]">Step 02 · Fit</p>
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
                             <p className="text-xs font-medium uppercase tracking-[0.15em] text-black/60">Not sure what to choose?</p>
                             <p className="mt-1 text-xs text-black/55">Choose this and we'll assess the fit at home.</p>
                           </div>
                           <button
                             type="button"
                             onClick={() => setIssues((current) => current.includes("Not sure") ? current : [...current, "Not sure"])}
                             className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition ${issues.includes("Not sure") ? "bg-[#211719] text-white" : "border border-black/10 bg-white text-black"}`}
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
                              <p className="text-sm uppercase tracking-[0.2em] text-white/55">Selected garments</p>
                              <p className="mt-1 font-serif text-2xl">{selected.length} {selected.length === 1 ? "piece" : "pieces"} to assess</p>
                            </div>
                            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 font-serif">{issues.length}</span>
                          </div>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {selected.map((item) => (
                              <span key={item.id} className="rounded-full bg-white/10 px-3 py-2 text-xs uppercase tracking-[0.12em] text-white/65">{item.name}</span>
                            ))}
                          </div>
                          <p className="mt-4 text-xs leading-4 text-white/50">
                            Not sure? That's completely fine. Select “Not sure” and we'll assess the fit at home.
                          </p>
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <form id="linearera-booking-form" onSubmit={submitBooking}>
                        <div className="grid gap-6 md:grid-cols-[1fr_190px] md:items-end">
                          <div>
                            <p className="text-xs uppercase tracking-[0.22em] text-[#A77A42]">Step 03 · Doorstep</p>
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
                            <img src={IMAGES.home} alt="At-home L’ERA service" className="aspect-[4/5] w-full object-cover" />
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="mb-3 flex items-end justify-between gap-4">
                            <div>
                              <p className="text-xs uppercase tracking-[0.2em] text-black/45">Your details</p>
                              <p className="mt-1 text-sm text-black/55">We’ll use these to confirm your visit.</p>
                            </div>
                            {profileLoaded && (form.name || form.phone || form.area) && (
                              <span className="rounded-full border border-[#A77A42]/20 bg-[#A77A42]/[0.07] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#80613A]">
                                Saved on this device
                              </span>
                            )}
                          </div>

                          <div className="grid gap-3 sm:grid-cols-2">
                            <label className="border-b border-black/12 bg-transparent px-1 py-3.5 transition focus-within:border-[#A77A42]">
                              <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-black/45">Full name</span>
                              <input
                                required
                                type="text"
                                autoComplete="name"
                                placeholder="Prateek Raj"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                className="mt-1.5 w-full bg-transparent text-[16px] font-medium text-[#211719] outline-none placeholder:text-black/25"
                              />
                            </label>

                            <label className="border-b border-black/12 bg-transparent px-1 py-3.5 transition focus-within:border-[#A77A42]">
                              <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-black/45">Phone number</span>
                              <input
                                required
                                type="tel"
                                inputMode="tel"
                                autoComplete="tel"
                                placeholder="+91 98XXX XXXXX"
                                value={form.phone}
                                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                className="mt-1.5 w-full bg-transparent text-[16px] font-medium text-[#211719] outline-none placeholder:text-black/25"
                              />
                            </label>

                            <label className="border-b border-black/12 bg-transparent px-1 py-3.5 transition focus-within:border-[#A77A42] sm:col-span-2">
                              <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-black/45">
                                Email <span className="font-normal normal-case tracking-normal text-black/30">· optional</span>
                              </span>
                              <input
                                type="email"
                                autoComplete="email"
                                placeholder="you@example.com"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                className="mt-1.5 w-full bg-transparent text-[16px] font-medium text-[#211719] outline-none placeholder:text-black/25"
                              />
                            </label>

                            <label className="border-b border-black/12 bg-transparent px-1 py-3.5 transition focus-within:border-[#A77A42]">
                              <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-black/45">Area / address</span>
                              <input
                                required
                                type="text"
                                autoComplete="street-address"
                                placeholder="HSR Layout, Sector 6"
                                value={form.area}
                                onChange={(e) => setForm({ ...form, area: e.target.value })}
                                className="mt-1.5 w-full bg-transparent text-[16px] font-medium text-[#211719] outline-none placeholder:text-black/25"
                              />
                            </label>

                            <label className="border-b border-black/12 bg-transparent px-1 py-3.5 transition focus-within:border-[#A77A42]">
                              <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-black/45">Pincode</span>
                              <input
                                required
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]{6}"
                                maxLength={6}
                                autoComplete="postal-code"
                                placeholder="560102"
                                value={form.pincode}
                                onChange={(e) => setForm({ ...form, pincode: e.target.value.replace(/\D/g, "").slice(0, 6) })}
                                className="mt-1.5 w-full bg-transparent text-[16px] font-medium text-[#211719] outline-none placeholder:text-black/25"
                              />
                            </label>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="mb-3">
                            <p className="text-xs uppercase tracking-[0.2em] text-black/45">When should we come?</p>
                            <p className="mt-1 text-sm text-black/55">Pick a day and a convenient time window. We’ll call to confirm.</p>
                          </div>

                          <div className="flex gap-2 overflow-x-auto pb-2 snap-x">
                            {visitDates.map((date) => {
                              const active = appointmentDate === date.value;
                              return (
                                <button
                                  key={date.value}
                                  type="button"
                                  onClick={() => setAppointmentDate(date.value)}
                                  className={`min-w-[92px] snap-start rounded-[20px] border px-3 py-3.5 text-left transition ${
                                    active
                                      ? "border-[#211719] bg-[#211719] text-white shadow-[0_10px_24px_rgba(33,23,25,0.14)]"
                                      : "border-black/10 bg-white/65 text-[#211719] hover:border-black/20 hover:bg-white"
                                  }`}
                                >
                                  <span className={`block text-[10px] font-semibold uppercase tracking-[0.16em] ${active ? "text-[#D4B277]" : "text-black/45"}`}>
                                    {date.day}
                                  </span>
                                  <span className="mt-1 block font-serif text-2xl leading-none">{date.date}</span>
                                  <span className={`mt-1 block text-[11px] uppercase tracking-[0.12em] ${active ? "text-white/55" : "text-black/45"}`}>
                                    {date.month}
                                  </span>
                                </button>
                              );
                            })}
                          </div>

                          <div className="mt-3 grid gap-2 sm:grid-cols-3">
                            {VISIT_TIMES.map((slot) => {
                              const active = form.time === slot.value;
                              return (
                                <button
                                  key={slot.value}
                                  type="button"
                                  onClick={() => setForm({ ...form, time: slot.value })}
                                  className={`rounded-[20px] border px-4 py-4 text-left transition ${
                                    active
                                      ? "border-[#211719] bg-[#211719] text-white shadow-[0_10px_24px_rgba(33,23,25,0.12)]"
                                      : "border-black/10 bg-white/65 text-[#211719] hover:border-black/20 hover:bg-white"
                                  }`}
                                >
                                  <div className="flex items-center justify-between gap-2">
                                    <span className="font-serif text-xl">{slot.title}</span>
                                    <span className={`flex h-6 w-6 items-center justify-center rounded-full border text-xs ${active ? "border-[#D4B277] bg-[#D4B277] text-[#211719]" : "border-black/10 text-black/25"}`}>
                                      {active ? "✓" : ""}
                                    </span>
                                  </div>
                                  <span className={`mt-1 block text-xs ${active ? "text-white/55" : "text-black/45"}`}>{slot.detail}</span>
                                </button>
                              );
                            })}
                          </div>

                          {!appointmentDate || !form.time ? (
                            <p className="mt-3 text-xs text-black/40">Select a day and time window to continue.</p>
                          ) : (
                            <div className="mt-3 flex items-center gap-2 rounded-full border border-[#A77A42]/20 bg-[#A77A42]/[0.07] px-4 py-2.5 text-xs text-[#705531]">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#A77A42]" />
                              Requested for {new Date(`${appointmentDate}T12:00:00`).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })} · {form.time}
                            </div>
                          )}
                        </div>

                        <div className="mt-6 overflow-hidden rounded-[22px] border border-black/10 bg-white/35">
                          <div className="border-b border-black/10 px-5 py-4">
                            <p className="text-sm uppercase tracking-[0.2em] text-black/55">What happens next</p>
                          </div>
                          <div className="grid sm:grid-cols-2 lg:grid-cols-4">
                            {[
                              ["01", "We call", "Confirm your visit"],
                              ["02", "We fit", "Assess garments + take measurements"],
                              ["03", "You pay at home", "Final price confirmed after assessment"],
                              ["04", "We handle it", "Tailoring + quality check"],
                            ].map(([number, title, description]) => (
                              <div key={number} className="border-b border-black/10 p-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
                                <span className="text-xs text-[#A77A42]">{number}</span>
                                <p className="mt-2 font-serif text-xl">{title}</p>
                                <p className="mt-1 text-xs leading-4 text-black/55">{description}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {submitError && (
                          <div className="mt-5 rounded-[18px] border border-[#A33A3A]/20 bg-[#A33A3A]/[0.06] px-4 py-3.5">
                            <p className="text-sm font-semibold text-[#7D3030]">We couldn’t complete the request.</p>
                            <p className="mt-1 text-sm leading-5 text-[#7D3030]/75">{submitError}</p>
                          </div>
                        )}

                        <div className="mt-6 overflow-hidden rounded-[24px] bg-[#211719] text-white shadow-[0_18px_45px_rgba(33,23,25,0.16)]">
                          <div className="grid gap-0 md:grid-cols-[1.15fr_0.85fr]">
                            <div className="p-5 sm:p-6 md:p-7">
                              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">Estimated starting price</p>
                              <div className="mt-2 flex items-end gap-3">
                                <p className="font-serif text-4xl leading-none sm:text-5xl">{selected.some((item) => item.price === 0) ? "At home" : `₹${total}`}</p>
                                {!selected.some((item) => item.price === 0) && discount > 0 && <span className="mb-1 text-sm text-white/40 line-through">₹{subtotal}</span>}
                              </div>
                              <p className="mt-4 max-w-[520px] text-sm leading-6 text-white/65">
                                {selected.some((item) => item.price === 0)
                                  ? "Your selection includes a garment outside our standard list. Your Fit Consultant will assess it and confirm the final price at home."
                                  : "This is an estimate based on your selected garments. The final alteration price is confirmed only after your Fit Consultant sees the garments and understands the fit required."}
                              </p>
                            </div>

                            <div className="border-t border-white/10 bg-[#2b1e20] p-5 sm:p-6 md:border-l md:border-t-0 md:p-7">
                              {discountPercent > 0 && (
                                <div className="rounded-[18px] border border-[#D4B277]/25 bg-[#3a2928] p-4 sm:p-5">
                                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4B277]">Bundle saving</p>
                                  <div className="mt-1 flex items-baseline gap-2">
                                    <span className="font-serif text-3xl">{discountPercent}%</span>
                                    <span className="text-sm text-white/60">saved</span>
                                  </div>
                                  <p className="mt-2 text-sm leading-5 text-white/60">You save ₹{discount} by bringing these garments together.</p>
                                </div>
                              )}

                              <div className="mt-4 rounded-[18px] border border-white/10 bg-white/[0.04] p-4 sm:p-5">
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">Payment at home</p>
                                <p className="mt-2 text-base font-semibold text-white">No payment required now.</p>
                                <p className="mt-1 text-sm leading-6 text-white/60">
                                  We assess the garments, take measurements and confirm the final price with you. <span className="text-white/85">Payment is collected after the assessment.</span>
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="border-t border-white/10 px-5 py-4 sm:px-6">
                            <div className="flex items-center justify-between text-sm text-white/60">
                              <span>{selected.length} {selected.length === 1 ? "garment" : "garments"}</span>
                              <span>{selected.some((item) => item.price === 0) ? "Price confirmed at home" : `Estimated ₹${total}`}</span>
                            </div>
                            {discount > 0 && <div className="mt-2 flex justify-between text-sm text-[#D4B277]"><span>Bundle saving</span><span>-₹{discount}</span></div>}
                            <p className="mt-3 text-sm leading-5 text-white/45">Final pricing is confirmed at your doorstep before the alteration proceeds.</p>
                          </div>
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
                    className="px-2 py-3 text-sm uppercase tracking-[0.15em] text-black/55 transition hover:text-black"
                  >
                    {step === 1 ? "Cancel" : "Back"}
                  </button>

                  {step < 3 ? (
                    <button
                      type="button"
                      disabled={(step === 1 && selected.length === 0) || (step === 2 && issues.length === 0)}
                      onClick={() => setStep(step + 1)}
                      className="flex items-center gap-3 rounded-full bg-[#211719] px-7 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-white shadow-[0_12px_30px_rgba(33,23,25,0.2)] transition hover:bg-[#3A2528] disabled:cursor-not-allowed disabled:opacity-20"
                    >
                      {step === 1 ? "Continue to fit" : "Continue to visit"}
                      <Arrow />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      form="linearera-booking-form"
                      disabled={submitting || !appointmentDate || !form.time}
                      className="flex items-center gap-3 rounded-full bg-[#211719] px-7 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-white shadow-[0_12px_30px_rgba(33,23,25,0.2)] transition hover:bg-[#3A2528] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {submitting
                        ? "Saving your request..."
                        : !appointmentDate || !form.time
                          ? "Choose date & time"
                          : "Request my fit visit"}
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
