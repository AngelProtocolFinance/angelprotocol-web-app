import { RadioGroup } from "@headlessui/react";
import { ErrorMessage } from "@hookform/error-message";
import { Fragment, useEffect } from "react";
import { useController, useFormContext } from "react-hook-form";
import { FV } from "../types";
import { BeneficiaryType } from "types/lists";
import EndowmentSelector from "./EndowmentSelector";

const id = "__beneficiary";

const beneficiaryTypes: BeneficiaryType[] = ["wallet", "endowment"];

export default function Beneficiary({ classes = "" }) {
  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useFormContext<FV>();

  const {
    field: { value: beneficiaryType, onChange: onBeneficiaryTypeChange },
  } = useController<FV, "beneficiaryType">({
    name: "beneficiaryType",
  });

  const isDAF = getValues("endowType") === "daf";

  useEffect(() => {
    (async () => {
      if (beneficiaryType === "wallet") await trigger("beneficiaryWallet");
      else await trigger("beneficiaryEndowment");
    })();
  }, [beneficiaryType, trigger]);

  return (
    <div className={`${classes} relative grid gap-3 w-full @container`}>
      <h5 className="font-bold font-work">
        {/** DAFs can only send to endowments */}
        {isDAF ? "Beneficiary endowment" : "Beneficiary"}
      </h5>
      {!isDAF && (
        <RadioGroup
          value={beneficiaryType}
          onChange={onBeneficiaryTypeChange}
          className="grid grid-cols-2 @sm:flex -mb-3 @container"
        >
          {beneficiaryTypes.map((b) => (
            <RadioGroup.Option key={b} value={b} as={Fragment}>
              {({ checked }) => (
                <span
                  className={`${
                    checked ? "bg-blue/20" : "bg-blue/5"
                  } text-gray-d2 dark:text-white @sm:w-36 cursor-pointer px-2 py-1 text-center text-xs uppercase`}
                >
                  {b}
                </span>
              )}
            </RadioGroup.Option>
          ))}
        </RadioGroup>
      )}

      {beneficiaryType === "wallet" && (
        <>
          <input
            {...register("beneficiaryWallet")}
            id={id}
            type="text"
            autoComplete="off"
            className="flex justify-between items-center w-full p-4 border border-gray-l3 dark:border-bluegray rounded-b bg-transparent @max-md:text-sm truncate focus:outline-none"
            placeholder="Input wallet address"
          />
          <ErrorMessage
            errors={errors}
            name="beneficiaryWallet"
            as="span"
            className="text-right text-red dark:text-red-l2 text-xs -mt-2"
          />
        </>
      )}
      {beneficiaryType === "endowment" && <EndowmentSelector />}
    </div>
  );
}
