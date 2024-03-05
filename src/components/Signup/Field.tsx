import Icon, { IconType } from "components/Icon";
import { FieldValues, Path, get, useFormContext } from "react-hook-form";
import { fieldClasses } from "./constants";

type Props<T extends FieldValues> = {
  name: Path<T>;
  placeholder: string;
  icon?: IconType;
};

export default function Field<T extends FieldValues>(props: Props<T>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  const error = get(errors, props.name)?.message;

  return (
    <div>
      <div
        className={`grid ${
          props.icon ? "grid-cols-[auto_1fr]" : ""
        } ${fieldClasses}`}
      >
        {props.icon && (
          <Icon type={props.icon} className="ml-5 text-navy-l3" size={20} />
        )}
        <input
          {...register(props.name)}
          type="text"
          className={`w-full h-full placeholder:font-medium placeholder:font-heading placeholder:text-navy-l3 focus:outline-none bg-transparent py-4 ${
            props.icon ? "pr-5" : "px-5"
          }`}
          placeholder={props.placeholder}
          aria-invalid={!!error}
        />
      </div>
      {error && <p className="text-xs text-[#C52828] mt-1.5">{error}</p>}
    </div>
  );
}
