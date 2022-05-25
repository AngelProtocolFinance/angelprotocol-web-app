import { Link } from "react-router-dom";

type Props = { mailTo: string; label: string };

export default function ButtonMailTo({ mailTo, label }: Props) {
  return (
    <Link
      to="#"
      className="italic underline"
      onClick={(e) => {
        window.location.href = `mailto:${mailTo}?subject=${encodeURIComponent(
          "Charity Registration: Trouble with confirmation email"
        )}`;
        e.preventDefault();
      }}
    >
      {label}
    </Link>
  );
}
