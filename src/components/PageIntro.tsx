export default function PageIntro({ title, lede }: { title: string; lede?: string }) {
  return (
    <header className="page-intro">
      <h1>{title}</h1>
      {lede ? <p>{lede}</p> : null}
    </header>
  );
}
