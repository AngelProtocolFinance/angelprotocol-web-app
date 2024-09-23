import type { QueryParams } from "@better-giving/registration/approval";
import { Popover, PopoverButton } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import Icon, { DrawerIcon } from "components/Icon";
import { dateToFormFormat } from "components/form";
import { cleanObject } from "helpers/cleanObject";
import { weeksAgo } from "helpers/weeksAgo";
import { type FormEventHandler, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Form from "./Form";
import { schema } from "./schema";
import type { FormValues as FV } from "./types";

type Props = {
  classes?: string;
  setParams: React.Dispatch<React.SetStateAction<QueryParams>>;
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
      startDate: dateToFormFormat(weeksAgo("now", 1)),
      endDate: dateToFormFormat(new Date()),
      hqCountry: { name: "", flag: "", code: "" },
      status: { label: "Under Review", value: "02" },
    },
  });

  const { handleSubmit, reset } = methods;

  function ISOdate(date: string, end?: boolean) {
    if (!date) return "";

    const output = new Date(date);
    //include up to the last second of the day
    if (end) output.setHours(23, 59, 59);

    return output.toISOString();
  }

  async function submit(data: FV) {
    setParams(
      cleanObject({
        startDate: ISOdate(data.startDate),
        endDate: ISOdate(data.endDate, true),
        status: data.status.value,
        country: data.hqCountry.name,
      })
    );
    buttonRef.current?.click();
  }

  const onReset: FormEventHandler<HTMLFormElement> = () => {
    reset();
    setParams({ status: "02" });
    buttonRef.current?.click();
  };
  return (
    <Popover className={`${classes} flex relative items-center`}>
      <PopoverButton
        ref={buttonRef}
        disabled={isDisabled}
        className="w-full lg:w-[22.3rem] flex justify-center items-center p-3 rounded bg-blue text-white lg:dark:text-navy-l2 lg:text-navy-l1 lg:bg-white lg:dark:bg-blue-d6 lg:justify-between disabled:bg-gray lg:disabled:bg-gray-l3 lg:dark:disabled:bg-navy-d3 lg:border lg:border-gray-l4"
      >
        {({ open }) => (
          <>
            <Icon className="lg:hidden mr-1" type="Filter" size={16} />
            <div className="uppercase font-semibold text-[0.9375rem] ">
              Filter
            </div>
            <DrawerIcon isOpen={open} className="hidden lg:inline" size={21} />
          </>
        )}
      </PopoverButton>

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
