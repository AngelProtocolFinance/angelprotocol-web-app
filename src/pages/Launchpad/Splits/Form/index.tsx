import { useFormContext } from "react-hook-form";
import { FV } from "../types";
import NavButtons from "../../common/NavButtons";
import Toggle from "../../common/Toggle";
import { MinmaxSlider } from "./MinmaxSlider";

type Props = {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
};

export default function Form({ onSubmit }: Props) {
  const { watch } = useFormContext<FV>();
  const isCustom = watch("isCustom");

  return (
    <form onSubmit={onSubmit} className="w-full bg-white dark:bg-blue-d6">
      <h2 className="font-bold text-center sm:text-left text-xl mb-2">
        Split of Contributions
      </h2>
      <p className="text-center sm:text-left text-lg text-gray-d1 dark:text-gray">
        You can set the distribution of the contributions to your AIF. By
        default, contributors are able to set how their contribution is split
        between your Locked account and your Liquid account. You can deactivate
        that to default to a value that you set or set minimum & maximum values.
      </p>
      <Toggle<FV> name="isCustom" classes={{ container: "my-9 text-sm" }}>
        Allow contributors to define a Locked/Liquid Split
      </Toggle>

      <div className="mb-8 grid content-start border border-prim p-8 rounded">
        <h3 className="text-xl font-bold mb-8">Default Values</h3>
        <div className="flex justify-between text-sm">
          <span>To locked</span>
          <span>To liquid</span>
        </div>
        <MinmaxSlider<FV>
          names={{ min: "defaultMin", max: "default" }}
          hidden="max"
          hideLabels
        >
          {(min, max) => (
            <div className="flex justify-between text-sm">
              <span className="py-2 text-center w-16 border border-prim rounded">
                {max}%
              </span>
              <span className="py-2 text-center w-16 border border-prim rounded">
                {100 - max}%
              </span>
            </div>
          )}
        </MinmaxSlider>
      </div>
      {isCustom && (
        <div className="mb-8 grid content-start border border-prim p-8 rounded">
          <h3 className="text-xl font-bold mb-8">Minimums and Maximums</h3>
          <div className="flex justify-between text-sm">
            <span>To locked</span>
            <span>To liquid</span>
          </div>
          <MinmaxSlider<FV> names={{ min: "min", max: "max" }}>
            {(min, max) => (
              <p className="mt-16">
                Contributors can decide to allocate{" "}
                <span className="font-bold">{min}% </span> to{" "}
                <span className="font-bold">{max}%</span> to the Locked Account
              </p>
            )}
          </MinmaxSlider>
        </div>
      )}

      <NavButtons classes="mt-6" curr={5} />
    </form>
  );
}
