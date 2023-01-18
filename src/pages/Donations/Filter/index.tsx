import { Popover } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormEventHandler, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormValues as FV } from "./types";
import { DonationsQueryParams } from "types/aws";
import Icon, { DrawerIcon } from "components/Icon";
import { cleanObject } from "helpers/cleanObject";
import Form from "./Form";
import { schema } from "./schema";

type Props = {
  classes?: string;
  setParams: React.Dispatch<React.SetStateAction<DonationsQueryParams>>;
  isDisabled: boolean;
  donorAddress: string;
};

export default function Filter({
  setParams,
  donorAddress,
  classes = "",
  isDisabled,
}: Props) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const methods = useForm<FV>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      //set default value so empty can be tagged as invalid
      startDate: format(getYearAgo()),
      endDate: format(new Date()),
      network: { label: "Select network...", value: "" },
      currency: { label: "Select currency...", value: "" },
      donorAddress: donorAddress,
    },
  });

  const {
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = methods;

  console.log(watch(), errors);

  async function submit(data: FV) {
    setParams((prev) => ({
      id: prev.id,
      ...cleanObject({
        afterDate: data.startDate ? new Date(data.startDate).toISOString() : "",
        beforeDate: data.endDate ? new Date(data.endDate).toISOString() : "",
        chainName: data.network.value,
        denomination: data.currency.value,
      }),
    }));
  }

  const onReset: FormEventHandler<HTMLFormElement> = () => {
    reset();
    setParams((prev) => ({ id: prev.id }));
    buttonRef.current?.click();
  };

  return (
    <Popover
      className={`${classes} flex relative items-center w-[22.31rem] border border-gray-l2 dark:border-bluegray rounded dark:bg-blue-d6`}
    >
      <Popover.Button
        ref={buttonRef}
        disabled={isDisabled}
        className="w-full flex justify-center items-center p-3 rounded bg-orange text-white lg:text-gray-d1 lg:dark:text-gray lg:bg-white dark:lg:bg-blue-d6 lg:justify-between disabled:bg-gray lg:dark:disabled:bg-bluegray-d1"
      >
        {({ open }) => (
          <>
            <Icon className="lg:hidden" type="Filter" size={20} />
            <div className="uppercase font-semibold text-[0.9375rem] ">
              Filter
            </div>
            <DrawerIcon isOpen={open} className="hidden lg:inline" size={21} />
          </>
        )}
      </Popover.Button>

      <FormProvider {...methods}>
        <Form
          submit={handleSubmit(submit)}
          onReset={onReset}
          classes="max-lg:fixed max-lg:inset-x-0 max-lg:top-0 lg:mt-1 absolute top-full z-20"
        />
      </FormProvider>
    </Popover>
  );
}

function getYearAgo() {
  const date = new Date();
  const currYear = date.getFullYear();
  date.setFullYear(currYear - 1);
  return date;
}

function format(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month < 10 ? `0${month}` : month}-${
    day < 10 ? `0${day}` : day
  }`;
}
