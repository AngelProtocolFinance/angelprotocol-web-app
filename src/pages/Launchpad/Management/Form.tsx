import { Link } from "react-router-dom";
import { Field } from "components/form";
import CW4Members from "./CW4Members";

export default function Form() {
  return (
    <form className="w-full bg-white dark:bg-blue-d6">
      <h2 className="font-bold text-center sm:text-left text-xl mb-2">
        AIF Management
      </h2>
      <p className="text-center sm:text-left text-lg mb-8">
        The Management of your AIF comprises one or more members that will be in
        charge of taking key decisions for your AIF. Here, you can add members,
        decide how many signatories are necessary to execute decisions and how
        long decision requests are open for.
      </p>
      <CW4Members />

      <h2 className="font-bold text-center sm:text-left text-xl mb-2">
        Settings
      </h2>

      <Field name="time.days" label="Days" required />
      <Field
        name="time.hours"
        label="Hours"
        classes={{ container: "mt-8 mb-4" }}
        required
      />

      <Field<any> name="percent" label="percent" required />

      <div className="grid grid-cols-2 sm:flex gap-2 mt-8">
        <Link to={"../"} className="py-3 min-w-[8rem] btn-outline-filled">
          Back
        </Link>
        <button type="submit" className="py-3 min-w-[8rem] btn-orange">
          Continue
        </button>
      </div>
    </form>
  );
}
