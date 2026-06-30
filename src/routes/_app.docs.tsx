import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
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

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "authentication", label: "Authentication" },
  { id: "text-to-speech", label: "Text to speech" },
  { id: "streaming", label: "Streaming" },
  { id: "tone-tags", label: "Tone tags" },
  { id: "rate-limits", label: "Rate limits" },
  { id: "errors", label: "Errors" },
  { id: "webhooks", label: "Webhooks" },
];

function Docs() {
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 },
    );

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleTocClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="docs.rumik.ai"
        title="Developer guide"
        subtitle="A short, opinionated reference for everything Rumik."
      />
      <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-14">
        <aside className="hidden lg:block sticky top-20 h-fit text-[12.5px]">
          <div className="mb-2 eyebrow-label">On this page</div>
          <ul className="space-y-1">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={(e) => handleTocClick(e, s.id)}
                  aria-current={activeSection === s.id ? "true" : undefined}
                  className={`block rounded px-2 py-1 transition-colors duration-150 ${
                    activeSection === s.id
                      ? "bg-[var(--inset)] text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        <article className="max-w-[640px] text-[14.5px] leading-[1.75] text-foreground/85">
          {/* ── Overview ── */}
          <section id="overview" className="scroll-mt-20">
            <h2 className="mb-4 text-[22px] font-semibold tracking-[-0.015em] text-foreground">
              Overview
            </h2>
            <p>
              Rumik is a voice synthesis API for builders shipping live,
              expressive applications. Two production models ship today —{" "}
              <span className="font-mono text-foreground">silk muga 1</span> for
              tone-tagged Hinglish, and{" "}
              <span className="font-mono text-foreground">
                silk mulberry 1.5
              </span>{" "}
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
              aria-label="Quick start code example"
              className="rounded-md bg-[var(--inset)] p-4 font-mono text-[12.5px] leading-relaxed text-foreground/85 overflow-x-auto"
            >{`curl https://api.rumik.ai/v1/tts \\
  -H "Authorization: Bearer rk_live_…" \\
  -d '{
    "model": "silk-muga-1",
    "text": "hello, welcome aboard."
  }'`}</pre>
          </section>

          {/* ── Authentication ── */}
          <section id="authentication" className="scroll-mt-20 mt-14">
            <h2 className="mb-4 text-[22px] font-semibold tracking-[-0.015em] text-foreground">
              Authentication
            </h2>
            <p>
              Every request requires a bearer token in the{" "}
              <span className="font-mono text-foreground">Authorization</span>{" "}
              header. Generate keys from the API Keys page — you can create
              sandbox keys (prefixed{" "}
              <span className="font-mono text-foreground">rk_test_</span>) or
              production keys (prefixed{" "}
              <span className="font-mono text-foreground">rk_live_</span>).
            </p>

            <h3 className="mt-8 mb-3 text-[15px] font-semibold tracking-[-0.005em] text-foreground">
              Creating a key
            </h3>
            <pre
              role="region"
              aria-label="Authentication code example"
              className="rounded-md bg-[var(--inset)] p-4 font-mono text-[12.5px] leading-relaxed text-foreground/85 overflow-x-auto"
            >{`# Keys are created from the dashboard
# or via the CLI:
rumik keys create --name "production" --scope tts

# Use the key in every request:
curl https://api.rumik.ai/v1/tts \\
  -H "Authorization: Bearer rk_live_••••" \\
  -d '{ "model": "silk-muga-1", "text": "hi" }'`}</pre>

            <p className="mt-5">
              Keys can be scoped to specific endpoints ({" "}
              <span className="font-mono text-foreground">tts</span>,{" "}
              <span className="font-mono text-foreground">stt</span>, or{" "}
              <span className="font-mono text-foreground">admin</span>) and
              rate-limited per minute. Rotate a key anytime — old tokens are
              revoked immediately.
            </p>
          </section>

          {/* ── Text to speech ── */}
          <section id="text-to-speech" className="scroll-mt-20 mt-14">
            <h2 className="mb-4 text-[22px] font-semibold tracking-[-0.015em] text-foreground">
              Text to speech
            </h2>
            <p>
              The <span className="font-mono text-foreground">/v1/tts</span>{" "}
              endpoint accepts a model, text, and optional tuning parameters.
              Responses are returned as MP3 audio by default.
            </p>

            <h3 className="mt-8 mb-3 text-[15px] font-semibold tracking-[-0.005em] text-foreground">
              Parameters
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-[13px] border-collapse">
                <thead>
                  <tr className="border-b border-border/40 text-left">
                    <th className="py-2 pr-4 font-mono text-[11.5px] text-muted-foreground font-medium">
                      Parameter
                    </th>
                    <th className="py-2 pr-4 font-mono text-[11.5px] text-muted-foreground font-medium">
                      Type
                    </th>
                    <th className="py-2 font-mono text-[11.5px] text-muted-foreground font-medium">
                      Default
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20">
                  <tr>
                    <td className="py-2 pr-4 font-mono text-foreground">
                      model
                    </td>
                    <td className="py-2 pr-4 text-muted-foreground">string</td>
                    <td className="py-2 text-muted-foreground">silk-muga-1</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono text-foreground">
                      text
                    </td>
                    <td className="py-2 pr-4 text-muted-foreground">string</td>
                    <td className="py-2 text-muted-foreground">required</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono text-foreground">
                      temperature
                    </td>
                    <td className="py-2 pr-4 text-muted-foreground">
                      float 0–2
                    </td>
                    <td className="py-2 text-muted-foreground">0.7</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono text-foreground">
                      top_p
                    </td>
                    <td className="py-2 pr-4 text-muted-foreground">
                      float 0–1
                    </td>
                    <td className="py-2 text-muted-foreground">0.95</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono text-foreground">
                      format
                    </td>
                    <td className="py-2 pr-4 text-muted-foreground">
                      mp3 | wav
                    </td>
                    <td className="py-2 text-muted-foreground">mp3</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="mt-8 mb-3 text-[15px] font-semibold tracking-[-0.005em] text-foreground">
              Example
            </h3>
            <pre
              role="region"
              aria-label="TTS code example"
              className="rounded-md bg-[var(--inset)] p-4 font-mono text-[12.5px] leading-relaxed text-foreground/85 overflow-x-auto"
            >{`POST /v1/tts
Authorization: Bearer rk_live_••••
Content-Type: application/json

{
  "model": "silk-mulberry-1.5",
  "text": "The quick brown fox jumps over the lazy dog.",
  "temperature": 0.8,
  "top_p": 0.9
}

# Response: audio/mpeg (binary)
# Headers: X-Credits-Used: 44, X-Latency-Ms: 182`}</pre>
          </section>

          {/* ── Streaming ── */}
          <section id="streaming" className="scroll-mt-20 mt-14">
            <h2 className="mb-4 text-[22px] font-semibold tracking-[-0.015em] text-foreground">
              Streaming
            </h2>
            <p>
              For real-time applications, add{" "}
              <span className="font-mono text-foreground">"stream": true</span>{" "}
              to your request. The API returns chunked audio data as it's
              generated, letting you start playback before the full response
              completes.
            </p>
            <pre
              role="region"
              aria-label="Streaming code example"
              className="mt-5 rounded-md bg-[var(--inset)] p-4 font-mono text-[12.5px] leading-relaxed text-foreground/85 overflow-x-auto"
            >{`POST /v1/tts
{ "model": "silk-muga-1", "text": "...", "stream": true }

# Response: chunked transfer-encoding
# Each chunk is a 20ms audio frame
# First byte arrives in ~80ms for silk-muga-1`}</pre>
            <p className="mt-5">
              Streaming reduces time-to-first-audio by up to 60% compared to
              batch mode. Use it for conversational interfaces, live agents, and
              any UX where latency matters more than total throughput.
            </p>
          </section>

          {/* ── Tone tags ── */}
          <section id="tone-tags" className="scroll-mt-20 mt-14">
            <h2 className="mb-4 text-[22px] font-semibold tracking-[-0.015em] text-foreground">
              Tone tags
            </h2>
            <p>
              Inline tags like{" "}
              <span className="font-mono text-foreground">&lt;laugh&gt;</span>{" "}
              and{" "}
              <span className="font-mono text-foreground">&lt;sigh&gt;</span>{" "}
              shape delivery without separate API calls. Insert them directly in
              your text — the model interprets them as expressive cues.
            </p>

            <h3 className="mt-8 mb-3 text-[15px] font-semibold tracking-[-0.005em] text-foreground">
              Available tags
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-[13px] border-collapse">
                <thead>
                  <tr className="border-b border-border/40 text-left">
                    <th className="py-2 pr-4 font-mono text-[11.5px] text-muted-foreground font-medium">
                      Tag
                    </th>
                    <th className="py-2 font-mono text-[11.5px] text-muted-foreground font-medium">
                      Effect
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20">
                  <tr>
                    <td className="py-2 pr-4 font-mono text-foreground">
                      &lt;laugh&gt;
                    </td>
                    <td className="py-2 text-muted-foreground">
                      Light chuckle, loosens delivery
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono text-foreground">
                      &lt;sigh&gt;
                    </td>
                    <td className="py-2 text-muted-foreground">
                      Audible exhale, slows pace
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono text-foreground">
                      &lt;whisper&gt;
                    </td>
                    <td className="py-2 text-muted-foreground">
                      Drops to a whisper
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono text-foreground">
                      &lt;shout&gt;
                    </td>
                    <td className="py-2 text-muted-foreground">
                      Raises volume and intensity
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono text-foreground">
                      &lt;pause&gt;
                    </td>
                    <td className="py-2 text-muted-foreground">
                      Inserts a natural beat
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono text-foreground">
                      &lt;excited&gt;
                    </td>
                    <td className="py-2 text-muted-foreground">
                      Higher pitch, faster tempo
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono text-foreground">
                      &lt;calm&gt;
                    </td>
                    <td className="py-2 text-muted-foreground">
                      Lower pitch, steady rhythm
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <pre
              role="region"
              aria-label="Tone tags code example"
              className="mt-5 rounded-md bg-[var(--inset)] p-4 font-mono text-[12.5px] leading-relaxed text-foreground/85 overflow-x-auto"
            >{`{
  "text": "Hey <excited> I got the job! <pause> Start next Monday."
}

// The model reads the tags inline and adjusts
// delivery without needing a separate emotion param.`}</pre>
          </section>

          {/* ── Rate limits ── */}
          <section id="rate-limits" className="scroll-mt-20 mt-14">
            <h2 className="mb-4 text-[22px] font-semibold tracking-[-0.015em] text-foreground">
              Rate limits
            </h2>
            <p>
              Limits are per-key, measured in requests per minute (RPM) and
              characters per minute (CPM). Limits scale with your plan:
            </p>

            <div className="mt-5 overflow-x-auto">
              <table className="w-full text-[13px] border-collapse">
                <thead>
                  <tr className="border-b border-border/40 text-left">
                    <th className="py-2 pr-4 font-mono text-[11.5px] text-muted-foreground font-medium">
                      Tier
                    </th>
                    <th className="py-2 pr-4 font-mono text-[11.5px] text-muted-foreground font-medium">
                      RPM
                    </th>
                    <th className="py-2 pr-4 font-mono text-[11.5px] text-muted-foreground font-medium">
                      CPM
                    </th>
                    <th className="py-2 font-mono text-[11.5px] text-muted-foreground font-medium">
                      Concurrent
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20">
                  <tr>
                    <td className="py-2 pr-4 font-mono text-foreground">
                      Free
                    </td>
                    <td className="py-2 pr-4 text-muted-foreground">20</td>
                    <td className="py-2 pr-4 text-muted-foreground">5,000</td>
                    <td className="py-2 text-muted-foreground">2</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono text-foreground">Pro</td>
                    <td className="py-2 pr-4 text-muted-foreground">120</td>
                    <td className="py-2 pr-4 text-muted-foreground">50,000</td>
                    <td className="py-2 text-muted-foreground">10</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono text-foreground">
                      Scale
                    </td>
                    <td className="py-2 pr-4 text-muted-foreground">600</td>
                    <td className="py-2 pr-4 text-muted-foreground">250,000</td>
                    <td className="py-2 text-muted-foreground">50</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-5">
              Rate limit headers are returned on every response:{" "}
              <span className="font-mono text-foreground">
                X-RateLimit-Remaining
              </span>
              ,{" "}
              <span className="font-mono text-foreground">
                X-RateLimit-Reset
              </span>
              . When exceeded, the API returns{" "}
              <span className="font-mono text-foreground">
                429 Too Many Requests
              </span>{" "}
              with a{" "}
              <span className="font-mono text-foreground">Retry-After</span>{" "}
              header in seconds.
            </p>
          </section>

          {/* ── Errors ── */}
          <section id="errors" className="scroll-mt-20 mt-14">
            <h2 className="mb-4 text-[22px] font-semibold tracking-[-0.015em] text-foreground">
              Errors
            </h2>
            <p>
              All errors return a consistent JSON shape with a code, message,
              and optional{" "}
              <span className="font-mono text-foreground">detail</span> field
              for debugging.
            </p>

            <div className="mt-5 overflow-x-auto">
              <table className="w-full text-[13px] border-collapse">
                <thead>
                  <tr className="border-b border-border/40 text-left">
                    <th className="py-2 pr-4 font-mono text-[11.5px] text-muted-foreground font-medium">
                      Status
                    </th>
                    <th className="py-2 pr-4 font-mono text-[11.5px] text-muted-foreground font-medium">
                      Code
                    </th>
                    <th className="py-2 font-mono text-[11.5px] text-muted-foreground font-medium">
                      Meaning
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20">
                  <tr>
                    <td className="py-2 pr-4 font-mono text-foreground">400</td>
                    <td className="py-2 pr-4 font-mono text-foreground">
                      bad_request
                    </td>
                    <td className="py-2 text-muted-foreground">
                      Malformed JSON or missing required field
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono text-foreground">401</td>
                    <td className="py-2 pr-4 font-mono text-foreground">
                      unauthorized
                    </td>
                    <td className="py-2 text-muted-foreground">
                      Missing or invalid API key
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono text-foreground">402</td>
                    <td className="py-2 pr-4 font-mono text-foreground">
                      insufficient_credits
                    </td>
                    <td className="py-2 text-muted-foreground">
                      Not enough credits for this request
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono text-foreground">429</td>
                    <td className="py-2 pr-4 font-mono text-foreground">
                      rate_limited
                    </td>
                    <td className="py-2 text-muted-foreground">
                      RPM or CPM limit exceeded
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono text-foreground">500</td>
                    <td className="py-2 pr-4 font-mono text-foreground">
                      server_error
                    </td>
                    <td className="py-2 text-muted-foreground">
                      Internal failure — retry with backoff
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <pre
              role="region"
              aria-label="Error response example"
              className="mt-5 rounded-md bg-[var(--inset)] p-4 font-mono text-[12.5px] leading-relaxed text-foreground/85 overflow-x-auto"
            >{`{
  "error": {
    "code": "insufficient_credits",
    "message": "This request requires 120 credits. You have 42.",
    "detail": { "required": 120, "available": 42 }
  }
}`}</pre>
          </section>

          {/* ── Webhooks ── */}
          <section id="webhooks" className="scroll-mt-20 mt-14">
            <h2 className="mb-4 text-[22px] font-semibold tracking-[-0.015em] text-foreground">
              Webhooks
            </h2>
            <p>
              Register a webhook URL to receive real-time events when credits
              run low, keys are rotated, or long-running synthesis jobs
              complete. Webhooks are signed with HMAC-SHA256.
            </p>

            <h3 className="mt-8 mb-3 text-[15px] font-semibold tracking-[-0.005em] text-foreground">
              Events
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-[13px] border-collapse">
                <thead>
                  <tr className="border-b border-border/40 text-left">
                    <th className="py-2 pr-4 font-mono text-[11.5px] text-muted-foreground font-medium">
                      Event
                    </th>
                    <th className="py-2 font-mono text-[11.5px] text-muted-foreground font-medium">
                      Triggered when
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20">
                  <tr>
                    <td className="py-2 pr-4 font-mono text-foreground">
                      credits.low
                    </td>
                    <td className="py-2 text-muted-foreground">
                      Balance drops below 1,000 credits
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono text-foreground">
                      credits.depleted
                    </td>
                    <td className="py-2 text-muted-foreground">
                      Balance reaches zero
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono text-foreground">
                      key.rotated
                    </td>
                    <td className="py-2 text-muted-foreground">
                      An API key is rotated or revoked
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono text-foreground">
                      synthesis.completed
                    </td>
                    <td className="py-2 text-muted-foreground">
                      A long-running job finishes
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="mt-8 mb-3 text-[15px] font-semibold tracking-[-0.005em] text-foreground">
              Verifying signatures
            </h3>
            <pre
              role="region"
              aria-label="Webhook signature verification example"
              className="rounded-md bg-[var(--inset)] p-4 font-mono text-[12.5px] leading-relaxed text-foreground/85 overflow-x-auto"
            >{`import crypto from "crypto";

function verifyWebhook(rawBody: string, signature: string, secret: string) {
  const expected = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");
  return crypto.timingSafeEqual(
    Buffer.from(expected),
    Buffer.from(signature),
  );
}

// The Rumik-Signature header contains the HMAC.
// Always verify before processing the payload.`}</pre>
          </section>
        </article>
      </div>
    </>
  );
}
