import { FV } from "./types";
import { ReadOnlyAddresses } from "components/Addresses";
import { Tooltip } from "components/admin";
import { Field } from "components/form";

export default function ReadOnlyForm(p: FV & { tooltip: string }) {
  return (
    <div className="grid content-start gap-y-6 @lg:gap-y-8 @container">
      <h2 className="text-[2rem]">Maturity</h2>

      <Tooltip tooltip={p.tooltip} />

      {p.willMature ? (
        <>
          <Field<FV, "date">
            type="date"
            name="date"
            label="Maturity date"
            placeholder="DD/MM/YYYY"
            classes={{
              container:
                "rounded border border-prim p-4 @lg:p-8 bg-white dark:bg-blue-d6",
              input: "date-input uppercase mt-2 field-input-admin",
              label: "text-xl font-bold",
            }}
          />

          <ReadOnlyAddresses
            addresses={p.beneficiaries}
            memberName="beneficiary"
            title="Beneficiaries"
            emptyMsg="Multisig wallet is the only beneficiary"
            classes="bg-white dark:bg-blue-d6 p-4 @lg:p-8"
          />
        </>
      ) : (
        <p>
          Maturity is{" "}
          <span className="text-sm uppercase font-bold text-orange">
            not set
          </span>
        </p>
      )}
    </div>
  );
}
