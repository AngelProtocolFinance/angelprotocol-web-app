import Icon from "components/Icons/Icons";
import useAirdrop from "./useAirdrop";

export default function Airdrop() {
  const { airdrop_shown, showDetails } = useAirdrop();

  if (!airdrop_shown) {
    return null;
  }
  return (
    <div>
      <button
        onClick={showDetails}
        className="w-full px-3 h-full border border-white/40 hover:bg-white/10 rounded-md"
      >
        <Icon type="Parachute" className="text-lg text-white" />
      </button>
    </div>
  );
}
