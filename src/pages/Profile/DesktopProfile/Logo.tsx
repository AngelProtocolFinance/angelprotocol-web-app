import { useLocalContext } from "./LocalContext";

type Props = { className?: string };

export default function Logo({ className = "" }: Props) {
  const { profile } = useLocalContext();

  return (
    <div
      className={`box-border border border-gray-l2 h-44 w-44 rounded-full ${className}`}
    >
      Logo
    </div>
  );
}
