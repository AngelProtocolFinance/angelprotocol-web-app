import { APIs } from "constants/urls";
import { cacheGet } from "helpers/cache-get";
import type { LoaderFunction } from "react-router-dom";
import { apiEnv } from "services/constants";
import { version as ver } from "services/helpers";
import type { Endowment, EndowmentBalances } from "types/aws";
import * as v from "valibot";

export { default as Component } from "./Dashboard";

export const loader: LoaderFunction = async ({ params }) => {
  const id = v.parse(
    v.pipe(
      v.string(),
      v.transform((x) => +x),
      v.number(),
      v.integer(),
      v.minValue(1)
    ),
    params.id
  );
  return Promise.all([getAllocation(id), getBalance(id)]);
};

async function getAllocation(id: number) {
  const url = new URL(APIs.aws);
  url.searchParams.set("env", apiEnv);
  url.searchParams.set("fields", "allocation");
  url.pathname = `v9/endowments/${id}`;

  return cacheGet(url)
    .then<Pick<Endowment, "allocation">>((res) => res.json())
    .then((data) => data.allocation ?? { cash: 0, liq: 100, lock: 0 });
}

async function getBalance(id: number) {
  const url = new URL(APIs.apes);
  url.pathname = `${ver(1)}/balances/${id}`;

  return cacheGet(url).then<EndowmentBalances>((res) => res.json());
}
