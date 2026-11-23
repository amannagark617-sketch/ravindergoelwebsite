type Token = string | { n: number; prefix?: string; suffix?: string };

const fmt = (n: number) => n.toLocaleString("en-IN");

export default function CountLine({ tokens }: { tokens: Token[] }) {
  return (
    <section className="count">
      <p>
        {tokens.map((t, i) =>
          typeof t === "string" ? (
            <span key={i}>{t}</span>
          ) : (
            <span key={i} className="num">
              {(t.prefix ?? "") + fmt(t.n) + (t.suffix ?? "")}
            </span>
          )
        )}
      </p>
    </section>
  );
}
