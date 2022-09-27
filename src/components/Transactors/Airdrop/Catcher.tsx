import { Airdrops } from "types/aws";
import Icon from "components/Icon";
import { humanize } from "helpers";
import useClaimAirdrop from "./useClaimAirdrop";

export default function Catcher(props: { airdrops: Airdrops }) {
  const { claimAirdrop, totalClaimable } = useClaimAirdrop(props.airdrops);
  return (
    <div className="bg-white flex flex-col rounded-md items-center p-4 pt-0 shadow-lg min-h-[15rem] w-full">
      <Icon type="Parachute" className="text-angel-blue text-4xl" />
      <h2 className="text-angel-blue text-2xl font-bold uppercase text-center mt-2">
        Airdrop
      </h2>
      <p className="text-angel-blue font-heading text-2xl mt-4 mb-6">
        {humanize(totalClaimable)} HALO
      </p>

      <Action onClick={claimAirdrop(true)} className="text-sm">
        Claim & Stake
      </Action>
      <Action
        onClick={claimAirdrop(false)}
        className="bg-angel-grey font-semibold tracking-wide text-xs"
      >
        Claim
      </Action>
    </div>
  );
}

function Action({
  className,
  ...restProps
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...restProps}
      className={`bg-angel-blue text-white hover:opacity-80 disabled:bg-grey-accent w-full py-2 rounded-md uppercase font-heading font-bold mb-2 ${className}`}
    />
  );
}
