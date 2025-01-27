import type { Allocation } from "@better-giving/endowment";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { Field, Label, Switch } from "@headlessui/react";
import { useFetcher, useNavigate, useRouteLoaderData } from "@remix-run/react";
import { useState } from "react";
import type { EndowmentUpdate } from "services/types";
import type { DashboardData } from "../api";
import { AllocationOptions } from "./allocation-options";
import { AllocationSlider } from "./allocation-slider";
import { allocationOptions, toAllocOptValue } from "./common";

export default function Edit() {
  const { alloc, bal } = useRouteLoaderData("dashboard") as DashboardData;
  const navigate = useNavigate();
  return (
    <Dialog
      open={true}
      onClose={() =>
        navigate("..", { replace: true, preventScrollReset: true })
      }
      className="relative z-50"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30 data-closed:opacity-0" />
      <Content amount={bal.payoutsPending} {...alloc} />
    </Dialog>
  );
}

function Content({ amount, ...props }: Allocation & { amount: number }) {
  const fetcher = useFetcher();
  const [alloc, setAlloc] = useState<Allocation>(props);
  const [isCustom, setIsCustom] = useState(
    allocationOptions.every((opt) => opt.value !== toAllocOptValue(props))
  );

  const isLoading = fetcher.state !== "idle";

  return (
    <DialogPanel className="fixed-center z-10 grid gap-y-4 text-navy-d4 dark:text-white bg-white dark:bg-blue-d4 sm:w-full w-[90vw] sm:max-w-lg rounded-lg p-6 max-h-[90dvh] overflow-y-scroll">
      <h4>Choose allocation</h4>

      <AllocationOptions
        value={alloc}
        onChange={(v) => {
          setIsCustom(false);
          setAlloc(v);
        }}
      />

      <Field className="flex items-center gap-x-2 mt-4">
        <Switch
          checked={isCustom}
          onChange={setIsCustom}
          className="group relative flex h-6 w-10 cursor-pointer rounded-full bg-gray-l4 p-1 transition-colors duration-200 ease-in-out focus:outline-hidden data-focus:outline-1 data-focus:outline-white data-checked:bg-blue-d1 shadow-inner"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none inline-block size-4 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-checked:translate-x-4"
          />
        </Switch>
        <Label>Set custom allocation</Label>
      </Field>
      {isCustom && (
        <AllocationSlider
          disabled={isLoading}
          value={alloc}
          onChange={(v) => setAlloc(v)}
        />
      )}

      <button
        disabled={isLoading}
        type="button"
        className="btn btn-blue px-4 py-2 text-sm uppercase mt-4 rounded-full"
        onClick={async () => {
          const update: EndowmentUpdate = { allocation: alloc };

          fetcher.submit(update as any, {
            method: "PATCH",
            action: "..",
            encType: "application/json",
          });
        }}
      >
        {isLoading ? "Updating.." : "Save"}
      </button>
    </DialogPanel>
  );
}
