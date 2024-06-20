import { Combobox } from "@headlessui/react";
import Image from "components/Image";
import { chainList } from "constants/chains";
import { IS_TEST } from "constants/env";
import Fuse from "fuse.js";
import { Fragment } from "react";
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
    <Combobox.Options className="absolute left-0 top-full mt-2 z-10 w-full bg-white dark:bg-blue-d6 shadow-lg rounded overflow-y-scroll h-40 scroller">
      {opts.map((opt) => (
        <Combobox.Option
          as={Fragment}
          key={opt.name}
          value={
            {
              id: opt.id,
              name: opt.name,
              logo: opt.logo,
            } satisfies Chain
          }
        >
          {({ active }) => (
            <li
              className={`${
                active ? "bg-blue-l2 dark:bg-blue-d1" : ""
              } cursor-pointer flex gap-2 p-2 text-sm`}
            >
              <Image
                src={opt.logo}
                width={20}
                height={20}
                className="object-contain"
              />
              <span>{opt.name}</span>
            </li>
          )}
        </Combobox.Option>
      ))}
    </Combobox.Options>
  );
}
