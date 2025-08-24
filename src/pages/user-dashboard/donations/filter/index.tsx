import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useSearchParams } from "@remix-run/react";
import { Field, toYYYMMDD } from "components/form";
import { DrawerIcon } from "components/icon";
import { search } from "helpers/https";
import { weeksAgo } from "helpers/weeks-ago";
import { Filter as FilterIcon, XIcon } from "lucide-react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { type FV, schema } from "./schema";

type Props = {
  classes?: string;
  isDisabled: boolean;
};

export default function Filter({ classes = "", isDisabled }: Props) {
  const [params, setParams] = useSearchParams();
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const { startDate: s, endDate: e } = search(params);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FV>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: valibotResolver(schema),
    defaultValues: {
      //set default value so empty can be tagged as invalid
      start_date: toYYYMMDD(s ? new Date(s) : weeksAgo("now", 5)),
      end_date: toYYYMMDD(e ? new Date(e) : new Date()),
    },
  });

  async function submit({ start_date: a, end_date: b }: FV) {
    const p = new URLSearchParams(params);
    if (a) {
      p.set("startDate", a);
    } else {
      p.delete("startDate");
    }

    if (b) {
      p.set("endDate", b);
    } else {
      p.delete("endDate");
    }

    setParams(p);
  }

  return (
    <Popover className={`${classes} flex relative items-center`}>
      <PopoverButton
        ref={buttonRef}
        disabled={isDisabled}
        className="w-full @5xl:w-[22.3rem] flex justify-center items-center p-3 rounded-sm bg-blue-d1 text-white @5xl:text-gray @5xl:bg-white @5xl:justify-between disabled:bg-gray @5xl:disabled:bg-gray-l3 @5xl:dark:disabled:bg-gray-d3 @5xl:border @5xl:border-gray-l3"
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

      <PopoverPanel
        as="form"
        onSubmit={handleSubmit(submit, (err) => {
          console.error(err);
        })}
        onReset={() => {
          const p = new URLSearchParams(params);
          p.delete("startDate");
          p.delete("endDate");
          setParams(p);
        }}
        className={`fixed @5xl:absolute inset-x-0 top-0 @5xl:top-full @5xl:mt-1 z-40 grid content-start gap-4 w-full rounded-sm border border-gray-l3 bg-white dark:bg-blue-d5 pb-6 @5xl:pb-0 shadow-lg @-5xl:shadow-xs`}
      >
        <div className="@5xl:hidden relative text-[1.25rem] px-4 py-3 -mb-4 font-bold uppercase">
          <span className="text-blue-d1">Filters</span>
          <PopoverButton className="absolute top-1/2 -translate-y-1/2 right-2">
            <XIcon size={33} />
          </PopoverButton>
        </div>

        <div className="grid gap-x-[1.125rem] grid-cols-2 px-4 @5xl:px-6 @5xl:pt-6">
          <label className="col-span-full text-sm mb-2">Date</label>
          <Field
            label=""
            type="date"
            {...register("start_date")}
            error={errors.start_date?.message}
          />
          <Field
            label=""
            type="date"
            {...register("end_date")}
            error={errors.end_date?.message}
          />
        </div>

        <div className="row-start-2 flex gap-x-4 items-center justify-between px-4 py-3 p-6 @5xl:mt-2 bg-blue-l5 dark:bg-blue-d7 border-y @5xl:border-t border-gray-l3">
          <h3 className="uppercase @5xl:hidden">Filter by</h3>
          <button
            type="reset"
            className="text-blue-d1 underline text-sm ml-auto @5xl:ml-0"
          >
            Reset filters
          </button>
          <button
            type="submit"
            className="btn btn btn-blue px-6 py-2 rounded-xs text-xs font-bold uppercase"
          >
            Submit
          </button>
        </div>
      </PopoverPanel>
    </Popover>
  );
}
