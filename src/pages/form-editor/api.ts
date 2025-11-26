import { resp } from "helpers/https";
import type { IForm } from "lib/forms";
import { href } from "react-router";
import type { ActionData } from "types/action";
import * as v from "valibot";
import type { Route } from "./+types";
import { schema } from "./types";
import { cognito, to_auth } from ".server/auth";
import { formsdb, funddb, npodb } from ".server/aws/db";

export interface IRecipient {
  name: string;
  members: string[];
  program?: { id: string; title: string };
  hide_bg_tip?: boolean;
}

export interface ILoader extends IForm {
  back_url: string;
  base_url: string;
  recipient_details: IRecipient;
}

const recipient_fn = async (
  id: string,
  type: IForm["recipient_type"],
  owner: string
): Promise<IRecipient | undefined> => {
  if (type === "fund") {
    const x = await funddb.fund(id);
    if (!x) return;
    return {
      name: x.name,
      members: x.members.map((x) => x.toString()),
    };
  }

  if (type === "npo") {
    const x = await npodb.npo(+id, ["name", "hide_bg_tip"]);
    if (!x) return;
    return { name: x.name, members: [], hide_bg_tip: x.hide_bg_tip };
  }

  if (type === "program") {
    // program owner is npo
    const npo = await npodb.npo(+owner, ["name", "id", "hide_bg_tip"]);
    if (!npo) return;
    const p = await npodb.npo_program(id, npo.id);
    return {
      name: npo.name,
      members: [],
      program: p ? { id: p.id, title: p.title } : undefined,
      hide_bg_tip: npo.hide_bg_tip,
    };
  }
};

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { user } = await cognito.retrieve(request);
  if (!user) return to_auth(request);

  const form = await formsdb.form_get(params.id);
  if (!form) throw resp.err(404, "form not found");

  if (form.owner !== user.email && !user.endowments.includes(+form.owner)) {
    throw resp.err(403, "forbidden");
  }

  const recipient_details = await recipient_fn(
    form.recipient,
    form.recipient_type,
    form.owner
  );
  if (!recipient_details) throw resp.err(404, "recipient not found");

  const { origin: base_url } = new URL(request.url);
  const back_path = v.EMAIL_REGEX.test(form.owner)
    ? href("/dashboard/forms")
    : href("/admin/:id/forms", { id: form.owner });
  const back_url = `${base_url}${back_path}`;

  return { ...form, back_url, base_url, recipient_details } satisfies ILoader;
};

export const action = async ({ request, params }: Route.ActionArgs) => {
  const json = await request.json();
  const fv = v.parse(schema, json);

  const { user } = await cognito.retrieve(request);
  if (!user) return to_auth(request);

  const form = await formsdb.form_get(params.id);
  if (!form) throw resp.err(404, "form not found");

  if (form.owner !== user.email && !user.endowments.includes(+form.owner)) {
    throw resp.err(403, "forbidden");
  }

  const target = ((x) => {
    switch (x.type) {
      case "fixed":
        return +x.value;
      case "none":
        return null;
      case "smart":
        return "smart";
    }
  })(fv.target);

  await formsdb.form_update(params.id, {
    accent_primary: fv.accent_primary,
    accent_secondary: fv.accent_secondary,
    donate_methods: fv.methods.filter((m) => !m.disabled).map((m) => m.id),
    increments: fv.increments,
    target,
    tag: fv.tag,
  });

  return { __ok: "Form updated" } satisfies ActionData;
};
