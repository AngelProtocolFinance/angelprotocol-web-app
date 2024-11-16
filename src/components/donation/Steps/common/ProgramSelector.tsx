import type { Program } from "@better-giving/endowment";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { unpack } from "helpers";
import { Suspense, useEffect } from "react";
import { Await, useLoaderData } from "react-router-dom";
import type { OptionType } from "types/components";
import { DrawerIcon } from "../../../Icon";
import { DEFAULT_PROGRAM } from "./constants";

type Props = {
  classes?: string | { container?: string; label?: string };
  program: OptionType<string>;
  onChange: (program: OptionType<string>) => void;
};

export function ProgramSelector({ program, onChange, classes }: Props) {
  const styles = unpack(classes);
  return (
    <Listbox
      value={program}
      by="value"
      onChange={onChange}
      as="div"
      className={`relative grid ${styles.container} group has-[[data-error]]:hidden has-[[data-empty]]:hidden has-[[data-loading]]:hidden`}
    >
      <label
        className={`${styles.label} block font-semibold font-heading mb-2 text-navy-d4`}
      >
        Select program
      </label>

      <ListboxButton
        as="button"
        className="flex items-center justify-between border border-gray-l4 py-3.5 pl-5 pr-2 rounded-lg focus:ring-2 focus:ring-blue-d1 ring-offset-1"
      >
        {({ open }) => (
          <>
            <span>{program.label}</span>
            <DrawerIcon
              isOpen={open}
              size={20}
              className="justify-self-end shrink-0"
            />
          </>
        )}
      </ListboxButton>
      <Options
        onOptionsLoaded={(options) => {
          const selectedProgram = options.find((o) => o.id === program.value);
          if (!selectedProgram) return;
          onChange({ label: selectedProgram.title, value: selectedProgram.id });
        }}
      />
    </Listbox>
  );
}

type OptionsLoadedCb = (options: Program[]) => void;
type OptionsProps = {
  onOptionsLoaded: OptionsLoadedCb;
};

function Options({ onOptionsLoaded }: OptionsProps) {
  // const query = useProgramsQuery(endowId);
  const data: any = useLoaderData();

  return (
    <Suspense fallback={<span data-loading />}>
      <Await resolve={data.programs} errorElement={<span data-error />}>
        {(programs: Program[]) =>
          programs.length === 0 ? (
            <span data-empty />
          ) : (
            <LoadedOptions
              options={programs}
              onOptionsLoaded={onOptionsLoaded}
            />
          )
        }
      </Await>
    </Suspense>
  );
}

interface ILoadedOptions {
  options: Program[];
  onOptionsLoaded: OptionsLoadedCb;
}

function LoadedOptions({ options, onOptionsLoaded }: ILoadedOptions) {
  //biome-ignore lint: only run effect on mount
  useEffect(() => {
    onOptionsLoaded(options);
  }, []);
  return (
    <ListboxOptions
      anchor={{ to: "bottom", gap: 8 }}
      className="bg-white w-[var(--button-width)] border border-gray-l4 px-5 py-3.5 rounded-lg grid gap-2 focus:ring-2 focus:ring-blue-d1 ring-offset-1"
    >
      {(
        [
          {
            id: "", //prepend list with general option
            title: DEFAULT_PROGRAM.label,
            description: "",
            milestones: [] as Program["milestones"],
          },
        ] satisfies Program[]
      )
        .concat(options)
        .map((o) => (
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
