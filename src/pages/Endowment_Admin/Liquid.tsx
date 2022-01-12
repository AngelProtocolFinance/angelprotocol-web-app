import { FaCog } from "react-icons/fa";
import toCurrency from "helpers/toCurrency";

type Props = { liquidBalance?: number; isOwner: boolean; opener: () => void };
export default function Liquid(props: Props) {
  return (
    <div className="flex flex-col bg-white bg-opacity-10 p-4 rounded-md shadow-md border border-opacity-10">
      <h3 className="text-lg font-bold uppercase flex items-center justify-end">
        <span>Current Account</span>
        <FaCog
          size={16}
          className="ml-1 text-grey-accent"
          title="Coming Soon!"
        />
      </h3>
      <p className="text-3xl md:text-4xl font-heading mt-8 text-right">
        $ {toCurrency(props.liquidBalance)}
      </p>
      {props.isOwner && (
        <button
          onClick={props.opener}
          className="my-2 bg-blue-accent hover:bg-angel-blue bg-opacity-60 px-2 py-1 rounded-md uppercase text-xs  border-2 border-opacity-20 font-heading self-end"
        >
          withdraw
        </button>
      )}
      <table className="mt-4 w-full">
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
