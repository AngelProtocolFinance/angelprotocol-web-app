import Action from "components/ActionButton/Action";
import { Form, useFormikContext } from "formik";
import "rc-slider/assets/index.css";
import React from "react";
import DonateAmountRadioGroup from "./DonateAmountRadioGroup";
import CompoundPercentageChooser from "./CompoundPercentageChooser";
import TaxReceipt from "./TaxReceipt";
import { Values } from "./types";

type Props = {
  //for charity donations, no split data yet
  maxSplitLiq?: number;
  minSplitLiq?: number;
};

export default function UserForm(props: Props) {
  const { isSubmitting, values } = useFormikContext<Values>();
  const showKYCForm = values.receiptRequested;
  const minLocked = 100 - (props?.maxSplitLiq || 50);
  const maxLocked = 100 - (props?.minSplitLiq || 0);

  return (
    <Form className="flex flex-col text-white-grey text-xs lg:text-xl 3xl:text-lg gap-5">
      <div className="flex justify-between">
        <DonateAmountRadioGroup />
        <CompoundPercentageChooser min={minLocked} max={maxLocked} />
      </div>
      <TaxReceipt showKYCForm={showKYCForm} />
      <Action
        disabled={isSubmitting}
        submit
        title="Donate"
        classes="bg-angel-orange font-semibold rounded-xl w-52 h-12 self-center"
      />
    </Form>
  );
}
