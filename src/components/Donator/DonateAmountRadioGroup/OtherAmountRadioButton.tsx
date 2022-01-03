import { ErrorMessage, Field } from "formik";
import React from "react";

type Props = {
  onClick: () => void;
  onFocus: () => void;
  checked: boolean;
  innerRef: React.MutableRefObject<HTMLInputElement | undefined>;
};

function OtherAmountRadioButton({
  onClick,
  onFocus,
  checked,
  innerRef,
}: Props) {
  return (
    <div className="flex flex-col relative">
      <div className="flex gap-3 items-center">
        <Field
          id="custom"
          type="radio"
          name="otherAmount"
          className="cursor-pointer"
          onClick={onClick}
          checked={checked}
        />
        <div className="h-11 flex flex-col w-5/6">
          <Field
            innerRef={innerRef}
            className="flex text-grey-accent w-5/6 rounded-md pl-2 items-center bg-white h-full"
            type="text"
            name="otherAmount"
            placeholder="Other amount"
            onFocus={onFocus}
          />
        </div>
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
