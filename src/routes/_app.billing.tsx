import { createFileRoute } from "@tanstack/react-router";
import {
  PageHeader,
  Section,
  StatusPill,
} from "../components/shell/primitives";
import { useWorkspace } from "../lib/store";

export const Route = createFileRoute("/_app/billing")({
  head: () => ({
    meta: [
      { title: "Billing — Rumik AI" },
      { name: "description", content: "Top up credits and review your burn." },
    ],
  }),
  component: Billing,
});

interface WsBilling {
  balance: string;
  burned: string;
  requests: string;
  invoices: {
    id: string;
    date: string;
    amount: string;
    credits: string;
    status: string;
  }[];
}

const WORKSPACE_BILLING: Record<string, WsBilling> = {
  "Personal workspace": {
    balance: "1,024",
    burned: "185",
    requests: "849",
    invoices: [
      {
        id: "INV-2026-003",
        date: "Jun 15, 2026",
        amount: "₹5,000",
        credits: "5,000",
        status: "succeeded",
      },
      {
        id: "INV-2026-002",
        date: "May 10, 2026",
        amount: "₹10,000",
        credits: "11,500",
        status: "succeeded",
      },
      {
        id: "INV-2026-001",
        date: "Apr 02, 2026",
        amount: "₹1,000",
        credits: "1,000",
        status: "succeeded",
      },
    ],
  },
  "Acme Studio": {
    balance: "14,850",
    burned: "4,120",
    requests: "3,412",
    invoices: [
      {
        id: "INV-2026-104",
        date: "Jun 20, 2026",
        amount: "₹10,000",
        credits: "11,500",
        status: "succeeded",
      },
      {
        id: "INV-2026-103",
        date: "Jun 01, 2026",
        amount: "₹10,000",
        credits: "11,500",
        status: "succeeded",
      },
    ],
  },
  Lab: {
    balance: "500",
    burned: "15",
    requests: "42",
    invoices: [
      {
        id: "INV-2026-201",
        date: "Jun 28, 2026",
        amount: "₹1,000",
        credits: "1,000",
        status: "succeeded",
      },
    ],
  },
};

function Billing() {
  const ws = useWorkspace();
  const billData =
    WORKSPACE_BILLING[ws] || WORKSPACE_BILLING["Personal workspace"];

  return (
    <>
      <PageHeader
        eyebrow="Account"
        title="Billing"
        subtitle="Credits never expire. Charges are processed in INR by Razorpay."
      />

      <div className="grid grid-cols-3 hairline-b border-t animate-fade-in">
        <div className="px-6 py-7">
          <div className="eyebrow-label">Credit balance</div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-display text-[40px] font-medium leading-none tracking-[-0.03em] tabular-nums">
              {billData.balance}
            </span>
            <span className="text-[13px] text-muted-foreground">credits</span>
          </div>
          <div className="mt-2 text-[11.5px] text-muted-foreground">
            Never expires
          </div>
        </div>
        <div className="border-l border-border px-6 py-7">
          <div className="eyebrow-label">Burn — 30d</div>
          <div className="mt-3 font-display text-[28px] tracking-[-0.02em] tabular-nums">
            {billData.burned}
          </div>
          <div className="mt-2 text-[11.5px] text-muted-foreground">
            credits used
          </div>
        </div>
        <div className="border-l border-border px-6 py-7">
          <div className="eyebrow-label">Requests — 30d</div>
          <div className="mt-3 font-display text-[28px] tracking-[-0.02em] tabular-nums">
            {billData.requests}
          </div>
          <div className="mt-2 text-[11.5px] text-muted-foreground">
            across active keys
          </div>
        </div>
      </div>

      <Section title="Payment history">
        <div className="-mx-3">
          <div className="grid grid-cols-[1.2fr_1.5fr_1.2fr_1.2fr_auto] gap-6 px-3 pb-3 eyebrow-label">
            <span>Invoice ID</span>
            <span>Billing Date</span>
            <span>Amount Paid</span>
            <span>Credits Added</span>
            <span>Status</span>
          </div>
          {billData.invoices.map((inv) => (
            <div
              key={inv.id}
              className="grid grid-cols-[1.2fr_1.5fr_1.2fr_1.2fr_auto] items-center gap-6 px-3 py-4 hairline-t text-[13px] animate-fade-in"
            >
              <span className="font-mono text-[12px] text-foreground">
                {inv.id}
              </span>
              <span className="text-muted-foreground">{inv.date}</span>
              <span className="font-display tabular-nums text-foreground">
                {inv.amount}
              </span>
              <span className="font-display tabular-nums text-muted-foreground">
                {inv.credits} credits
              </span>
              <div>
                <StatusPill tone="success" dot>
                  Succeeded
                </StatusPill>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <div className="mt-6 text-[11.5px] leading-relaxed text-muted-foreground">
        Payments are processed by Razorpay. We never store card or UPI details.
        If a charge succeeded but credits didn't appear, refresh this page.
      </div>
    </>
  );
}
