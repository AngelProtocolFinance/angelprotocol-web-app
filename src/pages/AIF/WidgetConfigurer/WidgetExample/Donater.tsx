import { placeholderChain } from "contexts/WalletContext/constants";
import { humanize } from "helpers";
import { FormValues } from "../WidgetUrlGenerator/schema";
import AdvancedOptions from "./AdvancedOptions";

type Props = FormValues;

export default function Donater({
  hideAdvancedOptions,
  liquidPercentage,
  unfoldAdvancedOptions,
}: Props) {
  const token = placeholderChain.tokens[0];

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
            <button
              type="button"
              className="text-right hover:text-blue text-xs flex"
            >
              BAL: {humanize(+token.balance, 3)} {token.symbol}
            </button>
          </div>
        </div>

        <div className="relative grid grid-cols-[1fr_auto] items-center gap-2 py-3 px-4 dark:bg-blue-d6 border border-prim rounded">
          <input
            disabled
            type="text"
            placeholder="0.0000"
            className="w-full text-sm bg-transparent focus:outline-none dark:text-gray dark:placeholder:text-gray-d1"
          />
          <div className="flex items-center gap-1 w-full dark:text-gray">
            <span className="text-sm">{token.symbol}</span>
          </div>
        </div>
        <p className="text-xs">
          Minimal amount: {token.symbol} {token.min_donation_amnt}
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
