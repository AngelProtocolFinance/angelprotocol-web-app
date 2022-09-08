import { Strategy } from "types/contracts";
import Icon from "components/Icon";
import { humanize, maskAddress, roundDown } from "helpers";

type Props = Strategy & {
  pct?: number;
  color?: string;
};

export default function Vault({ vault, pct, color }: Props) {
  return (
    <div className="flex flex-col w-48 text-zinc-700 bg-zinc-50 rounded-md p-3 aspect-square">
      {(pct && color && (
        <>
          <div className="flex items-center gap-2 justify-between mb-2">
            <div
              className={`${color} w-6 h-6 rounded-full border border-zinc-600/10`}
            />
            <span className="font-bold">{roundDown(pct, 2)}%</span>
          </div>
          <span className="font-mono text-sm mb-6 text-right">
            {maskAddress(vault)}
          </span>
        </>
      )) || (
        <div className="flex items-center gap-2">
          <Icon type="Safe" size={25} />
          <span className="font-mono text-sm">{maskAddress(vault)}</span>
        </div>
      )}

      <div className="mt-auto uppercase text-right">
        <span className="text-sm pr-2">TVL</span>
        <span className="font-heading text-lg">{humanize(2.345, 4)}</span>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-2">
        <button className="bg-sky-400 rounded-sm py-1 uppercase text-xs font-bold text-zinc-50">
          redeem
        </button>
        <button className="bg-emerald-400 rounded-sm py-1 uppercase text-xs font-bold text-zinc-50">
          invest
        </button>
      </div>
    </div>
  );
}
