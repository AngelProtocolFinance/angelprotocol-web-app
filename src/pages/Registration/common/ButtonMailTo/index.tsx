type Props = { label: string; mailTo: string; subject: string };

export function ButtonMailTo({ mailTo, label, subject }: Props) {
  return (
    <a
      href={`mailto:${mailTo}${
        subject ? `?subject=${encodeURIComponent(subject)}` : ""
      }`}
      className="italic underline"
    >
      {label}
    </a>
  );
}
