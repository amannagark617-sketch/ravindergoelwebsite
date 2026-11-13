// A concept image slot. The server page only renders it when the image file exists,
// except in the cinematic value wipes, where an ink panel carries the word instead.
export default function Concept({
  src,
  label,
  className = "",
}: {
  src: string | null;
  label: string;
  className?: string;
}) {
  if (!src) return null;
  return (
    <figure className={"concept " + className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={label} loading="lazy" />
    </figure>
  );
}
