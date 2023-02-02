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
    <div className="flex flex-col gap-2 p-2 pt-8 items-center relative rounded font-heading border border-prim">
      <p className="uppercase">Vault</p>
      <span className="font-work text-sm">{maskAddress(address)}</span>

      <button
        disabled={isSelected || isPreselected}
        type="button"
        className={`absolute top-2 left-2 bg-sky-400 p-0.5 rounded-full ${
          isPreselected ? "disabled:bg-gray-l4" : "disabled:bg-green"
        }`}
        onClick={handleVaultSelect}
      >
        {/**   TODO: better way to determine if vault is selected */}
        <Icon type={isSelected || isPreselected ? "CheckCircle" : "Plus"} />
      </button>
    </div>
  );
}
