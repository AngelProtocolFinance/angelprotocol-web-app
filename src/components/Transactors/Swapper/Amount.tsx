import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import Icon from "components/Icons/Icons";
import { currency_icons, denoms } from "constants/currency";
import Balance from "./Balance";
import Slippage from "./Slippage";
import { SwapValues } from "./types";

export default function Amount() {
  const [settings_shown, show_settings] = useState(false);
  const {
    watch,
    register,
    formState: { errors },
  } = useFormContext<SwapValues>();

  function toggle_settings() {
    show_settings((p) => !p);
  }

  const is_buy = watch("is_buy");
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
        <Balance />
        <label
          htmlFor="amount"
          className="flex items-center justify-center text-angel-grey text-lg uppercase font-heading rounded-md"
        >
          <img
            className={`${
              is_buy ? "w-10 h-10" : "w-9 h-9"
            } mr-1 object-contain`}
            src={currency_icons[is_buy ? denoms.uusd : denoms.uhalo]}
            alt=""
          />
          <span className="block font-bold text-2xl">
            {is_buy ? "UST" : "HALO"}
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
        className="text-right text-red-400 text-sm mb-1 mt-1 mr-1"
      />
    </div>
  );
}
