import { Field } from "formik";
import React from "react";

type Props = {
  name: string;
  onFocus: () => void;
  checked?: boolean;
};

function RadioButton({ name, onFocus, checked }: Props) {
  const ch = { ...(checked !== undefined && { checked: checked }) };
  console.log(ch);

  return (
    <Field
      type="radio"
      name={name}
      className="mr-1 cursor-pointer w-4 h-4 2xl:w-6 2xl:h-6"
      onFocus={onFocus}
    />
  );
}

export default RadioButton;
