import { Popover } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import Icon, { DrawerIcon } from "components/Icon";
import { dateToFormFormat } from "components/form";
import { cleanObject } from "helpers/cleanObject";
import { weeksAgo } from "helpers/weeksAgo";
import { FormEventHandler, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { DonationsQueryParams } from "types/aws";
import Form from "./Form";
import { schema } from "./schema";
import { FormValues as FV } from "./types";

type Props = {
  classes?: string;
  setParams: React.Dispatch<React.SetStateAction<DonationsQueryParams>>;
  isDisabled: boolean;
};

export default function Filter({ setParams, classes = "", isDisabled }: Props) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const methods = useForm<FV>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      //set default value so empty can be tagged as invalid
      startDate: dateToFormFormat(weeksAgo("now", 5)),
      endDate: dateToFormFormat(new Date()),
      network: { label: "Select network...", value: "" },
      currency: { label: "Select currency...", value: "" },
    },
  });

  const { handleSubmit, reset } = methods;

  async function submit(data: FV) {
    setParams((prev) => ({
      id: prev.id,
      chain_id: prev.chain_id,
      status: prev.status,
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
    reset();
    setParams((prev) => ({
      id: prev.id,
      chain_id: prev.chain_id,
      status: prev.status,
    }));
    buttonRef.current?.click();
  };
  return (
    <Popover className={`${classes} flex relative items-center`}>
      <Popover.Button
        ref={buttonRef}
        disabled={isDisabled}
        className="w-full lg:w-[22.3rem] flex justify-center items-center p-3 rounded bg-blue-d1 text-white lg:text-navy-l1 lg:bg-white lg:justify-between disabled:bg-gray lg:disabled:bg-gray-l3 lg:dark:disabled:bg-navy-d3 lg:border lg:border-gray-l4"
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
