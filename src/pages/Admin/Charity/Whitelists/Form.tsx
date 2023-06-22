import { FormValues as FV } from "./types";
import Addresses from "components/Addresses";
import { Tooltip } from "components/admin";
import useEditWhitelists from "./useEditWhitelists";

export default function Form() {
  const { editWhitelists, reset, isSubmitting, tooltip } = useEditWhitelists();

  return (
    <form
      onSubmit={editWhitelists}
      onReset={(e) => {
        e.preventDefault();
        reset();
      }}
      className={`w-full mb-2`}
    >
      {tooltip && <Tooltip tooltip={tooltip} classes="mb-8" />}
      <fieldset className="contents group" disabled={!!tooltip}>
        <Addresses<FV, "contributors">
          memberName="contributor"
          name="contributors"
          title="Contributors"
          emptyMsg="Anyone can contribute to your AST."
          classes="mb-8 bg-white dark:bg-blue-d6 p-4 md:p-8"
        />
        <Addresses<FV, "beneficiaries">
          memberName="beneficiary"
          name="beneficiaries"
          title="Beneficiaries"
          emptyMsg="Only the multisig wallet is allowed to withdraw funds"
          classes="mb-8 bg-white dark:bg-blue-d6 p-4 md:p-8"
        />
        <div className="grid grid-cols-2 sm:flex gap-2 m-2 group-disabled:hidden">
          <button
            type="reset"
            disabled={isSubmitting}
            className="text-sm px-8 btn-outline-filled"
          >
            Reset Changes
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="text-sm px-8 btn-orange"
          >
            Submit Changes
          </button>
        </div>
      </fieldset>
    </form>
  );
}
