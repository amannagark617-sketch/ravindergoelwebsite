import { writing } from "@/content";

export default function Writing() {
  return (
    <section className="writing" id="writing">
      <h2>{writing.heading}</h2>
      {writing.posts.length === 0 ? (
        <p className="empty">{writing.empty}</p>
      ) : (
        <ul className="post-list">
          {writing.posts.map((p) => (
            <li key={p.slug}>
              <a href={`/writing/${p.slug}`}>
                <h3>{p.title}</h3>
                <time>{p.date}</time>
                <p>{p.summary}</p>
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
