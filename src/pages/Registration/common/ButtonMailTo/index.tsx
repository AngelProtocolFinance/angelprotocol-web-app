type Props = { label: string; mailTo: string; subject: string };

export function ButtonMailTo({ mailTo, label, subject }: Props) {
  return (
    <a
      href={`mailto:${mailTo}${
        subject ? `?subject=${encodeURIComponent(subject)}` : ""
      }`}
      className="underline text-xs text-orange"
    >
      {label}
    </a>
  );
}
