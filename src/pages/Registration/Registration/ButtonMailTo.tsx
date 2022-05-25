type Props = { mailTo: string; label: string };

export default function ButtonMailTo({ mailTo, label }: Props) {
  return (
    <a
      href={`mailto:${mailTo}?subject=${encodeURIComponent(
        "Charity Registration: Trouble with confirmation email"
      )}`}
      className="italic underline"
    >
      {label}
    </a>
  );
}
