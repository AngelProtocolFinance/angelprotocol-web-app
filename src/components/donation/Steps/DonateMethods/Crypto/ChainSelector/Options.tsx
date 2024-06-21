import { ComboboxOption, ComboboxOptions } from "@headlessui/react";
import Image from "components/Image";
import { chainList } from "constants/chains";
import { IS_TEST } from "constants/env";
import Fuse from "fuse.js";
import type { Chain } from "./types";

interface Props {
  searchText: string;
}

const chains = chainList.filter((c) => c.isTest === IS_TEST);
const fuse = new Fuse(chains, { keys: ["name"] });

export function Options({ searchText }: Props) {
  const opts = searchText
    ? fuse.search(searchText).map(({ item }) => item)
    : chains;

  return (
    <ComboboxOptions className="absolute left-0 top-full mt-2 z-10 w-full bg-white dark:bg-blue-d6 shadow-lg rounded overflow-y-scroll scroller h-40 grid grid-cols-[auto_1fr] content-start">
      {opts.map((opt) => (
        <ComboboxOption
          className="grid grid-cols-subgrid col-span-2 data-[selected]:bg-blue-l2 hover:bg-blue-l2 cursor-pointer gap-2 p-2 font-normal"
          key={opt.name}
          value={
            {
              id: opt.id,
              name: opt.name,
              logo: opt.logo,
            } satisfies Chain
          }
        >
          <Image
            src={opt.logo}
            width={20}
            height={20}
            className="object-contain mr-1"
          />
          <span>{opt.name}</span>
        </ComboboxOption>
      ))}
    </ComboboxOptions>
  );
}
