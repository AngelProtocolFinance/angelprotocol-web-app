import React, { FC, PropsWithChildren } from "react";
import { useFormContext } from "react-hook-form";
import { FV } from "./types";
import { Reset, Submit, Tooltip } from "components/admin";
import { MinmaxSlider, Toggle } from "components/ast";
import { Form as Frm } from "../common/Form";
import { SubHeading } from "../common/SubHeading";

export default function Form({
  tooltip,
  children,
  ...props
}: PropsWithChildren<React.FormHTMLAttributes<HTMLFormElement>> & {
  tooltip?: string;
}) {
  const {
    watch,
    resetField,
    formState: { isDirty },
  } = useFormContext<FV>();
  const isCustom = watch("isCustom");

  return (
    <Frm {...props}>
      <SubHeading>Split of Contributions</SubHeading>
      {tooltip && <Tooltip tooltip={tooltip} />}
      <p>
        You can set the distribution of the contributions to your AST. By
        default, contributors are able to set how their contribution is split
        between your Locked account and your Liquid account. You can deactivate
        that to default to a value that you set or set minimum & maximum values.
      </p>
      <Toggle<FV>
        name="isCustom"
        classes={{ container: "text-sm" }}
        onChange={(isCustom) => {
          if (!isCustom) {
            //reset to these defaults - since persisted value is used as default value
            resetField("min", { defaultValue: "0" });
            resetField("max", { defaultValue: "100" });
          }
        }}
      >
        Allow contributors to define a Locked/Liquid Split
      </Toggle>

      <Group>
        <GroupTitle className="mb-8">Default Values</GroupTitle>
        <div className="flex justify-between text-sm">
          <span>To locked</span>
          <span>To liquid</span>
        </div>
        <MinmaxSlider<FV>
          names={{ min: "defaultMin", max: "default" }}
          hidden="max"
          hideLabels
        >
          {(min, max, disabled) => (
            <div className="flex justify-between text-sm">
              <Percent disabled={disabled}>{100 - max}%</Percent>
              <Percent disabled={disabled}>{max}%</Percent>
            </div>
          )}
        </MinmaxSlider>
      </Group>
      {isCustom && (
        <Group>
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
      {!tooltip && (
        <div className="flex justify-start gap-3 w-full">
          <Reset disabled={!isDirty}>Reset changes</Reset>
          <Submit>Submit changes</Submit>
        </div>
      )}
    </Frm>
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

type Props = PropsWithChildren<{ className?: string }>;
const Group: FC<Props> = ({ className = "", children }) => {
  return (
    <div
      className={`${className} grid content-start border border-prim p-4 md:p-8 rounded`}
    >
      {children}
    </div>
  );
};

const GroupTitle: FC<Props> = ({ className = "", children }) => {
  return <div className={`${className} text-xl font-bold`}>{children}</div>;
};
