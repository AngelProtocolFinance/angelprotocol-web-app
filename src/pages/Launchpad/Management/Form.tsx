import { FormEventHandler } from "react";
import { Link } from "react-router-dom";
import { FV } from "./types";
import { Field } from "components/form";
import Toggle from "../common/Toggle";
import Members from "./Members";

type Props = { onSubmit: FormEventHandler<HTMLFormElement> };
export default function Form({ onSubmit }: Props) {
  return (
    <form onSubmit={onSubmit} className="w-full bg-white dark:bg-blue-d6">
      <h2 className="font-bold text-center sm:text-left text-xl mb-2">
        AIF Management
      </h2>
      <p className="text-center sm:text-left text-lg mb-8">
        The Management of your AIF comprises one or more members that will be in
        charge of taking key decisions for your AIF. Here, you can add members,
        decide how many signatories are necessary to execute decisions and how
        long decision requests are open for.
      </p>
      <Members />

      <div className="content-start border border-prim p-8 rounded">
        <h2 className="font-bold text-center sm:text-left text-xl mb-2">
          Proposal settings
        </h2>
        <Field<FV>
          name="threshold"
          label="Pass threshold ( % )"
          classes={{ container: "mt-8 mb-4" }}
          required
        />
        <Field<FV>
          name="duration"
          label="Duration ( hours )"
          classes={{ container: "mt-8 mb-6" }}
          required
        />
        <Toggle<FV>
          name="isAutoExecute"
          classes={{ container: "mb-4 text-sm" }}
        >
          Auto execute after passing vote
        </Toggle>
      </div>

      <div className="grid grid-cols-2 sm:flex gap-2 mt-8">
        <Link to={"../."} className="py-3 min-w-[8rem] btn-outline-filled">
          Back
        </Link>
        <button type="submit" className="py-3 min-w-[8rem] btn-orange">
          Continue
        </button>
      </div>
    </form>
  );
}
