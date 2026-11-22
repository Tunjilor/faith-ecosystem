// src/components/AiResultText.tsx
// Light Markdown rendering for AI tool results: "#" headings, **bold**,
// bullet and numbered lists. Moved from the devotional page so the prayer
// page renders the same way (it used to show raw "###" and "**").
import React from "react";

function inlineBold(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  if (parts.length === 1) return text;
  return parts.map((part, i) => {
    const m = part.match(/^\*\*([^*]+)\*\*$/);
    return m ? <strong key={i} className="font-semibold text-slate-900">{m[1]}</strong> : part;
  });
}

export function renderAiMarkdown(text: string): React.ReactNode[] {
  const lines = text.split("\n");
  const output: React.ReactNode[] = [];
  let key = 0;

  for (const raw of lines) {
    const line = raw.trimEnd();

    if (!line) {
      output.push(<div key={key++} className="h-2" />);
      continue;
    }

    // Markdown heading ("### Title")
    const hashMatch = line.match(/^#{1,6}\s+(.+)$/);
    if (hashMatch) {
      output.push(
        <p key={key++} className="mt-1 text-base font-semibold text-slate-900">
          {hashMatch[1].replace(/\*\*/g, "")}
        </p>
      );
      continue;
    }

    // Horizontal rule
    if (/^(-{3,}|\*{3,})$/.test(line.trim())) {
      output.push(<hr key={key++} className="my-2 border-slate-200" />);
      continue;
    }

    // Bullet point
    if (/^[-*]\s/.test(line)) {
      output.push(
        <div key={key++} className="flex gap-2 text-sm leading-6 text-slate-700">
          <span className="mt-0.5 text-slate-400">•</span>
          <span>{inlineBold(line.replace(/^[-*]\s/, ""))}</span>
        </div>
      );
      continue;
    }

    // Numbered list
    const numMatch = line.match(/^(\d+)\.\s(.+)/);
    if (numMatch) {
      output.push(
        <div key={key++} className="flex gap-2 text-sm leading-6 text-slate-700">
          <span className="w-4 shrink-0 font-semibold text-slate-500">{numMatch[1]}.</span>
          <span>{inlineBold(numMatch[2])}</span>
        </div>
      );
      continue;
    }

    // Whole-line bold (section heading like **Reflection:** or **Title**)
    const headingMatch = line.match(/^\*\*(.+?)\*\*:?\s*$/);
    if (headingMatch) {
      output.push(
        <p key={key++} className="mt-1 text-sm font-semibold text-slate-900">
          {headingMatch[1]}
        </p>
      );
      continue;
    }

    // Regular line (may contain inline bold)
    output.push(
      <p key={key++} className="text-sm leading-6 text-slate-700">
        {inlineBold(line)}
      </p>
    );
  }

  return output;
}

export default function AiResultText({ text, className = "" }: { text: string; className?: string }) {
  return <div className={`space-y-1 ${className}`}>{renderAiMarkdown(text)}</div>;
}
