import type { Program } from "@better-giving/endowment";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { unpack } from "helpers";
import { X } from "lucide-react";
import { Suspense } from "react";
import { Await, useLoaderData } from "react-router";
import type { OptionType } from "types/components";
import { DrawerIcon } from "../../../Icon";

type Props = {
  classes?: string | { container?: string; label?: string };
  program: OptionType<string>;
  onChange: (program: OptionType<string>) => void;
};

export function ProgramSelector({ program, onChange, classes }: Props) {
  /** page should provide  */
  const data: any = useLoaderData<{ programs: Promise<Program[]> }>();
  const styles = unpack(classes);
  return (
    <Listbox
      value={program}
      by="value"
      onChange={onChange}
      as="div"
      className={`relative grid ${styles.container} group has-[[data-error]]:hidden has-[[data-empty]]:hidden has-[[data-loading]]:hidden`}
    >
      {program.value && (
        <div className="">
          <p className="text-navy-l1 mb-1">Program</p>
          <p className="justify-between border border-gray-l4 rounded-lg p-3.5 flex items-center">
            <span>{program.label}</span>
            <button
              onClick={() => onChange({ label: "", value: "" })}
              type="button"
            >
              <X className="text-red" size={16} />
            </button>
          </p>
        </div>
      )}

      {!program.value && (
        <label
          htmlFor="select-program"
          className={`${styles.label} block font-semibold font-heading mb-2 text-navy-d4`}
        >
          Select program{" "}
          <span className="text-xs text-navy-l1">( optional )</span>
        </label>
      )}

      {!program.value && (
        <ListboxButton
          id="select-program"
          as="button"
          className="flex items-center justify-between border border-gray-l4 py-3.5 pl-5 pr-2 rounded-lg focus:ring-2 focus:ring-blue-d1 ring-offset-1"
        >
          {({ open }) => (
            <>
              <div className="flex items-center gap-x-1">
                <span>{program.label}</span>
              </div>

              <DrawerIcon
                isOpen={open}
                size={20}
                className="justify-self-end shrink-0"
              />
            </>
          )}
        </ListboxButton>
      )}
      <Suspense fallback={<span data-loading />}>
        <Await resolve={data.programs} errorElement={<span data-error />}>
          {(programs: Program[]) =>
            programs.length === 0 ? (
              <span data-empty />
            ) : (
              <LoadedOptions options={programs} />
            )
          }
        </Await>
      </Suspense>
    </Listbox>
  );
}

interface ILoadedOptions {
  options: Program[];
}

function LoadedOptions({ options }: ILoadedOptions) {
  return (
    <ListboxOptions
      anchor={{ to: "bottom", gap: 8 }}
      className="bg-white w-[var(--button-width)] border border-gray-l4 px-5 py-3.5 rounded-lg grid gap-2 focus:ring-2 focus:ring-blue-d1 ring-offset-1"
    >
      {options.map((o) => (
        <ListboxOption
          key={o.id}
          value={
            {
              label: o.title,
              value: o.id,
            } satisfies OptionType<string>
          }
          className="select-none hover:text-[color:var(--accent-primary)] aria-selected:text-[color:var(--accent-primary)]"
        >
          <span>{o.title}</span>
        </ListboxOption>
      ))}
    </ListboxOptions>
  );
}
