import { Popover, PopoverButton } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import Icon, { DrawerIcon } from "components/Icon";
import { dateToFormFormat } from "components/form";
import { cleanObject } from "helpers/cleanObject";
import { weeksAgo } from "helpers/weeksAgo";
import { type FormEventHandler, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import type { DonationsQueryParams } from "types/aws";
import Form from "./Form";
import { schema } from "./schema";
import type { FormValues as FV } from "./types";

type Props = {
  classes?: string;
  setParams: React.Dispatch<React.SetStateAction<DonationsQueryParams>>;
  asker: string;
  isDisabled: boolean;
};

export default function Filter({
  setParams,
  classes = "",
  isDisabled,
  asker,
}: Props) {
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
      asker,
      status: prev.status,
      ...cleanObject({
        startDate: data.startDate ? new Date(data.startDate).toISOString() : "",
        endDate: data.endDate ? new Date(data.endDate).toISOString() : "",
        viaId: data.network.value,
        symbol: data.currency.value,
      }),
    }));
    buttonRef.current?.click();
  }

  const onReset: FormEventHandler<HTMLFormElement> = () => {
    reset();
    setParams((prev) => ({
      asker,
      status: prev.status,
    }));
    buttonRef.current?.click();
  };
  return (
    <Popover className={`${classes} flex relative items-center`}>
      <PopoverButton
        ref={buttonRef}
        disabled={isDisabled}
        className="w-full @5xl:w-[22.3rem] flex justify-center items-center p-3 rounded bg-blue-d1 text-white @5xl:text-navy-l1 @5xl:bg-white @5xl:justify-between disabled:bg-gray @5xl:disabled:bg-gray-l3 @5xl:dark:disabled:bg-navy-d3 @5xl:border @5xl:border-gray-l4"
      >
        {({ open }) => (
          <>
            <Icon className="@5xl:hidden mr-1" type="Filter" size={16} />
            <div className="uppercase font-semibold text-[0.9375rem]">
              Filter
            </div>
            <DrawerIcon
              isOpen={open}
              className="hidden @5xl:inline"
              size={21}
            />
          </>
        )}
      </PopoverButton>

      <FormProvider {...methods}>
        <Form
          submit={handleSubmit(submit)}
          onReset={onReset}
          classes="fixed @5xl:absolute inset-x-0 top-0 @5xl:top-full @5xl:mt-1 z-40"
        />
      </FormProvider>
    </Popover>
  );
}
