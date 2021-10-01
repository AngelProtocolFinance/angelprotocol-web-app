import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import useSlider from "pages/Charity/useSlider";
import { ErrorMessage, FastField, Field, Form, useFormikContext } from "formik";
import { Values } from "components/Donator/types";
import CustomAmount from "./CustomAmount";

const amounts = [
  "5.000000",
  "20.000000",
  "50.000000",
  "100.000000",
  "1000.000000",
];
export default function CharityForm() {
  const { percentage, handleSlide, handleSlideEnd } = useSlider();
  const { isSubmitting, values } = useFormikContext<Values>();
  return (
    <Form>
      <p className="text-xl">Choose the amount of your donation:</p>
      <div className="options-amount mt-4 mb-6">
        <div className="flex justify-between w-3/5">
          {amounts.map((amount) => (
            <label key={amount} className="option-amount w-max cursor-pointer">
              <FastField
                type="radio"
                name="amount"
                value={amount}
                className="mr-1"
              />
              {`$${Number(amount).toFixed(0)}`}
            </label>
          ))}
        </div>
        <div className="mt-4 flex items-center">
          <Field
            id="custom"
            type="radio"
            name="amount"
            value={""}
            className=""
          />
          <div className="ml-2 h-10 flex items-center">
            {(!amounts.includes(values.amount) && <CustomAmount />) || (
              <label
                htmlFor="custom"
                className="text-angel-grey w-52 rounded-md pl-2 py-2 bg-white"
              >
                other amount
              </label>
            )}
          </div>
        </div>
        <ErrorMessage
          name="amount"
          component="div"
          className="text-sm mt-2 text-red-400"
        />
      </div>
      <div className="percentage-slider">
        <p className="text-xl mt-2">
          How much of your donation should be compounded forever for Women for
          Women International?
        </p>
        <div className="flex items-center w-full my-2">
          <div className="w-2/5 mr-5">
            <p className="text-xs">
              Percentage<span className="text-sm text-dark-red">*</span>
            </p>
            <Slider
              min={50}
              max={100}
              value={percentage}
              onChange={handleSlide}
              onAfterChange={handleSlideEnd}
              className="w-full h-4 my-3 ml-2"
            />
            <div className="flex justify-between items-center text-xs ml-2 -mr-2">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>
          <p className="text-xl text-thin-blue">{percentage}%</p>
        </div>
      </div>
      <div className="button-area">
        <button
          disabled={isSubmitting}
          type="submit"
          className="uppercase bg-orange rounded-xl w-56 h-12 d-flex justify-center items-center mb-4"
          // onClick={donate}
        >
          Donate
        </button>
      </div>
    </Form>
  );
}
