import Select from "react-select";
import { Controller } from "react-hook-form";
import { OptionType } from "types/optionType";

interface SelectorProps {
  name: string;
  placeholder: string;
  options: OptionType[];
  control: any;
  register: Function;
  onChange?: Function;
}

export const Selector = (props: SelectorProps) => {
  return (
    <Controller
      {...props.register(props.name)}
      name={props.name}
      control={props.control}
      render={({ field: { value, onChange } }) => {
        return (
          <Select
            className="outline-none border-none w-full"
            placeholder={props.placeholder}
            value={props.options.filter((option) => value === option.value)}
            onChange={(option) => {
              onChange(option?.value);
              props.onChange && props.onChange(option?.value);
            }}
            options={props.options}
          />
        );
      }}
    />
  );
};
