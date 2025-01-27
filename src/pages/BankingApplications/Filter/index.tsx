import { Popover, PopoverButton } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { DrawerIcon } from "components/icon";
import { cleanObject } from "helpers/clean-object";
import { FilterIcon } from "lucide-react";
import { type FormEventHandler, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { optionType, schema, stringNumber } from "schemas/shape";
import type { BankingApplicationsQueryParams } from "types/aws";
import Form from "./Form";
import { statuses } from "./constants";
import type { FormValues as FV } from "./types";

type Props = {
  classes?: string;
  params: URLSearchParams;
  setParams: (params: BankingApplicationsQueryParams) => void;
  isDisabled: boolean;
};

export default function Filter({
  setParams,
  classes = "",
  isDisabled,
  params,
}: Props) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const methods = useForm<FV>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(
      schema<FV>({
        endowmentID: stringNumber(
          (s) => s,
          (n) => n.positive("must be greater than 0").integer("invalid id")
        ),
        status: optionType(),
      })
    ),
    defaultValues: {
      endowmentID: params.get("endowmentID") || "",
      status:
        statuses.find((s) => s.value === params.get("status")) || statuses[0],
    },
  });

  const { handleSubmit, reset } = methods;

  async function submit(data: FV) {
    setParams(
      cleanObject({
        status: data.status.value,
        endowmentID: data.endowmentID ? +data.endowmentID : undefined,
      })
    );
    buttonRef.current?.click();
  }

  const onReset: FormEventHandler<HTMLFormElement> = () => {
    reset();
    setParams({});
    buttonRef.current?.click();
  };
  return (
    <Popover className={`${classes} flex relative items-center`}>
      <PopoverButton
        ref={buttonRef}
        disabled={isDisabled}
        className="w-full lg:w-[22.3rem] flex justify-center items-center p-3 rounded-sm bg-blue-d1 text-white lg:dark:text-navy-l2 lg:text-navy-l1 lg:bg-white lg:dark:bg-blue-d6 lg:justify-between disabled:bg-gray lg:disabled:bg-gray-l3 lg:dark:disabled:bg-navy-d3 lg:border lg:border-gray-l4"
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
