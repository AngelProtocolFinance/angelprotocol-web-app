import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Select, { OptionProps } from "react-select";
import defaultIcon from "assets/icons/tca/Angel-Alliance-logo.png";
import { UpdateProfileValues } from "../ProfileEditor/profileEditSchema";

export type CountryOption = {
  name: {
    common: string;
  };
  flags: {
    png?: string;
    svg?: string;
  };
};

export default function CountrySelector() {
  const { control, watch } = useFormContext<UpdateProfileValues>();

  const country = watch("test");
  console.log(country);

  const options: CountryOption[] = [
    { name: { common: "philippines" }, flags: { png: defaultIcon } },
    { name: { common: "usa" }, flags: { png: defaultIcon } },
    { name: { common: "japan" }, flags: { png: defaultIcon } },
  ];

  function getOptionLabel(option: CountryOption) {
    return option.name.common;
  }

  function getOptionValue(option: CountryOption) {
    return option.name.common;
  }

  return (
    <Controller
      control={control}
      name="test"
      render={({ field: { onChange, value } }) => (
        <Select
          onChange={onChange}
          getOptionLabel={getOptionLabel}
          getOptionValue={getOptionValue}
          options={options}
          value={value}
          components={{ Option: CustomOption }}
        />
      )}
    />
  );
}

const CustomOption: FC<OptionProps<CountryOption>> = ({ innerProps, data }) => {
  return (
    <div {...innerProps} className="flex items-center gap-2 p-2">
      <img
        src={data.flags.png || data.flags.svg || defaultIcon}
        alt="flag"
        className="w-8 aspect-video object-contain"
      />
      <span>{data.name.common}</span>
    </div>
  );
};
