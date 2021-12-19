import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { currency_icons, currency_text, denoms } from "constants/currency";
import { ErrorMessage } from "@hookform/error-message";
import { Values } from "./types";
import Balance from "./Balance";
import { IoMdSettings } from "react-icons/io";
import Slippage from "./Slippage";

export default function Amount() {
  const [settings_shown, show_settings] = useState(false);
  const {
    watch,
    register,
    formState: { errors },
  } = useFormContext<Values>();

  function toggle_settings() {
    show_settings((p) => !p);
  }

  const is_buy = watch("is_buy");
  return (
    <div className="grid m-2">
      <div className="flex justify-between items-center">
        <button
          onClick={toggle_settings}
          type="button"
          style={{ animationDuration: "4s" }}
          className={`${
            settings_shown
              ? "text-angel-blue animate-spin ml-2"
              : "text-angel-grey"
          }  ml-1 text-xl hover:text-angel-orange`}
        >
          <IoMdSettings />
        </button>
        {settings_shown && <Slippage />}
        <Balance />
      </div>
      <div className="flex flex-row justify-between items-center mt-2 border-b-2 border-t-2 border-angel-blue border-opacity-20 text-angel-grey">
        <div className="flex flex-col">
          <p className="text-angel-grey uppercase text-md font-semibold font-heading m-2">
            From:
          </p>
          <label
            htmlFor="amount"
            className="flex items-center justify-center text-angel-grey text-lg uppercase font-heading mb-2 rounded-md"
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
        </div>
        <input
          {...register("amount")}
          autoComplete="off"
          id="amount"
          type="text"
          placeholder="0"
          className="text-right p-2 text-angel-grey text-2xl w-2/3 mt-8"
        />
      </div>
      <ErrorMessage
        errors={errors}
        name="amount"
        as="span"
        className="text-right text-red-400 text-sm mb-1 mt-0.5 mr-1"
      />
    </div>
  );
}
