import { State } from "../types";
import { placeholderChain } from "contexts/WalletContext/constants";
import { humanize } from "helpers";
import AdvancedOptions from "./AdvancedOptions";

const TOKEN = placeholderChain.tokens[0];

type Props = State;

export default function Donater({
  hideAdvancedOptions,
  liquidPercentage,
  unfoldAdvancedOptions,
}: Props) {
  return (
    <div className="grid rounded-md w-full">
      <div className="grid">
        <div className="flex max-sm:flex-col max-sm:items-start items-center mb-1">
          <label
            htmlFor="amount"
            className="text-lg font-bold mr-auto max-sm:mb-2"
          >
            Enter the donation amount:
          </label>
          <div className="flex items-center gap-2">
            <button type="button" className="text-right text-xs flex">
              BAL: {humanize(+TOKEN.balance, 3)} {TOKEN.symbol}
            </button>
          </div>
        </div>

        <div className="relative grid grid-cols-[1fr_auto] items-center gap-2 py-3 px-4 border border-gray-l2 rounded">
          <input
            disabled
            type="text"
            placeholder="0.0000"
            className="w-full text-sm bg-transparent focus:outline-none"
          />
          <div className="flex items-center gap-1 w-full">
            <span className="text-sm">{TOKEN.symbol}</span>
          </div>
        </div>
        <p className="text-xs">
          Minimal amount: {TOKEN.symbol} {TOKEN.min_donation_amnt}
        </p>
      </div>
      {!hideAdvancedOptions && (
        <AdvancedOptions
          liquidPercentage={liquidPercentage}
          unfold={unfoldAdvancedOptions}
        />
      )}

      <button
        type="button"
        className="btn-orange justify-self-center w-44 font-body mt-8"
      >
        Continue
      </button>
    </div>
  );
}
