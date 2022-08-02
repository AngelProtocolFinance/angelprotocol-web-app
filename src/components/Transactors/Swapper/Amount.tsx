import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { SwapValues } from "./types";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import { placeholderChain } from "contexts/WalletContext/constants";
import Icon from "components/Icon";
import { denoms } from "constants/currency";
import Balance from "./Balance";
import Slippage from "./Slippage";

export default function Amount() {
  const [settings_shown, show_settings] = useState(false);
  const {
    watch,
    register,
    formState: { errors },
  } = useFormContext<SwapValues>();
  const { wallet } = useGetWallet();
  const is_buy = watch("is_buy");

  function toggle_settings() {
    show_settings((p) => !p);
  }

  const displayToken =
    (is_buy
      ? wallet?.chain.native_currency
      : wallet?.chain.tokens.find((x) => x.token_id === denoms.halo)) ||
    placeholderChain.native_currency;

  return (
    <div className="grid mt-2">
      <div className="grid grid-cols-1a mb-1">
        {settings_shown && <Slippage />}
        <button
          onClick={toggle_settings}
          type="button"
          style={{ animationDuration: "4s" }}
          className={`${
            settings_shown ? "text-angel-blue animate-spin" : "text-angel-grey"
          }  ml-0.5 text-xl hover:text-angel-orange justify-self-end`}
        >
          <Icon type="Settings" />
        </button>
      </div>
      <div className="grid grid-cols-a1 text-angel-grey p-3 bg-light-grey shadow-inner-white-grey rounded-md">
        <p className="text-angel-grey uppercase text-md font-semibold font-heading ml-1">
          From:
        </p>
        <Balance token={displayToken} />
        <label
          htmlFor="amount"
          className="flex items-center justify-center text-angel-grey text-lg uppercase font-heading rounded-md"
        >
          <img
            className={`${
              is_buy ? "w-10 h-10" : "w-9 h-9"
            } mr-1 object-contain`}
            src={displayToken.logo}
            alt=""
          />
          <span className="block font-bold text-2xl">
            {displayToken.symbol}
          </span>
        </label>

        <input
          {...register("amount")}
          autoComplete="off"
          id="amount"
          type="text"
          placeholder="0"
          className="text-right p-2 text-angel-grey bg-light-grey text-2xl w-full focus:outline-none"
        />
      </div>
      <ErrorMessage
        errors={errors}
        name="amount"
        as="span"
        className="text-right text-red-400 text-xs font-semibold font-mono m-1"
      />
    </div>
  );
}
