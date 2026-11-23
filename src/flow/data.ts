
export type CardField = {
  name: string;
  type: string;
  slot: string;
  required?: boolean;
  note?: string;
};

export type CardPreview = {
  eyebrow: string;
  title: string;
  subtitle: string;
  badge: { label: string; tone: "signal" | "warn" | "info" };
  metrics: { label: string; value: string }[];
  rows: { label: string; value: string; meta?: string }[];
  actions: string[];
  footnote: string;
};

export type CardTemplate = {
  id: string;
  name: string;
  summary: string;
  surface: string;
  fieldCount: number;
  actionCount: number;
  fields: CardField[];
  preview: CardPreview;
  payload: Record<string, unknown>;
};

export type Industry = {
  id: string;
  name: string;
  tagline: string;
  accent: string;
  templates: CardTemplate[];
};

function make(
  id: string,
  name: string,
  summary: string,
  surface: string,
  opts: {
    eyebrow: string;
    title: string;
    subtitle: string;
    badge: CardPreview["badge"];
    metrics: CardPreview["metrics"];
    rows: CardPreview["rows"];
    actions: string[];
    footnote: string;
    fields: CardField[];
    payload: Record<string, unknown>;
  },
): CardTemplate {
  return {
    id,
    name,
    summary,
    surface,
    fieldCount: opts.fields.length,
    actionCount: opts.actions.length,
    fields: opts.fields,
    preview: {
      eyebrow: opts.eyebrow,
      title: opts.title,
      subtitle: opts.subtitle,
      badge: opts.badge,
      metrics: opts.metrics,
      rows: opts.rows,
      actions: opts.actions,
      footnote: opts.footnote,
    },
    payload: opts.payload,
  };
}

function stub(id: string, name: string, summary: string, surface: string, entity: string): CardTemplate {
  const key = id.replace(/-/g, "_");
  return make(id, name, summary, surface, {
    eyebrow: name,
    title: `${entity} #A-4192`,
    subtitle: "Grounded on live account data",
    badge: { label: "In progress", tone: "info" },
    metrics: [
      { label: "Confidence", value: "94%" },
      { label: "Updated", value: "2m ago" },
    ],
    rows: [
      { label: "Owner", value: "Jordan Vale", meta: "Queue: Tier 2" },
      { label: "Priority", value: "High", meta: "SLA 4h" },
      { label: "Next step", value: "Awaiting customer reply" },
    ],
    actions: ["Escalate", "Send update"],
    footnote: `Rendered from ${key} · 1 server action`,
    fields: [
      { name: "recordId", type: "ID", slot: "header", required: true },
      { name: "status", type: "Enum", slot: "badge", required: true },
      { name: "confidence", type: "Percent", slot: "metric" },
      { name: "details", type: "List<Detail>", slot: "body", required: true },
      { name: "nextAction", type: "Action", slot: "footer" },
    ],
    payload: {
      type: key,
      recordId: "rec_4192",
      status: "In progress",
      confidence: 0.94,
      details: [
        { label: "Owner", value: "Jordan Vale" },
        { label: "Priority", value: "High" },
      ],
      actions: [{ label: "Escalate", action: "EscalateCase" }],
    },
  });
}

const retailTemplates: CardTemplate[] = [];

retailTemplates.push(
  make("order-return-summary", "Order & Return Summary", "Order card with line items, refund math, and inline return approval.", "Chat · Web · Headless", {
    eyebrow: "Return request",
    title: "Order #RT-88214",
    subtitle: "Ada Lovelace · placed Aug 12 · 3 items",
    badge: { label: "Refund ready", tone: "signal" },
    metrics: [
      { label: "Refund due", value: "$148.20" },
      { label: "Return window", value: "6 days" },
      { label: "Risk", value: "Low" },
    ],
    rows: [
      { label: "Trail Runner GTX — size 9", value: "$118.00", meta: "Reason: too small" },
      { label: "Merino Crew Sock 2pk", value: "$24.00", meta: "Reason: unwanted" },
      { label: "Restocking fee", value: "-$6.20", meta: "Policy RET-04" },
    ],
    actions: ["Approve refund", "Email return label", "Offer exchange"],
    footnote: "returnSummary · 2 server actions · 1 workflow",
    fields: [
      { name: "orderId", type: "ID", slot: "header", required: true, note: "Order reference" },
      { name: "customerName", type: "Text(120)", slot: "subheader", required: true },
      { name: "returnStatus", type: "Enum", slot: "badge", required: true, note: "Open · Refund ready · Denied" },
      { name: "refundAmount", type: "Currency", slot: "metric", required: true },
      { name: "windowDaysLeft", type: "Number(2)", slot: "metric" },
      { name: "fraudRisk", type: "Enum", slot: "metric", note: "Scored by AI" },
      { name: "lineItems", type: "List<ReturnLine>", slot: "body", required: true },
      { name: "actions", type: "Action[]", slot: "footer", note: "Approve · Label · Exchange" },
    ],
    payload: {
      type: "returnSummary",
      orderId: "801Ru00000ABcDeIAT",
      customerName: "Ada Lovelace",
      returnStatus: "Refund ready",
      refundAmount: 148.2,
      currencyIsoCode: "USD",
      windowDaysLeft: 6,
      fraudRisk: "Low",
      lineItems: [
        { sku: "TRGTX-09", name: "Trail Runner GTX", qty: 1, amount: 118, reason: "Too small" },
        { sku: "MCS-2PK", name: "Merino Crew Sock 2pk", qty: 1, amount: 24, reason: "Unwanted" },
        { sku: "FEE-RESTOCK", name: "Restocking fee", qty: 1, amount: -6.2, reason: "Policy RET-04" },
      ],
      actions: [
        { label: "Approve refund", action: "IssueRefundInvocable", requiresConfirm: true },
        { label: "Email return label", flow: "Return_Label_Email" },
        { label: "Offer exchange", action: "CreateExchangeOrder" },
      ],
    },
  }),
  stub("order-tracking", "Live Order Tracking", "Shipment timeline with carrier events and proactive delay handling.", "Chat · Headless", "Shipment"),
  stub("product-finder", "Guided Product Finder", "Comparison grid the agent fills from catalog + inventory signals.", "Chat · Web", "Basket"),
  stub("loyalty-offer", "Loyalty & Offer Card", "Tier status, points math, and a redeemable offer with one-tap apply.", "Chat · Mobile", "Member"),
);

function four(prefix: string, entity: string, names: [string, string, string, string], blurbs: [string, string, string, string]) {
  return names.map((n, i) =>
    stub(`${prefix}-${i + 1}`, n, blurbs[i]!, i % 2 ? "Chat · Web" : "Chat · Headless", entity),
  );
}

export const industries: Industry[] = [
  {
    id: "retail",
    name: "Retail & Consumer Goods",
    tagline: "Orders, returns, loyalty",
    accent: "from-teal-400/25 to-cyan-400/10",
    templates: retailTemplates,
  },
  {
    id: "financial-services",
    name: "Financial Services",
    tagline: "Disputes, onboarding, advice",
    accent: "from-pink-400/25 to-amber-300/10",
    templates: four("fs", "Case", ["Transaction Dispute", "Account Opening", "Portfolio Snapshot", "Payment Plan Offer"], [
      "Dispute card with evidence trail and provisional-credit action.",
      "KYC checklist the agent completes step by step.",
      "Holdings, performance, and rebalance suggestions in one type.",
      "Hardship plan builder with affordability math.",
    ]),
  },
  {
    id: "healthcare",
    name: "Healthcare & Life Sciences",
    tagline: "Care, coverage, scheduling",
    accent: "from-sky-400/25 to-rose-400/10",
    templates: four("hc", "Encounter", ["Appointment Scheduler", "Care Plan Summary", "Benefits Check", "Prior Authorization"], [
      "Slot picker grounded on provider availability.",
      "Care team, medications, and adherence signals.",
      "Coverage, copay, and deductible in a compact card.",
      "Auth request status with document upload slot.",
    ]),
  },
  {
    id: "insurance",
    name: "Insurance",
    tagline: "Claims, policies, renewals",
    accent: "from-emerald-300/25 to-sky-300/10",
    templates: four("ins", "Claim", ["Claim Status Card", "FNOL Intake", "Policy Comparison", "Renewal Quote"], [
      "Claim timeline with adjuster notes and payout status.",
      "First-notice-of-loss capture with photo slots.",
      "Side-by-side coverage limits and deductibles.",
      "Quote card with endorsement toggles.",
    ]),
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    tagline: "Assets, orders, supply",
    accent: "from-indigo-400/25 to-blue-400/10",
    templates: four("mfg", "Work Order", ["Asset Health Card", "Work Order Dispatch", "Parts Availability", "Quality Nonconformance"], [
      "Telemetry, maintenance history, and failure risk.",
      "Technician assignment with route and skill match.",
      "Inventory across plants with substitution options.",
      "NCR intake with containment actions.",
    ]),
  },
  {
    id: "energy",
    name: "Energy & Utilities",
    tagline: "Usage, outages, programs",
    accent: "from-amber-300/25 to-emerald-300/10",
    templates: four("en", "Service Point", ["Usage & Bill Explainer", "Outage Status", "Rate Plan Advisor", "Rebate Enrollment"], [
      "Consumption chart slot with bill-driver breakdown.",
      "Restoration ETA with crew status and map slot.",
      "Plan comparison based on real usage curves.",
      "Program eligibility and one-tap enrollment.",
    ]),
  },
  {
    id: "travel",
    name: "Travel & Hospitality",
    tagline: "Bookings, disruption, stays",
    accent: "from-fuchsia-400/25 to-orange-300/10",
    templates: four("tr", "Itinerary", ["Itinerary Card", "Disruption Rebooking", "Room Upgrade Offer", "Loyalty Stay Summary"], [
      "Flights, stays, and transfers in one typed contract.",
      "Alternate options ranked with rebooking action.",
      "Upgrade tiers with price and points toggle.",
      "Nights, tier progress, and benefit usage.",
    ]),
  },
  {
    id: "public-sector",
    name: "Public Sector & Education",
    tagline: "Cases, permits, students",
    accent: "from-violet-400/25 to-sky-300/10",
    templates: four("ps", "Application", ["Permit Application", "Benefits Eligibility", "Student Advising", "Records Request"], [
      "Application status with required-document slots.",
      "Eligibility screening with rule explanations.",
      "Degree progress and next-course recommendations.",
      "Request tracker with fulfillment actions.",
    ]),
  },
  {
    id: "legal",
    name: "Legal & Compliance",
    tagline: "Matters, contracts, review",
    accent: "from-cyan-300/25 to-amber-200/10",
    templates: four("lg", "Matter", ["Matter Summary", "Contract Clause Review", "Compliance Attestation", "Legal Intake"], [
      "Matter card with deadlines and responsible counsel.",
      "Clause diffs with risk flags and redline action.",
      "Attestation status across teams.",
      "Structured intake that routes by matter type.",
    ]),
  },
  {
    id: "hvac",
    name: "HVAC & Field Service",
    tagline: "Dispatch, jobs, service",
    accent: "from-sky-300/25 to-rose-300/10",
    templates: four("hv", "Job", ["Service Appointment", "Diagnostic Checklist", "Maintenance Plan Offer", "Parts & Quote"], [
      "Arrival window, technician, and job scope.",
      "Guided diagnostics with reading capture slots.",
      "Plan tiers with savings math.",
      "Quote builder with parts and labor lines.",
    ]),
  },
];

export const flagshipIndustryId = "retail";
