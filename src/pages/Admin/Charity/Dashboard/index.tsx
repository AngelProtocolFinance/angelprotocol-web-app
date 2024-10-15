import { getEndow } from "api/get/endow";
import { APIs } from "constants/urls";
import { cacheGet } from "helpers/cache-get";
import type { LoaderFunction } from "react-router-dom";
import { version as ver } from "services/helpers";
import type { EndowmentBalances } from "types/aws";
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

const getAllocation = (id: number) =>
  getEndow(id, ["allocation"]).then(
    (data) => data.allocation ?? { cash: 0, liq: 100, lock: 0 }
  );

async function getBalance(id: number) {
  const url = new URL(APIs.apes);
  url.pathname = `${ver(1)}/balances/${id}`;

  return cacheGet(url).then<EndowmentBalances>((res) => res.json());
}
