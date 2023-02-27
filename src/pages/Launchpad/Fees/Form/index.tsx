import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";
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
      <table className="outline outline-1 outline-prim rounded w-full">
        <TableSection
          type="thead"
          rowClass="uppercase text-xs font-bold border-b border-prim divide-x divide-prim"
        >
          <Cells type="th" cellClass="px-4 py-3">
            <></>
            <>active</>
            <p className="text-left w-80">payout address</p>
            <>rate</>
          </Cells>
        </TableSection>
        <TableSection
          type="tbody"
          rowClass="border-b border-prim divide-x divide-prim last:border-0"
        >
          <Fee title="withdrawal fee" fieldName="withdrawal" />
          <Fee title="deposit fee" fieldName="deposit" />
          <Fee title="earnigs fee" fieldName="earnings" />
          {/* <Fee title="aum fee" fieldName="aum" /> */}
        </TableSection>
      </table>
      <div className="grid grid-cols-2 sm:flex gap-2 mt-8">
        <Link to={"../splits"} className="py-3 min-w-[8rem] btn-outline-filled">
          Back
        </Link>
        <button type="submit" className="py-3 min-w-[8rem] btn-orange">
          Continue
        </button>
      </div>
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
    <Cells type="td" cellClass="py-3 px-4">
      <p className="text-sm uppercase font-work">{props.title}</p>
      <Toggle name={`${props.fieldName}.isActive`} />

      <input
        disabled={!isActive}
        placeholder="required"
        className={`bg-transparent font-mono text-sm ${
          isAddressError ? "text-red" : "text-green"
        } placeholder:text-red/50 focus:outline-none disabled:text-white/30 disabled:placeholder:text-transparent`}
        {...register(`${props.fieldName}.payoutAddress`)}
      />

      <input
        disabled={!isActive}
        className={`w-6 bg-transparent font-mono ${
          isRateError ? "text-red" : "text-green"
        } focus:outline-none disabled:text-white/30`}
        {...register(`${props.fieldName}.rate`)}
      />
    </Cells>
  );
}
