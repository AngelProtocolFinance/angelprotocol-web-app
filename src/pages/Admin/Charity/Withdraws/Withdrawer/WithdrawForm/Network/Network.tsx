import { Listbox } from "@headlessui/react";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { WithdrawValues } from "../types";
import junoIcon from "assets/icons/currencies/juno.svg";
import Icon, { DrawerIcon } from "components/Icon";
import Logo from "components/Logo";

export default function Network() {
  const { register, watch, trigger } = useFormContext<WithdrawValues>();
  const network = watch("network");

  useEffect(() => {
    (async () => {
      //validate address on network change
      await trigger("beneficiary");
    })();
  }, [network, trigger]);

  return (
    <div className="grid gap-3">
      <span className="font-work font-bold">Select network</span>
      <Listbox {...register("network")} as="div" className="relative">
        <Listbox.Button className="grid grid-cols-[auto_1fr_auto] items-center text-left gap-2 w-full md:w-52 p-4 border border-prim rounded">
          {({ open }) => (
            <>
              <Logo logo={{ src: junoIcon }} className="h-5 w-5 rounded-full" />
              {"JUNO"}
              <DrawerIcon
                isOpen={open}
                className="text-2xl text-gray-d1 dark:text-white"
                aria-hidden="true"
              />
            </>
          )}
        </Listbox.Button>

        <Listbox.Options className="absolute mt-1 z-10 flex flex-col gap-1 w-full p-1 border border-prim rounded bg-white dark:bg-blue-d6 shadow-lg">
          {[1, 2, 3].map((suppChain) => (
            <Listbox.Option
              key={suppChain}
              value={`juno-1-${suppChain}`}
              className={({ active, selected }) =>
                `grid grid-cols-[auto_1fr_auto] items-center gap-2 p-4 pl-2 rounded cursor-pointer ${
                  selected
                    ? "bg-orange-l4 dark:bg-blue-d4"
                    : active
                    ? "bg-orange-l5 dark:bg-blue-d3"
                    : ""
                }`
              }
            >
              {({ selected }) => (
                <>
                  <Logo
                    logo={{ src: junoIcon }}
                    className="h-5 w-5 rounded-full"
                  />
                  {`JUNO ${suppChain}`}
                  {selected && (
                    <Icon
                      type="Check"
                      className="text-2xl text-gray-d1 dark:text-white"
                    />
                  )}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
}
