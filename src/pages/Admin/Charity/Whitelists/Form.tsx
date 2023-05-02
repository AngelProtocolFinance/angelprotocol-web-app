import { FV } from "./types";
import Addresses from "./Addresses";
import useEditWhitelists from "./useEditWhitelists";

export default function WhitelistsForm() {
  const { editWhitelists, reset, isSubmitting } = useEditWhitelists();

  return (
    <form
      onSubmit={editWhitelists}
      onReset={(e) => {
        e.preventDefault();
        reset();
      }}
      className={`w-full mb-2`}
    >
      <Addresses<FV, "contributors">
        memberName="contributor"
        name="contributors"
        title="Contributors"
        emptyMsg="Anyone can contribute to your AST."
        classes="mb-8 bg-white dark:bg-blue-d6"
      />
      <Addresses<FV, "beneficiaries">
        memberName="beneficiary"
        name="beneficiaries"
        title="Beneficiaries"
        emptyMsg="Only the multisig wallet is allowed to withdraw funds"
        classes="mb-8 bg-white dark:bg-blue-d6"
      />
      <div className={`grid grid-cols-2 sm:flex gap-2 m-2`}>
        <button
          type="reset"
          disabled={isSubmitting}
          className="text-sm px-8 btn-outline-filled"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="text-sm px-8 btn-orange"
        >
          Submit Changes
        </button>
      </div>
    </form>
  );
}
