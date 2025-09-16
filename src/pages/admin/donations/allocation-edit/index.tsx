import type { IAllocation } from "@better-giving/endowment";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { Field, Label, Switch } from "@headlessui/react";
import { use_admin_data } from "pages/admin/use-admin-data";
import { useState } from "react";
import { useFetcher, useNavigate } from "react-router";
import type { EndowmentUpdate } from "services/types";
import { alloc_opts, to_alloc_opt_value } from "./common";
import { AllocationOptions } from "./options";
import { AllocationSlider } from "./slider";

export default function AllocationEdit() {
  const data = use_admin_data();
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
      <Content
        {...(data?.endow.allocation ?? { liq: 100, lock: 0, cash: 0 })}
      />
    </Dialog>
  );
}

function Content(props: IAllocation) {
  const fetcher = useFetcher();
  const [alloc, set_alloc] = useState<IAllocation>(props);
  const [is_custom, set_is_custom] = useState(
    alloc_opts.every((opt) => opt.value !== to_alloc_opt_value(props))
  );

  const is_loading = fetcher.state !== "idle";

  return (
    <DialogPanel className="fixed-center z-10 grid gap-y-4 text-gray-d4 dark:text-white bg-white dark:bg-blue-d4 sm:w-full w-[90vw] sm:max-w-lg rounded-lg p-6 max-h-[90dvh] overflow-y-scroll">
      <h4>Choose allocation</h4>

      <AllocationOptions
        value={alloc}
        onChange={(v) => {
          set_is_custom(false);
          set_alloc(v);
        }}
      />

      <Field className="flex items-center gap-x-2 mt-4">
        <Switch
          checked={is_custom}
          onChange={set_is_custom}
          className="group relative flex h-6 w-10 cursor-pointer rounded-full bg-gray-l4 p-1 transition-colors duration-200 ease-in-out focus:outline-hidden data-focus:outline-1 data-focus:outline-white data-checked:bg-blue-d1 shadow-inner"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none inline-block size-4 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-checked:translate-x-4"
          />
        </Switch>
        <Label>Set custom allocation</Label>
      </Field>
      {is_custom && (
        <AllocationSlider
          disabled={is_loading}
          value={alloc}
          onChange={(v) => set_alloc(v)}
        />
      )}

      <button
        disabled={is_loading}
        type="button"
        className="btn btn btn-blue px-4 py-2 text-sm uppercase mt-4 rounded-full"
        onClick={async () => {
          const update: EndowmentUpdate = { allocation: alloc };
          fetcher.submit(update, {
            method: "PATCH",
            action: "..",
            encType: "application/json",
          });
        }}
      >
        {is_loading ? "Updating.." : "Save"}
      </button>
    </DialogPanel>
  );
}
