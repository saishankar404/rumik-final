import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "../components/shell/primitives";

export const Route = createFileRoute("/_app/docs")({
  head: () => ({
    meta: [
      { title: "Docs — Rumik AI" },
      {
        name: "description",
        content: "The Rumik developer guide, inline in your workspace.",
      },
    ],
  }),
  component: Docs,
});

const TOC = [
  { label: "Overview", active: true },
  { label: "Authentication", active: false },
  { label: "Text to speech", active: false },
  { label: "Streaming", active: false },
  { label: "Tone tags", active: false },
  { label: "Rate limits", active: false },
  { label: "Errors", active: false },
  { label: "Webhooks", active: false },
];

function Docs() {
  return (
    <>
      <PageHeader
        eyebrow="docs.rumik.ai"
        title="Developer guide"
        subtitle="A short, opinionated reference for everything Rumik."
      />
      <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-14">
        <aside className="hidden lg:block sticky top-20 h-fit text-[12.5px]">
          <div className="mb-2 eyebrow-label">On this site</div>
          <ul className="space-y-1">
            {TOC.map((t) => (
              <li key={t.label}>
                <a
                  href="#"
                  aria-current={t.active ? "true" : undefined}
                  className={`block rounded px-2 py-1 ${t.active ? "bg-[var(--inset)] text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {t.label}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        <article className="max-w-[640px] text-[14.5px] leading-[1.75] text-foreground/85">
          <h2 className="mb-4 text-[22px] font-semibold tracking-[-0.015em] text-foreground">
            Overview
          </h2>
          <p>
            Rumik is a voice synthesis API for builders shipping live,
            expressive applications. Two production models ship today —{" "}
            <span className="font-mono text-foreground">silk muga 1</span> for
            tone-tagged Hinglish, and{" "}
            <span className="font-mono text-foreground">silk mulberry 1.5</span>{" "}
            for narration and agentic loops.
          </p>
          <p className="mt-5">
            Authentication is a single bearer token. Requests are billed per
            input character, never per minute, and credits never expire.
          </p>

          <h3 className="mt-10 mb-3 text-[15px] font-semibold tracking-[-0.005em] text-foreground">
            Quick start
          </h3>
          <pre
            role="region"
            aria-label="Code example"
            className="rounded-md bg-[var(--inset)] p-4 font-mono text-[12.5px] leading-relaxed text-foreground/85 overflow-x-auto"
          >{`curl https://api.rumik.ai/v1/tts \\
  -H "Authorization: Bearer rk_live_…" \\
  -d '{
    "model": "silk-muga-1",
    "text": "hello, welcome aboard."
  }'`}</pre>

          <h3 className="mt-10 mb-3 text-[15px] font-semibold tracking-[-0.005em] text-foreground">
            Tone tags
          </h3>
          <p>
            Inline tags like{" "}
            <span className="font-mono text-foreground">&lt;laugh&gt;</span> and
            <span className="font-mono text-foreground">
              {" "}
              &lt;sigh&gt;
            </span>{" "}
            shape delivery without separate API calls. See the full reference
            under <em>Tone tags</em>.
          </p>
        </article>
      </div>
    </>
  );
}
