import Icon from "components/Icon";
import useAirdrop from "./useAirdrop";

export default function Airdrop() {
  const { airdrop_shown, showDetails } = useAirdrop();

  if (!airdrop_shown) {
    return null;
  }

  return (
    <button
      onClick={showDetails}
      className="px-3 border border-white/40 hover:bg-white/10 rounded-md"
    >
      <Icon type="Parachute" className="text-lg text-white" />
    </button>
  );
}
