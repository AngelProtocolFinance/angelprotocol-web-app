import { useFetcher } from "@remix-run/react";
import { useCachedLoaderData } from "remix-client-cache";
import { WithdrawForm } from "../shared/withdraw-form";
import { withdraw_action } from "../shared/withdraw-form/withdraw-action.server";
import type { LoaderData } from "../shared/withdraw-form/withdraw-loader.server";

export { clientLoader } from "api/cache";
export { withdraw_loader as loader } from "../shared/withdraw-form/withdraw-loader.server";
export const action = withdraw_action({
  liq: "../../savings",
  lock: "..",
});

export default function Page() {
  const data = useCachedLoaderData() as LoaderData;
  const fetcher = useFetcher();
  return (
    <WithdrawForm
      bals={{
        liq: data.bal_liq,
        lock: data.bal_lock,
      }}
      onSubmit={(fv) =>
        fetcher.submit(fv, { method: "POST", encType: "application/json" })
      }
      from="lock"
      is_submitting={fetcher.state !== "idle"}
    />
  );
}
