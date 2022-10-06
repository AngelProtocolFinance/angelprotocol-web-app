import { useFormContext } from "react-hook-form";
import { SwapValues } from "./types";
import haloLogo from "assets/icons/currencies/halo_outline.png";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import { denoms, symbols } from "constants/tokens";

export default function Output() {
  const { watch } = useFormContext<SwapValues>();
  const { wallet } = useGetWallet();
  const native_currency = wallet!.chain.native_currency; // wallet exists, otherwise wouldn't be able to donate

  const return_amount = watch("return_amount");
  const is_buy = watch("is_buy");

  return (
    <div className="grid grid-cols-[auto_1fr] bg-gray-l3 text-gray-d2 p-3 rounded-md shadow-inner-white mb-2">
      <p className="text-gray-d2 uppercase text-md font-semibold font-heading ml-1">
        To:
      </p>
      <div className="row-start-2 flex items-center justify-center text-gray-d2 text-lg uppercase font-heading rounded-md">
        <img
          className={`${is_buy ? "w-9 h-9" : "w-10 h-10"} mr-1 object-contain`}
          src={is_buy ? haloLogo : native_currency.logo}
          alt=""
        />
        <span className="block font-bold text-2xl">
          {is_buy ? symbols[denoms.halo] : native_currency.symbol}
        </span>
      </div>

      <div className="row-start-2 text-right p-2 text-gray-d2 text-2xl w-full">
        {return_amount}
      </div>
    </div>
  );
}
