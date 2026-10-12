"use client";

import React, { useEffect, useRef, useState } from "react";

const SUPPORT_EMAIL = "support@faithcompanionai.com";

type Field = "name" | "email" | "subject" | "message";
type Status = "idle" | "sending" | "sent" | "error";

const MAX: Record<Field, number> = { name: 100, email: 254, subject: 150, message: 5000 };

const inputClass =
  "mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-white/25";

export default function ContactClient() {
  const [values, setValues] = useState<Record<Field, string>>({ name: "", email: "", subject: "", message: "" });
  const [fcHp, setFcHp] = useState(""); // honeypot — real visitors never see or fill this
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<Field, string>>>({});
  const [sentTo, setSentTo] = useState("");
  const startedAt = useRef<number>(0);
  const sentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  // The form (and its focused button) is replaced on success — move keyboard and
  // screen-reader focus to the confirmation instead of letting it fall back to the page.
  useEffect(() => {
    if (status === "sent") sentRef.current?.focus();
  }, [status]);

  function update(field: Field, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    if (fieldErrors[field]) setFieldErrors((f) => ({ ...f, [field]: undefined }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    setFieldErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, fc_hp: fcHp, elapsedMs: Date.now() - startedAt.current }),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean; error?: string; fields?: Partial<Record<Field, string>> }
        | null;

      if (res.ok && data?.ok) {
        setSentTo(values.email.trim());
        setValues({ name: "", email: "", subject: "", message: "" });
        setStatus("sent");
        return;
      }

      setFieldErrors(data?.fields ?? {});
      setError(data?.error || "We couldn't send your message right now.");
      setStatus("error");
    } catch {
      setError("We couldn't reach the server. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div
        ref={sentRef}
        tabIndex={-1}
        role="status"
        className="rounded-[22px] border border-emerald-400/30 bg-emerald-400/10 p-5 outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/60"
      >
        <div className="text-base font-semibold text-white">Thank you — your message has been sent.</div>
        <p className="mt-2 text-sm leading-7 text-white/75">
          We&rsquo;ll reply to <span className="font-semibold text-white">{sentTo}</span> as soon as we can.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-semibold text-orange-300 hover:text-orange-200"
        >
          Send another message
        </button>
      </div>
    );
  }

  const fieldError = (field: Field) =>
    fieldErrors[field] ? (
      <p id={`contact-${field}-error`} className="mt-1 text-xs text-red-300">
        {fieldErrors[field]}
      </p>
    ) : null;

  const describedBy = (field: Field) => (fieldErrors[field] ? `contact-${field}-error` : undefined);

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {status === "error" && error ? (
        <div role="alert" className="rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-sm leading-6 text-white/85">
          {error}{" "}
          You can also email us at{" "}
          <a
            href={`mailto:${SUPPORT_EMAIL}?subject=Faith%20Companion%20AI%20Support`}
            className="font-semibold text-white underline underline-offset-4 hover:text-orange-300"
          >
            {SUPPORT_EMAIL}
          </a>
          .
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="text-sm font-semibold text-white/80">Name</label>
          <input
            id="contact-name"
            name="name"
            className={inputClass}
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Your name"
            autoComplete="name"
            maxLength={MAX.name}
            required
            aria-invalid={!!fieldErrors.name}
            aria-describedby={describedBy("name")}
          />
          {fieldError("name")}
        </div>

        <div>
          <label htmlFor="contact-email" className="text-sm font-semibold text-white/80">Email</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            className={inputClass}
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            maxLength={MAX.email}
            required
            aria-invalid={!!fieldErrors.email}
            aria-describedby={describedBy("email")}
          />
          {fieldError("email")}
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className="text-sm font-semibold text-white/80">Subject</label>
        <input
          id="contact-subject"
          name="subject"
          className={inputClass}
          value={values.subject}
          onChange={(e) => update("subject", e.target.value)}
          placeholder="What is this about?"
          minLength={3}
          maxLength={MAX.subject}
          required
          aria-invalid={!!fieldErrors.subject}
          aria-describedby={describedBy("subject")}
        />
        {fieldError("subject")}
      </div>

      <div>
        <label htmlFor="contact-message" className="text-sm font-semibold text-white/80">Message</label>
        <textarea
          id="contact-message"
          name="message"
          className={`${inputClass} min-h-[160px]`}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="How can we help?"
          minLength={10}
          maxLength={MAX.message}
          required
          aria-invalid={!!fieldErrors.message}
          aria-describedby={describedBy("message")}
        />
        <div className="mt-1 flex justify-between gap-3">
          {fieldError("message") ?? <span />}
          <span className="text-xs text-white/40">
            {values.message.length}/{MAX.message}
          </span>
        </div>
      </div>

      {/* Honeypot: hidden from people and assistive tech; bots that fill every field are ignored. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
        <label htmlFor="contact-fc-hp">Leave this field empty</label>
        <input
          id="contact-fc-hp"
          name="fc_hp"
          tabIndex={-1}
          autoComplete="off"
          value={fcHp}
          onChange={(e) => setFcHp(e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95 disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
