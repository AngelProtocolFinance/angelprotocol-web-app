import { ErrorMessage } from "@hookform/error-message";
import { useEffect } from "react";
import { Path, useFormContext } from "react-hook-form";
import { FV } from "./types";
import { TFees } from "slices/launchpad/types";
import { Cells } from "components/TableSection";
import Toggle from "../common/Toggle";
import { keys } from "./constants";

type Props = { name: keyof TFees; title: string };

export default function Fee({ name, title }: Props) {
  const {
    register,
    watch,
    setValue,
    clearErrors,
    setFocus,
    formState: { errors },
  } = useFormContext<FV>();

  const isActiveName: Path<FV> = `${name}.${keys.isActive}`;
  const rateName: Path<FV> = `${name}.${keys.rate}`;
  const receiverName: Path<FV> = `${name}.${keys.receiver}`;

  const isActive = watch(isActiveName);

  useEffect(() => {
    if (!isActive) {
      clearErrors([rateName, receiverName]);
      setValue(rateName, "1", { shouldValidate: false });
      setValue(receiverName, "", { shouldValidate: false });
    } else {
      setFocus(receiverName);
    }

    //eslint-disable-next-line
  }, [isActive, name, setValue]);

  return (
    <Cells type="td" cellClass="py-4 px-4">
      <p className="text-sm uppercase font-work">{title}</p>
      <Toggle<FV> name={isActiveName} />

      <div className="relative">
        <input
          disabled={!isActive}
          className="w-full bg-transparent focus:outline-none text-sm"
          {...register(receiverName)}
          // ref={receiverRef}
        />
        <ErrorMessage
          name={receiverName}
          as="span"
          className="field-error text-left -bottom-3.5 w-max left-0"
          errors={errors}
        />
      </div>

      <div className="relative">
        <input
          {...register(rateName)}
          disabled={!isActive}
          className="w-full bg-transparent focus:outline-none text-sm"
        />
        <ErrorMessage
          name={rateName}
          as="span"
          className="field-error text-left -bottom-3.5 w-max left-0"
          errors={errors}
        />
      </div>
    </Cells>
  );
}
