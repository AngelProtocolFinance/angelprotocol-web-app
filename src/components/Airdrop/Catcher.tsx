import toCurrency from "helpers/toCurrency";
import { FaParachuteBox } from "react-icons/fa";
import { Airdrops } from "services/aws/airdrop/types";
import useCatcher from "./useCatcher";

export type Props = { airdrops: Airdrops };
export default function Catcher(props: { airdrops: Airdrops }) {
  const { total_claimable, claim } = useCatcher(props.airdrops);
  return (
    <div className="bg-white flex flex-col items-center p-4 pt-0 shadow-lg min-h-115 w-full">
      <FaParachuteBox className="text-angel-blue text-4xl" />
      <h2 className="text-angel-blue text-2xl font-bold uppercase text-center mt-2">
        Airdrop
      </h2>
      <p className="text-angel-blue font-heading text-2xl mt-4">
        {toCurrency(total_claimable)} HALO
      </p>
      <div className="flex gap-2 mt-auto">
        <Action title="claim" onClick={() => claim(false)} />
        <Action title="stake" onClick={() => claim(true)} />
      </div>
    </div>
  );
}

function Action(props: { title: string; onClick: () => Promise<void> }) {
  return (
    <button
      onClick={props.onClick}
      className="bg-angel-orange text-white-grey hover:text-angel-white px-5 py-1 rounded-md uppercase font-heading text-xs font-bold"
    >
      {props.title}
    </button>
  );
}
