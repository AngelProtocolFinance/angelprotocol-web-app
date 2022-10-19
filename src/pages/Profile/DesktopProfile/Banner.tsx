import { useLocalContext } from "./LocalContext";

type Props = { className?: string };

export default function Banner({ className = "" }: Props) {
  const { profile } = useLocalContext();
  return (
    <div className={`relative w-full ${className}`}>
      <img
        src={profile.image}
        alt=""
        className="absolute h-full w-full object-cover object-right opacity-10"
      />
      <div className="absolute -z-10 bg-blue dark:bg-blue-d4 h-full w-full" />
    </div>
  );
}
