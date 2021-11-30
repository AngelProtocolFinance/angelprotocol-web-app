import "rc-slider/assets/index.css";
import { ErrorMessage, FastField, Field, Form, useFormikContext } from "formik";
import Slider from "rc-slider";
import useSlider from "./useSlider";
import { Values } from "./types";
import CustomAmount from "./CustomAmount";
import KYCForm from "./KYCForm";

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
    <Form className="grid grid-cols-1 xl:justify-start p-4 pl-0 rounded-md mt-5 ">
      <div className="col-span-4 justify-center xl:justify-start">
        <p className="text-xl text-left text-white-grey font-semibold">
          Choose the amount of your donation
        </p>
        <div className="mt-4 text-left">
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

        <div className="mt-4 grid grid-cols-a1 lg:items-left mt-10">
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
            className="cols-start-1 col-span-2 text-sm text-white text-left ml-6 mt-2"
          />
        </div>
      </div>

      <div className="col-span-4 text-left mt-10 w-full lg:w-1/2">
        <p className="lg:ml-4 mt-4 lg:mt-0 text-xl text-white-grey font-semibold">
          How much of your donation should be compounded forever?
        </p>
        <div className="p-5">
          <Slider
            min={minLocked}
            max={maxLocked}
            value={percentage}
            onChange={handleSlide}
            onAfterChange={handleSlideEnd}
            className="w-full"
          />
          <p className="flex justify-between mt-2 text-white">
            <span>{minLocked}%</span>
            <span>{maxLocked}%</span>
          </p>
        </div>
      </div>

      <div className="xl:flex col-span-4 xl:col-span-2 lg:mt-4 text-left">
        <label className="lg:ml-4 text-white-grey font-semibold cursor-pointer">
          <Field type="checkbox" name="receiptRequested" /> I want a Tax Receipt
        </label>
      </div>

      {showKYCForm ? (
        <div className="col-span-2 text-white-grey font-semibold">
          <KYCForm />
        </div>
      ) : null}

      <div className="col-span-4 lg:col-span-2 mt-10 text-left lg:justify-start">
        <button
          disabled={isSubmitting}
          type="submit"
          className="bg-angel-orange text-white font-semibold rounded-xl md:w-48 w-52 h-12 d-flex justify-center items-center mb-4"
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
