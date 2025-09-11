import { useFetcher, useLoaderData } from "react-router";
import { WithdrawForm } from "../shared/withdraw-form";
import { withdraw_action } from "../shared/withdraw-form/withdraw-action";
import type { LoaderData } from "../shared/withdraw-form/withdraw-loader";

export { withdraw_loader as loader } from "../shared/withdraw-form/withdraw-loader";
export const action = withdraw_action({
  liq: "..",
  lock: "../../investments",
});

export default function Page() {
  const data = useLoaderData() as LoaderData;
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
      is_submitting={fetcher.state !== "idle"}
    />
  );
}
