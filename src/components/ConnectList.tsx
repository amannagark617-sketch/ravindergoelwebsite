import { connect } from "@/content";

export default function ConnectList() {
  return (
    <div className="connect">
      {connect.map((grp) => (
        <section key={grp.group} className="connect-group">
          <h2>{grp.group}</h2>
          <ul>
            {grp.links.map((l) => (
              <li key={l.href}>
                <a className="connect-main" href={l.href} target="_blank" rel="noopener noreferrer">
                  <span className="connect-label">{l.label}</span>
                  <span className="connect-handle">{l.handle}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
