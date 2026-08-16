"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/lib/supabase/client";

const startupTypes = ["B2B", "B2C", "SaaS", "Marketplace", "Platform", "API"];
const stages = ["Idea", "MVP", "Seed", "Growth", "Scale"];
const teamSizes = ["1", "2-5", "6-10", "11-25", "26-50", "50+"];
const hiringStatuses = [
  "Not hiring",
  "Hiring quietly",
  "Actively hiring",
  "Scaling fast",
];
const industries = [
  "AI",
  "Fintech",
  "Health",
  "Climate",
  "Developer Tools",
  "E-commerce",
  "HR Tech",
  "Cybersecurity",
];
const customerSegments = [
  "Consumers",
  "SMBs",
  "Mid-market",
  "Enterprise",
  "Developers",
  "Agencies",
];
const productCategories = [
  "API / SDK",
  "Web App",
  "CLI",
  "Mobile App",
  "Data Platform",
  "Automation Tool",
];
const productStages = ["Idea", "Prototype", "MVP", "Beta", "Live"];
const techCategories = [
  "Language",
  "Framework",
  "Cloud",
  "Database",
  "AI",
  "Analytics",
];
const technologies = [
  "React",
  "Next.js",
  "Python",
  "TypeScript",
  "AWS",
  "Supabase",
  "Postgres",
  "OpenAI",
  "Docker",
];
const steps = ["Basics", "Team", "Product", "Business", "Review"] as const;

const teamSizeMap: Record<TeamSize, number> = {
  "1": 1,
  "2-5": 5,
  "6-10": 10,
  "11-25": 25,
  "26-50": 50,
  "50+": 50,
};

const supabase = createClient();

type StartupType = (typeof startupTypes)[number];
type Stage = (typeof stages)[number];
type TeamSize = (typeof teamSizes)[number];
type HiringStatus = (typeof hiringStatuses)[number];
type Industry = (typeof industries)[number];
type CustomerSegment = (typeof customerSegments)[number];
type ProductCategory = (typeof productCategories)[number];
type ProductStage = (typeof productStages)[number];
type TechCategory = (typeof techCategories)[number];
type Technology = (typeof technologies)[number];

type Cofounder = {
  name: string;
  email: string;
};

function TogglePill({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
        active
          ? "border-emerald-400/40 bg-emerald-400/12 text-white shadow-[0_0_0_1px_rgba(52,211,153,0.18)]"
          : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}

function SectionLabel({ title, hint }: { title: string; hint: string }) {
  return (
    <div className="mb-5">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <p className="mt-1 text-sm text-slate-400">{hint}</p>
    </div>
  );
}

export default function OnboardingForm() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [checkingAccess, setCheckingAccess] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [profileLinkedInUrl, setProfileLinkedInUrl] = useState("");
  const [startupName, setStartupName] = useState("");
  const [startupDescription, setStartupDescription] = useState("");
  const [startupWebsite, setStartupWebsite] = useState("");
  const [startupCountry, setStartupCountry] = useState("");
  const [foundedYear, setFoundedYear] = useState("");
  const [selectedStartupType, setSelectedStartupType] =
    useState<StartupType>("SaaS");
  const [selectedStage, setSelectedStage] = useState<Stage>("MVP");
  const [selectedTeamSize, setSelectedTeamSize] = useState<TeamSize>("2-5");
  const [selectedHiringStatus, setSelectedHiringStatus] =
    useState<HiringStatus>("Hiring quietly");
  const [selectedIndustry, setSelectedIndustry] = useState<Industry>("AI");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [selectedCustomerSegment, setSelectedCustomerSegment] =
    useState<CustomerSegment>("Developers");
  const [selectedProductCategory, setSelectedProductCategory] =
    useState<ProductCategory>("Web App");
  const [selectedProductStage, setSelectedProductStage] =
    useState<ProductStage>("MVP");
  const [selectedTechCategory, setSelectedTechCategory] =
    useState<TechCategory>("Framework");
  const [selectedTechnologies, setSelectedTechnologies] = useState<
    Technology[]
  >(["Next.js", "Supabase", "Postgres"]);
  const [cofounders, setCofounders] = useState<Cofounder[]>([]);
  const [submissionState, setSubmissionState] = useState<"idle" | "saved">(
    "idle",
  );
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const progress = ((currentStep + 1) / steps.length) * 100;

  useEffect(() => {
    const loadUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        router.push("/auth/signin");
        return;
      }

      const profile = data.user.user_metadata?.full_name?.trim();
      const emailPrefix = data.user.email?.split("@")[0];
      setUserName(profile || emailPrefix || "");

      const { data: profileRow, error: profileError } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", data.user.id)
        .maybeSingle();

      if (profileError) {
        setError(profileError.message);
        setCheckingAccess(false);
        return;
      }

      if (profileRow) {
        router.push("/home");
        return;
      }

      setCheckingAccess(false);
    };

    void loadUser();
  }, [router]);

  const toggleTechnology = (technology: Technology) => {
    setError("");
    setSubmissionState("idle");
    setSelectedTechnologies((current) =>
      current.includes(technology)
        ? current.filter((item) => item !== technology)
        : [...current, technology],
    );
  };

  const addCofounder = () => {
    setError("");
    setSubmissionState("idle");
    setCofounders((current) => [...current, { name: "", email: "" }]);
  };

  const updateCofounder = (
    index: number,
    field: keyof Cofounder,
    value: string,
  ) => {
    setError("");
    setSubmissionState("idle");
    setCofounders((current) =>
      current.map((cofounder, currentIndex) =>
        currentIndex === index ? { ...cofounder, [field]: value } : cofounder,
      ),
    );
  };

  const goNext = () => {
    setError("");
    setSubmissionState("idle");
    setCurrentStep((current) => Math.min(current + 1, steps.length - 1));
  };

  const goBack = () => {
    setError("");
    setSubmissionState("idle");
    setCurrentStep((current) => Math.max(current - 1, 0));
  };

  const saveOnboarding = async () => {
    setError("");
    setIsSaving(true);

    try {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();
      if (userError) {
        throw userError;
      }

      const user = userData.user;
      if (!user) {
        throw new Error("You need to sign in before continuing.");
      }

      const now = new Date().toISOString();
      const startupId = crypto.randomUUID();
      const productId = crypto.randomUUID();
      const fullName =
        user.user_metadata?.full_name?.trim() ||
        user.email?.split("@")[0] ||
        userName;
      const avatarUrl = user.user_metadata?.avatar_url ?? null;
      const linkedinUrl = profileLinkedInUrl.trim() || null;
      const foundedYearValue = foundedYear.trim() ? Number(foundedYear) : null;

      if (!startupName.trim()) {
        throw new Error("Please add a startup name.");
      }

      if (!startupDescription.trim()) {
        throw new Error("Please add a startup description.");
      }

      if (!foundedYearValue || Number.isNaN(foundedYearValue)) {
        throw new Error("Please add a valid founded year.");
      }

      if (!productName.trim()) {
        throw new Error("Please add a product name.");
      }

      if (!productDescription.trim()) {
        throw new Error("Please add a product description.");
      }

      const { error: profileError } = await supabase.from("profiles").upsert(
        {
          id: user.id,
          full_name: fullName,
          avatar_url: avatarUrl,
          linkedin_url: linkedinUrl,
          updated_at: now,
        },
        { onConflict: "id" },
      );

      if (profileError) {
        throw new Error(profileError.message || "Could not save profile data.");
      }

      const { data: startupData, error: startupError } = await supabase
        .from("startups")
        .insert({
          id: startupId,
          name: startupName.trim(),
          description: startupDescription.trim(),
          website_url: startupWebsite.trim() || null,
          country: startupCountry.trim(),
          founded_year: foundedYearValue,
          industry: selectedIndustry,
          startup_types: [selectedStartupType],
          stage: selectedStage,
          team_size: teamSizeMap[selectedTeamSize],
          hiring_status: selectedHiringStatus,
          created_by: user.id,
          created_at: now,
          updated_at: now,
        });

      if (startupError) {
        throw new Error(
          startupError?.message || "Could not create the startup.",
        );
      }

      const { error: memberError } = await supabase
        .from("startup_members")
        .insert({
          startup_id: startupId,
          user_id: user.id,
          role: "Founder",
          access_level: "owner",
          is_founder: true,
          joined_at: now,
        });

      if (memberError) {
        throw new Error(memberError.message || "Could not add the founder.");
      }

      const inviteRows = cofounders
        .filter((cofounder) => cofounder.email.trim())
        .map((cofounder) => ({
          startup_id: startupId,
          email: cofounder.email.trim(),
          role: "Cofounder",
          access_level: "member",
          is_founder: true,
          invited_by: user.id,
          status: "pending",
          expires_at: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000,
          ).toISOString(),
          created_at: now,
        }));

      if (inviteRows.length > 0) {
        const { error: inviteError } = await supabase
          .from("startup_invitations")
          .insert(inviteRows);

        if (inviteError) {
          throw new Error(
            inviteError.message || "Could not create cofounder invites.",
          );
        }
      }

      const { error: productError } = await supabase.from("products").insert({
        id: productId,
        startup_id: startupId,
        name: productName.trim(),
        description: productDescription.trim(),
        category: selectedProductCategory,
        stage: selectedProductStage,
        target_customers: [selectedCustomerSegment],
        is_open_source: false,
        created_at: now,
        updated_at: now,
      });

      if (productError) {
        throw new Error(
          productError?.message || "Could not create the product.",
        );
      }

      const stackRows = selectedTechnologies.map((technology) => ({
        product_id: productId,
        technology,
        category: selectedTechCategory,
      }));

      const { error: stackError } = await supabase
        .from("product_tech_stack")
        .insert(stackRows);

      if (stackError) {
        throw new Error(
          stackError.message || "Could not save the product stack.",
        );
      }

      setSubmissionState("saved");
      router.push("/home");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        return;
      }

      if (err && typeof err === "object" && "message" in err) {
        setError(
          String(
            (err as { message?: string }).message ||
              "Could not save onboarding.",
          ),
        );
        return;
      }

      setError("Could not save onboarding.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await saveOnboarding();
  };

  const renderSummaryItem = (label: string, value: string) => (
    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/15 px-4 py-3">
      <span className="text-sm text-slate-400">{label}</span>
      <span className="text-sm font-medium text-white">{value}</span>
    </div>
  );

  const startupSummary = startupName.trim() || "Untitled startup";
  const productSummary = productName.trim() || "Untitled product";

  if (checkingAccess) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0c0c0c] text-white">
        <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-slate-300">
          Checking your account...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#0c0c0c] text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.16),transparent_32%),radial-gradient(circle_at_top_right,rgba(245,158,11,0.12),transparent_28%),radial-gradient(circle_at_bottom,rgba(244,63,94,0.10),transparent_28%)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent_16%,transparent_84%,rgba(255,255,255,0.02))]" />

      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-3 py-4 sm:px-5 sm:py-6 lg:px-8">
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-4 shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-6 lg:p-8">
          <div className="mb-6 flex flex-col gap-5 sm:mb-8 sm:gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
                Onboarding
              </div>
              <h1 className="mt-4 text-3xl font-semibold tracking-[-0.06em] sm:text-5xl lg:text-6xl">
                Hey {userName}.
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                Step through your setup with clear progress and a layout that
                adapts cleanly on mobile.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/15 px-4 py-3 text-sm text-slate-300">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>

          <div className="mb-6 overflow-x-auto pb-2 sm:mb-8">
            <div className="min-w-180">
              <div className="grid grid-cols-5 gap-3">
                {steps.map((step, index) => {
                  const active = index === currentStep;
                  const completed = index < currentStep;

                  return (
                    <button
                      key={step}
                      type="button"
                      onClick={() => setCurrentStep(index)}
                      className="text-left"
                    >
                      <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            completed || active
                              ? "bg-emerald-400"
                              : "bg-white/10"
                          }`}
                          style={{
                            width: completed ? "100%" : active ? "100%" : "0%",
                          }}
                        />
                      </div>
                      <div
                        className={`text-sm uppercase tracking-[0.28em] transition ${
                          active
                            ? "text-emerald-300"
                            : completed
                              ? "text-slate-200"
                              : "text-slate-500"
                        }`}
                      >
                        {step}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-6">
              {currentStep === 0 && (
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-6">
                  <SectionLabel
                    title="Basics"
                    hint="Connect your profile and add cofounders if you have them."
                  />

                  <div className="grid gap-6 lg:grid-cols-2">
                    <div className="space-y-4">
                      <div className="rounded-2xl border border-white/10 bg-black/15 p-4">
                        <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                          Profile
                        </div>
                        <div className="mt-2 text-lg font-semibold text-white">
                          {userName}
                        </div>
                        <p className="mt-1 text-sm text-slate-400">
                          Your name comes from your Supabase account.
                        </p>
                      </div>

                      <label className="block">
                        <span className="mb-2 block text-sm font-medium text-slate-200">
                          LinkedIn URL
                        </span>
                        <input
                          type="url"
                          value={profileLinkedInUrl}
                          onChange={(event) =>
                            setProfileLinkedInUrl(event.target.value)
                          }
                          placeholder="https://linkedin.com/in/your-name"
                          className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400/40"
                        />
                      </label>
                    </div>

                    <div>
                      <div className="mb-3 flex items-center justify-between text-sm font-medium text-slate-200">
                        <span>Cofounders</span>
                        <button
                          type="button"
                          onClick={addCofounder}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-2xl font-semibold text-white transition hover:border-emerald-400/40 hover:bg-emerald-400/10"
                          aria-label="Add cofounder"
                        >
                          +
                        </button>
                      </div>

                      <div className="space-y-3">
                        {cofounders.length === 0 ? (
                          <div className="rounded-2xl border border-dashed border-white/10 bg-black/15 px-4 py-5 text-sm text-slate-400">
                            Add cofounders with their name and email.
                          </div>
                        ) : (
                          cofounders.map((cofounder, index) => (
                            <div
                              key={`${index}-${cofounder.email}`}
                              className="grid gap-3 rounded-2xl border border-white/10 bg-black/15 p-4 sm:grid-cols-2"
                            >
                              <label className="block">
                                <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-slate-500">
                                  Name
                                </span>
                                <input
                                  type="text"
                                  value={cofounder.name}
                                  onChange={(event) =>
                                    updateCofounder(
                                      index,
                                      "name",
                                      event.target.value,
                                    )
                                  }
                                  placeholder="Cofounder name"
                                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400/40"
                                />
                              </label>
                              <label className="block">
                                <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-slate-500">
                                  Email
                                </span>
                                <input
                                  type="email"
                                  value={cofounder.email}
                                  onChange={(event) =>
                                    updateCofounder(
                                      index,
                                      "email",
                                      event.target.value,
                                    )
                                  }
                                  placeholder="name@company.com"
                                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400/40"
                                />
                              </label>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-6">
                  <SectionLabel
                    title="Startup"
                    hint="Tell us what you are building using quick, visual choices."
                  />

                  <div className="grid gap-6 lg:grid-cols-2">
                    <label className="block lg:col-span-2">
                      <span className="mb-2 block text-sm font-medium text-slate-200">
                        Startup name
                      </span>
                      <input
                        type="text"
                        value={startupName}
                        onChange={(event) => setStartupName(event.target.value)}
                        placeholder="Nova Labs"
                        required
                        className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400/40"
                      />
                    </label>

                    <label className="block lg:col-span-2">
                      <span className="mb-2 block text-sm font-medium text-slate-200">
                        Startup description
                      </span>
                      <textarea
                        value={startupDescription}
                        onChange={(event) =>
                          setStartupDescription(event.target.value)
                        }
                        placeholder="What problem do you solve?"
                        required
                        rows={4}
                        className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400/40"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-slate-200">
                        Website
                      </span>
                      <input
                        type="url"
                        value={startupWebsite}
                        onChange={(event) =>
                          setStartupWebsite(event.target.value)
                        }
                        placeholder="https://yourstartup.com"
                        className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400/40"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-slate-200">
                        Country
                      </span>
                      <input
                        type="text"
                        value={startupCountry}
                        onChange={(event) =>
                          setStartupCountry(event.target.value)
                        }
                        placeholder="United States"
                        required
                        className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400/40"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-slate-200">
                        Founded year
                      </span>
                      <input
                        type="number"
                        min="1900"
                        max="2100"
                        value={foundedYear}
                        onChange={(event) => setFoundedYear(event.target.value)}
                        placeholder="2026"
                        required
                        className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400/40"
                      />
                    </label>

                    <div>
                      <div className="mb-3 text-sm font-medium text-slate-200">
                        Startup type
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {startupTypes.map((option) => (
                          <TogglePill
                            key={option}
                            label={option}
                            active={selectedStartupType === option}
                            onClick={() => setSelectedStartupType(option)}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="mb-3 text-sm font-medium text-slate-200">
                        Stage
                      </div>
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                        {stages.map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => setSelectedStage(option)}
                            className={`rounded-2xl border px-3 py-4 text-left transition ${selectedStage === option ? "border-emerald-400/40 bg-emerald-400/10 text-white" : "border-white/10 bg-black/15 text-slate-300 hover:border-white/20 hover:bg-white/10 hover:text-white"}`}
                          >
                            <div className="text-sm font-semibold">
                              {option}
                            </div>
                            <div className="mt-1 text-xs text-slate-400">
                              Progressive milestone
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="mb-3 text-sm font-medium text-slate-200">
                        Team size
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {teamSizes.map((option) => (
                          <TogglePill
                            key={option}
                            label={option}
                            active={selectedTeamSize === option}
                            onClick={() => setSelectedTeamSize(option)}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="mb-3 text-sm font-medium text-slate-200">
                        Hiring status
                      </div>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {hiringStatuses.map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => setSelectedHiringStatus(option)}
                            className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${selectedHiringStatus === option ? "border-emerald-400/40 bg-emerald-400/10 text-white" : "border-white/10 bg-black/15 text-slate-300 hover:border-white/20 hover:bg-white/10 hover:text-white"}`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="mb-3 text-sm font-medium text-slate-200">
                        Industry
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {industries.map((option) => (
                          <TogglePill
                            key={option}
                            label={option}
                            active={selectedIndustry === option}
                            onClick={() => setSelectedIndustry(option)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-6">
                  <SectionLabel
                    title="Product"
                    hint="Pick the shape of the product you are launching and the stack behind it."
                  />

                  <div className="grid gap-6 lg:grid-cols-2">
                    <label className="block lg:col-span-2">
                      <span className="mb-2 block text-sm font-medium text-slate-200">
                        Product name
                      </span>
                      <input
                        type="text"
                        value={productName}
                        onChange={(event) => setProductName(event.target.value)}
                        placeholder="Nova Platform"
                        required
                        className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400/40"
                      />
                    </label>

                    <label className="block lg:col-span-2">
                      <span className="mb-2 block text-sm font-medium text-slate-200">
                        Product description
                      </span>
                      <textarea
                        value={productDescription}
                        onChange={(event) =>
                          setProductDescription(event.target.value)
                        }
                        placeholder="Describe the product in one or two sentences."
                        required
                        rows={4}
                        className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400/40"
                      />
                    </label>

                    <div>
                      <div className="mb-3 text-sm font-medium text-slate-200">
                        Product category
                      </div>
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                        {productCategories.map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => setSelectedProductCategory(option)}
                            className={`rounded-2xl border px-3 py-4 text-left transition ${selectedProductCategory === option ? "border-emerald-400/40 bg-emerald-400/10 text-white" : "border-white/10 bg-black/15 text-slate-300 hover:border-white/20 hover:bg-white/10 hover:text-white"}`}
                          >
                            <div className="text-sm font-semibold">
                              {option}
                            </div>
                            <div className="mt-1 text-xs text-slate-400">
                              Product shape
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="mb-3 text-sm font-medium text-slate-200">
                        Product stage
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {productStages.map((option) => (
                          <TogglePill
                            key={option}
                            label={option}
                            active={selectedProductStage === option}
                            onClick={() => setSelectedProductStage(option)}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="mb-3 text-sm font-medium text-slate-200">
                        Tech category
                      </div>
                      <div className="mb-3 flex flex-wrap gap-2">
                        {techCategories.map((option) => (
                          <TogglePill
                            key={option}
                            label={option}
                            active={selectedTechCategory === option}
                            onClick={() => setSelectedTechCategory(option)}
                          />
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {technologies.map((technology) => {
                          const active =
                            selectedTechnologies.includes(technology);
                          return (
                            <button
                              key={technology}
                              type="button"
                              onClick={() => toggleTechnology(technology)}
                              className={`rounded-full border px-4 py-2 text-sm transition ${active ? "border-amber-300/40 bg-amber-300/10 text-white" : "border-white/10 bg-black/15 text-slate-300 hover:border-white/20 hover:bg-white/10 hover:text-white"}`}
                            >
                              {technology}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-6">
                  <SectionLabel
                    title="Business"
                    hint="Choose the audience you want to serve first."
                  />
                  <div>
                    <div className="mb-3 text-sm font-medium text-slate-200">
                      Target customers
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {customerSegments.map((option) => (
                        <TogglePill
                          key={option}
                          label={option}
                          active={selectedCustomerSegment === option}
                          onClick={() => setSelectedCustomerSegment(option)}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 rounded-2xl border border-white/10 bg-black/15 p-4 text-sm text-slate-300">
                    This helps tailor your first workspace view and product
                    positioning.
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-6">
                  <SectionLabel
                    title="Review"
                    hint="Everything is ready. Check the selections and continue."
                  />
                  <div className="grid gap-3 sm:grid-cols-2">
                    {renderSummaryItem("Profile", userName)}
                    {renderSummaryItem(
                      "Cofounders",
                      cofounders.length === 0
                        ? "None yet"
                        : `${cofounders.length}`,
                    )}
                    {renderSummaryItem("Startup", startupSummary)}
                    {renderSummaryItem("Founded year", foundedYear || "-")}
                    {renderSummaryItem("Stage", selectedStage)}
                    {renderSummaryItem("Team size", selectedTeamSize)}
                    {renderSummaryItem("Industry", selectedIndustry)}
                    {renderSummaryItem("Product", productSummary)}
                    {renderSummaryItem("Customers", selectedCustomerSegment)}
                    {renderSummaryItem("Tech category", selectedTechCategory)}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={goBack}
                disabled={currentStep === 0 || isSaving}
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-white/20 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Back
              </button>

              <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                {currentStep < steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={isSaving}
                    className="inline-flex items-center justify-center rounded-full border border-emerald-400/25 bg-emerald-400/12 px-4 py-2.5 text-sm font-semibold text-emerald-100 transition hover:-translate-y-0.5 hover:border-emerald-300/40 hover:bg-emerald-400/18 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="inline-flex items-center justify-center rounded-full border border-emerald-400/25 bg-emerald-400/12 px-4 py-2.5 text-sm font-semibold text-emerald-100 transition hover:-translate-y-0.5 hover:border-emerald-300/40 hover:bg-emerald-400/18 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSaving ? "Saving..." : "Save and continue"}
                  </button>
                )}
              </div>
            </div>

            {error && (
              <div className="rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-200">
                {error}
              </div>
            )}

            {submissionState === "saved" && !error && (
              <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-200">
                Your setup is ready. Continuing into your workspace.
              </div>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}
