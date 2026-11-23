type Props = { label: string; text: string; size?: "xl" | "md" };

export default function Vision({ label, text, size = "xl" }: Props) {
  return (
    <section className={"vision vision-" + size}>
      <div className="label">{label}</div>
      <p>{text}</p>
    </section>
  );
}
