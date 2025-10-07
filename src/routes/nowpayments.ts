import type { LoaderFunction } from "react-router";
import { env, np_envs } from ".server/env";

export const loader: LoaderFunction = async ({ request, params }) => {
  const from = new URL(request.url);
  const base =
    env === "production"
      ? "https://api.nowpayments.io"
      : "https://api-sandbox.nowpayments.io";

  const to = new URL(base);
  to.pathname = params["*"]!;
  to.search = from.searchParams.toString();

  return fetch(to, {
    headers: { "x-api-key": np_envs.apiToken },
  }).then((res) => res.json());
};
