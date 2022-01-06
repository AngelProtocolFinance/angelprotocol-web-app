import { useFormikContext } from "formik";
import React, { useRef } from "react";
import { Values } from "../types";
import OtherAmountRadioButton from "./OtherAmountRadioButton";
import PredefinedAmountsRadioButtons from "./PredefinedAmountsRadioButtons";
import "./styles.css";

// Note: If at any point there comes a need to pull this component out and make it a shared one, know
// that this component uses the surrounding Formik fields to initialize and manage its radio buttons.
function DonateAmountRadioGroup() {
  const { values, setFieldValue } = useFormikContext<Values>();
  const otherAmountInputRef = useRef<HTMLInputElement>();

  const resetOtherAmount = () => {
    if (values.otherAmount) {
      setFieldValue("otherAmount", "");
    }
  };
  const handleFocusOtherAmount = () => {
    if (values.amount) {
      setFieldValue("amount", "");
    }
    if (!isOtherAmountInputFocused()) {
      otherAmountInputRef.current?.focus();
    }
  };
  const isOtherAmountInputFocused = () =>
    otherAmountInputRef.current === document.activeElement;

  return (
    <div className="flex flex-col w-1/2 gap-5 justify-center xl:justify-start">
      <p className="font-semibold">Choose the amount of your donation:</p>
      <PredefinedAmountsRadioButtons onFocus={resetOtherAmount} />
      <OtherAmountRadioButton
        onFocus={handleFocusOtherAmount}
        checked={!!values.otherAmount || isOtherAmountInputFocused()}
        innerRef={otherAmountInputRef}
      />
    </div>
  );
}

export default DonateAmountRadioGroup;
