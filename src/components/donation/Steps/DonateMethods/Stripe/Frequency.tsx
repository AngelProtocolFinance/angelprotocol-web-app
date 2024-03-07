import { RadioGroup as RG } from "@headlessui/react";
import Icon from "components/Icon";
import { useController, useFormContext } from "react-hook-form";
import { FormValues as FV } from "./types";

type Freq = FV["frequency"];

export default function Frequency() {
  const { control } = useFormContext<FV>();

  const {
    field: { value, onChange },
  } = useController<FV, "frequency">({
    control: control,
    name: "frequency",
  });

  return (
    <RG
      value={value}
      onChange={onChange}
      className="grid grid-cols-[auto_auto] justify-items-start justify-self-start gap-2"
    >
      <RG.Label className="col-span-2">
        Frequency <span className="text-red">*</span>
      </RG.Label>
      <RG.Option
        value={"monthly" satisfies Freq}
        className="group border-gray-l3 rounded pl-6 pr-7 border h-[2.625rem] flex items-center aria-checked:bg-blue-d1 aria-checked:text-white aria-checked:border-none"
      >
        <span>Give Monthly</span>
        <Icon
          type="Check"
          className="hidden text-[1.3rem] ml-1 group-aria-checked:inline-block relative bottom-[1px]"
        />
      </RG.Option>
      <RG.Option
        value={"once" satisfies Freq}
        className="group border-gray-l3 rounded pl-6 pr-7 border h-[2.625rem] flex items-center aria-checked:bg-blue-d1 aria-checked:text-white aria-checked:border-none"
      >
        <span>Give Once</span>
        <Icon
          type="Check"
          className="hidden text-[1.3rem] ml-1 group-aria-checked:inline-block relative bottom-[1px]"
        />
      </RG.Option>
    </RG>
  );
}
