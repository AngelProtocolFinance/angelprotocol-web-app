import React, { ComponentType } from "react";
import { Controller } from "react-hook-form";
import Select, {
  ControlProps,
  GroupBase,
  IndicatorSeparatorProps,
  IndicatorsContainerProps,
  MenuListProps,
  MenuPlacement,
  MenuProps,
  OptionProps,
  ThemeConfig,
  ValueContainerProps,
} from "react-select";

interface TokenSelectorOption {
  value: string;
  label: string;
}

type SelectorProps<TokenSelectorOption> = {
  name: string;
  placeholder?: string;
  options: TokenSelectorOption[];
  control: any;
  register: Function;
  onChange?: Function;
  isMulti?: boolean;
  menuPlacement?: MenuPlacement;
  className?: string;
  isLoading?: boolean;
  isSearchable?: boolean;
  Option: ComponentType<OptionProps<any, boolean, GroupBase<any>>> | undefined;
  Menu: ComponentType<MenuProps<any, boolean, GroupBase<any>>> | undefined;
  MenuList:
    | React.ComponentType<MenuListProps<any, boolean, GroupBase<any>>>
    | undefined;
  IndicatorsContainer:
    | ComponentType<IndicatorsContainerProps<any, boolean, GroupBase<any>>>
    | undefined;
  Control:
    | ComponentType<ControlProps<any, boolean, GroupBase<any>>>
    | undefined;
  ValueContainer:
    | ComponentType<ValueContainerProps<any, boolean, GroupBase<any>>>
    | undefined;
  IndicatorSeparator:
    | ComponentType<IndicatorSeparatorProps<any, boolean, GroupBase<any>>>
    | undefined;
  isOptionDisabled?: (option: any, selectValue: any) => boolean;
  isOptionSelected?: (option: any, selectValue: any) => boolean;
};

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

export const Selector = React.memo(
  (props: SelectorProps<TokenSelectorOption>) => {
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
              value={props.options.filter((option) => value === option.value)}
              onChange={(option: TokenSelectorOption) => {
                onChange(option?.value);
                props.onChange && props.onChange(option?.value);
              }}
              styles={colourStyles}
              isOptionSelected={props.isOptionSelected}
              isSearchable={props.isSearchable}
              options={props.options}
              isMulti={props.isMulti}
              menuPlacement={props.menuPlacement || "auto"}
              theme={{ borderRadius: 0 } as ThemeConfig}
              components={{
                Option: props.Option,
                Menu: props.Menu,
                IndicatorSeparator: props.IndicatorSeparator,
                ValueContainer: props.ValueContainer,
                Control: props.Control,
                IndicatorsContainer: props.IndicatorsContainer,
                MenuList: props.MenuList,
              }}
            />
          );
        }}
      />
    );
  }
);
