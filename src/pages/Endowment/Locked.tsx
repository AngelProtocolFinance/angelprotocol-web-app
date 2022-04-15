import Icon from "components/Icons/Icons";
import toCurrency from "helpers/toCurrency";

type LockedBalance = {
  lockedBalance: number | undefined;
};

export default function Locked(props: LockedBalance) {
  return (
    <div className="flex flex-col bg-white/10 p-4 rounded-md shadow-md border border-white/10">
      <h3 className="text-lg font-bold uppercase flex items-center justify-end">
        <span>Endowment Account</span>
        <Icon
          type="Cog"
          size={16}
          className="ml-1 text-grey-accent"
          title="Coming Soon!"
        />
      </h3>
      <p className="text-3xl md:text-4xl font-heading my-8 sm:mb-0 mt-8 text-right">
        $ {toCurrency(props.lockedBalance)}
      </p>

      <table className="mt-auto w-full">
        <thead>
          <tr className="text-md text-left font-heading uppercase text-xs">
            <th className="pr-8">Strategy</th>
            <th className="text-right">Allocation</th>
          </tr>
        </thead>
        <tbody>
          <tr className="">
            <td className="pr-8">Anchor Protocol</td>
            <td className="font-heading text-right">100%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
