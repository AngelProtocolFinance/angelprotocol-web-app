import { FormEventHandler } from "react";
import { FV } from "../types";
import NavButtons from "pages/Launchpad/common/NavButtons";
import { Field } from "components/form";
import Beneficiaries from "./Beneficiaries";

type Props = {
  onSubmit: FormEventHandler<HTMLFormElement>;
};

export default function Form({ onSubmit }: Props) {
  return (
    <form onSubmit={onSubmit} className="w-full bg-white dark:bg-blue-d6">
      <h2 className="font-bold text-center sm:text-left text-xl mb-2">
        Maturity
      </h2>
      <p className="text-center sm:text-left text-lg mb-8">
        You can set the maturity date of your AIF. Upon reaching maturity, all
        funds from both Liquid account and Locked account can be withdrawn by a
        list of addresses set in advance.
      </p>
      <Field<FV, "date">
        type="date"
        name="date"
        label="Maturity date"
        placeholder="DD/MM/YYYY"
        required
        classes={{ container: "mb-8", input: "date-input uppercase" }}
      />

      <Beneficiaries />
      <NavButtons curr={4} classes="mt-8" />
    </form>
  );
}
