import { quotes } from "@/content";

// Renders a verbatim, sourced quotation in Ravinder's own words. Renders nothing until one exists.
export default function Quote({ id }: { id: string }) {
  const q = quotes[id];
  if (!q) return null;
  return (
    <figure className="pull-quote">
      <blockquote>{q.text}</blockquote>
      <figcaption>
        Ravinder Goel, {q.href ? <a href={q.href} target="_blank" rel="noopener noreferrer">{q.source}</a> : q.source}
      </figcaption>
    </figure>
  );
}
