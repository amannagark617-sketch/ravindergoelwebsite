import { person } from "@/content";

export default function Header() {
  return (
    <header className="site-header">
      <a className="mark" href="#top">
        {person.name}
      </a>
      <nav aria-label="Sections">
        <a href="#story">Story</a>
        <a href="#vision">Vision</a>
        <a href="#writing">Writing</a>
      </nav>
    </header>
  );
}
