import { Combobox } from "@headlessui/react";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import { FormValues } from "../types";
import { Token } from "types/aws";
import { useTokensQuery } from "services/apes";
import QueryLoader from "components/QueryLoader";

type Props = {
  selected: Token[];
  onSelectedChange(values: Token[]): void;
};

export default function Options({ selected, onSelectedChange }: Props) {
  const { resetField } = useFormContext<FormValues>();
  const queryState = useTokensQuery({});

  return (
    <Combobox.Options className="rounded-sm text-sm border border-prim absolute top-full mt-2 z-10 bg-gray-l6 dark:bg-blue-d6 w-full max-h-[10rem] overflow-y-auto scroller">
      <QueryLoader
        queryState={queryState}
        messages={{
          loading: "loading tokens..",
          error: "failed to get tokens",
          empty: "no tokens found",
        }}
        classes={{ container: "w-full text-sm p-2" }}
      >
        {(tokens) => {
          const isAllSelected = selected.length === tokens.length;
          return (
            <>
              <div className="flex justify-between p-4">
                {isAllSelected ? (
                  <Action onClick={() => onSelectedChange([])}>
                    Deselect All
                  </Action>
                ) : (
                  <Action onClick={() => onSelectedChange(tokens)}>
                    Select All
                  </Action>
                )}

                <Action onClick={() => resetField("tokenWhitelist")}>
                  Reset
                </Action>
              </div>

              {tokens.map((o) => (
                <Combobox.Option
                  key={o.token_id}
                  value={o}
                  className={({ active, selected }) =>
                    optionStyle(selected, active)
                  }
                >
                  {o.symbol}
                </Combobox.Option>
              ))}
            </>
          );
        }}
      </QueryLoader>
    </Combobox.Options>
  );
}

type ActionProps = {
  onClick(): void;
  children: ReactNode;
};
function Action({ onClick, children }: ActionProps) {
  return (
    <button
      type="button"
      className="cursor-pointer text-blue hover:text-orange hover:underline"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

const optionStyle = (selected: boolean, active: boolean) =>
  `px-4 py-2 cursor-pointer ${
    selected
      ? "bg-blue-l2  dark:bg-blue-d1"
      : active
      ? "cursor-pointer bg-blue-l3 dark:bg-blue-d2"
      : ""
  }`;
