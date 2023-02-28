import { useEffect } from "react";
import { Path, useFormContext } from "react-hook-form";
import { FV } from "./types";
import { TFees } from "slices/launchpad/types";
import { Cells } from "components/TableSection";
import Toggle from "../common/Toggle";
import { keys } from "./constants";

export default function Fee(props: { name: keyof TFees; title: string }) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<FV>();

  const isActiveName: Path<FV> = `${props.name}.${keys.isActive}`;
  const rateName: Path<FV> = `${props.name}.${keys.rate}`;
  const receiverName: Path<FV> = `${props.name}.${keys.receiver}`;

  const isActive = watch(isActiveName);

  const isAddressError = errors[props.name]?.receiver !== undefined; // [1
  const isRateError = errors[props.name]?.rate !== undefined;

  useEffect(() => {
    if (!isActive) {
      setValue(receiverName, "");
      setValue(rateName, "1");
    }
    //eslint-disable-next-line
  }, [isActive, props.name, setValue]);

  return (
    <Cells type="td" cellClass="py-3 px-4">
      <p className="text-sm uppercase font-work">{props.title}</p>
      <Toggle name={`${props.name}.isActive`} />

      <input
        disabled={!isActive}
        placeholder="required"
        className={`bg-transparent font-mono text-sm ${
          isAddressError ? "text-red" : "text-green"
        } placeholder:text-red/80 focus:outline-none disabled:text-white/30 disabled:placeholder:text-transparent`}
        {...register(receiverName)}
      />

      <input
        disabled={!isActive}
        className={`w-6 bg-transparent font-mono ${
          isRateError ? "text-red" : "text-green"
        } focus:outline-none disabled:text-white/30`}
        {...register(rateName)}
      />
    </Cells>
  );
}
