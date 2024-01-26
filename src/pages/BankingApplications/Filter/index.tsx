import { Popover } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import Icon, { DrawerIcon } from "components/Icon";
import { cleanObject } from "helpers/cleanObject";
import { FormEventHandler, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { BankingApplicationsQueryParams } from "types/aws";
import Form from "./Form";
import { schema } from "./schema";
import { FormValues as FV } from "./types";

type Props = {
  classes?: string;
  setParams: React.Dispatch<
    React.SetStateAction<BankingApplicationsQueryParams>
  >;
  isDisabled: boolean;
};

export default function Filter({ setParams, classes = "", isDisabled }: Props) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const methods = useForm<FV>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      endowmentID: "",
      status: { label: "Under Review", value: "under-review" },
    },
  });

  const { handleSubmit, reset } = methods;

  async function submit(data: FV) {
    setParams(
      cleanObject({
        status: data.status.value,
        endowmentID: data.endowmentID ? +data.endowmentID : undefined,
        requestor: "bg-admin",
      }),
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
      <Popover.Button
        ref={buttonRef}
        disabled={isDisabled}
        className="w-full lg:w-[22.3rem] flex justify-center items-center p-3 rounded bg-orange text-white lg:dark:text-gray lg:text-gray-d1 lg:bg-white lg:dark:bg-blue-d6 lg:justify-between disabled:bg-gray lg:disabled:bg-gray-l3 lg:dark:disabled:bg-bluegray-d1 lg:border lg:border-prim"
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
