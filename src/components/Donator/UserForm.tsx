import { Form, useFormikContext } from "formik";
import "rc-slider/assets/index.css";
import React from "react";
import DonateAmountRadioGroup from "./DonateAmountRadioGroup";
import PercentageCompounded from "./PercentageCompounded";
import TaxReceipt from "./TaxReceipt";
import { Values } from "./types";
import useSlider from "./useSlider";

type Props = {
  //for charity donations, no split data yet
  maxSplitLiq?: number;
  minSplitLiq?: number;
};

type ButtonSectionProps = {
  isSubmitting: boolean;
};

function ButtonSection({ isSubmitting }: ButtonSectionProps) {
  return (
    <div className="w-full flex justify-center">
      <button
        disabled={isSubmitting}
        type="submit"
        className="bg-angel-orange font-semibold rounded-xl w-52 h-12"
      >
        Donate
      </button>
    </div>
  );
}

export default function UserForm(props: Props) {
  const { percentage, handleSlide, handleSlideEnd } = useSlider();
  const { isSubmitting, values } = useFormikContext<Values>();
  const showKYCForm = values.receiptRequested;
  const minLocked = 100 - (props?.maxSplitLiq || 50);
  const maxLocked = 100 - (props?.minSplitLiq || 0);

  return (
    <Form className="flex flex-col text-white-grey text-xs lg:text-xl 3xl:text-lg gap-5">
      <div className="flex justify-between">
        <DonateAmountRadioGroup amounts={amounts} />
        <PercentageCompounded
          min={minLocked}
          max={maxLocked}
          value={percentage}
          onChange={handleSlide}
          onAfterChange={handleSlideEnd}
        />
      </div>
      <TaxReceipt showKYCForm={showKYCForm} />
      <ButtonSection isSubmitting={isSubmitting} />
    </Form>
  );
}

const amounts = [
  "5.000000",
  "20.000000",
  "50.000000",
  "100.000000",
  "1000.000000",
];
