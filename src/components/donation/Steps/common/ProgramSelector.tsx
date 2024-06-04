import { Listbox } from "@headlessui/react";
import { unpack } from "helpers";
import { useEffect } from "react";
import { useProgramsQuery } from "services/aws/programs";
import type { Program } from "types/aws";
import type { OptionType } from "types/components";
import { DrawerIcon } from "../../../Icon";
import QueryLoader from "../../../QueryLoader";
import { DEFAULT_PROGRAM } from "./constants";

type Props = {
  endowId: number;
  classes?: string | { container?: string; label?: string };
  program: OptionType<string>;
  onChange: (program: OptionType<string>) => void;
};

export function ProgramSelector({
  program,
  onChange,
  endowId,
  classes,
}: Props) {
  const styles = unpack(classes);
  return (
    <Listbox
      value={program}
      by="value"
      onChange={onChange}
      as="div"
      className={`relative grid ${styles.container} group has-[[data-error]]:hidden has-[[data-empty]]:hidden has-[[data-loading]]:hidden`}
    >
      <Listbox.Label
        className={`${styles.label} block font-semibold font-heading mb-2 text-navy-d4`}
      >
        Select program
      </Listbox.Label>

      <Listbox.Button
        as="button"
        className="flex items-center justify-between border border-gray-l4 py-3.5 pl-5 pr-2 rounded-lg focus:ring-2 focus:ring-blue-d1 ring-offset-1"
      >
        {({ open }) => (
          <>
            <span>{program.label}</span>
            <DrawerIcon
              isOpen={open}
              size={25}
              className="justify-self-end shrink-0"
            />
          </>
        )}
      </Listbox.Button>
      <Options
        endowId={endowId}
        classes="absolute top-full left-0 z-10"
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
  endowId: number;
  classes?: string;
  onOptionsLoaded: OptionsLoadedCb;
};

function Options({ endowId, classes = "", onOptionsLoaded }: OptionsProps) {
  const query = useProgramsQuery(endowId);
  return (
    <QueryLoader
      classes={{ container: classes }}
      queryState={query}
      messages={{
        //parent watches for these data status to show/hide the entire listbox
        loading: <span data-loading />,
        error: <span data-error />,
        empty: <span data-empty />,
      }}
    >
      {(options) => (
        <LoadedOptions
          options={options}
          classes={classes}
          onOptionsLoaded={onOptionsLoaded}
        />
      )}
    </QueryLoader>
  );
}

interface ILoadedOptions {
  options: Program[];
  classes?: string;
  onOptionsLoaded: OptionsLoadedCb;
}

function LoadedOptions({ options, classes, onOptionsLoaded }: ILoadedOptions) {
  //biome-ignore lint: only run effect on mount
  useEffect(() => {
    onOptionsLoaded(options);
  }, []);
  return (
    <Listbox.Options
      className={`${classes} bg-white w-full border border-gray-l4 px-5 py-3.5 rounded-lg mt-2 grid gap-2 focus:ring-2 focus:ring-blue-d1 ring-offset-1`}
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
          <Listbox.Option
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
          </Listbox.Option>
        ))}
    </Listbox.Options>
  );
}
