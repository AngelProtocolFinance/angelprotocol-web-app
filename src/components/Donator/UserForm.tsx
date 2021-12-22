import "rc-slider/assets/index.css";
import { ErrorMessage, FastField, Field, Form, useFormikContext } from "formik";
import Slider, { SliderProps } from "rc-slider";
import useSlider from "./useSlider";
import { Values } from "./types";
import CustomAmount from "./CustomAmount";
import KYCForm from "./KYCForm";
import "./UserForm.css";
import SliderComponent from "./SliderComponent";

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
    <Form className="flex flex-col text-white-grey text-base lg:text-lg 3xl:text-xl gap-5">
      <div className="flex justify-between">
        <div className="flex flex-col w-1/2 gap-2 justify-center xl:justify-start">
          <p className="font-semibold">Choose the amount of your donation:</p>
          <div className="flex flex-col gap-2 2xl:gap-4 2xl:flex-row">
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

          <div className="text-left mt-7">
            <label className="font-semibold cursor-pointer">
              <Field
                type="checkbox"
                name="receiptRequested"
                className="cursor-pointer mr-2"
              />
              I want a Tax Receipt
            </label>
          </div>
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
