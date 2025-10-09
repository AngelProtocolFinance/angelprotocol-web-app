import type { IProgramDb } from "@better-giving/endowment/schema";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { unpack } from "helpers/unpack";
import { X } from "lucide-react";
import use_swr from "swr/immutable";
import type { OptionType } from "types/components";
import { DrawerIcon } from "../../../icon";

type Props = {
  classes?: string | { container?: string; label?: string };
  endowId: number;
  program: OptionType<string>;
  onChange: (program: OptionType<string>) => void;
};

export function ProgramSelector({
  program,
  onChange,
  classes,
  endowId,
}: Props) {
  /** page should provide  */
  const styles = unpack(classes);
  return (
    <Listbox
      value={program}
      by="value"
      onChange={onChange}
      as="div"
      className={`relative grid ${styles.container} group has-data-error:hidden has-data-empty:hidden has-data-loading:hidden`}
    >
      {program.value && (
        <div className="">
          <p className="text-gray-d4 font-semibold mb-2">
            I'd like to donate to the
          </p>
          <p className="justify-between border border-gray-l3 rounded-lg p-3.5 flex items-center">
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
          className={`${styles.label} block font-semibold  mb-2 text-gray-d4`}
        >
          Select a program to donate to{" "}
          <span className="text-xs text-gray">( optional )</span>
        </label>
      )}

      {!program.value && (
        <ListboxButton
          id="select-program"
          as="button"
          className="flex items-center justify-between border border-gray-l3 py-3.5 pl-5 pr-2 rounded-lg outline-blue-d1 data-open:outline-2"
        >
          {({ open }) => (
            <>
              <div className="flex items-center gap-x-1">
                <span>{program.label}</span>
              </div>

              <DrawerIcon
                is_open={open}
                size={20}
                className="justify-self-end shrink-0"
              />
            </>
          )}
        </ListboxButton>
      )}
      <Options endowId={endowId} />
    </Listbox>
  );
}

const fetcher = (path: string) =>
  fetch(path).then<IProgramDb[]>((res) => res.json());
function Options({ endowId }: { endowId: number }) {
  const { data, isLoading, error } = use_swr(
    `/api/npo/${endowId}/programs`,
    fetcher
  );

  if (isLoading) return <span data-loading />;
  if (error) return <span data-error />;
  if (!data || data.length === 0) return <span data-empty />;

  return (
    <ListboxOptions
      anchor={{ to: "bottom", gap: 8 }}
      className="bg-white w-[var(--button-width)] border border-gray-l3 px-5 py-3.5 rounded-lg grid gap-2 focus:ring-2 focus:ring-blue-d1 ring-offset-1"
    >
      {data.map((o) => (
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
