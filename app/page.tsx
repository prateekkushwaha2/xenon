"use client";

import {
  useMemo,
  useState,
  type FormEvent,
} from "react";

type GarmentType =
  | "Shirt"
  | "Pants / Jeans"
  | "Dress"
  | "T-shirt"
  | "Jacket"
  | "Repair";

type Garment = {
  id: string;
  type: GarmentType;
  issue?: string;
};

const PRICING: Record<GarmentType, number> = {
  Shirt: 199,
  "Pants / Jeans": 199,
  Dress: 299,
  "T-shirt": 149,
  Jacket: 399,
  Repair: 149,
};

const GARMENTS: {
  type: GarmentType;
  image: string;
  description: string;
}[] = [
  {
    type: "Pants / Jeans",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=85",
    description: "Length, waist, taper",
  },
  {
    type: "Shirt",
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=85",
    description: "Sleeves, waist, shoulders",
  },
  {
    type: "Dress",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=85",
    description: "Length, waist, fit",
  },
  {
    type: "T-shirt",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
    description: "Length, sleeves, body",
  },
  {
    type: "Jacket",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85",
    description: "Sleeves, waist, shoulders",
  },
  {
    type: "Repair",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=85",
    description: "Zip, button, tear & more",
  },
];

const ISSUES = [
  {
    name: "Too loose",
    icon: "↔",
  },
  {
    name: "Too tight",
    icon: "⇆",
  },
  {
    name: "Too long",
    icon: "↕",
  },
  {
    name: "Too short",
    icon: "↕",
  },
  {
    name: "Sleeves",
    icon: "⌁",
  },
  {
    name: "Waist",
    icon: "◌",
  },
  {
    name: "Not sure",
    icon: "?",
  },
];

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export default function LinearEraBooking() {
  const [step, setStep] = useState(1);

  const [orderType, setOrderType] = useState<
    "Just me" | "Family / Friends"
  >("Just me");

  const [garments, setGarments] = useState<Garment[]>([]);

  const [activeGarmentId, setActiveGarmentId] = useState<string | null>(
    null
  );

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");
  const [address, setAddress] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const subtotal = useMemo(() => {
    return garments.reduce((sum, garment) => {
      return sum + PRICING[garment.type];
    }, 0);
  }, [garments]);

  const discountRate = useMemo(() => {
    if (garments.length >= 5) return 20;
    if (garments.length >= 3) return 15;
    if (garments.length >= 2) return 10;
    return 0;
  }, [garments.length]);

  const discount = Math.round((subtotal * discountRate) / 100);

  const estimatedTotal = subtotal - discount;

  const activeGarment = garments.find(
    (garment) => garment.id === activeGarmentId
  );

  function addGarment(type: GarmentType) {
    const garment: Garment = {
      id: uid(),
      type,
    };

    setGarments((current) => [...current, garment]);
    setActiveGarmentId(garment.id);
  }

  function removeGarment(id: string) {
    setGarments((current) =>
      current.filter((garment) => garment.id !== id)
    );

    if (activeGarmentId === id) {
      setActiveGarmentId(null);
    }
  }

  function selectIssue(issue: string) {
    if (!activeGarmentId) return;

    setGarments((current) =>
      current.map((garment) =>
        garment.id === activeGarmentId
          ? { ...garment, issue }
          : garment
      )
    );
  }

  function goToIssues() {
    if (garments.length === 0) return;

    setActiveGarmentId(garments[0].id);
    setStep(2);
  }

  function goToDetails() {
    const incomplete = garments.find((garment) => !garment.issue);

    if (incomplete) {
      setActiveGarmentId(incomplete.id);
      setStep(2);
      return;
    }

    setStep(3);
  }

  function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#f4f0e8] text-[#171713]">
        <div className="mx-auto flex min-h-screen max-w-4xl items-center justify-center px-5 py-12">
          <div className="w-full max-w-xl text-center">
            <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-[#171713] text-3xl text-[#f4f0e8]">
              ✓
            </div>

            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#8d806e]">
              LinearEra
            </p>

            <h1 className="font-serif text-5xl leading-[0.95] tracking-[-0.04em] sm:text-6xl">
              Your fit journey
              <br />
              starts here.
            </h1>

            <p className="mx-auto mt-7 max-w-md text-sm leading-7 text-[#777064]">
              Thanks {name || "there"}. We’ll contact you on{" "}
              {phone || "your number"} to confirm the visit and understand
              your garments.
            </p>

            <div className="mt-10 rounded-[28px] border border-black/10 bg-white/50 p-6 text-left">
              <div className="flex items-center justify-between border-b border-black/10 pb-5">
                <span className="text-sm text-[#777064]">
                  Garments
                </span>
                <span className="font-medium">
                  {garments.length}
                </span>
              </div>

              <div className="flex items-center justify-between py-5">
                <span className="text-sm text-[#777064]">
                  Estimated total
                </span>
                <span className="text-2xl font-medium">
                  ₹{estimatedTotal}
                </span>
              </div>

              <p className="text-xs leading-5 text-[#8c8478]">
                Final pricing is confirmed after the Fit Consultant
                assesses the garments.
              </p>
            </div>

            <button
              onClick={() => {
                setSubmitted(false);
                setStep(1);
              }}
              className="mt-8 rounded-full bg-[#171713] px-8 py-4 text-sm text-white transition hover:opacity-90"
            >
              Back to LinearEra
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f4f0e8] text-[#171713]">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-black/10 bg-[#f4f0e8]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1500px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <div>
            <div className="font-serif text-2xl tracking-[-0.04em] sm:text-3xl">
              LinearEra
            </div>

            <div className="mt-2 flex gap-1.5">
              {[1, 2, 3].map((item) => (
                <span
                  key={item}
                  className={`h-1 rounded-full transition-all ${
                    step >= item
                      ? "w-8 bg-[#b39a61]"
                      : "w-3 bg-black/10"
                  }`}
                />
              ))}
            </div>
          </div>

          <button
            onClick={() => window.history.back()}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 text-lg transition hover:bg-black hover:text-white"
            aria-label="Close booking"
          >
            ×
          </button>
        </div>
      </header>

      {/* DESKTOP PROGRESS */}
      <div className="hidden border-b border-black/10 bg-[#eee8dc] lg:block">
        <div className="mx-auto flex max-w-[1500px] items-center justify-center gap-20 px-12 py-5">
          <ProgressItem number="01" title="Choose garments" active={step === 1} />
          <ProgressLine active={step >= 2} />
          <ProgressItem number="02" title="Tell us about the fit" active={step === 2} />
          <ProgressLine active={step >= 3} />
          <ProgressItem number="03" title="Your doorstep" active={step === 3} />
        </div>
      </div>

      {/* MAIN */}
      <div className="mx-auto max-w-[1500px] lg:grid lg:grid-cols-[minmax(0,1fr)_390px]">
        <section className="min-w-0 px-5 pb-36 pt-10 sm:px-8 lg:px-12 lg:pb-20 lg:pt-14">
          {/* STEP 1 */}
          {step === 1 && (
            <>
              <div className="max-w-3xl">
                <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#9b8a70]">
                  Step 01 · Choose garments
                </p>

                <h1 className="max-w-2xl font-serif text-5xl leading-[0.94] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
                  What are we
                  <br />
                  fixing?
                </h1>

                <p className="mt-6 max-w-md text-sm leading-6 text-[#777064] sm:text-base">
                  Select everything you’d like altered during this visit.
                </p>

                {/* ORDER TYPE */}
                <div className="mt-8 inline-flex rounded-full border border-black/10 bg-white p-1">
                  {(["Just me", "Family / Friends"] as const).map(
                    (option) => (
                      <button
                        key={option}
                        onClick={() => setOrderType(option)}
                        className={`rounded-full px-5 py-3 text-xs font-medium transition sm:px-7 ${
                          orderType === option
                            ? "bg-[#171713] text-white"
                            : "text-[#777064] hover:text-black"
                        }`}
                      >
                        {option}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* VISUAL GARMENT GRID */}
              <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 xl:grid-cols-3 2xl:grid-cols-4">
                {GARMENTS.map((garment) => {
                  const count = garments.filter(
                    (item) => item.type === garment.type
                  ).length;

                  return (
                    <button
                      key={garment.type}
                      onClick={() => addGarment(garment.type)}
                      className="group relative overflow-hidden rounded-[22px] border border-black/10 bg-white text-left transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:rounded-[26px]"
                    >
                      <div className="relative aspect-[0.9] overflow-hidden">
                        <img
                          src={garment.image}
                          alt={garment.type}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                        {count > 0 && (
                          <div className="absolute right-3 top-3 flex h-8 min-w-8 items-center justify-center rounded-full bg-white px-2 text-xs font-semibold shadow-lg">
                            {count}
                          </div>
                        )}

                        <div className="absolute bottom-3 left-3 right-3 text-white">
                          <div className="font-serif text-xl sm:text-2xl">
                            {garment.type}
                          </div>
                          <div className="mt-1 text-[10px] uppercase tracking-[0.15em] opacity-80">
                            {garment.description}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between px-4 py-4 sm:px-5">
                        <span className="text-xs text-[#777064]">
                          From ₹{PRICING[garment.type]}
                        </span>

                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f1ece2] text-lg transition group-hover:bg-[#171713] group-hover:text-white">
                          +
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* SELECTED */}
              {garments.length > 0 && (
                <div className="mt-14">
                  <div className="mb-5 flex items-end justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-[#9b8a70]">
                        Your garments
                      </p>
                      <h2 className="mt-2 font-serif text-3xl">
                        {garments.length} selected
                      </h2>
                    </div>

                    <span className="hidden text-xs text-[#777064] sm:block">
                      More garments = more savings
                    </span>
                  </div>

                  <div className="flex gap-3 overflow-x-auto pb-3">
                    {garments.map((garment, index) => (
                      <SelectedGarment
                        key={garment.id}
                        garment={garment}
                        index={index}
                        onRemove={() => removeGarment(garment.id)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* CONTINUE */}
              <div className="mt-12 flex justify-end">
                <button
                  onClick={goToIssues}
                  disabled={garments.length === 0}
                  className="w-full rounded-full bg-[#171713] px-8 py-4 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30 sm:w-auto"
                >
                  Continue →
                </button>
              </div>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <div className="max-w-3xl">
                <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#9b8a70]">
                  Step 02 · Fit assessment
                </p>

                <h1 className="font-serif text-5xl leading-[0.94] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
                  What feels
                  <br />
                  wrong?
                </h1>

                <p className="mt-6 max-w-md text-sm leading-6 text-[#777064] sm:text-base">
                  Don’t worry about knowing the exact alteration. Just tell
                  us what feels off.
                </p>
              </div>

              {/* GARMENT SWITCHER */}
              <div className="mt-10 flex gap-3 overflow-x-auto pb-2">
                {garments.map((garment, index) => {
                  const image =
                    GARMENTS.find((item) => item.type === garment.type)
                      ?.image;

                  return (
                    <button
                      key={garment.id}
                      onClick={() => setActiveGarmentId(garment.id)}
                      className={`relative flex min-w-[130px] items-center gap-3 rounded-2xl border p-2 text-left transition ${
                        activeGarmentId === garment.id
                          ? "border-[#171713] bg-white"
                          : "border-black/10 bg-transparent"
                      }`}
                    >
                      <img
                        src={image}
                        alt=""
                        className="h-14 w-12 rounded-xl object-cover"
                      />

                      <div>
                        <div className="text-xs font-medium">
                          {garment.type}
                        </div>
                        <div className="mt-1 text-[10px] text-[#8c8478]">
                          {garment.issue || "Select fit"}
                        </div>
                      </div>

                      {garment.issue && (
                        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#171713] text-[10px] text-white">
                          ✓
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* ISSUE VISUAL */}
              <div className="mt-10">
                {activeGarment ? (
                  <div className="rounded-[30px] border border-black/10 bg-[#eee8dc] p-5 sm:p-8">
                    <div className="mb-8 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-[#9b8a70]">
                          Currently fixing
                        </p>

                        <h2 className="mt-2 font-serif text-3xl sm:text-4xl">
                          {activeGarment.type}
                        </h2>
                      </div>

                      <div className="hidden h-14 w-14 items-center justify-center rounded-full bg-white font-serif text-2xl sm:flex">
                        {garments.findIndex(
                          (item) => item.id === activeGarment.id
                        ) + 1}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {ISSUES.map((issue) => (
                        <button
                          key={issue.name}
                          onClick={() => selectIssue(issue.name)}
                          className={`group min-h-[125px] rounded-[22px] border p-5 text-left transition sm:min-h-[145px] ${
                            activeGarment.issue === issue.name
                              ? "border-[#171713] bg-[#171713] text-white"
                              : "border-black/10 bg-white hover:border-black/30"
                          }`}
                        >
                          <div
                            className={`flex h-11 w-11 items-center justify-center rounded-full text-xl ${
                              activeGarment.issue === issue.name
                                ? "bg-white/10"
                                : "bg-[#f1ece2]"
                            }`}
                          >
                            {issue.icon}
                          </div>

                          <div className="mt-7 text-sm font-medium">
                            {issue.name}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="rounded-[30px] bg-[#eee8dc] p-10 text-center">
                    Select a garment above.
                  </div>
                )}
              </div>

              <div className="mt-10 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="rounded-full border border-black/10 px-8 py-4 text-sm"
                >
                  ← Back
                </button>

                <button
                  onClick={goToDetails}
                  className="rounded-full bg-[#171713] px-8 py-4 text-sm font-medium text-white"
                >
                  Continue →
                </button>
              </div>
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
              <div className="max-w-3xl">
                <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#9b8a70]">
                  Step 03 · Your doorstep
                </p>

                <h1 className="font-serif text-5xl leading-[0.94] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
                  Where should
                  <br />
                  we come?
                </h1>

                <p className="mt-6 max-w-md text-sm leading-6 text-[#777064] sm:text-base">
                  Just give us the basics. We’ll call you to confirm the
                  visit.
                </p>
              </div>

              <form
                onSubmit={submitBooking}
                className="mt-12 max-w-2xl"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Your name"
                    value={name}
                    onChange={setName}
                    placeholder="Prateek"
                    required
                  />

                  <Field
                    label="Phone number"
                    value={phone}
                    onChange={setPhone}
                    placeholder="+91"
                    type="tel"
                    required
                  />

                  <Field
                    label="Area / locality"
                    value={area}
                    onChange={setArea}
                    placeholder="Indiranagar"
                    required
                  />

                  <Field
                    label="Preferred time"
                    value=""
                    onChange={() => {}}
                    placeholder="We’ll confirm by phone"
                    disabled
                  />
                </div>

                <div className="mt-5">
                  <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8c8478]">
                    Address
                  </label>

                  <textarea
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    required
                    rows={4}
                    placeholder="House / apartment / office address"
                    className="mt-3 w-full resize-none rounded-[20px] border border-black/10 bg-white px-5 py-4 text-sm outline-none transition placeholder:text-black/25 focus:border-black"
                  />
                </div>

                <div className="mt-8 rounded-[24px] bg-[#eee8dc] p-6">
                  <p className="text-xs font-medium">
                    What happens next?
                  </p>

                  <div className="mt-5 grid gap-5 sm:grid-cols-3">
                    <MiniStep
                      number="01"
                      text="We call to confirm"
                    />
                    <MiniStep
                      number="02"
                      text="Fit Consultant visits"
                    />
                    <MiniStep
                      number="03"
                      text="We alter & return"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-8 w-full rounded-full bg-[#171713] px-8 py-5 text-sm font-medium text-white transition hover:opacity-90"
                >
                  Request my fit visit →
                </button>

                <p className="mt-4 text-center text-[11px] text-[#8c8478]">
                  No payment required now · Final price confirmed after
                  assessment
                </p>
              </form>
            </>
          )}
        </section>

        {/* DESKTOP SUMMARY */}
        <aside className="hidden border-l border-black/10 bg-[#e9e2d6] lg:block">
          <div className="sticky top-[77px] flex min-h-[calc(100vh-77px)] flex-col p-9 xl:p-11">
            <Summary
              garments={garments}
              subtotal={subtotal}
              discount={discount}
              discountRate={discountRate}
              total={estimatedTotal}
              onRemove={removeGarment}
            />

            {step === 1 && (
              <button
                onClick={goToIssues}
                disabled={garments.length === 0}
                className="mt-auto w-full rounded-full bg-[#171713] px-6 py-5 text-sm font-medium text-white disabled:opacity-30"
              >
                Continue →
              </button>
            )}

            {step === 2 && (
              <button
                onClick={goToDetails}
                className="mt-auto w-full rounded-full bg-[#171713] px-6 py-5 text-sm font-medium text-white"
              >
                Continue →
              </button>
            )}

            {step === 3 && (
              <div className="mt-auto rounded-2xl bg-white/50 p-5">
                <p className="text-xs font-medium">
                  Almost there.
                </p>
                <p className="mt-2 text-xs leading-5 text-[#777064]">
                  Submit your details and we’ll arrange your Fit Visit.
                </p>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* MOBILE STICKY SUMMARY */}
      {garments.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-black/10 bg-[#f4f0e8]/95 p-3 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] backdrop-blur-xl lg:hidden">
          <div className="mx-auto flex max-w-2xl items-center gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.18em] text-[#8c8478]">
                  {garments.length} garment
                  {garments.length !== 1 ? "s" : ""}
                </span>

                {discountRate > 0 && (
                  <span className="rounded-full bg-[#d8ceb9] px-2 py-1 text-[9px] font-semibold">
                    -{discountRate}%
                  </span>
                )}
              </div>

              <div className="mt-1 text-lg font-medium">
                ₹{estimatedTotal}
              </div>
            </div>

            {step < 3 ? (
              <button
                onClick={step === 1 ? goToIssues : goToDetails}
                className="rounded-full bg-[#171713] px-6 py-4 text-xs font-medium text-white"
              >
                Continue →
              </button>
            ) : (
              <div className="rounded-full bg-[#171713] px-6 py-4 text-xs font-medium text-white">
                ₹{estimatedTotal}
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

/* -------------------------------------------------------
   COMPONENTS
------------------------------------------------------- */

function ProgressItem({
  number,
  title,
  active,
}: {
  number: string;
  title: string;
  active: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 ${
        active ? "text-[#171713]" : "text-[#a39b8e]"
      }`}
    >
      <span className="text-[9px] tracking-[0.2em]">{number}</span>
      <span className="text-xs font-medium">{title}</span>
    </div>
  );
}

function ProgressLine({ active }: { active: boolean }) {
  return (
    <div
      className={`h-px w-16 ${
        active ? "bg-[#b39a61]" : "bg-black/10"
      }`}
    />
  );
}

function SelectedGarment({
  garment,
  index,
  onRemove,
}: {
  garment: Garment;
  index: number;
  onRemove: () => void;
}) {
  const image =
    GARMENTS.find((item) => item.type === garment.type)?.image;

  return (
    <div className="relative min-w-[150px] overflow-hidden rounded-2xl border border-black/10 bg-white sm:min-w-[180px]">
      <img
        src={image}
        alt={garment.type}
        className="h-28 w-full object-cover sm:h-32"
      />

      <button
        onClick={onRemove}
        className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm shadow"
        aria-label={`Remove ${garment.type}`}
      >
        ×
      </button>

      <div className="p-4">
        <div className="text-xs font-medium">
          {index + 1}. {garment.type}
        </div>

        <div className="mt-1 text-[10px] text-[#8c8478]">
          ₹{PRICING[garment.type]}
        </div>
      </div>
    </div>
  );
}

function Summary({
  garments,
  subtotal,
  discount,
  discountRate,
  total,
  onRemove,
}: {
  garments: Garment[];
  subtotal: number;
  discount: number;
  discountRate: number;
  total: number;
  onRemove: (id: string) => void;
}) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.3em] text-[#9b8a70]">
        Your visit
      </p>

      {garments.length === 0 ? (
        <div className="mt-12">
          <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-white/60 font-serif text-4xl">
            +
          </div>

          <h2 className="font-serif text-3xl">
            Nothing selected yet.
          </h2>

          <p className="mt-3 max-w-xs text-xs leading-5 text-[#8c8478]">
            Add one or more garments. The more you add, the more you save.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-8 space-y-5">
            {garments.map((garment, index) => (
              <div
                key={garment.id}
                className="flex items-start justify-between gap-3"
              >
                <div className="flex min-w-0 gap-3">
                  <span className="text-[10px] text-[#9b8a70]">
                    0{index + 1}
                  </span>

                  <div>
                    <div className="text-xs font-medium">
                      {garment.type}
                    </div>

                    <div className="mt-1 text-[10px] text-[#8c8478]">
                      {garment.issue || "Fit assessment"}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs">
                    ₹{PRICING[garment.type]}
                  </span>

                  <button
                    onClick={() => onRemove(garment.id)}
                    className="text-xs text-[#9b8a70] hover:text-black"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="my-8 h-px bg-black/10" />

          <div className="space-y-4 text-xs">
            <div className="flex justify-between">
              <span className="text-[#777064]">Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-[#667058]">
                Bundle saving ({discountRate}%)
              </span>

              <span className="text-[#667058]">
                −₹{discount}
              </span>
            </div>
          </div>

          <div className="mt-8">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#9b8a70]">
              Estimated
            </div>

            <div className="mt-1 font-serif text-5xl tracking-[-0.04em]">
              ₹{total}
            </div>
          </div>

          <div className="mt-7 rounded-[20px] bg-white/50 p-5">
            {garments.length < 5 ? (
              <>
                <div className="text-xs font-medium">
                  {garments.length < 2
                    ? "Add another garment."
                    : garments.length < 3
                    ? "Add one more for 15% off."
                    : "You're unlocking 20% savings."}
                </div>

                <div className="mt-2 text-[10px] leading-5 text-[#8c8478]">
                  {garments.length < 2
                    ? "Multiple garments in one visit cost less."
                    : garments.length < 3
                    ? "Bundle your clothes into the same doorstep visit."
                    : "Add two more garments to reach the maximum bundle saving."}
                </div>
              </>
            ) : (
              <>
                <div className="text-xs font-medium">
                  Maximum bundle saving unlocked.
                </div>

                <div className="mt-2 text-[10px] leading-5 text-[#8c8478]">
                  20% saving on this visit.
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8c8478]">
        {label}
      </span>

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className="mt-3 h-14 w-full rounded-[18px] border border-black/10 bg-white px-5 text-sm outline-none transition placeholder:text-black/25 focus:border-black disabled:cursor-not-allowed disabled:bg-black/5"
      />
    </label>
  );
}

function MiniStep({
  number,
  text,
}: {
  number: string;
  text: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="text-[9px] tracking-[0.2em] text-[#9b8a70]">
        {number}
      </div>

      <div className="text-xs leading-5 text-[#625d54]">
        {text}
      </div>
    </div>
  );
}
