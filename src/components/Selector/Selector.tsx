import React from "react";
import Select, { MenuPlacement } from "react-select";
import { Controller } from "react-hook-form";

interface SelectorProps {
  name: string;
  placeholder?: string;
  options: any;
  control: any;
  register: Function;
  onChange?: Function;
  isMulti?: boolean;
  menuPlacement?: MenuPlacement;
}

export const Selector = React.memo((props: SelectorProps) => {
  return (
    <Controller
      {...props.register(props.name)}
      name={props.name}
      control={props.control}
      ref={null}
      render={({ field: { value, onChange } }) => {
        return (
          <Select
            className="outline-none border-none w-full"
            placeholder={props.placeholder}
            value={props.options.filter(
              (option: any) => value === option.value
            )}
            onChange={(option: any) => {
              onChange(option?.value);
              props.onChange && props.onChange(option?.value);
            }}
            options={props.options}
            isMulti={props.isMulti}
            menuPlacement={props.menuPlacement || "auto"}
          />
        );
      }}
    />
  );
});
