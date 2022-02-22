import toCurrency from "helpers/toCurrency";
import { FaParachuteBox } from "react-icons/fa";
import { Airdrops } from "services/aws/airdrop/types";
import useClaimAirdrop from "./useClaimAirdrop";

export type Props = { airdrops: Airdrops };
export default function Catcher(props: Props) {
  const { claim, totalClaimable } = useClaimAirdrop(props.airdrops);
  return (
    <div className="bg-white flex flex-col rounded-md items-center p-4 pt-0 shadow-lg min-h-115 w-full">
      <FaParachuteBox className="text-angel-blue text-4xl" />
      <h2 className="text-angel-blue text-2xl font-bold uppercase text-center mt-2">
        Airdrop
      </h2>
      <p className="text-angel-blue font-heading text-2xl mt-4 mb-6">
        {toCurrency(totalClaimable)} HALO
      </p>

      <Action title="claim & stake" onClick={() => claim(true)} />
      <button
        title="claim"
        onClick={() => claim(false)}
        className="underline text-angel-grey cursor-pointer"
      >
        claim
      </button>
    </div>
  );
}

function Action(props: { title: string; onClick: () => void }) {
  return (
    <button
      onClick={props.onClick}
      className="bg-angel-orange text-white-grey hover:opacity-80 disabled:bg-grey-accent w-32 py-2 rounded-md uppercase font-heading text-sm font-bold mb-2"
    >
      {props.title}
    </button>
  );
}
