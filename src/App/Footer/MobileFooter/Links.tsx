import { LITEPAPER } from "constants/urls";

export default function Links() {
  return (
    <div className="flex flex-col items-center py-6 gap-3 w-full">
      <a
        href={LITEPAPER}
        className="font-normal text-sm"
        title="Litepaper"
        rel="noreferrer"
        target="_blank"
      >
        Download Litepaper
      </a>
    </div>
  );
}
