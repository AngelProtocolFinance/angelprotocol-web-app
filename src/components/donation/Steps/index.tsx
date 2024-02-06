import { DonaterConfigFromWidget } from "types/widget";
import CurrentStep from "./CurrentStep";

type Props = {
  className?: string;
  donaterConfig: DonaterConfigFromWidget | null;
};

export function Steps({ className = "", donaterConfig }: Props) {
  return (
    <div
      className={`grid ${className} w-full @container rounded overflow-clip bg-white min-h-96`}
    >
      <CurrentStep config={donaterConfig} />
    </div>
  );
}
