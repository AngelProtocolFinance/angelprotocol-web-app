import Icon, { IconTypes } from "components/Icons/Icons";
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
        className="w-full px-3 h-full border border-opacity-40 hover:bg-white hover:bg-opacity-10 rounded-md"
      >
        <Icon iconType={IconTypes.Parachute} className="text-lg text-white" />
      </button>
    </div>
  );
}
