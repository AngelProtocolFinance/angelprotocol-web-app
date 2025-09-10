import type { ActionFunction, LoaderFunction } from "@vercel/remix";
import { resp } from "helpers/https";
import { wise_envs } from ".server/env";

export const loader: LoaderFunction = ({ request, params }) => {
  return handle_request(request, params);
};

export const action: ActionFunction = ({ request, params }) => {
  return handle_request(request, params);
};

async function handle_request(
  request: Request,
  params: { "*"?: string }
): Promise<ReturnType<typeof loader | typeof action>> {
  const METHOD = request.method;

  if (METHOD === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  try {
    const url = new URL(request.url);
    const path = params["*"]?.replace(/{{profileId}}/g, wise_envs.profile_id);
    const body = await request.text();
    const payload = body?.replace(/"{{profileId}}"/g, wise_envs.profile_id);

    const h = copy_headers(request.headers, [
      "accept-minor-version",
      "content-type",
    ]);
    h.set("authorization", `Bearer ${wise_envs.api_token}`);

    const res = await fetch(`${wise_envs.api_url}/${path}${url.search || ""}`, {
      method: METHOD,
      body: payload || undefined,
      headers: h,
    });

    const json = await res.json();
    return resp.json(json, res.status);
  } catch (err: any) {
    console.error(JSON.stringify(err, null, 2));
    return resp.status(500);
  }
}

export const copy_headers = (source: Headers, names: string[]) => {
  const h = new Headers();
  for (const n of names) {
    const v = source.get(n);
    if (v) h.set(n, v);
  }
  return h;
};
