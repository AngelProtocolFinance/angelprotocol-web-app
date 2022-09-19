import { VaultProps } from "./types";
import Icon from "components/Icon";
import { maskAddress } from "helpers";

export default function Vault({ isSelected, onSelect, address }: VaultProps) {
  return (
    <div className="flex flex-col gap-2 p-2 items-center relative text-zinc-700 rounded-md aspect-square font-heading bg-zinc-50">
      <div className="flex items-center gap-2">
        <Icon type="Safe" size={36} />
        <span className="font-mono">{maskAddress(address)}</span>
      </div>

      <button
        disabled={isSelected}
        type="button"
        className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-sky-400 p-0.5 rounded-full disabled:bg-emerald-400"
        onClick={() => onSelect(address)}
      >
        {/**   TODO: better way to determine if vault is selected */}
        <Icon type={isSelected ? "CheckCircle" : "Plus"} />
      </button>
    </div>
  );
}
