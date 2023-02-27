import { Link } from "react-router-dom";
import { Toggle } from "../../common/Toggle";
import { MinmaxSlider } from "./MinmaxSlider";
import useSubmit from "./useSubmit";

export default function Form({ classes = "" }: { classes?: string }) {
  const { submit, isSubmitting } = useSubmit();
  return (
    <form
      className={`w-full bg-white dark:bg-blue-d6 ${classes}`}
      onSubmit={submit}
    >
      <h2 className="font-bold text-center sm:text-left text-xl mb-2">
        Split of Contributions
      </h2>
      <p className="text-center sm:text-left text-lg text-gray-d1 dark:text-gray">
        You can set the distribution of the contributions to your AIF. By
        default, contributors are able to set how their contribution is split
        between your Locked account and your Liquid account. You can deactivate
        that to default to a value that you set or set minimum & maximum values.
      </p>
      <Toggle name="isSplitCustom" classes={{ container: "my-9 text-sm" }}>
        Allow contributors to define a Locked/Liquid Split
      </Toggle>

      <div className="mb-8 grid content-start border border-prim p-8 rounded">
        <h3 className="text-xl font-bold mb-8">Default Values</h3>
        <div className="flex justify-between text-sm">
          <span>To locked</span>
          <span>To liquid</span>
        </div>
        <MinmaxSlider
          names={{ min: "defaultMin", max: "defaultMax" }}
          hidden="max"
          hideLabels
        >
          {(min, max) => (
            <div className="flex justify-between text-sm">
              <span className="py-2 px-3 border border-prim rounded">
                {max}%
              </span>
              <span className="py-2 px-3 border border-prim rounded">
                {100 - max}%
              </span>
            </div>
          )}
        </MinmaxSlider>
      </div>
      <div className="mb-8 grid content-start border border-prim p-8 rounded">
        <h3 className="text-xl font-bold mb-8">Minimums and Maximums</h3>
        <div className="flex justify-between text-sm">
          <span>To locked</span>
          <span>To liquid</span>
        </div>
        <MinmaxSlider names={{ min: "min", max: "max" }}>
          {(min, max) => (
            <p className="mt-16">
              Contributors can decide to allocate{" "}
              <span className="font-bold">{min}% </span> to{" "}
              <span className="font-bold">{max}%</span> to the Locked Account
            </p>
          )}
        </MinmaxSlider>
      </div>

      <div className="grid grid-cols-2 sm:flex gap-2 mt-8">
        <Link
          to={"../maturity"}
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
