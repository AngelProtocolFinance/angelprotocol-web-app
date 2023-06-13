import { ErrorMessage } from "@hookform/error-message";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Fees } from "types/ast";
import { DrawerIcon } from "components/Icon";
import { Cells } from "components/TableSection";
import Toggle from "../Toggle";
import { feeKeys } from "./constants";

type Props<T extends Fees> = {
  name: keyof T;
  title: string;
  isOpen: boolean;
  onToggle(name: keyof T): void;
};

export default function Fee<T extends Fees>({
  name,
  title,
  isOpen,
  onToggle,
}: Props<T>) {
  const {
    register,
    watch,
    setValue,
    clearErrors,
    setFocus,
    formState: { errors },
  } = useFormContext<T>();

  const _name = name as string;
  const isActiveName: any = `${_name}.${feeKeys.isActive}`;
  const rateName: any = `${_name}.${feeKeys.rate}`;
  const receiverName: any = `${_name}.${feeKeys.receiver}`;

  const isActive = watch(isActiveName);

  useEffect(() => {
    if (!isActive) {
      clearErrors([rateName, receiverName]);
      setValue(rateName, "" as any, { shouldValidate: false });
      setValue(receiverName, "" as any, { shouldValidate: false });
    } else {
      setFocus(receiverName);
    }

    //eslint-disable-next-line
  }, [isActive, name, setValue]);

  return (
    <Cells type="td" cellClass="py-4 px-4 border-r border-prim last:border-r-0">
      <td className="sm:hidden">
        <button
          type="button"
          onClick={() => onToggle(name)}
          className="w-full relative"
        >
          <DrawerIcon
            size={25.5}
            className={`${isOpen ? "text-orange" : ""} absolute-center`}
            isOpen={isOpen}
          />
        </button>
      </td>
      <td className="text-sm uppercase font-work w-full sm:w-40">
        <div className="h-full flex items-center sm:contents">{title}</div>
      </td>
      <td className="w-full sm:w-20 relative max-sm:border-r-0">
        <Toggle<T> name={isActiveName} />
      </td>

      <td
        className={`${
          isOpen ? "" : "hidden"
        } relative max-sm:col-span-full max-sm:w-full max-sm:border-r-0 max-sm:border-y`}
      >
        <p className="sm:hidden font-work font-bold text-xs mb-3 uppercase">
          Payout address
        </p>
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
      </td>

      <td
        className={`${
          isOpen ? "" : "hidden"
        } w-full sm:w-16 max-sm:row-start-3 max-sm:col-start-1 max-sm:col-span-full`}
      >
        <p className="sm:hidden font-work font-bold text-xs mb-3 uppercase">
          Rate
        </p>
        <div className="relative">
          <input
            {...register(rateName)}
            disabled={!isActive}
            className="w-full bg-transparent focus:outline-none text-sm font-work"
          />
          <ErrorMessage
            name={rateName}
            as="span"
            className="field-error text-left -bottom-3.5 w-max left-0"
            errors={errors}
          />
        </div>
      </td>
    </Cells>
  );
}
