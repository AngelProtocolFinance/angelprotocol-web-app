import NavButtons from "pages/Launchpad/common/NavButtons";
import { Field } from "components/form";
import Beneficiaries from "./Beneficiaries";

export default function Form({ classes = "" }: { classes?: string }) {
  return (
    <form className={`w-full bg-white dark:bg-blue-d6 ${classes}`}>
      <h2 className="font-bold text-center sm:text-left text-xl mb-2">
        Maturity
      </h2>
      <p className="text-center sm:text-left text-lg mb-8">
        You can set the maturity date of your AIF. Upon reaching maturity, all
        funds from both Liquid account and Locked account can be withdrawn by a
        list of addresses set in advance.
      </p>
      <Field
        type="date"
        name="maturity"
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
