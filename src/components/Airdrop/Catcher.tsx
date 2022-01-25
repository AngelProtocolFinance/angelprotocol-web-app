import toCurrency from "helpers/toCurrency";
import { FaParachuteBox } from "react-icons/fa";
import { Airdrops } from "services/aws/airdrop/types";
import useCatcher from "./useCatcher";

export type Props = { airdrops: Airdrops };
export default function Catcher(props: { airdrops: Airdrops }) {
  const { total_claimable, claim, loading } = useCatcher(props.airdrops);
  return (
    <div className="bg-white flex flex-col items-center p-4 pt-0 shadow-lg min-h-115 w-full">
      <FaParachuteBox className="text-angel-blue text-4xl" />
      <h2 className="text-angel-blue text-2xl font-bold uppercase text-center mt-2">
        Airdrop
      </h2>
      <p className="text-angel-blue font-heading text-2xl mt-4 mb-6">
        {toCurrency(total_claimable)} HALO
      </p>

      <Action
        title="claim & stake"
        onClick={() => claim(true)}
        disabled={loading}
      />
      <span
        title="claim"
        onClick={() => claim(false)}
        data-disabled={loading}
        className="underline text-angel-grey disabled:text-gray-300 cursor-pointer"
      >
        claim
      </span>
    </div>
  );
}

function Action(props: {
  title: string;
  onClick: () => Promise<void>;
  disabled: boolean;
}) {
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      className="bg-angel-orange text-white-grey hover:opacity-80 disabled:bg-grey-accent w-32 py-2 rounded-md uppercase font-heading text-sm font-bold mb-2"
    >
      {props.title}
    </button>
  );
}
