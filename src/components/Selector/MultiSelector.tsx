import { Controller } from "react-hook-form";
import Select from "react-select";

interface SelectorProps {
  name: string;
  placeholder: string;
  options: any;
  control: any;
  register: Function;
  onChange?: Function;
}

export const MultiSelector = (props: SelectorProps) => {
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
            options={props.options}
            placeholder={props.placeholder}
            isMulti={true}
            onChange={(options) => {
              props.onChange &&
                props.onChange(options?.map((option: any) => option.value));
              onChange(options?.map((option: any) => option.value));
            }}
            value={props.options.filter((option: any) =>
              value?.includes(option.value)
            )}
            defaultValue={props.options.filter((option: any) =>
              value?.includes(option.value)
            )}
          />
        );
      }}
    />
  );
};
