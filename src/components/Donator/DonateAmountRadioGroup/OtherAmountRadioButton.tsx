import { ErrorMessage, Field } from "formik";
import React from "react";
import RadioButton from "./RadioButton";

type Props = {
  value: string;
  onFocus: () => void;
  checked: boolean;
  innerRef: React.MutableRefObject<HTMLInputElement | undefined>;
};

function OtherAmountRadioButton({ value, onFocus, checked, innerRef }: Props) {
  return (
    <div className="flex flex-col relative">
      <div className="flex gap-3 items-center">
        <RadioButton
          name="otherAmount"
          value={value}
          onFocus={onFocus}
          checked={checked}
        />
        <Field
          innerRef={innerRef}
          className="flex text-grey-accent w-2/3 rounded-md pl-2 items-center bg-white h-11"
          type="text"
          name="otherAmount"
          placeholder="Other amount"
          onFocus={onFocus}
        />
      </div>
      <ErrorMessage
        name="otherAmount"
        component="div"
        className="text-sm text-center absolute top-11 left-0 w-5/6 text-sdg5"
      />
    </div>
  );
}

export default OtherAmountRadioButton;
