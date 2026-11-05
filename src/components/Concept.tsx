"use client";

import { useState } from "react";

// A concept image for a value or belief. Until the picture file exists, a designed panel carries the idea.
export default function Concept({ slug, label, className = "" }: { slug: string; label: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <figure className={"concept " + className}>
      {failed ? (
        <div className="concept-fallback" aria-hidden="true">
          <span>{label}</span>
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={`/images/concepts/${slug}.jpg`} alt="" loading="lazy" onError={() => setFailed(true)} />
      )}
    </figure>
  );
}
