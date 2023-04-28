import { FV } from "./types";
import Addresses from "./Addresses";

export default function WhitelistsForm(props: any) {
  return (
    <form {...props} className={`w-full mb-2`}>
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
        <button type="reset" className="text-sm px-8 btn-outline-filled">
          Cancel
        </button>
        <button type="submit" className="text-sm px-8 btn-orange">
          Submit Changes
        </button>
      </div>
    </form>
  );
}
