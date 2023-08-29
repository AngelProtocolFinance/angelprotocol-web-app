import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { FV } from "./types";

const id = "__beneficiary";

export default function Beneficiary({ classes = "" }) {
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext<FV>();

  const endowmentType = getValues("endowType");

  return (
    <div className={`${classes} relative grid gap-3 w-full`}>
      <h5 className="font-bold font-work">Beneficiary</h5>
      <input
        {...register("beneficiaryWallet")}
        id={id}
        type="text"
        autoComplete="off"
        className="flex justify-between items-center w-full p-4 border border-prim rounded bg-transparent @max-md:text-sm truncate focus:outline-none"
        placeholder="Input wallet address..."
      />
      <ErrorMessage
        errors={errors}
        name="beneficiaryWallet"
        as="span"
        className="text-right text-red dark:text-red-l2 text-xs -mt-2"
      />
    </div>
  );
}
