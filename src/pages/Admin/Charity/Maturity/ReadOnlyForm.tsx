import { FV } from "./types";
import { ReadOnlyAddresses } from "components/Addresses";
import { KeyValue as KV, Tooltip } from "components/admin";

export default function ReadOnlyForm(p: FV & { tooltip: string }) {
  return (
    <div className="grid content-start gap-y-6 @lg:gap-y-8 @container">
      <h2 className="text-[2rem]">Maturity</h2>

      <Tooltip tooltip={p.tooltip} />

      {p.willMature ? (
        <>
          <KV name="Maturity date" value={p.date} />
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
