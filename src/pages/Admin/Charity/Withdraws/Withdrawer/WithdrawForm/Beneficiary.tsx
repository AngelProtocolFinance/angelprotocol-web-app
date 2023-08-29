import { ErrorMessage } from "@hookform/error-message";
import { Path, useFormContext } from "react-hook-form";
import { FV } from "./types";
import { Radio } from "components/form";

const id = "__beneficiary";

export default function Beneficiary({ classes = "" }) {
  const {
    watch,
    register,
    getValues,
    formState: { errors },
  } = useFormContext<FV>();

  const endowmentType = getValues("endowType");
  const beneficiaryType = watch("beneficiaryType");
  const isBeneficiaryWallet = beneficiaryType === "wallet";
  const fieldName: Path<FV> = isBeneficiaryWallet
    ? "beneficiaryWallet"
    : "beneficiaryEndowmentId";

  return (
    <div className={`${classes} relative grid gap-3 w-full`}>
      <h5 className="font-bold font-work">Beneficiary</h5>
      {endowmentType === "ast" && (
        //only AST have option to send to wallet address
        <div className="flex flex-col justify-center gap-4 px-8 py-12">
          <Radio<FV, "beneficiaryType">
            classes="px-4 py-3 border border-prim rounded cursor-pointer"
            name="beneficiaryType"
            value="wallet"
          >
            Wallet address
          </Radio>
          <Radio<FV, "beneficiaryType">
            classes="px-4 py-3 border border-prim rounded cursor-pointer"
            name="beneficiaryType"
            value="endowment"
          >
            Endowment ID
          </Radio>
        </div>
      )}
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
