import "rc-slider/assets/index.css";
import { ErrorMessage, FastField, Field, Form, useFormikContext } from "formik";
import Slider, { SliderProps } from "rc-slider";
import useSlider from "./useSlider";
import { Values } from "./types";
import CustomAmount from "./CustomAmount";
import KYCForm from "./KYCForm";
import "./UserForm.css";

type Props = {
  //for charity donations, no split data yet
  maxSplitLiq?: number;
  minSplitLiq?: number;
};

const SliderComponent = (props: SliderProps) => {
  const { min, max, value, onChange, onAfterChange } = props;

  return (
    <div className="w-3/4 flex flex-col gap-3">
      <span className="text-dark-grey text-base font-semibold">
        Percentage<sup className="text-red-500">*</sup>
      </span>
      <Slider
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        onAfterChange={onAfterChange}
        className="w-full"
        railStyle={{
          height: 10,
          backgroundColor: "lightgrey",
        }}
        trackStyle={{ height: 10, backgroundColor: "#3FA9F5" }}
        handleStyle={{
          borderColor: "white",
          height: 28,
          width: 28,
          marginTop: -9,
          backgroundColor: "white",
        }}
      />
      <p className="flex justify-between text-base">
        <span>{min}%</span>
        <span>{max}%</span>
      </p>
    </div>
  );
};

export default function UserForm(props: Props) {
  const { percentage, handleSlide, handleSlideEnd } = useSlider();
  const { isSubmitting, values, touched } = useFormikContext<Values>();
  const showKYCForm = values.receiptRequested;
  const minLocked = 100 - (props?.maxSplitLiq || 50);
  const maxLocked = 100 - (props?.minSplitLiq || 0);

  return (
    <Form className="flex flex-col text-white-grey text-lg 3xl:text-xl">
      <div className="flex justify-between">
        <div className="flex flex-col w-1/2 gap-2 justify-center xl:justify-start">
          <p className="font-semibold">Choose the amount of your donation:</p>
          <div className="flex flex-col gap-4 xl:flex-row">
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
            className="text-sm text-center w-5/6"
          />
        </div>
        <div className="w-1/2 flex flex-col gap-5">
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
