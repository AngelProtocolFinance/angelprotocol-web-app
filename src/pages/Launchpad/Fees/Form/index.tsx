import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import TableSection, { Cells } from "components/TableSection";
import Toggle from "../../common/Toggle";
import useSubmit from "./useSubmit";

export default function Fees() {
  const { submit, isSubmitting } = useSubmit();
  return (
    <form className="w-full bg-white dark:bg-blue-d6" onSubmit={submit}>
      <h2 className="font-bold text-center sm:text-left text-xl mb-2">Fees</h2>
      <p className="text-center sm:text-left text-lg mb-8">
        Fees of 0.5% on balances and 2% on withdrawals are automatically sent to
        the protocol's treasury. Here, you can set additional fees that will be
        distributed to the address of your choice
      </p>
      <table className="w-ful table-auto border border-zinc-50/30">
        <TableSection
          type="thead"
          rowClass="border-b divide-x border-zinc-50/30 divide-zinc-50/30"
        >
          <Cells type="th" cellClass="p-3 font-medium uppercase text-sm">
            <></>
            <>active</>
            <>payout address</>
            <>rate</>
          </Cells>
        </TableSection>
        <TableSection
          type="tbody"
          rowClass="divide-x border-b border-zinc-50/30 divide-zinc-50/30"
        >
          <Fee title="withdrawal fee" fieldName="withdrawal" />
          <Fee title="deposit fee" fieldName="deposit" />
          <Fee title="earnigs fee" fieldName="earnings" />
          {/* <Fee title="aum fee" fieldName="aum" /> */}
        </TableSection>
      </table>
      <button
        type="button"
        className="mt-4 justify-self-end"
        disabled={isSubmitting}
      >
        Save
      </button>
    </form>
  );
}

function Fee(props: { fieldName: string; title: string }) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<any>();

  const isActive = watch(`${props.fieldName}.isActive`);
  const isAddressError =
    (errors[props.fieldName] as any)?.payoutAddress !== undefined; // [1
  const isRateError = (errors[props.fieldName] as any)?.rate !== undefined;

  useEffect(() => {
    if (!isActive) {
      setValue(`${props.fieldName}.payoutAddress`, "");
      setValue(`${props.fieldName}.rate`, 1);
    }
  }, [isActive, props.fieldName, setValue]);

  return (
    <Cells type="td" cellClass={`p-3 ${!isActive ? "bg-zinc-400/10" : ""}`}>
      <p className="text-xs uppercase">{props.title}</p>
      <Toggle name={`${props.fieldName}.isActive`} />

      <input
        disabled={!isActive}
        placeholder="required"
        className={`w-96 bg-transparent font-mono text-sm ${
          isAddressError ? "text-rose-400" : "text-emerald-400"
        } placeholder:text-rose-400/50 focus:outline-none disabled:text-zinc-100/30 disabled:placeholder:text-transparent`}
        {...register(`${props.fieldName}.payoutAddress`)}
      />

      <input
        disabled={!isActive}
        type="number"
        className={`w-16 bg-transparent font-mono ${
          isRateError ? "text-rose-400" : "text-emerald-400"
        } focus:outline-none disabled:text-zinc-100/30 disabled:text-transparent`}
        {...register(`${props.fieldName}.rate`)}
      />
    </Cells>
  );
}
