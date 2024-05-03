import CurrentStep from "./CurrentStep";
import type { Config } from "./types";

type Props = {
  className?: string;
  donaterConfig: Config | null;
};

export function Steps({ className = "", donaterConfig }: Props) {
  return (
    <div
      className={`grid ${className} w-full @container/steps overflow-clip bg-white min-h-96`}
    >
      <CurrentStep config={donaterConfig} />
    </div>
  );
}
