import { useFetcher } from "@remix-run/react";
import { useCachedLoaderData } from "remix-client-cache";
import { TransferForm } from "../shared/transfer-form";
import { transfer_action } from "../shared/transfer-form/transfer-action";
import type { LoaderData } from "../shared/transfer-form/transfer-loader";

export { clientLoader } from "api/cache";
export { transfer_loader as loader } from "../shared/transfer-form/transfer-loader";
export const action = transfer_action({
  liq: "../../savings",
  lock: "../../investments",
});

export default function Page() {
  const data = useCachedLoaderData() as LoaderData;
  const fetcher = useFetcher();
  return (
    <TransferForm
      bals={{
        liq: data.bal_liq,
        lock: data.bal_lock,
      }}
      onSubmit={(fv) =>
        fetcher.submit(fv, { method: "POST", encType: "application/json" })
      }
      from="liq"
      is_submitting={fetcher.state !== "idle"}
    />
  );
}
