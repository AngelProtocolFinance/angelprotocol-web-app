import { Control, Controller, FieldValues, Path } from "react-hook-form";
import Select, { GroupBase, MenuPlacement, StylesConfig } from "react-select";

type OptionType = { label: string; value: any };

interface Props<T extends FieldValues> {
  name: Path<T> & keyof T;
  placeholder?: string;
  options: OptionType[];
  control: Control<T, any>;
  onChange?: Function;
  disabled?: boolean;
  menuPlacement?: MenuPlacement;
}

export default function Selector<T extends FieldValues>(props: Props<T>) {
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
}

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
