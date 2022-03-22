import toCurrency from "helpers/toCurrency";
import { Airdrops } from "services/aws/airdrop/types";
import useClaimAirdrop from "./useClaimAirdrop";
import Icon, { IconTypes } from "components/Icons/Icons";

export type Props = { airdrops: Airdrops };
export default function Catcher(props: Props) {
  const { claimAirdrop, totalClaimable } = useClaimAirdrop(props.airdrops);
  return (
    <div className="bg-white-grey flex flex-col rounded-md items-center p-4 pt-0 shadow-lg min-h-115 w-full">
      <Icon
        iconType={IconTypes.Parachute}
        className="text-angel-blue text-4xl"
      />
      <h2 className="text-angel-blue text-2xl font-bold uppercase text-center mt-2">
        Airdrop
      </h2>
      <p className="text-angel-blue font-heading text-2xl mt-4 mb-6">
        {toCurrency(totalClaimable)} HALO
      </p>

      <Action
        title="claim & stake"
        onClick={claimAirdrop(true)}
        className="text-sm"
      />
      <Action
        title="claim"
        onClick={claimAirdrop(false)}
        className="bg-angel-grey font-semibold tracking-wide text-xs"
      />
    </div>
  );
}

function Action(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      onClick={props.onClick}
      className={`bg-angel-blue text-white-grey hover:opacity-80 disabled:bg-grey-accent w-full py-2 rounded-md uppercase font-heading font-bold mb-2 ${props.className}`}
    >
      {props.title}
    </button>
  );
}
