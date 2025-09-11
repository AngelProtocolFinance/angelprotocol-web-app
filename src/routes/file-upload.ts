import { put } from "@vercel/blob";
import { search } from "helpers/https";
import { type ActionFunction, data } from "react-router";
import { nonEmpty, parse, pipe, string } from "valibot";

export const action: ActionFunction = async ({ request }) => {
  const { filename } = search(request);
  const name = parse(pipe(string(), nonEmpty()), filename);
  if (!request.body) throw new Response("no content", { status: 400 });

  const blob = await put(name, request.body, {
    access: "public",
  });
  return data({ url: blob.url });
};
