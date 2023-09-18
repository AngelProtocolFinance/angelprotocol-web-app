import { ErrorMessage } from "@hookform/error-message";
import { useEffect } from "react";
import { Path, useFormContext } from "react-hook-form";
import { Fees } from "types/ast";
import { DrawerIcon } from "components/Icon";
import { Cells } from "components/TableSection";
import Toggle from "../Toggle";
import { feeKeys } from "./constants";

type Props = {
  name: keyof Fees;
  title: string;
  isOpen: boolean;
  onToggle(name: keyof Fees): void;
};

export default function Fee({ name, title, isOpen, onToggle }: Props) {
  const {
    register,
    watch,
    setValue,
    clearErrors,
    setFocus,
    formState: { errors },
  } = useFormContext<Fees>();

  const isActiveName: Path<Fees> = `${name}.${feeKeys.isActive}`;
  const rateName: Path<Fees> = `${name}.${feeKeys.rate}`;
  const receiverName: Path<Fees> = `${name}.${feeKeys.receiver}`;

  const isActive = watch(isActiveName);

  useEffect(() => {
    if (!isActive) {
      clearErrors([rateName, receiverName]);
      setValue(rateName, "", { shouldValidate: false });
      setValue(receiverName, "", { shouldValidate: false });
    } else {
      setFocus(receiverName);
    }

    //eslint-disable-next-line
  }, [isActive, name, setValue]);

  return (
    <Cells
      type="td"
      cellClass="py-4 px-4 border-r border-gray-l3 dark:border-bluegray last:border-r-0"
    >
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
        <Toggle<Fees> name={isActiveName} />
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
