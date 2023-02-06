import Icon from "components/Icon";
import { maskAddress } from "helpers";

type VaultProps = {
  address: string;
  isSelected: boolean;
  onSelect(addr: string): void;
};
export default function Vault({ isSelected, onSelect, address }: VaultProps) {
  return (
    <div className="p-6 rounded border border-prim flex items-center bg-orange-l6 dark:bg-blue-d7">
      <p className="font-work">{maskAddress(address)}</p>
      <button
        disabled={isSelected}
        type="button"
        className="ml-auto disabled:text-gray text-green"
        onClick={() => onSelect(address)}
      >
        <Icon type={isSelected ? "CheckCircle" : "Plus"} size={20} />
      </button>
    </div>
  );
}
