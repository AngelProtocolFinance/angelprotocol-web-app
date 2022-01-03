import { FastField, Field, Form, useFormikContext } from "formik";
import "rc-slider/assets/index.css";
import React from "react";
import DonateAmountRadioGroup from "./DonateAmountRadioGroup";
import KYCForm from "./KYCForm";
import SliderComponent from "./SliderComponent";
import { Values } from "./types";
import "./UserForm.css";
import useSlider from "./useSlider";

type Props = {
  //for charity donations, no split data yet
  maxSplitLiq?: number;
  minSplitLiq?: number;
};

export default function UserForm(props: Props) {
  const { percentage, handleSlide, handleSlideEnd } = useSlider();
  const { isSubmitting, values, touched } = useFormikContext<Values>();
  const showKYCForm = values.receiptRequested;
  const minLocked = 100 - (props?.maxSplitLiq || 50);
  const maxLocked = 100 - (props?.minSplitLiq || 0);

  return (
    <Form className="flex flex-col text-white-grey text-xs lg:text-sm 3xl:text-lg gap-5">
      <div className="flex justify-between">
        <div className="flex flex-col w-1/2 gap-5 justify-center xl:justify-start">
          <p className="font-semibold">Choose the amount of your donation:</p>
          <div className="flex flex-col gap-2 2xl:gap-4 xl:flex-row">
            {amounts.map((amount) => (
              <label
                key={amount}
                className="cursor-pointer font-semibold flex items-center"
              >
                <FastField
                  type="radio"
                  name="amount"
                  value={amount}
                  className="mr-1 cursor-pointer"
                />
                {`$${Number(amount).toFixed(0)}`}
              </label>
            ))}
          </div>
          <DonateAmountRadioGroup amounts={amounts} />
        </div>
        <div className="w-1/2 flex flex-col justify-between">
          <p className="font-semibold">
            How much of your donation should be compounded forever for this
            Index?
          </p>
          <SliderComponent
            min={minLocked}
            max={maxLocked}
            value={percentage}
            onChange={handleSlide}
            onAfterChange={handleSlideEnd}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-7">
        <p>
          Depending on the country in which you are located, you may required a
          tax receipt for administrative obligations. If you wish to receive a
          tax receipt, please check the chechbox below and fill in the form.
        </p>
        <label className="font-semibold cursor-pointer">
          <Field
            type="checkbox"
            name="receiptRequested"
            className="cursor-pointer mr-2"
          />
          I want a Tax Receipt
        </label>
      </div>

      {showKYCForm && <KYCForm />}

      <div className="w-full flex justify-center">
        <button
          disabled={isSubmitting}
          type="submit"
          className="bg-angel-orange font-semibold rounded-xl w-52 h-12"
          // onClick={donate}
        >
          Donate
        </button>
      </div>
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
