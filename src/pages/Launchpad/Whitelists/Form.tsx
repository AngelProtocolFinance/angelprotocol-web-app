import { Link } from "react-router-dom";
import Addresses from "./Addresses";
import useSubmit from "./useSubmit";

export default function Form() {
  const { submit } = useSubmit();
  return (
    <form onSubmit={submit} className="w-full bg-white dark:bg-blue-d6">
      <h2 className="font-bold text-center sm:text-left text-xl mb-2">
        Whitelists
      </h2>
      <p className="text-center sm:text-left text-lg mb-8">
        Here you can set who is able to deposit (contributors) or withdraw
        (beneficiaries) from your AIF. You will be able to make changes to those
        lists in the future.
      </p>
      <Addresses
        memberName="contributor"
        name="contributors"
        title="Contributors"
        emptyMsg="Anyone can contribute to your AIF."
      />
      <Addresses
        memberName="beneficiary"
        name="beneficiaries"
        title="Beneficiaries"
        emptyMsg="Multisig wallet will be the only beneficiary"
      />

      <div className="grid grid-cols-2 sm:flex gap-2 mt-8">
        <Link
          to={"../management"}
          className="py-3 min-w-[8rem] btn-outline-filled"
        >
          Back
        </Link>
        <button type="submit" className="py-3 min-w-[8rem] btn-orange">
          Continue
        </button>
      </div>
    </form>
  );
}
