import { createFileRoute } from "@tanstack/react-router";
import { EnvelopeSimple, BookOpen, ChatCircle, ArrowUpRight } from "@phosphor-icons/react";
import { PageHeader } from "../components/shell/primitives";

export const Route = createFileRoute("/_app/support")({
  head: () => ({
    meta: [
      { title: "Support — Rumik AI" },
      { name: "description", content: "Talk to the team, browse docs, or join the developer community." },
    ],
  }),
  component: Support,
});

const CHANNELS = [
  { icon: EnvelopeSimple, title: "Email support",     hint: "Account and billing — usually within a business day.", action: "hello@rumik.ai" },
  { icon: BookOpen,       title: "Documentation",     hint: "Guides, API reference, and interactive tutorials.",     action: "docs.rumik.ai" },
  { icon: ChatCircle,     title: "Discord community", hint: "Builders shipping live voice companions, in public.",   action: "Join server" },
];

function Support() {
  return (
    <>
      <PageHeader
        eyebrow="Help"
        title="Support"
        subtitle="A quiet inbox is the goal. Pick the channel that fits."
      />
      <div className="-mx-3 hairline-t animate-fade-in">
        {CHANNELS.map(({ icon: Icon, title, hint, action }) => (
          <a key={title} href="#" className="group grid grid-cols-[auto_1fr_auto] items-center gap-6 px-3 py-7 hairline-b row-hover">
            <span className="grid h-10 w-10 place-items-center rounded-md bg-[var(--inset)] text-foreground/80">
              <Icon size={16} />
            </span>
            <div>
              <div className="text-[15px] font-medium tracking-[-0.005em]">{title}</div>
              <div className="mt-1 text-[13px] text-muted-foreground">{hint}</div>
            </div>
            <div className="flex items-center gap-2 font-mono text-[12.5px] text-muted-foreground transition-colors group-hover:text-foreground">
              {action}
              <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
          </a>
        ))}
      </div>
    </>
  );
}
