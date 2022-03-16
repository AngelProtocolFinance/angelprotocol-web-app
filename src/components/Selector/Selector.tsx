import React from "react";
import Select, { MenuPlacement, GroupBase, StylesConfig } from "react-select";
import { Controller } from "react-hook-form";

type OptionType = { label: string; value: any };

interface SelectorProps {
  name: string;
  placeholder?: string;
  options: OptionType[];
  control: any;
  onChange?: Function;
  disabled?: boolean;
  menuPlacement?: MenuPlacement;
}

export const Selector = React.memo((props: SelectorProps) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field: { value, onChange } }) => {
        return (
          <Select
            styles={selectStyles}
            placeholder={props.placeholder}
            value={props.options.filter((option) => value === option.value)}
            onChange={(option) => {
              onChange(option?.value);
              props.onChange && props.onChange(option?.value);
            }}
            options={props.options}
            isDisabled={props.disabled}
            menuPlacement={props.menuPlacement || "auto"}
          />
        );
      }}
    />
  );
});

const selectStyles: StylesConfig<OptionType, false, GroupBase<OptionType>> = {
  control: (provided, state) => ({
    ...provided,
    border: "none",
    borderRadius: "0.375rem",
    outline: "none",
    backgroundColor: state.isDisabled ? "#efefef4d" : provided.backgroundColor,
    padding: "3px 2px",
  }),
  menu: (provided) => ({ ...provided, color: "black" }),
};
