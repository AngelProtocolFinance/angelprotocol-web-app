import { put } from "@vercel/blob";
import { type ActionFunction, data } from "@vercel/remix";
import { nonEmpty, parse, pipe, string } from "valibot";

export const action: ActionFunction = async ({ request }) => {
  const url = new URL(request.url);
  const name = parse(
    pipe(string(), nonEmpty()),
    url.searchParams.get("filename")
  );
  if (!request.body) throw new Response("no content", { status: 400 });

  const blob = await put(name, request.body, {
    access: "public",
  });
  return data({ url: blob.url });
};
