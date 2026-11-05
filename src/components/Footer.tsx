import { person } from "@/content";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="big">{person.name}</div>
      <a href={person.companySite} target="_blank" rel="noopener noreferrer">
        Visit Little Nap Recliners
      </a>
    </footer>
  );
}
