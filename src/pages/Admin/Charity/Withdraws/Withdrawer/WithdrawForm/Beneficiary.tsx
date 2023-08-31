import { ErrorMessage } from "@hookform/error-message";
import { useEffect } from "react";
import { Path, useFormContext } from "react-hook-form";
import { FV } from "./types";
import { Radio } from "components/form";

const id = "__beneficiary";

export default function Beneficiary({ classes = "" }) {
  const {
    watch,
    register,
    trigger,
    formState: { errors },
  } = useFormContext<FV>();

  const beneficiaryType = watch("beneficiaryType");
  const isBeneficiaryWallet = beneficiaryType === "wallet";
  const fieldName: Path<FV> = isBeneficiaryWallet
    ? "beneficiaryWallet"
    : "beneficiaryEndowmentId";

  useEffect(() => {
    (async () => {
      if (beneficiaryType === "wallet") await trigger("beneficiaryWallet");
      else await trigger("beneficiaryEndowmentId");
    })();
  }, [beneficiaryType]);

  return (
    <div className={`${classes} relative grid gap-3 w-full`}>
      <h5 className="font-bold font-work">Beneficiary</h5>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <Radio<FV, "beneficiaryType">
          classes="px-3 py-2 border border-prim rounded cursor-pointer"
          name="beneficiaryType"
          value="wallet"
        >
          Wallet
        </Radio>
        <Radio<FV, "beneficiaryType">
          classes="px-2 py-1 border border-prim rounded cursor-pointer"
          name="beneficiaryType"
          value="endowment"
        >
          Endowment
        </Radio>
      </div>

      <input
        {...register(fieldName)}
        id={id}
        type={isBeneficiaryWallet ? "text" : "number"}
        autoComplete="off"
        className={`${
          //for endow id beneficiary, field type is number
          isBeneficiaryWallet ? "" : "text-field"
        } flex justify-between items-center w-full p-4 border border-prim rounded bg-transparent @max-md:text-sm truncate focus:outline-none`}
        placeholder={
          isBeneficiaryWallet ? "Input wallet address" : "Endowment ID:"
        }
      />
      <ErrorMessage
        errors={errors}
        name={fieldName}
        as="span"
        className="text-right text-red dark:text-red-l2 text-xs -mt-2"
      />
    </div>
  );
}
