import { ErrorMessage } from "@hookform/error-message";
import { useEffect } from "react";
import { Path, useFormContext } from "react-hook-form";
import { FV, TPermissions as TPs } from "./types";
import { DrawerIcon } from "components/Icon";
import { Cells } from "components/TableSection";
import { CheckField } from "components/form";
import LockButton from "./LockButton";
import { keys } from "./constants";

type Props = {
  name: keyof TPs;
  title: string;
  isOpen: boolean;
  onToggle(name: keyof TPs): void;
};

export default function Permission({ name, title, isOpen, onToggle }: Props) {
  const {
    register,
    watch,
    setValue,
    clearErrors,
    setFocus,
    formState: { errors },
  } = useFormContext<TPs>();

  const isActiveName: Path<TPs> = `${name}.${keys.isActive}`;
  const addrName: Path<TPs> = `${name}.${keys.addr}`;
  const isActive = watch(isActiveName);

  useEffect(() => {
    if (!isActive) {
      clearErrors([addrName]);
      setValue(addrName, "", { shouldValidate: false });
    } else {
      setFocus(addrName);
    }

    //eslint-disable-next-line
  }, [isActive, name, setValue]);

  return (
    <Cells type="td" cellClass="py-4 px-4 border-r border-prim last:border-r-0">
      <td className="sm:hidden relative">
        <button
          type="button"
          onClick={() => onToggle(name)}
          className="w-full contents"
        >
          <DrawerIcon
            size={25.5}
            className={`${isOpen ? "text-orange" : ""} absolute-center`}
            isOpen={isOpen}
          />
        </button>
      </td>
      <td className="text-sm uppercase font-work w-full max-sm:col-start-2 max-sm:col-span-11">
        <div className="h-full flex items-center sm:contents">{title}</div>
      </td>
      <td
        className={`${
          isOpen ? "" : "hidden"
        } relative max-sm:col-span-6 max-sm:col-start-1 max-sm:border-r-0 max-sm:border-y`}
      >
        <p className="sm:hidden font-work font-bold text-xs mb-3 uppercase">
          Admin wallet
        </p>
        <CheckField<FV>
          name={`${name}.ownerControlled`}
          classes={{
            label: "uppercase text-xs font-bold",
            input: "checkbox-orange",
            error: "hidden",
          }}
          disabled={true}
        />
      </td>
      <td
        className={`${
          isOpen ? "" : "hidden"
        } relative max-sm:col-span-6 max-sm:col-start-7 max-sm:border-r-0 max-sm:border-y`}
      >
        <p className="sm:hidden font-work font-bold text-xs mb-3 uppercase">
          Delegate
        </p>
        <CheckField<FV>
          name={`${name}.${keys.isActive}`}
          classes={{
            label: "uppercase text-xs font-bold",
            input: "checkbox-orange",
            error: "hidden",
          }}
          disabled={true}
        />
      </td>
      <td
        className={`${
          isOpen ? "" : "hidden"
        } relative max-sm:col-span-full max-sm:w-full max-sm:border-r-0 max-sm:border-y`}
      >
        <p className="sm:hidden font-work font-bold text-xs mb-3 uppercase">
          Delegate address
        </p>
        <div className="relative">
          <input
            disabled={!isActive}
            className="field-input min-w-[9rem] w-full truncate py-1.5"
            {...register(addrName)}
            // ref={receiverRef}
          />
          <ErrorMessage
            name={addrName}
            as="span"
            className="field-error text-left -bottom-3.5 w-max left-0"
            errors={errors}
          />
        </div>
      </td>
      <td
        className={`${
          isOpen ? "" : "hidden"
        } relative max-sm:col-span-full max-sm:w-full max-sm:border-r-0 max-sm:border-y`}
      >
        <p className="sm:hidden font-work font-bold text-xs mb-3 uppercase">
          Actions
        </p>
        <LockButton disabled={true} name={name} />
      </td>
    </Cells>
  );
}
