import { Popover, PopoverButton } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSearchParams } from "@remix-run/react";
import { dateToFormFormat } from "components/form";
import { DrawerIcon } from "components/icon";
import { weeksAgo } from "helpers/weeks-ago";
import { Filter as FilterIcon } from "lucide-react";
import { type FormEventHandler, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Form from "./form";
import { schema } from "./schema";
import type { FormValues as FV } from "./types";

type Props = {
  classes?: string;
  isDisabled: boolean;
};

export default function Filter({ classes = "", isDisabled }: Props) {
  const [params, setParams] = useSearchParams();
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const start = params.get("startDate");
  const end = params.get("endDate");

  const methods = useForm<FV>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      //set default value so empty can be tagged as invalid
      startDate: dateToFormFormat(start ? new Date(start) : weeksAgo("now", 5)),
      endDate: dateToFormFormat(end ? new Date(end) : new Date()),
      network: { label: "Select network...", value: "" },
      currency: { label: "Select currency...", value: "" },
    },
  });

  const { handleSubmit } = methods;

  async function submit(data: FV) {
    const p = new URLSearchParams(params);
    if (data.startDate) {
      p.set("startDate", new Date(data.startDate).toISOString());
    } else {
      p.delete("startDate");
    }

    if (data.endDate) {
      p.set("endDate", new Date(data.endDate).toISOString());
    } else {
      p.delete("endDate");
    }

    setParams(p);
  }

  const onReset: FormEventHandler<HTMLFormElement> = () => {
    const p = new URLSearchParams(params);
    p.delete("startDate");
    p.delete("endDate");
    setParams(p);
  };
  return (
    <Popover className={`${classes} flex relative items-center`}>
      <PopoverButton
        ref={buttonRef}
        disabled={isDisabled}
        className="w-full @5xl:w-[22.3rem] flex justify-center items-center p-3 rounded-sm bg-blue-d1 text-white @5xl:text-gray @5xl:bg-white @5xl:justify-between disabled:bg-gray @5xl:disabled:bg-gray-l3 @5xl:dark:disabled:bg-gray-d3 @5xl:border @5xl:border-gray-l4"
      >
        {({ open }) => (
          <>
            <FilterIcon className="@5xl:hidden mr-1" size={16} />
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
