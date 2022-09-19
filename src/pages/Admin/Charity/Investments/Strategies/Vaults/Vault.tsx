import { VaultProps } from "./types";
import Icon from "components/Icon";
import { maskAddress } from "helpers";

export default function Vault({
  isPreselected,
  isSelected,
  handleVaultSelect,
  address,
}: VaultProps) {
  return (
    <div className="flex flex-col gap-2 p-2 pt-8 items-center relative text-zinc-700 rounded-md font-heading border border-zinc-600/30">
      <p className="uppercase">Vault</p>
      <span className="font-mono text-sm">{maskAddress(address)}</span>

      <button
        disabled={isSelected || isPreselected}
        type="button"
        className={`absolute top-2 left-2 bg-sky-400 p-0.5 rounded-full ${
          isPreselected ? "disabled:bg-zinc-400" : "disabled:bg-emerald-400"
        }`}
        onClick={handleVaultSelect}
      >
        {/**   TODO: better way to determine if vault is selected */}
        <Icon type={isSelected ? "CheckCircle" : "Plus"} />
      </button>
    </div>
  );
}
