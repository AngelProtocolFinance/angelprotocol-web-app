import { fill } from "components/donate-methods";
import { FormEditor } from "components/form-editor";
import { to_form_target } from "components/goal-selector";
import { useFetcher } from "react-router";
import { useRemixForm } from "remix-hook-form";
import type { Route } from "./+types";

export { loader } from "./api";

export default function Page({ loaderData: d }: Route.ComponentProps) {
  const fetcher = useFetcher();
  return (
    <FormEditor
      is_submitting={fetcher.state === "submitting"}
      increments={d.increments ?? []}
      target={to_form_target(d.target ? d.target.toString() : "0")}
      methods={fill(d.donate_methods)}
      accent_primary={d.accent_primary}
      accent_secondary={d.accent_secondary}
      on_submit={(x) => fetcher.submit(x, { method: "POST" })}
    />
  );
}
