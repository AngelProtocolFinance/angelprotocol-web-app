import { RadioGroup as RG } from "@headlessui/react";
import Icon from "components/Icon";
import { useController, useFormContext } from "react-hook-form";
import { FormValues as FV } from "./types";

type Freq = FV["frequency"];

const styles = {
  icon: "hidden @sm:block text-[1.3rem] ml-1 group-aria-checked:text-white text-transparent relative bottom-[1px]",
  option:
    "group border-gray-l3 rounded text-sm @sm:text-base px-2 @sm:px-6 border h-[2.625rem] flex items-center justify-center @sm:justify-start aria-checked:bg-blue-d1 aria-checked:text-white aria-checked:border-none select-none",
};

export default function Frequency() {
  const { control } = useFormContext<FV>();

  const {
    field: { value, onChange },
  } = useController<FV, "frequency">({
    control: control,
    name: "frequency",
  });

  return (
    <RG value={value} onChange={onChange} className="@container">
      <RG.Label className="mb-2 block text-sm font-medium">
        Frequency <span className="text-red">*</span>
      </RG.Label>

      <div className="grid grid-cols-2 gap-2 @sm:flex">
        <RG.Option value={"monthly" satisfies Freq} className={styles.option}>
          <span>Give Monthly</span>
          <Icon type="Check" className={styles.icon} />
        </RG.Option>
        <RG.Option value={"once" satisfies Freq} className={styles.option}>
          <span>Give Once</span>
          <Icon type="Check" className={styles.icon} />
        </RG.Option>
      </div>
    </RG>
  );
}
