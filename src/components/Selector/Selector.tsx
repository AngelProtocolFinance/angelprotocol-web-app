import Select from "react-select";
import { Controller } from "react-hook-form";

interface SelectorProps {
  name: string;
  placeholder: string;
  options: any;
  control: any;
  register: Function;
  onChange?: Function;
  isMulti?: boolean;
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
            value={props.options.filter(
              (option: any) => value === option.value
            )}
            onChange={(option: any) => {
              onChange(option?.value);
              props.onChange && props.onChange(option?.value);
            }}
            options={props.options}
            isMulti={props.isMulti}
          />
        );
      }}
    />
  );
};
