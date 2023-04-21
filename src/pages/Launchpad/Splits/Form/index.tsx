import { PropsWithChildren, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { FV } from "../types";
import Form, {
  Desc,
  FormProps,
  Group,
  GroupTitle,
  Title,
} from "../../common/Form";
import NavButtons from "../../common/NavButtons";
import Toggle from "../../common/Toggle";
import { MinmaxSlider } from "./MinmaxSlider";

export default function SplitsForm(props: FormProps) {
  const { watch, resetField } = useFormContext<FV>();
  const isCustom = watch("isCustom");

  useEffect(() => {
    if (!isCustom) {
      resetField("default", { defaultValue: "50" }); //reset to these defaults - since persisted value is used as default value
      resetField("min", { defaultValue: "0" });
      resetField("max", { defaultValue: "100" });
    }
  }, [isCustom, resetField]);

  return (
    <Form {...props}>
      <Title className="mb-2">Split of Contributions</Title>
      <Desc>
        You can set the distribution of the contributions to your AST. By
        default, contributors are able to set how their contribution is split
        between your Locked account and your Liquid account. You can deactivate
        that to default to a value that you set or set minimum & maximum values.
      </Desc>
      <Toggle<FV> name="isCustom" classes={{ container: "my-9 text-sm" }}>
        Allow contributors to define a Locked/Liquid Split
      </Toggle>

      <Group className="mb-8">
        <GroupTitle className="mb-8">Default Values</GroupTitle>
        <div className="flex justify-between text-sm">
          <span>To locked</span>
          <span>To liquid</span>
        </div>
        <MinmaxSlider<FV>
          names={{ min: "defaultMin", max: "default" }}
          hidden="max"
          hideLabels
          disabled={!isCustom}
        >
          {(min, max, disabled) => (
            <div className="flex justify-between text-sm">
              <Percent disabled={disabled}>{max}%</Percent>
              <Percent disabled={disabled}>{100 - max}%</Percent>
            </div>
          )}
        </MinmaxSlider>
      </Group>
      {isCustom && (
        <Group className="mb-8">
          <GroupTitle className="mb-8">Minimums and Maximums</GroupTitle>
          <MinmaxSlider<FV> names={{ min: "min", max: "max" }}>
            {(min, max) => (
              <p className="mt-16">
                Contributors can decide to allocate{" "}
                <span className="font-bold">{min}% </span> to{" "}
                <span className="font-bold">{max}%</span> to the Locked Account
              </p>
            )}
          </MinmaxSlider>
        </Group>
      )}

      <NavButtons classes="mt-6" curr={5} />
    </Form>
  );
}

function Percent({
  children,
  disabled,
}: PropsWithChildren<{ disabled?: boolean }>) {
  return (
    <span
      className={`py-2 text-center w-16 border border-prim rounded ${
        disabled ? "bg-[#F5F5F5] dark:bg-bluegray-d1" : ""
      }`}
    >
      {children}
    </span>
  );
}
