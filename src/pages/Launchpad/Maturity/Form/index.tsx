import { Link } from "react-router-dom";
import { Field } from "components/form";
import Beneficiaries from "./Beneficiaries";
import useSubmit from "./useSubmit";

export default function Form({ classes = "" }: { classes?: string }) {
  const { submit } = useSubmit();
  return (
    <form
      className={`w-full bg-white dark:bg-blue-d6 ${classes}`}
      onSubmit={submit}
    >
      <h2 className="font-bold text-center sm:text-left text-xl mb-2">
        Maturity
      </h2>
      <p className="text-center sm:text-left text-lg mb-8">
        You can set the maturity date of your AIF. Upon reaching maturity, all
        funds from both Liquid account and Locked account can be withdrawn by a
        list of addresses set in advance.
      </p>
      <Field
        name="maturity"
        label="Maturity date"
        placeholder="DD/MM/YYYY"
        required
        classes={{ container: "mb-8" }}
      />

      <Beneficiaries />
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
