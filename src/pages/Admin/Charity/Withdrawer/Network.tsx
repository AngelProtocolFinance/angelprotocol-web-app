import { useEffect } from "react";
import { UseFormRegisterReturn, useFormContext } from "react-hook-form";
import { WithdrawValues } from "./types";
import { chainIds } from "constants/chainIds";

export default function Network() {
  const { register, watch, trigger } = useFormContext<WithdrawValues>();
  const network = watch("network");

  useEffect(() => {
    (async () => {
      //validate address on network change
      await trigger("beneficiary");
    })();
  }, [network, trigger]);

  return (
    <div>
      <p className="uppercase font-bold text-angel-grey font-heading mb-2 text-sm">
        Select network
      </p>
      <div className="flex items-center gap-4">
        <Option reg={register("network")} label="juno" value={chainIds.juno} />
        <Option
          reg={register("network")}
          label="ethereum"
          value={chainIds.ethereum}
        />
        <Option
          reg={register("network")}
          label="binance"
          value={chainIds.binance}
        />
      </div>
    </div>
  );
}

function Option(props: {
  reg: UseFormRegisterReturn;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-1">
      <input {...props.reg} type="radio" value={props.value} id={props.value} />
      <label
        className="font-heading uppercase text-sm text-angel-grey"
        htmlFor={props.value}
      >
        {props.label}
      </label>
    </div>
  );
}
