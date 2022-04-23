import React, { ComponentType } from "react";
import { Controller } from "react-hook-form";
import Select, {
  ControlProps,
  GroupBase,
  IndicatorSeparatorProps,
  IndicatorsContainerProps,
  MenuPlacement,
  MenuProps,
  OptionProps,
  ThemeConfig,
  ValueContainerProps,
} from "react-select";

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
  isLoading?: boolean;
  isSearchable?: boolean;
  customComponents?: boolean;
  Option?: ComponentType<OptionProps<any, boolean, GroupBase<any>>> | undefined;
  Menu?: ComponentType<MenuProps<any, boolean, GroupBase<any>>> | undefined;
  IndicatorsContainer?:
    | ComponentType<IndicatorsContainerProps<any, boolean, GroupBase<any>>>
    | undefined;
  Control?:
    | ComponentType<ControlProps<any, boolean, GroupBase<any>>>
    | undefined;
  ValueContainer?:
    | ComponentType<ValueContainerProps<any, boolean, GroupBase<any>>>
    | undefined;
  IndicatorSeparator?:
    | ComponentType<IndicatorSeparatorProps<any, boolean, GroupBase<any>>>
    | undefined;
  isOptionDisabled?: (option: any, selectValue: any) => boolean;
  isOptionSelected?: (option: any, selectValue: any) => boolean;
}

const defaultClassName = "outline-none border-none w-full";
const colourStyles = {
  control: (styles: any) => ({
    ...styles,
    backgroundColor: "transparent",
    border: "0px",
    outline: "none",
    fontSize: "14px",
  }),
  option: (styles: any, { isSelected }: any) => {
    return {
      ...styles,
      backgroundColor: isSelected ? "grey" : "white",
      color: "#222",
      fontSize: "14px",
      cursor: isSelected ? "not-allowed" : "default",
    };
  },
};

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
            styles={colourStyles}
            isOptionDisabled={props.isOptionDisabled}
            isOptionSelected={props.isOptionSelected}
            isSearchable={props.isSearchable}
            options={props.options}
            isMulti={props.isMulti}
            menuPlacement={props.menuPlacement || "auto"}
            theme={{ borderRadius: 0 } as ThemeConfig}
            {...(props.customComponents && {
              components: {
                Option: props.Option,
                Menu: props.Menu,
                IndicatorSeparator: props.IndicatorSeparator,
                ValueContainer: props.ValueContainer,
                Control: props.Control,
                IndicatorsContainer: props.IndicatorsContainer,
              },
            })}
          />
        );
      }}
    />
  );
});
