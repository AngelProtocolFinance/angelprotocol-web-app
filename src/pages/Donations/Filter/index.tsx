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

const Filter = ({
  setParams,
  donorAddress,
}: {
  setParams: React.Dispatch<React.SetStateAction<DonationsQueryParams>>;
  donorAddress: string;
}) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const methods = useForm<FV>({
    resolver: yupResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      startDate: getYearAgo(),
      endDate: new Date(),
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
    buttonRef.current?.click();
  }

  const onReset: FormEventHandler<HTMLFormElement> = () => {
    //event.type = "reset"
    reset();
    setParams((prev) => ({ id: prev.id }));
    buttonRef.current?.click();
  };

  return (
    <Popover className="flex items-center relative w-[22.31rem] border border-gray-l2 dark:border-bluegray rounded dark:bg-blue-d6">
      <Popover.Button
        ref={buttonRef}
        className={
          "w-full flex justify-center sm:justify-between items-center text-white bg-orange sm:bg-white p-3 rounded dark:bg-blue-d6 sm:text-gray-d2 dark:text-white"
        }
      >
        {({ open }) => (
          <>
            <Icon className="sm:hidden" type="Filter" size={20} />
            <div className="uppercase font-semibold">Filter</div>
            <DrawerIcon isOpen={open} className="hidden sm:inline" size={21} />
          </>
        )}
      </Popover.Button>

      <FormProvider {...methods}>
        <Form submit={handleSubmit(submit)} onReset={onReset} />
      </FormProvider>
    </Popover>
  );
};
export default Filter;

function getYearAgo() {
  const date = new Date();
  const currYear = date.getFullYear();
  date.setFullYear(currYear - 1);
  return date;
}
