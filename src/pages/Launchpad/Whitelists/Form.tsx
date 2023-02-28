import { FormEventHandler } from "react";
import { FV } from "./types";
import NavButtons from "../common/NavButtons";
import Addresses from "./Addresses";

type Props = {
  onSubmit: FormEventHandler<HTMLFormElement>;
};

export default function Form({ onSubmit }: Props) {
  return (
    <form onSubmit={onSubmit} className="w-full bg-white dark:bg-blue-d6">
      <h2 className="font-bold text-center sm:text-left text-xl mb-2">
        Whitelists
      </h2>
      <p className="text-center sm:text-left text-lg mb-8">
        Here you can set who is able to deposit (contributors) or withdraw
        (beneficiaries) from your AIF. You will be able to make changes to those
        lists in the future.
      </p>
      <Addresses<FV, "contributors">
        memberName="contributor"
        name="contributors"
        title="Contributors"
        emptyMsg="Anyone can contribute to your AIF."
      />
      <Addresses<FV, "beneficiaries">
        memberName="beneficiary"
        name="beneficiaries"
        title="Beneficiaries"
        emptyMsg="Multisig wallet will be the only beneficiary"
      />

      <NavButtons classes="mt-8" curr={3} />
    </form>
  );
}
