import { Field } from "formik";
import React from "react";

type Props = {
  name: string;
  value: string;
  onFocus: () => void;
  checked?: boolean;
};

function RadioButton({ name, value, onFocus, checked }: Props) {
  return (
    <Field
      type="radio"
      name={name}
      value={value}
      className="mr-1 cursor-pointer w-3 h-3 2xl:w-5 2xl:h-5 rounded-full appearance-none bg-white-grey"
      onFocus={onFocus}
      {...(checked !== undefined && { checked })}
    />
  );
}

export default RadioButton;
