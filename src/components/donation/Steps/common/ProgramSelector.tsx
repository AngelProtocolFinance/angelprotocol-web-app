import { Listbox } from "@headlessui/react";
import { DrawerIcon } from "components/Icon";
import QueryLoader from "components/QueryLoader";
import { useProgramsQuery } from "services/aws/programs";
import type { OptionType } from "types/components";

type Props = {
  endowId: number;
  classes?: string;
  program: OptionType<string>;
  onChange: (program: OptionType<string>) => void;
};

export function ProgramSelector({
  classes = "",
  program,
  onChange,
  endowId,
}: Props) {
  return (
    <Listbox
      value={program}
      by="value"
      onChange={onChange}
      as="div"
      className={`relative grid ${classes} group has-[[data-error]]:hidden has-[[data-empty]]:hidden has-[[data-loading]]:hidden`}
    >
      <Listbox.Label className="block font-semibold font-heading mb-2 text-navy-d4">
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
      <Options endowId={endowId} classes="absolute top-full left-0 z-10" />
    </Listbox>
  );
}

type OptionsProps = {
  endowId: number;
  classes?: string;
};

function Options({ endowId, classes = "" }: OptionsProps) {
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
        <Listbox.Options
          className={`${classes} bg-white w-full border border-gray-l4 px-5 py-3.5 rounded-lg mt-2 grid gap-2 focus:ring-2 focus:ring-blue-d1 ring-offset-1`}
        >
          {options.map((o) => (
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
      )}
    </QueryLoader>
  );
}
