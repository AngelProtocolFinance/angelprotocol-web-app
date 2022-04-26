import React from "react";
import { Controller } from "react-hook-form";
import Select, { MenuPlacement, ThemeConfig } from "react-select";

interface SelectorProps<T = {}> {
  name: string;
  placeholder?: string;
  options: T[];
  control: any;
  register: Function;
  onChange?: Function;
  isMulti?: boolean;
  menuPlacement?: MenuPlacement;
  className?: string;
}

const defaultClassName = "outline-none border-none w-full";

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
            className={props.className || defaultClassName}
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
            theme={{ borderRadius: 0 } as ThemeConfig}
          />
        );
      }}
    />
  );
});
