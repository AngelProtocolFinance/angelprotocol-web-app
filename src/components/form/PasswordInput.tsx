import Icon from "components/Icon";
import { useState } from "react";
import { FieldValues, Path, get, useFormContext } from "react-hook-form";
import { fieldClasses } from "./constants";

type Props<T extends FieldValues> = {
  name: Path<T>;
  placeholder?: string;
};

export function PasswordInput<T extends FieldValues>(props: Props<T>) {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  const errorMsg = get(errors, props.name)?.message;

  return (
    <div>
      <div className={`grid grid-cols-[auto_1fr_auto] px-5 ${fieldClasses}`}>
        <Icon type="Padlock" className="text-navy-l3" />
        <input
          {...register(props.name)}
          type={isPasswordShown ? "text" : "password"}
          className="w-full h-full placeholder:font-medium placeholder:font-heading placeholder:text-navy-l3 max-sm:placeholder:text-sm focus:outline-none bg-transparent"
          placeholder={props.placeholder}
          aria-invalid={!!errorMsg}
        />
        <button
          type="button"
          className="text-navy-l3 hover:text-navy-l2 active:text-navy rounded focus-visible:outline focus-visible:outline-2"
          onClick={() => setIsPasswordShown((prev) => !prev)}
        >
          <Icon type={isPasswordShown ? "EyeSlashed" : "Eye"} size={20} />
        </button>
      </div>
      {errorMsg && <p className="text-xs text-red mt-1.5">{errorMsg}</p>}
    </div>
  );
}
