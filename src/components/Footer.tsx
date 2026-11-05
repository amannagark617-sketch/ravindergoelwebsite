import Link from "next/link";
import { LINKEDIN, connect, nav, person } from "@/content";

const social = connect[1].links.filter((l) =>
  ["Instagram", "Facebook", "YouTube", "X"].includes(l.label)
);

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="big">{person.name}</div>
      <div className="footer-cols">
        <nav aria-label="Pages">
          {nav.map((n) => (
            <Link key={n.href} href={n.href}>
              {n.label}
            </Link>
          ))}
        </nav>
        <nav aria-label="Elsewhere">
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          {social.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
              Little Nap on {s.label}
            </a>
          ))}
          <a href={person.companySite} target="_blank" rel="noopener noreferrer">
            littlenap.in
          </a>
        </nav>
      </div>
    </footer>
  );
}
