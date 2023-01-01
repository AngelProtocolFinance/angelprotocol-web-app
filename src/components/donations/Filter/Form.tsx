import { Popover } from "@headlessui/react";
import { FC } from "react";
import Icon from "components/Icon";
import CurrencyDropdown from "./CurrencyDropdown";
import DateRange from "./DateRange";
import NetworkDropdown from "./NetworkDropdown";

type FormProps = {
  selectedNetwork: string;
  selectedCurrency: string;
  setSelectedNetwork: Function;
  setSelectedCurrency: Function;
  handleSubmit: Function;
  submit: Function;
  formReset: any;
  register: any;
  errors: Object;
  isDirty: Boolean;
};

const Form: FC<FormProps> = (props) => {
  return (
    <form onSubmit={props.handleSubmit(props.submit)} method="get">
      <div className="flex flex-col">
        <div className="flex sm:hidden justify-between border-b-[1px] bg-orange-l6 dark:bg-blue-d7 border-gray-l2 dark:border-bluegray">
          <h2 className="text-xl text-orange font-bold p-5 uppercase">
            Filters
          </h2>
          <Popover.Button className="p-5">
            <Icon type="Close" size={24} className="text-gray-d2" />
          </Popover.Button>
        </div>
        <div className="flex sm:hidden justify-end items-center gap-4 bg-orange-l6 dark:bg-blue-d7 border-b-[1px] border-gray-l2 dark:border-bluegray py-3 px-5">
          <button
            type="button"
            className="text-orange underline"
            onClick={props.formReset}
          >
            Reset filters
          </button>
          <button
            type="submit"
            className="flex justify-center items-center text-white bg-orange p-3 rounded-md disabled:bg-gray"
            disabled={
              props.isDirty || props.selectedNetwork || props.selectedCurrency
                ? false
                : true
            }
          >
            Apply filter
          </button>
        </div>
        <div>
          <div className="flex flex-col w-full p-6 gap-6 bg-white dark:bg-blue-d5">
            <DateRange register={props.register} errors={props.errors} />
            <NetworkDropdown
              selectedNetwork={props.selectedNetwork}
              setSelectedNetwork={props.setSelectedNetwork}
            />

            <CurrencyDropdown
              selectedCurrency={props.selectedCurrency}
              setSelectedCurrency={props.setSelectedCurrency}
            />
          </div>
          <div className="hidden sm:flex justify-end items-center gap-4 bg-orange-l6 dark:bg-blue-d7 border-b-[1px] border-gray-l2 dark:border-bluegray py-3 px-5">
            <button
              type="button"
              className="text-orange underline"
              onClick={props.formReset}
            >
              Reset filters
            </button>
            <button
              type="submit"
              className="flex justify-center items-center text-white bg-orange p-3 rounded-md disabled:bg-gray"
              disabled={
                props.isDirty || props.selectedNetwork || props.selectedCurrency
                  ? false
                  : true
              }
            >
              Apply filter
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default Form;
