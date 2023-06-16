import { FormHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import { FV } from "./types";
import Addresses from "components/Addresses";
import { Toggle } from "components/ast";
import { Field } from "components/form";

export default function Form(props: FormHTMLAttributes<HTMLFormElement>) {
  const { watch } = useFormContext<FV>();
  const willMature = watch("willMature");
  return (
    <form {...props} className="grid content-start">
      <h3 className="mb-2">Maturity</h3>

      <Toggle<FV>
        name="willMature"
        classes={{ label: "text-sm", container: "mb-6" }}
      >
        Set maturity
      </Toggle>
      {willMature ? (
        <>
          <Field<FV, "date">
            type="date"
            name="date"
            label="Maturity date"
            placeholder="DD/MM/YYYY"
            required
            classes={{ container: "mb-8", input: "date-input uppercase" }}
          />

          <Addresses<FV, "beneficiaries">
            memberName="beneficiary"
            name="beneficiaries"
            title="Beneficiaries"
            emptyMsg="Only the multisig wallet is allowed to withdraw funds"
            classes="mb-8 bg-white dark:bg-blue-d6"
          />
        </>
      ) : null}
    </form>
  );
}
