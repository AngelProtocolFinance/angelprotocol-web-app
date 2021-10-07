import "rc-slider/assets/index.css";
import { ErrorMessage, FastField, Field, Form, useFormikContext } from "formik";
import Slider from "rc-slider";
import useSlider from "./useSlider";
import { Values } from "./types";
import CustomAmount from "./CustomAmount";

const amounts = [
  "5.000000",
  "20.000000",
  "50.000000",
  "100.000000",
  "1000.000000",
];

export default function UserForm() {
  const { percentage, handleSlide, handleSlideEnd } = useSlider();
  const { isSubmitting, values, touched } = useFormikContext<Values>();

  return (
    <Form className="grid grid-cols-2 p-4 rounded-md ">
      <div className="">
        <p className="text-xl text-white-grey font-semibold">
          Choose the amount of your donation
        </p>
        <div className="mt-4">
          {amounts.map((amount) => (
            <label
              key={amount}
              className="cursor-pointer text-xl text-white-grey font-semibold mr-4"
            >
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

        <div className="mt-4 grid grid-cols-a1 items-center">
          <Field
            id="custom"
            type="radio"
            name="amount"
            value={"0"}
            className=""
          />
          <div className="ml-2 h-10 flex flex-col">
            {(!amounts.includes(values.amount) && touched.amount && (
              <CustomAmount />
            )) || (
              <label
                htmlFor="custom"
                className={`text-angel-grey w-52 rounded-md pl-2 py-2 bg-white`}
              >
                other amount
              </label>
            )}
          </div>
          <ErrorMessage
            name="amount"
            component="div"
            className="cols-start-1 col-span-2 text-sm text-white ml-6 mt-2"
          />
        </div>
      </div>

      <div className="">
        <p className="ml-4 text-xl text-white-grey font-semibold">
          How much of your donation should be compounded forever?
        </p>
        <div className="p-5">
          <Slider
            min={50}
            max={100}
            value={percentage}
            onChange={handleSlide}
            onAfterChange={handleSlideEnd}
            className="w-full"
          />
          <p className="flex justify-between mt-2 text-white">
            <span>50%</span>
            <span>100%</span>
          </p>
        </div>
      </div>

      <button
        disabled={isSubmitting}
        type="submit"
        className="mt-8 cols-start-1 col-span-2 uppercase text-white bg-orange disabled:bg-thin-grey shadow-md rounded-md w-48 py-2 font-bold justify-self-center"
        // onClick={donate}
      >
        Donate
      </button>
    </Form>
  );
}
