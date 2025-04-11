import { methods } from "../../types";

export function DonationMethods({
  activeMethods,
}: { activeMethods: string[] }) {
  return (
    <div className="flex gap-x-6 text-sm font-semibold">
      {Object.entries(methods).map(([id, name]) => (
        <div key={id} className="flex items-center gap-x-1">
          <div
            className={`size-3 rounded-full ${activeMethods.includes(id) ? "bg-blue" : "border border-gray-l1"}`}
          />
          <span className="text-nowrap">{name}</span>
        </div>
      ))}
    </div>
  );
}
