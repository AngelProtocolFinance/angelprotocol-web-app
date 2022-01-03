import { ErrorMessage, Field, useFormikContext } from "formik";
import "rc-slider/assets/index.css";
import React from "react";
import CustomAmount from "./CustomAmount";
import { Values } from "./types";

type Props = {
  amounts: string[];
};

function DonateAmountRadioGroup({ amounts }: Props) {
  const { values, touched } = useFormikContext<Values>();

  return (
    <div className="flex flex-col relative">
      <div className="flex gap-3 items-center">
        <Field
          id="custom"
          type="radio"
          name="amount"
          value={"0"}
          className="cursor-pointer"
        />
        <div className="h-11 flex flex-col w-5/6">
          {(!amounts.includes(values.amount) && touched.amount && (
            <CustomAmount />
          )) || (
            <label
              htmlFor="custom"
              className={`flex text-grey-accent w-5/6 rounded-md pl-2 items-center bg-white h-full`}
            >
              Other amount
            </label>
          )}
        </div>
      </div>
      <ErrorMessage
        name="amount"
        component="div"
        className="text-sm text-center absolute top-11 left-0 w-5/6 text-sdg5"
      />
    </div>
  );
}

export default DonateAmountRadioGroup;
