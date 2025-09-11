import { useFetcher } from "react-router";
import { CacheRoute, createClientLoaderCache } from "remix-client-cache";
import { TransferForm } from "../shared/transfer-form";
import { transfer_action } from "../shared/transfer-form/transfer-action";
import type { Route } from "./+types/transfer";

export { transfer_loader as loader } from "../shared/transfer-form/transfer-loader";
export const clientLoader = createClientLoaderCache<Route.ClientLoaderArgs>();
export const action = transfer_action({
  liq: "../../savings",
  lock: "../../investments",
});

export default CacheRoute(Page);

function Page({ loaderData: data }: Route.ComponentProps) {
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
