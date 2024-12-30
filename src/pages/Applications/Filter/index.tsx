import {
  type QueryParams,
  queryParams,
} from "@better-giving/registration/approval";
import { Popover, PopoverButton } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { DrawerIcon } from "components/Icon";
import { dateToFormFormat } from "components/form";
import { weeksAgo } from "helpers/weeksAgo";
import { FilterIcon } from "lucide-react";
import { type FormEventHandler, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSearchParams } from "react-router";
import { parse } from "valibot";
import Form from "./Form";
import { statuses } from "./constants";
import { schema } from "./schema";
import type { FormValues as FV } from "./types";

type Props = {
  classes?: string;
  isDisabled: boolean;
};

export default function Filter({ classes = "", isDisabled }: Props) {
  const [params, setParams] = useSearchParams();

  const parsed = parse(queryParams, Object.fromEntries(params));
  const status = statuses.find((s) => s.value === parsed.status);

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const methods = useForm<FV>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      //set default value so empty can be tagged as invalid
      startDate: dateToFormFormat(
        parsed.startDate ? new Date(parsed.startDate) : weeksAgo("now", 1)
      ),
      endDate: dateToFormFormat(
        parsed.endDate ? new Date(parsed.endDate) : new Date()
      ),
      hqCountry: { name: parsed.country ?? "", flag: "", code: "" },
      status: status || { label: "Under Review", value: "02" },
    },
  });

  const { handleSubmit } = methods;

  function ISOdate(date: string, end?: boolean) {
    if (!date) return "";

    const output = new Date(date);
    //include up to the last second of the day
    if (end) output.setHours(23, 59, 59);

    return output.toISOString();
  }

  async function submit(fv: FV) {
    const copy = new URLSearchParams(params);
    copy.set("status", fv.status.value);
    copy.set("country", fv.hqCountry.name);
    copy.set("startDate", ISOdate(fv.startDate));
    copy.set("endDate", ISOdate(fv.endDate));
    setParams(copy);
  }

  const onReset: FormEventHandler<HTMLFormElement> = () => {
    setParams({ status: "02" } satisfies QueryParams);
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
            <FilterIcon className="lg:hidden mr-1" size={16} />
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
