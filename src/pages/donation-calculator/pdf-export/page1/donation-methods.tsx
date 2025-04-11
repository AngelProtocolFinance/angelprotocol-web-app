import { methods } from "../../types";

export function DonationMethods({
  activeMethods,
}: { activeMethods: string[] }) {
  return (
    <div className="flex gap-x-6 text-sm font-semibold">
      {Object.entries(methods).map(([id, name]) => (
        <div key={id} className="flex items-center gap-x-1">
          <input
            className="size-3 accent-blue"
            type="checkbox"
            checked={activeMethods.includes(id)}
            readOnly
          />
          <span className="text-nowrap">{name}</span>
        </div>
      ))}
    </div>
  );
}
